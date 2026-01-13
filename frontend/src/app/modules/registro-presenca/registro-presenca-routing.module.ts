import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPresencaNewComponent } from './pages/registro-presenca-new/registro-presenca-new.component';

const routes: Routes = [
  { path: 'new', component: RegistroPresencaNewComponent },
  { path: '', redirectTo: 'new', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPresencaRoutingModule {}
