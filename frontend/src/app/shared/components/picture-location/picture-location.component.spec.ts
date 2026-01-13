import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureLocationComponent } from './picture-location.component';

describe('PictureLocationComponent', () => {
  let component: PictureLocationComponent;
  let fixture: ComponentFixture<PictureLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
