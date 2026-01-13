import { FieldFile } from "app/shared/models/file.model"; 

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Teste extends BaseResourceModel {
    id?: any;
    nome?: string;
    tipoPessoa?: string;
    foto?: FieldFile;

    static fromJson(jsonData: any): Teste{ 
        return Object.assign(new Teste(), jsonData); 
    } 
}

