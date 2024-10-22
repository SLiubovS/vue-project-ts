import { FieldValidator } from './FieldValidator';
import { ValidationResult } from './ValidationResult';

// проверяет что строковый параметр заполнен
export class EmptyValidator extends FieldValidator {

    constructor(fieldName: string, fieldValue: string | null) {
        super(fieldName, fieldValue);
    }

    validate(validationResults: Array<ValidationResult>): boolean {

        if (this._fieldValue == null || this._fieldValue == '') {
            validationResults.push(new ValidationResult(this._fieldName, 'Не заполнено'));
            return false;
        }

        return true;
    }
}