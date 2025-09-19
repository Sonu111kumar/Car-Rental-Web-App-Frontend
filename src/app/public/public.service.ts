import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private baseUrl = 'http://localhost:8080/api/v1/public';

  constructor(private http: HttpClient) { }

  // Fetch all cars (public info)
  getAllCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars`);
  }

  // Fetch car details by id (limited for public)
  getCarById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars/${id}`);
  }

  // Search availability / calculate fare
  searchCars(searchDto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/car/search`, searchDto);
  }

  // Get public offers
  getOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/offers`);
  }

  // Get FAQs
  getFAQs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/faqs`);
  }

  // Submit contact form
  submitContactForm(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, data);
  }

  // Newsletter subscription
  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscribe`, { email });
  }
}
