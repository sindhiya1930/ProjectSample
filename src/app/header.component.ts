import { Component ,OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'my-header',
  template: `
  <div>
  <a [routerLink]="['/AddProject']"> Add Project </a>
  <a [routerLink]="['/AddTask']"> Add Task </a>
  <a [routerLink]="['/AddUser']">   Add User</a>
  <a [routerLink]="['']">  View Task</a>
  
  
  </div>

  `,
})
export class HeaderComponent implements OnInit  { 


    constructor(public http:HttpClient,private route: ActivatedRoute,
        private router: Router){
          
      
      }
ngOnInit()
        {

          }




}  
