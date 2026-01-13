import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroFormComponent } from './registro-form/registro-form.component';
import { ListRegistroComponent } from './list-registro/list-registro.component';

const routes: Routes = [
  { path: '', component: ListRegistroComponent },
  { path: 'new', component: RegistroFormComponent },
  { path: ':id/edit', component: RegistroFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroRoutingModule {}
