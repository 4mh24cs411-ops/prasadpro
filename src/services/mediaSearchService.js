// src/services/mediaSearchService.js
// Dynamic Food Photo & Video Search Service for FitGen AI

/**
 * Curated high-definition food photo library with metadata
 */
const FOOD_PHOTO_LIBRARY = {
  vegetables: [
    { id: 'v1', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', title: 'Mixed Vegetable Stir-Fry', caption: 'Fresh tomato, cabbage, carrot, and green beans sautéed in herbs.' },
    { id: 'v2', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80', title: 'Desi Spiced Veg Curry', caption: 'Rich tomato-onion curry loaded with garden-fresh vegetables.' },
    { id: 'v3', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', title: 'Garden Salad & Protein Bowl', caption: 'Crispy raw vegetables packed with micronutrients and fiber.' },
    { id: 'v4', url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80', title: 'Healthy Vegetable Rice Bowl', caption: 'High-fiber vegetable pulao bowl with carrots, peas, and green beans.' }
  ],
  paneer: [
    { id: 'p1', url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', title: 'FitGen Paneer Butter Masala', caption: 'Juicy paneer cubes in velvety tomato cream gravy.' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', title: 'High-Protein Palak Paneer', caption: 'Iron-rich spinach puree folded with fresh cottage cheese.' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80', title: 'Tandoori Paneer Tikka Skewers', caption: 'Yogurt-marinated paneer grilled with bell peppers and onions.' },
    { id: 'p4', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80', title: 'Kadhai Paneer Masala Gravy', caption: 'Pan-sear paneer with bell peppers, onions, and ground spices.' }
  ],
  chicken: [
    { id: 'c1', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80', title: 'Tandoori Chicken Tikka', caption: 'Flame-grilled lean chicken breast skewers with lemon spices.' },
    { id: 'c2', url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80', title: 'High-Protein Chicken Rice Bowl', caption: 'Grilled chicken breast served over Basmati rice with fresh greens.' },
    { id: 'c3', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', title: 'Low-Fat Chicken Biryani Bowl', caption: 'Aromatic spices and tender chicken breast with basmati rice.' },
    { id: 'c4', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', title: 'Grilled Herb Chicken Salad', caption: 'Lean seared chicken breast over crisp garden microgreens.' }
  ],
  egg: [
    { id: 'e1', url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80', title: 'Desi Spiced Egg Bhurji Bowl', caption: 'Scrambled eggs tossed with onions, tomatoes, and cilantro.' },
    { id: 'e2', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', title: 'High-Protein Egg Toast & Greens', caption: 'Poached/fried eggs served on whole-grain toast with microgreens.' },
    { id: 'e3', url: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=800&q=80', title: 'Boiled Farm Eggs & Black Pepper', caption: 'High-bioavailability whole eggs and whites with black pepper.' },
    { id: 'e4', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80', title: 'Masala Egg Omelette Roll', caption: 'Fluffy whole egg and white omelette with spinach and tomatoes.' }
  ],
  breakfast: [
    { id: 'b1', url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80', title: 'Protein Oats & Berries Bowl', caption: 'Rolled oats topped with chia seeds, fresh strawberries, and banana.' },
    { id: 'b2', url: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80', title: 'Greek Yogurt & Fruit Parfait', caption: 'Strained Greek yogurt with raw honey, blueberries, and sliced almonds.' },
    { id: 'b3', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', title: 'High-Protein Avocado Egg Toast', caption: 'Whole grain toast with smashed avocado, eggs, and chili flakes.' },
    { id: 'b4', url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80', title: 'Anabolic Peanut Butter Protein Smoothie', caption: 'Chilled banana whey protein smoothie with almond milk.' }
  ],
  workout: [
    { id: 'w1', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', title: 'Muscle Recovery Quinoa Bowl', caption: 'Complex carbs and lean protein for post-training glycogen replenishment.' },
    { id: 'w2', url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80', title: 'Anabolic Protein Banana Smoothie', caption: 'Fast-digesting whey protein, banana, peanut butter, and milk.' },
    { id: 'w3', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', title: 'Post-Workout Lean Protein Meal', caption: 'Seared lean protein with steamed broccoli and brown rice.' },
    { id: 'w4', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', title: 'Pre-Workout Glycogen Fuel Bowl', caption: 'Complex carbs with fruit slices and nuts for workout stamina.' }
  ],
  samosa: [
    { id: 's1', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', title: 'Authentic Punjabi Samosa', caption: 'Crispy golden baked samosa filled with spiced potato mash.' },
    { id: 's2', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', title: 'Desi Samosa Chaat Bowl', caption: 'Crushed samosa topped with spiced chickpeas and yogurt.' },
    { id: 's3', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80', title: 'Air-Fried Low-Calorie Samosa', caption: 'Crispy dough crust air-fried with minimal oil.' },
    { id: 's4', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', title: 'Samosa Mint & Yogurt Dip Bowl', caption: 'Fresh green mint chutney paired with crispy samosa snacks.' }
  ]
};

/**
 * Returns 4 high quality related food photos for any user query or dish topic
 */
export function getRelatedPhotos(querySubject = '') {
  const query = (querySubject || '').toLowerCase();

  if (query.includes('chicken')) return FOOD_PHOTO_LIBRARY.chicken;
  if (query.includes('paneer') || query.includes('tikka') || query.includes('palak')) return FOOD_PHOTO_LIBRARY.paneer;
  if (query.includes('egg') || query.includes('bhurji') || query.includes('omelette')) return FOOD_PHOTO_LIBRARY.egg;
  if (query.includes('breakfast') || query.includes('oats') || query.includes('yogurt') || query.includes('fruit')) return FOOD_PHOTO_LIBRARY.breakfast;
  if (query.includes('workout') || query.includes('post-workout') || query.includes('shred') || query.includes('abs') || query.includes('smoothie')) return FOOD_PHOTO_LIBRARY.workout;
  if (query.includes('samosa')) return FOOD_PHOTO_LIBRARY.samosa;

  // Default to 4 vegetable/healthy food photos for ingredient lists like "tomato, cabbage, onion..."
  return FOOD_PHOTO_LIBRARY.vegetables;
}
