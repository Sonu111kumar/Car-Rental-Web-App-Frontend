import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListPublicComponent } from './car-list-public.component';

describe('CarListPublicComponent', () => {
  let component: CarListPublicComponent;
  let fixture: ComponentFixture<CarListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarListPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
