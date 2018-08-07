import {Component, OnInit} from '@angular/core';
import {LanguageDescription} from '../../interfaces/localization-interfaces';
import {LocalisationServices} from '../../services/localisation.services';

@Component({
    selector: 'language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.sass']
})
export class LanguageSwitcherComponent implements OnInit {

    private languages = new Map<string, LanguageDescription>([
        ['ru-RU', {
            title: 'Русский',
            code: 'ru-RU',
            isRtl: false
        }],
        ['en-GB', {
            title: 'English (GB)',
            code: 'en-GB',
            isRtl: false
        }],
        ['ar', {
            title: 'العربية (AR)',
            code: 'ar',
            isRtl: true
        }]
    ]);

    constructor(private localisationServices: LocalisationServices) {
        this.localisationServices = localisationServices;
    }

    gelLangList(): Array<LanguageDescription> {
        return [...this.languages.values()];
    }

    ngOnInit() {
    }

    get currentLanguage() {
        return this.localisationServices.currentLanguage;
    }

    set currentLanguage(code) {
        this.localisationServices.setCurrentLocalization(code);
    }

}
