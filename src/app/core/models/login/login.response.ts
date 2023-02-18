import { IUser } from "../user/user";
import {UserRoles} from '../../constants/userRoles';
export interface LoginResponse extends IUser{
    roles:(keyof typeof UserRoles)[]
}