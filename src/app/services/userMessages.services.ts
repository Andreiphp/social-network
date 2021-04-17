import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';


@Injectable()
export class UserMessagesServices {
    user_id = JSON.parse(sessionStorage.getItem('user_id'));

    constructor(private http: HttpClient) {

    }

    createRoom(user_id: number, friend: number): Observable<any> {
        return this.http.post(`http://localhost:8081/create_rooms`, {'user_id': user_id, 'friends_id': friend});
    }

    getRooms(user_id: number): Observable<object> {
        return this.http.post(`http://localhost:8081/get_rooms`, {'user_id': user_id});
    }

    saveMessages(room_id: number, user_id: number, message: string): Observable<object> {
        return this.http.post(`http://localhost:8081/save_messages`, {
            'user_id': user_id,
            'room_id': room_id,
            'message': message
        });
    }

    getMessagesForRoom(room_id: number): Observable<any> {
        return this.http.post(`http://localhost:8081/get_messages_for_rooms`, {'room_id': room_id});
    }

    deleteRoom(room: any, updateStatus): Observable<any> {
        return this.http.post(`http://localhost:8081/delete_room`, {'room': room, 'status': updateStatus});
    }

    get_info_for_room(room: number): Observable<any> {
        return this.http.post(`http://localhost:8081/get_info_for_room`, {'room': room});
    }


}