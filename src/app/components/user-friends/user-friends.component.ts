import {Component, OnInit} from '@angular/core';
import {AddFriendServices} from '../../services/addFriend.services';
import {WebsoketService} from '../../services/websoket.service';
import {UsersServices} from '../../services/users.services';
import {UserFriends} from '../../interfaces/user-info';
import {NotificationServices} from '../../services/notification.services';

@Component({
    selector: 'user-friends',
    templateUrl: './user-friends.component.html',
    styleUrls: ['./user-friends.component.sass']
})
export class UserFriendsComponent implements OnInit {
    user_id = JSON.parse(sessionStorage.getItem('user_id'));
    usersConfirm: any;
    friends: any;

    constructor(
        private addFriendsServices: AddFriendServices,
        private  socketServices: WebsoketService,
        private usersServices: UsersServices,
        private notificationServices: NotificationServices
    ) {
        this.notificationServices.count_new_friends = 0;
        this.usersServices.count_new_friends = 0;
        this.addFriendsServices.getFriends().subscribe(data => {
            this.friends = data;
        });

        this.addFriendsServices.getUsersForConfirmFriends().subscribe(data => {
            this.usersConfirm = data;
        });
        this.socketServices.NewFriendJoined().subscribe(data => {
            this.addFriendsServices.getUsersForConfirmFriends().subscribe(dat => {
                this.usersConfirm = dat;
            });
        });

        this.socketServices.responseFriends().subscribe(data => {
            this.addFriendsServices.getUsersForConfirmFriends().subscribe(dat => {
                this.usersConfirm = dat;
            });
            this.addFriendsServices.getFriends().subscribe(date => {
                this.friends = date;
            });
        });

        this.socketServices.cancelFriendsRequestSocketOn().subscribe(data => {
            this.addFriendsServices.getUsersForConfirmFriends().subscribe(dat => {
                this.usersConfirm = dat;
            });
        });

        this.socketServices.delete_friend_notification().subscribe(data => {
            this.addFriendsServices.getFriends().subscribe(date => {
                this.friends = date;
            });
        });
    }

    confirmFriends(user: UserFriends): void {
        this.addFriendsServices.updateFriends(user).subscribe(data => {
            this.socketServices.confirmFriendRequest({user: user});
        });
    }

    cancelFriend(user: UserFriends): void {
        this.addFriendsServices.cancelFriendsRequest(user).subscribe(data => {
            this.socketServices.cancelFriendsRequestSocketEmit({user: user});
            this.addFriendsServices.getUsersForConfirmFriends().subscribe(dat => {
                this.usersConfirm = dat;
            });
        });
    }

    deleteFriend(user: UserFriends) {
        this.addFriendsServices.deleteFriend(user).subscribe(response => {
            this.addFriendsServices.getFriends().subscribe(friends => {
                this.friends = friends;
            });
            this.socketServices.delete_friend(user);
        });

    }

    ngOnInit() {
    }

}
