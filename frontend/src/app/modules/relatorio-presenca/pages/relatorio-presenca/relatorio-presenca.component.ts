import { Component, OnInit } from '@angular/core';
import {
  AttendanceRecord,
} from '../../mock/relatorio-presenca.mock';
import {
  IdentityValidationResult,
  RelatorioPresencaMockService,
} from '../../services/relatorio-presenca-mock.service';

@Component({
  selector: 'app-relatorio-presenca',
  templateUrl: './relatorio-presenca.component.html',
  styleUrls: ['./relatorio-presenca.component.scss'],
})
export class RelatorioPresencaComponent implements OnInit {
  displayedColumns: string[] = [
    'classDate',
    'courseName',
    'student',
    'matricula',
    'status',
    'checkInMethod',
    'identity',
  ];
  records: AttendanceRecord[] = [];
  loading = true;
  identityChecks: Record<string, IdentityValidationResult | undefined> = {};
  identityLoading: Record<string, boolean | undefined> = {};

  constructor(private relatorioService: RelatorioPresencaMockService) {}

  ngOnInit(): void {
    this.relatorioService.listReport().subscribe((records) => {
      this.records = records;
      this.loading = false;
    });
  }

  get totalPresent(): number {
    return this.records.filter((record) => record.status === 'Presente').length;
  }

  get totalAbsent(): number {
    return this.records.filter((record) => record.status === 'Ausente').length;
  }

  validateIdentity(record: AttendanceRecord): void {
    if (this.identityLoading[record.id]) {
      return;
    }

    this.identityLoading[record.id] = true;
    this.relatorioService
      .validateIdentityMock(record.studentId)
      .subscribe((result) => {
        this.identityChecks[record.id] = result;
        this.identityLoading[record.id] = false;
      });
  }
}
