import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UploadImagesServices {
    constructor(private  http: HttpClient) {
    }

    upload(form_data: FormData): Observable<any> {
        return this.http.post('http://localhost:8081/uploadImageServices', form_data);
    }

    getUsersImage(user_id: number): Observable<object> {
        return this.http.post('http://localhost:8081/getUsersImages', {user_id: user_id});
    }

}