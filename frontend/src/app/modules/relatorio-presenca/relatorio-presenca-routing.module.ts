import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioPresencaComponent } from './pages/relatorio-presenca/relatorio-presenca.component';

const routes: Routes = [{ path: '', component: RelatorioPresencaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioPresencaRoutingModule {}
