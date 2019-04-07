import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-user',
  template: `

  <div class="container">
  <div class="form">
     <form>
         <div class="row">
             <div class="input-group mb-3">
                 <div class="input-group-prepend">
                     <span for ="project" class="input-group-text" id="basic-addon1">Project</span>
                 </div>
                 <input type="text" #project (change)="0" class="form-control" placeholder="Project Name" aria-label="task" aria-describedby="basic-addon1" required>
             </div>
         </div>
         <div class="row">
             <div class="input-group mb-3">
                 <div class="input-group-prepend">
                     <span for ="priority" class="input-group-text" id="basic-addon1">Priority</span>
                 </div>
                 <input type="range" (input)="priority.value" min="0" max="30" step="1" #priority id="users" value="0" (change)="0" class="form-control"  aria-label="priority" aria-describedby="basic-addon1"><br/>
                     <label for="priority">{{ priority.value }}</label>
             </div>
         </div> 
 
     Start Date & End Date<input type="checkbox" #datecheck name="datecheck"  (change)="toggleEditable($event)" (change)="0" class="form-control" placeholder="Date check">
 
         <div class="row">
             <div class="input-group mb-3" >
                 <div class="input-group-prepend">
                     <span for="startdate" class="input-group-text" id="basic-addon1">Start Date</span>
                 </div>
                 <input type="date" #startdate [disabled]=editable class="form-control" id="startdate">
             </div>
         </div> 
         <div class="row">
             <div class="input-group mb-3" >
                 <div class="input-group-prepend">
                     <span for ="enddate" class="input-group-text" id="basic-addon1">End Date</span>
                 </div>
                 <input type="date" #enddate [disabled]=editable class="form-control" id="enddate">
             </div> 
         </div>
        <div class="row">
            <div class="input-group mb-3">
             <div class="input-group-prepend">
                 <span for ="manager" class="input-group-text" id="basic-addon1">Manager</span>
             </div>
             <input type="text" #manager (change)="0" value={{users1}} class="form-control" placeholder="Manager" aria-label="task" aria-describedby="basic-addon1" required>
             <button type="button" [disabled]=editable class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal1">search</button>
             <!-- Modal -->
                 <div class="modal fade" id="myModal1" role="dialog">
                     <div class="modal-dialog">
                     <!-- Modal content-->
                         <div class="modal-content">
                             <div class="modal-header">
                                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                    
                             </div>
                             <div class="modal-body">
                             <h4>Select Users </h4>
                                 <div class="row">
                                     <div *ngFor="let User of Users">
                                         <label for="users">
                                             <input  type="radio" id="users" #users (input)="users.value"  (click)="setradio(User.First_Name)" name="users" >
                                             {{User.First_Name}} <br/>
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
                         <button type="button" class="btn btn-primary" (click)="Addproject(project.value,priority.value,startdate.value,enddate.value,manager.value,Flag)" >Add</button>
                         <button type="button" class="btn btn-primary" onClick="window.location.reload();" >Reset</button>
     </form>
 </div>	
     
     
 
 <hr>
 <form>
     <div class="row">
         <div class="input-group mb-3">
             <div class="input-group-prepend">
                 <span class="input-group-text" id="basic-addon1">Search...</span>
             </div>
             <input type="text" #search2 (keyup)="0" class="form-control" placeholder="Search Projects" aria-label="Username" aria-describedby="basic-addon1">
         </div>
     </div>
 
 <div class="col">
 <label for="sort">Sort  : </label>
 <button type="button" class="btn btn-info" (click)="sortTable('startdate')">Start Date </button>
 <button type="button" class="btn btn-info" (click)="sortTable('enddate')">End Date </button>
 <button type="button" class="btn btn-info" (click)="sortTable('priority')">Priority </button>
 <button type="button" class="btn btn-info" (click)="sortTable('Flag')">Completed </button>
 </div>
 <br>  
 </form>
 <div class="row">
     <table class="table " >
     <thead>
     <tr  >
         <th scope="col">Project</th>
         <th scope="col">Start Date</th>
         <th scope="col">End Date</th>
         <th scope="col">Priority</th>
         <th scope="col">Manager</th>
         <th scope="col">     </th>
         <th scope="col">     </th>
     </tr>
 </thead>
 <tbody>
     <tr *ngFor="let Project of Projects| searchProject:search2.value| sortproject:path:order;let i=index">
 
     <td>{{Project.Project}}</td>
     <td>{{Project.Start_Date}}</td>
     <td>{{Project.End_Date}}</td>
     <td>{{Project.Priority}}</td>
     <td>{{Project.Users}}</td>
     <td><button type="button" class="btn btn-success"  [disabled]="Project.Status" (click)="edit(Project._id)">Update</button></td>
     <td><button type="button" class="btn btn-success" [disabled]="Project.Status" (click)="endtask(Project._id,Project.Project,Project.Start_Date,Project.End_Date,Project.Priority,Project.Users,Flag)">Suspend</button></td>
     </tr>
     </tbody>
     </table>
 </div>
 </div>
 
  `,
})
export class ProjectComponent implements OnInit  { 
    @Input('priority') priority:string=' ';
    Projects:Array <Object>=[];
    Users:Array <Object>=[];
Flag:boolean=false;
editable:boolean=false;
users1:string=' ';
path: string[] = ['user'];
order: number = 1; // 1 asc, -1 desc;
    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
          
      
      }
ngOnInit()
        {
            this.http.get('http://localhost:5001/projects')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Projects=res as any;
            })

            this.http.get('http://localhost:5001/users')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Users=res as any;
            })
          }



edit(project_id:string)
{


    this.router.navigate(['EditProjects/'+project_id]);
  }



Addproject(Project:string,Priority:String,Start_Date:string,End_Date:string,Users:string,Status:string){

    this.http.post('http://localhost:5001/project',
    {Project:Project,Start_Date:Start_Date,End_Date:End_Date,Priority:Priority,Users:Users,Status:Status})
    .toPromise()
    .then(res=>{
        console.log(res)
        return res
        
    })
}

endtask(project_id:string,Project:string,Start_Date:string,End_Date:string,Priority:string,Users:string,Status:Boolean){
    Status=true;
        this.http.put('http://localhost:5001/editproject/'+project_id,
        {Project:Project,Start_Date:Start_Date,End_Date:End_Date,Priority:Priority,Users:Users,Status:Status})
        .toPromise()
        .then(res=>{
        console.log(res);
        
        
        })
      
}

sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
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
}