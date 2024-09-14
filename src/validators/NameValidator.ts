import type { IValidator } from "./IValidator";
import { ValidationResult } from "./ValidationResult";

// если строка заполнена, то проверяет что она заполнена русскими символами
export class NameValidator implements IValidator {
    private _fieldName: string;
    private _fildValue: string | null;

    constructor(fieldName: string, fildValue: string | null) {
        this._fieldName = fieldName;
        this._fildValue = fildValue;
    }

    public get fieldName() {
        return this._fieldName;
    }

    public get fildValue() {
        return this._fildValue;
    }

    validate(validationResults: Array<ValidationResult>): boolean {

        if (this._fildValue == "" || this._fildValue == null) {
            return true;
        }

        const regexp = /^[А-яЁё]+$/g;

        if (this._fieldName.match(regexp) == null) {
            validationResults.push(new ValidationResult(this._fieldName, "Содержит нерусские символы"));
            return false;
        }
         
        return true;
    }
}