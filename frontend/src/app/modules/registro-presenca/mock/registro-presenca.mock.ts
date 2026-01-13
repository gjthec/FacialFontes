export type Course = { id: string; name: string };
export type Student = {
  id: string;
  name: string;
  cpf?: string;
  codSist?: string;
};

export const MOCK_COURSES: Course[] = [
  { id: 'c1', name: 'Engenharia de Software - Turma A' },
  { id: 'c2', name: 'Física 1 - Turma B' },
  { id: 'c3', name: 'Cálculo - Turma C' },
];

// alunos “matriculados” por curso
export const MOCK_STUDENTS_BY_COURSE: Record<string, Student[]> = {
  c1: [
    {
      id: 's1',
      name: 'João Pedro Martins',
      cpf: '14633443682',
      codSist: 'A001',
    },
    { id: 's2', name: 'Ana Souza', cpf: '11122233344', codSist: 'aaaa' },
  ],
  c2: [{ id: 's3', name: 'Carlos Lima', cpf: '99988877766', codSist: 'B101' }],
  c3: [
    { id: 's4', name: 'Mariana Silva', cpf: '12312312312', codSist: 'C900' },
  ],
};

// uma imagem fake (data URI bem simples) pra “foto evidência”
export const MOCK_PHOTO_DATA_URI =
  'data:image/svg+xml;base64,' +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320">
    <rect width="100%" height="100%" fill="#eee"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="22" fill="#444">
      FOTO FAKE (EVIDÊNCIA)
    </text>
  </svg>`);
