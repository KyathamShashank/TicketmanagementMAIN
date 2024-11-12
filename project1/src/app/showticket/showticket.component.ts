import { Component } from '@angular/core';
import { Project } from '../contracts/Project.contract';
import { ShowprojectserviceService } from '../service/showprojectservice.service';
import { Employee } from '../contracts/Employee.contract';
import { Ticket } from '../contracts/Ticket.contract';
import { DeleteticketserviceService } from '../service/deleteticketservice.service';

@Component({
  selector: 'app-showticket',
  templateUrl: './showticket.component.html',
  styleUrls: ['./showticket.component.css']
})
export class ShowticketComponent {
  projects: Project[] = [];
  tickets:Ticket[]=[];
  employee1!: Employee ;

  constructor(private projectService: ShowprojectserviceService,private deleteticketservice:DeleteticketserviceService) {}

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('empName'));
    //  this.employee1.employeeName=(sessionStorage.getItem('empName')||'');
    //  console.log(this.employee1);
    this.projectService.getAllProjects().subscribe(data=>{
      this.projects=data;
      for(let p of this.projects){
        if(p.employees!=null){
          for(let e of p.employees){
            console.log(e.employeeName);
            if(e.employeeName==sessionStorage.getItem('empName')){
              this.tickets=e.tickets;
            }
          }
        }
      }
      console.log(this.tickets);
   
    });   
  }



  
    deleteTicketById(id: number): void {
      this.deleteticketservice.deleteTicket(id).subscribe(
        response => {
          console.log(response); // Success message from backend
          alert(response);
          this. ngOnInit();
        },
        error => {
          console.error(error); // Handle error if ticket is not found or could not be deleted
          alert('Ticket could not be deleted.');
        }
      );
    }
  
}
