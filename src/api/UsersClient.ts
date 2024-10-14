import type { IUser } from "../models/IUser";
import type { IUserAdd } from "../models/IUserAdd";
import type { IUserEdit } from "../models/IUserEdit";
import { extractDate } from "../helpers/DateHelpers";
import type { IUserAuthOK } from "@/models/IUserAuthOK";

export class UsersClient {

  static async authUser(outputUser: IUserAuthOK): Promise<string> {

    let response = await fetch('http://localhost:5000/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
       },
       body: JSON.stringify(outputUser)
    });

    if (!response.ok) {
      throw Error("Неверные логин или пароль");
    }

    const text = await response.text();
    return text;
  }

  static async getUsers(): Promise<Array<IUser>> {

    let response = await fetch('http://localhost:5000/api/UsersV2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
        
      },
    });

    if (!response.ok) {
      throw Error(`Ошибка получения пользователей ${response.statusText}`);
    }

    const text = await response.text();
    const users = JSON.parse(text) as IUser[];
    users.forEach(user => user.birthday = extractDate(user.birthday));

    return users;
  }

  static async getUser(id: number): Promise<IUser> {

    let response = await fetch('http://localhost:5000/api/UsersV2/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      throw Error(`Ошибка получения пользователя ${response.statusText}`);
    }

    const text = await response.text();
    const newUser = JSON.parse(text) as IUser;
    newUser.birthday = extractDate(newUser.birthday); 
    return newUser;

  }

  static async deleteUser(id: number): Promise<void> {

    let response = await fetch('http://localhost:5000/api/UsersV2/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      throw Error("Пользователь не найден")
    }
  }

  static async createUser(outputUser: IUserAdd): Promise<void> {

    let response = await fetch('http://localhost:5000/api/UsersV2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(outputUser)
    });

    if (!response.ok) {
      throw Error('Недостаточно данных для создания пользователя')
    }
  }

  static async updateUser(id: number, outputUser: IUserEdit): Promise<void> {

    let response = await fetch('http://localhost:5000/api/UsersV2/' + id, {
      method: 'PUT',
      body: JSON.stringify(outputUser),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      throw Error('Недостаточно данных для сохранения изменений')
    }
  }
}

