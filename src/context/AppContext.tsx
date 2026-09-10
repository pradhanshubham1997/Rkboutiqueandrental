import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem, Order, Invoice, OrderStatus } from '../types';
import { products as initialProducts, initialOrders, initialInvoices } from '../data/mockData';

interface AppState {
  cart: CartItem[];
  orders: Order[];
  invoices: Invoice[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: string, mode: string) => void;
  updateCartQuantity: (productId: string, mode: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => { retailTotal: number; rentalTotal: number; depositTotal: number; total: number };
  placeOrder: (customer: { name: string; phone: string; email: string; address: string; notes: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getProduct: (id: string) => typeof initialProducts[0] | undefined;
  orderCounter: number;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [orderCounter, setOrderCounter] = useState(1043);

  const getProduct = useCallback((id: string) => initialProducts.find(p => p.id === id), []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCart(prev => {
      const key = `${item.product.id}-${item.mode}`;
      const existing = prev.find(c => `${c.product.id}-${c.mode}` === key);
      if (existing) {
        return prev.map(c => `${c.product.id}-${c.mode}` === key ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c);
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, mode: string) => {
    setCart(prev => prev.filter(c => !(c.product.id === productId && c.mode === mode)));
  }, []);

  const updateCartQuantity = useCallback((productId: string, mode: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(c => !(c.product.id === productId && c.mode === mode)));
    } else {
      setCart(prev => prev.map(c => c.product.id === productId && c.mode === mode ? { ...c, quantity } : c));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useCallback(() => {
    const retailItems = cart.filter(c => c.mode === 'retail');
    const rentalItems = cart.filter(c => c.mode === 'rental');
    const retailTotal = retailItems.reduce((a, c) => a + c.product.salePrice * c.quantity, 0);
    const rentalTotal = rentalItems.reduce((a, c) => a + c.product.rentalPrice * c.quantity * (c.rentalDays || 1), 0);
    const depositTotal = rentalItems.reduce((a, c) => a + c.product.deposit * c.quantity, 0);
    return { retailTotal, rentalTotal, depositTotal, total: retailTotal + rentalTotal + depositTotal };
  }, [cart]);

  const placeOrder = useCallback((customer: { name: string; phone: string; email: string; address: string; notes: string }) => {
    const { retailTotal, rentalTotal, depositTotal } = cartTotal();
    const hasRetail = cart.some(c => c.mode === 'retail');
    const hasRental = cart.some(c => c.mode === 'rental');
    const orderType = hasRetail && hasRental ? 'mixed' : hasRetail ? 'retail' : 'rental';

    const orderItems = cart.map(c => ({
      productId: c.product.id,
      productName: c.product.name,
      quantity: c.quantity,
      price: c.mode === 'retail' ? c.product.salePrice : c.product.rentalPrice,
      discount: 0,
      type: c.mode as 'retail' | 'rental',
      rentalStart: c.rentalStart,
      rentalEnd: c.rentalEnd,
      rentalDays: c.rentalDays,
      deposit: c.mode === 'rental' ? c.product.deposit : undefined,
    }));

    const id = `RK-2026-${orderCounter}`;
    const newOrder: Order = {
      id,
      customerId: Date.now().toString(),
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      customerAddress: customer.address,
      items: orderItems,
      orderType,
      subtotal: retailTotal + rentalTotal,
      tax: Math.round((retailTotal + rentalTotal) * 0.18),
      discount: 0,
      rentalCharges: rentalTotal,
      securityDeposit: depositTotal,
      total: retailTotal + rentalTotal + Math.round((retailTotal + rentalTotal) * 0.18) + depositTotal,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      paymentMethod: 'Cash',
      date: new Date().toISOString().split('T')[0],
      notes: customer.notes,
      timeline: [
        { status: 'Order Placed', date: new Date().toLocaleString(), done: true },
        { status: 'Payment Received', date: new Date().toLocaleString(), done: true },
        { status: 'Confirmed', date: '', done: false },
        { status: 'Preparing', date: '', done: false },
        { status: orderType === 'rental' || orderType === 'mixed' ? 'Ready for Pickup' : 'Ready for Delivery', date: '', done: false },
        { status: orderType === 'rental' ? 'Rental Active' : 'Delivered', date: '', done: false },
        { status: 'Completed', date: '', done: false },
      ],
    };

    const newInvoice: Invoice = {
      id: `INV-${2042 + invoices.length + 1}`,
      orderId: id,
      customerName: customer.name,
      date: newOrder.date,
      amount: newOrder.total,
      paymentStatus: 'paid',
      orderType,
      items: orderItems,
      subtotal: newOrder.subtotal,
      discount: newOrder.discount,
      tax: newOrder.tax,
      rentalCharges: newOrder.rentalCharges,
      securityDeposit: newOrder.securityDeposit,
    };

    setOrders(prev => [newOrder, ...prev]);
    setInvoices(prev => [newInvoice, ...prev]);
    setOrderCounter(prev => prev + 1);
    setCart([]);

    return newOrder;
  }, [cart, cartTotal, orderCounter, invoices.length]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const doneStatuses: Record<string, string[]> = {
        pending: ['Order Placed', 'Payment Received'],
        confirmed: ['Order Placed', 'Payment Received', 'Confirmed'],
        preparing: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing'],
        ready: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Ready'],
        out_for_delivery: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Out for Delivery'],
        ready_for_pickup: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Ready for Pickup'],
        delivered: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Delivered'],
        picked_up: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Picked Up'],
        completed: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Completed'],
        rental_active: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Rental Active'],
        return_pending: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Return Pending'],
        returned: ['Order Placed', 'Payment Received', 'Confirmed', 'Preparing', 'Returned', 'Completed'],
        cancelled: ['Order Placed', 'Cancelled'],
      };
      const doneList = doneStatuses[status] || [];
      return {
        ...o,
        orderStatus: status,
        timeline: o.timeline.map(t => ({
          ...t,
          done: doneList.includes(t.status),
          date: doneList.includes(t.status) && !t.date ? new Date().toLocaleString() : t.date,
        })),
      };
    }));
  }, []);

  return (
    <AppContext.Provider value={{
      cart, orders, invoices, addToCart, removeFromCart, updateCartQuantity,
      clearCart, cartTotal, placeOrder, updateOrderStatus, getProduct, orderCounter,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
