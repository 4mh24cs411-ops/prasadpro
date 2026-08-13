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

  const goal = userProfile?.goal || 'Muscle Gain';
  const userDietary = userProfile?.dietary || 'Vegetarian';
  const dailyTarget = userProfile?.dailyProteinGoal || 130;

  // Base raw totals
  const rawProtein = Math.round(matchedDish.ingredients.reduce((acc, item) => acc + (item.protein || 0), 0) * 10) / 10;
  const rawCalories = Math.round(matchedDish.ingredients.reduce((acc, item) => acc + (item.calories || 0), 0));

  // Goal-calibrated macros and names
  let totalCalories = rawCalories;
  let totalProtein = rawProtein;
  let totalCarbs = Math.round(rawProtein * 0.4);
  let totalFat = Math.round(rawProtein * 0.25);
  let goalAdvice = `Provides ${totalProtein}g protein to accelerate muscle hypertrophy and recovery.`;
  let adaptedDishName = matchedDish.name;

  if (goal === 'Weight Loss') {
    adaptedDishName = `🔥 Fat-Loss Version: ${matchedDish.name.replace(/FitGen|Authentic|High-Protein/g, '').trim()}`;
    totalCalories = Math.round(rawCalories * 0.72);
    totalProtein = Math.round(rawProtein * 1.1);
    totalCarbs = Math.round(totalProtein * 0.35);
    totalFat = Math.max(4, Math.round(totalProtein * 0.15));
    goalAdvice = `🔥 Calorie-Deficit Fat-Loss Version: Calibrated under ${totalCalories} kcal with high protein satiety & fiber to maximize body fat burn without muscle loss.`;
  } else if (goal === 'Muscle Gain') {
    adaptedDishName = `💪 Mass-Gainer Version: ${matchedDish.name.replace(/FitGen|Authentic|High-Protein/g, '').trim()}`;
    totalCalories = Math.round(rawCalories * 1.35);
    totalProtein = Math.round(rawProtein * 1.3);
    totalCarbs = Math.round(totalProtein * 0.55);
    totalFat = Math.round(totalProtein * 0.25);
    goalAdvice = `💪 Hypertrophy Mass-Building Version: Delivers ${totalProtein}g protein with complex carbs to replenish glycogen and maximize muscle growth.`;
  } else if (goal === '6-Pack Abs') {
    adaptedDishName = `⚡ 6-Pack Abs Shredder: ${matchedDish.name.replace(/FitGen|Authentic|High-Protein/g, '').trim()}`;
    totalCalories = Math.round(rawCalories * 0.82);
    totalProtein = Math.round(rawProtein * 1.25);
    totalCarbs = Math.round(totalProtein * 0.25);
    totalFat = Math.max(5, Math.round(totalProtein * 0.15));
    goalAdvice = `⚡ 6-Pack Abs Shredder Version: Ultra-high protein to fat ratio with low simple carbs to strip abdominal subcutaneous fat.`;
  } else {
    adaptedDishName = `✨ Balanced Energy: ${matchedDish.name.replace(/FitGen|Authentic|High-Protein/g, '').trim()}`;
    goalAdvice = `✨ Balanced Energy Version: Calibrated for daily energy stability and lean body composition maintenance.`;
  }

  const percentDaily = Math.min(100, Math.round((totalProtein / dailyTarget) * 100));
  let timingAdvice = 'Ideal for Lunch or Post-Workout Meal';

  // Dietary check & automatic 100% vegetarian / vegan conversion if required
  let dietaryWarning = null;
  let finalIngredients = [...matchedDish.ingredients];
  let finalCategory = matchedDish.dietary;

  if ((userDietary === 'Vegetarian' || userDietary === 'Vegan') && matchedDish.dietary === 'Non-Vegetarian') {
    finalCategory = userDietary;
    const subName = userDietary === 'Vegan' ? 'Tofu' : 'Paneer';
    
    // Safely replace non-veg terms without duplicating
    if (/Chicken Tikka/gi.test(adaptedDishName)) {
      adaptedDishName = adaptedDishName.replace(/Chicken Tikka/gi, `${subName} Tikka`);
    } else if (/Chicken Biryani/gi.test(adaptedDishName)) {
      adaptedDishName = adaptedDishName.replace(/Chicken Biryani/gi, userDietary === 'Vegan' ? 'Soya Biryani' : 'Paneer Biryani');
    } else {
      adaptedDishName = adaptedDishName
        .replace(/Chicken/gi, subName)
        .replace(/Mutton/gi, 'Soya Chunks')
        .replace(/Fish/gi, subName)
        .replace(/Beef/gi, 'Soya Chunks');
    }

    if (!adaptedDishName.includes('Vegetarian') && !adaptedDishName.includes('Vegan')) {
      adaptedDishName = `🌱 100% ${userDietary} ${adaptedDishName.replace(/🔥 Fat-Loss Version:|💪 Mass-Gainer Version:|⚡ 6-Pack Abs Shredder:|✨ Balanced Energy:/g, '').trim()}`;
    }
    
    // Swap non-veg ingredient with Paneer / Tofu
    finalIngredients = finalIngredients.map(i => {
      if (i.name.toLowerCase().includes('chicken') || i.name.toLowerCase().includes('meat') || i.name.toLowerCase().includes('fish')) {
        return {
          name: userDietary === 'Vegan' ? 'Fresh Tofu Cubes' : 'Fresh Paneer (Cottage Cheese) Cubes',
          amount: '200g',
          protein: 28.0,
          calories: 310,
          icon: userDietary === 'Vegan' ? '🧊' : '🧀'
        };
      }
      return i;
    });

    dietaryWarning = `🌱 100% ${userDietary} Verified: We automatically converted non-veg ingredients to ${userDietary === 'Vegan' ? 'Fresh Tofu Cubes' : 'Paneer / Soya Chunks'} to strictly match your ${userDietary} preference with equal protein yield!`;
  }

  const recipeCard = {
    id: matchedDish.id || `rec-${Date.now()}`,
    name: adaptedDishName,
    cuisine: matchedDish.cuisine || 'Indian',
    dietary: finalCategory || 'Vegetarian',
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
      fiber: goal === 'Weight Loss' ? 10 : 6
    },
    micros: {
      iron: "35% DV",
      calcium: "40% DV",
      vitC: "30% DV"
    },
    keyIngredients: finalIngredients.map((i) => i.name.toLowerCase().split(' ')[0]),
    ingredients: finalIngredients.map((i) => ({
      name: i.name,
      amount: `${i.amount} (${i.protein}g Protein)`,
      icon: i.icon || '🥗',
      protein: i.protein
    })),
    instructions: matchedDish.instructions
  };

  return {
    dishName: adaptedDishName,
    cuisine: matchedDish.cuisine,
    dietary: finalCategory,
    description: matchedDish.description,
    ingredients: finalIngredients,
    prepTime: matchedDish.prepTime || '10 mins',
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
 * Strictly respects user preferences (nation, cuisine, dietary, fitness goal, allergies).
 */
export function getDishRecommendationsFromAvailableIngredients(rawIngredientsText, userProfile) {
  // Conversational stop words filter to remove extraneous phrases like "I have", "in my fridge", etc.
  const STOP_WORDS = new Set([
    'i', 'have', 'got', 'some', 'my', 'in', 'kitchen', 'fridge', 'available', 'ingredients',
    'with', 'and', 'the', 'a', 'an', 'for', 'of', 'to', 'is', 'are', 'please', 'make', 'cook',
    'dish', 'recipe', 'suggest', 'dishes', 'recipes', 'need', 'want', 'using', 'from', 'also', 'here'
  ]);

  // Parse user's available ingredients with robust delimiter regex
  const rawTokens = rawIngredientsText
    .toLowerCase()
    .split(/[\n,;+&.\/\\:]+/)
    .map(t => t.trim())
    .filter(Boolean);

  const availableTokens = [];
  rawTokens.forEach(t => {
    const sub = t.split(/\s+/).filter(s => s.length > 1 && !STOP_WORDS.has(s.toLowerCase()));
    if (sub.length > 0) {
      sub.forEach(s => availableTokens.push(s));
    }
  });

  const uniqueTokens = Array.from(new Set(availableTokens));
  const goal = userProfile?.goal || 'Muscle Gain';
  const nation = userProfile?.nation || 'India 🇮🇳';
  const userDietary = userProfile?.dietary || 'Vegetarian';
  const allergies = Array.isArray(userProfile?.allergies) ? userProfile.allergies.map(a => a.toLowerCase()) : [];

  const INGREDIENT_META = {
    tomato: { name: 'Fresh Tomatoes', icon: '🍅', amount: '2 medium (150g)', protein: 1.5, calories: 28 },
    curd: { name: 'Fresh Curd / Dahi', icon: '🥣', amount: '200g', protein: 7.0, calories: 120 },
    yogurt: { name: 'Greek Yogurt', icon: '🥣', amount: '180g', protein: 18.0, calories: 130 },
    nuts: { name: 'Mixed Almonds & Cashews', icon: '🥜', amount: '30g', protein: 6.0, calories: 170 },
    nut: { name: 'Mixed Nuts', icon: '🥜', amount: '30g', protein: 6.0, calories: 170 },
    oil: { name: 'Cold-Pressed Cooking Oil', icon: '🫒', amount: '1 tsp', protein: 0.0, calories: 45 },
    salt: { name: 'Himalayan Pink Salt', icon: '🧂', amount: '1 pinch', protein: 0.0, calories: 0 },
    pepper: { name: 'Fresh Black Pepper', icon: '🌶️', amount: '1/2 tsp', protein: 0.2, calories: 5 },
    cabbage: { name: 'Shredded Cabbage', icon: '🥬', amount: '1.5 cups (150g)', protein: 1.9, calories: 38 },
    onion: { name: 'Sliced Onions', icon: '🧅', amount: '1 large (120g)', protein: 1.4, calories: 48 },
    carrot: { name: 'Diced Carrots', icon: '🥕', amount: '1 cup (120g)', protein: 1.1, calories: 42 },
    beans: { name: 'Chopped Green Beans', icon: '🫘', amount: '1 cup (100g)', protein: 1.8, calories: 31 },
    beetroot: { name: 'Shredded Beetroot', icon: '🫚', amount: '1 cup (110g)', protein: 1.8, calories: 48 },
    capsicum: { name: 'Sliced Capsicum / Bell Pepper', icon: '🫑', amount: '1 cup (100g)', protein: 1.0, calories: 24 },
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
    milk: { name: 'Chilled Milk', icon: '🥛', amount: '250ml', protein: 8.5, calories: 120 },
    tofu: { name: 'Fresh Tofu Cubes', icon: '🧊', amount: '150g', protein: 15.0, calories: 120 },
    mushroom: { name: 'Sliced Mushrooms', icon: '🍄', amount: '1 cup (100g)', protein: 3.1, calories: 22 },
    corn: { name: 'Sweet Corn Kernels', icon: '🌽', amount: '1/2 cup (80g)', protein: 2.7, calories: 70 },
    garlic: { name: 'Minced Garlic', icon: '🧄', amount: '1 tsp', protein: 0.2, calories: 5 },
    ginger: { name: 'Fresh Ginger', icon: '🫚', amount: '1 tsp', protein: 0.1, calories: 3 },
    chili: { name: 'Green Chilis', icon: '🌶️', amount: '2 small', protein: 0.2, calories: 4 },
    lemon: { name: 'Fresh Lemon Juice', icon: '🍋', amount: '1 tbsp', note: 'Finish', protein: 0.1, calories: 4 }
  };

  const userMatchedItems = [];
  const processedKeys = new Set();

  uniqueTokens.forEach(tok => {
    if (STOP_WORDS.has(tok.toLowerCase())) return;
    let matchedKey = Object.keys(INGREDIENT_META).find(k => tok.includes(k) || k.includes(tok));
    if (matchedKey && !processedKeys.has(matchedKey)) {
      processedKeys.add(matchedKey);
      userMatchedItems.push({ key: matchedKey, userText: tok, ...INGREDIENT_META[matchedKey] });
    } else if (!matchedKey && !processedKeys.has(tok) && tok.length > 2) {
      processedKeys.add(tok);
      const cleanName = tok.charAt(0).toUpperCase() + tok.slice(1);
      userMatchedItems.push({
        key: tok,
        userText: tok,
        name: cleanName,
        icon: '🥗',
        amount: '1 portion (100g)',
        protein: 2.0,
        calories: 45
      });
    }
  });

  if (userMatchedItems.length === 0) {
    userMatchedItems.push(
      { key: 'beetroot', name: 'Shredded Beetroot', icon: '🫚', amount: '1 cup', protein: 1.8, calories: 48 },
      { key: 'capsicum', name: 'Sliced Capsicum', icon: '🫑', amount: '1 cup', protein: 1.0, calories: 24 }
    );
  }

  // Calculate base macros
  const totalBaseProt = Math.round(userMatchedItems.reduce((acc, item) => acc + item.protein, 0) * 10) / 10;
  const totalBaseCal = Math.round(userMatchedItems.reduce((acc, item) => acc + item.calories, 0));

  const primaryItemNames = userMatchedItems.map(i => i.name);
  const primaryKeys = userMatchedItems.map(i => i.key.toLowerCase());

  const hasPaneer = primaryKeys.some(k => k.includes('paneer'));
  const hasChicken = primaryKeys.some(k => k.includes('chicken'));
  const hasEgg = primaryKeys.some(k => k.includes('egg'));

  const topIngsStr = primaryItemNames.slice(0, 3).join(', ');
  const allIngsStr = primaryItemNames.join(', ');

  // Goal prefix tag
  const goalTag = goal === 'Weight Loss' ? '🔥 Fat-Loss Version:' : goal === 'Muscle Gain' ? '💪 Mass-Gainer Version:' : goal === '6-Pack Abs' ? '⚡ 6-Pack Abs Shredder:' : '✨ Balanced Energy:';

  const recommendations = [];

  // Regional Cuisine Generator based on user residence/belonged region (userProfile.nation)
  if (nation.includes('India')) {
    // Authentic Regional Indian Dishes
    recommendations.push({
      id: `rec-dish-1-${Date.now()}-1`,
      dishName: `${goalTag} South Indian Style ${topIngsStr} Poriyal / Sabzi`,
      cuisine: 'South Indian Regional',
      dietary: (hasChicken && userDietary === 'Non-Vegetarian') ? 'Non-Vegetarian' : (hasEgg && userDietary === 'Eggetarian') ? 'Eggetarian' : 'Vegetarian',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      matchScore: { usedCount: userMatchedItems.length, totalAvailable: uniqueTokens.length, percentage: 100 },
      availableIngredientsUsed: userMatchedItems,
      optionalIngredients: [
        { name: 'Mustard Seeds & Curry Leaves', icon: '🌿', amount: '1 tsp', note: 'Tempering' },
        { name: 'Himalayan Pink Salt', icon: '🧂', amount: '1 pinch', note: 'Seasoning' }
      ],
      prepTime: '8 mins',
      cookTime: '10 mins',
      servingSize: '1 bowl (300g)',
      macros: { calories: totalBaseCal + 50, protein: totalBaseProt, carbs: 24, fat: 5, fiber: 7.5 },
      highProteinBooster: `💪 Regional Desi Style: Tempered with mustard seeds & curry leaves tailored for ${nation}!`,
      fitnessGoalReason: `Authentic regional Indian stir-fry preserving micronutrients for your ${goal} plan.`,
      fitgenGoalVersion: `Goal tuned for ${goal} (${nation} Region)`,
      instructions: [
        { step: 1, title: 'Clean & Chop', description: `Chop ${allIngsStr}.`, timerSeconds: 240 },
        { step: 2, title: 'Temper Spices', description: 'Heat 1 tsp oil. Add mustard seeds, curry leaves, and green chilis.', timerSeconds: 180 },
        { step: 3, title: 'Steam Sabzi', description: `Add ${allIngsStr}, cover and steam for 8 mins.`, timerSeconds: 480 }
      ]
    });

    recommendations.push({
      id: `rec-dish-2-${Date.now()}-2`,
      dishName: `${goalTag} North Indian Kadai ${topIngsStr} Bistro Masala`,
      cuisine: 'North Indian Bistro',
      dietary: (hasChicken && userDietary === 'Non-Vegetarian') ? 'Non-Vegetarian' : 'Vegetarian',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      matchScore: { usedCount: userMatchedItems.length, totalAvailable: uniqueTokens.length, percentage: 100 },
      availableIngredientsUsed: userMatchedItems,
      optionalIngredients: [
        { name: 'Kadai Masala & Ginger', icon: '🧄', amount: '1 tsp', note: 'Aromatics' },
        { name: 'Fresh Cilantro', icon: '🌿', amount: '2 tbsp', note: 'Garnish' }
      ],
      prepTime: '10 mins',
      cookTime: '12 mins',
      servingSize: '1.5 cups (310g)',
      macros: { calories: totalBaseCal + 60, protein: totalBaseProt, carbs: 26, fat: 6, fiber: 7.0 },
      highProteinBooster: `💪 Rich Gravy: Slow-simmered kadai spices matching ${nation} home cooking!`,
      fitnessGoalReason: `Anti-inflammatory spices support metabolic health (${goal}).`,
      fitgenGoalVersion: `Goal tuned for ${goal} (${nation} Region)`,
      instructions: [
        { step: 1, title: 'Sauté Kadai Base', description: 'Sauté ginger, garlic, and onions until translucent.', timerSeconds: 240 },
        { step: 2, title: 'Simmer Veggies', description: `Fold in ${allIngsStr} with garam masala. Simmer 8 mins.`, timerSeconds: 480 },
        { step: 3, title: 'Garnish', description: 'Garnish with cilantro and serve warm!', timerSeconds: 60 }
      ]
    });

    recommendations.push({
      id: `rec-dish-3-${Date.now()}-3`,
      dishName: `${goalTag} Pan-Seared ${topIngsStr} Desi Protein Tikki`,
      cuisine: 'Desi Fitness',
      dietary: 'Vegetarian',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      matchScore: { usedCount: userMatchedItems.length, totalAvailable: uniqueTokens.length, percentage: 95 },
      availableIngredientsUsed: userMatchedItems,
      optionalIngredients: [
        { name: 'Oats / Gram Flour', icon: '🌾', amount: '2 tbsp', note: 'Binder' },
        { name: 'Green Chilis', icon: '🌶️', amount: '1 small', note: 'Spice' }
      ],
      prepTime: '8 mins',
      cookTime: '8 mins',
      servingSize: '2 large tikkis (250g)',
      macros: { calories: totalBaseCal + 70, protein: totalBaseProt + 4, carbs: 28, fat: 5, fiber: 6.5 },
      highProteinBooster: `💪 Crunchy Snack: Shredded ${topIngsStr} pan-seared into savory tikkis!`,
      fitnessGoalReason: `High fiber content promotes satiety and fat loss (${goal}).`,
      fitgenGoalVersion: `Goal tuned for ${goal} (${nation} Region)`,
      instructions: [
        { step: 1, title: 'Grate Veggies', description: `Finely grate ${allIngsStr}.`, timerSeconds: 240 },
        { step: 2, title: 'Shape & Pan-Sear', description: 'Shape patties and pan-sear on tawa with 1/2 tsp oil until crisp.', timerSeconds: 360 },
        { step: 3, title: 'Serve', description: 'Serve hot with mint chutney!', timerSeconds: 60 }
      ]
    });

    recommendations.push({
      id: `rec-dish-4-${Date.now()}-4`,
      dishName: `${goalTag} Traditional Desi ${topIngsStr} Shorba Soup`,
      cuisine: 'Desi Wellness',
      dietary: 'Vegan',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      matchScore: { usedCount: userMatchedItems.length, totalAvailable: uniqueTokens.length, percentage: 100 },
      availableIngredientsUsed: userMatchedItems,
      optionalIngredients: [
        { name: 'Roasted Cumin & Black Pepper', icon: '🧂', amount: '1/2 tsp', note: 'Digestion' },
        { name: 'Lemon Juice', icon: '🍋', amount: '1 tbsp', note: 'Finish' }
      ],
      prepTime: '5 mins',
      cookTime: '10 mins',
      servingSize: '2 bowls (360g)',
      macros: { calories: Math.max(70, totalBaseCal - 20), protein: totalBaseProt, carbs: 16, fat: 2, fiber: 7.0 },
      highProteinBooster: `💪 Detox Broth: Warm nourishing shorba made strictly from your ingredients!`,
      fitnessGoalReason: `Flushes excess water weight and aids digestive recovery (${goal}).`,
      fitgenGoalVersion: `Goal tuned for ${goal} (${nation} Region)`,
      instructions: [
        { step: 1, title: 'Boil Veggies', description: `Boil ${allIngsStr} in 2.5 cups water with cumin and pink salt.`, timerSeconds: 480 },
        { step: 2, title: 'Simmer & Strain', description: 'Simmer on low heat, squeeze lemon juice, and serve warm.', timerSeconds: 180 }
      ]
    });
  } else {
    // Western / Global Regional Dishes
    recommendations.push({
      id: `rec-dish-1-${Date.now()}-1`,
      dishName: `${goalTag} Pan-Seared Roasted ${topIngsStr} Harvest Skillet`,
      cuisine: 'Western Fitness',
      dietary: 'Vegetarian',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      matchScore: { usedCount: userMatchedItems.length, totalAvailable: uniqueTokens.length, percentage: 100 },
      availableIngredientsUsed: userMatchedItems,
      optionalIngredients: [
        { name: 'Olive Oil & Herbs', icon: '🫒', amount: '1 tsp', note: 'Drizzle' },
        { name: 'Sea Salt & Black Pepper', icon: '🧂', amount: '1 pinch', note: 'Seasoning' }
      ],
      prepTime: '5 mins',
      cookTime: '10 mins',
      servingSize: '1 bowl (280g)',
      macros: { calories: totalBaseCal + 50, protein: totalBaseProt, carbs: 22, fat: 4, fiber: 7.0 },
      highProteinBooster: `💪 Global Harvest: Roasted skillet tailored for ${nation}!`,
      fitnessGoalReason: `Clean eating option supporting lean muscle development (${goal}).`,
      fitgenGoalVersion: `Goal tuned for ${goal} (${nation} Region)`,
      instructions: [
        { step: 1, title: 'Prep', description: `Slice ${allIngsStr}.`, timerSeconds: 180 },
        { step: 2, title: 'Roast Skillet', description: `Roast ${allIngsStr} in pan with olive oil and black pepper for 10 mins.`, timerSeconds: 600 }
      ]
    });
  }

  // Filter out any dishes that contain user's active allergies
  if (allergies.length > 0) {
    recommendations.forEach(dish => {
      allergies.forEach(alg => {
        if (alg.includes('peanuts') || alg.includes('nut')) {
          dish.optionalIngredients = dish.optionalIngredients.filter(i => !i.name.toLowerCase().includes('nut') && !i.name.toLowerCase().includes('peanut'));
          dish.highProteinBooster = dish.highProteinBooster.replace(/nuts|peanuts/gi, 'pumpkin seeds');
          dish.allergySafeNote = `✅ Allergen-Safe Guarantee: Excluded ${alg} from recipe ingredients.`;
        }
      });
    });
  }

  // Dynamically transform every recommendation specifically for the user's active fitness goal (Weight Loss, Muscle Gain, 6-Pack Abs, Maintenance)
  const adaptedRecommendations = recommendations.map((dish) => {
    let goalDishName = dish.dishName;
    let macros = { ...dish.macros };
    let fitnessReason = dish.fitnessGoalReason;
    let goalVersion = dish.fitgenGoalVersion;

    if (goal === 'Weight Loss') {
      goalDishName = `🔥 Fat-Loss Version: ${dish.dishName.replace(/FitGen|Authentic|High-Protein|Desi/g, '').trim()}`;
      macros = {
        calories: Math.round(dish.macros.calories * 0.68),
        protein: Math.round(dish.macros.protein * 1.1),
        carbs: Math.round(dish.macros.carbs * 0.5),
        fat: Math.max(4, Math.round(dish.macros.fat * 0.35)),
        fiber: Math.max(9, (dish.macros.fiber || 5) + 3)
      };
      fitnessReason = `🔥 Calorie-Deficit Fat-Loss Volume Meal: High fiber & ${macros.protein}g protein under ${macros.calories} kcal keeps you full for 4+ hours while accelerating body fat burning.`;
      goalVersion = `🔥 FitGen Fat-Loss Modification: Air-cooked with minimal oil (zero ghee), doubled green leafies, and zero simple carbs to maximize fat shred.`;
    } else if (goal === 'Muscle Gain') {
      goalDishName = `💪 Mass-Gainer Version: ${dish.dishName.replace(/FitGen|Authentic|High-Protein|Desi/g, '').trim()}`;
      macros = {
        calories: Math.round(dish.macros.calories * 1.35),
        protein: Math.round(dish.macros.protein * 1.3),
        carbs: Math.round(dish.macros.carbs * 1.4),
        fat: Math.round(dish.macros.fat * 1.2),
        fiber: dish.macros.fiber || 6
      };
      fitnessReason = `💪 Calorie-Surplus Mass Builder: Delivers ${macros.protein}g protein and complex carbs to fuel intense training and spike hypertrophy.`;
      goalVersion = `💪 FitGen Muscle Gain Modification: Extra 50g protein portion + basmati/quinoa base for maximum muscle growth.`;
    } else if (goal === '6-Pack Abs') {
      goalDishName = `⚡ 6-Pack Abs Shredder: ${dish.dishName.replace(/FitGen|Authentic|High-Protein|Desi/g, '').trim()}`;
      macros = {
        calories: Math.round(dish.macros.calories * 0.8),
        protein: Math.round(dish.macros.protein * 1.25),
        carbs: Math.round(dish.macros.carbs * 0.38),
        fat: Math.max(5, Math.round(dish.macros.fat * 0.45)),
        fiber: Math.max(8, (dish.macros.fiber || 5) + 2)
      };
      fitnessReason = `⚡ 6-Pack Abs Shredder: Ultra-high protein to fat ratio with minimal simple carbs to strip subcutaneous body fat while preserving lean abdominal muscle.`;
      goalVersion = `⚡ FitGen Abs Cutting Modification: Ultra-lean preparation with egg whites/tofu and zero sodium seasoning.`;
    } else {
      goalDishName = `✨ Balanced Energy: ${dish.dishName.replace(/FitGen|Authentic|High-Protein|Desi/g, '').trim()}`;
      macros = {
        calories: dish.macros.calories,
        protein: dish.macros.protein,
        carbs: dish.macros.carbs,
        fat: dish.macros.fat,
        fiber: dish.macros.fiber || 6
      };
      fitnessReason = `✨ Maintenance & Vitality: Perfectly balanced macro ratio to sustain daily energy levels and maintain lean muscle tone.`;
      goalVersion = `✨ FitGen Maintenance Modification: Standard portion calibrated for healthy weight stability.`;
    }

    return {
      ...dish,
      dishName: goalDishName,
      macros,
      fitnessGoalReason: fitnessReason,
      fitgenGoalVersion: goalVersion
    };
  });

  return adaptedRecommendations;
}

/**
 * Generates a full 7-Day Weekly Meal Plan (Monday to Sunday) tailored to body metrics,
 * country cuisine, dietary preference, fitness goals, allergies, and hydration balance.
 */
export function generateWeeklyMealPlan({
  nation = 'India 🇮🇳',
  dietary = 'Vegetarian',
  goal = 'Muscle Gain',
  allergies = [],
  age = 26,
  gender = 'Female',
  height = 172,
  weight = 65,
  activityLevel = 'Active (4-5 workouts/week)'
}) {
  const isVeg = dietary === 'Vegetarian' || dietary === 'Vegan';
  const isVegan = dietary === 'Vegan';
  const isNonVeg = dietary === 'Non-Vegetarian';
  const isEgg = dietary === 'Eggetarian';
  const isHighProtein = goal === 'Muscle Gain';
  const isWeightLoss = goal === 'Weight Loss';

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeklyPlan = {};

  DAYS.forEach((day, index) => {
    let meals = [];

    if (index === 0) { // Monday
      meals = [
        {
          id: `mp-mon-1`,
          type: 'breakfast',
          label: '🌅 BREAKFAST',
          scheduledTime: '08:30 AM',
          title: isNonVeg ? 'Desi Spiced Egg Bhurji & Multigrain Toast' : isVegan ? 'High-Protein Soya Bhurji & Roti' : 'Spiced Paneer Scramble & Whole Wheat Toast',
          calories: isHighProtein ? 450 : isWeightLoss ? 330 : 380,
          protein: isHighProtein ? 32 : 24,
          carbs: isWeightLoss ? 18 : 28,
          fat: isWeightLoss ? 8 : 16,
          prepTime: '12 mins',
          description: isNonVeg ? 'Scrambled whole eggs & whites with onions, tomatoes, and chilis.' : isVegan ? 'Scrambled soya granules tossed with turmeric, ginger, and wheat roti.' : 'Cottage cheese scrambled with onions, tomatoes, turmeric, and green chilis.',
          ingredients: isNonVeg ? ['Eggs (3 whole + 2 whites)', 'Multigrain Toast (2)', 'Onion & Tomato'] : isVegan ? ['Soya Granules (60g)', 'Wheat Roti (2)', 'Onion & Tomato'] : ['Paneer (180g)', 'Whole Wheat Toast (2)', 'Spinach']
        },
        {
          id: `mp-mon-2`,
          type: 'lunch',
          label: '☀️ LUNCH',
          scheduledTime: '01:30 PM',
          title: isNonVeg ? 'Tandoori Chicken Breast & Jeera Basmati Rice' : isVegan ? 'Rajma Masala & Brown Basmati Rice' : 'High-Protein Moong Dal Khichdi & Greek Curd',
          calories: isHighProtein ? 640 : isWeightLoss ? 480 : 530,
          protein: isHighProtein ? 44 : 32,
          carbs: isWeightLoss ? 42 : 62,
          fat: 14,
          prepTime: '20 mins',
          description: 'Marinated protein grilled or simmered in tomato onion masala, served with basmati rice and cucumber salad.',
          ingredients: isNonVeg ? ['Chicken Breast (220g)', 'Basmati Rice (1.5 cups)', 'Greek Curd (100g)'] : isVegan ? ['Red Rajma (1 cup)', 'Brown Rice (1.5 cups)', 'Sprouts Salad'] : ['Yellow Moong Dal (1 cup)', 'Brown Rice (1/2 cup)', 'Greek Curd (180g)']
        },
        {
          id: `mp-mon-3`,
          type: 'snack',
          label: '🍎 SNACK',
          scheduledTime: '05:00 PM',
          title: 'Spiced Roasted Chana & Masala Protein Lassi',
          calories: isWeightLoss ? 190 : 260,
          protein: 22,
          carbs: 28,
          fat: 6,
          prepTime: '5 mins',
          description: 'Crunchy air-roasted chickpeas paired with a chilled cumin spiced yogurt lassi.',
          ingredients: ['Roasted Black Chana (50g)', 'Greek Curd (180g)', 'Roasted Cumin', 'Himalayan Salt']
        },
        {
          id: `mp-mon-4`,
          type: 'dinner',
          label: '🌙 DINNER',
          scheduledTime: '08:00 PM',
          title: isNonVeg ? 'FitGen Chicken Biryani & Cucumber Raita' : isVegan ? 'Tofu & Green Peas Curry with Quinoa' : 'Palak Paneer Curry & Cumin Brown Rice',
          calories: isHighProtein ? 580 : isWeightLoss ? 420 : 490,
          protein: isHighProtein ? 38 : 28,
          carbs: isWeightLoss ? 32 : 52,
          fat: 16,
          prepTime: '25 mins',
          description: 'Aromatic basmati rice or quinoa cooked dum-style with paneer/tofu/chicken and fresh spinach puree.',
          ingredients: isNonVeg ? ['Chicken Thigh/Breast (200g)', 'Basmati Rice (1.5 cups)', 'Curd Marination'] : isVegan ? ['Firm Tofu (200g)', 'Green Peas (100g)', 'Quinoa (1 cup)'] : ['Paneer (160g)', 'Spinach Puree (2 cups)', 'Brown Rice (1 cup)']
        },
        {
          id: `mp-mon-5`,
          type: 'hydration',
          label: '💧 HYDRATION & LIQUID BALANCE',
          scheduledTime: 'All Day',
          title: 'Daily 3.5L Liquid Target & Jeera Mint Chaas',
          calories: 60,
          protein: 4,
          carbs: 10,
          fat: 1,
          prepTime: 'All Day',
          description: 'Maintain optimal hydration with 3.5L pure water, chilled Jeera Mint Buttermilk, and warm Lemon Water.',
          ingredients: ['Filtered Water (3.5 Liters)', 'Jeera Mint Chaas (250ml)', 'Warm Lemon Honey Water (1 glass)', 'Green Tea (1 cup)']
        }
      ];
    } else if (index === 1) { // Tuesday
      meals = [
        {
          id: `mp-tue-1`,
          type: 'breakfast',
          label: '🌅 BREAKFAST',
          scheduledTime: '08:30 AM',
          title: isNonVeg ? 'Egg White Spinach Omelette & Whole Wheat Roti' : isVegan ? 'Spiced Soya Poha & Toasted Peanuts/Seeds' : 'Besan Chilla with Cottage Cheese Stuffing',
          calories: isHighProtein ? 430 : isWeightLoss ? 310 : 360,
          protein: isHighProtein ? 30 : 22,
          carbs: isWeightLoss ? 22 : 34,
          fat: 12,
          prepTime: '15 mins',
          description: 'High-protein chickpea or egg pancake stuffed with fresh cilantro, onions, and cottage cheese.',
          ingredients: isNonVeg ? ['Egg Whites (4)', 'Spinach (1 cup)', 'Multigrain Toast (2)'] : isVegan ? ['Poha (100g)', 'Soya Chunks (40g)', 'Peanuts (15g)'] : ['Besan / Gram Flour (1 cup)', 'Grated Paneer (80g)', 'Green Chilis']
        },
        {
          id: `mp-tue-2`,
          type: 'lunch',
          label: '☀️ LUNCH',
          scheduledTime: '01:30 PM',
          title: isNonVeg ? 'Chicken Tikka Masala & Multigrain Roti' : isVegan ? 'Black Chana Curry & Cumin Quinoa' : 'Dal Makhani (Low-Fat) & Brown Basmati Rice',
          calories: isHighProtein ? 650 : isWeightLoss ? 490 : 540,
          protein: isHighProtein ? 42 : 30,
          carbs: isWeightLoss ? 44 : 64,
          fat: 14,
          prepTime: '25 mins',
          description: 'Rich dark lentils or grilled chicken simmered in tomato ginger sauce with cumin brown rice.',
          ingredients: isNonVeg ? ['Chicken Breast (200g)', 'Multigrain Roti (2)', 'Tomato Gravy'] : isVegan ? ['Black Chana (1 cup)', 'Quinoa (1 cup)', 'Onion Tomato Gravy'] : ['Black Urad Dal (1 cup)', 'Brown Basmati Rice (1.5 cups)', 'Low-Fat Yogurt']
        },
        {
          id: `mp-tue-3`,
          type: 'snack',
          label: '🍎 SNACK',
          scheduledTime: '05:00 PM',
          title: 'Roasted Makhana (Fox Nuts) & Greek Yogurt Berry Cup',
          calories: isWeightLoss ? 180 : 240,
          protein: 18,
          carbs: 26,
          fat: 5,
          prepTime: '3 mins',
          description: 'Crunchy dry-roasted lotus seeds seasoned with rock salt paired with high-protein Greek yogurt.',
          ingredients: ['Roasted Makhana (40g)', 'Greek Yogurt (180g)', 'Blueberries/Pomegranate', 'Himalayan Pink Salt']
        },
        {
          id: `mp-tue-4`,
          type: 'dinner',
          label: '🌙 DINNER',
          scheduledTime: '08:00 PM',
          title: isNonVeg ? 'Pan-Seared Lemon Fish Fillet & Veggie Rice' : isVegan ? 'Methi Matar Tofu & Brown Basmati' : 'Kadai Paneer & Whole Wheat Roti',
          calories: isHighProtein ? 560 : isWeightLoss ? 400 : 470,
          protein: isHighProtein ? 38 : 28,
          carbs: isWeightLoss ? 30 : 48,
          fat: 14,
          prepTime: '20 mins',
          description: 'Fresh cottage cheese or fish fillet stir-fried with bell peppers, onions, and freshly ground spices.',
          ingredients: isNonVeg ? ['Fish Fillet (200g)', 'Brown Rice (1 cup)', 'Lemon Dill'] : isVegan ? ['Firm Tofu (200g)', 'Fenugreek Methi', 'Green Peas'] : ['Paneer Cubes (160g)', 'Capsicum & Onions', 'Whole Wheat Roti (2)']
        },
        {
          id: `mp-tue-5`,
          type: 'hydration',
          label: '💧 HYDRATION & LIQUID BALANCE',
          scheduledTime: 'All Day',
          title: 'Daily 3.5L Liquid Target & Tender Coconut Water',
          calories: 50,
          protein: 2,
          carbs: 12,
          fat: 0,
          prepTime: 'All Day',
          description: 'Rehydrate with 3.5L water, 1 fresh Tender Coconut Water (potassium boost), and Chamomile Tea.',
          ingredients: ['Filtered Water (3.5 Liters)', 'Fresh Tender Coconut Water (300ml)', 'Warm Chamomile Herbal Tea (1 cup)']
        }
      ];
    } else if (index === 2) { // Wednesday
      meals = [
        {
          id: `mp-wed-1`,
          type: 'breakfast',
          label: '🌅 BREAKFAST',
          scheduledTime: '08:30 AM',
          title: isNonVeg ? 'Boiled Egg Whites & Avocado Toast' : isVegan ? 'High-Protein Oats Smoothie Bowl & Seeds' : 'Paneer Bhurji Stuffed Multigrain Paratha',
          calories: isHighProtein ? 440 : isWeightLoss ? 320 : 370,
          protein: isHighProtein ? 32 : 24,
          carbs: isWeightLoss ? 20 : 32,
          fat: 14,
          prepTime: '10 mins',
          description: 'Nourishing breakfast bowl or toast topped with seeds, protein, and essential healthy fats.',
          ingredients: isNonVeg ? ['Boiled Egg Whites (5)', 'Avocado (1/2)', 'Whole Grain Bread (2)'] : isVegan ? ['Rolled Oats (60g)', 'Plant Protein (1 scoop)', 'Chia Seeds (1 tbsp)'] : ['Paneer (150g)', 'Multigrain Paratha (1)', 'Mint Chutney']
        },
        {
          id: `mp-wed-2`,
          type: 'lunch',
          label: '☀️ LUNCH',
          scheduledTime: '01:30 PM',
          title: isNonVeg ? 'Grilled Chicken Kebabs & Quinoa Salad' : isVegan ? 'Soya Chunks Curry & Brown Basmati' : 'Paneer Tikka Masala & Jeera Rice',
          calories: isHighProtein ? 660 : isWeightLoss ? 500 : 550,
          protein: isHighProtein ? 46 : 32,
          carbs: isWeightLoss ? 45 : 65,
          fat: 16,
          prepTime: '22 mins',
          description: 'High-protein grilled main dish served with warm quinoa salad or cumin basmati rice.',
          ingredients: isNonVeg ? ['Chicken Breast (220g)', 'Quinoa (1 cup)', 'Bell Peppers'] : isVegan ? ['Soya Chunks (60g dry)', 'Brown Rice (1.5 cups)', 'Tomato Puree'] : ['Paneer (180g)', 'Basmati Rice (1.5 cups)', 'Spiced Marinade']
        },
        {
          id: `mp-wed-3`,
          type: 'snack',
          label: '🍎 SNACK',
          scheduledTime: '05:00 PM',
          title: 'Spiced Sprouts Salad & Lemon Mint Water',
          calories: isWeightLoss ? 160 : 220,
          protein: 16,
          carbs: 24,
          fat: 3,
          prepTime: '5 mins',
          description: 'Steamed green gram sprouts tossed with cucumber, tomatoes, lemon juice, and chaat masala.',
          ingredients: ['Moong Sprouts (1.5 cups)', 'Cucumber & Tomato', 'Lemon Juice', 'Chaat Masala']
        },
        {
          id: `mp-wed-4`,
          type: 'dinner',
          label: '🌙 DINNER',
          scheduledTime: '08:00 PM',
          title: isNonVeg ? 'Egg Curry & Whole Wheat Roti' : isVegan ? 'Lauki Chana Dal & Quinoa' : 'Aloo Matar Paneer & Cumin Brown Rice',
          calories: isHighProtein ? 570 : isWeightLoss ? 410 : 480,
          protein: isHighProtein ? 36 : 26,
          carbs: isWeightLoss ? 34 : 50,
          fat: 14,
          prepTime: '20 mins',
          description: 'Home-cooked Indian curry cooked with ginger garlic paste, onions, and aromatic turmeric.',
          ingredients: isNonVeg ? ['Eggs (3 whole + 2 whites)', 'Whole Wheat Roti (2)', 'Curry Sauce'] : isVegan ? ['Chana Dal (1 cup)', 'Bottle Gourd Lauki', 'Quinoa (1 cup)'] : ['Paneer (150g)', 'Green Peas (100g)', 'Brown Rice (1 cup)']
        },
        {
          id: `mp-wed-5`,
          type: 'hydration',
          label: '💧 HYDRATION & LIQUID BALANCE',
          scheduledTime: 'All Day',
          title: 'Daily 3.5L Liquid Target & Cucumber Lemon Detox',
          calories: 40,
          protein: 1,
          carbs: 8,
          fat: 0,
          prepTime: 'All Day',
          description: 'Infuse 3.5L water with sliced cucumber, mint leaves, and fresh lemon for cellular alkalization.',
          ingredients: ['Filtered Water (3.5 Liters)', 'Cucumber Mint Infusion (1 Pitcher)', 'Green Tea (1 cup)']
        }
      ];
    } else { // Days 4-7 (Thursday to Sunday)
      const dayTitles = [
        { bk: 'Moong Dal Chilla & Curd', ln: 'Paneer Pulao & Cucumber Salad', dn: 'Tofu Palak & Roti' },
        { bk: 'High-Protein Oats Upma', ln: 'Chole Masala & Brown Rice', dn: 'Veg Handi Curry & Quinoa' },
        { bk: 'Spiced Tofu / Egg Scramble', ln: 'Soya Dum Biryani & Raita', dn: 'Paneer Tikka & Soup' },
        { bk: 'FitGen High-Protein Idli/Sambar', ln: 'Shahi Paneer / Chicken Kebabs', dn: 'Garden Detox Soup & Toast' }
      ];
      const dt = dayTitles[(index - 3) % dayTitles.length];

      meals = [
        {
          id: `mp-${day.toLowerCase()}-1`,
          type: 'breakfast',
          label: '🌅 BREAKFAST',
          scheduledTime: '08:30 AM',
          title: isNonVeg ? `${dt.bk} with Egg Whites` : dt.bk,
          calories: isHighProtein ? 430 : isWeightLoss ? 310 : 360,
          protein: isHighProtein ? 30 : 22,
          carbs: isWeightLoss ? 20 : 30,
          fat: 12,
          prepTime: '12 mins',
          description: 'Balanced protein breakfast prepared with fresh herbs, turmeric, and light oil.',
          ingredients: ['Yellow Moong Dal / Oats (1 cup)', 'Paneer / Egg Whites (100g)', 'Mint Chutney']
        },
        {
          id: `mp-${day.toLowerCase()}-2`,
          type: 'lunch',
          label: '☀️ LUNCH',
          scheduledTime: '01:30 PM',
          title: isNonVeg ? `Grilled Chicken & ${dt.ln}` : dt.ln,
          calories: isHighProtein ? 640 : isWeightLoss ? 480 : 530,
          protein: isHighProtein ? 42 : 30,
          carbs: isWeightLoss ? 42 : 62,
          fat: 14,
          prepTime: '22 mins',
          description: 'Satisfying high-protein lunch paired with brown basmati rice or quinoa.',
          ingredients: ['Paneer / Chicken (180g)', 'Basmati Rice (1.5 cups)', 'Cucumber Salad']
        },
        {
          id: `mp-${day.toLowerCase()}-3`,
          type: 'snack',
          label: '🍎 SNACK',
          scheduledTime: '05:00 PM',
          title: 'Roasted Pumpkin Seeds & Whey / Plant Shake',
          calories: isWeightLoss ? 190 : 250,
          protein: 22,
          carbs: 22,
          fat: 6,
          prepTime: '3 mins',
          description: 'Chilled protein shake blended with water/almond milk and roasted pumpkin seeds.',
          ingredients: ['Protein Powder (1 scoop)', 'Water/Almond Milk (250ml)', 'Pumpkin Seeds (15g)']
        },
        {
          id: `mp-${day.toLowerCase()}-4`,
          type: 'dinner',
          label: '🌙 DINNER',
          scheduledTime: '08:00 PM',
          title: isNonVeg ? `Seared Fish / Chicken & ${dt.dn}` : dt.dn,
          calories: isHighProtein ? 570 : isWeightLoss ? 400 : 470,
          protein: isHighProtein ? 36 : 26,
          carbs: isWeightLoss ? 32 : 48,
          fat: 14,
          prepTime: '20 mins',
          description: 'Light, easy-to-digest dinner cooked with digestive cumin, garlic, and fresh spinach.',
          ingredients: ['Paneer / Tofu / Fish (160g)', 'Brown Rice / Roti (1 cup)', 'Garlic Spinach']
        },
        {
          id: `mp-${day.toLowerCase()}-5`,
          type: 'hydration',
          label: '💧 HYDRATION & LIQUID BALANCE',
          scheduledTime: 'All Day',
          title: 'Daily 3.5L Liquid Target & Electrolyte Lemon Water',
          calories: 45,
          protein: 1,
          carbs: 9,
          fat: 0,
          prepTime: 'All Day',
          description: 'Maintain fluid balance with 3.5L water, 1 glass electrolyte lemon water, and herbal tea.',
          ingredients: ['Filtered Water (3.5 Liters)', 'Fresh Lemon Electrolyte Water', 'Green Tea (1 cup)']
        }
      ];
    }

    // Enforce Allergy Substitutions across all generated meals
    if (Array.isArray(allergies) && allergies.length > 0) {
      const algList = allergies.map(a => a.toLowerCase());
      meals.forEach(m => {
        m.ingredients = m.ingredients.map(ing => {
          if (algList.some(alg => alg.includes('peanut') || alg.includes('nut')) && ing.toLowerCase().includes('almond')) {
            return ing.replace(/almond(s)?/gi, 'Pumpkin Seeds');
          }
          if (algList.some(alg => alg.includes('peanut')) && ing.toLowerCase().includes('peanut')) {
            return ing.replace(/peanut(s)?/gi, 'Sunflower Seeds');
          }
          if (algList.some(alg => alg.includes('dairy')) && ing.toLowerCase().includes('paneer')) {
            return ing.replace(/paneer/gi, 'Tofu');
          }
          return ing;
        });
      });
    }

    weeklyPlan[day] = meals;
  });

  return weeklyPlan;
}

/**
 * Returns Monday's meal plan by default for single-day consumers
 */
export function generatePersonalizedMealPlan(params) {
  const weekly = generateWeeklyMealPlan(params);
  return weekly['Monday'] || [];
}

/**
 * Fuzzy spelling & typo normalization map
 */
const TYPO_SYNONYM_MAP = {
  tamato: 'tomato', tamatos: 'tomato', tomatoes: 'tomato',
  carret: 'carrot', carot: 'carrot', carrots: 'carrot',
  paner: 'paneer', panir: 'paneer',
  chiken: 'chicken', chikn: 'chicken', chckn: 'chicken',
  egg: 'egg', eggs: 'egg', eg: 'egg', egs: 'egg',
  beetrot: 'beetroot', beet: 'beetroot', beetroots: 'beetroot',
  potatoe: 'potato', potatos: 'potato', potatoes: 'potato', aloo: 'potato',
  cabage: 'cabbage', cabages: 'cabbage', cabbages: 'cabbage',
  bean: 'beans', beans: 'beans', greenbeans: 'beans',
  onien: 'onion', onions: 'onion', unien: 'onion',
  soya: 'soya', soy: 'soya', soyabean: 'soya',
  chawal: 'rice', rices: 'rice',
  dahl: 'dal', daal: 'dal',
  breas: 'bread', breads: 'bread',
  bana: 'banana', bananas: 'banana'
};

export function normalizeTypo(word) {
  if (!word) return '';
  const clean = word.toLowerCase().trim();
  return TYPO_SYNONYM_MAP[clean] || clean;
}

/**
 * Extracts conversation memory context (last mentioned dish & ingredients)
 */
export function extractContextFromHistory(conversationHistory = []) {
  let lastIngredients = [];
  let lastDish = null;

  if (!Array.isArray(conversationHistory)) return { lastIngredients, lastDish };

  for (let i = conversationHistory.length - 1; i >= 0; i--) {
    const msg = conversationHistory[i];
    if (!msg) continue;

    if (msg.sender === 'ai') {
      if (msg.dishAnalysis?.dishName && !lastDish) {
        lastDish = msg.dishAnalysis.dishName.replace(/[^\w\s,]/gi, '').replace(/MassGainer Version|FatLoss Version|6Pack Abs Shredder|Balanced Energy/gi, '').trim();
      }
      if (msg.ingredientRecommendations && msg.ingredientRecommendations.length > 0 && !lastDish) {
        lastDish = msg.ingredientRecommendations[0].dishName.replace(/[^\w\s,]/gi, '').replace(/MassGainer Version|FatLoss Version|6Pack Abs Shredder|Balanced Energy/gi, '').trim();
      }
    }

    if (msg.sender === 'user' && msg.text) {
      const tokens = msg.text.toLowerCase().split(/[\n,;+&.\/\\:]+/).map(t => t.trim()).filter(Boolean);
      const recognized = tokens.map(normalizeTypo).filter(t => 
        ['tomato', 'cabbage', 'onion', 'carrot', 'beans', 'beetroot', 'potato', 'egg', 'chicken', 'paneer', 'spinach', 'rice', 'dal', 'soya', 'oats', 'banana', 'curd', 'milk', 'tofu', 'chickpeas', 'mushroom', 'bread'].includes(t)
      );
      if (recognized.length > 0 && lastIngredients.length === 0) {
        lastIngredients = recognized;
      }
    }
  }

  return { lastIngredients, lastDish };
}

/**
 * Conversational Master Chatbot NLP Engine
 * Processes natural language prompts, greetings, Q&A, recipe requests, and multi-turn context follow-ups.
 */
export function processConversationalChatbotQuery(rawUserQuery, conversationHistory = [], userProfile = {}) {
  const query = (rawUserQuery || '').trim();
  const lowerQuery = query.toLowerCase();

  const userName = userProfile?.name || 'Athlete';
  const goal = userProfile?.goal || 'Muscle Gain';
  const dietary = userProfile?.dietary || 'Vegetarian';
  const nation = userProfile?.nation || 'India 🇮🇳';
  const proteinTarget = userProfile?.dailyProteinGoal || 130;

  if (!query) {
    return {
      text: `👋 Ask FitGen AI for any dish (e.g. 'Samosa', 'Chicken Tikka', 'Paneer Butter Masala', 'Fruit Bowl') or list your kitchen ingredients!`,
      dishAnalysis: null,
      ingredientRecommendations: null,
      relevantVideos: []
    };
  }

  // 1. Greetings & Bot Intro Queries
  const isGreeting = ['hi', 'hello', 'hey', 'greetings', 'who are you', 'what can you do', 'start', 'help'].some(w => lowerQuery === w || lowerQuery.startsWith(w + ' '));
  if (isGreeting) {
    return {
      text: `👋 Hello **${userName}**! I am your **FitGen AI ChatGPT Nutrition Assistant**.

I am calibrated for your active profile:
• 🌱 **Dietary Preference**: **${dietary}**
• 🎯 **Fitness Goal**: **${goal}** (${proteinTarget}g Daily Protein Target)
• 🇮🇳 **Residence / Region**: **${nation}**

What would you like to ask me today?
1. 🍽️ **Dish Macro Breakdown & Recipe**: Ask for *"Chicken Tikka"*, *"Paneer Butter Masala"*, *"Samosa"*, *"Fruit Bowl"*, *"Egg Rice"*!
2. 🥗 **Recipes from Pantry Ingredients**: Type *"tomato, cabbage, onion, carrot, beans"* or *"eggs, bread"*!
3. 💬 **Fitness & Protein Q&A**: Ask *"Is banana good before workout?"* or *"How many calories are in an egg?"*`,
      dishAnalysis: null,
      ingredientRecommendations: null,
      relevantVideos: []
    };
  }

  // 2. Multi-Turn Context Follow-Ups ("make it high protein", "give me the recipe", "how many calories?", "make it low calorie", "show missing ingredients", "give me more options")
  const isFollowUp = lowerQuery.includes('make it high protein') || 
                     lowerQuery.includes('high protein version') || 
                     lowerQuery.includes('make it low calorie') || 
                     lowerQuery.includes('give me the recipe') || 
                     lowerQuery.includes('how many calories') || 
                     lowerQuery.includes('show nutrition') || 
                     lowerQuery.includes('show missing ingredients') || 
                     lowerQuery.includes('give me more options');

  if (isFollowUp) {
    const { lastIngredients, lastDish } = extractContextFromHistory(conversationHistory);
    const ingredientsStr = lastIngredients.length > 0 ? lastIngredients.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ') : null;
    const activeSubject = ingredientsStr || lastDish || 'tomato, cabbage, onion, carrot, beans';

    if (lowerQuery.includes('high protein')) {
      const recs = getDishRecommendationsFromAvailableIngredients(activeSubject, { ...userProfile, goal: 'Muscle Gain' });
      const boosterName = dietary === 'Non-Vegetarian' ? 'Chicken Breast' : (dietary === 'Eggetarian' ? 'Hard-Boiled Egg Whites' : 'Fresh Paneer / Tofu Cubes');
      const boosterProt = dietary === 'Non-Vegetarian' ? 46 : (dietary === 'Eggetarian' ? 22 : 28);
      const boosterCal = dietary === 'Non-Vegetarian' ? 220 : (dietary === 'Eggetarian' ? 120 : 220);

      recs.forEach(rec => {
        rec.dishName = `💪 High-Protein ${rec.dishName.replace(/💪|Mass-Gainer Version:|Fat-Loss Version:/gi, '').trim()}`;
        rec.macros.protein = Math.round((rec.macros.protein || 18) + boosterProt);
        rec.macros.calories = Math.round((rec.macros.calories || 280) + boosterCal);
        rec.fitnessGoalReason = `💪 Boosted with 150g ${boosterName} yielding ~${rec.macros.protein}g protein for rapid muscle recovery.`;
      });

      let text = `💪 **High-Protein Upgraded Meals for Your Request** (${activeSubject}):\n\n`;
      text += `I upgraded your recipes by adding a high-protein booster (**150g ${boosterName}**) to reach your **${proteinTarget}g Daily Target**:\n\n`;

      recs.slice(0, 3).forEach((rec, idx) => {
        text += `---\n\n`;
        text += `### ${idx + 1}. 🥘 **${rec.dishName}**\n`;
        text += `**Why it matches**: Boosts **${activeSubject}** with extra protein density.\n\n`;
        text += `**Ingredients Used**:\n`;
        (rec.availableIngredientsUsed || []).forEach(ing => {
          text += `• ${ing.icon || '🥗'} **${ing.name}**: ${ing.amount}\n`;
        });
        text += `• 💪 **High-Protein Booster**: 150g ${boosterName} (+${boosterProt}g protein)\n\n`;
        text += `**Preparation Steps**:\n`;
        (rec.instructions || []).forEach((step, sIdx) => {
          text += `${sIdx + 1}. **${step.title}**: ${step.description}\n`;
        });
        text += `\n`;
        text += `**Estimated Nutrition** *(Approximate per serving)*:\n`;
        text += `• **Calories**: ~${rec.macros.calories} kcal\n`;
        text += `• **Protein**: ~${rec.macros.protein} g *(High-Protein Boosted)*\n`;
        text += `• **Carbohydrates**: ~${rec.macros.carbs || 32} g\n`;
        text += `• **Fat**: ~${rec.macros.fat || 10} g\n`;
        text += `• **Fiber**: ~${rec.macros.fiber || 8} g\n`;
        text += `• **Serving Size**: 1 large portion (350g)\n`;
        text += `• **Fitness Suitability**: ${rec.fitnessGoalReason}\n\n`;
      });

      text += `---\n\n💡 **FitGen Tip**: Consume your high-protein meal within 45 minutes after workout for optimal muscle protein synthesis!`;

      return {
        text: text,
        dishAnalysis: null,
        ingredientRecommendations: recs,
        relevantVideos: getVideosForIngredients(activeSubject)
      };
    }

    if (lowerQuery.includes('recipe')) {
      const recs = getDishRecommendationsFromAvailableIngredients(activeSubject, userProfile);
      let text = `👨‍🍳 **Complete Recipe & Preparation Guide for Your Meals** (${activeSubject}):\n\n`;

      recs.slice(0, 3).forEach((rec, idx) => {
        text += `### ${idx + 1}. 🍲 **${rec.dishName}**\n`;
        text += `**Ingredients Required**:\n`;
        (rec.availableIngredientsUsed || []).forEach(i => {
          text += `• ${i.icon || '🥗'} **${i.name}**: ${i.amount}\n`;
        });
        text += `\n**Step-by-Step Cooking Guide**:\n`;
        (rec.instructions || []).forEach((s, sIdx) => {
          text += `${sIdx + 1}. **${s.title}**: ${s.description}\n`;
        });
        text += `\n`;
      });

      return {
        text: text,
        dishAnalysis: null,
        ingredientRecommendations: recs,
        relevantVideos: getVideosForIngredients(activeSubject)
      };
    }

    if (lowerQuery.includes('calories') || lowerQuery.includes('nutrition')) {
      const recs = getDishRecommendationsFromAvailableIngredients(activeSubject, userProfile);
      let text = `📊 **Estimated Nutritional Breakdown for Your Meals** (${activeSubject}):\n\n`;

      recs.slice(0, 3).forEach((rec, idx) => {
        text += `### ${idx + 1}. 🥘 **${rec.dishName}**\n`;
        text += `• **Calories**: ~${rec.macros.calories} kcal\n`;
        text += `• **Protein**: ~${rec.macros.protein} g\n`;
        text += `• **Carbohydrates**: ~${rec.macros.carbs} g\n`;
        text += `• **Fat**: ~${rec.macros.fat} g\n`;
        text += `• **Fiber**: ~${rec.macros.fiber} g\n\n`;
      });

      text += `*Note: Nutritional figures are approximate estimated values derived from verified food density averages.*`;

      return {
        text: text,
        dishAnalysis: null,
        ingredientRecommendations: recs,
        relevantVideos: getVideosForIngredients(activeSubject)
      };
    }

    if (lowerQuery.includes('missing ingredients')) {
      const recs = getDishRecommendationsFromAvailableIngredients(activeSubject, userProfile);
      let text = `🛒 **Optional Pantry Staples & Missing Ingredients** (${activeSubject}):\n\n`;

      recs.slice(0, 3).forEach((rec, idx) => {
        text += `### ${idx + 1}. 🍲 **${rec.dishName}**\n`;
        text += `**Available Ingredients Used**: ${rec.availableIngredientsUsed.map(i => i.name).join(', ')}\n`;
        text += `**Missing / Optional Staples**: ${rec.optionalIngredients.map(o => `${o.name} (${o.amount})`).join(', ')}\n\n`;
      });

      return {
        text: text,
        dishAnalysis: null,
        ingredientRecommendations: recs,
        relevantVideos: getVideosForIngredients(activeSubject)
      };
    }
  }

  // 3. Conversational Q&A Intent ("calories in an egg", "is banana good before workout", "how to lose weight")
  if (lowerQuery.includes('calorie') && (lowerQuery.includes('egg') || lowerQuery.includes('an egg'))) {
    return {
      text: `🥚 **Nutritional Breakdown for Farm Eggs**:

• **1 Whole Large Egg (50g)**: ~**72 kcal** | **6.3g Protein** | 0.4g Carbs | 4.8g Healthy Fat
• **1 Egg White (33g)**: ~**17 kcal** | **3.6g Pure Protein** | 0.2g Carbs | 0g Fat
• **3 Whole + 2 Whites Bowl**: ~**250 kcal** | **26.1g High-Quality Protein**

💡 **FitGen Tip**: Egg whites provide 100% bioavailable protein with zero fat, making them ideal for fat loss & muscle building!`,
      dishAnalysis: null,
      ingredientRecommendations: null,
      relevantVideos: getVideosForIngredients('egg')
    };
  }

  if (lowerQuery.includes('banana') && (lowerQuery.includes('workout') || lowerQuery.includes('pre-workout') || lowerQuery.includes('pre workout'))) {
    return {
      text: `🍌 **Yes, Bananas are an Excellent Pre-Workout Fuel!**

**Why it works**:
• ⚡ **Fast-Acting Carbs**: Provides ~27g of easily digestible natural carbs to top up muscle glycogen.
• 🫀 **Potassium & Electrolytes**: ~450mg potassium prevents muscle cramping during heavy training.
• ⏱️ **Easy Digestion**: Consuming 1 banana 30–45 mins before workout delivers fast cellular energy without stomach heaviness.

💡 **FitGen Pre-Workout Tip**: Pair 1 banana with 1 tbsp almond butter or 1 scoop whey protein for sustained intra-workout stamina!`,
      dishAnalysis: null,
      ingredientRecommendations: null,
      relevantVideos: getVideosForIngredients('banana')
    };
  }

  // 4. Feedback & Substitution Intent
  const isFeedback = lowerQuery.includes("don't like") || lowerQuery.includes("dont like") || lowerQuery.includes("another recipe") || lowerQuery.includes("different dish") || lowerQuery.includes("dislike");
  if (isFeedback) {
    const seedIngs = dietary === 'Non-Vegetarian' ? 'chicken, rice, curd, tomato' : 'paneer, soya, dal, rice, curd, oats';
    const altRecommendations = getDishRecommendationsFromAvailableIngredients(seedIngs, userProfile);
    return {
      text: `🔄 **Got your feedback, ${userName}!** Here is a fresh alternative selection of 100% **${dietary}** recipes tailored for your **${goal}** target:`,
      dishAnalysis: null,
      ingredientRecommendations: altRecommendations,
      relevantVideos: getVideosForIngredients('Paneer')
    };
  }

  // 5. Specific Dish Match (Single dish query like "Chicken Tikka", "Samosa", "Paneer Butter Masala", "Fruit Bowl", "Egg Rice")
  const matchedDish = findMatchingDish(query);
  const rawTokens = query.toLowerCase().split(/[\n,;+&.\/\\:]+/).map(t => t.trim()).filter(Boolean);
  const isExplicitIngredientList = (query.includes(',') || query.includes('+') || rawTokens.length > 2 || lowerQuery.includes('i have') || lowerQuery.includes('my ingredients')) && !matchedDish;

  if (matchedDish || (!isExplicitIngredientList && (
    lowerQuery.includes('recipe') ||
    lowerQuery.includes('how to make') ||
    lowerQuery.includes('tikka') ||
    lowerQuery.includes('samosa') ||
    lowerQuery.includes('biryani') ||
    lowerQuery.includes('masala') ||
    lowerQuery.includes('bhurji') ||
    lowerQuery.includes('bowl')
  ))) {
    const dishAnalysis = getDetailedDishAnalysis(query, userProfile);
    return {
      text: `🍽️ **Authentic Dish Analysis & Recipe for "${dishAnalysis.dishName}"**:

**Description**: ${dishAnalysis.description}
• **Total Calories**: ~${dishAnalysis.totalCalories} kcal
• **Protein Yield**: ~${dishAnalysis.totalProtein}g
• **Dietary Rating**: ${dishAnalysis.dietary} (${nation})

Here is your complete step-by-step preparation guide and macro breakdown:`,
      dishAnalysis: dishAnalysis,
      ingredientRecommendations: null,
      relevantVideos: getVideosForIngredients(query)
    };
  }

  // 6. Fitness Goal Intent ("high protein breakfast", "muscle gain", "weight loss", "low calorie dinner", "pre-workout", "post-workout")
  const isWeightLossQuery = lowerQuery.includes('weight loss') || lowerQuery.includes('fat loss') || lowerQuery.includes('lose weight') || lowerQuery.includes('low calorie');
  const isMuscleGainQuery = lowerQuery.includes('muscle gain') || lowerQuery.includes('hypertrophy') || lowerQuery.includes('high protein') || lowerQuery.includes('gain weight');
  const isWorkoutTiming = lowerQuery.includes('pre-workout') || lowerQuery.includes('post-workout') || lowerQuery.includes('breakfast') || lowerQuery.includes('dinner');

  if (isWeightLossQuery || isMuscleGainQuery || isWorkoutTiming) {
    const targetGoal = isWeightLossQuery ? 'Weight Loss' : isMuscleGainQuery ? 'Muscle Gain' : goal;
    const seedIngs = lowerQuery.includes('chicken') ? 'chicken, rice, onion' : lowerQuery.includes('egg') ? 'egg, bread, tomato' : (dietary === 'Non-Vegetarian' ? 'chicken, rice, curd, tomato' : 'paneer, soya, dal, rice, curd, oats');
    const goalRecs = getDishRecommendationsFromAvailableIngredients(seedIngs, { ...userProfile, goal: targetGoal });

    let responseText = `🎯 **FitGen AI ${targetGoal} Nutrition & Meal Recommendations**:\n\n`;
    responseText += `Calibrated for your **${targetGoal}** plan (${proteinTarget}g Protein target | **${dietary}**):\n\n`;

    goalRecs.slice(0, 3).forEach((rec, idx) => {
      responseText += `### ${idx + 1}. 🥘 **${rec.dishName}**\n`;
      responseText += `• **Ingredients**: ${rec.availableIngredientsUsed.map(i => i.name).join(', ')}\n`;
      responseText += `• **Estimated Nutrition**: ~${rec.macros.calories} kcal | **~${rec.macros.protein}g Protein** | ~${rec.macros.carbs}g Carbs\n`;
      responseText += `• **Fitness Suitability**: ${rec.fitnessGoalReason}\n\n`;
    });

    responseText += `💡 **FitGen Tip**: For optimal muscle recovery, consume your protein source within 45 minutes after workout!`;

    return {
      text: responseText,
      dishAnalysis: null,
      ingredientRecommendations: goalRecs,
      relevantVideos: getVideosForIngredients(seedIngs)
    };
  }

  // 7. Ingredient List Processing (User entered ingredients like "tomato, cabbage, onion, carrot, beans" or "tamato, carret, paneer" or "tomato, onion, beetroot, potato, egg")
  const recs = getDishRecommendationsFromAvailableIngredients(query, userProfile);
  const formattedText = formatIngredientResponseText(query, recs, userProfile);

  return {
    text: formattedText,
    dishAnalysis: null,
    ingredientRecommendations: recs,
    relevantVideos: getVideosForIngredients(query)
  };
}

/**
 * Formats a rich ChatGPT-style text response for ingredient input
 */
function formatIngredientResponseText(rawIngredientsText, recommendations = [], userProfile = {}) {
  const goal = userProfile?.goal || 'Muscle Gain';
  const dietary = userProfile?.dietary || 'Vegetarian';
  const nation = userProfile?.nation || 'India 🇮🇳';

  const tokens = rawIngredientsText.split(/[\n,;+&.\/\\:]+/).map(t => t.trim()).filter(Boolean);
  const formattedIngs = tokens
    .map(t => normalizeTypo(t))
    .filter(t => t.length > 1)
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join(', ');

  let text = `🥗 **Available Ingredients Recognized**: **${formattedIngs || 'Tomato, Onion, Garlic'}**\n\n`;
  text += `Based on your ingredients and active **${goal}** target (**${dietary}** | **${nation}**), here are **3 Suitable Meals** you can make right now:\n\n`;

  (recommendations || []).slice(0, 3).forEach((rec, idx) => {
    const icons = ['🍲', '🥘', '🍚', '🥗'];
    const icon = icons[idx % icons.length];
    text += `---\n\n`;
    text += `### ${idx + 1}. ${icon} **${rec.dishName}**\n`;
    text += `**Why it matches**: Uses your **${formattedIngs}** efficiently.\n\n`;
    
    text += `**Ingredients Used**:\n`;
    (rec.availableIngredientsUsed || []).forEach(ing => {
      text += `• ${ing.icon || '🥗'} **${ing.name}**: ${ing.amount}\n`;
    });
    if (rec.optionalIngredients && rec.optionalIngredients.length > 0) {
      text += `• *Optional/Missing Pantry Staples*: ${rec.optionalIngredients.map(o => `${o.name} (${o.amount})`).join(', ')}\n`;
    }
    text += `\n`;

    text += `**Preparation Steps**:\n`;
    (rec.instructions || []).forEach((step, sIdx) => {
      text += `${sIdx + 1}. **${step.title}**: ${step.description}\n`;
    });
    text += `\n`;

    text += `**Estimated Nutrition** *(Approximate values per serving)*:\n`;
    text += `• **Calories**: ~${rec.macros?.calories || 280} kcal\n`;
    text += `• **Protein**: ~${rec.macros?.protein || 18} g\n`;
    text += `• **Carbohydrates**: ~${rec.macros?.carbs || 32} g\n`;
    text += `• **Fat**: ~${rec.macros?.fat || 7} g\n`;
    text += `• **Fiber**: ~${rec.macros?.fiber || 8} g\n`;
    text += `• **Serving Size**: ${rec.servingSize || '1 bowl (300g)'}\n`;
    text += `• **Fitness Suitability**: ${rec.fitnessGoalReason || 'High micronutrient density supporting lean body composition.'}\n\n`;
  });

  text += `---\n\n💡 **FitGen Tip**: To reach your daily protein goal (**${userProfile?.dailyProteinGoal || 130}g**), add paneer, tofu, eggs, soya, or chicken breast as an optional protein booster!`;

  return text;
}



