import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioPresencaRoutingModule } from './relatorio-presenca-routing.module';
import { RelatorioPresencaComponent } from './pages/relatorio-presenca/relatorio-presenca.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [RelatorioPresencaComponent],
  imports: [
    CommonModule,
    RelatorioPresencaRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class RelatorioPresencaModule {}
