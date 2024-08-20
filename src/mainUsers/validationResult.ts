export class ValidationResult {

    fieldName:string;
    message:string;

    constructor(fieldName:string, message:string) {

        // if (typeof fieldName != "string")
        //     throw "firstName должно быть строкой";

        // if (typeof message != "string")
        //     throw "firstName должно быть строкой";

        this.fieldName = fieldName;
        this.message = message;
    }
}