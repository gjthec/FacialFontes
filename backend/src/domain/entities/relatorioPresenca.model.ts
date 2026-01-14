import { BaseResourceModel } from "./baseResource.model";

export interface IRelatorioPresenca extends BaseResourceModel {
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
  createdAt?: string;
}

export class RelatorioPresenca
  extends BaseResourceModel
  implements IRelatorioPresenca
{
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
  createdAt?: string;

  constructor(input: IRelatorioPresenca) {
    super();
    this.id = input.id;
    this.courseName = input.courseName;
    this.classDate = input.classDate;
    this.studentId = input.studentId;
    this.studentName = input.studentName;
    this.matricula = input.matricula;
    this.status = input.status;
    this.checkInMethod = input.checkInMethod;
    this.identityMatched = input.identityMatched;
    this.identityScore = input.identityScore;
    this.identityCheckedAtIso = input.identityCheckedAtIso;
    this.createdAt = input.createdAt;
  }

  static fromJson(jsonData: any): RelatorioPresenca {
    return new RelatorioPresenca(jsonData);
  }
}
