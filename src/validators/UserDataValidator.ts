import type { IValidator } from "./IValidator";
import type { IUserData } from "../models/IUserData";
import type { ValidationResult } from "./ValidationResult";

export class UserDataValidator implements IValidator {

    private _userData: IUserData;

    constructor(userData: IUserData) {
        this._userData = userData;
    }

    public get userData(): IUserData {
        return this._userData;
    }

    validate(validationResults: Array<ValidationResult>): boolean {
        throw new Error("Method not implemented.");
    }
    
}