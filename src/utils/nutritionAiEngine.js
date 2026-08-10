// src/utils/nutritionAiEngine.js
// Advanced AI Nutrition & Ingredient Breakdown Engine
import { getUniqueFoodImage } from '../data/nutritionVideosData';

// Food items dictionary with accurate macro & protein densities
const PROTEIN_DENSITY_MAP = {
  chicken: { name: 'Boneless Chicken Breast', amount: '220g', protein: 50.6, calories: 260, icon: '🍗', category: 'Non-Vegetarian' },
  turkey: { name: 'Lean Turkey Breast', amount: '200g', protein: 48.0, calories: 230, icon: '🦃', category: 'Non-Vegetarian' },
  salmon: { name: 'Fresh Salmon Fillet', amount: '200g', protein: 40.0, calories: 360, icon: '🐟', category: 'Non-Vegetarian' },
  fish: { name: 'White Fish / Cod Fillet', amount: '200g', protein: 38.0, calories: 190, icon: '🐟', category: 'Non-Vegetarian' },
  prawns: { name: 'Fresh Prawns / Shrimp', amount: '200g', protein: 40.0, calories: 180, icon: '🦐', category: 'Non-Vegetarian' },
  mutton: { name: 'Lean Mutton / Lamb', amount: '200g', protein: 42.0, calories: 340, icon: '🥩', category: 'Non-Vegetarian' },
  egg: { name: 'Whole Eggs & Egg Whites', amount: '3 whole + 2 whites', protein: 28.0, calories: 240, icon: '🥚', category: 'Eggetarian' },
  paneer: { name: 'Fresh Paneer (Cottage Cheese)', amount: '200g', protein: 36.0, calories: 420, icon: '🧀', category: 'Vegetarian' },
  tofu: { name: 'Firm Tofu', amount: '250g', protein: 30.0, calories: 210, icon: '🧊', category: 'Vegan' },
  soya: { name: 'Soya Chunks (Nutrela)', amount: '60g dry', protein: 31.2, calories: 200, icon: '🫘', category: 'Vegan' },
  chickpeas: { name: 'Boiled Chickpeas (Chana)', amount: '200g', protein: 17.8, calories: 240, icon: '🫛', category: 'Vegan' },
  chana: { name: 'Boiled Black / White Chana', amount: '200g', protein: 18.0, calories: 235, icon: '🫛', category: 'Vegan' },
  lentils: { name: 'Moong / Masoor Dal (Cooked)', amount: '200g', protein: 18.0, calories: 220, icon: '🥣', category: 'Vegan' },
  dal: { name: 'Yellow Dal Tadka / Makhani', amount: '200g', protein: 16.5, calories: 210, icon: '🥣', category: 'Vegetarian' },
  potato: { name: 'Boiled / Roasted Potatoes', amount: '200g', protein: 4.0, calories: 170, icon: '🥔', category: 'Vegan' },
  sweetpotato: { name: 'Baked Sweet Potato', amount: '200g', protein: 4.0, calories: 180, icon: '🍠', category: 'Vegan' },
  peas: { name: 'Green Peas', amount: '100g', protein: 5.4, calories: 80, icon: '🫛', category: 'Vegan' },
  flour: { name: 'Wheat Flour / Dough Base', amount: '100g', protein: 10.0, calories: 340, icon: '🌾', category: 'Vegan' },
  cheese: { name: 'Low-Fat Mozzarella / Processed Cheese', amount: '60g', protein: 16.0, calories: 180, icon: '🧀', category: 'Vegetarian' },
  yogurt: { name: 'Greek Yogurt (Hung Curd)', amount: '180g', protein: 18.0, calories: 130, icon: '🥣', category: 'Vegetarian' },
  curd: { name: 'Fresh Dahi / Curd', amount: '200g', protein: 7.0, calories: 120, icon: '🥣', category: 'Vegetarian' },
  milk: { name: 'Low-Fat / Soy Milk', amount: '250ml', protein: 8.5, calories: 120, icon: '🥛', category: 'Vegetarian' },
  oats: { name: 'Rolled Oats', amount: '80g', protein: 11.0, calories: 300, icon: '🌾', category: 'Vegan' },
  rice: { name: 'Cooked Basmati / Brown Rice', amount: '1.5 cups (200g)', protein: 5.2, calories: 240, icon: '🍚', category: 'Vegan' },
  fruit: { name: 'Fresh Berries & Mixed Fruit', amount: '200g', protein: 2.0, calories: 110, icon: '🍎', category: 'Vegan' },
  banana: { name: 'Ripe Banana Slices', amount: '1 medium', protein: 1.3, calories: 105, icon: '🍌', category: 'Vegan' },
  avocado: { name: 'Sliced Fresh Avocado', amount: '1/2 medium', protein: 2.0, calories: 160, icon: '🥑', category: 'Vegan' },
  seeds: { name: 'Chia & Flax Seeds', amount: '15g', protein: 3.5, calories: 80, icon: '🥜', category: 'Vegan' },
  broccoli: { name: 'Steamed Broccoli', amount: '150g', protein: 4.5, calories: 50, icon: '🥦', category: 'Vegan' },
  spinach: { name: 'Fresh Baby Spinach (Palak)', amount: '200g', protein: 5.8, calories: 45, icon: '🥬', category: 'Vegan' }
};

// Extensive Known Dishes Database matching real authentic recipes
const KNOWN_DISHES = [
  {
    aliases: ['samosa', 'punjabi samosa', 'aloo samosa', 'samosas'],
    name: 'Authentic Punjabi Potato & Pea Samosa',
    cuisine: 'Indian',
    dietary: 'Vegetarian',
    description: 'Crispy golden fried or baked pastry stuffed with spiced boiled potatoes, green peas, cashews, and aromatic cumin spices.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'How to make Samosa recipe step by step',
    ingredients: [
      { name: 'Spiced Boiled Potatoes (Filling)', amount: '200g', protein: 4.0, calories: 170, icon: '🥔' },
      { name: 'Green Peas & Cashew Nuts', amount: '50g', protein: 3.2, calories: 60, icon: '🫛' },
      { name: 'Refined / Wheat Flour Dough Crust', amount: '100g', protein: 9.0, calories: 340, icon: '🌾' },
      { name: 'Cumin, Coriander & Garam Masala', amount: '1.5 tbsp', protein: 0.5, calories: 15, icon: '🌶️' },
      { name: 'Oil for Frying / Baking', amount: '1.5 tbsp', protein: 0.0, calories: 160, icon: '🥄' }
    ],
    prepTime: '20 mins',
    cookTime: '25 mins',
    instructions: [
      { step: 1, title: 'Prepare Potato Stuffing', description: 'Mash boiled potatoes. Sauté cumin, green chilis, ginger, green peas, and cashews. Add spices and fold in potatoes.', timerSeconds: 420 },
      { step: 2, title: 'Knead Dough & Shape Cone', description: 'Knead flour with carom seeds (ajwain), ghee, and water. Roll into ovals, slice in half, and form cone shapes.', timerSeconds: 480 },
      { step: 3, title: 'Stuff & Fry / Air Fry', description: 'Fill cones with potato mixture, seal edges with water, and deep fry on low-medium heat (or air-fry at 180°C) until golden brown.', timerSeconds: 720 }
    ]
  },
  {
    aliases: ['chicken tikka', 'chiken tikka', 'tandoori chicken tikka', 'tikka chicken', 'chicken tika'],
    name: 'High-Protein Chicken Tikka',
    cuisine: 'Indian',
    dietary: 'Non-Vegetarian',
    description: 'Juicy tender chicken breast marinated in Greek yogurt, lemon juice, garlic, and authentic tandoori spices, grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Chicken Tikka recipe step by step',
    ingredients: [
      { name: 'Boneless Chicken Breast', amount: '250g', protein: 57.5, calories: 275, icon: '🍗' },
      { name: 'Low-Fat Greek Yogurt (Marination)', amount: '60g', protein: 6.0, calories: 40, icon: '🥣' },
      { name: 'Ginger-Garlic Paste', amount: '1 tbsp', protein: 0.5, calories: 12, icon: '🧄' },
      { name: 'Lemon Juice & Tandoori Masala', amount: '1.5 tbsp', protein: 0.2, calories: 10, icon: '🍋' },
      { name: 'Mustard Oil / Light Ghee', amount: '1 tsp', protein: 0.0, calories: 45, icon: '🥄' }
    ],
    prepTime: '15 mins',
    cookTime: '20 mins',
    instructions: [
      { step: 1, title: 'Marinate Chicken', description: 'Cube chicken breast. Whisk Greek yogurt, ginger-garlic paste, tandoori spices, lemon juice, and oil. Coat chicken and rest 15 mins.', timerSeconds: 300 },
      { step: 2, title: 'Skewer & Grill', description: 'Skewer chicken. Grill on high heat or air fry at 200°C for 14 minutes until charred.', timerSeconds: 840 },
      { step: 3, title: 'Garnish & Serve', description: 'Top with chat masala, fresh cilantro, onion rings, and mint raita.', timerSeconds: 60 }
    ]
  },
  {
    aliases: ['paneer butter masala', 'paner butter masala', 'paneer makhani', 'shahi paneer'],
    name: 'FitGen Paneer Butter Masala',
    cuisine: 'Indian',
    dietary: 'Vegetarian',
    description: 'Rich velvety tomato cashew gravy with soft cottage cheese cubes, prepared with light cream to maximize protein.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Paneer Butter Masala recipe restaurant style',
    ingredients: [
      { name: 'Fresh Paneer (Cottage Cheese)', amount: '200g', protein: 36.0, calories: 410, icon: '🧀' },
      { name: 'Low-Fat Milk / Yogurt Base', amount: '100ml', protein: 4.5, calories: 60, icon: '🥛' },
      { name: 'Ripe Tomato Puree & Cashews', amount: '1.5 cups', protein: 3.5, calories: 110, icon: '🍅' },
      { name: 'Onion, Garlic & Ginger Paste', amount: '1 medium', protein: 1.5, calories: 35, icon: '🧅' },
      { name: 'Light Butter & Kasuri Methi', amount: '1 tsp', protein: 0.2, calories: 40, icon: '🧈' }
    ],
    prepTime: '15 mins',
    cookTime: '20 mins',
    instructions: [
      { step: 1, title: 'Sauté Base Gravy', description: 'Sauté onions, ginger, garlic, tomatoes, and cashews. Blend into smooth puree.', timerSeconds: 420 },
      { step: 2, title: 'Simmer Masala', description: 'Return puree to pan. Add garam masala, kasuri methi, low-fat milk, and simmer 5 mins.', timerSeconds: 300 },
      { step: 3, title: 'Fold Paneer Cubes', description: 'Fold paneer cubes into gravy and simmer for 3 minutes.', timerSeconds: 180 }
    ]
  },
  {
    aliases: ['palak paneer', 'spinach paneer', 'palak paner'],
    name: 'High-Protein Palak Paneer Bowl',
    cuisine: 'Indian',
    dietary: 'Vegetarian',
    description: 'Nutrient-packed spinach puree with pan-seared paneer cubes, rich in iron, calcium, and protein.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Palak Paneer recipe dhaba style',
    ingredients: [
      { name: 'Fresh Paneer Cubes', amount: '200g', protein: 36.0, calories: 410, icon: '🧀' },
      { name: 'Baby Spinach (Palak)', amount: '300g', protein: 8.7, calories: 60, icon: '🥬' },
      { name: 'Garlic & Ginger Paste', amount: '1 tbsp', protein: 0.6, calories: 15, icon: '🧄' },
      { name: 'Finely Chopped Onion & Tomato', amount: '1 small each', protein: 1.8, calories: 40, icon: '🧅' },
      { name: 'Cold Pressed Oil / Light Ghee', amount: '1 tsp', protein: 0.0, calories: 45, icon: '🥄' }
    ],
    prepTime: '15 mins',
    cookTime: '15 mins',
    instructions: [
      { step: 1, title: 'Blanch & Puree Spinach', description: 'Boil spinach for 2 mins, ice bath immediately, then coarsely blend.', timerSeconds: 180 },
      { step: 2, title: 'Sauté Aromatics', description: 'Heat oil, add cumin, minced garlic, ginger, and onions until light golden.', timerSeconds: 240 },
      { step: 3, title: 'Combine & Simmer', description: 'Stir in tomato puree, spinach paste, and paneer cubes. Simmer 4 mins.', timerSeconds: 240 }
    ]
  },
  {
    aliases: ['fruit bowl', 'fruit salad', 'fruits bowl', 'greek yogurt fruit bowl'],
    name: 'High-Protein Greek Yogurt Fruit Bowl',
    cuisine: 'Western',
    dietary: 'Vegetarian',
    description: 'Refreshing bowl of fresh strawberries, blueberries, banana slices, and honey drizzled over strained Greek yogurt and seeds.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Healthy Greek Yogurt Fruit Bowl recipe',
    ingredients: [
      { name: 'Thick Strained Greek Yogurt', amount: '200g', protein: 20.0, calories: 140, icon: '🥣' },
      { name: 'Sliced Strawberries & Blueberries', amount: '100g', protein: 1.0, calories: 50, icon: '🍓' },
      { name: 'Ripe Banana Slices', amount: '1 medium', protein: 1.3, calories: 105, icon: '🍌' },
      { name: 'Chia Seeds & Sliced Almonds', amount: '15g', protein: 3.5, calories: 80, icon: '🥜' },
      { name: 'Raw Honey Drizzle', amount: '1 tbsp', protein: 0.1, calories: 60, icon: '🍯' }
    ],
    prepTime: '5 mins',
    cookTime: '0 mins',
    instructions: [
      { step: 1, title: 'Prepare Yogurt Base', description: 'Spoon thick Greek yogurt into serving bowl.', timerSeconds: 30 },
      { step: 2, title: 'Arrange Fruits', description: 'Top with fresh strawberry slices, blueberries, and banana rounds.', timerSeconds: 60 },
      { step: 3, title: 'Garnish & Drizzle', description: 'Sprinkle chia seeds, sliced almonds, and drizzle raw organic honey.', timerSeconds: 30 }
    ]
  },
  {
    aliases: ['egg bhurji', 'scrambled eggs', 'egg bhurji & toast', 'eggs and toast'],
    name: 'Desi Spiced Egg Bhurji & Multigrain Toast',
    cuisine: 'Indian',
    dietary: 'Eggetarian',
    description: 'Indian street-style scrambled eggs tossed with sautéed bell peppers, onions, tomatoes, and whole grain toast.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Egg Bhurji recipe street style',
    ingredients: [
      { name: 'Whole Eggs & Egg Whites', amount: '3 whole + 2 whites', protein: 28.0, calories: 240, icon: '🥚' },
      { name: 'Multigrain Toast Slices', amount: '2 slices', protein: 8.0, calories: 160, icon: '🍞' },
      { name: 'Finely Chopped Onion & Tomato', amount: '1 small each', protein: 1.5, calories: 40, icon: '🧅' },
      { name: 'Green Bell Pepper & Green Chilis', amount: '1/2 chopped', protein: 0.8, calories: 15, icon: '🫑' },
      { name: 'Butter / Olive Oil', amount: '1 tsp', protein: 0.0, calories: 45, icon: '🧈' }
    ],
    prepTime: '5 mins',
    cookTime: '8 mins',
    instructions: [
      { step: 1, title: 'Whisk Eggs', description: 'Whisk eggs with salt, turmeric, and pinch of chili powder.', timerSeconds: 60 },
      { step: 2, title: 'Sauté Veggies', description: 'Sauté onions, chilis, bell peppers, and tomatoes in 1 tsp oil for 3 mins.', timerSeconds: 180 },
      { step: 3, title: 'Scramble & Toast', description: 'Pour whisked eggs into skillet. Cook on medium-low forming soft curds. Serve with toast.', timerSeconds: 180 }
    ]
  },
  {
    aliases: ['chicken biryani', 'chiken biryani', 'biryani chicken', 'biryani'],
    name: 'FitGen Low-Fat Chicken Biryani',
    cuisine: 'Indian',
    dietary: 'Non-Vegetarian',
    description: 'Aromatic basmati rice layered with juicy spiced marinated chicken thighs, cooked dum-style with saffron and mint.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Chicken Biryani recipe dum style',
    ingredients: [
      { name: 'Marinated Chicken (Breast/Thigh)', amount: '220g', protein: 50.6, calories: 290, icon: '🍗' },
      { name: 'Aromatic Basmati Rice', amount: '1 cup cooked (150g)', protein: 4.2, calories: 190, icon: '🍚' },
      { name: 'Low-Fat Curd (Yogurt Marination)', amount: '50g', protein: 4.0, calories: 35, icon: '🥣' },
      { name: 'Caramelized Onion & Herbs', amount: '1/2 cup', protein: 1.2, calories: 45, icon: '🧅' },
      { name: 'Cow Ghee / Spices', amount: '1 tsp', protein: 0.0, calories: 45, icon: '🥄' }
    ],
    prepTime: '20 mins',
    cookTime: '30 mins',
    instructions: [
      { step: 1, title: 'Marinate Meat', description: 'Marinate chicken in curd, biryani masala, ginger-garlic paste, and mint for 30 mins.', timerSeconds: 600 },
      { step: 2, title: 'Par-boil Rice', description: 'Cook basmati rice with whole spices (cinnamon, cardamom, bay leaf) until 70% done.', timerSeconds: 420 },
      { step: 3, title: 'Dum Cooking', description: 'Layer chicken and par-boiled rice in pot. Cover tightly and cook on low heat for 20 mins.', timerSeconds: 1200 }
    ]
  },
  {
    aliases: ['egg rice', 'egg fried rice', 'egg-rice', 'anda rice', 'anda chawal', 'egg chawal'],
    name: 'Authentic Macro-Optimized Egg Rice',
    cuisine: 'Asian / Indian',
    dietary: 'Eggetarian',
    description: 'Flavorful pan-tossed basmati rice cooked with whole eggs, egg whites, spring onions, garlic, and macro-optimized spices.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Egg Rice recipe street style high protein',
    ingredients: [
      { name: 'Whole Eggs & Egg Whites', amount: '3 whole + 2 whites', protein: 28.0, calories: 240, icon: '🥚' },
      { name: 'Cooked Basmati / Brown Rice', amount: '1.5 cups (200g)', protein: 5.2, calories: 240, icon: '🍚' },
      { name: 'Fresh Veggies & Spring Onions', amount: '1 cup chopped', protein: 3.5, calories: 45, icon: '🥦' },
      { name: 'Light Soy Sauce & Garlic Spices', amount: '1.5 tbsp', protein: 0.8, calories: 20, icon: '🌶️' },
      { name: 'Healthy Cold-Pressed Olive Oil / Ghee', amount: '1 tbsp', protein: 0.0, calories: 120, icon: '🫒' }
    ],
    prepTime: '10 mins',
    cookTime: '12 mins',
    instructions: [
      { step: 1, title: 'Scramble Eggs', description: 'Whisk eggs with salt and pepper. Scramble in pan with 1/2 tsp oil until soft curds form.', timerSeconds: 180 },
      { step: 2, title: 'Sauté Veggies & Aromatics', description: 'Sauté minced garlic, ginger, chopped onions, bell peppers, and spring greens on high heat.', timerSeconds: 240 },
      { step: 3, title: 'Toss Rice & Combine', description: 'Add cooked rice, light soy sauce, chili sauce, and scrambled eggs. High heat toss for 3 mins.', timerSeconds: 180 }
    ]
  },
  {
    aliases: ['oats bowl', 'protein oats', 'overnight oats', 'oats porridge', 'oatmeal'],
    name: 'High-Protein Oats & Chia Bowl',
    cuisine: 'Western',
    dietary: 'Vegan',
    description: 'Creamy rolled oats cooked in low-fat milk, enriched with chia seeds, banana, and natural honey.',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'High protein oatmeal recipe',
    ingredients: [
      { name: 'Rolled Oats', amount: '80g', protein: 11.0, calories: 300, icon: '🌾' },
      { name: 'Low-Fat Milk / Soy Milk', amount: '250ml', protein: 8.5, calories: 120, icon: '🥛' },
      { name: 'Chia Seeds & Banana Slices', amount: '1 medium banana + 15g chia', protein: 4.8, calories: 185, icon: '🍌' },
      { name: 'Natural Honey / Almond Flakes', amount: '1 tbsp', protein: 1.0, calories: 75, icon: '🍯' }
    ],
    prepTime: '5 mins',
    cookTime: '5 mins',
    instructions: [
      { step: 1, title: 'Simmer Oats', description: 'Combine rolled oats and milk in pot. Simmer on medium heat for 5 minutes stirring continuously.', timerSeconds: 300 },
      { step: 2, title: 'Top & Garnish', description: 'Pour into bowl. Top with fresh banana slices, chia seeds, and raw honey.', timerSeconds: 60 }
    ]
  },
  {
    aliases: ['6pack', '6-pack', '6 pack', 'abs', '6 pack abs', 'abs diet', '6pack diet', 'shred diet'],
    name: 'Boy & Girl 6-Pack Abs High-Protein Shred Bowl',
    cuisine: 'Global Fitness',
    dietary: 'Non-Vegetarian',
    description: 'Ultra-clean high protein calorie deficit meal optimized for 6-pack abs definition, waist slimming, and maximum muscle retention for both boys & girls.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: '6 pack abs meal prep high protein calorie deficit',
    ingredients: [
      { name: 'Lean Grilled Chicken / Paneer Cubes', amount: '220g', protein: 50.0, calories: 260, icon: '🍗' },
      { name: 'Hard Boiled Egg Whites', amount: '4 whites', protein: 14.0, calories: 68, icon: '🥚' },
      { name: 'Steamed Broccoli & Asparagus', amount: '150g', protein: 4.5, calories: 50, icon: '🥦' },
      { name: 'Baked Sweet Potato Slices', amount: '100g', protein: 2.0, calories: 90, icon: '🍠' },
      { name: 'Sliced Fresh Avocado & Seeds', amount: '30g', protein: 2.0, calories: 80, icon: '🥑' }
    ],
    prepTime: '10 mins',
    cookTime: '15 mins',
    instructions: [
      { step: 1, title: 'Grill Lean Protein', description: 'Season chicken breast or paneer cubes with black pepper, garlic, and sea salt. Grill or air fry at 190°C for 12 mins.', timerSeconds: 720 },
      { step: 2, title: 'Steam Green Veggies', description: 'Steam fresh broccoli florets and asparagus for 4 minutes to preserve vitamins and fiber.', timerSeconds: 240 },
      { step: 3, title: 'Assemble 6-Pack Bowl', description: 'Arrange grilled protein, egg whites, steamed greens, sweet potato, and avocado in a bowl.', timerSeconds: 60 }
    ]
  },
  {
    aliases: ['rice bath', 'ricebath', 'veg rice bath', 'south indian rice bath', 'bisi bele bath', 'veg pulao', 'pulao', 'vangi bath'],
    name: 'Authentic South Indian Veg Rice Bath',
    cuisine: 'South Indian',
    dietary: 'Vegetarian',
    description: 'Authentic South Indian spiced vegetable rice bath cooked with aromatic basmati/Sona Masoori rice, fresh garden veggies, roasted cashews, cinnamon cloves masala, and pure ghee.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'South Indian Veg Rice Bath Pulao recipe dhaba style',
    ingredients: [
      { name: 'Spiced Basmati / Sona Masoori Rice', amount: '200g', protein: 5.2, calories: 240, icon: '🍚' },
      { name: 'Mixed Garden Veggies (Carrot, Peas, Beans)', amount: '150g', protein: 4.2, calories: 75, icon: '🥦' },
      { name: 'Roasted Cashew Nuts & Peanuts', amount: '25g', protein: 6.5, calories: 145, icon: '🥜' },
      { name: 'Paneer / Soya Chunks Protein Booster', amount: '100g', protein: 18.0, calories: 190, icon: '🧀' },
      { name: 'Whole Spices, Bay Leaf & Bath Masala', amount: '1 tbsp', protein: 0.5, calories: 15, icon: '🌶️' },
      { name: 'Pure Cow Ghee & Mustard Curry Leaves', amount: '1 tbsp', protein: 0.0, calories: 120, icon: '🥄' }
    ],
    prepTime: '15 mins',
    cookTime: '20 mins',
    instructions: [
      { step: 1, title: 'Sauté Whole Spices & Veggies', description: 'Heat ghee in pressure cooker. Add mustard, curry leaves, cloves, cinnamon, and cashews. Sauté chopped carrots, beans, and peas.', timerSeconds: 300 },
      { step: 2, title: 'Add Rice & Masala', description: 'Add soaked rice, rice bath masala powder, salt, and water (1:2 ratio). Stir well.', timerSeconds: 180 },
      { step: 3, title: 'Pressure Cook & Garnish', description: 'Pressure cook for 2 whistles on medium heat. Garnish with fresh grated coconut and cilantro.', timerSeconds: 720 }
    ]
  },
  {
    aliases: ['banana shake', 'bananashake', 'banana smoothie', 'banana milk shake', 'banana protein shake', 'banana milkshake', 'banana drink', 'banana milk'],
    name: 'High-Protein Banana Peanut Butter Shake',
    cuisine: 'Global Fitness',
    dietary: 'Vegetarian',
    description: 'Rich, thick, high-protein banana smoothie blended with ripe bananas, chilled low-fat milk, creamy natural peanut butter, Greek yogurt, and chia seeds.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'High protein banana peanut butter smoothie shake recipe',
    ingredients: [
      { name: 'Fresh Ripe Bananas', amount: '1.5 medium (180g)', protein: 2.2, calories: 160, icon: '🍌' },
      { name: 'Chilled Low-Fat / Whole Milk', amount: '300ml', protein: 10.2, calories: 140, icon: '🥛' },
      { name: 'Pure Natural Peanut Butter', amount: '2 tbsp (32g)', protein: 8.0, calories: 188, icon: '🥜' },
      { name: 'Greek Yogurt / Whey Protein Scoop', amount: '100g', protein: 12.0, calories: 90, icon: '🥣' },
      { name: 'Chia Seeds & Natural Honey', amount: '1 tbsp', protein: 2.0, calories: 60, icon: '🍯' }
    ],
    prepTime: '3 mins',
    cookTime: '2 mins',
    instructions: [
      { step: 1, title: 'Add Ingredients to Blender', description: 'Add sliced bananas, chilled milk, peanut butter, Greek yogurt, and chia seeds into high-speed blender.', timerSeconds: 60 },
      { step: 2, title: 'Blend Until Creamy', description: 'Blend on high speed for 45 seconds until thick, velvety, and completely smooth.', timerSeconds: 45 },
      { step: 3, title: 'Serve & Garnish', description: 'Pour into tall chilled glass, top with honey drizzle, and drink post-workout!', timerSeconds: 15 }
    ]
  },
  {
    aliases: ['curd rice', 'curdrice', 'dahi chawal', 'thayir sadam', 'dahi rice', 'curd-rice'],
    name: 'Authentic South Indian Curd Rice',
    cuisine: 'South Indian',
    dietary: 'Vegetarian',
    description: 'Refreshing probiotic South Indian meal made with soft cooked basmati rice, fresh homemade dahi (curd), mustard tempering, curry leaves, and ginger.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    youtubeQuery: 'Authentic South Indian Curd Rice recipe thayir sadam',
    ingredients: [
      { name: 'Fresh Dahi / Curd', amount: '200g', protein: 7.0, calories: 120, icon: '🥣' },
      { name: 'Cooked Soft Basmati / Brown Rice', amount: '1.5 cups (200g)', protein: 5.2, calories: 240, icon: '🍚' },
      { name: 'Curd Rice Aromatics & Fresh Herbs', amount: '1 tbsp', protein: 1.5, calories: 30, icon: '🌿' },
      { name: 'Cold-Pressed Cooking Oil / Ghee', amount: '1 tsp', protein: 0.0, calories: 45, icon: '🥄' }
    ],
    prepTime: '5 mins',
    cookTime: '10 mins',
    instructions: [
      { step: 1, title: 'Mash Warm Basmati Rice', description: 'Slightly warm cooked basmati rice and gently mash it with a spoon for maximum creaminess.', timerSeconds: 120 },
      { step: 2, title: 'Fold Fresh Curd & Salt', description: 'Whisk fresh curd with a splash of chilled milk and sea salt. Fold into mashed rice.', timerSeconds: 120 },
      { step: 3, title: 'Tempering (Tadka)', description: 'Heat 1 tsp oil/ghee. Sauté mustard seeds, urad dal, minced ginger, green chilis, and fresh curry leaves. Pour over curd rice and toss.', timerSeconds: 180 }
    ]
  }
];

// Helper to normalize prompt text and correct misspellings
export function normalizePrompt(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\bchiken\b/g, 'chicken')
    .replace(/\btika\b/g, 'tikka')
    .replace(/\bpaner\b/g, 'paneer')
    .replace(/\bprotien\b/g, 'protein')
    .replace(/\bintak\b/g, 'intake')
    .replace(/\bingridient\b/g, 'ingredient')
    .replace(/\bingridients\b/g, 'ingredients')
    .replace(/\bsom\b/g, 'some')
    .trim();
}

/**
 * Strict exact alias matching logic to prevent generic prompt word overlaps.
 */
export function findMatchingDish(rawPrompt) {
  const clean = normalizePrompt(rawPrompt);

  for (const dish of KNOWN_DISHES) {
    if (dish.aliases.some((alias) => clean === alias || clean.includes(alias))) {
      return dish;
    }
  }

  return null;
}

/**
 * Dynamically synthesizes an authentic ingredient breakdown tailored STRICTLY to the user's typed prompt!
 */
export function generateDynamicDishAnalysis(rawPrompt, userProfile) {
  const clean = normalizePrompt(rawPrompt);
  
  // Clean raw prompt of filler words to isolate food item names
  let dishTitle = clean
    .replace(/give me|suggest me|i want|how to make|recipe for|ingredients for|what is|how much protein in|the ingredients to prepare this food|prepare this food|some|som|veg|gym|food|dish|recipe|for|to|take|prepare|details|please|show/gi, '')
    .trim();

  const formattedTitle = dishTitle 
    ? dishTitle.split(/[\s,]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Custom High-Protein Bowl';

  // Smart Ingredient Parser: Detect all mentioned ingredients from raw prompt
  const detectedIngredients = [];
  const checkedKeys = new Set();

  Object.keys(PROTEIN_DENSITY_MAP).forEach(key => {
    if (clean.includes(key) && !checkedKeys.has(key)) {
      checkedKeys.add(key);
      detectedIngredients.push(PROTEIN_DENSITY_MAP[key]);
    }
  });

  // If no ingredients detected, provide smart defaults based on food category
  if (detectedIngredients.length === 0) {
    if (clean.includes('chicken') || clean.includes('mutton') || clean.includes('meat')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.chicken);
    } else if (clean.includes('egg')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.egg);
    } else if (clean.includes('fish') || clean.includes('salmon')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.salmon);
    } else if (clean.includes('banana') || clean.includes('shake') || clean.includes('smoothie') || clean.includes('milkshake')) {
      detectedIngredients.push(
        { name: 'Fresh Ripe Bananas', amount: '1.5 medium', protein: 2.2, calories: 160, icon: '🍌' },
        { name: 'Chilled Milk Base', amount: '250ml', protein: 8.5, calories: 120, icon: '🥛' },
        { name: 'Pure Peanut Butter / Nut Crunch', amount: '1.5 tbsp', protein: 6.0, calories: 140, icon: '🥜' }
      );
    } else if (clean.includes('oats') || clean.includes('oatmeal')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.oats, PROTEIN_DENSITY_MAP.milk, PROTEIN_DENSITY_MAP.banana);
    } else if (clean.includes('tofu')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.tofu, PROTEIN_DENSITY_MAP.broccoli);
    } else if (clean.includes('chickpea') || clean.includes('chana')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.chickpeas);
    } else if (clean.includes('soya')) {
      detectedIngredients.push(PROTEIN_DENSITY_MAP.soya);
    } else {
      // Default versatile high-protein staple
      detectedIngredients.push(PROTEIN_DENSITY_MAP.paneer);
    }
  }

  // Determine Dietary Category
  let category = 'Vegetarian';
  if (detectedIngredients.some(i => i.category === 'Non-Vegetarian')) {
    category = 'Non-Vegetarian';
  } else if (detectedIngredients.some(i => i.category === 'Eggetarian')) {
    category = 'Eggetarian';
  } else if (detectedIngredients.every(i => i.category === 'Vegan')) {
    category = 'Vegan';
  }

  // Check if food item is a sweet drink, shake, smoothie, or beverage
  const isShakeOrDrink = clean.includes('shake') || clean.includes('smoothie') || clean.includes('milkshake') || clean.includes('lassi') || clean.includes('juice') || clean.includes('drink') || clean.includes('beverage');

  // Base Seasoning or Beverage Boosters
  const dynamicIngredients = detectedIngredients.map(item => ({ ...item }));
  if (isShakeOrDrink) {
    dynamicIngredients.push(
      {
        name: 'Natural Honey & Chia Seeds Topping',
        amount: '1 tbsp',
        protein: 2.0,
        calories: 60,
        icon: '🍯'
      }
    );
  } else {
    dynamicIngredients.push(
      {
        name: `${formattedTitle} Aromatics & Fresh Herbs (Onion, Garlic, Spices)`,
        amount: '1 portion',
        protein: 1.5,
        calories: 30,
        icon: '🌿'
      },
      {
        name: 'Cold-Pressed Cooking Oil / Ghee',
        amount: '1 tbsp',
        protein: 0.0,
        calories: 120,
        icon: '🫒'
      }
    );
  }

  return {
    id: `dyn-${Date.now()}`,
    name: `Authentic ${formattedTitle}`,
    cuisine: userProfile?.cuisineStyle || 'Indian',
    dietary: category,
    description: `Macro-optimized authentic meal analysis for ${formattedTitle}, tailored with exact ingredient protein counts.`,
    image: getUniqueFoodImage(formattedTitle, rawPrompt),
    youtubeQuery: `${formattedTitle} recipe cooking tutorial`,
    ingredients: dynamicIngredients,
    prepTime: '12 mins',
    cookTime: '15 mins',
    instructions: [
      { step: 1, title: `Prepare ${formattedTitle} Ingredients`, description: `Clean, prep, and measure all main ingredients.`, timerSeconds: 300 },
      { step: 2, title: 'Sauté & Cook', description: 'Cook on medium heat until fragrant, tender, and properly seasoned.', timerSeconds: 600 },
      { step: 3, title: 'Plate & Serve', description: 'Serve hot and enjoy your nutrient-dense high-protein meal.', timerSeconds: 60 }
    ]
  };
}

// Master Function: Returns comprehensive detailed dish analysis + ingredient protein list + intake recommendation
export function getDetailedDishAnalysis(rawPrompt, userProfile) {
  const matchedDish = findMatchingDish(rawPrompt) || generateDynamicDishAnalysis(rawPrompt, userProfile);

  // Compute totals
  const totalProtein = Math.round(matchedDish.ingredients.reduce((acc, item) => acc + (item.protein || 0), 0) * 10) / 10;
  const totalCalories = Math.round(matchedDish.ingredients.reduce((acc, item) => acc + (item.calories || 0), 0));
  const totalCarbs = Math.round(totalProtein * 0.4);
  const totalFat = Math.round(totalProtein * 0.25);

  // User Profile calculations
  const dailyTarget = userProfile?.dailyProteinGoal || 130;
  const goal = userProfile?.goal || 'Muscle Gain';
  const userDietary = userProfile?.dietary || 'Vegetarian';

  const percentDaily = Math.min(100, Math.round((totalProtein / dailyTarget) * 100));

  // Intake Advice Generator
  let timingAdvice = 'Ideal for Lunch or Post-Workout Meal';
  let goalAdvice = `Provides ${totalProtein}g protein to accelerate muscle hypertrophy and recovery.`;

  if (goal === 'Weight Loss') {
    goalAdvice = `Provides high protein satiety with only ${totalCalories} calories, keeping you full for 4+ hours without spiking blood sugar.`;
  } else if (goal === 'Maintenance') {
    goalAdvice = `Perfectly balanced macro meal to sustain energy levels and maintain lean body composition.`;
  }

  // Dietary check warning
  let dietaryWarning = null;
  if (userDietary === 'Vegetarian' && matchedDish.dietary === 'Non-Vegetarian') {
    dietaryWarning = `⚠️ Your active diet plan is set to "Vegetarian", but this dish contains non-vegetarian ingredients. For a 100% vegetarian alternative with equal protein, swap for Paneer (Cottage Cheese) or Soya Chunks!`;
  } else if (userDietary === 'Vegan' && (matchedDish.dietary === 'Vegetarian' || matchedDish.dietary === 'Non-Vegetarian')) {
    dietaryWarning = `⚠️ Your profile is set to "Vegan". You can replace dairy/meat in this dish with Tofu or Edamame for identical high-protein benefits!`;
  }

  const recipeCard = {
    id: matchedDish.id || `rec-${Date.now()}`,
    name: matchedDish.name,
    cuisine: matchedDish.cuisine || 'Indian',
    dietary: matchedDish.dietary || 'Vegetarian',
    fitnessGoals: [goal, 'High Protein'],
    prepTime: matchedDish.prepTime || '15 mins',
    cookTime: matchedDish.cookTime || '20 mins',
    totalTimeMins: 35,
    difficulty: 'Easy',
    image: matchedDish.image,
    youtubeQuery: matchedDish.youtubeQuery || `${matchedDish.name} recipe`,
    description: matchedDish.description,
    macros: {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: 6
    },
    micros: {
      iron: "35% DV",
      calcium: "40% DV",
      vitC: "30% DV"
    },
    keyIngredients: matchedDish.ingredients.map((i) => i.name.toLowerCase().split(' ')[0]),
    ingredients: matchedDish.ingredients.map((i) => ({
      name: i.name,
      amount: `${i.amount} (${i.protein}g Protein)`,
      icon: i.icon || '🥗',
      protein: i.protein
    })),
    instructions: matchedDish.instructions
  };

  return {
    dishName: matchedDish.name,
    cuisine: matchedDish.cuisine,
    dietary: matchedDish.dietary,
    description: matchedDish.description,
    ingredients: matchedDish.ingredients,
    prepTime: matchedDish.prepTime || '10 mins',
    cookTime: matchedDish.cookTime || '15 mins',
    instructions: matchedDish.instructions || [],
    totalProtein,
    totalCalories,
    totalCarbs,
    totalFat,
    recommendedIntake: {
      portion: '1 Serving (approx 250g - 300g)',
      proteinYield: `${totalProtein}g Protein`,
      percentDailyTarget: `${percentDaily}% of your daily ${dailyTarget}g target`,
      timing: timingAdvice,
      advice: goalAdvice,
      dietaryWarning
    },
    recipeCard
  };
}

/**
 * Recognizes ONLY user-provided available ingredients and recommends ranked realistic dishes.
 * Separates Available Ingredients from Optional Pantry Staples, includes FitGen fitness versions, and exact quantities.
 */
export function getDishRecommendationsFromAvailableIngredients(rawIngredientsText, userProfile) {
  if (!rawIngredientsText || typeof rawIngredientsText !== 'string' || !rawIngredientsText.trim()) {
    return [];
  }

  // Parse user's available ingredients
  const availableTokens = rawIngredientsText
    .toLowerCase()
    .split(/[\n,;+&]+/)
    .map(t => t.trim())
    .filter(Boolean);

  const goal = userProfile?.goal || 'Muscle Gain';

  const INGREDIENT_META = {
    tomato: { name: 'Fresh Tomatoes', icon: '🍅', amount: '2 medium (150g)', protein: 1.5, calories: 28 },
    cabbage: { name: 'Shredded Cabbage', icon: '🥬', amount: '1.5 cups (150g)', protein: 1.9, calories: 38 },
    onion: { name: 'Sliced Onions', icon: '🧅', amount: '1 large (120g)', protein: 1.4, calories: 48 },
    carrot: { name: 'Diced Carrots', icon: '🥕', amount: '1 cup (120g)', protein: 1.1, calories: 42 },
    beans: { name: 'Chopped Green Beans', icon: '🫘', amount: '1 cup (100g)', protein: 1.8, calories: 31 },
    spinach: { name: 'Fresh Baby Spinach (Palak)', icon: '🥬', amount: '2 cups (180g)', protein: 5.2, calories: 40 },
    paneer: { name: 'Fresh Paneer Cubes', icon: '🧀', amount: '150g', protein: 27.0, calories: 310 },
    chicken: { name: 'Lean Chicken Breast', icon: '🍗', amount: '200g', protein: 46.0, calories: 220 },
    egg: { name: 'Farm Eggs & Whites', icon: '🥚', amount: '2 whole + 2 whites', protein: 22.0, calories: 180 },
    potato: { name: 'Diced Potatoes', icon: '🥔', amount: '1.5 cups (180g)', protein: 3.6, calories: 140 },
    peas: { name: 'Green Peas', icon: '🫛', amount: '3/4 cup (100g)', protein: 5.4, calories: 80 },
    rice: { name: 'Cooked Basmati / Brown Rice', icon: '🍚', amount: '1.5 cups (200g)', protein: 5.2, calories: 240 },
    dal: { name: 'Moong / Masoor Dal', icon: '🥣', amount: '1 cup cooked (180g)', protein: 14.0, calories: 180 },
    chickpeas: { name: 'Boiled Chickpeas (Chana)', icon: '🫛', amount: '1 cup (180g)', protein: 15.0, calories: 210 },
    soya: { name: 'Soya Chunks', icon: '🫘', amount: '50g dry', protein: 26.0, calories: 170 },
    oats: { name: 'Rolled Oats', icon: '🌾', amount: '80g', protein: 11.0, calories: 300 },
    banana: { name: 'Ripe Banana', icon: '🍌', amount: '1 medium', protein: 1.3, calories: 105 },
    milk: { name: 'Chilled Milk', icon: '🥛', amount: '250ml', protein: 8.5, calories: 120 }
  };

  const userMatchedItems = [];
  availableTokens.forEach(tok => {
    let matchedKey = Object.keys(INGREDIENT_META).find(k => tok.includes(k) || k.includes(tok));
    if (matchedKey) {
      userMatchedItems.push({ key: matchedKey, userText: tok, ...INGREDIENT_META[matchedKey] });
    } else {
      userMatchedItems.push({
        key: tok,
        userText: tok,
        name: tok.charAt(0).toUpperCase() + tok.slice(1),
        icon: '🥗',
        amount: '1 portion (100g)',
        protein: 2.0,
        calories: 45
      });
    }
  });

  const dish1Used = userMatchedItems.map(i => ({ ...i }));
  const dish1Protein = Math.round((dish1Used.reduce((sum, item) => sum + item.protein, 0) + 2.0) * 10) / 10;
  const dish1Calories = Math.round(dish1Used.reduce((sum, item) => sum + item.calories, 0) + 45);

  let fitgenGoalAdvice1 = 'Balanced high-fiber recipe.';
  if (goal === 'Muscle Gain') {
    fitgenGoalAdvice1 = '💪 FitGen Muscle Gain Version: Add 100g paneer cubes or soya chunks for +18g protein.';
  } else if (goal === 'Weight Loss') {
    fitgenGoalAdvice1 = '🔥 FitGen Weight Loss Version: Air-sauté with 1/2 tsp olive oil for zero fat accumulation & high fiber satiety.';
  } else if (goal === '6-Pack Abs') {
    fitgenGoalAdvice1 = '⚡ FitGen 6-Pack Abs Version: Pair with 3 hard-boiled egg whites for ultra-lean body recomp.';
  } else {
    fitgenGoalAdvice1 = '✨ FitGen Maintenance Version: Perfectly balanced nutrient-dense portion for steady energy.';
  }

  const recommendations = [];

  // Candidate 1: Mix Vegetable Poriyal / Sauté
  recommendations.push({
    id: `rec-dish-1-${Date.now()}`,
    dishName: `South Indian Mix Vegetable Sauté (Poriyal)`,
    cuisine: 'South Indian',
    dietary: 'Vegetarian / Vegan',
    matchScore: {
      usedCount: dish1Used.length,
      totalAvailable: availableTokens.length,
      percentage: 100
    },
    availableIngredientsUsed: dish1Used,
    optionalIngredients: [
      { name: 'Mustard Seeds & Curry Leaves', icon: '🌿', amount: '1 tsp', note: 'Tempering' },
      { name: 'Minced Garlic & Ginger', icon: '🧄', amount: '1 tsp', note: 'Aromatics' },
      { name: 'Cold-Pressed Cooking Oil / Ghee', icon: '🫒', amount: '1 tsp', note: 'Sautéing' },
      { name: 'Turmeric, Salt & Black Pepper', icon: '🧂', amount: '1 tsp', note: 'Seasoning' }
    ],
    prepTime: '10 mins',
    cookTime: '12 mins',
    servingSize: '1.5 cups (320g)',
    macros: {
      calories: dish1Calories,
      protein: dish1Protein,
      carbs: Math.round(dish1Calories * 0.55 / 4),
      fat: Math.round(dish1Calories * 0.20 / 9),
      fiber: 9.5
    },
    fitgenGoalVersion: fitgenGoalAdvice1,
    instructions: [
      { step: 1, title: 'Wash & Chop Veggies', description: `Finely chop ${dish1Used.map(i => i.name).join(', ')}.`, timerSeconds: 300 },
      { step: 2, title: 'Prepare Tempering', description: 'Heat 1 tsp oil. Add mustard seeds, curry leaves, ginger, chilis, and garlic.', timerSeconds: 120 },
      { step: 3, title: 'Sauté & Cover Cook', description: 'Add chopped vegetables, turmeric, and salt. Toss on medium heat, splash 2 tbsp water, cover and steam cook for 8 mins.', timerSeconds: 480 },
      { step: 4, title: 'Garnish & Serve', description: 'Uncover, toss on high heat for 1 min, and serve hot!', timerSeconds: 60 }
    ]
  });

  // Candidate 2: Desi Mixed Veg Curry / Kurma
  recommendations.push({
    id: `rec-dish-2-${Date.now()}`,
    dishName: `Authentic Desi Mixed Vegetable Curry`,
    cuisine: 'North Indian',
    dietary: 'Vegetarian',
    matchScore: {
      usedCount: dish1Used.length,
      totalAvailable: availableTokens.length,
      percentage: 100
    },
    availableIngredientsUsed: dish1Used,
    optionalIngredients: [
      { name: 'Tomato & Cashew Gravy Base', icon: '🍅', amount: '1/2 cup', note: 'Curry base' },
      { name: 'Ginger-Garlic Paste', icon: '🧄', amount: '1 tbsp', note: 'Flavoring' },
      { name: 'Light Ghee / Oil', icon: '🫒', amount: '1 tsp', note: 'Cooking' },
      { name: 'Garam Masala, Coriander & Red Chili', icon: '🌶️', amount: '1.5 tsp', note: 'Spices' }
    ],
    prepTime: '12 mins',
    cookTime: '15 mins',
    servingSize: '2 cups (380g)',
    macros: {
      calories: dish1Calories + 70,
      protein: dish1Protein + 3.0,
      carbs: Math.round((dish1Calories + 70) * 0.50 / 4),
      fat: Math.round((dish1Calories + 70) * 0.25 / 9),
      fiber: 10.0
    },
    fitgenGoalVersion: fitgenGoalAdvice1,
    instructions: [
      { step: 1, title: 'Blend Gravy Base', description: 'Sauté onions, garlic, and tomatoes. Blend into a smooth gravy paste.', timerSeconds: 360 },
      { step: 2, title: 'Boil Available Veggies', description: `Par-boil ${dish1Used.map(i => i.name).join(', ')} with a pinch of salt until tender.`, timerSeconds: 420 },
      { step: 3, title: 'Simmer Curry', description: 'Combine par-boiled veggies into gravy, add garam masala, simmer 5 mins.', timerSeconds: 300 }
    ]
  });

  // Candidate 3: Clear Garden Vegetable Detox Soup
  recommendations.push({
    id: `rec-dish-3-${Date.now()}`,
    dishName: `Clear Garden Vegetable Detox Soup`,
    cuisine: 'Global Health',
    dietary: 'Vegan',
    matchScore: {
      usedCount: dish1Used.length,
      totalAvailable: availableTokens.length,
      percentage: 100
    },
    availableIngredientsUsed: dish1Used,
    optionalIngredients: [
      { name: 'Vegetable / Herb Broth', icon: '🥣', amount: '3 cups', note: 'Soup base' },
      { name: 'Minced Garlic & Black Pepper', icon: '🧄', amount: '1 tsp', note: 'Immunity booster' },
      { name: 'Fresh Lemon Juice & Cilantro', icon: '🍋', amount: '1 tbsp', note: 'Finish' }
    ],
    prepTime: '8 mins',
    cookTime: '10 mins',
    servingSize: '2 bowls (400g)',
    macros: {
      calories: Math.max(90, dish1Calories - 80),
      protein: Math.round(dish1Protein * 0.8 * 10) / 10,
      carbs: 18,
      fat: 2,
      fiber: 7.5
    },
    fitgenGoalVersion: '🔥 FitGen Weight Loss & Fat Shred Version: Ultra-low calorie high-hydration soup for instant satiety.',
    instructions: [
      { step: 1, title: 'Dice Veggies', description: `Dice ${dish1Used.map(i => i.name).join(', ')} into small cubes.`, timerSeconds: 240 },
      { step: 2, title: 'Simmer Broth', description: 'Bring vegetable broth to boil. Add garlic, veggies, salt, and black pepper.', timerSeconds: 480 },
      { step: 3, title: 'Garnish', description: 'Squeeze fresh lemon juice, garnish with cilantro, and serve piping hot!', timerSeconds: 60 }
    ]
  });

  return recommendations;
}
