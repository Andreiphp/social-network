import {Injectable} from '@angular/core';


@Injectable()
export class DatabaseServices {
    constructor() {

    }

    open(dbName: string, version: number) {

        return new Promise((resolve, reject) => {
            let request = indexedDB.open(dbName, version);
            request.onerror = function (ev: Event) {
                reject('error');
            };
            request.onsuccess = function (ev: Event) {
                resolve(request.result as IDBTransaction);
            };

            request.onupgradeneeded = function (event) {
                let base = request.result;
                base.createObjectStore('lang', {keyPath: 'code'});
            };
        });
    }

    addDateIntoDB(date) {
        this.open('language', 1).then(db => {
            return new Promise((resolve, reject) => {
                let dbd = db as IDBDatabase;
                dbd.transaction(['lang'], 'readwrite').objectStore('lang').add(date).onsuccess = function (ev) {
                    resolve();
                };
            });
        });
    }

    getDateIntoDB(date) {
        return new Promise((resolve, reject) => {
            this.open('language', 1).then(db => {
                let dbd = db as IDBDatabase;
                dbd.transaction(['lang']).objectStore('lang').get(date).onsuccess = function (ev) {
                    let evv = ev as any;
                    resolve(evv.target.result);
                };
            });
        });
    }
}