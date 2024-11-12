import { Component, OnInit } from '@angular/core';
import { ShowprojectserviceService } from '../service/showprojectservice.service';
import { Project } from '../contracts/Project.contract';
import { Ticket } from '../contracts/Ticket.contract';
import { Employee } from '../contracts/Employee.contract';
import { Sprint } from '../contracts/Sprint.contract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showprojects',
  templateUrl: './showprojects.component.html',
  styleUrls: ['./showprojects.component.css']
})
export class ShowprojectsComponent implements OnInit {
  projects: Project[] = [];
  chartData: any[] = [];  // Array to store chart data for each project

  tickets: Ticket[] = [];
  employees: Employee[] = [];
  sprints: Sprint[] = [];
options: any;

  constructor(private projectService: ShowprojectserviceService,private router:Router) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;

      // Iterate over projects to set up chart data for each project
      this.projects.forEach(p => {
        this.employees = p.employees;
        this.sprints = p.sprints;
        this.tickets = p.sprints.flatMap(s => s.tickets);  // Assuming tickets are under sprints

        console.log("project", p.projectName);
         
        console.log(`${this.employees.length} employees`);
        console.log(`${this.sprints.length} sprints`);
        console.log(`${this.tickets.length} tickets`);

        // Set chart data for the current project
        this.chartData.push({
          labels: [`Tickets [${this.tickets.length}]`, 
    `Sprints [${this.sprints.length}]`, 
    `Employees [${this.employees.length}]`],
          datasets: [{
            data: [this.tickets.length, this.sprints.length, this.employees.length],
            backgroundColor: ['#76db9b', '#36A2EB', '#b975f9'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        });
      });
    });
  }
  GoToTicket(project:Project){
    sessionStorage.setItem('ProjectTicket',JSON.stringify(project));
    this.router.navigate(['TicketHome']);
  }
}
