export type WeekDay = {
  number: number,
  month_number: number,
  year: number,
  name_short: string,
  name_full: string,
  name_css: string,
  today: boolean
}

export type DayName =  {
  short: string,
  full: string,
  class: string
}

export type MonthName =  {
  short: string,
  full: string,
  number: number
}

interface iEndpoints {
  [index: string]: string;
}

export const modelEndpoints = {
  action: 'actions',
  user: 'users',
  userrole: 'user-roles',
  workingtime: 'working-times',
  holidayrequest: 'holiday-requests',
  absence: 'absences',
  trackedworkingtime: 'tracked-working-times',
  trackedbreak: 'tracked-breaks',
  absencetype: 'absence-types',
  worktype: 'work-types',
  workingtimetype: 'working-time-types',
} as iEndpoints;

export class ApiModel {
  public id!: number;
}

export type TimeElement = {
  time: string;
  hours: number;
  minutes: number
}

export type SearchParameters = {
  include?: string[],
  filter: { [key: string]: string | number },
}

export class ModelType<T extends ApiModel> {
  public name: string = ModelType.name;
}
