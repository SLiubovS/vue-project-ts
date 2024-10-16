import type { IUserAdd } from "../models/IUserAdd";
import type { IUserEdit } from "../models/IUserEdit";
import type { IUserAuthOK } from "../models/IUserAuthOK";
import axios from "axios";

export class UsersClient {

  static authUser(login: string, password: string): Promise<any> {
    // return fetch('http://localhost:5000/api/Auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //    },
    //    body: JSON.stringify(outputUser)
    // });

    return axios({
      method: 'post',
      url: 'http://localhost:5000/api/Auth/login',
      headers: {
            'Content-Type': 'application/json;charset=utf-8'
      },
      data: {
        login: login,
        password: password
      }
    })
  }

  static getUsers(): Promise<Response> {


    return axios({
      method: 'get',
      url: 'http://localhost:5000/api/UsersV2',
           headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    });
    // return fetch('http://localhost:5000/api/UsersV2', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     'Authorization' : `Bearer ${localStorage.getItem("token")}`
    //   },
    // });
  }

  static getUser(id: number): Promise<Response> {

    return fetch('http://localhost:5000/api/UsersV2/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });
  }

  static deleteUser(id: number): Promise<Response> {

    return fetch('http://localhost:5000/api/UsersV2/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });
  }

  static createUser(outputUser: IUserAdd): Promise<Response> {

    return fetch('http://localhost:5000/api/UsersV2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(outputUser)
    });
  }

  static updateUser(id: number, outputUser: IUserEdit): Promise<Response> {

    return fetch('http://localhost:5000/api/UsersV2/' + id, {
      method: 'PUT',
      body: JSON.stringify(outputUser),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });
  }
}

