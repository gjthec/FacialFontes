import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAlunosRoutingModule } from './admin-alunos-routing.module';
import { AdminAlunosFormComponent } from './admin-alunos-form/admin-alunos-form.component';
import { ListAdminAlunosComponent } from './list-admin-alunos/list-admin-alunos.component';

@NgModule({
  declarations: [AdminAlunosFormComponent, ListAdminAlunosComponent],
  imports: [CommonModule, AdminAlunosRoutingModule],
})
export class AdminAlunosModule {}
