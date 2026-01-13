import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  RegistroPresencaMockService,
  AttendanceReceipt,
} from '../../services/registro-presenca-mock.service';
import { Course, Student } from '../../mock/registro-presenca.mock';
import { MatDialog } from '@angular/material/dialog';
import {
  FaceDialogResult,
  RegistroPresencaFaceDialogComponent,
} from '../registro-presenca-face-dialog/registro-presenca-face-dialog.component';

@Component({
  selector: 'app-registro-presenca-new',
  templateUrl: './registro-presenca-new.component.html',
})
export class RegistroPresencaNewComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse?: Course;

  student?: Student;

  isValidating = false;
  isVerifyingFace = false;
  isRegistering = false;

  faceOk = false;
  faceScore?: number;

  receipt?: AttendanceReceipt;
  error?: string;

  form = this.fb.group({
    courseId: ['', Validators.required],
    code: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private mock: RegistroPresencaMockService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mock.listCourses().subscribe((c) => (this.courses = c));
  }

  onSelectCourse(): void {
    this.error = undefined;
    this.student = undefined;
    this.faceOk = false;
    this.receipt = undefined;

    const courseId = this.form.value.courseId;
    this.selectedCourse =
      this.courses.find((c) => c.id === courseId) ?? undefined;
  }

  validateEnrollment(): void {
    this.error = undefined;
    this.student = undefined;
    this.faceOk = false;
    this.receipt = undefined;

    const courseId = this.form.value.courseId;
    const code = this.form.value.code;

    if (!courseId || !code) {
      this.error = 'Selecione o curso e informe o código.';
      return;
    }

    this.setValidating(true);

    this.mock.validateEnrollment(courseId, code).subscribe({
      next: (res) => {
        this.setValidating(false);
        this.later(() => {
          if (!res.ok || !res.student) {
            this.error = 'Matrícula/CPF não encontrado para esse curso (FAKE).';
            return;
          }
          this.student = res.student;
        });
      },
      error: () => {
        this.setValidating(false);
        this.later(() => (this.error = 'Falha ao validar (FAKE).'));
      },
    });
  }
  private later(fn: () => void) {
    setTimeout(fn, 0);
  }

  private setVerifyingFace(v: boolean) {
    this.later(() => (this.isVerifyingFace = v));
  }

  private setValidating(v: boolean) {
    this.later(() => (this.isValidating = v));
  }

  private setRegistering(v: boolean) {
    this.later(() => (this.isRegistering = v));
  }
  startFaceRecognition(): void {
    this.error = undefined;
    this.faceOk = false;
    this.faceScore = undefined;
    this.receipt = undefined;

    if (!this.student) return;

    const ref = this.dialog.open(RegistroPresencaFaceDialogComponent, {
      panelClass: 'face-fullscreen-dialog',
      width: '100vw',
      height: '100dvh',
      maxWidth: '100vw',
      maxHeight: '100dvh',
      autoFocus: false,
    });

    this.setVerifyingFace(true);

    ref.afterClosed().subscribe((res: any) => {
      this.setVerifyingFace(false);

      if (!res) return;

      // se vier { matched, score }
      this.later(() => {
        this.faceOk = !!res.matched;
        this.faceScore = res.score;

        if (!this.faceOk) {
          this.error =
            'Não foi possível confirmar a identidade. Tente novamente.';
        }
      });
    });
  }

  registerPresence(): void {
    if (!this.selectedCourse || !this.student || !this.faceOk) return;

    this.error = undefined;
    this.isRegistering = true;

    // você pode trocar pra: getLocationFake() e colocar no receipt também.
    this.mock
      .registerAttendanceFake(this.selectedCourse.id, this.student.id)
      .subscribe({
        next: (receipt) => {
          this.isRegistering = false;
          this.receipt = receipt;
        },
        error: () => {
          this.isRegistering = false;
          this.error = 'Erro ao registrar presença (FAKE).';
        },
      });
  }

  reset(): void {
    this.form.reset({ courseId: '', code: '' });
    this.selectedCourse = undefined;
    this.student = undefined;
    this.faceOk = false;
    this.faceScore = undefined;
    this.receipt = undefined;
    this.error = undefined;
  }
}
