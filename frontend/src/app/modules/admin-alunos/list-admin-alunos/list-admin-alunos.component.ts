import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { ListFactoryService } from 'app/shared/services/list-factory.service';

@Component({
  selector: 'app-list-admin-alunos',
  templateUrl: './list-admin-alunos.component.html',
  styleUrls: ['./list-admin-alunos.component.scss'],
})
export class ListAdminAlunosComponent implements AfterViewInit, OnDestroy {
  displayedVariables = [];
  attributes = [];
  config: any;
  userConfig;
  searchableFields = [];
  JSONURL: string = environment.adminAlunosJSONPath;

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
