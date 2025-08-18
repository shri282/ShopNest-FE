import { useEffect, useState } from 'react';
import { ICart } from '../interfaces/Cart';
import CartService from '../services/CartService';

export function useUserCart(userId?: number) {
    const [cart, setCart] = useState<ICart | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const cart = await CartService.getUserCart(userId);
                setCart(cart);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { cart, setCart, loading, error };
}
