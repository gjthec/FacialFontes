import { Component, Injector, Input, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field/base-field.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FileService } from 'app/shared/services/file.service';
import { IFieldFile } from 'app/shared/models/file.model';
import { Subject, takeUntil, finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import {
  FaceDialogResult,
  RegistroPresencaFaceDialogComponent,
} from './registro-presenca-face-dialog/registro-presenca-face-dialog.component';

@Component({
  selector: 'app-picture-location',
  templateUrl: './picture-location.component.html',
  styleUrl: './picture-location.component.scss',
})
export class PictureLocationComponent
  extends BaseFieldComponent
  implements OnInit, OnDestroy
{
  @Input() label: string;
  @Input() isRequired: boolean = false;
  @Input() className: string;

  /** Condicao de visibilidade do campo. */
  @Input() conditionalVisibility: { field: string; values: string[] };

  /** FormGroup do formulario. */
  @Input() resourceForm: FormGroup<any>;

  /** Subject responsável por remover observadores */
  private ngUnsubscribe = new Subject<void>();

  inputValue = new FormControl();

  // ✅ IGUAL O ANTIGO
  savedImageUrl: string | null = null;
  showImageUrl: boolean = false;

  // UI
  isVerifyingFace = false;
  faceOk = false;
  faceScore: number | null = null;
  error?: string;

  constructor(
    protected injector: Injector,
    private fileService: FileService,
    private dialog: MatDialog
  ) {
    super(injector);
  }
  @Input() controlName!: string;

  ngOnInit(): void {
    this.checkConditional();

    const ctrl = this.resourceForm.get(this.controlName) as FormControl | null;
    if (ctrl) {
      this.inputValue = ctrl; // ✅ agora patchValue chega aqui
    } else {
      this.resourceForm.addControl(this.controlName, this.inputValue);
    }

    // ✅ agora funciona no edit
    this.loadThumbnailFromValue(this.inputValue.value);

    this.inputValue.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((v) => {
        if (v && typeof v === 'object' && (v as any).id) {
          this.loadThumbnailFromValue(v);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /** ===========================
   *  NOVO FLOW: abre modal e só salva se matched
   *  =========================== */
  startFaceRecognition(): void {
    this.error = undefined;
    this.faceOk = false;
    this.faceScore = null;

    const ref = this.dialog.open<
      RegistroPresencaFaceDialogComponent,
      any,
      FaceDialogResult
    >(RegistroPresencaFaceDialogComponent, {
      panelClass: 'face-fullscreen-dialog',
      width: '100vw',
      height: '100dvh',
      maxWidth: '100vw',
      maxHeight: '100dvh',
      autoFocus: false,
    });

    this.isVerifyingFace = true;

    ref
      .afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => (this.isVerifyingFace = false))
      )
      .subscribe((res) => {
        if (!res) return;

        // 1) cancelado
        if ('cancelled' in res && res.cancelled) return;

        // 2) erro de camera/captura
        if ('error' in res) {
          this.error = 'Não foi possível abrir/capturar a câmera.';
          return;
        }

        // 3) resultado matched
        if (!('matched' in res)) return;

        this.faceOk = !!res.matched;
        this.faceScore = res.score ?? null;

        if (!this.faceOk) {
          this.error = 'Reconhecimento facial não autorizado. Tente novamente.';
          return;
        }

        if (!res.blob) {
          this.error = 'Captura da foto falhou.';
          return;
        }

        // ✅ salva igual era feito (seta thumb + showImageUrl + upload)
        this.saveAcceptedBlob(res.blob).catch((e) => {
          console.error(e);
          this.error = 'Falha ao preparar/enviar a foto.';
        });
      });
  }

  /** Igual ao antigo: atualiza UI (thumb) e sobe pro backend */
  private async saveAcceptedBlob(blob: Blob): Promise<void> {
    const previewDataUrl = await this.blobToDataUrl(blob);
    const base64 = previewDataUrl.split(',')[1] || '';

    // ✅ UI igual antigo
    this.savedImageUrl = previewDataUrl;
    this.showImageUrl = true;

    // (opcional) se você fazia isso antes, pode manter
    // this.inputValue.setValue(null);

    const location = await this.getLocation().catch(() => '');

    const mimeType = blob.type || 'image/jpeg';
    const extension = (mimeType.split('/')[1] || 'jpg').toLowerCase();
    const fileName = `image.${extension}`;

    const fieldFile: IFieldFile = {
      fieldType: 'string',
      files: [
        {
          name: fileName,
          size: base64.length, // aproximado
          extension,
          dataBlob: base64,
          mimeType,
        } as any,
      ],
      location,
    };

    return new Promise<void>((resolve, reject) => {
      this.fileService.uploadFile(fieldFile).subscribe({
        next: (response) => {
          // ✅ IGUAL antigo: guarda response (normalmente {id: ...})
          this.inputValue.setValue(response);
          resolve();
        },
        error: (e) => reject(e),
      });
    });
  }

  /** ===========================
   *  Conditional visibility (igual o seu)
   *  =========================== */
  checkConditional() {
    if (!this.conditionalVisibility) return;

    let initialFieldValue = this.resourceForm.get(
      this.conditionalVisibility.field
    )?.value;

    if (
      initialFieldValue &&
      typeof initialFieldValue === 'object' &&
      initialFieldValue.id
    ) {
      initialFieldValue = initialFieldValue.id;
    }

    if (initialFieldValue !== null && typeof initialFieldValue !== 'string') {
      initialFieldValue = initialFieldValue.toString();
    }

    if (this.conditionalVisibility.values.includes(initialFieldValue)) {
      if (this.inputValue.disabled) this.inputValue.enable();
    } else {
      if (this.inputValue.enabled) this.inputValue.disable();
    }

    this.resourceForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((formValues) => {
        let fieldValue = formValues[this.conditionalVisibility.field];

        if (fieldValue && typeof fieldValue === 'object' && fieldValue.id) {
          fieldValue = fieldValue.id;
        }

        const fieldValueStr = fieldValue?.toString();
        if (this.conditionalVisibility.values.includes(fieldValueStr)) {
          if (this.inputValue.disabled) this.inputValue.enable();
        } else {
          if (this.inputValue.enabled) this.inputValue.disable();
        }
      });
  }

  /** ===========================
   *  Clear (igual antigo)
   *  =========================== */
  clearImage() {
    this.inputValue.setValue(null);
    this.savedImageUrl = null;
    this.showImageUrl = false;

    this.faceOk = false;
    this.faceScore = null;
    this.error = undefined;
  }

  /** ===========================
   *  Edit thumbnail (igual antigo)
   *  =========================== */
  private loadThumbnailFromValue(value: any) {
    console.log(value);
    const id = value?.id; // ✅ igual seu antigo
    console.log(id);
    if (!id) return;

    this.fileService.getDataUrlByFieldFileId(id).subscribe({
      next: ({ dataUrl }) => {
        this.savedImageUrl = dataUrl;
        console.log(this.savedImageUrl);
        this.showImageUrl = true;
      },
      error: (e) => {
        console.error('Erro ao buscar dataUrl do FieldFile:', e);
        this.showImageUrl = false;
      },
    });
  }

  /** ===========================
   *  Helpers
   *  =========================== */
  private getQuadrant(lat: number, lng: number): string {
    if (lat >= 0 && lng >= 0) return 'NE (Nordeste)';
    if (lat >= 0 && lng < 0) return 'NO (Noroeste)';
    if (lat < 0 && lng >= 0) return 'SE (Sudeste)';
    return 'SO (Sudoeste)';
  }

  private getLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalização não é suportada pelo navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const quadrant = this.getQuadrant(lat, lng);
          resolve(`Lat: ${lat}, Lng: ${lng}, Quadrante: ${quadrant}`);
        },
        () => reject('Não foi possível obter a localização.')
      );
    });
  }

  private blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(blob);
    });
  }
}
