import { Pipe, PipeTransform } from '@angular/core';

import { Tasks } from '../models/Tasks';
@Pipe({
    name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

    transform(tasks: Array<Tasks>, Project?: string) {
        console.log(tasks);
        console.log(Project);
        if(Project)
        {
            let filteredCourse: Array<Tasks> = null;
            filteredCourse= tasks.filter(task => task.Project.startsWith(Project) )
            return filteredCourse;
        }
        return tasks;
    }

}