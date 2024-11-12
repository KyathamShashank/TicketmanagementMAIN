import { Component } from '@angular/core';
import { Employee } from '../contracts/Employee.contract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcomponent',
  templateUrl: './showcomponent.component.html',
  styleUrls: ['./showcomponent.component.css']
})
export class ShowcomponentComponent  {
  employee!: Employee;
  employeeName:string='' ;
  employeePhone:number=0;
  employeeId:number=0;
  employeeEmail:string='';

  constructor(private router:Router){}
  ngOnInit(): void {
    this.employeeName=sessionStorage.getItem('empName') || '';
    this.employeeId=JSON.parse(sessionStorage.getItem('empId') || '');
    this.employeePhone=JSON.parse(sessionStorage.getItem('empPh')||'');
    this.employeeEmail=sessionStorage.getItem('empEmail') || '';
    //  this.employee=JSON.parse(sessionStorage.getItem('LoginEmployee'));
   
  }

  

}
