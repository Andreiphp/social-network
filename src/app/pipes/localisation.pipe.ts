import {Pipe, PipeTransform} from '@angular/core';
import {LocalisationServices} from '../services/localisation.services';
import {timer} from 'rxjs';


@Pipe({
    name: 'localisationPipe',
    pure: false
})
export class LocalisationPipe implements PipeTransform {
    constructor(private localizationService: LocalisationServices)
    {

    }


    transform(word) {
        return this.localizationService.usedLocalizations.get(word);
    }

}
