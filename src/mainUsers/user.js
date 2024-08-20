import { defineAge } from "../helpers/dateHelpers"

export class User {

  constructor(id, firstName, lastName, surName, birthday) {

    if (typeof id != "number")
      throw "id должно быть числом";

    if (typeof firstName != "string")
      throw "firstName должно быть строкой";

    if (typeof lastName != "string")
      throw "lastName должно быть строкой";

    if (surName == null)
      surName = "";

    if (typeof surName != "string")
      throw "surName должно быть строкой";

    if (!(birthday instanceof Date))
      throw "birthday должно быть датой";

    if (typeof id != "number")
      throw "age должно быть числом";

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.birthday = birthday;
    this.age = defineAge(birthday);
  }
}