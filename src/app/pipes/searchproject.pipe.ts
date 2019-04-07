import { Pipe, PipeTransform } from '@angular/core';

import { Tasks } from '../models/Tasks';
@Pipe({
    name: 'searchProject'
})
export class SearchProjectPipe implements PipeTransform {

    transform(projects: Array<Tasks>, Project?: string) {
        console.log(projects);
        console.log(Project);
        if(Project)
        {
            let filteredCourse: Array<Tasks> = null;
            filteredCourse= projects.filter(task => task.Project.startsWith(Project) )
            return filteredCourse;
        }
        return projects;
    }

}