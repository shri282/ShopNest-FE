import { apiPrivate } from "../config/axios";
import {
  addUserAddressesURL,
  getUserAddressesURL,
  updateUserAddressURL,
} from "../constants/apiEndPoints";
import { UserAddress } from "../interfaces/User";

export class UserService {
  static async getUserAddresses(userId: number) {
    const response = await apiPrivate.get<UserAddress[]>(
      getUserAddressesURL(userId)
    );
    return response.data;
  }

  static async updateAddress(address: UserAddress, userId: number) {
    const response = await apiPrivate.put<UserAddress>(
      updateUserAddressURL(userId),
      address
    );
    return response.data;
  }

  static async addAddress(address: UserAddress, userId: number) {
    const response = await apiPrivate.post<UserAddress>(
      addUserAddressesURL(userId),
      address
    );
    return response.data;
  }

  // static async deleteAddress() {
  //     const response = await apiPrivate.put<UserAddress>(`${userId}/update-address`, address);
  //     return response.data;
  // }
}
