import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'app/shared/services/shared.service';
import { environment } from 'environments/environment';
import { RelatorioPresenca } from '../shared/relatorio-presenca.model';

export type IdentityValidationResult = {
  matched: boolean;
  score: number;
  checkedAtIso: string;
};

@Injectable({ providedIn: 'root' })
export class RelatorioPresencaService extends BaseResourceService<RelatorioPresenca> {
  protected http: HttpClient;

  constructor(protected override injector: Injector) {
    const url = environment.backendUrl + '/api/relatorio-presenca';
    super(url, injector, RelatorioPresenca.fromJson);
  }

  validateIdentity(recordId: string): Observable<IdentityValidationResult> {
    const url = `${this.apiPath}/${recordId}/validate`;
    return this.http.post<IdentityValidationResult>(url, {});
  }
}
