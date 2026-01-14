import { BaseResourceModel } from 'app/shared/models/base-resource.model';

export class RelatorioPresenca extends BaseResourceModel {
  id?: any;
  courseName?: string;
  classDate?: string;
  studentId?: string;
  studentName?: string;
  matricula?: string;
  status?: string;
  checkInMethod?: string;
  identityMatched?: boolean;
  identityScore?: number;
  identityCheckedAtIso?: string;

  static fromJson(jsonData: any): RelatorioPresenca {
    return Object.assign(new RelatorioPresenca(), jsonData);
  }
}
