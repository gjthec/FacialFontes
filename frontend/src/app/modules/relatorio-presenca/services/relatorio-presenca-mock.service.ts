import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AttendanceRecord,
  MOCK_ATTENDANCE_REPORT,
} from '../mock/relatorio-presenca.mock';

export type IdentityValidationResult = {
  matched: boolean;
  score: number;
  checkedAtIso: string;
};

@Injectable({ providedIn: 'root' })
export class RelatorioPresencaMockService {
  listReport(): Observable<AttendanceRecord[]> {
    return of(MOCK_ATTENDANCE_REPORT).pipe(delay(300));
  }

  validateIdentityMock(studentId: string): Observable<IdentityValidationResult> {
    const matched = Math.random() < 0.88;
    const score = matched
      ? 0.84 + Math.random() * 0.14
      : 0.2 + Math.random() * 0.4;

    return of({
      matched,
      score: Number(score.toFixed(2)),
      checkedAtIso: new Date().toISOString(),
    }).pipe(delay(900));
  }
}
