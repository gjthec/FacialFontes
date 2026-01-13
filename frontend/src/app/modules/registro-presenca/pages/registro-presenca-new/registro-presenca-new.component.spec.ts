import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPresencaNewComponent } from './registro-presenca-new.component';

describe('RegistroPresencaNewComponent', () => {
  let component: RegistroPresencaNewComponent;
  let fixture: ComponentFixture<RegistroPresencaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPresencaNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPresencaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
