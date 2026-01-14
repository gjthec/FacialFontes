import { BaseResourceModel } from "./baseResource.model";
import { FieldFile } from "./fieldFile.model";

export interface IRegistro extends BaseResourceModel {
  cursoId?: string;
  alunoId?: number;
  matricula?: string;
  foto?: FieldFile;
  createdAt?: string;
}

export class Registro extends BaseResourceModel implements IRegistro {
  cursoId?: string;
  alunoId?: number;
  matricula?: string;
  foto?: FieldFile;
  createdAt?: string;

  constructor(input: IRegistro) {
    super();
    this.id = input.id;
    this.cursoId = input.cursoId;
    this.alunoId = input.alunoId;
    this.matricula = input.matricula;
    this.foto = input.foto;
    this.createdAt = input.createdAt;
  }

  static fromJson(jsonData: any): Registro {
    return new Registro(jsonData);
  }
}
