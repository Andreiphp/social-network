import {
    Component,
    AfterViewInit,
    AfterContentInit,
    OnInit,
    Output,
    EventEmitter,
    Input
} from '@angular/core';
import {UsersServices} from '../../services/users.services';
import {UploadImagesServices} from '../../services/uploadImages.services';
import {GalleryImages} from '../../services/gallery-images';
import {GalleryImagesComponent} from '../gallery-images/gallery-images.component';


@Component({
    selector: 'slider-component',
    templateUrl: './slider-component.component.html',
    styleUrls: ['./slider-component.component.sass']
})
export class SliderComponentComponent implements OnInit {
    user_id: number;
    images: object;
    beginning_block: any;
    and_block: any;
    position_slider: any;
    div_border: any;
    count: number;
    id_main_image: number;


    constructor(private userServices: UsersServices,
                private imageServices: UploadImagesServices,
                private galleryImages: GalleryImages, private galleryComponent: GalleryImagesComponent) {
        this.user_id = this.userServices.user_info.id;
        this.count = 1;
        this.imageServices.getUsersImage(this.user_id).subscribe(result => {
            this.images = result;
            this.galleryImages.UserImages = result;
            this.InitBorder(this.galleryImages.currentImages);
        });
        window.onresize = function () {
            if (this.galleryImages.show) {
                this.checkedProperty();
            }
        }.bind(this);


    }

    @Input() position_wrapper: number;
    @Input() position_border: number;
    @Output() changeCurrentImage = new EventEmitter<string>();


    InitBorder(image: string): void {
        this.galleryImages.initBorder(image, function (id) {
            this.id_main_image = id;

        }.bind(this));
    }


    ngOnInit(): void {

        this.beginning_block = document.getElementById('position_wrapper').getBoundingClientRect();
        this.and_block = this.beginning_block.x + this.beginning_block.width;
    }


    setBorder(event, image: string): void {
        this.checkedProperty();
        this.changeCurrentImage.emit(image);
        this.galleryImages.currentImages = image;
        let current_element = event.target.getBoundingClientRect();
        this.galleryImages.moveSlider(this.beginning_block, this.and_block, this.position_slider, current_element, this.div_border, function (mess, run) {
            this.flippingDiv(mess, run, current_element);
        }.bind(this));
    }

    flipping(bool: boolean): void {
        this.checkedProperty();
        this.galleryImages.flippImages(bool, function (current_id, image, border) {
            let current_element = document.getElementById(current_id).getBoundingClientRect();
            this.galleryComponent.checkBorder(current_element);
            this.galleryImages.currentImages = image;
            this.changeCurrentImage.emit(image);
            this.galleryImages.moveSlider(this.beginning_block,
                this.and_block,
                this.position_slider,
                current_element,
                this.div_border,
                function (mess, run) {
                    this.flippingDiv(mess, run, current_element);
                }.bind(this), bool);
        }.bind(this));
    }

    flippingDiv(mess: string, run: string, current_element: any): void {
        if (mess === 'forward' && run === 'go') {
            this.position_wrapper -= 100;
            if (this.count === 1) {
                this.position_border = current_element.x - Math.abs(this.position_slider.x);
            } else {
                this.position_border = current_element.x + Math.abs(this.position_slider.x);
            }
            this.count++;
        }
        if (mess === 'forward' && run === 'stop') {
            if (this.position_slider.width <= this.beginning_block.width) {
                this.position_wrapper = 0;
                this.position_border = current_element.x - Math.abs(this.position_slider.x);
            } else {

                this.position_border = current_element.x + Math.abs(this.position_slider.x);
            }
        }
        if (mess === 'back' && run === 'go') {
            this.position_wrapper += 100;
            this.position_border = current_element.x + Math.abs(this.position_slider.x);
        }
        if (mess === 'back' && run === 'stop') {
            this.position_wrapper = 0;
            this.position_border = current_element.x - Math.abs(this.position_slider.x);
            this.count = 1;
        }
    }

    checkedProperty() {
        this.beginning_block = document.getElementById('position_wrapper').getBoundingClientRect();
        this.and_block = this.beginning_block.x + this.beginning_block.width;
        this.div_border = document.getElementById('position_border').getBoundingClientRect();
        this.position_slider = document.getElementById('position_slider').getBoundingClientRect();
    }

}
