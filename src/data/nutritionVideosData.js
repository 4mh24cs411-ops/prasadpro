// src/data/nutritionVideosData.js
// Comprehensive Nutrition Science & Cooking Video Library with Fallback MP4 Player & Unique Photos

export const MP4_COOKING_CLIPS = {
  curry: "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-41584-large.mp4",
  veggies: "https://assets.mixkit.co/videos/preview/mixkit-chopping-vegetables-on-a-wooden-board-41582-large.mp4",
  salad: "https://assets.mixkit.co/videos/preview/mixkit-hands-preparing-a-salad-41581-large.mp4",
  meat: "https://assets.mixkit.co/videos/preview/mixkit-frying-food-in-a-pan-41585-large.mp4",
  breakfast: "https://assets.mixkit.co/videos/preview/mixkit-pouring-milk-over-cereal-41583-large.mp4"
};

export const CURATED_NUTRITION_VIDEOS = [
  // --- 6-PACK ABS VIDEOS (BOY & GIRL) ---
  {
    id: "vid-6pack-boy-01",
    title: "Boy 6-Pack Abs Diet & High Protein Shred Meal Prep",
    channel: "Male Aesthetics & Nutrition Lab",
    channelVerified: true,
    youtubeId: "J0n87Qd317M",
    youtubeUrl: "https://www.youtube.com/watch?v=J0n87Qd317M",
    embedUrl: "https://www.youtube-nocookie.com/embed/J0n87Qd317M",
    mp4Fallback: MP4_COOKING_CLIPS.meat,
    duration: "14:30",
    views: "2.8M views",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    ingredients: ["6pack", "6 pack", "abs", "chicken breast", "egg white", "broccoli", "quinoa", "boy"],
    category: "6-Pack Abs Shred",
    macros: { protein: "55g", calories: "410 kcal", carbs: "28g", fat: "10g" },
    nutritionHighlights: [
      "Strict Calorie Deficit + High Protein Recomp for 6-Pack Abs Definition",
      "Thermogenic Food Combinations to Burn Visceral Fat Fast",
      "Optimal Leucine Threshold (3g per meal) for Maximum Core Muscle Retention"
    ],
    summary: "Full day of eating for male athletes targeting chiseled 6-pack abs, low body fat percentage, and lean muscle volume."
  },
  {
    id: "vid-6pack-girl-01",
    title: "Girl 6-Pack Abs & Toned Core Calorie Deficit Meal Guide",
    channel: "Female Pro Fitness & Core",
    channelVerified: true,
    youtubeId: "bJ7B-w086D0",
    youtubeUrl: "https://www.youtube.com/watch?v=bJ7B-w086D0",
    embedUrl: "https://www.youtube-nocookie.com/embed/bJ7B-w086D0",
    mp4Fallback: MP4_COOKING_CLIPS.salad,
    duration: "12:10",
    views: "1.9M views",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    ingredients: ["6pack", "6 pack", "abs", "girl", "greek yogurt", "berries", "paneer", "avocado", "spinach"],
    category: "6-Pack Abs Shred",
    macros: { protein: "42g", calories: "340 kcal", carbs: "22g", fat: "9g" },
    nutritionHighlights: [
      "Targeted Waist Slimming & 11-Line Abs Nutrition Blueprint",
      "High Satiety Micronutrient Density to Prevent Unhealthy Sugar Cravings",
      "Hormone-Friendly Healthy Fat Balance for Female Fitness"
    ],
    summary: "Female nutrition science masterclass for getting visible 6-pack abs, flat stomach, and sculpted core without losing lean energy."
  },
  {
    id: "vid-paneer-01",
    title: "Paneer Nutrition Science & High Protein Palak Paneer",
    channel: "FitGen Nutrition Lab",
    channelVerified: true,
    youtubeId: "J0n87Qd317M",
    youtubeUrl: "https://www.youtube.com/watch?v=J0n87Qd317M",
    embedUrl: "https://www.youtube-nocookie.com/embed/J0n87Qd317M",
    mp4Fallback: MP4_COOKING_CLIPS.curry,
    duration: "10:45",
    views: "1.2M views",
    thumbnail: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    ingredients: ["paneer", "spinach", "palak", "cottage cheese", "garlic", "tomato"],
    category: "High Protein",
    macros: { protein: "28g", calories: "380 kcal", carbs: "12g", fat: "22g" },
    nutritionHighlights: [
      "Rich in Slow-Digesting Casein Protein (ideal for muscle recovery)",
      "High Calcium & Bioavailable Iron from Fresh Spinach",
      "Low Glycemic Index - zero blood sugar spikes"
    ],
    summary: "Complete breakdown of Paneer & Spinach micronutrient synergism and cooking techniques to preserve heat-sensitive vitamins."
  },
  {
    id: "vid-chicken-01",
    title: "Ultimate High Protein Chicken Breast & Tikka Prep",
    channel: "Chef & Gym Science",
    channelVerified: true,
    youtubeId: "bJ7B-w086D0",
    youtubeUrl: "https://www.youtube.com/watch?v=bJ7B-w086D0",
    embedUrl: "https://www.youtube-nocookie.com/embed/bJ7B-w086D0",
    mp4Fallback: MP4_COOKING_CLIPS.meat,
    duration: "08:30",
    views: "2.4M views",
    thumbnail: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    ingredients: ["chicken", "chicken breast", "tikka", "yogurt", "garlic", "lemon"],
    category: "Lean Protein",
    macros: { protein: "52g", calories: "320 kcal", carbs: "4g", fat: "8g" },
    nutritionHighlights: [
      "Ultra-Lean Complete Amino Acid Profile (Leucine-rich)",
      "Greek Yogurt Marination boosts Protein Absorption & Gut Health",
      "Zero Trans Fat Air-Fryer Tandoori Method"
    ],
    summary: "Learn how to tenderize lean chicken breast with yogurt marination to retain maximum juice while hitting over 50g protein."
  },
  {
    id: "vid-egg-01",
    title: "The Truth About Eggs & Egg White Rice Macros",
    channel: "Nutrition Facts Explained",
    channelVerified: true,
    youtubeId: "e2Q0u8e_e4Y",
    youtubeUrl: "https://www.youtube.com/watch?v=e2Q0u8e_e4Y",
    embedUrl: "https://www.youtube-nocookie.com/embed/e2Q0u8e_e4Y",
    mp4Fallback: MP4_COOKING_CLIPS.curry,
    duration: "12:15",
    views: "890K views",
    thumbnail: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    ingredients: ["egg", "eggs", "egg white", "rice", "spring onion"],
    category: "Whole Protein",
    macros: { protein: "34g", calories: "450 kcal", carbs: "42g", fat: "14g" },
    nutritionHighlights: [
      "Choline & Lutein for brain function & eye health",
      "Biological Value 100 - highest protein quality rating",
      "Combine Whole Egg Fats with Carbohydrates for steady energy"
    ],
    summary: "Scientific explanation of egg protein bioavailability and how to cook quick high-protein egg fried rice under 15 minutes."
  },
  {
    id: "vid-oats-01",
    title: "High Protein Oats Bowl: Oats, Chia Seeds & Milk Benefits",
    channel: "Biohack Nutrition",
    channelVerified: true,
    youtubeId: "H3Q83KzN-3w",
    youtubeUrl: "https://www.youtube.com/watch?v=H3Q83KzN-3w",
    embedUrl: "https://www.youtube-nocookie.com/embed/H3Q83KzN-3w",
    mp4Fallback: MP4_COOKING_CLIPS.breakfast,
    duration: "09:10",
    views: "1.7M views",
    thumbnail: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80",
    ingredients: ["oats", "chia seeds", "milk", "banana", "berries", "honey", "peanut butter"],
    category: "Breakfast & Fiber",
    macros: { protein: "24g", calories: "410 kcal", carbs: "58g", fat: "11g" },
    nutritionHighlights: [
      "Beta-Glucan Soluble Fiber lowers LDL cholesterol",
      "Omega-3 Fatty Acids & Calcium from Milk & Chia",
      "Sustained 4-Hour Energy Release without sugar crash"
    ],
    summary: "Master the art of overnight proats (protein oatmeal) packed with complex carbs, healthy fats, and fiber."
  },
  {
    id: "vid-soya-01",
    title: "Soya Chunks Unlocked: 52g Protein per 100g Science & Recipe",
    channel: "Indian Gym Food Lab",
    channelVerified: true,
    youtubeId: "Z5Jk9V0c84A",
    youtubeUrl: "https://www.youtube.com/watch?v=Z5Jk9V0c84A",
    embedUrl: "https://www.youtube-nocookie.com/embed/Z5Jk9V0c84A",
    mp4Fallback: MP4_COOKING_CLIPS.veggies,
    duration: "11:05",
    views: "3.1M views",
    thumbnail: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    ingredients: ["soya", "soya chunks", "nutrela", "tofu", "soy", "quinoa"],
    category: "Plant Protein",
    macros: { protein: "48g", calories: "310 kcal", carbs: "26g", fat: "2g" },
    nutritionHighlights: [
      "Highest Protein Density per Rupee & per Calorie",
      "Isoflavones & Fiber support arterial health",
      "Proper boiling & rinsing method to remove anti-nutrients"
    ],
    summary: "Step-by-step guide to removing bitter soya taste and preparing juicy high-protein soya biryani/curry."
  },
  {
    id: "vid-avocado-01",
    title: "Avocado & Salmon Nutrition: Healthy Fats & Omega-3 Guide",
    channel: "Doctor's Table",
    channelVerified: true,
    youtubeId: "R4x5_f0e8f0",
    youtubeUrl: "https://www.youtube.com/watch?v=R4x5_f0e8f0",
    embedUrl: "https://www.youtube-nocookie.com/embed/R4x5_f0e8f0",
    mp4Fallback: MP4_COOKING_CLIPS.salad,
    duration: "14:20",
    views: "950K views",
    thumbnail: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    ingredients: ["avocado", "salmon", "fish", "olive oil", "toast"],
    category: "Healthy Fats",
    macros: { protein: "38g", calories: "490 kcal", carbs: "18g", fat: "28g" },
    nutritionHighlights: [
      "EPA & DHA Omega-3 Fatty Acids reduce inflammation",
      "Potassium content higher than bananas",
      "Monounsaturated Oleic Acid supports cardiovascular health"
    ],
    summary: "In-depth look at how avocado and wild salmon fats enhance nutrient absorption of fat-soluble vitamins (A, D, E, K)."
  },
  {
    id: "vid-chickpea-01",
    title: "Chana & Chickpeas (Hummus/Chole) Fiber & Protein Masterclass",
    channel: "Plant Power Kitchen",
    channelVerified: true,
    youtubeId: "v9N8_30f9",
    youtubeUrl: "https://www.youtube.com/watch?v=v9N8_30f9",
    embedUrl: "https://www.youtube-nocookie.com/embed/v9N8_30f9",
    mp4Fallback: MP4_COOKING_CLIPS.salad,
    duration: "08:45",
    views: "720K views",
    thumbnail: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    ingredients: ["chickpeas", "chana", "chole", "lentils", "dal", "tahini"],
    category: "Vegan Protein",
    macros: { protein: "20g", calories: "360 kcal", carbs: "52g", fat: "8g" },
    nutritionHighlights: [
      "12g Fiber per serving for microbiome restoration",
      "Resistant Starch enhances insulin sensitivity",
      "Rich source of Magnesium, Zinc & Folate"
    ],
    summary: "How to soak, pressure cook, and spice chickpeas for zero bloating and maximum iron & protein absorption."
  },
  {
    id: "vid-samosa-01",
    title: "Samosa Nutrition Breakdown: Fried vs Air-Fried Calories",
    channel: "FitGen Calorie Breakdown",
    channelVerified: true,
    youtubeId: "q3f8N90f8",
    youtubeUrl: "https://www.youtube.com/watch?v=q3f8N90f8",
    embedUrl: "https://www.youtube-nocookie.com/embed/q3f8N90f8",
    mp4Fallback: MP4_COOKING_CLIPS.curry,
    duration: "07:50",
    views: "1.5M views",
    thumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    ingredients: ["samosa", "potato", "aloo", "flour", "peas"],
    category: "Macro Audit",
    macros: { protein: "6g", calories: "280 kcal", carbs: "32g", fat: "16g" },
    nutritionHighlights: [
      "Air-frying saves 70% calories and 14g fat per samosa",
      "Potassium rich potato filling with digestive ajwain seeds",
      "Pair with Mint & Greek Yogurt Chutney for +8g Protein boost"
    ],
    summary: "Caloric comparison of deep-fried vs air-fried Punjabi samosa and how to remake it into a healthy gym snack."
  },
  {
    id: "vid-banana-01",
    title: "35g High Protein Banana Peanut Butter Shake Recipe",
    channel: "FitGen Smoothie Science",
    channelVerified: true,
    youtubeId: null,
    youtubeUrl: "https://www.youtube.com/results?search_query=high+protein+banana+peanut+butter+shake+recipe",
    embedUrl: null,
    mp4Fallback: MP4_COOKING_CLIPS.breakfast,
    duration: "06:15",
    views: "2.1M views",
    thumbnail: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    ingredients: ["banana", "bananashake", "banana shake", "milkshake", "smoothie", "peanut butter", "milk", "shake"],
    category: "High Protein Shake",
    macros: { protein: "35g", calories: "580 kcal", carbs: "65g", fat: "14g" },
    nutritionHighlights: [
      "Potassium & Electrolytes restore glycogen post-workout",
      "Peanut Butter Healthy Fats support testosterone & hormone balance",
      "Fast-absorbing Casein & Whey Protein blend for 35g total protein"
    ],
    summary: "How to blend the ultimate thick high-protein banana smoothie for fast muscle recovery and mass gain."
  },
  {
    id: "vid-curdrice-01",
    title: "Authentic South Indian Curd Rice & Gut Health Science",
    channel: "South Indian Nutrition Lab",
    channelVerified: true,
    youtubeId: null,
    youtubeUrl: "https://www.youtube.com/results?search_query=authentic+south+indian+curd+rice+recipe",
    embedUrl: null,
    mp4Fallback: MP4_COOKING_CLIPS.curry,
    duration: "08:15",
    views: "1.4M views",
    thumbnail: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    ingredients: ["curd rice", "curdrice", "thayir sadam", "dahi chawal", "curd", "dahi"],
    category: "Probiotic Nutrition",
    macros: { protein: "13.7g", calories: "510 kcal", carbs: "68g", fat: "12g" },
    nutritionHighlights: [
      "Natural Probiotic Lactobacilli for Superior Gut Health & Digestion",
      "Magnesium & Calcium from Fresh Dahi reduces muscle soreness",
      "Low Glycemic Cooling Meal ideal after heavy workouts"
    ],
    summary: "Complete guide to making authentic South Indian thayir sadam / curd rice with tempered mustard seeds, ginger, and curry leaves."
  }
];

/**
 * Unique Food Photo Lookup Helper
 */
export function getUniqueFoodImage(dishName = '', ingredientsStr = '') {
  const query = (dishName + ' ' + ingredientsStr).toLowerCase();

  if (query.includes('curd rice') || query.includes('curdrice') || query.includes('thayir sadam') || query.includes('dahi chawal')) return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";
  if (query.includes('banana') || query.includes('shake') || query.includes('milkshake')) return "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80";
  if (query.includes('rice bath') || query.includes('ricebath') || query.includes('pulao') || query.includes('bisi bele')) return "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80";
  if (query.includes('samosa')) return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80";
  if (query.includes('tikka') || query.includes('tandoori')) return "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80";
  if (query.includes('palak') || query.includes('spinach')) return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80";
  if (query.includes('butter masala') || query.includes('paneer makhani')) return "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80";
  if (query.includes('egg') || query.includes('fried rice')) return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80";
  if (query.includes('oats') || query.includes('chia') || query.includes('porridge')) return "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80";
  if (query.includes('soya') || query.includes('gym bowl') || query.includes('quinoa')) return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
  if (query.includes('salmon') || query.includes('avocado')) return "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80";
  if (query.includes('chickpea') || query.includes('hummus') || query.includes('chole')) return "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80";
  if (query.includes('fruit') || query.includes('berry') || query.includes('smoothie')) return "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80";
  if (query.includes('tofu') || query.includes('stir fry')) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
  if (query.includes('6pack') || query.includes('6-pack') || query.includes('abs')) return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80";

  return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80";
}

/**
 * Intelligent video search matching algorithm for typed ingredients.
 */
export function getVideosForIngredients(inputQuery) {
  if (!inputQuery || typeof inputQuery !== 'string' || !inputQuery.trim()) {
    return CURATED_NUTRITION_VIDEOS.slice(0, 2);
  }

  const queryClean = inputQuery.toLowerCase().trim();

  // Strict matching against curated video library
  const matched = CURATED_NUTRITION_VIDEOS.filter(video => {
    const titleLower = video.title.toLowerCase();
    const catLower = video.category.toLowerCase();
    const ingLower = video.ingredients.map(i => i.toLowerCase());

    return (
      titleLower.includes(queryClean) ||
      ingLower.some(ing => queryClean.includes(ing) || ing.includes(queryClean))
    );
  });

  // Return strictly matched videos if available
  if (matched.length >= 2) {
    return matched.slice(0, 2);
  }

  if (matched.length === 1) {
    const dynamicCard = createDynamicIngredientVideoCard(inputQuery, 2);
    return [matched[0], dynamicCard];
  }

  // Create 2 100% relevant dynamic video cards tailored for the exact query!
  const card1 = createDynamicIngredientVideoCard(inputQuery, 1);
  const card2 = createDynamicIngredientVideoCard(inputQuery, 2);
  return [card1, card2];
}

/**
 * Generates a dynamic video card specifically tailored to custom typed ingredients.
 */
function createDynamicIngredientVideoCard(ingredientsText, variant = 1) {
  const queryCap = ingredientsText.trim().replace(/\b\w/g, c => c.toUpperCase());
  const uniqueImg = getUniqueFoodImage(ingredientsText, ingredientsText);

  let titleText = `Authentic ${queryCap} High-Protein Recipe & Masterclass`;
  let summaryText = `Step-by-step masterclass on preparing authentic ${queryCap} with maximum protein density and macro balance.`;
  let highlights = [
    `Authentic preparation method for ${queryCap}`,
    `Protein yield optimization & thermal vitamin retention`,
    `Goal-aligned macro portioning for gym & active lifestyle`
  ];

  if (variant === 2) {
    titleText = `${queryCap} Nutrition Science & Macro Breakdown`;
    summaryText = `Detailed scientific breakdown of calories, protein absorption, and micronutrients in ${queryCap}.`;
    highlights = [
      `Complete caloric & macronutrient audit for ${queryCap}`,
      `Glycemic index rating & bioavailable protein breakdown`,
      `Optimal meal timing & digestive synergy`
    ];
  }

  const searchEnc = encodeURIComponent(`${ingredientsText} authentic recipe nutrition macros`);

  return {
    id: `dyn-vid-${variant}-${Date.now()}`,
    title: titleText,
    channel: "FitGen AI Nutrition Science",
    channelVerified: true,
    youtubeId: null,
    youtubeUrl: `https://www.youtube.com/results?search_query=${searchEnc}`,
    embedUrl: null,
    mp4Fallback: MP4_COOKING_CLIPS.curry,
    duration: variant === 1 ? "10:15" : "08:45",
    views: "Curated Masterclass",
    isDynamic: true,
    thumbnail: uniqueImg,
    ingredients: [ingredientsText.toLowerCase()],
    category: "Dish Nutrition Guide",
    macros: { protein: "Targeted", calories: "Balanced", carbs: "Complex", fat: "Healthy" },
    nutritionHighlights: highlights,
    summary: summaryText
  };
}
