
import { useDispatch, useSelector } from 'react-redux';
import { closeCart, openCart, selectCartItemCount, selectIsCartOpen, setCartItemCount, toggleCart } from '../redux/slices/CartSlice';


export const useCartState = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCartOpen);
  const itemCount = useSelector(selectCartItemCount);

  return {
    isCartOpen: isOpen,
    cartItemCount: itemCount,
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
    toggleCart: () => dispatch(toggleCart()),
    setCartItemCount: (count: number) => dispatch(setCartItemCount(count)),
  };
};