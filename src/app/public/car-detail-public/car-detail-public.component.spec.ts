import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailPublicComponent } from './car-detail-public.component';

describe('CarDetailPublicComponent', () => {
  let component: CarDetailPublicComponent;
  let fixture: ComponentFixture<CarDetailPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
