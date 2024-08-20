export class ValidationResult {

    constructor(fieldName, message) {

        if (typeof fieldName != "string")
            throw "firstName должно быть строкой";

        if (typeof message != "string")
            throw "firstName должно быть строкой";

        this.fieldName = fieldName;
        this.message = message;
    }
}