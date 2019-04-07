import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-edituser' ,
  template: `
  <div class="container">
  <div class="row">
      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">First Name</span>
          </div>
          <input type="text" #fname (change)="0" class="form-control" placeholder="First Name" aria-label="task" aria-describedby="basic-addon1" required>
      </div>
  </div>



<div class="row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Last Name</span>
        </div>
        <input type="text" #lname (change)="0" class="form-control" placeholder="Last Name" aria-label="parent" aria-describedby="basic-addon1" required>

    </div>
</div>

<div class="row">
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Employee ID</span>
    </div>
    <input type="text" #empid (change)="0" class="form-control" placeholder="Employee Id" aria-label="parent" aria-describedby="basic-addon1" required>

</div>
</div>
<button type="button" class="btn btn-primary" (click)="updateuser(user_id,fname.value,lname.value,empid.value)" >Update</button>
<button type="button" class="btn btn-primary" onClick="window.location.reload();" >Reset</button>
</div>

<hr>

<div class="row">

    <table class="table " >
    <thead>
    <tr  >
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Employee ID</th>


    </tr>
</thead>
<tbody>
    <tr *ngFor="let User of Users">

    <td>{{User.First_Name}}</td>
    <td>{{User.Last_Name}}</td>
    <td>{{User.Employee_ID}}</td>

    </tr>
    </tbody>
    </table>
</div>
  `,
})
export class EditUserComponent implements OnInit  { 
user_id:string;
    Users:Array <Object>=[];

    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
            this.user_id= route.snapshot.params['id'];
      
      }
ngOnInit()
        {
            this.http.get('http://localhost:5001/users')
            .toPromise()
            .then(res=>{
            console.log(res);
            
            this.Users=res as any;
            })


          }

          updateuser(user_id:string,First_Name:string,Last_Name:string,Employee_ID:string)
          {
              this.http.put('http://localhost:5001/edituser/'+user_id,
              {First_Name:First_Name,Last_Name:Last_Name,Employee_ID:Employee_ID})
              .toPromise()
              .then(res=>{
              console.log(res);
              
              
              })
            }




}