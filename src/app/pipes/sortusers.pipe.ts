import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../models/Users';

@Pipe({
  name: 'sortusersname'
})
export class SortUsersPipe implements PipeTransform {

  transform(users: Users[], path: string[], order: number): Users[] {
    // Check if is not null
    if (!users || !path || !order) return users;

    return users.sort((a: Users, b: Users) => {
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