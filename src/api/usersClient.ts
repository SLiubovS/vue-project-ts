import type { Ref } from "vue";
import type { IUser } from "../models/IUser";
import type { IUserData } from "@/models/IUserData";
import type { IUserAdd } from "@/models/IUserAdd";
import type { IUserEdit } from "@/models/IUserEdit";
import moment from "moment";

export class UsersClient {

  static async getUsers(): Promise<Array<IUser>> {

    let response = await fetch("http://localhost:5000/api/UsersV2", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (!response.ok) {
      throw Error(`Ошибка получения пользователей ${response.statusText}`);
    }

    const text = await response.text();
    const users = JSON.parse(text) as IUser[];
    return users;
  }

  static async getUser(id: number): Promise<IUserData> {

    let response = await fetch("http://localhost:5000/api/UsersV2/" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (!response.ok) {
      throw Error(`Ошибка получения пользователя ${response.statusText}`);
    }

    const text = await response.text();
    const newUser = JSON.parse(text) as IUserData;
    newUser.birthday = moment(newUser.birthday).toISOString(true).split("T")[0]; 
    return newUser;
    
  }

  static async deleteUser(id: number): Promise<void> {

    let response = await fetch("http://localhost:5000/api/UsersV2/" + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (!response.ok) {
      throw Error("Пользователь не найден")
    }
  }

  static async createUser(outputUser: IUserAdd): Promise<void> {

    let response = await fetch("http://localhost:5000/api/UsersV2", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(outputUser)
    });

    if (!response.ok) {
      throw Error("Недостаточно данных для создания пользователя")
    }
  }

  static async updateUser(id: number, outputUser: IUserEdit): Promise<void> {

    let response = await fetch("http://localhost:5000/api/UsersV2/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: outputUser.firstName,
        lastName: outputUser.lastName,
        surName: outputUser.surName,
        birthday: outputUser.birthday 
    }),

      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (!response.ok) {
      throw Error("Недостаточно данных для сохранения изменений")
    }
  }
}

