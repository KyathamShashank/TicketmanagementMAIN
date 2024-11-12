import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectDTO } from '../contracts/ProjectDTO';
import { OrgLoginDTO } from '../contracts/OrgLoginDTO';
import { EmpLoginDTO } from '../contracts/EmpLoginDTO';



@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = 'http://localhost:8080/organisation';

  constructor(private http:HttpClient) { }
  private getHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
// organisation log in request
  public OrgLogin(organisationName:string, organisationPassword:string):Observable<OrgLoginDTO>
  {
    let params = new HttpParams()
    .set('organisationName', organisationName)
    .set('organisationPassword', organisationPassword);
    return this.http.post<OrgLoginDTO>(this.apiUrl+'/ologin',{},{params, responseType: 'json'});
  }
  public EmpLogin(employeeName:string,employeePassword:string):Observable<EmpLoginDTO>
  {
    let params = new HttpParams()
    .set('employeeName', employeeName)
    .set('employeePassword', employeePassword);

    return this.http.post<EmpLoginDTO>(this.apiUrl+'/elogin',{},{params});
  }
  public CreateProject(projectData:ProjectDTO):Observable<ProjectDTO>
  {
    return this.http.post<ProjectDTO>(this.apiUrl+'/ologin/createProject',projectData,this.getHeaders());
  }

  public getPassword(employeeName:string,employeeEmail:string):Observable<string>
  {
    let params = new HttpParams()
    .set('employeeName', employeeName)
    .set('employeeEmail', employeeEmail);
    return this.http.get<string>(this.apiUrl+'/ologin/forgotPassword',{params});
  }

}