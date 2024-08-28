import { ref } from "vue";
import { ValidationResult } from "../mainUsers/validationResult";
 
  // принимает на вход дату рождения и возвращает количество полных лет
  export function defineAge(birthday: Date): number {

    const date = birthday;
    const today = new Date();
    const differenceInDays: number = (+today - +date) / (1000 * 60 * 60 * 24);
    let age = null;

    if (differenceInDays < 366) {
      age = 0;
    }
    else {
      age = Math.trunc(differenceInDays / 365);
    }
    return age;
  }

  const checked = ref(false);
  const lastNameInputRed = ref(false);
  const firstNameInputRed = ref(false);
  const surNameInputRed = ref(false);
  const birthdayInputRed = ref(false);

  export function validationUserInput(lastName:string|null, firstName:string|null, surName:string|null, birthday:Date|null|string): Array<ValidationResult> {

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
        if (surName == null) {
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
  