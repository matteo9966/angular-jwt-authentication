import { UserRoles } from "../../constants/userRoles";


// export interface IUser {
//   username:string;
//   email:string;
//   id?:string;
// }

export interface IUserSignup { 
    username:string;
    password:string;
    email:string;
    roles:Array<keyof typeof UserRoles>
    //altre cose le aggiungo col tempo
}

// export type IUser = Omit<IUserSignup,"password">

export interface IUser extends Omit<IUserSignup,"password">{
  id?:string;
}