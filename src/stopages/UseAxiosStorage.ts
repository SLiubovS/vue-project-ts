import type { IUserAdd } from '../models/IUserAdd';
import type { ILoginOK } from '../models/ILoginOK';
import axios, { type AxiosResponse } from 'axios';
import { defineStore } from 'pinia'
import type { IUserEdit } from '../models/IUserEdit';

export const useAxiosStore = defineStore('axios-store', () => {
    
    function authUser(outputUser: ILoginOK): Promise<AxiosResponse> {

        return axios({
          method: 'post',
          url: 'http://localhost:5000/api/Auth/login',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          data: outputUser
        })
      }
    
      function getUsers(): Promise<AxiosResponse> {
    
        return axios({
          method: 'get',
          url: 'http://localhost:5000/api/UsersV2',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
      }
    
      function getUser(id: number): Promise<AxiosResponse> {
    
        return axios({
          method: 'get',
          url: 'http://localhost:5000/api/UsersV2/' + id,
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
      }
    
      function deleteUser(id: number): Promise<AxiosResponse> {
    
        return axios({
          method: 'delete',
          url: 'http://localhost:5000/api/UsersV2/' + id,
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
      }
    
      function createUser(outputUser: IUserAdd): Promise<AxiosResponse> {
    
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
    
      function updateUser(id: number, outputUser: IUserEdit): Promise<AxiosResponse> {
    
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

      return { authUser, getUsers, getUser, deleteUser, createUser, updateUser }
  })