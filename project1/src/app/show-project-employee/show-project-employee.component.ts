import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketServiceService } from '../../Service/ticket-service.service';
import { Project } from '../../Contract/Project.contract';

@Component({
  selector: 'app-show-project-employee',
  templateUrl: './show-project-employee.component.html',
  styleUrls: ['./show-project-employee.component.css']
})
export class ShowProjectEmployeeComponent {
  projects:Project[] = []
  constructor(private router: Router,private ts:TicketServiceService) {}
  ngOnInit(){
    this.ts.GetAllProjects().subscribe(data=>this.projects=data);
  }
  // Navigate to project detail on click
  openProjectDetails(projectId: Project) {
    sessionStorage.setItem('ProjectTicket',JSON.stringify(projectId));
    this.router.navigate(['EmployeeHome/TicketHome']); // Navigates to a route like /project/1
  }
}
