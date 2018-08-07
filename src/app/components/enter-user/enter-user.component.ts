import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersServices} from '../../services/users.services';
import {CheckUser, RegistrationUser} from '../../interfaces/registrationUser';
import {Router} from '@angular/router';

@Component({
    selector: 'enter-user',
    templateUrl: './enter-user.component.html',
    styleUrls: ['./enter-user.component.sass']
})
export class EnterUserComponent implements OnInit {
    block = false;
    sucreg = false;
    nologged = false;
    user: RegistrationUser;
    gotUser: CheckUser;

    constructor(private userServices: UsersServices, private router: Router) {
        this.userServices = userServices;
        this.user = this.userServices.user;
        this.gotUser = this.userServices.gotUser;
    }

    toggle(event, bool) {
        event.preventDefault();
        this.block = bool;
    }

    checkLogin() {
        this.userServices.checkUser(this.gotUser).subscribe(result => {
            if (result[0]) {
                if (result[0].mail === this.gotUser.login && result[0].password === this.gotUser.password) {
                    sessionStorage.setItem('user', 'true');
                    sessionStorage.setItem('user_id',
                        JSON.stringify({
                            id: result[0].id,
                            name: result[0].name,
                            lastname: result[0].lastname,
                            img: result[0].img
                        }));
                    let user_storage = JSON.parse(sessionStorage.getItem('user_id'));
                    this.userServices.user_info = {
                        name: user_storage.name,
                        lastname: user_storage.lastname,
                        id: user_storage.id,
                        img: user_storage.img
                    };
                    this.router.navigate(['/user/profile', result[0].id]);
                } else {
                    this.nologged = true;
                    sessionStorage.setItem('user', 'false');

                }
            } else {
                this.nologged = true;
            }
        });
    }

    registerUser() {
        this.userServices.registerUser(this.user).subscribe(res => {
            if (res === true) {
                this.block = true;
                this.sucreg = true;
                Object.keys(this.user).map(e => {
                    this.user[e] = '';
                });

            }
        });

    }

    closereg() {
        this.sucreg = false;
        this.nologged = false;
    }

    ngOnInit() {
    }

}
