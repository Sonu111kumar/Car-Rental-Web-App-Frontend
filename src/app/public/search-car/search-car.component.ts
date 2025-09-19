import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../public.service';
import { Router } from '@angular/router';
import { StorageService } from '../../authentication/services/storage/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {

  location: string = '';
  fromDate: string = '';
  toDate: string = '';
  cars: any[] = [];
  filterForm!: FormGroup;
  locations = ['Mumbai', 'Delhi-NCR', 'Hyderabad', 'chennai', 'pune', 'Goa'];
  availableBrands: string[] = ['Toyota', 'Honda', 'Hyundai', 'Ford', 'BMW'];
availableColors: string[] = ['White', 'Black', 'Red', 'Blue', 'Silver', 'Gray'];

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'];
      this.fromDate = params['from'];
      this.toDate = params['to'];

      // Call search API
      this.searchCars();
    });
      this.filterForm = this.fb.group({
      price: 8000,
      cartype: '',
      transmission: '',
      seats: '',
      location:this.location,
      color:'',
      brand: '',
      type:''
    });
  }



  applyFilters() {
    const filters = { ...this.filterForm.value};
    console.log('Applied Filters:', filters);
     this.cars = [];
    this.publicService.searchCars(filters).subscribe((res) => {
      res.carDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    });
  }

  resetFilters() {
    this.filterForm.reset({ priceRange: 5000 });
    
  }

  searchCars() {
    const searchDto = {
      location: this.location,
      from: this.fromDate,
      to: this.toDate
    };
    this.cars = [];
    this.publicService.searchCars(searchDto).subscribe((res) => {
      res.carDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    });
  }
    isCustomerLoggedIn: boolean =  StorageService.isCustomerLoggedIn();
  bookCar(id:any){
    if(this.isCustomerLoggedIn){
      this.router.navigateByUrl('/customer/book/' + id);
    }
    else
      this.router.navigateByUrl('/login');
    }
  

}







