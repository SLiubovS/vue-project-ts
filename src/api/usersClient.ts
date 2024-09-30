// import type { IUser } from "../models/IUser";
// import { User } from "../models/User";

// export class UsersClient {
//     // метод получения всех пользователей с сервера
//     static async getUsers(): Promise<Array<User>> {

//         const response = await fetch("http://localhost:5000/api/UsersV2", {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//         });

//         if (response.ok) {

//             const json = await response.text();
//             const users = JSON.parse(json) as IUser[];
//             return users.map(user => new User(user.id, user.firstName, user.lastName, user.surName, user.birthday));
//         } else {
//             return [];
//         }
//     }

//     static getUsers(): Promise<Array<User>> {

//         fetch("http://localhost:5000/api/UsersV2", {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//         }).then(response => response.text()).then(users => JSON.parse(users));

//         if (Response.ok) {

//             const json = await response.text();
//             const users = JSON.parse(json) as IUser[];
//             return users.map(user => new User(user.id, user.firstName, user.lastName, user.surName, user.birthday));
//         } else {
//             return [];
//         }
//     }


// }