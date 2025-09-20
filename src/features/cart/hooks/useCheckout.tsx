import { useNotification } from "../../../context/notification";
import { loadStripe } from '@stripe/stripe-js';
import CartService from "../../../services/CartService";


export function useCheckout(cartId?: number) {
    const { showMessage } = useNotification();

    const handleCheckout = async () => {
        if (!cartId) return;
        try {
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY!);
            const session = await CartService.checkoutCart(cartId);
            await stripe?.redirectToCheckout({ sessionId: session.sessionId });
        } catch (e: any) {
            showMessage(e.message, "Error");
        }
    };

    return { handleCheckout };
}
