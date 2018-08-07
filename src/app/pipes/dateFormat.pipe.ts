import {Pipe, PipeTransform} from '@angular/core';
import {LocalisationServices} from '../services/localisation.services';
import DateTimeFormat = Intl.DateTimeFormat;


@Pipe({
    name: 'DateFormatPipe',
    pure: true
})
export class DateFormatPipe implements PipeTransform {
    dateFormatter: DateTimeFormat;

    constructor(private localizationService: LocalisationServices) {
        this.upload(localizationService.currentLanguage);
        this.localizationService.onchange(code => {
            this.upload(code);
        });
    }

    upload(code: string) {
        this.dateFormatter = new Intl.DateTimeFormat(code, {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        });

    }


    transform(date: Date) {
        let datee = new Date(date);
        // this.dateFormatter = new Intl.DateTimeFormat(this.localizationService.currentLanguage);
        return this.dateFormatter.format(datee);
        // let d = null;
        // if (this.localizationService.currentLanguage === 'ru-RU') {
        //     d = date;
        // } else {
        //     d = 'd';
        // }
        // return d;
    }

}
