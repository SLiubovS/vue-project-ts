import type { Ref } from "vue";
import type { IUser } from "../models/IUser";

export class UsersClient {
  static async getUsers(outputUsers: Ref<Array<IUser>>) {

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

  static async deleteUsers(id: number) {

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
}

