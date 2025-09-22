import { useEffect, useState } from 'react';
import { ICart } from '../../../interfaces/Cart';
import { request } from '../../../request/request';
import { userCartURL } from '../../../constants/apiEndPoints';
import { useAsyncHandler } from '../../../hooks/useAsyncHandler';

export function useUserCart(userId: number) {
    const [cart, setCart] = useState<ICart | null>(null);
    const { run, error, loading } = useAsyncHandler();

    useEffect(() => {
        (async () => {
            const cart = await run(() => {
                return request.get<ICart>(userCartURL(userId));
            })

            setCart(cart);
        })();
    }, [userId, run]);

    return { cart, setCart, loading, error };
}
