import {Component, Input, OnInit} from '@angular/core';
import {SearchServices} from '../../services/search.services';
import {AddFriendServices} from '../../services/addFriend.services';


@Component({
    selector: 'nav-search',
    templateUrl: './nav-search.component.html',
    styleUrls: ['./nav-search.component.sass']
})
export class NavSearchComponent implements OnInit {
    @Input() users: any;
    all_search = false;

    constructor(private searchServices: SearchServices, private addFriendsServices: AddFriendServices) {
        this.searchServices.toggle = true;

    }

    ngOnInit() {
    }

    get searchDate() {
        return this.searchServices.searchDate;
    }

    set searchDate(code) {
        this.searchServices.setSearchDate(code);
    }

    get visible() {
        return this.searchServices.visible;
    }

    set visible(bool) {
        this.searchServices.visible = bool;
    }

    onSearchChange(event) {
        this.searchServices.checkPath();
        this.searchServices.query = event;
        let res1 = null;
        let res2 = null;
        if (event.trim().length >= 3) {
            this.searchServices.getSearchUsers(event).subscribe(result => {
                res1 = result;
                this.addFriendsServices.not_added_friends().subscribe(results => {
                    res2 = results;
                    if (res2.length > 0) {
                        for (let i = 0; i <= res1.length - 1; i++) {
                            for (let j = 0; j <= res2.length - 1; j++) {
                                if (res1[i].id === res2[j].user_id || res1[i].id === res2[j].friends_id) {
                                    res1[i].status = 1;
                                    break;
                                } else {
                                    res1[i].status = 2;
                                }
                            }
                        }
                    } else {
                        for (let i = 0; i <= res1.length - 1; i++) {
                            res1[i].status = 2;
                        }
                    }
                    this.users = res1;
                    this.searchServices.result = res1;
                    if (this.searchServices.toggle) {
                        if (this.users.length === 0) {
                            this.visible = false;
                        } else {
                            if (this.users.length > 3) {
                                this.all_search = true;
                            } else {
                                this.all_search = false;
                            }
                            this.visible = true;
                        }
                    } else {
                        this.visible = false;
                    }
                });
            });
        } else {
            this.visible = false;
        }
    }

    hideSearch() {
        this.searchDate = '';
        localStorage.setItem('search', JSON.stringify(this.users));
        this.visible = false;
    }
}
