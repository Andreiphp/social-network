import {Component, OnInit} from '@angular/core';
import {UserMessagesServices} from '../../services/userMessages.services';
import {WebsoketService} from '../../services/websoket.service';
import {ActivatedRoute} from '@angular/router';
import {UsersServices} from '../../services/users.services';
import {UserMessage} from '../../interfaces/user-message';
import {NotificationServices} from '../../services/notification.services';
import {LocalisationServices} from '../../services/localisation.services';

@Component({
    selector: 'user-message-send',
    templateUrl: './user-message-send.component.html',
    styleUrls: ['./user-message-send.component.sass']
})
export class UserMessageSendComponent implements OnInit {
    text: string;
    messages: Array<UserMessage> = [];
    room: number;
    friend: number;
    status: boolean;


    constructor(
        private userMessageServices: UserMessagesServices,
        private websocketServices: WebsoketService,
        private activateRoute: ActivatedRoute,
        private userServices: UsersServices,
        private notificationServices: NotificationServices,
        private localisation: LocalisationServices
    ) {
        this.text = '';
        this.status = false;
        this.notificationServices.newMessages = 0;
        this.room = this.activateRoute.snapshot.params['id'];
        this.websocketServices.connect(this.room,
            `${ this.userServices.user_info.name}` + ' ' + `${this.userServices.user_info.lastname}` + '  ' + 'в сети');

        this.userMessageServices.getMessagesForRoom(this.room).subscribe(msg => {
            for (let i = 0; i < msg.length; i++) {
                this.messages.unshift(msg[i]);
            }
            this.userMessageServices.get_info_for_room(this.room).subscribe(result => {
                result.forEach(function (el) {
                    if (this.userServices.user_info.id === el.creator) {
                        this.friend = el.participant;
                    } else {
                        this.friend = el.creator;
                    }
                }.bind(this));
            });
        });

        this.websocketServices.get_new_message().subscribe(message => {
            let new_mess = message;
            if (new_mess.room === this.room) {
                this.messages.unshift(new_mess.data);
            }
        });
        this.websocketServices.get_notification_room_delete().subscribe(messages => {
            if (messages.room.id === +this.room) {
                this.status = messages.message;
            }
        });

        this.userMessageServices.get_info_for_room(this.room).subscribe(info => {
            if (info[0].creator_status === 2 || info[0].participant_status === 2) {
                this.status = true;
            }
        });
    }

    send_message(text: string): void {
        if (text.length > 0) {
            this.userMessageServices.saveMessages(this.room, this.userServices.user_info.id, this.text).subscribe();
            this.websocketServices.send_message(this.room,
                {
                    id: this.userServices.user_info.id,
                    name: this.userServices.user_info.name,
                    lastname: this.userServices.user_info.lastname,
                    img: this.userServices.user_info.img,
                    message: this.text,
                    friend: this.friend,
                    date: new Date()
                });
        }
        this.text = '';
    }

    ngOnInit() {
    }

}
