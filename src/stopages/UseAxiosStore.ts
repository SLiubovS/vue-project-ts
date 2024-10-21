import type { IUserAdd } from '../models/IUserAdd';
import type { ILoginOK } from '../models/ILoginOK';
import axios, { type AxiosResponse } from 'axios';
import { defineStore } from 'pinia'
import type { IUserEdit } from '../models/IUserEdit';

export const useAxiosStore = defineStore('axios-store', () => {

    const baseAxios = axios.create({
        baseURL: 'http://localhost:5000/api/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    function authUser(outputUser: ILoginOK): Promise<AxiosResponse> {
        return baseAxios.post('Auth/login', outputUser);
    }

    function getUsers(): Promise<AxiosResponse> {
        return baseAxios.get('UsersV2', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    }

    function getUser(id: number): Promise<AxiosResponse> {
        return baseAxios.get('UsersV2/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    }

    function deleteUser(id: number): Promise<AxiosResponse> {
        return baseAxios.delete('UsersV2/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    }

    function createUser(outputUser: IUserAdd): Promise<AxiosResponse> {
        return baseAxios.post('UsersV2', outputUser, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    }

    function updateUser(id: number, outputUser: IUserEdit): Promise<AxiosResponse> {
        return baseAxios.put('UsersV2/' + id, outputUser, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    }

    return { authUser, getUsers, getUser, deleteUser, createUser, updateUser }
})