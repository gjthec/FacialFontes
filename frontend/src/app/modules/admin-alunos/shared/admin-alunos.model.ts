import { BaseResourceModel } from 'app/shared/models/base-resource.model';
import { FieldFile } from 'app/shared/models/file.model';

export interface AdminAlunoCurso {
  id?: string;
  nome?: string;
}

export interface AdminAlunoContrato {
  id?: string;
  numero?: string;
  cursos?: AdminAlunoCurso[];
}

export class AdminAluno extends BaseResourceModel {
  id?: any;
  nome?: string;
  matricula?: string;
  cpf?: string;
  email?: string;
  curso?: string;
  contratos?: AdminAlunoContrato[];
  status?: string;
  foto?: FieldFile;

  static fromJson(jsonData: any): AdminAluno {
    return Object.assign(new AdminAluno(), jsonData);
  }
}
