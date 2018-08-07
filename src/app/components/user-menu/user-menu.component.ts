import {Component, OnInit} from '@angular/core';
import {WebsoketService} from '../../services/websoket.service';
import {UserMessagesServices} from '../../services/userMessages.services';
import {UsersServices} from '../../services/users.services';
import {NotificationServices} from '../../services/notification.services';

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.sass']
})
export class UserMenuComponent implements OnInit {
    user_info = JSON.parse(sessionStorage.getItem('user_id'));
    user_img = this.user_info.img;
    open_adapt: boolean;
    position: boolean;

    constructor(private socketServices: WebsoketService,
                public notificationServices: NotificationServices
    ) {
        this.position = false;
        this.open_adapt = false;

    }


    ngOnInit() {

    }

}
