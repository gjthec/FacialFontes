import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResourceService } from 'app/shared/services/shared.service';
import { environment } from 'environments/environment';
import { AdminAluno } from './admin-alunos.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAlunosService extends BaseResourceService<AdminAluno> {
  protected http: HttpClient;

  constructor(protected override injector: Injector) {
    const url = environment.backendUrl + '/api/alunos';
    super(url, injector, AdminAluno.fromJson);
  }
}
