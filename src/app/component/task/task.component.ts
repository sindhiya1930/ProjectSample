import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-task',
  template: `
  <div class="container">
  <form>
  <div class="form">
  <div class="row">

      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Project</span>
          </div>
          <input type="text" #project (change)="0" value={{projects1}} class="form-control" placeholder="Project Name" aria-label="task" aria-describedby="basic-addon1" required>
          <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">search</button>
          <!-- Modal -->
              <div class="modal fade" id="myModal2" role="dialog">
                  <div class="modal-dialog">
                  <!-- Modal content-->
                      <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                    
                          </div>
                          <div class="modal-body">
                          <h3>Select Projects</h3>
                              <div class="row">
                                  <div *ngFor="let Project of Projects">
                                      <label for="projects">
                                          <input  type="radio" id="projects" #projects (input)="projects.value"  (click)="setradio1(Project.Project)" name="project" >
                                          {{Project.Project}} 
                                      </label>
                                  </div>
                              </div>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          </div>
                      </div>
                  </div>
              </div>
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
    <div class="row">
    Parent Task <input type="checkbox" #parstatus name="parentstatus"  (change)="toggleEditable($event)" (change)="0" class="form-control" placeholder="Parent Task">
    </div>
<div class="row">
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Priority</span>
    </div>
    <input type="range" (input)="priority.value" min="0" max="30" step="1" #priority [disabled]=editable id="priority" value="0" (change)="0" class="form-control"  aria-label="priority" aria-describedby="basic-addon1"><br/>
    <label for="priority">{{ priority.value }}</label>
</div>
</div> 

<div class="row">

      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Parent Name</span>
          </div>
          <input type="text" #parent value={{parents1}} [disabled]=editable  (change)="0" class="form-control" placeholder="Parent Name" aria-label="task" aria-describedby="basic-addon1" required>

					<button type="button" class="btn btn-info btn-lg" [disabled]=editable data-toggle="modal" data-target="#myModal3">search</button>
					<!-- Modal -->
						<div class="modal fade" id="myModal3" role="dialog">
							<div class="modal-dialog">
							<!-- Modal content-->
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
							
									</div>
                                    <div class="modal-body">
                                    <h3>Select Parents</h3>
										<div class="row">
											<div *ngFor="let Parent of Parents">
												<label for="parents">
													<input  type="radio" id="parents" #parents (input)="parents.value"  (click)="setradio2(Parent.Parent_Name)" name="parents" >
													{{Parent.Parent_Name}} 
												</label>
											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>
		
      </div>
  </div>

<div class="row">
<div class="input-group mb-3" >
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon1">Start Date</span>
</div>
  <input type="date" #startdate [disabled]=editable class="form-control" id="startdate">
</div>
</div> 
<div class="row">
<div class="input-group mb-3" >
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon1">End Date</span>
</div>
  <input type="date" #enddate [disabled]=editable class="form-control" id="enddate">
</div> 
</div>
<div class="row">

      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">User</span>
          </div>
          <input type="text" #manager value={{users1}} [disabled]=editable (change)="0" class="form-control" placeholder="Manager" aria-label="task" aria-describedby="basic-addon1" required> <div class="container">
          
					<button type="button" class="btn btn-info btn-lg" [disabled]=editable data-toggle="modal" data-target="#myModal">search</button>
					<!-- Modal -->
						<div class="modal fade" id="myModal" role="dialog">
							<div class="modal-dialog">
							<!-- Modal content-->
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
									</div>
                                    <div class="modal-body">
                                    <h3>Select users</h3>
										<div class="row">
											<div *ngFor="let User of Users">
												<label for="users">
													<input  type="radio" id="users" #users (input)="users.value"  (click)="setradio(User.First_Name)" name="users" >
													{{User.First_Name}} 
												</label>
											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>
		
        </div>
          
      </div>
  </div>
  <button type="button" class="btn btn-primary" (click)="Addtask(project.value,task.value,priority.value,parent.value,startdate.value,enddate.value,manager.value,Flag,editable)" >Add Task</button>
  <button type="button" class="btn btn-primary" onClick="window.location.reload();" >Reset</button>

  
</div>

</form>



</div>




  `,
})
export class TaskComponent implements OnInit  { 
    @Input('priority') priority:string=' ';
    Tasks:Array <Object>=[];
    Users:Array <Object>=[];
    Projects:Array <Object>=[];
    Parents:Array <Object>=[];
    users1:string=' ';
    projects1:string=' ';
    parents1:string=' ';
Flag:boolean=false;
check:boolean=false;
editable:boolean=false;
    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
          
      
      }
ngOnInit()
        {
            this.http.get('http://localhost:5001/tasks')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Tasks=res as any;
            })

            this.http.get('http://localhost:5001/users')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Users=res as any;
            })

            this.http.get('http://localhost:5001/projects')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Projects=res as any;
            })

            this.http.get('http://localhost:5001/parents')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Parents=res as any;
            })
          }
          


Addtask(Project_Name:string,Task:string,Priority:string,Parent_Name:string,Start_Date:string,End_Date:string,Users:string,Flag:boolean,ParStatus:boolean){

if(ParStatus == true)
{
    this.http.post('http://localhost:5001/parent',
    {Parent_Name:Task})
    .toPromise()
    .then(res=>{
        console.log(res)
        return res
        
    })
}else{
    this.http.post('http://localhost:5001/task',
    {Parent_Name:Parent_Name,Project:Project_Name,Task:Task,Start_Date:Start_Date,End_Date:End_Date,Priority:Priority,Status:Flag,Users:Users})
    .toPromise()
    .then(res=>{
        console.log(res)
        return res
        
    })
}
}

toggleEditable(event){
    if(event.target.checked)
    {
        this.editable=true;
    }else{
        this.editable=false;
    }
}

setradio(users:string){
    console.log(users)
      this.users1=users;
  }

  setradio1(projects:string){
    console.log(projects)
      this.projects1=projects;
  }

  setradio2(parents:string){
    console.log(parents)
      this.parents1=parents;
  }
}