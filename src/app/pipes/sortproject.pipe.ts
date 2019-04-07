import { Pipe, PipeTransform } from '@angular/core';
import { Projects } from '../models/Projects'

@Pipe({
  name: 'sortproject'
})
export class SortProjectPipe implements PipeTransform {

  transform(projects: Projects[], path: string[], order: number): Projects[] {
    // Check if is not null
    if (!projects || !path || !order) return projects;

    return projects.sort((a: Projects, b: Projects) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }

}