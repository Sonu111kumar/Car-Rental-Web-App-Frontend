import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarListPublicComponent } from './car-list-public/car-list-public.component';
import { CarDetailPublicComponent } from './car-detail-public/car-detail-public.component';
import { SearchCarComponent } from './search-car/search-car.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'cars', component: CarListPublicComponent },
  { path: 'cars/:id', component: CarDetailPublicComponent },
  { path: 'search', component: SearchCarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
