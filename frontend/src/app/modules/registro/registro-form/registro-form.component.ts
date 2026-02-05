import {
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Registro } from 'app/modules/registro/shared/registro.model';
import { RegistroService } from '../shared/registro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceFormComponent } from 'app/shared/components/form/form.component';
import { FormGeneratorService } from 'app/shared/services/form-generator.service';
import { GeneratedFormFactoryService } from 'app/shared/services/generated-form-factory.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details-registro',
  templateUrl: './registro-form.component.html',
})
export class RegistroFormComponent
  extends BaseResourceFormComponent<Registro>
  implements AfterViewInit, OnDestroy
{
  JSONPath: string = environment.registroJSONPath;

  @ViewChild('placeToRender', { read: ViewContainerRef })
  target!: ViewContainerRef;
  /**
   * Subject responsável por remover os observadores que estão rodando na pagina no momento do componente ser deletado.
   */
  //  private ngUnsubscribe = new Subject();

  constructor(
    protected registroService: RegistroService, //Linha alterável com base na classe
    protected injector: Injector,
    private generatedFormFactoryService: GeneratedFormFactoryService,
    private formGeneratorService: FormGeneratorService,
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) {
    super(injector, new Registro(), registroService, Registro.fromJson); //Linha alterável com base na classe
    this.buildResourceForm();
  }

  ngAfterViewInit(): void {
    this.formGeneratorService
      .getJSONFromDicionario(this.JSONPath)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((JSONDictionary: any) => {
        this.generatedFormFactoryService.getDataToCreateFrom(
          JSONDictionary,
          this.target,
          () => {
            this.loadResource();
          },
          this.resourceForm,
          () => {
            this.submitForm();
          },
          () => {
            this.deleteResource();
          },
          this.currentAction
        );

        this.setupMatriculaValidation();
      });
  }

  getDataFromAPI() {
    super.ngOnInit();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
    });
  }

  private setupMatriculaValidation(): void {
    const matriculaControl = this.resourceForm.get('matricula');

    if (!matriculaControl) {
      return;
    }

    matriculaControl.valueChanges
      .pipe(
        map((value) => (typeof value === 'string' ? value.trim() : '')),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((matricula) => {
          if (!matricula) {
            this.clearMatriculaError(matriculaControl);
            return of({ exists: false, empty: true });
          }

          return this.http
            .get(
              `${environment.backendUrl}/api/alunos/validate/matricula/${encodeURIComponent(
                matricula
              )}`
            )
            .pipe(
              map(() => ({ exists: true, empty: false })),
              catchError(() => of({ exists: false, empty: false }))
            );
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((result) => {
        if (result.empty) {
          return;
        }

        if (!result.exists) {
          matriculaControl.setErrors({
            ...(matriculaControl.errors || {}),
            notFound: true,
          });
          this.matSnackBar.open('Matrícula não encontrada.', 'Fechar', {
            duration: 3000,
          });
          return;
        }

        this.clearMatriculaError(matriculaControl);
      });
  }

  private clearMatriculaError(matriculaControl: AbstractControl) {
    const errors = { ...(matriculaControl.errors || {}) };
    if (!errors.notFound) {
      return;
    }
    delete errors.notFound;
    const hasRemainingErrors = Object.keys(errors).length > 0;
    matriculaControl.setErrors(hasRemainingErrors ? errors : null);
  }

  //  ngOnDestroy(): void {
  //    this.ngUnsubscribe.next(null);
  //    this.ngUnsubscribe.complete();
  //  }
}
