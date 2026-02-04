# Matrículas: cursos ativos via contratos

## SQL DDL (sem chaves estrangeiras)

> Observação: os relacionamentos são feitos apenas por IDs e validados por lógica/queries, sem uso de FK.

```sql
CREATE TABLE matriculas (
  id_matricula_usuario BIGINT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(20),
  email VARCHAR(255),
  data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cursos (
  id_curso BIGINT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  carga_horaria INT,
  data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contratos (
  id_contrato BIGINT PRIMARY KEY,
  id_matricula_usuario BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL,
  forma_pagamento VARCHAR(30) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contrato_cursos (
  id_contrato BIGINT NOT NULL,
  id_curso BIGINT NOT NULL,
  data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_contrato, id_curso)
);

CREATE INDEX idx_matriculas_id ON matriculas (id_matricula_usuario);
CREATE INDEX idx_contratos_matricula_status ON contratos (id_matricula_usuario, status, data_fim);
CREATE INDEX idx_contrato_cursos_contrato ON contrato_cursos (id_contrato);
CREATE INDEX idx_contrato_cursos_curso ON contrato_cursos (id_curso);
```

## Queries principais

### 1) Verificar se a matrícula existe

```sql
SELECT id_matricula_usuario
FROM matriculas
WHERE id_matricula_usuario = :id
LIMIT 1;
```

### 2) Buscar contratos ativos da matrícula

```sql
SELECT id_contrato
FROM contratos
WHERE id_matricula_usuario = :id
  AND status = 'ATIVO'
  AND (data_fim IS NULL OR data_fim >= CURRENT_DATE);
```

### 3) Buscar cursos associados aos contratos ativos

```sql
SELECT c.id_curso, c.nome
FROM contrato_cursos cc
JOIN cursos c ON c.id_curso = cc.id_curso
WHERE cc.id_contrato IN (:contratoIds);
```

## Endpoint

`GET /api/matriculas/{idMatriculaUsuario}/cursos-ativos`

- **Passo 1:** Validar que a matrícula existe.
- **Passo 2:** Buscar contratos ativos dessa matrícula.
- **Passo 3:** Buscar cursos associados nesses contratos.
- **Retorno:** JSON com `idMatriculaUsuario` e lista de cursos.

## Função reutilizável

`getActiveCoursesByMatricula(idMatriculaUsuario) -> lista de cursos`

Implementada no serviço `MatriculaCursoService`.

## Exemplos de resposta

### Matrícula encontrada com cursos

```json
{
  "idMatriculaUsuario": 123,
  "cursos": [
    { "idCurso": 10, "nome": "Introdução ao Backend" },
    { "idCurso": 12, "nome": "API REST Avançada" }
  ]
}
```

### Matrícula encontrada sem contratos ativos (ou contratos ativos sem cursos)

```json
{
  "idMatriculaUsuario": 123,
  "cursos": []
}
```

### Matrícula inexistente

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Matrícula não encontrada."
}
```

## Fluxo detalhado (passo a passo)

1. Receber `idMatriculaUsuario` pela rota.
2. Validar parâmetros (inteiro positivo).
3. Verificar existência da matrícula.
4. Consultar contratos ativos (`status = ATIVO` e `data_fim >= hoje`, quando existir). Contratos inativos são ignorados.
5. Se não houver contratos ativos, retornar lista vazia de cursos.
6. Consultar cursos vinculados aos contratos ativos.
7. Retornar `idMatriculaUsuario` e lista de cursos.
