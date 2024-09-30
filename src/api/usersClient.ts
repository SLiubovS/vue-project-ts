import type { Ref } from "vue";
import type { IUser } from "../models/IUser";
import { User } from "../models/User";

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
}

