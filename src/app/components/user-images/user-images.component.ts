import {Component, OnInit} from '@angular/core';
import {UsersServices} from '../../services/users.services';
import {UploadImagesServices} from '../../services/uploadImages.services';
import {GalleryImages} from '../../services/gallery-images';

@Component({
    selector: 'user-images',
    templateUrl: './user-images.component.html',
    styleUrls: ['./user-images.component.sass']
})
export class UserImagesComponent implements OnInit {
    file: string;
    user_id: number;
    images: Object;
    show: boolean;

    constructor(private userServices: UsersServices,
                private imageServices: UploadImagesServices,
                public galleryImages: GalleryImages) {
        this.user_id = this.userServices.user_info.id;
        this.imageServices.getUsersImage(this.user_id).subscribe(result => {
            this.images = result;
        });
        this.show = this.galleryImages.show;
    }

    uploadImages(): void {
        if (this.file) {
            let formData: FormData = new FormData();
            formData.append('files', this.file);
            formData.append('from_user_id', this.user_id.toString());
            this.imageServices.upload(formData).subscribe(response => {
                if (response === true) {
                    this.imageServices.getUsersImage(this.user_id).subscribe(result => {
                        this.images = result;
                    });
                }
            });
            this.file = '';
        }
    }

    onFileChangeImages(event): void {
        this.file = event.target.files[0];
    }

    OnCloseImages(event) {
        this.galleryImages.show = false;
    }

    viewImages(images) {
        let body = document.getElementById('body');
        this.galleryImages.currentImages = images;
        this.galleryImages.show = !this.galleryImages.show;
    }

    ngOnInit() {
    }

}
