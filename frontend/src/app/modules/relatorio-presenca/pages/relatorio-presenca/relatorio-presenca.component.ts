import { Component, OnInit } from '@angular/core';
import { RelatorioPresenca } from '../../shared/relatorio-presenca.model';
import {
  IdentityValidationResult,
  RelatorioPresencaService,
} from '../../services/relatorio-presenca.service';

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
  records: RelatorioPresenca[] = [];
  loading = true;
  identityChecks: Record<string, IdentityValidationResult | undefined> = {};
  identityLoading: Record<string, boolean | undefined> = {};

  constructor(private relatorioService: RelatorioPresencaService) {}

  ngOnInit(): void {
    this.relatorioService.getAll().subscribe((records) => {
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

  validateIdentity(record: RelatorioPresenca): void {
    if (this.identityLoading[record.id]) {
      return;
    }

    this.identityLoading[record.id] = true;
    this.relatorioService
      .validateIdentity(record.id)
      .subscribe((result) => {
        this.identityChecks[record.id] = result;
        this.identityLoading[record.id] = false;
      });
  }
}
