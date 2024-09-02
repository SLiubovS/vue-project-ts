import type { Ref } from "vue"
import { ValidationResult } from "../models/ValidationResult";
import type { IUserValidation } from "@/models/IUserValidation";

export function validationUserInput(user:Ref<IUserValidation>): Array<ValidationResult> {

  // принимать на вход объект, 
  // принимать на вход также инпутрЭды
  

  const validationResults = [];
  const regexp = /^[А-яЁё]+$/g;
  const todayYear = new Date().getFullYear();

  if (user.value.lastName == null || user.value.lastName == "") {
    validationResults.push(
      new ValidationResult("lastName", "Фамилия не заполнена")
    );
    //user.value.lastNameInputRed.value = true;
  }

  if (user.value.firstName == null || user.value.firstName == "") {
    validationResults.push(
      new ValidationResult("firstName", "Имя не заполнено")
    );
    //user.value.firstNameInputRed.value = true;
  }

  if (user.value.checked) {
    if (user.value.surName == null || user.value.surName == "") {
      validationResults.push(
        new ValidationResult("surName", "Отчество не заполнено")
      );
      //user.value.surNameInputRed.value = true;

    }
  }

  if (user.value.birthday == null) {
    validationResults.push(
      new ValidationResult("birthday", "Дата рождения не заполнена")
    );
    //user.value.birthdayInputRed.value = true;
  }

  if (
    user.value.lastName != null &&
    user.value.lastName != "" &&
    user.value.lastName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("lastName", "Фамилия содержит нерусские символы")
    );
    //user.value.lastNameInputRed.value = true;
  }

  if (
    user.value.firstName != null &&
    user.value.firstName != "" &&
    user.value.firstName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("firstName", "Имя содержит нерусские символы")
    );
    //user.value.firstNameInputRed.value = true;
  }

  if (user.value.birthday == null || new Date(user.value.birthday).getFullYear() > todayYear) {
    validationResults.push(
      new ValidationResult("birthday", "Год рождения заполнен некорректно")
    );
    //user.value.birthdayInputRed.value = true;
  }

  if (user.value.checked) {
    if (
      user.value.surName != null &&
      user.value.surName != "" &&
      user.value.surName.match(regexp) == null
    ) {
      validationResults.push(
        new ValidationResult("surName", "Отчество содержит нерусские символы")
      );
      //user.value.surNameInputRed.value = true;
    }
  }
  return validationResults;
}