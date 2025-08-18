import { useEffect, useState } from 'react'
import CartService from '../../../services/CartService';

export function useCartItemCount(userId?: number) {
    const [totalItems, setTotalItems] = useState<number | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const cartTotal = await CartService.getUserCartItemsTotal(userId);
                setTotalItems(cartTotal.totalItems);
            } catch (err) {
                console.log("error in getting cart items count", err);
            }
        };

        fetchData();
    }, [userId])

    return totalItems;
}