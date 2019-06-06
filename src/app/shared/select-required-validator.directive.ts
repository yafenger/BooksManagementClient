import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appSelectValidator]',
    //register:add custom validator to NG_VALIDATORS
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: SelectRequiredValidatorDirective,
            multi: true
        }]
})
export class SelectRequiredValidatorDirective implements Validator {
    @Input() appSelectValidator: string;
    //implement validate method for the Validator Interface
    validate(control: AbstractControl): { [key: string]: any } | null {
        return control.value === this.appSelectValidator  ? { 'defaultSelected': true } : null;
    }
}