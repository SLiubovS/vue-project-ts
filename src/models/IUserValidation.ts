export interface IUserValidation {

  lastName: string | null;
  firstName: string | null;
  surName: string | null;
  birthday: Date | null | string;
  checked: boolean;
}
