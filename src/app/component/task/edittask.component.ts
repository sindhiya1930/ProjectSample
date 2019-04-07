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
                <span class="input-group-text" id="basic-addon1">Task</span>
            </div>
            <input type="text" #task (change)="0" class="form-control" placeholder="Task" aria-label="task" aria-describedby="basic-addon1" required>
        </div>
    </div>
   {{task.value}}
    <input type="checkbox" #parstatus name="parenttask" value="off" (change)="0" class="form-control" placeholder="Parent Task" > Parent Task<br>
{{parstatus.value}}
<div class="row">
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Priority</span>
    </div>
    <input type="range" (input)="priority.value" min="0" max="30" step="1" #priority id="priority" (change)="0" class="form-control"  aria-label="priority" aria-describedby="basic-addon1"><br/>
    <label for="priority">{{ priority.value }}</label>
</div>
</div> 

<div class="row">

      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Parent Name</span>
          </div>
          <input type="text" #parent (change)="0" class="form-control" placeholder="Parent Name" aria-label="task" aria-describedby="basic-addon1" required>
      </div>
  </div>

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
              <span class="input-group-text" id="basic-addon1">User</span>
          </div>
          <input type="text" #manager (change)="0" class="form-control" placeholder="Manager" aria-label="task" aria-describedby="basic-addon1" required> <div class="container">
          
        </div>
          
      </div>
  </div>
  <button type="button" class="btn btn-primary" (click)="updatetask(task_id,project.value,task.value,priority.value,parent.value,startdate.value,enddate.value,manager.value,Flag)" >Update Task</button>
  <button type="button" class="btn btn-primary"  onClick="window.location.reload();" >Reset</button>

  
</div>,

</form>



</div>
  `,
})
export class EditTaskComponent implements OnInit  { 
task_id:string;
Flag:Boolean=false;
    Users:Array <Object>=[];

    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
            this.task_id= route.snapshot.params['id'];
      
      }
ngOnInit()
        {

          }

          updatetask(task_id:string,Project_Name:string,Task:string,Priority:string,Parent_Name:string,Start_Date:string,End_Date:string,Users:string,Flag:Boolean)
          {
              this.http.put('http://localhost:5001/edittask/'+task_id,
              {Parent_Name:Parent_Name,Project:Project_Name,Task:Task,Start_Date:Start_Date,End_Date:End_Date,Priority:Priority,Status:Flag,Users:Users})
              .toPromise()
              .then(res=>{
              console.log(res);
              
              
              })
            }

              endtask(task_id:string,Project_Name:string,Task:string,Priority:string,Parent_Name:string,Start_Date:string,End_Date:string,Users:string,Flag:Boolean){
                Flag=true;
                    this.http.put('http://localhost:5001/edittask/'+task_id,
                    {Parent_Name:Parent_Name,Project:Project_Name,Task:Task,Start_Date:Start_Date,End_Date:End_Date,Priority:Priority,Status:Flag,Users:Users})
                    .toPromise()
                    .then(res=>{
                    console.log(res);
                    
                    
                    })
                  
            }




}