import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {UsersServices} from './users.services';
import {CommentInterfaces} from '../interfaces/comment-interfaces';
import {WebsoketService} from './websoket.service';

@Injectable()
export class PostsServices {
    user = JSON.parse(sessionStorage.getItem('user_id'));
    user_id: number;

    constructor(private http: HttpClient,
                private userServices: UsersServices,
                private websoketServices: WebsoketService) {
        this.user_id = this.userServices.user_info.id;
    }

    checkPath(comment_info: CommentInterfaces, user_r: number, id_post): void {
        let arr = window.location.pathname.split('/');
        if (arr[1] === 'user' && arr[2] === 'profile') {
            this.saveComment(comment_info).subscribe();
            this.websoketServices.checkComment(comment_info, id_post);
        } else {
            comment_info.user_id = Number(user_r);
            this.saveComment(comment_info).subscribe();
            this.websoketServices.checkComment(comment_info, id_post);
        }
    }

    upload(file: FormData): Observable<boolean | object> {
        return this.http.post(`http://localhost:8080/upload`, file);
    }

    getPosts(user_r): Observable<any> {
        return this.http.post(`http://localhost:8080/getUserPosts`, {'user_id': user_r});
    }

    addComment(comment_info: CommentInterfaces, user_r: number, id_post): void {
        this.checkPath(comment_info, user_r, id_post);
    }

    saveComment(comment_info: CommentInterfaces): Observable<object> {
        return this.http.post(`http://localhost:8080/saveComment`, {'comment_info': comment_info});
    }

}