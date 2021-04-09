import {ApiModel} from "./global.declarations";
import {UserRole} from "./user-role.model";

export class User extends ApiModel{
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password?: string;
  public 'user-roles'?: UserRole[];
}
