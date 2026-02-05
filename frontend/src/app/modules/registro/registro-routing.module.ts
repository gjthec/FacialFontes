import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroFormComponent } from './registro-form/registro-form.component';
import { ListRegistroComponent } from './list-registro/list-registro.component';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListRegistroComponent, canActivate: [AuthGuard] },
  { path: 'new', component: RegistroFormComponent },
  { path: ':id/edit', component: RegistroFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroRoutingModule {}
