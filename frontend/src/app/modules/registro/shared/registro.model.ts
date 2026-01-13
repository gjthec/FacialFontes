import { FieldFile } from 'app/shared/models/file.model';

import { BaseResourceModel } from 'app/shared/models/base-resource.model';

export class Registro extends BaseResourceModel {
  id?: any;
  nome?: string;
  tipoPessoa?: string;
  foto?: FieldFile;

  static fromJson(jsonData: any): Registro {
    return Object.assign(new Registro(), jsonData);
  }
}
