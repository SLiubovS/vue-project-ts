import { defineAge } from "../helpers/DateHelpers"

export class User {

  private _id: number;
  firstName: string;
  lastName: string;
  surName: string;
  birthday: Date; // yyyy-mm-dd
 
  constructor(id: number, firstName: string, lastName: string, surName: string, birthday: Date) {

    // if (surName == null)
    //   surName = "";

    this._id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.birthday = birthday;
  }

  public get age(): number {
    return defineAge(this.birthday);
  }

  public get id(): number {
    return this._id;
  }
}

