import { BaseResourceModel } from "./baseResource.model"  
import { FieldFile } from "./fieldFile.model"; 


export interface ITeste extends BaseResourceModel { 
  nome?: string
  tipoPessoa?: string
  foto?: FieldFile
  createdAt?: string 
} 
export class Teste extends BaseResourceModel implements ITeste{ 
  nome?: string
  tipoPessoa?: string
  foto?: FieldFile
  createdAt?: string 
  constructor(input: ITeste){
    super();
    this.id = input.id;
    this.nome = input.nome;
    this.tipoPessoa = input.tipoPessoa;
    this.foto = input.foto;
    this.createdAt = input.createdAt; 
 }

  static fromJson(jsonData: any) : Teste { 
    return new Teste(jsonData);
  } 
}
