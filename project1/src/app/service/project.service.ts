import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../contracts/EmployeeDTO';
import { Project } from '../contracts/Project.contract';
import { Employee } from '../contracts/Employee.contract';
import { AssignEmployeeIdDTO } from '../contracts/AssignEmployeeIdDTO';
import { SprintDTO } from '../contracts/SprintDTO';
import { TicketDTO } from '../contracts/ticketDTO';
import { Project1 } from '../contracts/Project1';
import { Employee1 } from '../contracts/Employee1.contract';
import { EmployeeDTO1 } from '../contracts/EmployeeDTO1';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl: string='http://localhost:8080/organisation';

  constructor(private http: HttpClient) {}


  getAllEmployees():Observable<EmployeeDTO1[]>{
    return this.http.get<EmployeeDTO1[]>(this.apiUrl+'/ologin/allEmployees');
  }
  createProject(projectData: any): Observable<any> {
    return this.http.post('http://localhost:8080/organisation/ologin/createProject', projectData);
  }

  getProjects(): Observable<Project1[]> {
    return this.http.get<Project1[]>('http://localhost:8080/organisation/ologin/dto');
  }

  getAvailableEmployees(): Observable<Employee1[]> {
    return this.http.get<Employee1[]>('http://localhost:8080/organisation/ologin/availableEmployees');
  }

  assignEmployeesToProject(emp :AssignEmployeeIdDTO): Observable<any> {
    return this.http.post('http://localhost:8080/organisation/ologin/assigned', emp);
  }

  getAssignedEmployees(projectId: number): Observable<Employee1[]> {
    return this.http.get<Employee1[]>(`http://localhost:8080/organisation/ologin/getEmployees/${projectId}`);
  }

  getAssignedSprints(projectId: number): Observable<SprintDTO[]> {
    return this.http.get<SprintDTO[]>(`http://localhost:8080/organisation/ologin/getSprints/${projectId}`);
  }

  getTicketsBySprint(sprintId: number): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`http://localhost:8080/organisation/ologin/getTickets/${sprintId}`);
  }


  private craeteEmployeeApiUrl = 'http://localhost:8080/organisation/ologin/createEmployee';
  createEmployee(employeeData: any): Observable<string> {
    return this.http.post<string>(this.craeteEmployeeApiUrl, employeeData);
  }

  createSprint(projectId: number, sprintData: SprintDTO): Observable<SprintDTO> {
    return this.http.post<SprintDTO>(`http://localhost:8080/organisation/ologin/addSprint/${projectId}`, sprintData);
  }
}
