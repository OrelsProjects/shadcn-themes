export default interface AppUser {
  email: string;
  userId: string;
  photoURL?: string | null;
  settings: AppUserSettings;
  displayName?: string | null;
}

export interface AppUserSettings {}

export enum UserPaidStatusEnum {
  Premium = "premium",
  Free = "free",
  Suspended = "suspended",
}
