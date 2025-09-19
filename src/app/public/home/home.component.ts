import { Component , Input, Output, EventEmitter  } from '@angular/core';
import { PublicService } from '../public.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../authentication/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 searchClicked = false;
  currentIndex1 = 0;
  carsPerSlide = 5;
  featuredCars: any[] = [];
  searchlocationForm!: FormGroup;
  currentIndex = 0;
  intervalId: any;

selectedCar: any = null;

openCarModal(car: any) {
  this.selectedCar = car;
  (document.getElementById('carDetailsModal') as HTMLInputElement).checked = true;
}
  images: string[] = [
    '../assets/images/banner1.jpg',
    '../assets/images/banner2.png',
    '../assets/images/banner3.jpg',
  ];


  listOfOption: Array<{ label: string; value: string }> = [];
  listOfLocation = ['Mumbai', 'Delhi-NCR', 'Hyderabad', 'chennai', 'pune', 'Goa'];

  constructor(
    private publicService: PublicService,
    private router:Router,
    private fb:FormBuilder
  ) { 
    this.searchlocationForm = this.fb.group({
      location: ['Delhi-NCR'],
      fromDate: "",
      toDate:""
    })  
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
        this.featuredCars.push(element);
      });

    });
  }
// Cars currently visible in the carousel
get visibleCars() {
  return this.featuredCars.slice(this.currentIndex1, this.currentIndex1 + this.carsPerSlide);
}
// Move forward
nextSlide1() {
  if (this.currentIndex1 + this.carsPerSlide < this.featuredCars.length) {
    this.currentIndex1 += this.carsPerSlide ;
  } else {
    this.currentIndex1 = 0; // loop back to start
  }
}

// Move backward
prevSlide1() {
  if (this.currentIndex1 - this.carsPerSlide >= 0) {
    this.currentIndex1 -= this.carsPerSlide ;
  } else {
    this.currentIndex1 = this.featuredCars.length - this.carsPerSlide;
  }
}

// Navigate to full car list
viewAllCars() {
  this.router.navigate(['/cars']);
}
   
  search() {
    this.searchClicked = true;
    this.router.navigate(['/search'],{
       queryParams: {
         location: this.searchlocationForm.get('location')?.value,
      from: this.searchlocationForm.get('fromDate')?.value,
      to: this.searchlocationForm.get('toDate')?.value
      }
    });
    
  }
ngOnDestroy() {
    clearInterval(this.intervalId);
  }


  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
   startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3 seconds
  }
 prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  get location() {
    return this.searchlocationForm.get('location');
  }
get fromDate() {
  return this.searchlocationForm.get('fromDate')?.value;
}

get toDate() {
  return this.searchlocationForm.get('toDate')?.value;
}
  ngOnInit() {
   
   this.startAutoSlide();
   this.loadCars();
  }

  

}
