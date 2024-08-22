import { defineAge } from "../helpers/dateHelpers"

export class User {

  id:number;
  firstName:string;
  lastName:string;
  surName:string | null;
  birthday:Date;
  age:number;

  constructor(id:number, firstName:string, lastName:string, surName:string | null, birthday:Date) {

    if (surName == null)
      surName = "";

    // if (typeof surName != "string")
    //   throw "surName должно быть строкой";

    // if (!(birthday instanceof Date))
    //   throw "birthday должно быть датой";

    // if (typeof id != "number")
    //   throw "age должно быть числом";

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.birthday = birthday;
    this.age = defineAge(birthday);
  }
}