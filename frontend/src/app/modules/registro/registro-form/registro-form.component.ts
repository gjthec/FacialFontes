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
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, interval, of, takeUntil } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';

interface ActiveCourse {
  idCurso: number | string;
  nome: string;
}

interface CursoOption {
  id: string | number;
  pt: string;
  en: string;
}

@Component({
  selector: 'app-details-registro',
  templateUrl: './registro-form.component.html',
})
export class RegistroFormComponent
  extends BaseResourceFormComponent<Registro>
  implements AfterViewInit, OnDestroy
{
  JSONPath: string = environment.registroJSONPath;
  private registroDictionary: any;

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
        this.initializeCursoOptions(JSONDictionary);
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
        this.registerMatriculaWatcher();
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

  private initializeCursoOptions(JSONDictionary: any): void {
    if (!JSONDictionary?.attributes) {
      return;
    }

    this.registroDictionary = JSONDictionary;
    const cursoAttribute = JSONDictionary.attributes.find(
      (attribute) => attribute.name === 'cursoId'
    );

    if (!cursoAttribute) {
      return;
    }

    if (!Array.isArray(cursoAttribute.optionList)) {
      cursoAttribute.optionList = [];
    }

    cursoAttribute.optionList.splice(0, cursoAttribute.optionList.length);
  }

  private registerMatriculaWatcher(): void {
    this.waitForControl('alunoId')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((alunoControl) => {
        alunoControl.valueChanges
          .pipe(
            startWith(alunoControl.value),
            map((value) => this.resolveMatriculaId(value)),
            distinctUntilChanged(),
            switchMap((matriculaId) =>
              this.loadCursosByMatricula(matriculaId)
            ),
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe((cursos) => {
            this.setCursoOptions(cursos);
          });
      });
  }

  private waitForControl(controlName: string) {
    return interval(100).pipe(
      map(() => this.resourceForm.get(controlName)),
      filter((control): control is AbstractControl => !!control),
      take(1)
    );
  }

  private resolveMatriculaId(alunoValue: any): string | number | null {
    if (!alunoValue) {
      return null;
    }

    if (typeof alunoValue === 'string' || typeof alunoValue === 'number') {
      return alunoValue;
    }

    if (alunoValue.idMatriculaUsuario) {
      return alunoValue.idMatriculaUsuario;
    }

    if (alunoValue.matricula) {
      return alunoValue.matricula;
    }

    if (alunoValue.id) {
      return alunoValue.id;
    }

    return null;
  }

  private loadCursosByMatricula(matriculaId: string | number | null) {
    if (!matriculaId) {
      return of([]);
    }

    return this.registroService.getActiveCoursesByMatricula(matriculaId).pipe(
      map((response) => response.cursos ?? []),
      catchError((error) => {
        const message =
          error?.status === 404
            ? 'Matrícula não encontrada.'
            : 'Erro ao buscar cursos da matrícula.';
        this.matSnackBar.open(message, 'Fechar', {
          duration: 5000,
        });
        return of([]);
      })
    );
  }

  private setCursoOptions(cursos: ActiveCourse[]): void {
    const cursoAttribute = this.findCursoAttribute();
    if (!cursoAttribute) {
      return;
    }

    if (!Array.isArray(cursoAttribute.optionList)) {
      cursoAttribute.optionList = [];
    }

    const options: CursoOption[] = cursos.map((curso) => ({
      id: curso.idCurso,
      pt: curso.nome,
      en: curso.nome,
    }));

    cursoAttribute.optionList.splice(
      0,
      cursoAttribute.optionList.length,
      ...options
    );

    const cursoControl = this.resourceForm.get('cursoId');
    if (!cursoControl) {
      return;
    }

    const currentValue = cursoControl.value;
    if (!currentValue) {
      return;
    }

    const currentId =
      typeof currentValue === 'object'
        ? currentValue.id ?? currentValue
        : currentValue;
    const hasCurrentValue = options.some((option) => option.id === currentId);

    if (!hasCurrentValue) {
      cursoControl.reset();
    }
  }

  private findCursoAttribute() {
    return this.registroDictionary?.attributes?.find(
      (attribute) => attribute.name === 'cursoId'
    );
  }

  //  ngOnDestroy(): void {
  //    this.ngUnsubscribe.next(null);
  //    this.ngUnsubscribe.complete();
  //  }
}
