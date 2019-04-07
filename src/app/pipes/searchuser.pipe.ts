import { Pipe, PipeTransform } from '@angular/core';

import { Users } from '../models/Users';
@Pipe({
    name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

    transform(users: Array<Users>, First_Name?: string) {
        console.log(users);
        console.log(First_Name);
        if(First_Name)
        {
            let filteredCourse: Array<Users> = null;
            filteredCourse= users.filter(user => user.First_Name.startsWith(First_Name) )
            return filteredCourse;
        }
        return users;
    }

}