import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teste } from 'app/modules/teste/shared/teste.model';
import { BaseResourceService } from 'app/shared/services/shared.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TesteService extends BaseResourceService<Teste> {
  protected http: HttpClient;

  constructor(protected override injector: Injector) {
    var url = environment.backendUrl + '/api/teste';

    super(url, injector, Teste.fromJson);
  }
}
