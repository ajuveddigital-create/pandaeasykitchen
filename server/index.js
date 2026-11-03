import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const ordersFile = path.join(dataDir, 'orders.json');
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([]), 'utf8');
}

// Helper to read orders
function getOrders() {
  try {
    const raw = fs.readFileSync(ordersFile, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Helper to save orders
function saveOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
}

// Valid PIN code regions lookup
const PIN_REGIONS = {
  '11': { region: 'Delhi NCR', deliveryDays: '2-3 Business Days' },
  '12': { region: 'Haryana', deliveryDays: '2-3 Business Days' },
  '13': { region: 'Punjab / Chandigarh', deliveryDays: '2-3 Business Days' },
  '14': { region: 'Punjab', deliveryDays: '3-4 Business Days' },
  '16': { region: 'Chandigarh', deliveryDays: '2-3 Business Days' },
  '20': { region: 'Western UP / Noida', deliveryDays: '2-3 Business Days' },
  '30': { region: 'Jaipur & Rajasthan', deliveryDays: '3-4 Business Days' },
  '38': { region: 'Ahmedabad & Gujarat', deliveryDays: '3-4 Business Days' },
  '40': { region: 'Mumbai Metro', deliveryDays: '2-3 Business Days' },
  '41': { region: 'Pune & Maharashtra', deliveryDays: '2-3 Business Days' },
  '50': { region: 'Hyderabad / Telangana', deliveryDays: '2-3 Business Days' },
  '56': { region: 'Bengaluru Urban & Rural', deliveryDays: '1-2 Business Days (Express)' },
  '57': { region: 'Karnataka Coast', deliveryDays: '2-3 Business Days' },
  '60': { region: 'Chennai Metro', deliveryDays: '2-3 Business Days' },
  '68': { region: 'Kochi & Kerala', deliveryDays: '3-4 Business Days' },
  '70': { region: 'Kolkata Metro', deliveryDays: '3-4 Business Days' },
};

// Pincode validation endpoint
app.get('/api/pincode/:pincode', (req, res) => {
  const { pincode } = req.params;
  const pinRegex = /^[1-9][0-9]{5}$/;

  if (!pinRegex.test(pincode)) {
    return res.status(400).json({
      valid: false,
      message: 'Please enter a valid 6-digit Indian Postal PIN code.',
    });
  }

  const prefix = pincode.substring(0, 2);
  const info = PIN_REGIONS[prefix] || {
    region: 'All India Service Area',
    deliveryDays: '3-5 Business Days',
  };

  res.json({
    valid: true,
    pincode,
    region: info.region,
    deliveryDays: info.deliveryDays,
    codAvailable: true,
    freeDeliveryThreshold: 499,
    message: `COD available at ${pincode}! Delivered in ${info.deliveryDays}.`,
  });
});

// Coupon verification endpoint
app.post('/api/coupons/verify', (req, res) => {
  const { code, subtotal } = req.body;
  const normalized = (code || '').trim().toUpperCase();

  const coupons = {
    'PANDA100': { discount: 100, type: 'fixed', min: 499, desc: '₹100 Off on orders above ₹499' },
    'WELCOME10': { discount: 10, type: 'percentage', min: 299, desc: '10% Off your first order' },
    'FESTIVE200': { discount: 200, type: 'fixed', min: 1499, desc: '₹200 Flat Off on orders above ₹1,499' },
  };

  const coupon = coupons[normalized];
  if (!coupon) {
    return res.status(400).json({ valid: false, message: 'Invalid promo code. Try PANDA100 or WELCOME10.' });
  }

  if (subtotal < coupon.min) {
    return res.status(400).json({
      valid: false,
      message: `Coupon requires minimum cart subtotal of ₹${coupon.min}.`,
    });
  }

  let calculatedDiscount = 0;
  if (coupon.type === 'fixed') {
    calculatedDiscount = coupon.discount;
  } else {
    calculatedDiscount = Math.round((subtotal * coupon.discount) / 100);
  }

  res.json({
    valid: true,
    code: normalized,
    discountAmount: calculatedDiscount,
    description: coupon.desc,
  });
});

// Create Order endpoint
app.post('/api/orders', (req, res) => {
  try {
    const { customer, shippingAddress, items, couponCode, paymentMethod } = req.body;

    // Validation
    if (!customer || !customer.fullName || customer.fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide customer full name.' });
    }

    const mobileClean = (customer.mobile || '').replace(/[^0-9]/g, '');
    const last10 = mobileClean.slice(-10);
    if (last10.length !== 10 || !/^[6-9]/.test(last10)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit Indian mobile number.' });
    }

    if (!shippingAddress || !shippingAddress.flatHouseNo || !shippingAddress.streetArea || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
      return res.status(400).json({ error: 'Please fill in complete delivery address details.' });
    }

    if (!/^[1-9][0-9]{5}$/.test(shippingAddress.pincode)) {
      return res.status(400).json({ error: 'Please enter a valid 6-digit Indian PIN code.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (couponCode) {
      const codeUpper = couponCode.trim().toUpperCase();
      if (codeUpper === 'PANDA100' && subtotal >= 499) discount = 100;
      else if (codeUpper === 'WELCOME10' && subtotal >= 299) discount = Math.round(subtotal * 0.1);
      else if (codeUpper === 'FESTIVE200' && subtotal >= 1499) discount = 200;
    }

    const shippingFee = subtotal >= 499 ? 0 : 49;
    const finalTotal = Math.max(0, subtotal - discount + shippingFee);

    // Generate Order ID & Tracking
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PEK-${new Date().getFullYear()}-${randomSuffix}`;
    const trackingNumber = `DELHIVERY-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const deliveryDateObj = new Date();
    deliveryDateObj.setDate(deliveryDateObj.getDate() + 4);
    const estimatedDeliveryDate = deliveryDateObj.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      customer: {
        fullName: customer.fullName.trim(),
        mobile: `+91 ${last10}`,
        email: customer.email ? customer.email.trim() : '',
      },
      shippingAddress: {
        ...shippingAddress,
        mobile: `+91 ${last10}`,
      },
      items,
      subtotal,
      discount,
      couponCode: couponCode || undefined,
      shippingFee,
      total: finalTotal,
      paymentMethod: paymentMethod === 'online_upi' ? 'online_upi' : 'cod',
      estimatedDeliveryDate,
      trackingNumber,
    };

    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder,
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to process order. Please try again.' });
  }
});

// Get Order by ID
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const orders = getOrders();
  const order = orders.find(o => o.id.toLowerCase() === id.toLowerCase() || (o.customer && o.customer.mobile.includes(id)));

  if (!order) {
    return res.status(404).json({ error: 'Order not found. Please verify your Order ID or registered mobile.' });
  }

  res.json({ order });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  res.json({
    success: true,
    message: 'Welcome to the Panda family! Use coupon code PANDA100 for ₹100 off.',
    couponCode: 'PANDA100',
  });
});

// Serve static frontend build if dist exists
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Panda Easy Kitchen fullstack server running on http://127.0.0.1:${PORT}`);
});
