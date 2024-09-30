export class User {

  id: number;
  firstName: string;
  lastName: string;
  surName: string | null;
  birthday: Date; // yyyy-mm-dd
 
  constructor(id: number, firstName: string, lastName: string, surName: string | null, birthday: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.birthday = new Date(Date.parse(birthday));
  }
}

