import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from 'app/modules/registro/shared/registro.model';
import { BaseResourceService } from 'app/shared/services/shared.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroService extends BaseResourceService<Registro> {
  protected http: HttpClient;

  constructor(protected override injector: Injector) {
    var url = environment.backendUrl + '/api/registro';

    super(url, injector, Registro.fromJson);
  }
}
