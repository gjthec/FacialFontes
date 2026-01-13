import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DefaultListComponent } from 'app/shared/components/default-list/default-list.component';
import { FormGeneratorService } from 'app/shared/services/form-generator.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { ListFactoryService } from 'app/shared/services/list-factory.service';

@Component({
  selector: 'app-list-registro',
  templateUrl: './list-registro.component.html',
})
export class ListRegistroComponent implements AfterViewInit, OnDestroy {
  displayedVariables = [];
  attributes = [];
  config: any;
  userConfig;
  searchableFields = [];
  //apiURL: string = environment.RegistroAPIPath;//Campo que é alterável, o nome do campo "variations"+"APIPATH".
  JSONURL: string = environment.registroJSONPath; // Campo que é alterável, o nome do campo "variations"+"JSONPATH".
  /**
   * Subject responsável por remover os observadores que estão rodando na pagina no momento do componente ser deletado.
   */
  private ngUnsubscribe = new Subject();

  @ViewChild('placeToRender', { read: ViewContainerRef })
  target!: ViewContainerRef;

  constructor(private listFactory: ListFactoryService) {}

  ngAfterViewInit(): void {
    this.listFactory.createList(this.target, this.JSONURL);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);

    this.ngUnsubscribe.complete();
  }
}
