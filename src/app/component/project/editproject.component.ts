import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-edituser',
  template: `
  <div class="container">
  <form>
  <div class="form">
  <div class="row">

      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Project</span>
          </div>
          <input type="text" #project (change)="0" class="form-control" placeholder="Project Name" aria-label="task" aria-describedby="basic-addon1" required>
      </div>
  </div>
   
  

<div class="row">
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Priority</span>
    </div>
    <input type="range" (input)="priority.value" min="0" max="30" step="1" #priority id="priority" (change)="0" class="form-control"  aria-label="priority" aria-describedby="basic-addon1"><br/>
    <label for="priority">{{ priority.value }}</label>
</div>
</div> 

<input type="checkbox" [(ngModel)]="showhidedate" class="form-control" [ngModelOptions]="{standalone: true}"/> Start Date & End Date



<div class="row">
<div class="input-group mb-3" >
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon1">Start Date</span>
</div>
  <input type="date" #startdate class="form-control" id="startdate">
</div>
</div> 
<div class="row">
<div class="input-group mb-3" >
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon1">End Date</span>
</div>
  <input type="date" #enddate class="form-control" id="enddate">
</div> 
</div>
<div class="row">

      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Manager</span>
          </div>
          <input type="text" #manager (change)="0" class="form-control" placeholder="Manager" aria-label="task" aria-describedby="basic-addon1" required> <div class="container">
          
        </div>
          
      </div>
  </div>
  <button type="button" class="btn btn-primary" (click)="updateproject(project_id,project.value,startdate.value,enddate.value,priority.value,manager.value,Flag)" >Update</button>
  <button type="button" class="btn btn-primary" onClick="window.location.reload();" >Reset</button>

  
</div>

</form>



</div>
  `,
})
export class EditProjectComponent implements OnInit  { 
project_id:string;
Flag:Boolean=false;
    Users:Array <Object>=[];

    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
            this.project_id= route.snapshot.params['id'];
      
      }
ngOnInit()
        {

          }

          updateproject(project_id:string,Project:string,Start_Date:string,End_Date:string,Priority:string,Users:string,Status:Boolean)
          {
              this.http.put('http://localhost:5001/editproject/'+project_id,
              {Project:Project,Start_Date:Start_Date,End_Date:End_Date,Priority:Priority,Users:Users,Status:Status})
              .toPromise()
              .then(res=>{
              console.log(res);
              
              
              })
            }






}