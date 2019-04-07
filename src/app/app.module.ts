import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import {RouterModule,Routes} from '@angular/router';
import {EditUserComponent} from './component/user/edituser.component';
import {EditTaskComponent} from './component/task/edittask.component';
import {EditProjectComponent} from './component/project/editproject.component';
import {ProjectComponent} from './component/project/project.component';
import {TaskComponent} from './component/task/task.component';
import {ViewComponent} from './component/task/viewtask.component';
import {HeaderComponent} from './header.component';
import {SearchUserPipe} from './pipes/searchuser.pipe';
import {SortUsersPipe} from './pipes/sortusers.pipe';
import {SortProjectPipe} from './pipes/sortproject.pipe';
import {SearchTaskPipe} from './pipes/searchtask.pipe';
import {SortTaskPipe} from './pipes/sorttask.pipe';
import {SearchProjectPipe} from './pipes/searchproject.pipe';
import { Users } from './models/Users';
import { Projects } from './models/Projects';
import { Tasks } from './models/Tasks';
import { FormsModule } from '@angular/forms';

const appRoutes:Routes =
[
  {
    path:'AddUser', component:UserComponent
  },
  {
    path:'Edit/:id', component:EditUserComponent
  },
  {
    path:'AddProject', component:ProjectComponent
  },
  {
    path:'AddTask', component:TaskComponent
  },
  {
    path:'', component:ViewComponent
  },
  {
    path:'EditTask/:id', component:EditTaskComponent
  },
  {
    path:'EditProjects/:id', component:EditProjectComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,UserComponent,EditUserComponent,ProjectComponent,SearchUserPipe,TaskComponent,ViewComponent,SearchTaskPipe,HeaderComponent,EditTaskComponent,EditProjectComponent,SortUsersPipe,SortProjectPipe,SearchProjectPipe,SortTaskPipe
  ],
  imports: [
    BrowserModule,HttpClientModule,HttpClientModule,RouterModule.forRoot(appRoutes),FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
