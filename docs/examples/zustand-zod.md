# Zustand Store Example with Zod and Auto-Generated Selectors

This example demonstrates a Zustand store with:

- Two slices (User and Cart) in separate files
- Zod schema validation with type inference
- Auto-generated selectors using the recommended approach
- Cart stores only IDs and quantities, with product lookup
- User stores a single user object

## User Slice

Defines the user slice with a single user object and setUser action. Uses Zod for validation and type inference

```ts
// store/slices/user-slice.ts
import { z } from 'zod';
import { StateCreator } from 'zustand';

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

export type UserSliceStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const createUserSlice: StateCreator<UserSliceStore> = (set) => ({
  user: null,
  setUser: (user: User) => {
    set({ user: user });
  },
});
```

## Cart Slice

Defines the cart slice storing only item IDs and quantities. Product details are looked up separately, ensuring the cart always reflects current product data

```ts
// store/slices/cart-slice.ts
import { z } from 'zod';
import { StateCreator } from 'zustand';

const CartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
});

const CartSchema = z.object({
  items: z.array(CartItemSchema),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type CartSlice = z.infer<typeof CartSchema>;

export type CartSliceStore = {
  cartItems: CartItem[];
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
};

export const createCartSlice: StateCreator<CartSliceStore> = (set) => ({
  cartItems: [],
  addItem: (itemId: string) => {
    set((state) => {
      const existingItem = state.cartItems.find((i) => i.id === itemId);

      if (existingItem) {
        // Increment quantity if item already exists
        const newItems = state.cartItems.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
        return { cartItems: newItems };
      } else {
        // Add new item with quantity 1
        const newItem = CartItemSchema.parse({ id: itemId, quantity: 1 });
        return { cartItems: [...state.cartItems, newItem] };
      }
    });
  },
  removeItem: (itemId: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== itemId),
    }));
  },
  updateQuantity: (itemId: string, quantity: number) => {
    const result = z.number().int().positive().safeParse(quantity);
    if (!result.success) {
      console.error('Invalid quantity:', result.error.errors);
      return;
    }

    set((state) => {
      if (result.data === 0) {
        // Remove item if quantity is 0
        return { cartItems: state.cartItems.filter((i) => i.id !== itemId) };
      }

      const newItems = state.cartItems.map((i) => (i.id === itemId ? { ...i, quantity: result.data } : i));
      return { cartItems: newItems };
    });
  },
});
```

## Store Setup

Combines both slices using the spread operator and applies the createSelectors helper to enable auto-generated selectors

```ts
// store/index.ts
import { create } from 'zustand';

import { createSelectors } from '@/lib/create-selectors';

import { createCartSlice, type CartSliceStore } from './slices/cart-slice';
import { createUserSlice, type UserSliceStore } from './slices/user-slice';

type Store = UserSliceStore & CartSliceStore;

const useStoreBase = create<Store>((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args),
}));

export const useStore = createSelectors(useStoreBase);
```

## Products Data Source

Example of where product data might come from - could be a separate store, API, or static data

```ts
// types/product.ts
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// This could be from an API, another store, or static data
// If from API, validate with: ProductSchema.parse(data)
export const PRODUCTS: Product[] = [
  { id: '1', name: 'Product A', price: 29.99, description: 'Description A' },
  { id: '2', name: 'Product B', price: 49.99, description: 'Description B' },
  { id: '3', name: 'Product C', price: 19.99, description: 'Description C' },
];
```

## User Profile Component

Example component showing how to use auto-generated selectors to access and update user slice

```tsx
// components/UserProfile.tsx
import { useStore } from '@/store';

export function UserProfile() {
  const user = useStore.use.user();
  const setUser = useStore.use.setUser();

  return (
    <div>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setUser({ name: '', email: '' })}>Clear</button>
        </div>
      ) : (
        <div>
          <input
            placeholder='Name'
            onBlur={(e) => {
              if (e.target.value) {
                setUser({ name: e.target.value, email: user?.email ?? '' });
              }
            }}
          />
          <input
            type='email'
            placeholder='Email'
            onBlur={(e) => {
              if (e.target.value) {
                setUser({ name: user?.name ?? '', email: e.target.value });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
```

## Cart Component

Example component showing how to look up product details when displaying cart items, and calculate total from current product prices

```tsx
// components/Cart.tsx
import { useStore } from '@/store';
import { PRODUCTS, type Product } from '@/types/product';

function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

function calculateTotal(cartItems: Array<{ id: string; quantity: number }>): number {
  return cartItems.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export function Cart() {
  const cartItems = useStore.use.cartItems();
  const addItem = useStore.use.addItem();
  const removeItem = useStore.use.removeItem();
  const updateQuantity = useStore.use.updateQuantity();

  const total = calculateTotal(cartItems);

  return (
    <div>
      <h2>Cart {cartItems.length} items</h2>
      <p>Total: {`$${total.toFixed(2)}`}</p>

      <ul>
        {cartItems.map((item) => {
          const product = getProductById(item.id);
          if (!product) return null;

          return (
            <li key={item.id}>
              {`${product.name} - $${product.price} x ${item.quantity}`}
              <input type='number' min='1' value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          );
        })}
      </ul>

      <button onClick={() => addItem('1')}>Add Product A</button>
      <button onClick={() => addItem('2')}>Add Product B</button>
    </div>
  );
}
```

## Combined Usage Example

Shows how to use multiple slices together in a single component, accessing both user and cart data

```tsx
// components/Checkout.tsx
import { useStore } from '@/store';
import { PRODUCTS } from '@/types/product';

function calculateTotal(cartItems: Array<{ id: string; quantity: number }>): number {
  return cartItems.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export function Checkout() {
  const user = useStore.use.user();
  const cartItems = useStore.use.cartItems();
  const setUser = useStore.use.setUser();

  const total = calculateTotal(cartItems);

  return (
    <div>
      <h2>Checkout</h2>

      <div>
        <h3>User Info</h3>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <input
              placeholder='Name'
              onBlur={(e) => {
                if (e.target.value) {
                  setUser({ name: e.target.value, email: user?.email ?? '' });
                }
              }}
            />
            <input
              type='email'
              placeholder='Email'
              onBlur={(e) => {
                if (e.target.value) {
                  setUser({ name: user?.name ?? '', email: e.target.value });
                }
              }}
            />
          </div>
        )}
      </div>

      <div>
        <h3>Order Summary</h3>
        <p>Items: {cartItems.length}</p>
        <p>Total: {`$${total.toFixed(2)}`}</p>
      </div>
    </div>
  );
}
```

## Benefits

- **Type Safety**: Types inferred from Zod schemas
- **Auto-Generated Selectors**: No manual selector hooks needed
- **Validation**: Runtime validation through Zod with safeParse
- **Modular**: Slices in separate files for better organization
- **Clean API**: Access via `useStore.use.propertyName()`
- **Single Source of Truth**: Product data lives separately, cart only stores IDs
- **Always Current**: Cart displays current prices even if they change
