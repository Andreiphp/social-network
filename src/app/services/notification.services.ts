import {Injectable} from '@angular/core';

@Injectable()
export class NotificationServices {
    user_id = JSON.parse(sessionStorage.getItem('user_id'));
    newMessages = 0;
    count_new_friends = 0;
    block_message: boolean;
    block_friends: boolean;

    constructor() {
        this.block_message = false;
        this.block_friends = false;
    }


    getPath(location, callback): void {
        let path = location.split('/');
        if (path[1] !== 'users' && path[2] !== 'room') {
            callback();
        }
    }

    getPathForFriends(location, callback): void {
        let path = location.split('/');
        if (path[1] !== 'users' && path[2] !== 'friends') {
            callback();
        }
    }
}