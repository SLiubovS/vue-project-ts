import { ref } from "vue";
import type { Ref } from "vue"
import { ValidationResult } from "../mainUsers/validationResult";

const lastNameInputRed = ref(false);
const firstNameInputRed = ref(false);
const surNameInputRed = ref(false);
const birthdayInputRed = ref(false);

export function validationUserInput(lastName: string | null, firstName: string | null, surName: string | null, birthday: Date | null | string, checked: Ref<boolean>): Array<ValidationResult> {

  // принимать на вход объект, 
  // принимать на вход также инпутрЭды
  

  const validationResults = [];
  const regexp = /^[А-яЁё]+$/g;
  const dateBirthday = birthday;

  const yearBirthday = new Date(dateBirthday as Date).getFullYear();
  const todayYear = new Date().getFullYear();

  if (lastName == null || lastName == "") {
    validationResults.push(
      new ValidationResult("lastName", "Фамилия не заполнена")
    );
    lastNameInputRed.value = true;
  }

  if (firstName == null || firstName == "") {
    validationResults.push(
      new ValidationResult("firstName", "Имя не заполнено")
    );
    firstNameInputRed.value = true;
  }

  if (checked.value) {
    if (surName == null || surName == "") {
      validationResults.push(
        new ValidationResult("surName", "Отчество не заполнено")
      );
      surNameInputRed.value = true;
    }
  }

  if (birthday == null) {
    validationResults.push(
      new ValidationResult("birthday", "Дата рождения не заполнена")
    );
    birthdayInputRed.value = true;
  }

  if (
    lastName != null &&
    lastName != "" &&
    lastName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("lastName", "Фамилия содержит нерусские символы")
    );
    lastNameInputRed.value = true;
  }

  if (
    firstName != null &&
    firstName != "" &&
    firstName.match(regexp) == null
  ) {
    validationResults.push(
      new ValidationResult("firstName", "Имя содержит нерусские символы")
    );
    firstNameInputRed.value = true;
  }

  if (yearBirthday > todayYear || yearBirthday < 1900) {
    validationResults.push(
      new ValidationResult("birthday", "Год рождения заполнен некорректно")
    );
    birthdayInputRed.value = true;
  }

  if (checked.value) {
    if (
      surName != null &&
      surName != "" &&
      surName.match(regexp) == null
    ) {
      validationResults.push(
        new ValidationResult("surName", "Отчество содержит нерусские символы")
      );
      surNameInputRed.value = true;
    }
  }
  return validationResults;
}
