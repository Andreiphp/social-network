import {Component, OnInit} from '@angular/core';
import {NotificationServices} from '../../services/notification.services';
import {WebsoketService} from '../../services/websoket.service';

@Component({
    selector: 'user-notification',
    templateUrl: './user-notification.component.html',
    styleUrls: ['./user-notification.component.sass']
})
export class UserNotificationComponent implements OnInit {
    sender_name: string;
    sender_lastName: string;
    reqFriend_name: string;
    reqFriend_lastName: string;
    audio: any;
    check: string;

    constructor(public notificationServices: NotificationServices, private socketServices: WebsoketService) {
        this.socketServices.NewFriendJoined().subscribe(message => {
            this.notificationServices.getPathForFriends(window.location.pathname, function () {
                this.notificationServices.count_new_friends++;
                this.notificationServices.block_friends = true;
                this.reqFriend_name = message.friend.name;
                this.reqFriend_lastName = message.friend.lastName;
                this.soundPlay('audio_friends');
            }.bind(this));
        });

        this.socketServices.get_new_notification().subscribe(massage => {
            this.notificationServices.getPath(window.location.pathname, function () {
                this.notificationServices.newMessages++;
                this.notificationServices.block_message = true;
                this.sender_name = massage.data.name;
                this.sender_lastName = massage.data.lastname;
                this.soundPlay('audio_mess');
            }.bind(this));
        });
    }


    hide_notification() {
        this.notificationServices.newMessages = 0;
        this.notificationServices.block_message = false;
    }

    hide_notification_friend() {
        this.notificationServices.block_friends = false;
    }

    soundPlay(audio_mess) {
        this.audio = document.getElementById(audio_mess);
        this.audio.play();
    }

    ngOnInit() {

    }

}
