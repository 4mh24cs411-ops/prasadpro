export const RECIPES_DATABASE = [
  // --- INDIAN CUISINE RECIPES ---
  {
    id: "ind-01",
    name: "High-Protein Palak Paneer Bowl",
    cuisine: "Indian",
    region: "North Indian",
    dietary: "Vegetarian",
    fitnessGoals: ["Muscle Gain", "Weight Loss", "Maintenance"],
    workoutType: "Strength Training High-Protein",
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTimeMins: 35,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description: "Creamy spinach curry with pan-seared paneer cubes packed with iron, calcium, and lean vegetarian protein.",
    macros: {
      calories: 420,
      protein: 28,
      carbs: 18,
      fat: 24,
      fiber: 9
    },
    micros: {
      iron: "45% DV",
      calcium: "60% DV",
      vitC: "50% DV"
    },
    keyIngredients: ["paneer", "spinach", "onion", "tomato", "garlic", "ginger", "cumin", "garam masala", "olive oil"],
    ingredients: [
      { name: "Fresh Paneer", amount: "200g", icon: "🧀" },
      { name: "Baby Spinach (Palak)", amount: "300g", icon: "🥬" },
      { name: "Finely Chopped Onion", amount: "1 medium", icon: "🧅" },
      { name: "Ripe Tomato Puree", amount: "2 medium", icon: "🍅" },
      { name: "Garlic Cloves", amount: "5 cloves (minced)", icon: "🧄" },
      { name: "Ginger Paste", amount: "1 tsp", icon: "🫚" },
      { name: "Cumin Seeds", amount: "1 tsp", icon: "🌿" },
      { name: "Garam Masala & Turmeric", amount: "1 tsp each", icon: "🌶️" },
      { name: "Cold Pressed Oil / Light Ghee", amount: "1 tbsp", icon: "🥄" }
    ],
    instructions: [
      {
        step: 1,
        title: "Blanch Spinach",
        description: "Boil water in a pot. Add spinach leaves for 2 minutes, then immediately plunge into ice water to preserve bright green color. Puree coarsely.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Sear Paneer",
        description: "Cube paneer into 1-inch pieces. Lightly sear in a non-stick pan with 1/2 tsp oil until golden-brown on sides. Set aside.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Sauté Aromatics",
        description: "Heat remaining oil in pan. Sauté cumin seeds until crackling. Add minced garlic, ginger, and onions. Cook until light caramel brown.",
        timerSeconds: 240
      },
      {
        step: 4,
        title: "Simmer & Spices",
        description: "Stir in tomato puree, turmeric, coriander powder, and salt. Cook until oil separates from the masala gravy.",
        timerSeconds: 300
      },
      {
        step: 5,
        title: "Combine & Serve",
        description: "Fold in spinach puree and seared paneer cubes. Sprinkle garam masala and simmer for 3 minutes. Garnish with a spoonful of Greek yogurt if desired.",
        timerSeconds: 180
      }
    ],
    allergens: ["Dairy"]
  },
  {
    id: "egg-01",
    name: "Authentic Macro-Optimized Egg Rice",
    cuisine: "Indian",
    region: "Asian / Indian Fusion",
    dietary: "Eggetarian",
    fitnessGoals: ["Muscle Gain", "Weight Loss", "Maintenance"],
    workoutType: "Strength Training High-Protein",
    prepTime: "10 mins",
    cookTime: "12 mins",
    totalTimeMins: 22,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    description: "Flavorful pan-tossed basmati rice cooked with whole eggs, egg whites, spring onions, garlic, and high-protein macro-optimized spices.",
    macros: {
      calories: 545,
      protein: 37,
      carbs: 48,
      fat: 16,
      fiber: 5
    },
    micros: {
      iron: "35% DV",
      calcium: "25% DV",
      vitC: "30% DV"
    },
    keyIngredients: ["egg", "rice", "onion", "garlic", "spring onion", "soy sauce", "olive oil"],
    ingredients: [
      { name: "Whole Eggs & Egg Whites", amount: "3 whole + 2 whites", icon: "🥚" },
      { name: "Cooked Basmati / Brown Rice", amount: "1.5 cups (200g)", icon: "🍚" },
      { name: "Fresh Veggies & Spring Onions", amount: "1 cup chopped", icon: "🥦" },
      { name: "Light Soy Sauce & Spices", amount: "1.5 tbsp", icon: "🌶️" },
      { name: "Healthy Cold-Pressed Olive Oil / Ghee", amount: "1 tbsp", icon: "🫒" }
    ],
    instructions: [
      {
        step: 1,
        title: "Whisk & Scramble Eggs",
        description: "Whisk eggs with pinch of salt and pepper. Scramble in a skillet with 1/2 tsp oil until soft curds form.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Sauté Aromatics & Veggies",
        description: "Sauté minced garlic, ginger, chopped onions, bell peppers, and spring greens on high heat.",
        timerSeconds: 240
      },
      {
        step: 3,
        title: "Toss Rice & Serve",
        description: "Add cooked basmati rice, soy sauce, and scrambled eggs. High heat toss for 3 mins.",
        timerSeconds: 180
      }
    ],
    allergens: ["Egg", "Soy"]
  },
  {
    id: "ind-02",
    name: "Tandoori Spiced Chicken Breast & Quinoa Bowl",
    cuisine: "Indian",
    region: "Pan-Indian",
    dietary: "Non-Vegetarian",
    fitnessGoals: ["Muscle Gain", "Weight Loss"],
    workoutType: "HIIT Post-Workout",
    prepTime: "20 mins",
    cookTime: "25 mins",
    totalTimeMins: 45,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    description: "Juicy tandoori marinated chicken breast grilled to perfection, served over fluffy spice-infused quinoa with cucumber mint raita.",
    macros: {
      calories: 510,
      protein: 46,
      carbs: 42,
      fat: 14,
      fiber: 7
    },
    micros: {
      iron: "30% DV",
      calcium: "20% DV",
      vitC: "35% DV"
    },
    keyIngredients: ["chicken", "quinoa", "yogurt", "lemon", "tandoori masala", "garlic", "cucumber", "mint"],
    ingredients: [
      { name: "Chicken Breast", amount: "250g", icon: "🍗" },
      { name: "White/Tri-color Quinoa", amount: "100g (dry)", icon: "🌾" },
      { name: "Low-fat Greek Yogurt", amount: "4 tbsp", icon: "🥣" },
      { name: "Lemon Juice", amount: "1 tbsp", icon: "🍋" },
      { name: "Tandoori Masala & Kashmiri Chili", amount: "1.5 tbsp", icon: "🌶️" },
      { name: "Minced Garlic & Ginger", amount: "1 tbsp", icon: "🧄" },
      { name: "Cucumber & Fresh Mint", amount: "1/2 cup chopped", icon: "🥒" }
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate Chicken",
        description: "Score chicken breasts. Whisk yogurt, lemon juice, garlic, ginger, tandoori masala, salt, and 1 tsp oil. Coat chicken thoroughly and rest for 15 mins.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Cook Quinoa",
        description: "Rinse quinoa thoroughly. Bring 2 cups water to boil with a pinch of cumin and salt. Add quinoa, cover and simmer on low for 15 mins until fluffy.",
        timerSeconds: 900
      },
      {
        step: 3,
        title: "Grill Chicken",
        description: "Preheat grill pan or skillet over medium-high heat. Cook chicken breast 6-7 minutes per side until internal temperature reaches 165°F (74°C).",
        timerSeconds: 420
      },
      {
        step: 4,
        title: "Assemble Fit Bowl",
        description: "Slice grilled chicken. Fluff quinoa into a bowl, arrange chicken, and serve alongside freshly mixed cucumber mint yogurt raita.",
        timerSeconds: 120
      }
    ],
    allergens: ["Dairy"]
  },
  {
    id: "ind-03",
    name: "South Indian Oats & Lentil Dosa Bowl",
    cuisine: "Indian",
    region: "South Indian",
    dietary: "Vegan",
    fitnessGoals: ["Weight Loss", "Maintenance", "Endurance"],
    workoutType: "Cardio Recovery",
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTimeMins: 25,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    description: "Instant high-fiber crispy rolled oats and yellow moong dal crepes served with spicy coconut-free tomato chutney.",
    macros: {
      calories: 340,
      protein: 16,
      carbs: 54,
      fat: 6,
      fiber: 12
    },
    micros: {
      iron: "35% DV",
      calcium: "12% DV",
      vitC: "25% DV"
    },
    keyIngredients: ["oats", "moong dal", "green chili", "ginger", "curry leaves", "mustard seeds", "tomato"],
    ingredients: [
      { name: "Rolled Oats", amount: "1 cup", icon: "🌾" },
      { name: "Yellow Moong Dal (Soaked)", amount: "1/2 cup", icon: "🫘" },
      { name: "Green Chilis & Ginger", amount: "1 each", icon: "🌶️" },
      { name: "Curry Leaves & Mustard Seeds", amount: "1 tsp", icon: "🍃" },
      { name: "Ripe Tomato & Garlic", amount: "2 tomatoes", icon: "🍅" }
    ],
    instructions: [
      {
        step: 1,
        title: "Blend Dosa Batter",
        description: "Blend oats, soaked moong dal, green chili, ginger, pinch of asafoetida, salt and 3/4 cup water into a smooth batter consistency.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Prepare Tomato Chutney",
        description: "Sauté tomatoes and garlic in 1/2 tsp oil. Blend with salt and red chili. Temper with mustard seeds and curry leaves.",
        timerSeconds: 300
      },
      {
        step: 3,
        title: "Pour & Crisp Dosa",
        description: "Heat a non-stick tawa. Ladle batter into center and spread in circular motion. Drizzle drops of oil. Cook until edges turn golden and crisp.",
        timerSeconds: 240
      }
    ],
    allergens: ["None"]
  },
  {
    id: "ind-04",
    name: "Amritsari Chole Protein Power Bowl",
    cuisine: "Indian",
    region: "North Indian",
    dietary: "Vegan",
    fitnessGoals: ["Muscle Gain", "Maintenance", "Endurance"],
    workoutType: "Heavy Strength",
    prepTime: "15 mins",
    cookTime: "30 mins",
    totalTimeMins: 45,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    description: "Hearty spiced chickpea curry infused with tea-steeped aromatics, pomegranate powder, coriander, and brown rice.",
    macros: {
      calories: 480,
      protein: 22,
      carbs: 72,
      fat: 10,
      fiber: 16
    },
    micros: {
      iron: "50% DV",
      calcium: "18% DV",
      vitC: "30% DV"
    },
    keyIngredients: ["chickpeas", "brown rice", "onion", "tomato", "chole masala", "garlic", "ginger", "lemon"],
    ingredients: [
      { name: "Boiled Chickpeas (Kabuli Chana)", amount: "250g", icon: "🫛" },
      { name: "Cooked Brown Rice", amount: "1 cup", icon: "🍚" },
      { name: "Finely Chopped Onion & Tomato", amount: "1 large each", icon: "🧅" },
      { name: "Ginger Garlic Paste", amount: "1 tbsp", icon: "🧄" },
      { name: "Chole Masala & Amchur Powder", amount: "1.5 tbsp", icon: "🌶️" },
      { name: "Fresh Lemon Juice & Cilantro", amount: "For garnish", icon: "🍋" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sauté Base",
        description: "Heat oil in a heavy pot. Add cumin, minced onions, and ginger-garlic paste. Sauté until deep golden brown.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Add Spices & Tomatoes",
        description: "Add chopped tomatoes, chole masala, turmeric, coriander powder, and amchur (dried mango powder). Cook until tomatoes melt into paste.",
        timerSeconds: 360
      },
      {
        step: 3,
        title: "Simmer Chickpeas",
        description: "Pour boiled chickpeas with broth water. Lightly mash 20% of chickpeas with back of spoon for rich gravy texture. Simmer for 15 mins.",
        timerSeconds: 900
      },
      {
        step: 4,
        title: "Serve with Brown Rice",
        description: "Ladle hot Amritsari chole over warm brown rice. Top with lemon squeeze and julienned raw ginger.",
        timerSeconds: 60
      }
    ],
    allergens: ["None"]
  },
  {
    id: "ind-05",
    name: "Desi Egg Bhurji & Multigrain Toast",
    cuisine: "Indian",
    region: "Pan-Indian",
    dietary: "Eggetarian",
    fitnessGoals: ["Weight Loss", "Muscle Gain"],
    workoutType: "HIIT Post-Workout",
    prepTime: "10 mins",
    cookTime: "10 mins",
    totalTimeMins: 20,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Indian street-style spiced scrambled eggs with sautéed bell peppers, onions, tomatoes, and whole grain toast.",
    macros: {
      calories: 390,
      protein: 26,
      carbs: 28,
      fat: 18,
      fiber: 5
    },
    micros: {
      iron: "22% DV",
      calcium: "14% DV",
      vitC: "45% DV"
    },
    keyIngredients: ["egg", "onion", "tomato", "bell pepper", "green chili", "turmeric", "bread", "butter"],
    ingredients: [
      { name: "Whole Eggs & Egg Whites", amount: "3 whole + 2 whites", icon: "🥚" },
      { name: "Finely Chopped Onion & Tomato", amount: "1 small each", icon: "🧅" },
      { name: "Green Bell Pepper", amount: "1/2 chopped", icon: "🫑" },
      { name: "Green Chili & Cilantro", amount: "To taste", icon: "🌿" },
      { name: "Multigrain Bread", amount: "2 slices", icon: "🍞" }
    ],
    instructions: [
      {
        step: 1,
        title: "Whisk Eggs",
        description: "Whisk 3 whole eggs and 2 egg whites with salt, turmeric, and pinch of red chili powder in a bowl.",
        timerSeconds: 60
      },
      {
        step: 2,
        title: "Sauté Veggies",
        description: "Melt 1 tsp olive oil or butter in skillet. Add onions, green chilis, bell peppers, and tomatoes. Sauté for 3 mins until fragrant.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Scramble & Toast",
        description: "Pour whisked eggs into skillet. Stir gently on medium-low heat to form soft spiced curds. Toast bread slices alongside.",
        timerSeconds: 180
      }
    ],
    allergens: ["Eggs", "Gluten"]
  },

  // --- WESTERN CUISINE RECIPES ---
  {
    id: "wst-01",
    name: "Grilled Herb Salmon & Asparagus Quinoa",
    cuisine: "Western",
    region: "Mediterranean",
    dietary: "Non-Vegetarian",
    fitnessGoals: ["Muscle Gain", "Weight Loss", "Maintenance"],
    workoutType: "Strength Training High-Protein",
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTimeMins: 30,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    description: "Omega-3 rich wild salmon fillet seasoned with lemon herb butter, paired with grilled asparagus and lemon quinoa.",
    macros: {
      calories: 540,
      protein: 44,
      carbs: 36,
      fat: 22,
      fiber: 6
    },
    micros: {
      iron: "28% DV",
      calcium: "15% DV",
      vitC: "35% DV"
    },
    keyIngredients: ["salmon", "asparagus", "quinoa", "lemon", "olive oil", "garlic", "dill", "thyme"],
    ingredients: [
      { name: "Fresh Salmon Fillet", amount: "220g", icon: "🐟" },
      { name: "Fresh Asparagus Spears", amount: "10-12 spears", icon: "🌱" },
      { name: "Cooked Quinoa", amount: "1 cup", icon: "🌾" },
      { name: "Extra Virgin Olive Oil", amount: "1 tbsp", icon: "🫒" },
      { name: "Garlic & Fresh Dill / Thyme", amount: "1 tbsp minced", icon: "🌿" },
      { name: "Lemon Wedges", amount: "1 whole lemon", icon: "🍋" }
    ],
    instructions: [
      {
        step: 1,
        title: "Season Salmon & Asparagus",
        description: "Pat salmon dry. Rub salmon fillet and asparagus with olive oil, minced garlic, fresh dill, salt, black pepper, and lemon zest.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Pan-Sear Salmon",
        description: "Heat skillet on medium-high. Place salmon skin-side down first for 4 mins until crispy. Flip and cook for 3-4 mins until tender.",
        timerSeconds: 480
      },
      {
        step: 3,
        title: "Sear Asparagus",
        description: "In the same pan, grill asparagus spears for 4 minutes until vibrant green and tender-crisp.",
        timerSeconds: 240
      },
      {
        step: 4,
        title: "Plate & Serve",
        description: "Serve salmon over fluffy warm quinoa alongside asparagus with a squeeze of fresh lemon juice.",
        timerSeconds: 60
      }
    ],
    allergens: ["Fish"]
  },
  {
    id: "wst-02",
    name: "Avocado, Egg & Feta Power Toast",
    cuisine: "Western",
    region: "American / Australian",
    dietary: "Eggetarian",
    fitnessGoals: ["Weight Loss", "Maintenance"],
    workoutType: "Yoga Light Fuel",
    prepTime: "10 mins",
    cookTime: "8 mins",
    totalTimeMins: 18,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Crispy artisanal sourdough topped with mashed hass avocado, poached or sunnyside eggs, crumbled feta cheese and chili flakes.",
    macros: {
      calories: 430,
      protein: 21,
      carbs: 34,
      fat: 24,
      fiber: 9
    },
    micros: {
      iron: "18% DV",
      calcium: "22% DV",
      vitC: "20% DV"
    },
    keyIngredients: ["avocado", "egg", "bread", "feta cheese", "lemon", "red pepper flakes", "olive oil"],
    ingredients: [
      { name: "Ripe Hass Avocado", amount: "1 large", icon: "🥑" },
      { name: "Pasture-Raised Eggs", amount: "2 whole", icon: "🥚" },
      { name: "Sourdough / Whole Grain Bread", amount: "2 slices", icon: "🍞" },
      { name: "Crumbled Feta Cheese", amount: "30g", icon: "🧀" },
      { name: "Lemon Juice & Red Pepper Flakes", amount: "1 tsp each", icon: "🌶️" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mash Avocado",
        description: "Halve avocado, remove pit, and scoop into a bowl. Mash with fork along with lemon juice, salt, and cracked black pepper.",
        timerSeconds: 120
      },
      {
        step: 2,
        title: "Cook Eggs",
        description: "Heat skillet with light spray oil. Fry 2 eggs sunny-side up or poach in simmering water for 3 minutes for runny yolk.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Assemble Toast",
        description: "Toast bread slices until golden brown. Spread thick mashed avocado, place eggs on top, sprinkle crumbled feta and red chili flakes.",
        timerSeconds: 120
      }
    ],
    allergens: ["Eggs", "Dairy", "Gluten"]
  },
  {
    id: "wst-03",
    name: "Mediterranean Grilled Chicken & Greek Salad",
    cuisine: "Western",
    region: "Mediterranean",
    dietary: "Non-Vegetarian",
    fitnessGoals: ["Weight Loss", "Muscle Gain"],
    workoutType: "HIIT Post-Workout",
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTimeMins: 30,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: "Lemon oregano marinated grilled chicken breast served over chopped cucumbers, kalamata olives, cherry tomatoes, and extra virgin olive oil.",
    macros: {
      calories: 460,
      protein: 48,
      carbs: 14,
      fat: 23,
      fiber: 4
    },
    micros: {
      iron: "20% DV",
      calcium: "25% DV",
      vitC: "60% DV"
    },
    keyIngredients: ["chicken", "cucumber", "tomato", "olive", "feta cheese", "olive oil", "oregano", "lemon"],
    ingredients: [
      { name: "Chicken Breast", amount: "250g", icon: "🍗" },
      { name: "English Cucumber", amount: "1 cup diced", icon: "🥒" },
      { name: "Cherry Tomatoes", amount: "1 cup halved", icon: "🍅" },
      { name: "Kalamata Olives", amount: "8-10 pitted", icon: "🫒" },
      { name: "Feta Cheese", amount: "40g", icon: "🧀" },
      { name: "Extra Virgin Olive Oil & Oregano", amount: "1.5 tbsp", icon: "🌿" }
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate Chicken",
        description: "Toss chicken with 1 tbsp olive oil, lemon juice, dried oregano, garlic powder, salt, and black pepper.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Chop Salad Base",
        description: "Combine chopped cucumber, cherry tomatoes, olives, and red onion in a salad bowl. Toss with 1/2 tbsp olive oil and red wine vinegar.",
        timerSeconds: 300
      },
      {
        step: 3,
        title: "Grill Chicken",
        description: "Grill chicken breast on medium-high heat for 6 mins each side until juicy and internal temp reaches 165°F.",
        timerSeconds: 420
      },
      {
        step: 4,
        title: "Slice & Top Salad",
        description: "Slice chicken into strips, lay over salad bowl, and top with crumbled feta cheese.",
        timerSeconds: 120
      }
    ],
    allergens: ["Dairy"]
  },
  {
    id: "wst-04",
    name: "Tuscan Garlic Spinach & White Bean Stew",
    cuisine: "Western",
    region: "Italian / Mediterranean",
    dietary: "Vegan",
    fitnessGoals: ["Weight Loss", "Maintenance", "Endurance"],
    workoutType: "Cardio Recovery",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTimeMins: 30,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    description: "Rich Italian-style cannelli white bean soup simmered with sun-dried tomatoes, fresh baby spinach, garlic, and vegetable broth.",
    macros: {
      calories: 360,
      protein: 19,
      carbs: 52,
      fat: 9,
      fiber: 14
    },
    micros: {
      iron: "40% DV",
      calcium: "28% DV",
      vitC: "45% DV"
    },
    keyIngredients: ["cannellini beans", "spinach", "sun dried tomato", "garlic", "onion", "vegetable broth", "olive oil", "rosemary"],
    ingredients: [
      { name: "Cannellini White Beans", amount: "1.5 cans (400g)", icon: "🫘" },
      { name: "Fresh Baby Spinach", amount: "200g", icon: "🥬" },
      { name: "Sun-Dried Tomatoes", amount: "1/4 cup sliced", icon: "🍅" },
      { name: "Garlic Cloves & Onion", amount: "4 cloves + 1 onion", icon: "🧄" },
      { name: "Vegetable Broth", amount: "2 cups", icon: "🥣" },
      { name: "Rosemary & Olive Oil", amount: "1 tbsp", icon: "🌿" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sauté Aromatics",
        description: "Heat olive oil in soup pot. Add diced onion, minced garlic, and fresh rosemary. Cook for 4 mins until soft and fragrant.",
        timerSeconds: 240
      },
      {
        step: 2,
        title: "Simmer Beans & Tomatoes",
        description: "Add rinsed white beans, sun-dried tomatoes, and vegetable broth. Mash 1/3 of the beans with spoon to thicken broth. Simmer 12 mins.",
        timerSeconds: 720
      },
      {
        step: 3,
        title: "Wilt Spinach & Serve",
        description: "Stir in fresh baby spinach until wilted (approx 2 mins). Season with black pepper and red pepper flakes.",
        timerSeconds: 120
      }
    ],
    allergens: ["None"]
  },
  {
    id: "wst-05",
    name: "Lean Beef/Turkey Patty & Sweet Potato Mash",
    cuisine: "Western",
    region: "American",
    dietary: "Non-Vegetarian",
    fitnessGoals: ["Muscle Gain"],
    workoutType: "Heavy Strength",
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTimeMins: 40,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Seasoned 93/7 lean beef or turkey steak patty served alongside cinnamon roasted sweet potato mash and steamed broccoli.",
    macros: {
      calories: 580,
      protein: 52,
      carbs: 48,
      fat: 18,
      fiber: 8
    },
    micros: {
      iron: "38% DV",
      calcium: "12% DV",
      vitC: "70% DV"
    },
    keyIngredients: ["beef", "turkey", "sweet potato", "broccoli", "garlic", "olive oil", "paprika"],
    ingredients: [
      { name: "Lean Ground Beef / Turkey (93/7)", amount: "250g", icon: "🥩" },
      { name: "Sweet Potato", amount: "1 large (250g)", icon: "🍠" },
      { name: "Fresh Broccoli Florets", amount: "1.5 cups", icon: "🥦" },
      { name: "Smoked Paprika & Garlic Powder", amount: "1 tsp each", icon: "🌶️" },
      { name: "Olive Oil Spray", amount: "1 tsp", icon: "🥄" }
    ],
    instructions: [
      {
        step: 1,
        title: "Boil & Mash Sweet Potato",
        description: "Peel and cube sweet potato. Boil in water for 15 mins until tender. Drain and mash with salt, pepper, and pinch of cinnamon.",
        timerSeconds: 900
      },
      {
        step: 2,
        title: "Form & Pan-Sear Patty",
        description: "Mix ground meat with smoked paprika, garlic powder, onion powder, salt, and black pepper. Form into thick patty. Sear 5-6 mins per side.",
        timerSeconds: 420
      },
      {
        step: 3,
        title: "Steam Broccoli",
        description: "Steam broccoli florets over boiling water for 4 minutes until bright green and tender.",
        timerSeconds: 240
      },
      {
        step: 4,
        title: "Plate Meal",
        description: "Serve juicy meat patty with a scoop of sweet potato mash and steamed broccoli.",
        timerSeconds: 60
      }
    ],
    allergens: ["None"]
  }
];

export const PANTRY_PRESET_ITEMS = [
  { name: "paneer", label: "Paneer", icon: "🧀", category: "Protein", cuisine: "Indian" },
  { name: "chicken", label: "Chicken Breast", icon: "🍗", category: "Protein", cuisine: "Both" },
  { name: "spinach", label: "Spinach (Palak)", icon: "🥬", category: "Veggies", cuisine: "Both" },
  { name: "egg", label: "Eggs", icon: "🥚", category: "Protein", cuisine: "Both" },
  { name: "tomato", label: "Tomatoes", icon: "🍅", category: "Veggies", cuisine: "Both" },
  { name: "onion", label: "Onion", icon: "🧅", category: "Veggies", cuisine: "Both" },
  { name: "garlic", label: "Garlic", icon: "🧄", category: "Veggies", cuisine: "Both" },
  { name: "quinoa", label: "Quinoa", icon: "🌾", category: "Grains", cuisine: "Western" },
  { name: "salmon", label: "Salmon Fillet", icon: "🐟", category: "Protein", cuisine: "Western" },
  { name: "oats", label: "Rolled Oats", icon: "🥣", category: "Grains", cuisine: "Both" },
  { name: "chickpeas", label: "Chickpeas", icon: "🫛", category: "Protein", cuisine: "Indian" },
  { name: "avocado", label: "Avocado", icon: "🥑", category: "Healthy Fats", cuisine: "Western" },
  { name: "cucumber", label: "Cucumber", icon: "🥒", category: "Veggies", cuisine: "Both" },
  { name: "bread", label: "Multigrain Bread", icon: "🍞", category: "Grains", cuisine: "Western" },
  { name: "moong dal", label: "Moong Dal", icon: "🫘", category: "Protein", cuisine: "Indian" },
  { name: "sweet potato", label: "Sweet Potato", icon: "🍠", category: "Carbs", cuisine: "Western" }
];

export const PRESET_SCANNER_IMAGES = [
  {
    id: "scan-6pack-01",
    title: "⚡ 6-Pack Abs Shred Meal Bowl (Boy & Girl)",
    subtitle: "Chicken Breast, Boiled Eggs, Broccoli, Sweet Potato, Avocado",
    detectedIngredients: ["chicken", "egg", "broccoli", "sweet potato", "avocado"],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "scan-ind-01",
    title: "Indian Curry & Paneer Basket",
    subtitle: "Paneer, Spinach, Tomatoes, Garlic, Onion, Ginger",
    detectedIngredients: ["paneer", "spinach", "tomato", "onion", "garlic", "ginger"],
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "scan-wst-01",
    title: "Western Fresh Salmon & Greens",
    subtitle: "Salmon, Asparagus, Lemon, Garlic, Olive Oil, Quinoa",
    detectedIngredients: ["salmon", "asparagus", "lemon", "quinoa", "garlic", "olive oil"],
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "scan-gen-01",
    title: "High Protein Poultry & Veggies",
    subtitle: "Chicken, Cucumber, Tomato, Olives, Feta Cheese, Lemon",
    detectedIngredients: ["chicken", "cucumber", "tomato", "olive", "feta cheese", "lemon"],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  }
];
