import { FieldValidator } from "./FieldValidator";
import { ValidationResult } from "./ValidationResult";

// если строка заполнена, то проверяет что она заполнена русскими символами
export class NameValidator extends FieldValidator {

    constructor(fieldName: string, fieldValue: string | null) {
        super(fieldName, fieldValue);
    }

    validate(validationResults: Array<ValidationResult>): boolean {

        if (this._fieldValue == "" || this._fieldValue == null) {
            return true;
        }

        const regexp = /^[А-яЁё]+$/g;

        if (this._fieldValue.match(regexp) == null) {
            validationResults.push(new ValidationResult(this._fieldName, "Содержит нерусские символы"));
            return false;
        }

        return true;
    }
}