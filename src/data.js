// src/data.js – Pure data exports (no JSX)
export const navLinks = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'Categories', href: '#categories' },
  { id: 4, name: 'Reviews', href: '#reviews' },
  { id: 5, name: 'Contact', href: '#contact' },
];

export const heroStats = [
  { id: 1, number: '10K+', label: 'Happy Customers' },
  { id: 2, number: '24+', label: 'Menu Items' },
  { id: 3, number: '4.9', label: 'Average Rating' },
  { id: 4, number: '30 Min', label: 'Fast Delivery' },
];

// Placeholder image URL (replace with your own)
const tempImageUrl = 'https://ik.imagekit.io/Selvamraj700/assets/paristower.jpg?updatedAt=1738081264822';

export const paniPuriItems = [
  { id: 'pp1', name: 'Classic Pani Puri', description: 'Crispy puris filled with tangy tamarind water, potatoes and chickpeas.', image: tempImageUrl, badge: 'Bestseller', rating: 4.9, spicyLevel: 'Medium' },
  { id: 'pp2', name: 'Masala Pani Puri', description: 'Extra spicy masala blend with aromatic herbs and tangy filling.', image: tempImageUrl, badge: 'Spicy', rating: 4.8, spicyLevel: 'High' },
  { id: 'pp3', name: 'Cheese Pani Puri', description: 'Loaded with creamy cheese and crunchy pani puri shells.', image: tempImageUrl, badge: 'Fusion', rating: 4.7, spicyLevel: 'Low' },
  { id: 'pp4', name: 'Corn Pani Puri', description: 'Sweet corn and masala stuffing inside crispy puris.', image: tempImageUrl, badge: 'New', rating: 4.6, spicyLevel: 'Medium' },
  { id: 'pp5', name: 'Dahi Puri', description: 'Creamy yogurt, sev and chutney topping for a rich taste.', image: tempImageUrl, badge: 'Popular', rating: 4.9, spicyLevel: 'Low' },
  { id: 'pp6', name: 'Spicy Mint Pani Puri', description: 'Mint-based spicy pani with jalapeño flavour and herbs.', image: tempImageUrl, badge: 'Hot', rating: 4.8, spicyLevel: 'Extreme' },
];

export const momoItems = [
  { id: 'm1', name: 'Veg Momos', description: 'Steamed dumplings filled with fresh vegetables and herbs.', image: tempImageUrl, badge: 'Veg', rating: 4.7 },
  { id: 'm2', name: 'Paneer Momos', description: 'Juicy paneer filling wrapped in soft momo dough.', image: tempImageUrl, badge: 'Bestseller', rating: 4.9 },
  { id: 'm3', name: 'Fried Momos', description: 'Golden fried momos with crunchy texture and spicy dip.', image: tempImageUrl, badge: 'Crispy', rating: 4.8 },
  { id: 'm4', name: 'Cheese Momos', description: 'Cheesy filling with soft outer dough and spicy sauce.', image: tempImageUrl, badge: 'Fusion', rating: 4.8 },
  { id: 'm5', name: 'Schezwan Momos', description: 'Spicy schezwan-coated momos with extra masala flavour.', image: tempImageUrl, badge: 'Spicy', rating: 4.7 },
  { id: 'm6', name: 'Tandoori Momos', description: 'Tandoori-marinated momos grilled with smoky flavours.', image: tempImageUrl, badge: 'Premium', rating: 4.9 },
];

export const mojitoItems = [
  { id: 'mj1', name: 'Mint Mojito', description: 'Refreshing mint, lime and soda combination.', image: tempImageUrl, badge: 'Classic', rating: 4.8 },
  { id: 'mj2', name: 'Blue Lagoon Mojito', description: 'Blue lagoon flavour with lemon and soda.', image: tempImageUrl, badge: 'Popular', rating: 4.7 },
  { id: 'mj3', name: 'Watermelon Mojito', description: 'Sweet watermelon flavour mixed with mint and soda.', image: tempImageUrl, badge: 'Summer Special', rating: 4.8 },
  { id: 'mj4', name: 'Lemon Mojito', description: 'Classic lemon flavour with mint and crushed ice.', image: tempImageUrl, badge: 'Fresh', rating: 4.6 },
  { id: 'mj5', name: 'Strawberry Mojito', description: 'Sweet strawberry blend with mint and soda.', image: tempImageUrl, badge: 'New', rating: 4.9 },
  { id: 'mj6', name: 'Virgin Mojito', description: 'Refreshing non-alcoholic mojito with classic flavours.', image: tempImageUrl, badge: 'Bestseller', rating: 4.8 },
];

export const friesItems = [
  { id: 'f1', name: 'Salted Fries', description: 'Golden crispy fries with light salt seasoning.', image: tempImageUrl, badge: 'Classic', rating: 4.7 },
  { id: 'f2', name: 'Cheese Fries', description: 'Loaded with melted cheese and crispy fries.', image: tempImageUrl, badge: 'Bestseller', rating: 4.9 },
  { id: 'f3', name: 'Peri Peri Fries', description: 'Spicy peri peri masala seasoning on crispy fries.', image: tempImageUrl, badge: 'Spicy', rating: 4.8 },
  { id: 'f4', name: 'Loaded Fries', description: 'Loaded with cheese, jalapeños and sauces.', image: tempImageUrl, badge: 'Premium', rating: 4.9 },
  { id: 'f5', name: 'Spicy Fries', description: 'Extra spicy fries with chilli and garlic mix.', image: tempImageUrl, badge: 'Hot', rating: 4.7 },
  { id: 'f6', name: 'BBQ Fries', description: 'Smoky BBQ flavoured fries with sauce topping.', image: tempImageUrl, badge: 'Smoky', rating: 4.8 },
];

export const categories = [
  { id: 'pani-puri', title: 'Pani Puri', emoji: '🫧', image: tempImageUrl, count: 6, description: 'Tangy, crispy and full of flavour.' },
  { id: 'momos', title: 'Momos', emoji: '🥟', image: tempImageUrl, count: 6, description: 'Soft, juicy and spicy dumplings.' },
  { id: 'mojitos', title: 'Mojitos', emoji: '🍃', image: tempImageUrl, count: 6, description: 'Refreshing cool drinks for every mood.' },
  { id: 'fries', title: 'French Fries', emoji: '🍟', image: tempImageUrl, count: 6, description: 'Golden crispy fries with exciting flavours.' },
];

export const features = [
  { id: 'f1', icon: 'FaLeaf', title: 'Fresh Ingredients', description: 'We use only fresh vegetables, spices and ingredients every day.', color: '#22c55e' },
  { id: 'f2', icon: 'FaShieldAlt', title: 'Hygienic Cooking', description: 'Prepared in a clean and hygienic kitchen with proper safety standards.', color: '#3b82f6' },
  { id: 'f3', icon: 'FaBolt', title: 'Fast Delivery', description: 'Quick delivery service so your food reaches hot and fresh.', color: '#facc15' },
  { id: 'f4', icon: 'FaTag', title: 'Affordable Prices', description: 'Premium taste and quality at budget-friendly prices.', color: '#ef4444' },
];

export const reviews = [
  { id: 'r1', name: 'Priya Sharma', location: 'Chennai', rating: 5, review: 'Best pani puri and fries in the city. The taste is amazing and delivery is always fast.', avatar: 'PS' },
  { id: 'r2', name: 'Arjun Kumar', location: 'Chennai', rating: 5, review: 'The momos are very soft and juicy. Mojitos are refreshing and the quality is excellent.', avatar: 'AK' },
  { id: 'r3', name: 'Meena Raj', location: 'Chennai', rating: 5, review: 'Affordable prices, clean packaging and great taste. I will definitely order again.', avatar: 'MR' },
];