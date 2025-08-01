import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../lib/constants/baseUrl';

// Update your CartItem interface in the types file
export interface CartItem {
  id: number;
  product_id: number;
  variation_id?: number;
  quantity: number;
  m2_quantity?: number;
  is_sample?: boolean;
  price: number;
  display_quantity: number;
  name: string;
  image: {
    src: string;
  };
  meta_data: Array<{
    key: string;
    value: any;
    display_key?: string;
    display_value?: string;
  }>;
  total?: string; // Add this
  parent_name?: string; // Add this
}


export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading: isCartLoading } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/cart`);
      return response.data?.data?.line_items || [];
    },
  });

  // Helper function to find existing item in cart
  const findExistingItem = (product_id: number, variation_id?: number, is_sample?: boolean) => {
    return cartItems.find(item =>
      item.product_id === product_id &&
      item.variation_id === variation_id &&
      item.is_sample === is_sample
    );
  };

  const updateCartItem = useMutation({
    mutationFn: async (payload: {
      itemId: number;
      quantity: number;
      m2_quantity?: number;
    }) => {
      // Note: Backend PUT endpoint has issues - it treats itemId as orderId
      // and adds quantities instead of setting them. This is kept for potential future fixes.
      const response = await axios.put(
        `${baseUrl}/cart/${payload.itemId}`,
        {
          quantity: payload.quantity,
          m2_quantity: payload.m2_quantity
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      console.error('Error updating cart item:', error.response?.data || error.message);
    }
  });

  const addToCart = useMutation({
    mutationFn: async (item: {
      product_id: number;
      variation_id?: number;
      quantity?: number | string;
      m2_quantity?: number | string;
      is_sample?: boolean;
    }) => {
      // Convert all numeric values to proper numbers
      const payload = {
        product_id: Number(item.product_id),
        variation_id: item.variation_id ? Number(item.variation_id) : undefined,
        quantity: item.quantity !== undefined ? Number(item.quantity) : 1,
        m2_quantity: item.m2_quantity !== undefined ? Number(item.m2_quantity) : undefined,
        is_sample: Boolean(item.is_sample),
        check_duplicates: true // Always check for duplicates
      };

      // For free samples, we need to ensure we're not creating duplicates
      if (payload.is_sample) {
        const existingSample = findExistingItem(
          payload.product_id,
          payload.variation_id,
          true // is_sample
        );

        if (existingSample) {
          // Update existing sample instead of creating new one
          return await updateCartItem.mutateAsync({
            itemId: existingSample.id,
            quantity: payload.quantity,
            m2_quantity: payload.m2_quantity
          });
        }
      }

      // Always POST - backend will handle duplicates
      const response = await axios.post(
        `${baseUrl}/cart/add`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      console.error('Error adding to cart:', error.response?.data || error.message);
    }
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: number) => {
      const response = await axios.delete(`${baseUrl}/cart/${itemId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Error removing item:', error);
    }
  });

  // Calculate total display quantity (M² for regular items, pieces for samples)
  const getDisplayQuantity = (item: CartItem) => {
    return item.display_quantity;
  };

  // Calculate total price for an item
  const getItemTotal = (item: CartItem) => {
    if (item.is_sample) {
      return item.price * item.quantity;
    }
    return item.price * (item.m2_quantity || item.quantity);
  };

  // Calculate cart subtotal
  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  };

  return {
    cartItems,
    isLoading: isCartLoading,
    addToCart,
    updateCartItem,
    getDisplayQuantity,
    getItemTotal,
    getSubtotal,
    removeFromCart,
    findExistingItem
  };
};
