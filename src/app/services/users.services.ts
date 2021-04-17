import {Injectable} from '@angular/core';
import {CheckUser, RegistrationUser} from '../interfaces/registrationUser';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from '../interfaces/user-info';
import {UserMessagesServices} from './userMessages.services';

@Injectable()
export class UsersServices {
    user: RegistrationUser = {
        name: '',
        lastName: '',
        email: '',
        password: '',
        city: '',
        day: '',
        month: '',
        year: '',
        country: ''
    };
    gotUser: CheckUser = {
        login: '',
        password: ''
    };

    my_friend: any;

    count_new_friends = 0;

    user_info: UserInfo;

    constructor(private http: HttpClient, private userMessagesServices: UserMessagesServices) {
        this.my_friend = JSON.parse(sessionStorage.getItem('friends'));
        let user_storage = JSON.parse(sessionStorage.getItem('user_id'));
        if (user_storage) {
            this.user_info = {
                name: user_storage.name,
                lastname: user_storage.lastname,
                id: user_storage.id,
                img: user_storage.img
            };
        }
    }

    resolve(): object {
        let user_storage = JSON.parse(sessionStorage.getItem('user_id'));
        if (user_storage) {
            this.user_info = {
                name: user_storage.name,
                lastname: user_storage.lastname,
                id: user_storage.id,
                img: user_storage.img
            };
            return this.user_info;
        }
    }


    // saveFriends(user_id) {
    //     this.userMessagesServices.getRooms(user_id).subscribe(data => {
    //         let self = this;
    //         let storage_friends = [];
    //         let dat = data as Array<any>;
    //         dat.forEach(function (el) {
    //             if (self.user_info.id === el.creator) {
    //                 storage_friends.push({
    //                     'room': el.id,
    //                     'friend': el.participant
    //                 });
    //             } else {
    //                 storage_friends.push({
    //                     room: el.id,
    //                     friend: el.creator
    //                 });
    //             }
    //         });
    //         sessionStorage.setItem('friends', JSON.stringify(storage_friends));
    //         this.my_friend = JSON.parse(sessionStorage.getItem('friends'));
    //     });
    // }

    // getFriend(room_id: number) {
    //     return this.http.post(`http://localhost:8081/getFriend_for_room`, room_id);
    // }

    checkUser(date: CheckUser) {
        return this.http.post(`http://localhost:8081/check_login`, date);
    }

    registerUser(date: RegistrationUser) {
        return this.http.post(`http://localhost:8081/save_user`, date);
    }
}