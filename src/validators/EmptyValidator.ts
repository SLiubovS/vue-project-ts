import type { IValidator } from "./IValidator";
import { ValidationResult } from "./ValidationResult";

// проверяет что строковый параметр заполнен
export class EmptyValidator implements IValidator {

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

        if (this._fildValue == null || this._fildValue == "") {
            validationResults.push(new ValidationResult(this._fieldName, "Не заполнено"));
            return false;
        }
        
        return true;
    }
}