import {Component, OnInit} from '@angular/core';
import {LocalisationServices} from '../../services/localisation.services';
import {WebsoketService} from '../../services/websoket.service';
import {UsersServices} from '../../services/users.services';
import {UserInfo} from '../../interfaces/user-info';
import {Router} from '@angular/router';
import {NotificationServices} from '../../services/notification.services';

@Component({
    selector: 'user-main',
    templateUrl: './user-main.component.html',
    styleUrls: ['./user-main.component.sass']
})
export class UserMainComponent implements OnInit {
    user_info: UserInfo;
    open_menu: boolean;

    constructor(private localisationServices: LocalisationServices,
                private usersServices: UsersServices,
                private socketServices: WebsoketService,
                private notificationServices: NotificationServices,
                private router: Router
    ) {
        this.open_menu = false;
        this.user_info = this.usersServices.user_info;
        // this.usersServices.saveFriends(this.user_info.id);
        this.add_user();
    }

    enter() {
        this.open_menu = false;
        sessionStorage.removeItem('user');
        this.router.navigate(['']);
    }

    menuOpen() {
        this.open_menu = !this.open_menu;
    }

    add_user() {
        this.socketServices.AddNewUser({user: this.user_info.id});
    }

    ngOnInit() {
    }

}
