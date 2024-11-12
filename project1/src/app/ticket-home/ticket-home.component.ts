import { Component } from '@angular/core';
import {  Project2 } from '../contracts/Project2.contract';
import { Router } from '@angular/router';
import { Employee2 } from '../contracts/Employee2.contract';
import { TicketServiceService } from '../service/ticket-service.service';
import { Sprint2 } from '../contracts/Sprint2.contract';
import {  Ticket2} from '../contracts/Ticket2.contract';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-ticket-home',
  templateUrl: './ticket-home.component.html',
  styleUrls: ['./ticket-home.component.css']
})
export class TicketHomeComponent {
  ticketImageUrl:any;
  issuePictute!:File;
  logInEmployee!:Employee2;
  todoTicket:number=0;
  inProgressTicket:number=0;
  CompleteTicket:number=0;
  showButton:boolean=true;
  project!:Project2;
  employees:Employee2[]=[];
  employee!:Employee2;
  tickets:Ticket2[]=[];
  ticket= {
    ticketName: '',
    ticketDescription: '',
    ticketIssueType: '',
    ticketPriority: '',
    ticketUpdatedDate: null,
    sprintId:0
  };
  isModalOpen=false;
  sprint:Sprint2[]=[];
  issueTypes = ['Story', 'Bug', 'Epic','Improvement','New Feature','Test']; // Add your issue types here
  priorityOptions = ['Low', 'Medium', 'High']; // Add your priority options here

  statusOptions = ['ToDO','InProgress','Complete'];

  FilterTicket:Ticket2[]=[];
  constructor(private router:Router,private ts:TicketServiceService){}
  ngOnInit(){
    this.project=JSON.parse(sessionStorage.getItem('ProjectTicket')||'');
    this.employees=this.project.employees;
    this.ts.GetLoginEmployee(JSON.parse(sessionStorage.getItem('empId')||'')).subscribe(data=>{
      this.employee=data;this.logInEmployee=data;
      for(let e of this.employees){

        console.log();
        if(e.employeeId==this.employee.employeeId){
          this.showButton=false; break;
        }
      }
    }); 
     

    this.sprint=this.project.sprints;
    this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
      this.tickets=data;
      this.todoTicket = this.tickets.filter(t => t.ticketStatus == 'ToDO').length;
  this.inProgressTicket = this.tickets.filter(t => t.ticketStatus == 'InProgress').length;
  this.CompleteTicket = this.tickets.filter(t => t.ticketStatus == 'Complete').length;
    });
  }
  selectedSprint:number=0;
  selectedStatus: string = '';
  selectedEmployee: string = '';
  BackFromFilter(){
    this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
      this.tickets=data;
    });
  }
  onFilter(): void {
    console.log(`Filtering by: Sprint: ${this.selectedSprint}, Status: ${this.selectedStatus}, Employee: ${this.selectedEmployee}`);
    this.tickets=[];
    for(let s of this.sprint){
      if(s.sprintId==this.selectedSprint){
        for(let t of s.tickets){
          if(t.ticketAssignFrom==this.selectedEmployee){
            this.tickets.push(t);
          }
        }

      }
    }  
  }

  GoBack(){
    this.router.navigate(['EmployeeHome/showproject']);
  }

  CreateProject() {
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('createTicketModal')|| '');
    modal.show();
  }

  onSubmit(form:any) {
    if (form.valid) {
       this.ts.CreateTicket(this.project.projectId,this.ticket.sprintId,this.employee.employeeId,this.ticket).subscribe(data=>{
         this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
           this.tickets=data;
           this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
            this.tickets=data;
            this.todoTicket = this.tickets.filter(t => t.ticketStatus == 'ToDO').length;
        this.inProgressTicket = this.tickets.filter(t => t.ticketStatus == 'InProgress').length;
        this.CompleteTicket = this.tickets.filter(t => t.ticketStatus == 'Complete').length;
          });
         });
       });
      
      // Close the modal after submission
    
       const modal = bootstrap.Modal.getInstance(document.getElementById('createTicketModal')||'');
       if(modal)
        {
        modal.hide();
        }
      // Reset the form if needed
      form.reset();
    }
  }

  currentTicket: any;
  selectedEmployeeId: number=0;

  // Method to open modal and set the current ticket
  showAssignEmployeeModal(ticket: any) {
    this.currentTicket = ticket;
    const modalElement = document.getElementById('assignEmpModal');
    const modal = new bootstrap.Modal(modalElement||'');
    modal.show();
  }

  // Method to handle employee assignment submission
  submitEmployeeAssignment() {
    if (this.currentTicket && this.selectedEmployeeId) {
      this.ts.AssignTicketToEmployee(this.selectedEmployeeId,this.currentTicket.ticketId,this.issuePictute).subscribe(data=>{
        this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
          this.tickets=data;
          this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
            this.tickets=data;
            this.todoTicket = this.tickets.filter(t => t.ticketStatus == 'ToDO').length;
        this.inProgressTicket = this.tickets.filter(t => t.ticketStatus == 'InProgress').length;
        this.CompleteTicket = this.tickets.filter(t => t.ticketStatus == 'Complete').length;
          });
        });
      });
      console.log(this.issuePictute);
      this.closeAssignModal();
    }
  }
  onFileSelected(event:any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.issuePictute = input.files[0];
    }
  }
  // Method to close the modal
  closeAssignModal() {
    const modalElement = document.getElementById('assignEmpModal');
      const modal = bootstrap.Modal.getInstance(modalElement ||'');
      if(modal)
      {
      modal.hide();
      }
     else {
      console.error('Modal element not found');
    }
  }
  ChangeStatus(tid:number){
    this.ts.ChangeStatusComplete(tid).subscribe(data=>{
      this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
        this.tickets=data;
        this.ts.GetTicketBasedOnProject(this.project.projectId).subscribe(data=>{
          this.tickets=data;
          this.todoTicket = this.tickets.filter(t => t.ticketStatus == 'ToDO').length;
      this.inProgressTicket = this.tickets.filter(t => t.ticketStatus == 'InProgress').length;
      this.CompleteTicket = this.tickets.filter(t => t.ticketStatus == 'Complete').length;
        });
      });
    });
  }

  fetchTicketImage(tid:number): void {
    this.ts.getTicketImage(tid).subscribe(data=>{this.ticketImageUrl = URL.createObjectURL(data);this.openImageModal();});
  }
  openImageModal(): void {
    this.isModalOpen = true;
  }

  closeImageModal(): void {
    this.isModalOpen = false;
    this.ticketImageUrl = null; // Clear image when closing
  }
}
