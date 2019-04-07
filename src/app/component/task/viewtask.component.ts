import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'my-viewtask',
  template: `
  <div class="container">
	<div class="row">
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1">Search</span>
			</div>
			<input type="text" #search3 (keyup)="0" class="form-control"  placeholder="Search by Project" aria-label="Username" aria-describedby="basic-addon1">
		</div>
	</div>
<div class="col">
	<label for="sort">Sort  : </label>
		<button type="button" class="btn btn-info" (click)="sortTable('startdate')"> Start Date</button>
		<button type="button" class="btn btn-info" (click)="sortTable('enddate')"> End Date</button>
		<button  type="button" class="btn btn-info" (click)="sortTable('priority')"> Priority</button>
		<button type="button" class="btn btn-info" (click)="sortTable('state')">Completed</button>
</div>
<div class="row">
	<table class="table " >
		<thead>
			<tr>
				<th scope="col">Task</th>
				<th scope="col">Parent Name</th>
				<th scope="col">Priority</th>
				<th scope="col">Start Date</th>
				<th scope="col">End Date</th>
				<th scope="col">     </th>
				<th scope="col">     </th>
			</tr>
		</thead>
		<tbody>
			<tr *ngFor="let Task of Tasks|searchTask:search3.value|sorttask:path:order;let i=index">
				<td>{{Task.Task}}</td>
				<td>{{Task.Parent_Name}}</td>
				<td>{{Task.Priority}}</td>
				<td>{{Task.Start_Date}}</td>
				<td>{{Task.End_Date}}</td>
				<td><button type="button" class="btn btn-success" [disabled]="Task.Status" (click)="edit(Task._id)">Edit</button></td>
				<td><button type="button" class="btn btn-success" [disabled]="Task.Status"(click)="endtask(Task._id,Task.Project,Task.Task,Task.Priority,Task.Parent_Name,Task.Start_Date,Task.End_Date,Task.Users,Task.Status)">EndTask</button></td>
			</tr>
		</tbody>
      </table>
</div>
  
</div>



  `,
})
export class ViewComponent implements OnInit  { 
    @Input('priority') priority:string=' ';
    path: string[] = ['user'];
    order: number = 1; // 1 asc, -1 desc;
    Tasks:Array <Object>=[];
    closeResult: string;
    users1:string=' ';
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
          }


          delete(index:number,task_id:string)
          {
            
           this.http.delete('http://localhost:5001/task/'+task_id)
           .toPromise()
           .then(res=>{
               console.log(res)
               return res})
               .then(data=>{console.log(data)})
               this.Tasks.splice(index,1);
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
        
        
        
        edit(task_id:string)
        {
        
        
            this.router.navigate(['EditTask/'+task_id]);
          }


          sortTable(prop: string) {
            this.path = prop.split('.')
            this.order = this.order * (-1); // change order
            return false; // do not reload
          } 


  

}