import { useEffect, useState } from 'react'
import { request } from '../../../request/request';
import { userCartURL } from '../../../constants/apiEndPoints';

export function useCartItemCount(userId?: number) {
    const [totalItems, setTotalItems] = useState<number | null>(null);

    useEffect(() => {
        if (!userId) return;

        (async () => {
            const cartTotal = await request.get<{ totalItems: number }>(userCartURL(userId) + "/count");
            setTotalItems(cartTotal.totalItems);
        })();
    }, [userId])

    return totalItems;
}