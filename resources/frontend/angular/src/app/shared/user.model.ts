import {ApiModel} from "./global.declarations";

export class User extends ApiModel{
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password?: string;
}
