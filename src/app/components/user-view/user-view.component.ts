import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebsoketService} from '../../services/websoket.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PostsServices} from '../../services/posts.services';
import {AddFriendServices} from '../../services/addFriend.services';
import {UserInfo} from '../../interfaces/user-info';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';


@Component({
    selector: 'user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit, OnDestroy {
    posts: object;
    main_user: number;
    user_pr_img: string;
    user_pr_name: string;
    user_pr_lastname: string;

    constructor(private websoketServices: WebsoketService,
                private activateRoute: ActivatedRoute,
                private postServices: PostsServices,
                private addfriendsServices: AddFriendServices
    ) {

        this.main_user = this.activateRoute.snapshot.params['id'];
        this.websoketServices.connect_to_posts(this.main_user);
        this.websoketServices.getNewPosts().subscribe(data => {
            this.postServices.getPosts(this.main_user).subscribe(posts => {
                this.posts = posts;
            });
        });
    }

    loadPost(event): void {
        this.posts = event;
    }

    ngOnInit() {

        // this.user_pr_img = this.addfriendsServices.get_one_user(this.activateRoute.snapshot.params['id']).pipe(map(result => result[0].img));

        this.activateRoute.params.subscribe(params => {
            this.addfriendsServices.get_one_user(this.activateRoute.snapshot.params['id']).subscribe(result => {
                this.user_pr_img = result[0].img;
                this.user_pr_name = result[0].name;
                this.user_pr_lastname = result[0].lastname;

            });
            if (this.main_user !== +params['id']) {
                this.websoketServices.leave_user_posts(Number(this.main_user));
                this.main_user = this.activateRoute.snapshot.params['id'];
                this.websoketServices.connect_to_posts(Number(this.main_user));
                this.postServices.getPosts(Number(params['id'])).subscribe(posts => {
                    this.posts = posts;
                });
            }
        });
    }

    ngOnDestroy() {
        this.websoketServices.leave_user_posts(Number(this.main_user));
    }

}
