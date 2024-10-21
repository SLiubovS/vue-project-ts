import type { IUserAdd } from "../models/IUserAdd";
import type { IUserEdit } from "../models/IUserEdit";
import type { IUserAuthOK } from "../models/IUserAuthOK";
import axios from "axios";
import type { AxiosResponse } from "axios";

export class UsersClient {

  static authUser(outputUser: IUserAuthOK): Promise<AxiosResponse> {

    return axios({
      method: 'post',
      url: 'http://localhost:5000/api/Auth/login',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: outputUser
    })
  }

  static getUsers(): Promise<AxiosResponse> {

    return axios({
      method: 'get',
      url: 'http://localhost:5000/api/UsersV2',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
  }

  static getUser(id: number): Promise<AxiosResponse> {

    return axios({
      method: 'get',
      url: 'http://localhost:5000/api/UsersV2/' + id,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  static deleteUser(id: number): Promise<AxiosResponse> {

    return axios({
      method: 'delete',
      url: 'http://localhost:5000/api/UsersV2/' + id,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  static createUser(outputUser: IUserAdd): Promise<AxiosResponse> {

    return axios({
      method: 'post',
      url: 'http://localhost:5000/api/UsersV2',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      data: outputUser
    })
  }

  static updateUser(id: number, outputUser: IUserEdit): Promise<AxiosResponse> {

    return axios({
      method: 'put',
      url: 'http://localhost:5000/api/UsersV2/' + id,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      data: outputUser
    })
  }
}

