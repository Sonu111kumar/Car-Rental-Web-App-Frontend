import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  cars: any = [];
  searchClicked = false;


clearFilters() {
  this.searchForm.reset();
  
}

  searchForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = [
    'Toyota',
    'Honda',
    'Nissan',
    'Jeep',
    'Kia',
    'Hyundai',
    'Suzuki',
    'Subaru',
    'Tata',
    'Mahindra',
    'Geely',
    'Chery',
    'Other',
  ];
  listOfType = ['Hybird', 'Electric', 'Petrol', 'Diesel', 'Gas', 'Other'];
  listOfColor = [
    'Red',
    'Blue',
    'Black',
    'White',
    'Silver',
    'Grey',
    'Brown',
    'Other',
  ];
  listOfTransmission = ['Automatic', 'Manual', 'Semi-Automatic'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { 
    this.searchForm = this.fb.group({
      brand: [''],
      type: [''],
      transmission: [''],
      color: [''],
    })
  }

  search() {
    this.searchClicked = true;
    this.cars = [];
    this.customerService.search(this.searchForm.value).subscribe((res) => {
      res.carDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    })
  }

  get transmission() {
    return this.searchForm.get('transmission');
  }

  get brand() {
    return this.searchForm.get('brand');
  }

  get type() {
    return this.searchForm.get('type');
  }

  get color() {
    return this.searchForm.get('color');
  }

}
