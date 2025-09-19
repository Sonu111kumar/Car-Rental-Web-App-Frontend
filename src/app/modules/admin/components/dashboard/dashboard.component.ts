import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  cars: any = [];
  bookings: any = [];
 
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
    ) {
      this.getBookings();
    }


   



    
  getBookings() {
    this.adminService.getAllBookings().subscribe((res) => {
      console.log(res);
      this.bookings = res;
    })
  }


  changeBookingStatus(bookingId: number, status: string) {
    console.log(bookingId, status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res) => {
      console.log(res);
      this.toastr.success('Booking status updated successfully');
      this.getBookings();
    }, (err) => {
      console.log(err);
      this.toastr.error('Failed to update booking status');
    })
  }



  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    });
  }

  deleteCar(id : number){
    console.log(id)
    this.adminService.deleteCar(id).subscribe((res) => {
      // Remove the deleted car from the cars array
      this.cars = this.cars.filter((car: any) => car.id !== id);
      this.toastr.success('Car deleted successfully', 'Success');
    })
  }

}
