import { Component , Input, Output, EventEmitter  } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  cars: any = [];
  searchClicked = false;
  notifications: string[] = [];
  bookings:any = [];
  searchlocationForm!: FormGroup;
  currentIndex = 0;
  intervalId: any;
  userName:any;

selectedBooking: any = null;
 
  images: string[] = [
    '../assets/images/banner1.jpg',
    '../assets/images/banner2.png',
    '../assets/images/banner3.jpg',
  ];





  
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfLocation = ['Mumbai', 'Delhi-NCR', 'Hyderabad', 'chennai', 'pune', 'Goa'];

  constructor(
    private customerService: CustomerService,
   
    private fb:FormBuilder
  ) { 
    this.searchlocationForm = this.fb.group({
      location: ['Delhi-NCR']
      
    })
  this.getActiveBookings();
   
      
  }
getActiveBookings() {
  this.customerService.getBookingByUserId().subscribe((res) => {
    this.bookings = [];
     console.log(res);
    if ( Array.isArray(res)) {
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.image;
        this.bookings.push(element);
      });
    } else {
      console.log("No active bookings found:", res);
    }
  }, error => {
    console.error("Error fetching bookings:", error);
  });
}

openModal(booking: any) {
  this.selectedBooking = booking;
  // Open the modal by checking the checkbox
  const modal = document.getElementById('booking-modal') as HTMLInputElement;
  if (modal) modal.checked = true;
}


   
  search() {
    this.searchClicked = true;
    this.cars = [];
    this.customerService.search(this.searchlocationForm.value).subscribe((res) => {
      res.carDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    })
    
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

  ngOnInit() {
    this.userName = localStorage.getItem("username");
   this.search();
   this.startAutoSlide();
    this.notifications = [
      'Your booking for Toyota Innova starts tomorrow.',
      'New discount: 20% off on weekend rides.',
    ];
  }

  

  getAllCars() {
    this.customerService.getAllCars().subscribe((res) => {
      console.log(res);
       res.forEach((element: any) => {
        // Explicitly define the type of 'element' as 'any'
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    });
  }
 

   

}
