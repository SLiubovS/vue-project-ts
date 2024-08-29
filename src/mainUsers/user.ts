import type { Ref } from "vue"
import { defineAge } from "../helpers/dateHelpers"

export class User {

  id: number;
  firstName: string;
  lastName: string;
  surName: string | null;
  birthday: Date; // yyyy-mm-dd
  age: number;

  constructor(id: number, firstName: string, lastName: string, surName: string | null, birthday: Date) {

    if (surName == null)
      surName = "";

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.birthday = birthday;
    this.age = defineAge(birthday);
  }
}

export interface IUserValidation {

  lastName: string | null;
  firstName: string | null;
  surName: string | null;
  birthday: Date | null | string;
  checked: Ref<boolean>;
}