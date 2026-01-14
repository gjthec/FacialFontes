import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAlunosFormComponent } from './admin-alunos-form/admin-alunos-form.component';
import { ListAdminAlunosComponent } from './list-admin-alunos/list-admin-alunos.component';

const routes: Routes = [
  { path: '', component: ListAdminAlunosComponent },
  { path: 'new', component: AdminAlunosFormComponent },
  { path: ':id/edit', component: AdminAlunosFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAlunosRoutingModule {}
