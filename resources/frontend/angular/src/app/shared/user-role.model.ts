import {ApiModel} from "./global.declarations";
import {Action} from "./action.model";
import {User} from "./user.model";

export class UserRole extends ApiModel {
  public name!: string;
  public actions?: Action[];
  public users?: User[];
}
