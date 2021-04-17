import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {UserMessage} from '../interfaces/user-message';
import {CommentInterfaces} from '../interfaces/comment-interfaces';

@Injectable()
export class WebsoketService {

    public socket = io('http://localhost:8081');

    constructor() {
    }

    AddNewFriend(data) {
        return this.socket.emit('add_friend', data);
    }

    NewFriendJoined(): Observable<any> {
        let observable = new Observable(observer => {
            this.socket.on('new_friend', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    AddNewUser(data): void {
        this.socket.emit('add_user', data);
    }

    confirmFriendRequest(data): void {
        this.socket.emit('confirm_friends_request', data);
    }

    responseFriends(): Observable<Object> {
        let observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('confirm_friends', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }


    cancelFriendsRequestSocketEmit(data): void {
        this.socket.emit('cancel_friends_emit', data);
    }

    cancelFriendsRequestSocketOn(): Observable<Object> {
        let observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('cancel_friends_on', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    delete_friend(data): void {
        this.socket.emit('delete_friend', {user: data});
    }

    delete_friend_notification(): Observable<Object> {
        let observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('delete_friend_on', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    connect(room: number, text: string): void {
        this.socket.emit('join', {room: room, text: text});
    }

    connect_emit() {
        let observable = new Observable(observer => {
            this.socket.on('new_chat_message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    send_message(room: number, data_mess: UserMessage): void {
        this.socket.emit('new_message', {room: room, data: data_mess});
    }

    get_new_message(): Observable<any> {
        let observable = new Observable(observer => {
            this.socket.on('get_new_message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    get_new_notification(): Observable<any> {
        let observable = new Observable(observer => {
            this.socket.on('get_notification_mess', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    connect_to_posts(main_user: number): void {
        this.socket.emit('connect_user_posts', {user: main_user});
    }

    sendNewPost(main_user: number): void {
        this.socket.emit('checkNewPost', {user: main_user});
    }

    leave_user_posts(main_user: number): void {

        this.socket.emit('leave_posts', {user: main_user});
    }


    getNewPosts(): Observable<Object> {
        let observable = new Observable(observer => {
            this.socket.on('get_new_posts', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    checkComment(comment: CommentInterfaces, id_post: number): void {
        this.socket.emit('check_comment', {comment: comment, post_id: id_post});
    }

    response_comment(): Observable<any> {
        let observable = new Observable(observer => {
            this.socket.on('response_comment', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    notificationDeleteRooms(id: number,  message: boolean, room?: any): void {
        this.socket.emit('notification_deleteRooms', {notification_id: id, room: room, message: message});
    }

    get_notification_room_delete(): Observable<any> {
        let observable = new Observable(observer => {
            this.socket.on('get_notification_room', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
}
