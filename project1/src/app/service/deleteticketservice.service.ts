import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteticketserviceService {

  private baseUrl = 'http://localhost:8080/deleteTicket'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  deleteTicket(id: number): Observable<string> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url,{ responseType: 'text' });
  }
}
