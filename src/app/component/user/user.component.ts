import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-user',
  template: `
  <div class="container">
  <div class="row">
      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span for ="fname" class="input-group-text" id="basic-addon1">First Name</span>
          </div>
          <input type="text" #fname (change)="0" class="form-control" placeholder="First Name" aria-label="task" aria-describedby="basic-addon1" required>
      </div>
  </div>



<div class="row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span for ="lname" class="input-group-text" id="basic-addon1">Last Name</span>
        </div>
        <input type="text" #lname (change)="0" class="form-control" placeholder="Last Name" aria-label="parent" aria-describedby="basic-addon1" required>

    </div>
</div>

<div class="row">
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span for ="empid" class="input-group-text" id="basic-addon1">Employee ID</span>
    </div>
    <input type="text" #empid (change)="0" class="form-control" placeholder="Employee Id" aria-label="parent" aria-describedby="basic-addon1" required>

</div>
</div>
<button type="button" class="btn btn-primary" (click)="adduser(fname.value,lname.value,empid.value)" >Add</button>
<button type="button" class="btn btn-primary" onClick="window.location.reload();" >Reset</button>
</div>

<hr>


<form>
<div class="row">
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Search...</span>
    </div>
    <input type="text" #search1 (keyup)="0" class="form-control" placeholder="Search users" aria-label="Username" aria-describedby="basic-addon1">
</div>
</div>


  <div class="col">
      <label for="sort">Sort  : </label>
    <button type="button" class="btn btn-info" (click)="sortTable('fname')">First name</button>
    <button type="button" class="btn btn-info" (click)="sortTable('lastname')">Last Name</button>
    <button type="button" class="btn btn-info" (click)="sortTable('empid')">Id  </button>
  </div>
  

<br>
   
</form>
<div class="row">
    <table class="table " >
    <thead>
    <tr  >
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Employee ID</th>

        <th scope="col">     </th>
        <th scope="col">     </th>


    </tr>
</thead>
<tbody>
    <tr *ngFor="let User of Users|searchUser:search1.value|sortusersname:path:order;let i=index">

    <td>{{User.First_Name}}</td>
    <td>{{User.Last_Name}}</td>
    <td>{{User.Employee_ID}}</td>
    <td><button type="button" class="btn btn-success"  (click)="edit(User._id)">Edit</button></td>
    <td><button type="button" class="btn btn-success" (click)="delete(i,User._id)">Delete</button></td>
    </tr>
    </tbody>
    </table>
</div>
  `,
})
export class UserComponent implements OnInit  { 
    path: string[] = ['user'];
    order: number = 1; // 1 asc, -1 desc;
    Users:Array <Object>=[];

    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
          
      
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


    adduser(First_Name:string,
    Last_Name:string,Employee_ID:string){
    
    this.http.post('http://localhost:5001/user',
    {First_Name:First_Name,Last_Name:Last_Name,Employee_ID:Employee_ID})
    .toPromise()
    .then(res=>{
        console.log(res)
        return res
        
    })
}

edit(user_id:string)
{


    this.router.navigate(['Edit/'+user_id]);
  }

  delete(index:number,user_id:string)
  {
    
   this.http.delete('http://localhost:5001/user/'+user_id)
   .toPromise()
   .then(res=>{
       console.log(res)
       return res})
       .then(data=>{console.log(data)})
       this.Users.splice(index,1);
}

sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  } 

}