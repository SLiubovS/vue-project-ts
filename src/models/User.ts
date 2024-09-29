import { defineAge } from "../helpers/DateHelpers"
import type { IUserEdit } from "./IUserEdit";

export class User {

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _surName: string | null;
  private _birthday: Date; // yyyy-mm-dd
 
  constructor(id: number, firstName: string, lastName: string, surName: string | null, birthday: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._surName = surName;
    this._birthday = new Date(Date.parse(birthday));
  }

  public get age(): number {
    return defineAge(this._birthday);
  }

  public get id(): number {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get surName(): string | null {
    return this._surName;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  public update(userEdit: IUserEdit) : void {

    if (this._id != userEdit.id)
      throw Error("Id пользователя не совпадает");

    this._firstName = userEdit.firstName;
    this._lastName = userEdit.lastName;
    this._surName = userEdit.surName;
    this._birthday = new Date(userEdit.birthday);   
  }
}

