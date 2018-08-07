import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';


@Injectable()
export class GalleryImages {
    currentImages: string;
    wrapper_images: any;
    UserImages: any;
    position_border: number;
    offset_border: any;
    show: boolean;

    constructor() {
        this.show = false;

    }

    moveSlider(beginning_block, and_block, position_slider, current_element, div_border, callback, bool?: boolean): void {
        let and_slider = position_slider.x + position_slider.width;
        let beginning_slider = position_slider.x;
        if (bool === true || bool === false) {
            if (current_element.x < div_border.x) {
                if (beginning_slider + 71 >= beginning_block.x) {
                    callback('back', 'stop');
                } else {
                    callback('back', 'go');
                }
            } else {
                if (and_block > and_slider) {
                    callback('forward', 'stop');
                } else {
                    callback('forward', 'go');
                }

            }
        } else {
            if (current_element.x < div_border.x) {
                if (beginning_slider + 71 >= beginning_block.x) {
                    callback('back', 'stop');
                } else {
                    callback('back', 'go');
                }
            } else {
                if (and_block >= and_slider) {
                    callback('forward', 'stop');
                } else {
                    callback('forward', 'go');

                }

            }
        }
    }


    flippImages(bool, callback): void {
        let count = 0;
        for (let i = 0; i <= this.UserImages.length - 1; i++) {
            if (this.currentImages === this.UserImages[i].image) {
                count = i;
            }
        }
        if (bool === true) {
            if (count === 0) {
                count = this.UserImages.length - 1;
            } else {
                --count;
                callback(this.UserImages[count].id, this.UserImages[count].image, this.position_border);
            }
        }
        if (bool === false) {
            if (count === this.UserImages.length - 1) {
                count = 0;
            } else {
                ++count;
                callback(this.UserImages[count].id, this.UserImages[count].image, this.position_border);
            }
        }

    }

    // getComponent(id): void {
    //     setTimeout(() => {
    //         console.log(document.getElementById(id).getBoundingClientRect());
    //     }, 1000);
    //
    // }

    initBorder(image, callback) {
        let id = null;
        for (let i = 0; i <= this.UserImages.length - 1; i++) {
            if (image === this.UserImages[i].image) {
                id = this.UserImages[i].id;
                callback(this.UserImages[i].id);
            }
        }


    }

}