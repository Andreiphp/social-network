import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFriends, UserInfo} from '../interfaces/user-info';
import {Observable} from 'rxjs/index';

@Injectable()
export class AddFriendServices {
    user_id = JSON.parse(sessionStorage.getItem('user_id'));

    constructor(private http: HttpClient) {

    }

    saveListFriends(user_id, user): Observable<object> {
        return this.http.post(`http://localhost:8080/add_friends`, {'user_id': user_id, 'friends_id': user});
    }

    getUsersForConfirmFriends(): Observable<object> {
        return this.http.post(`http://localhost:8080/get_users_confirm`, {'user_id': this.user_id});
    }

    not_added_friends(): Observable<object> {
        return this.http.post(`http://localhost:8080/search_not_added_to_friends`, {'user_id': this.user_id});
    }

    getFriends(): Observable<object> {
        return this.http.post(`http://localhost:8080/get_friends`, {'user_id': this.user_id});
    }

    updateFriends(user: UserFriends): Observable<object> {
        return this.http.post(`http://localhost:8080/update_friends`, {'friends': user});
    }

    cancelFriendsRequest(user: UserFriends): Observable<object> {
        return this.http.post(`http://localhost:8080/remove_request_friends`, {'friends': user});
    }

    deleteFriend(user: UserFriends): Observable<object> {
        return this.http.post(`http://localhost:8080/deleteFriend`, {'friend': user});
    }

    get_one_user(user_id: number): Observable<object> {
        return this.http.post(`http://localhost:8080/get_one_user`, {id: user_id});
    }

}
