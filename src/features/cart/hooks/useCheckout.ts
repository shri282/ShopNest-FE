import { useNotification } from "../../../context/notification";
import { loadStripe } from '@stripe/stripe-js';
import CartService from "../../../services/CartService";


export function useCheckout(cartId?: number) {
    const { showMessage } = useNotification();

    const handleCheckout = async () => {
        if (!cartId) return;
        try {
            const stripe = await loadStripe("pk_test_51RcRvOI2BykSxmKfjrk3CkwHOXKKXJOlWNXIEXUAoYzbkP5LUqXLHdJo4simz0NIqZOH5TIaqXdYVKWY70nXBlju00WvBXUphq");
            const session = await CartService.checkoutCart(cartId);
            await stripe?.redirectToCheckout({ sessionId: session.sessionId });
        } catch (e: any) {
            showMessage(e.message, "Error");
        }
    };

    return { handleCheckout };
}
