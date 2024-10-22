import { FieldValidator } from './FieldValidator';
import { ValidationResult } from './ValidationResult';

export class BirthdayValidator extends FieldValidator {

    constructor(fieldName: string, fieldValue: string | null) {
        super(fieldName, fieldValue);
    }

    validate(validationResults: Array<ValidationResult>): boolean {

        if (this._fieldValue == '' || this._fieldValue == null) {
            return true;
        }

        const today = new Date();

        if (new Date(this._fieldValue) > today) {
            validationResults.push(new ValidationResult(this._fieldName, 'Дата заполнена не корректно'));
            return false;
        }

        return true;
    }
}