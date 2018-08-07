import {Component, Input, OnInit} from '@angular/core';
import {PostsServices} from '../../services/posts.services';
import {UsersServices} from '../../services/users.services';
import {CommentInterfaces} from '../../interfaces/comment-interfaces';
import {ActivatedRoute} from '@angular/router';
import {WebsoketService} from '../../services/websoket.service';
import {LocalisationServices} from '../../services/localisation.services';
import {UserPosts} from '../../interfaces/user-message';

@Component({
    selector: 'wall-posts',
    templateUrl: './wall-posts.component.html',
    styleUrls: ['./wall-posts.component.sass']
})
export class WallPostsComponent implements OnInit {
    user_r: number;

    constructor(private postServices: PostsServices,
                private userServices: UsersServices,
                private activateRoute: ActivatedRoute,
                private websoketServices: WebsoketService,
                private localisation: LocalisationServices
    ) {
        this.user_r = this.activateRoute.snapshot.params['id'];
        this.postServices.getPosts(this.user_r).subscribe(posts => {
            this.UserPosts = posts;
        });
        this.websoketServices.getNewPosts().subscribe(data => {
            this.postServices.getPosts(this.user_r).subscribe(posts => {
                this.UserPosts = posts;
            });
        });

        this.websoketServices.response_comment().subscribe(data => {

            this.UserPosts.forEach(function (el) {
                if (el.id === data.data.post_id) {
                    el.comment.unshift(data.data.comment);
                }
            });
        });
    }


    @Input() UserPosts: Array<UserPosts>;

    addCommit(event, id_post) {
        let comment_info: CommentInterfaces = {
            post_id: id_post,
            user_id: this.userServices.user_info.id,
            from_user_id: this.userServices.user_info.id,
            user_name: this.userServices.user_info.name,
            user_last_name: this.userServices.user_info.lastname,
            user_image: this.userServices.user_info.img,
            user_comment: event.target.value,
            date: new Date()
        };
        // this.UserPosts.forEach(function (el) {
        //     if (el.id === id_post) {
        //         el.comment.unshift(comment_info);
        //     }
        // });
        this.user_r = this.activateRoute.snapshot.params['id'];
        this.postServices.addComment(comment_info, this.user_r, id_post);
        event.target.value = '';
    }


    ngOnInit() {

    }

}
