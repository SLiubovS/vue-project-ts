import { ValidationResult } from "../models/ValidationResult";
import type { IUserValidation } from "../models/IUserValidation";

export function validationUserInput(user:IUserValidation): Array<ValidationResult> {

  // принимать на вход объект, 
  // принимать на вход также инпутрЭды
  

  const validationResults = [];
  const regexp = /^[А-яЁё]+$/g;
 
  if (user.lastName == null || user.lastName == "") {
    validationResults.push(
      new ValidationResult("lastName", "Фамилия не заполнена")
    );
    //user.value.lastNameInputRed.value = true;
  }

  if (user.firstName == null || user.firstName == "") {
    validationResults.push(
      new ValidationResult("firstName", "Имя не заполнено")
    );
    //user.value.firstNameInputRed.value = true;
  }

  if (user.checked) {
    if (user.surName == null || user.surName == "") {
      validationResults.push(
        new ValidationResult("surName", "Отчество не заполнено")
      );
      //user.value.surNameInputRed.value = true;

    }
  }

  if (user.birthday == null) {
    validationResults.push(
      new ValidationResult("birthday", "Дата рождения не заполнена")
    );
    //user.value.birthdayInputRed.value = true;
  }

  if (
    user.lastName != null &&
    user.lastName != "" &&
    user.lastName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("lastName", "Фамилия содержит нерусские символы")
    );
    //user.value.lastNameInputRed.value = true;
  }

  if (
    user.firstName != null &&
    user.firstName != "" &&
    user.firstName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("firstName", "Имя содержит нерусские символы")
    );
    //user.value.firstNameInputRed.value = true;
  }

  const today = new Date();

  if (user.birthday == null || new Date(user.birthday) > today) {
    validationResults.push(
      new ValidationResult("birthday", "Дата рождения заполнена некорректно")
    );
    //user.value.birthdayInputRed.value = true;
  }

  if (user.checked) {
    if (
      user.surName != null &&
      user.surName != "" &&
      user.surName.match(regexp) == null
    ) {
      validationResults.push(
        new ValidationResult("surName", "Отчество содержит нерусские символы")
      );
      //user.value.surNameInputRed.value = true;
    }
  }
  return validationResults;
}