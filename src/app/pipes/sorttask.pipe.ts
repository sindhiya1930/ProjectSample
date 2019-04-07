import { Pipe, PipeTransform } from '@angular/core';
import { Tasks } from '../models/Tasks'

@Pipe({
  name: 'sorttask'
})
export class SortTaskPipe implements PipeTransform {

  transform(tasks: Tasks[], path: string[], order: number): Tasks[] {
    // Check if is not null
    if (!tasks || !path || !order) return tasks;

    return tasks.sort((a: Tasks, b: Tasks) => {
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