import { BaseResourceModel } from "./baseResource.model";
import { FieldFile } from "./fieldFile.model";

export interface IAluno extends BaseResourceModel {
  nome?: string;
  matricula?: string;
  cpf?: string;
  email?: string;
  curso?: string;
  status?: string;
  foto?: FieldFile;
  createdAt?: string;
}

export class Aluno extends BaseResourceModel implements IAluno {
  nome?: string;
  matricula?: string;
  cpf?: string;
  email?: string;
  curso?: string;
  status?: string;
  foto?: FieldFile;
  createdAt?: string;

  constructor(input: IAluno) {
    super();
    this.id = input.id;
    this.nome = input.nome;
    this.matricula = input.matricula;
    this.cpf = input.cpf;
    this.email = input.email;
    this.curso = input.curso;
    this.status = input.status;
    this.foto = input.foto;
    this.createdAt = input.createdAt;
  }

  static fromJson(jsonData: any): Aluno {
    return new Aluno(jsonData);
  }
}
