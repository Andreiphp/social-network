import {Component, OnInit} from '@angular/core';
import {WebsoketService} from '../../services/websoket.service';
import {UserMessagesServices} from '../../services/userMessages.services';
import {UsersServices} from '../../services/users.services';

@Component({
    selector: 'user-menu-adapt',
    templateUrl: './user-menu-adapt.component.html',
    styleUrls: ['./user-menu-adapt.component.sass']
})
export class UserMenuAdaptComponent implements OnInit {
    countNewFriends = 0;
    user_info = JSON.parse(sessionStorage.getItem('user_id'));
    user_img = this.user_info.img;
    open_adapt: boolean;

    constructor(private socketServices: WebsoketService,
                // public userMessageServices: UserMessagesServices,
                public usersServices: UsersServices
    ) {
        this.open_adapt = false;

    }

    open_adapt_menu() {
        this.open_adapt = !this.open_adapt;
    }

    ngOnInit() {

    }

}
