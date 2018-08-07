import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchServices} from '../../services/search.services';
import {WebsoketService} from '../../services/websoket.service';
import {AddFriendServices} from '../../services/addFriend.services';

@Component({
    selector: 'user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.sass']
})
export class UserSearchComponent {
    query: string;
    result: any;
    searchList = true;
    search: string;
    user_id = JSON.parse(sessionStorage.getItem('user_id'));
    not_found = false;

    constructor(private activateRoute: ActivatedRoute,
                private searchService: SearchServices,
                private socketServices: WebsoketService,
                private addFriendsServices: AddFriendServices
    ) {
        this.query = this.activateRoute.snapshot.params['name'];
        this.result = this.getResult();
    }

    add_friend(user, event): void {
        event.target.disabled = true;
        user.status = 1;
        this.addFriendsServices.saveListFriends(this.user_id, user).subscribe(data => {
            this.socketServices.AddNewFriend({
                user: user,
                friend: {name: this.user_id.name, lastName: this.user_id.lastname}
            });
        });

        if (localStorage.getItem('search')) {
            let search = JSON.parse(localStorage.getItem('search'));
            search.map(function (el) {
                if (el.id === user.id) {
                    el.status = 1;
                }
            });
            localStorage.setItem('search', JSON.stringify(search));
        }
    }

    getResult() {
        let result = JSON.parse(localStorage.getItem('search'));
        if (result === null || result === undefined || result === '') {
            this.not_found = true;
        } else {
            this.not_found = false;
            for (let i = 0; i < result.length; i++) {
                if (result[i].id === this.user_id.id) {
                    result.splice(i, 1);
                }
            }
        }
        return result;
    }

    get searchDate() {
        return this.searchService.searchDate;
    }

}
