import { AddressType } from "../enum/AddressType";
import { Role } from "../enum/Role";

export interface User {
    id: number;
    username: String;
    email: String;
    dob: String;
    gender: String;
    password: String;
    activeRole: string;
    roles: Role[];
    enabled: boolean;
    accountNonLocked: boolean;
    phNo: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAddress {
    id: number,
    userId: number,
    fullName: string,
    phoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    isDefault: boolean,
    addressType: AddressType
}

export interface NavItem {
  id: number;
  name: string;
  path: string;
  icon: string;
}