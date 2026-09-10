export type ProductType = 'retail' | 'rental' | 'both';
export type ProductStatus = 'active' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  type: ProductType;
  salePrice: number;
  rentalPrice: number;
  deposit: number;
  totalStock: number;
  available: number;
  sold: number;
  rented: number;
  reserved: number;
  image: string;
  images: string[];
  status: ProductStatus;
  description: string;
  sizes: string[];
  colors: string[];
  careInstructions: string;
  featured: boolean;
  newArrival: boolean;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'ready_for_pickup' | 'delivered' | 'picked_up' | 'completed' | 'cancelled' | 'rental_active' | 'return_pending' | 'returned';
export type PaymentStatus = 'paid' | 'unpaid' | 'partial' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  type: 'retail' | 'rental';
  rentalStart?: string;
  rentalEnd?: string;
  rentalDays?: number;
  deposit?: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  items: OrderItem[];
  orderType: 'retail' | 'rental' | 'mixed';
  subtotal: number;
  tax: number;
  discount: number;
  rentalCharges: number;
  securityDeposit: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentMethod: string;
  date: string;
  notes?: string;
  timeline: { status: string; date: string; done: boolean }[];
}

export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  amount: number;
  paymentStatus: PaymentStatus;
  orderType: 'retail' | 'rental' | 'mixed';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  rentalCharges: number;
  securityDeposit: number;
}

export type BookingStatus = 'reserved' | 'active' | 'due_today' | 'returned' | 'overdue';

export interface RentalBooking {
  id: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  pickupDate: string;
  returnDate: string;
  rentalAmount: number;
  deposit: number;
  status: BookingStatus;
  condition?: string;
  lateFee?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'retail' | 'rental' | 'both';
  retailOrders: number;
  rentalOrders: number;
  totalSpent: number;
  outstanding: number;
  address?: string;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  retailStock: number;
  rentalStock: number;
  total: number;
  available: number;
  sold: number;
  rented: number;
  reserved: number;
  status: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  mode: 'retail' | 'rental';
  rentalStart?: string;
  rentalEnd?: string;
  rentalDays?: number;
}

export interface ReportData {
  label: string;
  value: number;
}
