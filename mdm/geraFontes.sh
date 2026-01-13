#!/bin/bash
output=$(./verificaMapa.sh)
# Conte o número de linhas na saída
line_count=$(echo "$output" | wc -l)
# Verifique se o número de linhas é maior que 3
if [ "$line_count" -gt 1 ]; then
    echo "====================================================================" 
    echo "Conteúdo do mapa:" 
    echo "$output" 
    echo "====================================================================" 
    echo "Pressione qualquer tecla para sair..." 
    read -n 1 -s   
    exit 1 
else
    echo "Mapa correto, continuando a geração." 
fi
cd ..
rm -rf frontend
rm -rf backend
git clone https://github.com/nobuntu-br/frontend
git clone https://github.com/nobuntu-br/backend
cd backend
npm i
find . -type d -name ".git" -exec rm -rf {} +
cd ..
cd frontend
find . -type d -name ".git" -exec rm -rf {} + 
ng add @angular/material
npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --save 
cd src/app
mkdir modules
mkdir consultas
cd ../../..
mkdir frontend/src/environments
mkdir frontend/src/assets/dicionario
mkdir frontend/src/assets/dicionario/consulta
mkdir frontend/src/assets/dicionario/dashboard
mkdir frontend/src/assets/dicionario/menu
cd frontend
npm install
cd ..
cd frontend/src/app/modules/
ng g m Teste --routing
cd Teste
ng g c TesteForm
ng g c ListTeste
mkdir shared
cd ..
ng g m estabelecimento --routing
cd estabelecimento
ng g c EstabelecimentoForm
ng g c ListEstabelecimento
mkdir shared
cd ..
ng g m areaDeNegocio --routing
cd area-de-negocio
ng g c AreaDeNegocioForm
ng g c ListAreaDeNegocio
mkdir shared
cd ..
ng g m planoDeContas --routing
cd plano-de-contas
ng g c PlanoDeContasForm
ng g c ListPlanoDeContas
mkdir shared
cd ..
ng g m centroDeCusto --routing
cd centro-de-custo
ng g c CentroDeCustoForm
ng g c ListCentroDeCusto
mkdir shared
cd ..
ng g m projeto --routing
cd projeto
ng g c ProjetoForm
ng g c ListProjeto
mkdir shared
cd ..
ng g m historicoPadrao --routing
cd historico-padrao
ng g c HistoricoPadraoForm
ng g c ListHistoricoPadrao
mkdir shared
cd ..
ng g m planilhaDoOrcamento --routing
cd planilha-do-orcamento
ng g c PlanilhaDoOrcamentoForm
ng g c ListPlanilhaDoOrcamento
mkdir shared
cd ..
ng g m estruturaDoOrcamento --routing
cd estrutura-do-orcamento
ng g c EstruturaDoOrcamentoForm
ng g c ListEstruturaDoOrcamento
mkdir shared
cd ..
ng g m funcaoDePrevisao --routing
cd funcao-de-previsao
ng g c FuncaoDePrevisaoForm
ng g c ListFuncaoDePrevisao
mkdir shared
cd ..
ng g m indicador --routing
cd indicador
ng g c IndicadorForm
ng g c ListIndicador
mkdir shared
cd ..
ng g m registroDeIndicador --routing
cd registro-de-indicador
ng g c RegistroDeIndicadorForm
ng g c ListRegistroDeIndicador
mkdir shared
cd ..
ng g m partidaDoLancamento --routing
cd partida-do-lancamento
ng g c PartidaDoLancamentoForm
ng g c ListPartidaDoLancamento
mkdir shared
cd ..
ng g m usuarioDoEstabelecimento --routing
cd usuario-do-estabelecimento
ng g c UsuarioDoEstabelecimentoForm
ng g c ListUsuarioDoEstabelecimento
mkdir shared
cd ..
ng g m tabelaMoeda --routing
cd tabela-moeda
ng g c TabelaMoedaForm
ng g c ListTabelaMoeda
mkdir shared
cd ..
ng g m cotacaoMoeda --routing
cd cotacao-moeda
ng g c CotacaoMoedaForm
ng g c ListCotacaoMoeda
mkdir shared
cd ..
ng g m lancamentoContabil --routing
cd lancamento-contabil
ng g c LancamentoContabilForm
ng g c ListLancamentoContabil
mkdir shared
cd ..
cd ..
cd consultas
ng g m consultaLivroRazao --routing
cd consulta-livro-razao
ng g c ConsultaLivroRazao
cd ..
cd ../..
cd ../..
mi g app mean indexSequelize > backend/src/infra/database/sequelize/models/index.ts
mi g app mean indexMongoose > backend/src/infra/database/mongoose/models//index.ts
mi g app mean index > backend/src/infra/http/routes/index.ts
mi g app angular appModule > frontend/src/app/app.module.ts
mi g app angular appRouting > frontend/src/app/app-routing.module.ts
mi g app angular appComponentHTML > frontend/src/app/app.component.html
mi g app angular appComponentTS > frontend/src/app/app.component.ts
mi g app angular indexHTML > frontend/src/index.html
mapperidea generate app mean validator entityName=Teste > backend/src/infra/http/validators/Teste.validator.ts
mapperidea generate app mean validator entityName=Estabelecimento > backend/src/infra/http/validators/estabelecimento.validator.ts
mapperidea generate app mean validator entityName=AreaDeNegocio > backend/src/infra/http/validators/areaDeNegocio.validator.ts
mapperidea generate app mean validator entityName=PlanoDeContas > backend/src/infra/http/validators/planoDeContas.validator.ts
mapperidea generate app mean validator entityName=CentroDeCusto > backend/src/infra/http/validators/centroDeCusto.validator.ts
mapperidea generate app mean validator entityName=Projeto > backend/src/infra/http/validators/projeto.validator.ts
mapperidea generate app mean validator entityName=HistoricoPadrao > backend/src/infra/http/validators/historicoPadrao.validator.ts
mapperidea generate app mean validator entityName=PlanilhaDoOrcamento > backend/src/infra/http/validators/planilhaDoOrcamento.validator.ts
mapperidea generate app mean validator entityName=EstruturaDoOrcamento > backend/src/infra/http/validators/estruturaDoOrcamento.validator.ts
mapperidea generate app mean validator entityName=FuncaoDePrevisao > backend/src/infra/http/validators/funcaoDePrevisao.validator.ts
mapperidea generate app mean validator entityName=Indicador > backend/src/infra/http/validators/indicador.validator.ts
mapperidea generate app mean validator entityName=RegistroDeIndicador > backend/src/infra/http/validators/registroDeIndicador.validator.ts
mapperidea generate app mean validator entityName=PartidaDoLancamento > backend/src/infra/http/validators/partidaDoLancamento.validator.ts
mapperidea generate app mean validator entityName=UsuarioDoEstabelecimento > backend/src/infra/http/validators/usuarioDoEstabelecimento.validator.ts
mapperidea generate app mean validator entityName=TabelaMoeda > backend/src/infra/http/validators/tabelaMoeda.validator.ts
mapperidea generate app mean validator entityName=CotacaoMoeda > backend/src/infra/http/validators/cotacaoMoeda.validator.ts
mapperidea generate app mean validator entityName=LancamentoContabil > backend/src/infra/http/validators/lancamentoContabil.validator.ts
mapperidea generate app mean sequelizeModel entityName=Teste > backend/src/infra/database/sequelize/models/Teste.model.ts
mapperidea generate app mean mongoModel entityName=Teste > backend/src/infra/database/mongoose/models/Teste.model.ts
mapperidea generate app mean model entityName=Teste > backend/src/domain/entities/Teste.model.ts
mapperidea generate app mean sequelizeModel entityName=Estabelecimento > backend/src/infra/database/sequelize/models/estabelecimento.model.ts
mapperidea generate app mean mongoModel entityName=Estabelecimento > backend/src/infra/database/mongoose/models/estabelecimento.model.ts
mapperidea generate app mean model entityName=Estabelecimento > backend/src/domain/entities/estabelecimento.model.ts
mapperidea generate app mean sequelizeModel entityName=AreaDeNegocio > backend/src/infra/database/sequelize/models/areaDeNegocio.model.ts
mapperidea generate app mean mongoModel entityName=AreaDeNegocio > backend/src/infra/database/mongoose/models/areaDeNegocio.model.ts
mapperidea generate app mean model entityName=AreaDeNegocio > backend/src/domain/entities/areaDeNegocio.model.ts
mapperidea generate app mean sequelizeModel entityName=PlanoDeContas > backend/src/infra/database/sequelize/models/planoDeContas.model.ts
mapperidea generate app mean mongoModel entityName=PlanoDeContas > backend/src/infra/database/mongoose/models/planoDeContas.model.ts
mapperidea generate app mean model entityName=PlanoDeContas > backend/src/domain/entities/planoDeContas.model.ts
mapperidea generate app mean sequelizeModel entityName=CentroDeCusto > backend/src/infra/database/sequelize/models/centroDeCusto.model.ts
mapperidea generate app mean mongoModel entityName=CentroDeCusto > backend/src/infra/database/mongoose/models/centroDeCusto.model.ts
mapperidea generate app mean model entityName=CentroDeCusto > backend/src/domain/entities/centroDeCusto.model.ts
mapperidea generate app mean sequelizeModel entityName=Projeto > backend/src/infra/database/sequelize/models/projeto.model.ts
mapperidea generate app mean mongoModel entityName=Projeto > backend/src/infra/database/mongoose/models/projeto.model.ts
mapperidea generate app mean model entityName=Projeto > backend/src/domain/entities/projeto.model.ts
mapperidea generate app mean sequelizeModel entityName=HistoricoPadrao > backend/src/infra/database/sequelize/models/historicoPadrao.model.ts
mapperidea generate app mean mongoModel entityName=HistoricoPadrao > backend/src/infra/database/mongoose/models/historicoPadrao.model.ts
mapperidea generate app mean model entityName=HistoricoPadrao > backend/src/domain/entities/historicoPadrao.model.ts
mapperidea generate app mean sequelizeModel entityName=PlanilhaDoOrcamento > backend/src/infra/database/sequelize/models/planilhaDoOrcamento.model.ts
mapperidea generate app mean mongoModel entityName=PlanilhaDoOrcamento > backend/src/infra/database/mongoose/models/planilhaDoOrcamento.model.ts
mapperidea generate app mean model entityName=PlanilhaDoOrcamento > backend/src/domain/entities/planilhaDoOrcamento.model.ts
mapperidea generate app mean sequelizeModel entityName=EstruturaDoOrcamento > backend/src/infra/database/sequelize/models/estruturaDoOrcamento.model.ts
mapperidea generate app mean mongoModel entityName=EstruturaDoOrcamento > backend/src/infra/database/mongoose/models/estruturaDoOrcamento.model.ts
mapperidea generate app mean model entityName=EstruturaDoOrcamento > backend/src/domain/entities/estruturaDoOrcamento.model.ts
mapperidea generate app mean sequelizeModel entityName=FuncaoDePrevisao > backend/src/infra/database/sequelize/models/funcaoDePrevisao.model.ts
mapperidea generate app mean mongoModel entityName=FuncaoDePrevisao > backend/src/infra/database/mongoose/models/funcaoDePrevisao.model.ts
mapperidea generate app mean model entityName=FuncaoDePrevisao > backend/src/domain/entities/funcaoDePrevisao.model.ts
mapperidea generate app mean sequelizeModel entityName=Indicador > backend/src/infra/database/sequelize/models/indicador.model.ts
mapperidea generate app mean mongoModel entityName=Indicador > backend/src/infra/database/mongoose/models/indicador.model.ts
mapperidea generate app mean model entityName=Indicador > backend/src/domain/entities/indicador.model.ts
mapperidea generate app mean sequelizeModel entityName=RegistroDeIndicador > backend/src/infra/database/sequelize/models/registroDeIndicador.model.ts
mapperidea generate app mean mongoModel entityName=RegistroDeIndicador > backend/src/infra/database/mongoose/models/registroDeIndicador.model.ts
mapperidea generate app mean model entityName=RegistroDeIndicador > backend/src/domain/entities/registroDeIndicador.model.ts
mapperidea generate app mean sequelizeModel entityName=PartidaDoLancamento > backend/src/infra/database/sequelize/models/partidaDoLancamento.model.ts
mapperidea generate app mean mongoModel entityName=PartidaDoLancamento > backend/src/infra/database/mongoose/models/partidaDoLancamento.model.ts
mapperidea generate app mean model entityName=PartidaDoLancamento > backend/src/domain/entities/partidaDoLancamento.model.ts
mapperidea generate app mean sequelizeModel entityName=UsuarioDoEstabelecimento > backend/src/infra/database/sequelize/models/usuarioDoEstabelecimento.model.ts
mapperidea generate app mean mongoModel entityName=UsuarioDoEstabelecimento > backend/src/infra/database/mongoose/models/usuarioDoEstabelecimento.model.ts
mapperidea generate app mean model entityName=UsuarioDoEstabelecimento > backend/src/domain/entities/usuarioDoEstabelecimento.model.ts
mapperidea generate app mean sequelizeModel entityName=TabelaMoeda > backend/src/infra/database/sequelize/models/tabelaMoeda.model.ts
mapperidea generate app mean mongoModel entityName=TabelaMoeda > backend/src/infra/database/mongoose/models/tabelaMoeda.model.ts
mapperidea generate app mean model entityName=TabelaMoeda > backend/src/domain/entities/tabelaMoeda.model.ts
mapperidea generate app mean sequelizeModel entityName=CotacaoMoeda > backend/src/infra/database/sequelize/models/cotacaoMoeda.model.ts
mapperidea generate app mean mongoModel entityName=CotacaoMoeda > backend/src/infra/database/mongoose/models/cotacaoMoeda.model.ts
mapperidea generate app mean model entityName=CotacaoMoeda > backend/src/domain/entities/cotacaoMoeda.model.ts
mapperidea generate app mean sequelizeModel entityName=LancamentoContabil > backend/src/infra/database/sequelize/models/lancamentoContabil.model.ts
mapperidea generate app mean mongoModel entityName=LancamentoContabil > backend/src/infra/database/mongoose/models/lancamentoContabil.model.ts
mapperidea generate app mean model entityName=LancamentoContabil > backend/src/domain/entities/lancamentoContabil.model.ts
mi g app json jsonClass entityName=Teste > frontend/src/assets/dicionario/Teste.json
mi g app json jsonClass entityName=Estabelecimento > frontend/src/assets/dicionario/estabelecimento.json
mi g app json jsonClass entityName=AreaDeNegocio > frontend/src/assets/dicionario/areaDeNegocio.json
mi g app json jsonClass entityName=PlanoDeContas > frontend/src/assets/dicionario/planoDeContas.json
mi g app json jsonClass entityName=CentroDeCusto > frontend/src/assets/dicionario/centroDeCusto.json
mi g app json jsonClass entityName=Projeto > frontend/src/assets/dicionario/projeto.json
mi g app json jsonClass entityName=HistoricoPadrao > frontend/src/assets/dicionario/historicoPadrao.json
mi g app json jsonClass entityName=PlanilhaDoOrcamento > frontend/src/assets/dicionario/planilhaDoOrcamento.json
mi g app json jsonClass entityName=EstruturaDoOrcamento > frontend/src/assets/dicionario/estruturaDoOrcamento.json
mi g app json jsonClass entityName=FuncaoDePrevisao > frontend/src/assets/dicionario/funcaoDePrevisao.json
mi g app json jsonClass entityName=Indicador > frontend/src/assets/dicionario/indicador.json
mi g app json jsonClass entityName=RegistroDeIndicador > frontend/src/assets/dicionario/registroDeIndicador.json
mi g app json jsonClass entityName=PartidaDoLancamento > frontend/src/assets/dicionario/partidaDoLancamento.json
mi g app json jsonClass entityName=UsuarioDoEstabelecimento > frontend/src/assets/dicionario/usuarioDoEstabelecimento.json
mi g app json jsonClass entityName=TabelaMoeda > frontend/src/assets/dicionario/tabelaMoeda.json
mi g app json jsonClass entityName=CotacaoMoeda > frontend/src/assets/dicionario/cotacaoMoeda.json
mi g app json jsonClass entityName=LancamentoContabil > frontend/src/assets/dicionario/lancamentoContabil.json
mapperidea generate app mean repository entityName=Teste > backend/src/domain/repositories/Teste.repository.ts
mapperidea generate app mean repository entityName=Estabelecimento > backend/src/domain/repositories/estabelecimento.repository.ts
mapperidea generate app mean repository entityName=AreaDeNegocio > backend/src/domain/repositories/areaDeNegocio.repository.ts
mapperidea generate app mean repository entityName=PlanoDeContas > backend/src/domain/repositories/planoDeContas.repository.ts
mapperidea generate app mean repository entityName=CentroDeCusto > backend/src/domain/repositories/centroDeCusto.repository.ts
mapperidea generate app mean repository entityName=Projeto > backend/src/domain/repositories/projeto.repository.ts
mapperidea generate app mean repository entityName=HistoricoPadrao > backend/src/domain/repositories/historicoPadrao.repository.ts
mapperidea generate app mean repository entityName=PlanilhaDoOrcamento > backend/src/domain/repositories/planilhaDoOrcamento.repository.ts
mapperidea generate app mean repository entityName=EstruturaDoOrcamento > backend/src/domain/repositories/estruturaDoOrcamento.repository.ts
mapperidea generate app mean repository entityName=FuncaoDePrevisao > backend/src/domain/repositories/funcaoDePrevisao.repository.ts
mapperidea generate app mean repository entityName=Indicador > backend/src/domain/repositories/indicador.repository.ts
mapperidea generate app mean repository entityName=RegistroDeIndicador > backend/src/domain/repositories/registroDeIndicador.repository.ts
mapperidea generate app mean repository entityName=PartidaDoLancamento > backend/src/domain/repositories/partidaDoLancamento.repository.ts
mapperidea generate app mean repository entityName=UsuarioDoEstabelecimento > backend/src/domain/repositories/usuarioDoEstabelecimento.repository.ts
mapperidea generate app mean repository entityName=TabelaMoeda > backend/src/domain/repositories/tabelaMoeda.repository.ts
mapperidea generate app mean repository entityName=CotacaoMoeda > backend/src/domain/repositories/cotacaoMoeda.repository.ts
mapperidea generate app mean repository entityName=LancamentoContabil > backend/src/domain/repositories/lancamentoContabil.repository.ts
mapperidea generate app mean apiController entityName=Teste > backend/src/infra/http/controllers/Teste.controller.ts
mapperidea generate app mean apiController entityName=Estabelecimento > backend/src/infra/http/controllers/estabelecimento.controller.ts
mapperidea generate app mean apiController entityName=AreaDeNegocio > backend/src/infra/http/controllers/areaDeNegocio.controller.ts
mapperidea generate app mean apiController entityName=PlanoDeContas > backend/src/infra/http/controllers/planoDeContas.controller.ts
mapperidea generate app mean apiController entityName=CentroDeCusto > backend/src/infra/http/controllers/centroDeCusto.controller.ts
mapperidea generate app mean apiController entityName=Projeto > backend/src/infra/http/controllers/projeto.controller.ts
mapperidea generate app mean apiController entityName=HistoricoPadrao > backend/src/infra/http/controllers/historicoPadrao.controller.ts
mapperidea generate app mean apiController entityName=PlanilhaDoOrcamento > backend/src/infra/http/controllers/planilhaDoOrcamento.controller.ts
mapperidea generate app mean apiController entityName=EstruturaDoOrcamento > backend/src/infra/http/controllers/estruturaDoOrcamento.controller.ts
mapperidea generate app mean apiController entityName=FuncaoDePrevisao > backend/src/infra/http/controllers/funcaoDePrevisao.controller.ts
mapperidea generate app mean apiController entityName=Indicador > backend/src/infra/http/controllers/indicador.controller.ts
mapperidea generate app mean apiController entityName=RegistroDeIndicador > backend/src/infra/http/controllers/registroDeIndicador.controller.ts
mapperidea generate app mean apiController entityName=PartidaDoLancamento > backend/src/infra/http/controllers/partidaDoLancamento.controller.ts
mapperidea generate app mean apiController entityName=UsuarioDoEstabelecimento > backend/src/infra/http/controllers/usuarioDoEstabelecimento.controller.ts
mapperidea generate app mean apiController entityName=TabelaMoeda > backend/src/infra/http/controllers/tabelaMoeda.controller.ts
mapperidea generate app mean apiController entityName=CotacaoMoeda > backend/src/infra/http/controllers/cotacaoMoeda.controller.ts
mapperidea generate app mean apiController entityName=LancamentoContabil > backend/src/infra/http/controllers/lancamentoContabil.controller.ts
mapperidea generate app angular model entityName=Teste > frontend/src/app/modules/Teste/shared/Teste.model.ts
mapperidea generate app angular model entityName=Estabelecimento > frontend/src/app/modules/estabelecimento/shared/estabelecimento.model.ts
mapperidea generate app angular model entityName=AreaDeNegocio > frontend/src/app/modules/area-de-negocio/shared/area-de-negocio.model.ts
mapperidea generate app angular model entityName=PlanoDeContas > frontend/src/app/modules/plano-de-contas/shared/plano-de-contas.model.ts
mapperidea generate app angular model entityName=CentroDeCusto > frontend/src/app/modules/centro-de-custo/shared/centro-de-custo.model.ts
mapperidea generate app angular model entityName=Projeto > frontend/src/app/modules/projeto/shared/projeto.model.ts
mapperidea generate app angular model entityName=HistoricoPadrao > frontend/src/app/modules/historico-padrao/shared/historico-padrao.model.ts
mapperidea generate app angular model entityName=PlanilhaDoOrcamento > frontend/src/app/modules/planilha-do-orcamento/shared/planilha-do-orcamento.model.ts
mapperidea generate app angular model entityName=EstruturaDoOrcamento > frontend/src/app/modules/estrutura-do-orcamento/shared/estrutura-do-orcamento.model.ts
mapperidea generate app angular model entityName=FuncaoDePrevisao > frontend/src/app/modules/funcao-de-previsao/shared/funcao-de-previsao.model.ts
mapperidea generate app angular model entityName=Indicador > frontend/src/app/modules/indicador/shared/indicador.model.ts
mapperidea generate app angular model entityName=RegistroDeIndicador > frontend/src/app/modules/registro-de-indicador/shared/registro-de-indicador.model.ts
mapperidea generate app angular model entityName=PartidaDoLancamento > frontend/src/app/modules/partida-do-lancamento/shared/partida-do-lancamento.model.ts
mapperidea generate app angular model entityName=UsuarioDoEstabelecimento > frontend/src/app/modules/usuario-do-estabelecimento/shared/usuario-do-estabelecimento.model.ts
mapperidea generate app angular model entityName=TabelaMoeda > frontend/src/app/modules/tabela-moeda/shared/tabela-moeda.model.ts
mapperidea generate app angular model entityName=CotacaoMoeda > frontend/src/app/modules/cotacao-moeda/shared/cotacao-moeda.model.ts
mapperidea generate app angular model entityName=LancamentoContabil > frontend/src/app/modules/lancamento-contabil/shared/lancamento-contabil.model.ts
mi g app angular dataService entityName=Teste > frontend/src/app/modules/Teste/shared/Teste.service.ts
mi g app angular dataService entityName=Estabelecimento > frontend/src/app/modules/estabelecimento/shared/estabelecimento.service.ts
mi g app angular dataService entityName=AreaDeNegocio > frontend/src/app/modules/area-de-negocio/shared/area-de-negocio.service.ts
mi g app angular dataService entityName=PlanoDeContas > frontend/src/app/modules/plano-de-contas/shared/plano-de-contas.service.ts
mi g app angular dataService entityName=CentroDeCusto > frontend/src/app/modules/centro-de-custo/shared/centro-de-custo.service.ts
mi g app angular dataService entityName=Projeto > frontend/src/app/modules/projeto/shared/projeto.service.ts
mi g app angular dataService entityName=HistoricoPadrao > frontend/src/app/modules/historico-padrao/shared/historico-padrao.service.ts
mi g app angular dataService entityName=PlanilhaDoOrcamento > frontend/src/app/modules/planilha-do-orcamento/shared/planilha-do-orcamento.service.ts
mi g app angular dataService entityName=EstruturaDoOrcamento > frontend/src/app/modules/estrutura-do-orcamento/shared/estrutura-do-orcamento.service.ts
mi g app angular dataService entityName=FuncaoDePrevisao > frontend/src/app/modules/funcao-de-previsao/shared/funcao-de-previsao.service.ts
mi g app angular dataService entityName=Indicador > frontend/src/app/modules/indicador/shared/indicador.service.ts
mi g app angular dataService entityName=RegistroDeIndicador > frontend/src/app/modules/registro-de-indicador/shared/registro-de-indicador.service.ts
mi g app angular dataService entityName=PartidaDoLancamento > frontend/src/app/modules/partida-do-lancamento/shared/partida-do-lancamento.service.ts
mi g app angular dataService entityName=UsuarioDoEstabelecimento > frontend/src/app/modules/usuario-do-estabelecimento/shared/usuario-do-estabelecimento.service.ts
mi g app angular dataService entityName=TabelaMoeda > frontend/src/app/modules/tabela-moeda/shared/tabela-moeda.service.ts
mi g app angular dataService entityName=CotacaoMoeda > frontend/src/app/modules/cotacao-moeda/shared/cotacao-moeda.service.ts
mi g app angular dataService entityName=LancamentoContabil > frontend/src/app/modules/lancamento-contabil/shared/lancamento-contabil.service.ts
mi g app angular appRoutingChild entityName=Teste > frontend/src/app/modules/Teste/Teste-routing.module.ts
mi g app angular appRoutingChild entityName=Estabelecimento > frontend/src/app/modules/estabelecimento/estabelecimento-routing.module.ts
mi g app angular appRoutingChild entityName=AreaDeNegocio > frontend/src/app/modules/area-de-negocio/area-de-negocio-routing.module.ts
mi g app angular appRoutingChild entityName=PlanoDeContas > frontend/src/app/modules/plano-de-contas/plano-de-contas-routing.module.ts
mi g app angular appRoutingChild entityName=CentroDeCusto > frontend/src/app/modules/centro-de-custo/centro-de-custo-routing.module.ts
mi g app angular appRoutingChild entityName=Projeto > frontend/src/app/modules/projeto/projeto-routing.module.ts
mi g app angular appRoutingChild entityName=HistoricoPadrao > frontend/src/app/modules/historico-padrao/historico-padrao-routing.module.ts
mi g app angular appRoutingChild entityName=PlanilhaDoOrcamento > frontend/src/app/modules/planilha-do-orcamento/planilha-do-orcamento-routing.module.ts
mi g app angular appRoutingChild entityName=EstruturaDoOrcamento > frontend/src/app/modules/estrutura-do-orcamento/estrutura-do-orcamento-routing.module.ts
mi g app angular appRoutingChild entityName=FuncaoDePrevisao > frontend/src/app/modules/funcao-de-previsao/funcao-de-previsao-routing.module.ts
mi g app angular appRoutingChild entityName=Indicador > frontend/src/app/modules/indicador/indicador-routing.module.ts
mi g app angular appRoutingChild entityName=RegistroDeIndicador > frontend/src/app/modules/registro-de-indicador/registro-de-indicador-routing.module.ts
mi g app angular appRoutingChild entityName=PartidaDoLancamento > frontend/src/app/modules/partida-do-lancamento/partida-do-lancamento-routing.module.ts
mi g app angular appRoutingChild entityName=UsuarioDoEstabelecimento > frontend/src/app/modules/usuario-do-estabelecimento/usuario-do-estabelecimento-routing.module.ts
mi g app angular appRoutingChild entityName=TabelaMoeda > frontend/src/app/modules/tabela-moeda/tabela-moeda-routing.module.ts
mi g app angular appRoutingChild entityName=CotacaoMoeda > frontend/src/app/modules/cotacao-moeda/cotacao-moeda-routing.module.ts
mi g app angular appRoutingChild entityName=LancamentoContabil > frontend/src/app/modules/lancamento-contabil/lancamento-contabil-routing.module.ts
mi g app mean routes entityName=Teste > backend/src/infra/http/routes/Teste.route.ts
mi g app mean routes entityName=Estabelecimento > backend/src/infra/http/routes/estabelecimento.route.ts
mi g app mean routes entityName=AreaDeNegocio > backend/src/infra/http/routes/areaDeNegocio.route.ts
mi g app mean routes entityName=PlanoDeContas > backend/src/infra/http/routes/planoDeContas.route.ts
mi g app mean routes entityName=CentroDeCusto > backend/src/infra/http/routes/centroDeCusto.route.ts
mi g app mean routes entityName=Projeto > backend/src/infra/http/routes/projeto.route.ts
mi g app mean routes entityName=HistoricoPadrao > backend/src/infra/http/routes/historicoPadrao.route.ts
mi g app mean routes entityName=PlanilhaDoOrcamento > backend/src/infra/http/routes/planilhaDoOrcamento.route.ts
mi g app mean routes entityName=EstruturaDoOrcamento > backend/src/infra/http/routes/estruturaDoOrcamento.route.ts
mi g app mean routes entityName=FuncaoDePrevisao > backend/src/infra/http/routes/funcaoDePrevisao.route.ts
mi g app mean routes entityName=Indicador > backend/src/infra/http/routes/indicador.route.ts
mi g app mean routes entityName=RegistroDeIndicador > backend/src/infra/http/routes/registroDeIndicador.route.ts
mi g app mean routes entityName=PartidaDoLancamento > backend/src/infra/http/routes/partidaDoLancamento.route.ts
mi g app mean routes entityName=UsuarioDoEstabelecimento > backend/src/infra/http/routes/usuarioDoEstabelecimento.route.ts
mi g app mean routes entityName=TabelaMoeda > backend/src/infra/http/routes/tabelaMoeda.route.ts
mi g app mean routes entityName=CotacaoMoeda > backend/src/infra/http/routes/cotacaoMoeda.route.ts
mi g app mean routes entityName=LancamentoContabil > backend/src/infra/http/routes/lancamentoContabil.route.ts
mi g app angular listComponentHTML listName=Teste >  frontend/src/app/modules/Teste/list-Teste/list-Teste.component.html
mi g app angular listComponentTS listName=Teste >  frontend/src/app/modules/Teste/list-Teste/list-Teste.component.ts
mi g app angular detailsComponentHTML editorName=Teste >  frontend/src/app/modules/Teste/Teste-form/Teste-form.component.html
mi g app angular detailsComponentTS editorName=Teste >  frontend/src/app/modules/Teste/Teste-form/Teste-form.component.ts
mi g app angular listComponentHTML listName=Estabelecimento >  frontend/src/app/modules/estabelecimento/list-estabelecimento/list-estabelecimento.component.html
mi g app angular listComponentTS listName=Estabelecimento >  frontend/src/app/modules/estabelecimento/list-estabelecimento/list-estabelecimento.component.ts
mi g app angular detailsComponentHTML editorName=Estabelecimento >  frontend/src/app/modules/estabelecimento/estabelecimento-form/estabelecimento-form.component.html
mi g app angular detailsComponentTS editorName=Estabelecimento >  frontend/src/app/modules/estabelecimento/estabelecimento-form/estabelecimento-form.component.ts
mi g app angular listComponentHTML listName=AreaDeNegocio >  frontend/src/app/modules/area-de-negocio/list-area-de-negocio/list-area-de-negocio.component.html
mi g app angular listComponentTS listName=AreaDeNegocio >  frontend/src/app/modules/area-de-negocio/list-area-de-negocio/list-area-de-negocio.component.ts
mi g app angular detailsComponentHTML editorName=AreaDeNegocio >  frontend/src/app/modules/area-de-negocio/area-de-negocio-form/area-de-negocio-form.component.html
mi g app angular detailsComponentTS editorName=AreaDeNegocio >  frontend/src/app/modules/area-de-negocio/area-de-negocio-form/area-de-negocio-form.component.ts
mi g app angular listComponentHTML listName=PlanoDeContas >  frontend/src/app/modules/plano-de-contas/list-plano-de-contas/list-plano-de-contas.component.html
mi g app angular listComponentTS listName=PlanoDeContas >  frontend/src/app/modules/plano-de-contas/list-plano-de-contas/list-plano-de-contas.component.ts
mi g app angular detailsComponentHTML editorName=PlanoDeContas >  frontend/src/app/modules/plano-de-contas/plano-de-contas-form/plano-de-contas-form.component.html
mi g app angular detailsComponentTS editorName=PlanoDeContas >  frontend/src/app/modules/plano-de-contas/plano-de-contas-form/plano-de-contas-form.component.ts
mi g app angular listComponentHTML listName=CentroDeCusto >  frontend/src/app/modules/centro-de-custo/list-centro-de-custo/list-centro-de-custo.component.html
mi g app angular listComponentTS listName=CentroDeCusto >  frontend/src/app/modules/centro-de-custo/list-centro-de-custo/list-centro-de-custo.component.ts
mi g app angular detailsComponentHTML editorName=CentroDeCusto >  frontend/src/app/modules/centro-de-custo/centro-de-custo-form/centro-de-custo-form.component.html
mi g app angular detailsComponentTS editorName=CentroDeCusto >  frontend/src/app/modules/centro-de-custo/centro-de-custo-form/centro-de-custo-form.component.ts
mi g app angular listComponentHTML listName=Projeto >  frontend/src/app/modules/projeto/list-projeto/list-projeto.component.html
mi g app angular listComponentTS listName=Projeto >  frontend/src/app/modules/projeto/list-projeto/list-projeto.component.ts
mi g app angular detailsComponentHTML editorName=Projeto >  frontend/src/app/modules/projeto/projeto-form/projeto-form.component.html
mi g app angular detailsComponentTS editorName=Projeto >  frontend/src/app/modules/projeto/projeto-form/projeto-form.component.ts
mi g app angular listComponentHTML listName=HistoricoPadrao >  frontend/src/app/modules/historico-padrao/list-historico-padrao/list-historico-padrao.component.html
mi g app angular listComponentTS listName=HistoricoPadrao >  frontend/src/app/modules/historico-padrao/list-historico-padrao/list-historico-padrao.component.ts
mi g app angular detailsComponentHTML editorName=HistoricoPadrao >  frontend/src/app/modules/historico-padrao/historico-padrao-form/historico-padrao-form.component.html
mi g app angular detailsComponentTS editorName=HistoricoPadrao >  frontend/src/app/modules/historico-padrao/historico-padrao-form/historico-padrao-form.component.ts
mi g app angular listComponentHTML listName=PlanilhaDoOrcamento >  frontend/src/app/modules/planilha-do-orcamento/list-planilha-do-orcamento/list-planilha-do-orcamento.component.html
mi g app angular listComponentTS listName=PlanilhaDoOrcamento >  frontend/src/app/modules/planilha-do-orcamento/list-planilha-do-orcamento/list-planilha-do-orcamento.component.ts
mi g app angular detailsComponentHTML editorName=PlanilhaDoOrcamento >  frontend/src/app/modules/planilha-do-orcamento/planilha-do-orcamento-form/planilha-do-orcamento-form.component.html
mi g app angular detailsComponentTS editorName=PlanilhaDoOrcamento >  frontend/src/app/modules/planilha-do-orcamento/planilha-do-orcamento-form/planilha-do-orcamento-form.component.ts
mi g app angular listComponentHTML listName=EstruturaDoOrcamento >  frontend/src/app/modules/estrutura-do-orcamento/list-estrutura-do-orcamento/list-estrutura-do-orcamento.component.html
mi g app angular listComponentTS listName=EstruturaDoOrcamento >  frontend/src/app/modules/estrutura-do-orcamento/list-estrutura-do-orcamento/list-estrutura-do-orcamento.component.ts
mi g app angular detailsComponentHTML editorName=EstruturaDoOrcamento >  frontend/src/app/modules/estrutura-do-orcamento/estrutura-do-orcamento-form/estrutura-do-orcamento-form.component.html
mi g app angular detailsComponentTS editorName=EstruturaDoOrcamento >  frontend/src/app/modules/estrutura-do-orcamento/estrutura-do-orcamento-form/estrutura-do-orcamento-form.component.ts
mi g app angular listComponentHTML listName=FuncaoDePrevisao >  frontend/src/app/modules/funcao-de-previsao/list-funcao-de-previsao/list-funcao-de-previsao.component.html
mi g app angular listComponentTS listName=FuncaoDePrevisao >  frontend/src/app/modules/funcao-de-previsao/list-funcao-de-previsao/list-funcao-de-previsao.component.ts
mi g app angular detailsComponentHTML editorName=FuncaoDePrevisao >  frontend/src/app/modules/funcao-de-previsao/funcao-de-previsao-form/funcao-de-previsao-form.component.html
mi g app angular detailsComponentTS editorName=FuncaoDePrevisao >  frontend/src/app/modules/funcao-de-previsao/funcao-de-previsao-form/funcao-de-previsao-form.component.ts
mi g app angular listComponentHTML listName=Indicador >  frontend/src/app/modules/indicador/list-indicador/list-indicador.component.html
mi g app angular listComponentTS listName=Indicador >  frontend/src/app/modules/indicador/list-indicador/list-indicador.component.ts
mi g app angular detailsComponentHTML editorName=Indicador >  frontend/src/app/modules/indicador/indicador-form/indicador-form.component.html
mi g app angular detailsComponentTS editorName=Indicador >  frontend/src/app/modules/indicador/indicador-form/indicador-form.component.ts
mi g app angular listComponentHTML listName=RegistroDeIndicador >  frontend/src/app/modules/registro-de-indicador/list-registro-de-indicador/list-registro-de-indicador.component.html
mi g app angular listComponentTS listName=RegistroDeIndicador >  frontend/src/app/modules/registro-de-indicador/list-registro-de-indicador/list-registro-de-indicador.component.ts
mi g app angular detailsComponentHTML editorName=RegistroDeIndicador >  frontend/src/app/modules/registro-de-indicador/registro-de-indicador-form/registro-de-indicador-form.component.html
mi g app angular detailsComponentTS editorName=RegistroDeIndicador >  frontend/src/app/modules/registro-de-indicador/registro-de-indicador-form/registro-de-indicador-form.component.ts
mi g app angular listComponentHTML listName=PartidaDoLancamento >  frontend/src/app/modules/partida-do-lancamento/list-partida-do-lancamento/list-partida-do-lancamento.component.html
mi g app angular listComponentTS listName=PartidaDoLancamento >  frontend/src/app/modules/partida-do-lancamento/list-partida-do-lancamento/list-partida-do-lancamento.component.ts
mi g app angular detailsComponentHTML editorName=PartidaDoLancamento >  frontend/src/app/modules/partida-do-lancamento/partida-do-lancamento-form/partida-do-lancamento-form.component.html
mi g app angular detailsComponentTS editorName=PartidaDoLancamento >  frontend/src/app/modules/partida-do-lancamento/partida-do-lancamento-form/partida-do-lancamento-form.component.ts
mi g app angular listComponentHTML listName=UsuarioDoEstabelecimento >  frontend/src/app/modules/usuario-do-estabelecimento/list-usuario-do-estabelecimento/list-usuario-do-estabelecimento.component.html
mi g app angular listComponentTS listName=UsuarioDoEstabelecimento >  frontend/src/app/modules/usuario-do-estabelecimento/list-usuario-do-estabelecimento/list-usuario-do-estabelecimento.component.ts
mi g app angular detailsComponentHTML editorName=UsuarioDoEstabelecimento >  frontend/src/app/modules/usuario-do-estabelecimento/usuario-do-estabelecimento-form/usuario-do-estabelecimento-form.component.html
mi g app angular detailsComponentTS editorName=UsuarioDoEstabelecimento >  frontend/src/app/modules/usuario-do-estabelecimento/usuario-do-estabelecimento-form/usuario-do-estabelecimento-form.component.ts
mi g app angular listComponentHTML listName=TabelaMoeda >  frontend/src/app/modules/tabela-moeda/list-tabela-moeda/list-tabela-moeda.component.html
mi g app angular listComponentTS listName=TabelaMoeda >  frontend/src/app/modules/tabela-moeda/list-tabela-moeda/list-tabela-moeda.component.ts
mi g app angular detailsComponentHTML editorName=TabelaMoeda >  frontend/src/app/modules/tabela-moeda/tabela-moeda-form/tabela-moeda-form.component.html
mi g app angular detailsComponentTS editorName=TabelaMoeda >  frontend/src/app/modules/tabela-moeda/tabela-moeda-form/tabela-moeda-form.component.ts
mi g app angular listComponentHTML listName=CotacaoMoeda >  frontend/src/app/modules/cotacao-moeda/list-cotacao-moeda/list-cotacao-moeda.component.html
mi g app angular listComponentTS listName=CotacaoMoeda >  frontend/src/app/modules/cotacao-moeda/list-cotacao-moeda/list-cotacao-moeda.component.ts
mi g app angular detailsComponentHTML editorName=CotacaoMoeda >  frontend/src/app/modules/cotacao-moeda/cotacao-moeda-form/cotacao-moeda-form.component.html
mi g app angular detailsComponentTS editorName=CotacaoMoeda >  frontend/src/app/modules/cotacao-moeda/cotacao-moeda-form/cotacao-moeda-form.component.ts
mi g app angular listComponentHTML listName=LancamentoContabil >  frontend/src/app/modules/lancamento-contabil/list-lancamento-contabil/list-lancamento-contabil.component.html
mi g app angular listComponentTS listName=LancamentoContabil >  frontend/src/app/modules/lancamento-contabil/list-lancamento-contabil/list-lancamento-contabil.component.ts
mi g app angular detailsComponentHTML editorName=LancamentoContabil >  frontend/src/app/modules/lancamento-contabil/lancamento-contabil-form/lancamento-contabil-form.component.html
mi g app angular detailsComponentTS editorName=LancamentoContabil >  frontend/src/app/modules/lancamento-contabil/lancamento-contabil-form/lancamento-contabil-form.component.ts
mi g app angular listComponentHTML listName=ConsultaLivroRazao >  frontend/src/app/consultas/consulta-livro-razao/consulta-livro-razao/consulta-livro-razao.component.html
mi g app angular consultaComponentTS consultaName=ConsultaLivroRazao >  frontend/src/app/consultas/consulta-livro-razao/consulta-livro-razao/consulta-livro-razao.component.ts
mi g app angular appRoutingChildConsulta consultaName=ConsultaLivroRazao >  frontend/src/app/consultas/consulta-livro-razao/consulta-livro-razao-routing.module.ts
mi g app json jsonConsulta consultaName=ConsultaLivroRazao > frontend/src/assets/dicionario/consulta/consultaLivroRazao.json
mi g app json jsonClass entityName=Teste > frontend/src/assets/dicionario/Teste.json
mi g app json jsonClass entityName=Estabelecimento > frontend/src/assets/dicionario/estabelecimento.json
mi g app json jsonClass entityName=AreaDeNegocio > frontend/src/assets/dicionario/areaDeNegocio.json
mi g app json jsonClass entityName=PlanoDeContas > frontend/src/assets/dicionario/planoDeContas.json
mi g app json jsonClass entityName=CentroDeCusto > frontend/src/assets/dicionario/centroDeCusto.json
mi g app json jsonClass entityName=Projeto > frontend/src/assets/dicionario/projeto.json
mi g app json jsonClass entityName=HistoricoPadrao > frontend/src/assets/dicionario/historicoPadrao.json
mi g app json jsonClass entityName=PlanilhaDoOrcamento > frontend/src/assets/dicionario/planilhaDoOrcamento.json
mi g app json jsonClass entityName=EstruturaDoOrcamento > frontend/src/assets/dicionario/estruturaDoOrcamento.json
mi g app json jsonClass entityName=FuncaoDePrevisao > frontend/src/assets/dicionario/funcaoDePrevisao.json
mi g app json jsonClass entityName=Indicador > frontend/src/assets/dicionario/indicador.json
mi g app json jsonClass entityName=RegistroDeIndicador > frontend/src/assets/dicionario/registroDeIndicador.json
mi g app json jsonClass entityName=PartidaDoLancamento > frontend/src/assets/dicionario/partidaDoLancamento.json
mi g app json jsonClass entityName=UsuarioDoEstabelecimento > frontend/src/assets/dicionario/usuarioDoEstabelecimento.json
mi g app json jsonClass entityName=TabelaMoeda > frontend/src/assets/dicionario/tabelaMoeda.json
mi g app json jsonClass entityName=CotacaoMoeda > frontend/src/assets/dicionario/cotacaoMoeda.json
mi g app json jsonClass entityName=LancamentoContabil > frontend/src/assets/dicionario/lancamentoContabil.json
mi g app json jsonTransloco translate=en > frontend/src/assets/i18n/en.json
mi g app json jsonTransloco translate=pt > frontend/src/assets/i18n/pt.json
mi g app json jsonCoreTransloco translate=en > frontend/src/assets/i18n/core/en.json
mi g app json jsonCoreTransloco translate=pt > frontend/src/assets/i18n/core/pt.json
mi g app angular environment > frontend/src/environments/environment.ts
mi g app angular environment > frontend/src/environments/environment.development.ts
mi g app json jsonMenu > frontend/src/assets/dicionario/menu/menu.json
mi g app mean envBackend > backend/.env
mi g app mean routeConsultas > backend/src/infra/http/routes/consulta.route.ts
mi g app mean controllerConsultas > backend/src/infra/http/controllers/consulta.controller.ts
mi g app mean serviceConsultas > backend/src/domain/services/consulta.service.ts
mi g app mean repositoryConsultas > backend/src/domain/repositories/consulta.repository.ts
mi g app mean routeRelatorios > backend/src/infra/http/routes/dashboard.route.ts
mi g app mean controllerRelatorios > backend/src/infra/http/controllers/dashboard.controller.ts
mi g app json jsonDashboard relatorioName=Painel > frontend/src/assets/dicionario/dashboard/painel.json
