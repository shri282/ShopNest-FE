import { apiPrivate } from "../config/axios";
import { getAllWishlistSummaryURL, getWishlistURL } from "../constants/apiEndPoints";
import { IWishlistDetail, IWishlistSummary } from "../interfaces/Wishlist";

export class WishlistService {
  static async getAllWishlistSummary(userId: number) {
    const response = await apiPrivate.get<IWishlistSummary[]>(
      getAllWishlistSummaryURL(userId)
    );
    return response.data;
  }

  static async getWishlist(userId: number, wishlistId: number) {
    const response = await apiPrivate.get<IWishlistDetail>(
      getWishlistURL(userId, wishlistId)
    );
    return response.data;
  }
}
