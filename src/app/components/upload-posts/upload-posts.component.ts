import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalisationServices} from '../../services/localisation.services';
import {UserMessagesServices} from '../../services/userMessages.services';
import {UsersServices} from '../../services/users.services';
import {PostsServices} from '../../services/posts.services';
import {ActivatedRoute} from '@angular/router';
import {WebsoketService} from '../../services/websoket.service';

@Component({
    selector: 'upload-posts',
    templateUrl: './upload-posts.component.html',
    styleUrls: ['./upload-posts.component.sass']
})
export class UploadPostsComponent implements OnInit {
    textPost: string;
    file: any;
    user_id: number;
    resizeHeight: number;
    height: string;
    user_r: number;


    constructor(private localisationService: LocalisationServices,
                private userServices: UsersServices,
                private userMessageServices: UserMessagesServices,
                private postServices: PostsServices,
                private activateRoute: ActivatedRoute,
                private websoketServices: WebsoketService
    ) {
        this.user_r = this.activateRoute.snapshot.params['id'];
        this.user_id = this.userServices.user_info.id;
        this.textPost = '';
        this.resizeHeight = 54;
        this.height = this.resizeHeight + 'px';

    }

    @Output() loadPost = new EventEmitter<Object>();

    uploadPost(event) {
        event.preventDefault();
        let formData: FormData = new FormData();
        formData.append('files', this.file);
        formData.append('post', this.textPost);
        formData.append('user_id', this.user_r.toString());
        formData.append('from_user_id', this.user_id.toString());
        this.postServices.upload(formData).subscribe(response => {
            if (response === false) {
                alert('не yдалось загрузить файл');
            } else {
                this.postServices.getPosts(this.user_r).subscribe(posts => {
                    this.loadPost.emit(posts);
                });
            }
        });
        this.websoketServices.sendNewPost(Number(this.user_r));
    }

    resize(event) {
        if (event.code === 'Enter') {
            this.resizeHeight += 16;
            this.height = this.resizeHeight + 'px';
        }
        if (event.code === 'Backspace') {
            if (this.textPost.trim() === '') {
                if (this.resizeHeight <= 54) {
                    this.resizeHeight = 54;
                } else {
                    this.resizeHeight -= 16;
                }
                this.height = this.resizeHeight + 'px';
            }
        }
    }

    onFileChange(event): void {
        this.file = event.target.files[0];

    }

    get currentLanguage() {
        return this.localisationService.currentLanguage;
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            if (this.user_r !== +params['id']) {
                this.user_r = +params['id'];
            }
        });
    }

}
