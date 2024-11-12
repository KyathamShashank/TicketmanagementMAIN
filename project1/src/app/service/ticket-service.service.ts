import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisation } from '../contracts/Organisation.contract';
import { Project } from '../contracts/Project.contract';
import { Employee } from '../contracts/Employee.contract';
import { Ticket } from '../contracts/Ticket.contract';
import { Employee2 } from '../contracts/Employee2.contract';
import { Ticket2 } from '../contracts/Ticket2.contract';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http:HttpClient) { }

  

  public GetAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(`http://localhost:8080/Employee/GetAllEmployee`);
  }

  public DeleteEmployee(eid:number):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/Employee/DeleteEmployee/${eid}`);
  }

  public AssignEmployeeToProject(pid:number,eid:number[]):Observable<Project>{
    return this.http.post<Project>(`http://localhost:8080/Employee/AssignEmployee/${pid}`,eid);
  }

  public EmployeeLogin(ename:string,epword:string):Observable<Employee>{
    return this.http.get<Employee>(`http://localhost:8080/Employee/Login/${ename}/${epword}`);
  }

  public CreateTicket(pid:number,sid:number,eid:number,ticket:any):Observable<Ticket2>{
    return this.http.post<Ticket2>(`http://localhost:8080/Employee/Ticket/CreateTicket/${pid}/${sid}/${eid}`,ticket);
  }

  public GetTicketBasedOnProject(pid:number):Observable<Ticket2[]>{
    return this.http.get<Ticket2[]>(`http://localhost:8080/Employee/GetAllProjects/Project/ShowAllTicket/${pid}`);
  }

  public AssignTicketToEmployee(eid:number,tid:number,file:File):Observable<Ticket2>{
    const formData: FormData = new FormData();
    formData.append('image', file); 
    return this.http.post<Ticket2>(`http://localhost:8080/Employee/AssignTicket/${eid}/${tid}`,formData);
  }

  public ChangeStatusComplete(tid:number):Observable<Ticket2>{
    return this.http.get<Ticket2>(`http://localhost:8080/Employee/Ticket/ChangeStatus/${tid}`);
  }

  getTicketImage(ticketId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/Employee/Ticket/Image/${ticketId}`, { responseType: 'blob' }); // Specify 'blob' to handle binary data
  }

  ////
  public GetLoginEmployee(id:number):Observable<Employee2>{
    return this.http.get<Employee2>(`http://localhost:8080/organisation/getEmployeeObject/${id}`);
  }
}
