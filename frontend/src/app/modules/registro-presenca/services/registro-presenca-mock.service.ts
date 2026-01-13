import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  Course,
  Student,
  MOCK_COURSES,
  MOCK_STUDENTS_BY_COURSE,
  MOCK_PHOTO_DATA_URI,
} from '../mock/registro-presenca.mock';

export type FaceVerifyResult = { matched: boolean; score: number };

export type LocationDTO = { lat: number; lng: number; accuracy: number };

export type AttendanceReceipt = {
  courseId: string;
  studentId: string;
  timestampIso: string;
  photoDataUri: string;
  location: LocationDTO;
};

@Injectable({ providedIn: 'root' })
export class RegistroPresencaMockService {
  listCourses(): Observable<Course[]> {
    return of(MOCK_COURSES).pipe(delay(250));
  }

  validateEnrollment(
    courseId: string,
    code: string
  ): Observable<{ ok: boolean; student?: Student }> {
    const list = MOCK_STUDENTS_BY_COURSE[courseId] ?? [];
    const normalized = (code ?? '').replace(/\D/g, ''); // se for cpf, remove pontuação

    const found = list.find(
      (s) =>
        s.cpf === normalized || s.codSist?.toLowerCase() === code.toLowerCase()
    );

    return of(found).pipe(
      delay(400),
      map((student) => (student ? { ok: true, student } : { ok: false }))
    );
  }

  verifyFaceFake(): Observable<FaceVerifyResult> {
    // 90% de chance de sucesso (fake)
    const matched = Math.random() < 0.9;
    const score = matched
      ? 0.85 + Math.random() * 0.12
      : 0.2 + Math.random() * 0.3;
    return of({ matched, score: Number(score.toFixed(2)) }).pipe(delay(1200));
  }

  getLocationFake(): Observable<LocationDTO> {
    // “fake Itapema/SC-ish”
    const baseLat = -27.09;
    const baseLng = -48.61;
    const jitter = () => (Math.random() - 0.5) * 0.01;

    return of({
      lat: Number((baseLat + jitter()).toFixed(6)),
      lng: Number((baseLng + jitter()).toFixed(6)),
      accuracy: 15 + Math.floor(Math.random() * 25),
    }).pipe(delay(300));
  }

  registerAttendanceFake(
    courseId: string,
    studentId: string
  ): Observable<AttendanceReceipt> {
    const receipt: AttendanceReceipt = {
      courseId,
      studentId,
      timestampIso: new Date().toISOString(),
      photoDataUri: MOCK_PHOTO_DATA_URI,
      location: {
        lat: -27.090123,
        lng: -48.612345,
        accuracy: 18,
      },
    };

    return of(receipt).pipe(delay(600));
  }
}
