import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTesteComponent } from './list-teste.component';

describe('ListTesteComponent', () => {
  let component: ListTesteComponent;
  let fixture: ComponentFixture<ListTesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTesteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
