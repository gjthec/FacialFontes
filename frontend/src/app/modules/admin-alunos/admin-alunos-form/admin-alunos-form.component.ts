import {
  AfterViewInit,
  Component,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AdminAluno } from 'app/modules/admin-alunos/shared/admin-alunos.model';
import { AdminAlunosService } from '../shared/admin-alunos.service';
import { BaseResourceFormComponent } from 'app/shared/components/form/form.component';
import { FormGeneratorService } from 'app/shared/services/form-generator.service';
import { GeneratedFormFactoryService } from 'app/shared/services/generated-form-factory.service';
import { environment } from 'environments/environment';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-alunos-form',
  templateUrl: './admin-alunos-form.component.html',
  styleUrls: ['./admin-alunos-form.component.scss'],
})
export class AdminAlunosFormComponent
  extends BaseResourceFormComponent<AdminAluno>
  implements AfterViewInit
{
  JSONPath: string = environment.adminAlunosJSONPath;

  @ViewChild('placeToRender', { read: ViewContainerRef })
  target!: ViewContainerRef;

  constructor(
    protected adminAlunosService: AdminAlunosService,
    protected injector: Injector,
    private generatedFormFactoryService: GeneratedFormFactoryService,
    private formGeneratorService: FormGeneratorService
  ) {
    super(injector, new AdminAluno(), adminAlunosService, AdminAluno.fromJson);
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
      });
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
    });
  }
}
