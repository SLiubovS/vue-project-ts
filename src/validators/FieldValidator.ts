import type { IValidator } from "./IValidator";
import type { ValidationResult } from "./ValidationResult";

export abstract class FieldValidator implements IValidator {

    protected _fieldName: string;
    protected _fieldValue: string | null;

    constructor(fieldName: string, fieldValue: string | null) {
        this._fieldName = fieldName;
        this._fieldValue = fieldValue;
    }

    public get fieldName() {
        return this._fieldName;
    }

    public get fieldValue() {
        return this._fieldValue;
    }

    abstract validate(validationResults: Array<ValidationResult>): boolean;

}