import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../contracts/Project.contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowprojectserviceService {
  private baseUrl = 'http://localhost:8080'; // Replace with your backend URL if different

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/getAllprojects`);
    
  }
}
