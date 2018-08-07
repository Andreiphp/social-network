import {
    Component, EventEmitter, Input, AfterViewInit,
    AfterContentInit, OnInit, Output
} from '@angular/core';
import {GalleryImages} from '../../services/gallery-images';
import {UsersServices} from '../../services/users.services';
import {UploadImagesServices} from '../../services/uploadImages.services';

@Component({
    selector: 'gallery-images',
    templateUrl: './gallery-images.component.html',
    styleUrls: ['./gallery-images.component.sass']
})
export class GalleryImagesComponent implements OnInit, AfterContentInit {
    user_id: number;
    currentImage: string;
    border: number;
    position_border: any;
    position_slider: any;

    constructor(private userServices: UsersServices,
                private imageServices: UploadImagesServices,
                private galleryImages: GalleryImages) {
        this.currentImage = this.galleryImages.currentImages;
        this.user_id = this.userServices.user_info.id;
        this.border = 0;

    }

    @Output() OnCloseImages = new EventEmitter<boolean>();

    closeImages(bool): void {
        this.galleryImages.show = false;
        this.OnCloseImages.emit(bool);
    }

    changeCurrentImage(event: string) {
        this.currentImage = event;
        this.galleryImages.currentImages = event;
    }

    checkBorder(current_element) {
        this.position_slider = document.getElementById('position_slider').getBoundingClientRect();
        this.position_border = document.getElementById('position_wrapper').getBoundingClientRect();
        let offset = current_element.x - this.position_border.right;
        if (current_element.x > this.position_border.right) {
            this.border = -(offset + (current_element.width / 2));

        }
    }


    ngAfterContentInit() {


    }

    ngOnInit() {

    }


}
