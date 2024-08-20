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