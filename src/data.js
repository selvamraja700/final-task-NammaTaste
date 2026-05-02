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
  { id: 'pp1', name: 'Pani Puri', description: 'Classic tangy and spicy pani puri.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Pani%20Poori.png', badge: 'Chaat', rating: 4.9 },
  { id: 'pp2', name: 'Dahi Pani Puri', description: 'Sweet and tangy dahi pani puri.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Dahi%20pani%20poori.png', badge: 'Chaat', rating: 4.8 },
  { id: 'pp3', name: 'Masala Puri', description: 'Crunchy masala puri with warm peas gravy.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Msasaal%20poori.png', badge: 'Chaat', rating: 4.7 },
  { id: 'pp4', name: 'Thayir Puri (Curd Puri)', description: 'Rich and creamy curd puri with sev.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/thayir%20puri%20-_Curd%20poori_.png', badge: 'Chaat', rating: 4.8 },
];

export const momoItems = [
  { id: 'm1', name: 'Veg Momos', description: 'Steamed dumplings filled with fresh vegetables and herbs.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/veg%20momos.png', badge: 'Veg', rating: 4.7 },
  { id: 'm2', name: 'Paneer Momos', description: 'Juicy paneer filling wrapped in soft momo dough.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/panner%202%20momos.png', badge: 'Bestseller', rating: 4.9 },
  { id: 'm3', name: 'Chicken Momos', description: 'Delicious chicken filling wrapped in a soft, steamed dough.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/cheicken%20momos.png', badge: 'Premium', rating: 4.8 },
  { id: 'm4', name: 'Cheese Momos', description: 'Cheesy filling with soft outer dough and spicy sauce.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Cheese%20momos.png', badge: 'Fusion', rating: 4.8 },
  { id: 'm5', name: 'Chicken Peri Peri Momos', description: 'Spicy peri peri coated chicken momos with extra masala.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/chickerm%20peri%20peri.png', badge: 'Spicy', rating: 4.9 },
];

export const mojitoItems = [
  { id: 'mj1', name: 'Mint Mojito', description: 'Refreshing mint, lime and soda combination.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/mint%20mojito%20(2).png', badge: 'Classic', rating: 4.8 },
  { id: 'mj2', name: 'Blue Mojito', description: 'Blue lagoon flavour with lemon and soda.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/blue%20mojito.png', badge: 'Popular', rating: 4.7 },
  { id: 'mj4', name: 'Lemon Mojito', description: 'Classic lemon flavour with mint and crushed ice.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/lemon%20mojito.png', badge: 'Fresh', rating: 4.6 },
];

export const crispItems = [
  { id: 'ci1', name: 'French Fries', description: 'Classic golden crispy French fries.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/French%20Fries.png', badge: 'Snack', rating: 4.8 },
  { id: 'ci2', name: 'Veg Frankie', description: 'Delicious vegetable filling wrapped in a soft frankie.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Veg%20fraankie.png', badge: 'Frankie', rating: 4.7 },
  { id: 'ci3', name: 'Chicken Frankie', description: 'Juicy chicken filling wrapped in a soft frankie.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/cheicken%20frankie.png', badge: 'Frankie', rating: 4.9 },
];

export const breadOmeletteItems = [
  { id: 'bo1', name: 'Chicken Bread Omelette', description: 'Fluffy omelette packed with spicy chicken chunks inside toasted bread.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Chieck%20bread%20omletee.png', badge: 'Premium', rating: 4.9 },
  { id: 'bo2', name: 'Cheese Bread Omelette', description: 'Loaded with gooey cheese folded inside a warm bread omelette.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/cheese%20brwaead%20omletee.png', badge: 'Bestseller', rating: 4.8 },
  { id: 'bo3', name: 'Veg Bread Omelette', description: 'Healthy bread omelette filled with fresh finely chopped veggies.', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/veg%20bread%20omletee.png', badge: 'Healthy', rating: 4.7 },
];

export const categories = [
  { id: 'pani-puri', title: 'Pani Puri', emoji: '🫧', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/Pani%20Poori.png', count: 4, description: 'Tangy, crispy and full of flavour.' },
  { id: 'momos', title: 'Momos', emoji: '🥟', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/panner%202%20momos.png', count: 5, description: 'Soft, juicy and spicy dumplings.' },
  { id: 'mojitos', title: 'Mojitos', emoji: '🍃', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/blue%20mojito.png', count: 3, description: 'Refreshing cool drinks for every mood.' },
  { id: 'crisp-items', title: 'Crisp Items', emoji: '🍟', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/French%20Fries.png', count: 3, description: 'Golden crispy fries and delicious frankies.' },
  { id: 'bread-omelette', title: 'Bread Omelette', emoji: '🍳', image: 'https://ik.imagekit.io/Selvamraj700/NammaTaste/cheese%20brwaead%20omletee.png', count: 3, description: 'Hot and delicious street-style bread omelettes.' },
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