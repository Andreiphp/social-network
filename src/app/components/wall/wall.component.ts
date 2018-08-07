import {Component, OnInit} from '@angular/core';
import {UsersServices} from '../../services/users.services';

@Component({
    selector: 'wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.sass']
})
export class WallComponent implements OnInit {
    posts: object;

    constructor(private userServices: UsersServices) {

    }

       loadPost(event) {
        this.posts = event;
    }

    ngOnInit() {

    }

}
