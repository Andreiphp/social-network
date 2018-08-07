import {Injectable} from '@angular/core';
import {DatabaseServices} from './database.services';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class LocalisationServices {
    currentLanguage = 'ru-RU';
    usedLocalizations = new Map<string, string>();
    changeCallbacks = new Set<(code: string) => void>();
    body: HTMLElement = document.getElementById('body');

    constructor(private database: DatabaseServices, private http: HttpClient) {
        this.database = database;
    }

    resolve(): Observable<Map<string, string>> {
        if (this.usedLocalizations.size) {
            return of(this.usedLocalizations);
        } else {
            return this.http.get(`./assets/localization/ru-RU.json`)
                .pipe(
                    map(localization => {
                        for (let [key, value] of Object.entries(localization)) {
                            this.usedLocalizations.set(key, value);
                        }
                        return this.usedLocalizations;
                    })
                );
        }
    }

    setCurrentLocalization(code: string): void {
        this.currentLanguage = code;
        this.setCallbacks(code);
        if (code === 'ar') {
            this.body.style.direction = 'rtl';
        } else {
            this.body.style.direction = 'ltr';
        }
        this.database.getDateIntoDB(code).then(date => {
            if (date) {
                for (let [key, value] of Object.entries(date)) {
                    this.usedLocalizations.set(key, value);
                }
            } else {
                this.http.get(`./assets/localization/${this.currentLanguage}.json`).subscribe((data: Object) => {
                    for (let [key, value] of Object.entries(data)) {
                        this.usedLocalizations.set(key, value);
                    }
                    this.database.addDateIntoDB(data);
                });
            }
        });
    }

    setCallbacks(code: string): void {
        for (let callback of this.changeCallbacks.values()) {
            callback(code);
        }
    }

    onchange(callback: (code: string) => void) {
        this.changeCallbacks.add(callback);
    }
}