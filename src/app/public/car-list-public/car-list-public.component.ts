import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { StorageService } from '../../authentication/services/storage/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-list-public',
  templateUrl: './car-list-public.component.html',
  styleUrls: ['./car-list-public.component.css']
})
export class CarListPublicComponent implements OnInit {

  cars: any[] = [];

  constructor(private publicService: PublicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCars();
  }
  isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();
  bookCar(id:any){
   if(this.isCustomerLoggedIn){
     this.router.navigateByUrl('/customer/book/'+id);
   }
   else{
     this.router.navigateByUrl('/login');
   }
  }

  loadCars() {
    this.publicService.getAllCars().subscribe((res)=>{
       res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });

    });
  }
}

