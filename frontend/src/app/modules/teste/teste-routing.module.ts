import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesteFormComponent } from './teste-form/teste-form.component'; 
import { ListTesteComponent } from './list-teste/list-teste.component'; 


const routes: Routes = [
  { path: '', component: ListTesteComponent}, 
  { path: 'new', component: TesteFormComponent}, 
  { path: ':id/edit', component: TesteFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TesteRoutingModule { }
