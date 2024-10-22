import type { IValidator } from './IValidator';
import type { IUserData } from '../models/IUserData';
import type { ValidationResult } from './ValidationResult';
import { EmptyValidator } from './EmptyValidator';
import { NameValidator } from './NameValidator';
import { BirthdayValidator } from './BirthdayValidator';

export class UserDataValidator implements IValidator {

    private _userData: IUserData;

    constructor(userData: IUserData) {
        this._userData = userData;
    }

    public get userData(): IUserData {
        return this._userData;
    }

    validate(validationResults: Array<ValidationResult>): boolean {

        const validators: Array<IValidator> = [
            new EmptyValidator('lastName', this._userData.lastName),
            new EmptyValidator('firstName', this._userData.firstName),
            new EmptyValidator('birthday', this._userData.birthday),
            new NameValidator('lastName', this._userData.lastName),
            new NameValidator('firstName', this._userData.firstName),
            new NameValidator('surName', this._userData.surName),
            new BirthdayValidator('birthday', this._userData.birthday)
        ];

        let isValid = true;

        for (let validator of validators) {

            let isValidField = validator.validate(validationResults);

            if (!isValidField) {
                isValid = false;
            }
        }

        return isValid;
    }

}