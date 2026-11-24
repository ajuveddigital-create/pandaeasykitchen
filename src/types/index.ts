export type Category = 'all' | 'kitchen-gadgets' | 'cleaning-gadgets' | 'home-organization';

export interface ProductVariant {
  id: string;
  name: string;
  colorName?: string;
  colorHex?: string;
  sku: string;
  inStock: boolean;
  image?: string;
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'kitchen-gadgets' | 'cleaning-gadgets' | 'home-organization';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  codAvailable: boolean;
  thumbnail: string;
  images: string[];
  shortDescription: string;
  keyBenefits: string[];
  variants: ProductVariant[];
  specifications: SpecificationItem[];
  boxContents: string[];
  usageInstructions: string[];
  safetyCare: string[];
  reviews: ProductReview[];
  faq: { question: string; answer: string }[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  mobile: string;
  email: string;
  flatHouseNo: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  customer: {
    fullName: string;
    mobile: string;
    email: string;
  };
  shippingAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod' | 'online_upi';
  estimatedDeliveryDate: string;
  trackingNumber: string;
}

export interface Coupon {
  code: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

