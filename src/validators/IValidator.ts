import { ValidationResult } from './ValidationResult';

export interface IValidator {
    validate(validationResults: Array<ValidationResult>): boolean;
}