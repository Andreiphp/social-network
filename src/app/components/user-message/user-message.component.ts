import {Component, OnInit} from '@angular/core';
import {AddFriendServices} from '../../services/addFriend.services';
import {UserMessagesServices} from '../../services/userMessages.services';
import {UsersServices} from '../../services/users.services';
import {WebsoketService} from '../../services/websoket.service';

@Component({
    selector: 'user-message',
    templateUrl: './user-message.component.html',
    styleUrls: ['./user-message.component.sass']
})
export class UserMessageComponent implements OnInit {
    friends: any;
    rooms: any;

    constructor(
        private addFriendServices: AddFriendServices,
        private userMessagesServices: UserMessagesServices,
        private usersServices: UsersServices,
        private websoketServices: WebsoketService
    ) {
        this.addFriendServices.getFriends().subscribe(friends => {
            this.friends = friends;
        });
        this.userMessagesServices.getRooms(this.usersServices.user_info.id).subscribe(result => {
            this.rooms = result;
        });
    }

    onChange(event, friend): void {
        if (Number(friend) !== 0) {
            this.userMessagesServices.createRoom(this.usersServices.user_info.id, friend).subscribe(result => {
                if (result === false) {
                    this.userMessagesServices.getRooms(this.usersServices.user_info.id).subscribe(results => {
                        this.rooms = results;
                        console.log(this.rooms);
                        this.rooms.forEach(function (el) {
                                if (el.creator === +friend || el.participant === +friend) {
                                    this.websoketServices.notificationDeleteRooms(Number(friend), false, {id: el.id});
                                }
                            }.bind(this)
                        );
                    });
                } else {
                    this.userMessagesServices.getRooms(this.usersServices.user_info.id).subscribe(results => {
                        this.rooms = results;
                    });
                    alert('Создана переписка');
                }
            });
        }
    }

    deleteRoom(room): void {
        let notification_id = null;
        let updateStatus: string;

        this.clearRoom(room);
        let user = this.usersServices.user_info.id;
        if (user === room.creator) {
            notification_id = room.participant;
            updateStatus = 'creator_status';
        } else {
            notification_id = room.creator;
            updateStatus = 'participant_status';
        }
        this.userMessagesServices.deleteRoom(room, updateStatus).subscribe();
        this.websoketServices.notificationDeleteRooms(notification_id, true, room);

    }

    clearRoom(delete_room): void {
        for (let i = 0; i < this.rooms.length; i++) {
            if (delete_room.id === this.rooms[i].id) {
                this.rooms.splice(i, 1);
            }
        }
    }

    ngOnInit() {
    }

}
