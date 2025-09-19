import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { CarListPublicComponent } from './car-list-public/car-list-public.component';
import { CarDetailPublicComponent } from './car-detail-public/car-detail-public.component';
import { SearchCarComponent } from './search-car/search-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    CarListPublicComponent,
    CarDetailPublicComponent,
    SearchCarComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
