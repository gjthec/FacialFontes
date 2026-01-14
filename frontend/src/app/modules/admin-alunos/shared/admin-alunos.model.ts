import { BaseResourceModel } from 'app/shared/models/base-resource.model';
import { FieldFile } from 'app/shared/models/file.model';

export class AdminAluno extends BaseResourceModel {
  id?: any;
  nome?: string;
  matricula?: string;
  cpf?: string;
  email?: string;
  curso?: string;
  status?: string;
  foto?: FieldFile;

  static fromJson(jsonData: any): AdminAluno {
    return Object.assign(new AdminAluno(), jsonData);
  }
}
