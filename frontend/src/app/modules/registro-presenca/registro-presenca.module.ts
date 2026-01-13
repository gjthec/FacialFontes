import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroPresencaRoutingModule } from './registro-presenca-routing.module';
import { RegistroPresencaNewComponent } from './pages/registro-presenca-new/registro-presenca-new.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegistroPresencaFaceDialogComponent } from './pages/registro-presenca-face-dialog/registro-presenca-face-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    RegistroPresencaNewComponent,
    RegistroPresencaFaceDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroPresencaRoutingModule,

    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class RegistroPresencaModule {}
