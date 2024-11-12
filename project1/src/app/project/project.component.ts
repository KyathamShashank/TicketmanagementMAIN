import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent   
{
  projectForm: FormGroup;
  successMessage:string=''
  errorMessage:string=''
  weeks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private fb: FormBuilder, private projectService: ProjectService,private router:Router) {
    this.projectForm = this.fb.group({
      projectName: ['',Validators.required],
      projectDescription: ['',Validators.required],
      sprints: this.fb.array([]) // Form array for sprints
    });
  }

  get sprints(): FormArray {
    return this.projectForm.get('sprints') as FormArray;
  }

  createSprint(): FormGroup {
    return this.fb.group({
      sprintName: ['', Validators.required],
      sprintGoal: ['', Validators.required],
      duration: [1, Validators.required], 
      sprintStartDate: ['', Validators.required], 
      sprintEndDate: [{ value: '', disabled: true }, Validators.required] 
    });
  }
  // i'm adding sprints to project here
  addSprint(): void {
    const sprint = this.createSprint();
    this.sprints.push(sprint);
    this.setupEndDateCalculation(this.sprints.length - 1);
    
  }

  setupEndDateCalculation(index: number): void {
    const sprintGroup = this.sprints.at(index) as FormGroup;

    sprintGroup.get('sprintStartDate')?.valueChanges.subscribe(() => {
      this.calculateEndDate(sprintGroup);
    });

    sprintGroup.get('duration')?.valueChanges.subscribe(() => {
      this.calculateEndDate(sprintGroup);
    });
  }

  calculateEndDate(sprintGroup: FormGroup): void {
  const sprintStartDate = sprintGroup.get('sprintStartDate')?.value;
  const duration = sprintGroup.get('duration')?.value;

  if (sprintStartDate && duration) {
    const start = new Date(sprintStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration * 7);
    sprintGroup.get('sprintEndDate')?.setValue(end.toISOString().split('T')[0]);
  } else {
    sprintGroup.get('sprintEndDate')?.setValue('');
  }
}
  // addSprint() {
  //   this.sprints.push(this.fb.group({
  //     sprintName: [''],
  //     sprintGoal: ['']
  //   }));
  // }

  removeSprint(index: number) {
    this.sprints.removeAt(index);
  }
  createProject(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe(response => {
        this.successMessage = 'Project registered successfully!';
        this.projectForm.reset(); // Reset the form on success
      }, error => {
        this.successMessage = 'Project registered successfully!';
        this.projectForm.reset();
      });
    } else {
      this.projectForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
  
  resetForm():void{
    this.projectForm.reset();
  }

  navigateToHome() {
    console.log('Back button clicked');
    this.router.navigate(['/org']);
  }
}
