import { defineAge } from "../helpers/DateHelpers"

export class User {

  id: number;
  firstName: string;
  lastName: string;
  surName: string | null;
  birthday: Date; // yyyy-mm-dd
 
  constructor(id: number, firstName: string, lastName: string, surName: string | null, birthday: Date) {

    if (surName == null)
      surName = "";

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.birthday = birthday;
  }

  public get age(): number {
    return defineAge(this.birthday);
  }
}

