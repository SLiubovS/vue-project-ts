export class ValidationResult {

    private _fieldName: string;
    private _message: string;

    constructor(fieldName: string, message: string) {

        this._fieldName = fieldName;
        this._message = message;
    }

    public get fieldName(): string {
        return this._fieldName;
    }

    public get message(): string {
        return this._message;
    }
}
