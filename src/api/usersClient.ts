import type { Ref } from "vue";
import type { IUser } from "../models/IUser";
import type { IUserData } from "@/models/IUserData";
import type { IUserAdd } from "@/models/IUserAdd";

export class UsersClient {
  static async getUsers(outputUsers: Ref<Array<IUser>>): Promise<void> {

    let response = await fetch("http://localhost:5000/api/UsersV2", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (response.ok) {
      const text = await response.text();
      const newUsers = JSON.parse(text) as IUser[];
      outputUsers.value = newUsers;
    }
  }

  static async getOneUser(id: number, outputUser: Ref<IUserData>): Promise<void> {
    let url = "http://localhost:5000/api/UsersV2";
    let urlGetOneUser = url + "/" + id;

    let response = await fetch(urlGetOneUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (response.ok) {
      const text = await response.text();
      const newUsers = JSON.parse(text) as IUserData;
      outputUser.value = newUsers;
    }
  }

  static async deleteUsers(id: number): Promise<void> {

    let url = "http://localhost:5000/api/UsersV2";
    let urlDelete = url + "/" + id;

    let response = await fetch(urlDelete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (!response.ok) {
      throw Error("Пользователь не найден")
    }
    //   let response = await fetch("http://localhost:5000/api/UsersV2", {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //   });

    //   if (response.ok) {
    //     const text = await response.text();
    //     const newUsers = JSON.parse(text) as IUser[];
    //     outputUsers.value = newUsers;
    //   }
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
      throw Error("Недостаточно данных для создания")
    }
  }
}

