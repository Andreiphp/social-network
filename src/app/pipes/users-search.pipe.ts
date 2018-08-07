import {Pipe, PipeTransform} from '@angular/core';
import {SearchServices} from '../services/search.services';
import {UserSearchComponent} from '../components/user-search/user-search.component';
import {AddFriendServices} from '../services/addFriend.services';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Pipe({
    name: 'userSearchPipe'
})
export class UsersSearchPipe implements PipeTransform {
    result: any;
    confirm_friend: any;


    constructor(private searchServices: SearchServices,
                private userSearchComponent: UserSearchComponent,
                private addFriendsServices: AddFriendServices
    ) {

    }

    transform(users, input) {
        let arr = null;
        let arr2 = null;

        if (input !== undefined && input !== '') {
            localStorage.removeItem('search');
            this.searchServices.getSearchUsers(input).subscribe(result => {
                arr = result;
                this.addFriendsServices.not_added_friends().subscribe(results => {
                    arr2 = results;
                    if (arr2.length > 0) {
                        this.userSearchComponent.not_found = false;
                        for (let i = 0; i <= arr.length - 1; i++) {
                            for (let j = 0; j <= arr2.length - 1; j++) {
                                if (arr[i].id === arr2[j].user_id || arr[i].id === arr2[j].friends_id) {
                                    arr[i].status = 1;
                                    break;
                                } else {
                                    arr[i].status = 2;
                                }
                            }
                        }
                    } else {
                        for (let i = 0; i <= arr.length - 1; i++) {
                            arr[i].status = 2;
                        }
                    }
                    this.result = arr;
                });
            });
        } else {
            this.result = users;
        }
        return this.result;
    }
}