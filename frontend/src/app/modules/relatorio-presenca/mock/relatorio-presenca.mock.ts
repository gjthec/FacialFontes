export type AttendanceStatus = 'Presente' | 'Ausente';

export type AttendanceRecord = {
  id: string;
  courseName: string;
  classDate: string;
  studentId: string;
  studentName: string;
  matricula: string;
  status: AttendanceStatus;
  checkInMethod: string;
  recordedAtIso: string;
};

export const MOCK_ATTENDANCE_REPORT: AttendanceRecord[] = [
  {
    id: 'r1',
    courseName: 'Engenharia de Software - Turma A',
    classDate: '2026-01-08',
    studentId: 's1',
    studentName: 'Mariana Costa',
    matricula: '2024001',
    status: 'Presente',
    checkInMethod: 'Facial',
    recordedAtIso: '2026-01-08T19:02:18.000Z',
  },
  {
    id: 'r2',
    courseName: 'Engenharia de Software - Turma A',
    classDate: '2026-01-08',
    studentId: 's2',
    studentName: 'João Henrique',
    matricula: '2024002',
    status: 'Ausente',
    checkInMethod: 'Manual',
    recordedAtIso: '2026-01-08T19:08:44.000Z',
  },
  {
    id: 'r3',
    courseName: 'Física 1 - Turma B',
    classDate: '2026-01-09',
    studentId: 's3',
    studentName: 'Carla Menezes',
    matricula: '2024101',
    status: 'Presente',
    checkInMethod: 'QRCode',
    recordedAtIso: '2026-01-09T13:42:05.000Z',
  },
  {
    id: 'r4',
    courseName: 'Cálculo - Turma C',
    classDate: '2026-01-09',
    studentId: 's4',
    studentName: 'Rafael Lima',
    matricula: '2024204',
    status: 'Presente',
    checkInMethod: 'Facial',
    recordedAtIso: '2026-01-09T07:58:32.000Z',
  },
];
