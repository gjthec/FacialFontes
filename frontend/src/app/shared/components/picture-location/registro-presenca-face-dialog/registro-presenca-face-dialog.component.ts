import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export type FaceDialogResult =
  | { cancelled: true }
  | { error: 'CAMERA_ERROR' | 'CAPTURE_FAILED' | 'TIMEOUT' }
  | { matched: boolean; score: number; blob?: Blob };

@Component({
  selector: 'app-registro-presenca-face-dialog',
  templateUrl: './registro-presenca-face-dialog.component.html',
  styleUrls: ['./registro-presenca-face-dialog.component.scss'],
})
export class RegistroPresencaFaceDialogComponent implements OnInit, OnDestroy {
  @ViewChild('videoEl', { static: true })
  videoEl!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvasEl', { static: true })
  canvasEl!: ElementRef<HTMLCanvasElement>;

  private stream?: MediaStream;
  private rafId?: number;

  private captureTimer?: number;
  private captureScheduled = false;
  private capturing = false;

  constructor(
    private dialogRef: MatDialogRef<
      RegistroPresencaFaceDialogComponent,
      FaceDialogResult
    >,
    private zone: NgZone
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.startCamera();
      this.startRenderLoop();
    } catch (e) {
      // Se der permissão negada etc.
      this.dialogRef.close({ error: 'CAMERA_ERROR' });
    }
  }

  private async startCamera(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'user' },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });

    const video = this.videoEl.nativeElement;
    video.srcObject = this.stream;

    // iOS/Safari friendly
    video.setAttribute('playsinline', 'true');

    await video.play();
  }

  private startRenderLoop(): void {
    const canvas = this.canvasEl.nativeElement;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const video = this.videoEl.nativeElement;

    const drawCover = (vw: number, vh: number, cw: number, ch: number) => {
      const vr = vw / vh;
      const cr = cw / ch;

      let sw = vw,
        sh = vh,
        sx = 0,
        sy = 0;

      if (cr > vr) {
        sh = vw / cr;
        sy = (vh - sh) / 2;
      } else {
        sw = vh * cr;
        sx = (vw - sw) / 2;
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    const scheduleRandomCaptureIfReady = () => {
      if (this.captureScheduled) return;
      if (!video.videoWidth || !video.videoHeight) return;

      this.captureScheduled = true;

      // "aleatório" (ajuste como quiser)
      const delayMs = Math.floor(1500 + Math.random() * 2500); // 1.5s ~ 4.0s

      this.captureTimer = window.setTimeout(() => {
        this.capturePhoto();
      }, delayMs);
    };

    const render = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const cw = Math.floor(canvas.clientWidth * dpr);
      const ch = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;

      if (!vw || !vh) {
        this.rafId = requestAnimationFrame(render);
        return;
      }

      drawCover(vw, vh, cw, ch);

      scheduleRandomCaptureIfReady();

      this.rafId = requestAnimationFrame(render);
    };

    this.rafId = requestAnimationFrame(render);
  }

  private capturePhoto(): void {
    if (this.capturing) return;
    this.capturing = true;

    const canvas = this.canvasEl.nativeElement;

    canvas.toBlob(
      (blob) => {
        // ⚠️ toBlob callback costuma rodar fora do Angular Zone
        this.zone.run(() => {
          if (!blob) {
            this.dialogRef.close({ error: 'CAPTURE_FAILED' });
            return;
          }

          const matched = Math.random() < 0.8;
          const score = matched
            ? Math.round((0.85 + Math.random() * 0.14) * 100) / 100
            : Math.round((0.2 + Math.random() * 0.4) * 100) / 100;

          this.dialogRef.close({ matched, score, blob });
        });
      },
      'image/jpeg',
      0.92
    );
  }

  close(): void {
    this.dialogRef.close({ cancelled: true });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.captureTimer) window.clearTimeout(this.captureTimer);

    try {
      this.stream?.getTracks().forEach((t) => t.stop());
    } catch {}
  }
}
