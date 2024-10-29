import type { IUserAdd } from '../models/IUserAdd';
import type { ILoginOK } from '../models/ILoginOK';
import axios, { type AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import type { IUserEdit } from '../models/IUserEdit';
import router from '../router/Index';
import swal from 'sweetalert';

export const useAxiosStore = defineStore('axios-store', () => {

    const baseURL = import.meta.env.VITE_BASE_URL;

    const baseAxios = axios.create({
        baseURL: `${baseURL}`,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    baseAxios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
        ((error) => {
            return Promise.reject(error);
        })
    );

    baseAxios.interceptors.response.use(function (response) {
        return response;
    },
        function (error) {
            if (error.response) {
                if (error.response.status == 401 || error.response.status == 403) {
                    localStorage.removeItem('token');
                    router.push('/');
                }
                else {
                    swal('Произошла ошибка на стороне сервера');
                }
            }
            return Promise.reject(error);
        });

    const authAxios = axios.create({
        baseURL: `${baseURL}`,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    function authUser(outputUser: ILoginOK): Promise<AxiosResponse> {
        return authAxios.post('Auth/login', outputUser);
    }

    function getUsers(): Promise<AxiosResponse> {
        return baseAxios.get('UsersV2');
    }

    function getUser(id: number): Promise<AxiosResponse> {
        return baseAxios.get('UsersV2/' + id);
    }

    function deleteUser(id: number): Promise<AxiosResponse> {
        return baseAxios.delete('UsersV2/' + id);
    }

    function createUser(outputUser: IUserAdd): Promise<AxiosResponse> {
        return baseAxios.post('UsersV2', outputUser);
    }

    function updateUser(id: number, outputUser: IUserEdit): Promise<AxiosResponse> {
        return baseAxios.put('UsersV2/' + id, outputUser);
    }

    return { authUser, getUsers, getUser, deleteUser, createUser, updateUser }
})