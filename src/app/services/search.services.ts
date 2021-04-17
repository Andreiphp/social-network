import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchServices {
    visible: boolean;
    postReq = {
        search: ''
    };
    toggle: boolean = true;
    result: any;
    searchDate: string;
    query: string;

    constructor(private http: HttpClient) {

    }

    resolve(): Observable<Object> {
        return this.http.post(`http://localhost:8081/search_user`, this.postReq)
            .pipe(
                map(localization => {
                    return this.result = localization;
                })
            );
    }

    setSearchDate(code) {
        this.searchDate = code;
    }

    getResult() {
        return this.result;
    }

    getSearchUsers(date) {
        this.postReq.search = date;
        return this.http.post(`http://localhost:8081/search_user`, this.postReq);
    }

    checkPath() {
        let arr = window.location.pathname.split('/');
        if (arr[1] === 'user' && arr[2] === 'search') {
            this.toggle = false;
        } else {
            this.toggle = true;
        }
    }
}