// --- RECIPES DATABASE ---
const recipes = [
    {   
        id: 1,
        name: "Fluffy Buttermilk Pancakes",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1240,
        img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
        ingredients: [
            "1½ cups all-purpose flour",
            "3½ tsp baking powder",
            "1 tsp salt",
            "1 tbsp white sugar",
            "1¼ cups buttermilk",
            "1 large egg",
            "3 tbsp butter (melted)",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "In a large bowl, sift together flour, baking powder, salt and sugar.",
            "Make a well in the center and pour in milk, egg, vanilla, and melted butter; mix until smooth.",
            "Heat a lightly oiled griddle or frying pan over medium-high heat.",
            "Pour or scoop batter onto griddle, using approximately 1/4 cup for each pancake.",
            "Brown on both sides and serve hot with syrup and fresh berries."
        ],
        prepTime: 15,
        cookTime: 10,
        servings: 4,
        calories: 350,
        youtube: "https://www.youtube.com/watch?v=Nn_Zp_H_3v0",
        comments: []
    },
    {
        id: 2,
        name: "World's Best Lasagna",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 2850,
        img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400",
        ingredients: [
            "1 lb sweet Italian sausage",
            "¾ lb lean ground beef",
            "½ cup minced onion",
            "2 cloves garlic (minced)",
            "28 oz crushed tomatoes",
            "12 oz tomato paste",
            "15 oz tomato sauce",
            "½ cup water",
            "2 tbsp white sugar",
            "12 lasagna noodles",
            "16 oz ricotta cheese",
            "1 egg",
            "¾ lb mozzarella cheese",
            "¾ cup Parmesan cheese"
        ],
        instructions: [
            "Cook sausage, beef, onion, and garlic until browned. Stir in tomatoes, paste, sauce, water, sugar, and seasonings.",
            "Simmer for 1½ hours, stirring occasionally.",
            "Cook lasagna noodles according to package directions.",
            "Combine ricotta with egg and parsley.",
            "Layer noodles, meat sauce, ricotta, mozzarella in a 9x13 pan. Repeat layers.",
            "Cover with foil and bake at 375°F for 25 minutes. Remove foil and bake 25 more minutes.",
            "Let rest for 15 minutes before serving."
        ],
        prepTime: 30,
        cookTime: 90,
        servings: 12,
        calories: 450,
        youtube: "https://www.youtube.com/watch?v=fVDsTP-pTXs",
        comments: []
    },
    {
        id: 3,
        name: "Filipino Chicken Adobo",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 950,
        img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
        ingredients: [
            "2 lbs chicken thighs",
            "½ cup soy sauce",
            "⅓ cup white vinegar",
            "4 cloves garlic (crushed)",
            "2 bay leaves",
            "1 tsp peppercorns",
            "1 tbsp sugar",
            "1 cup water",
            "2 tbsp cooking oil"
        ],
        instructions: [
            "Combine chicken, soy sauce, vinegar, garlic, peppercorns, and bay leaves. Marinate 30 minutes.",
            "Add water and bring to boil. Lower heat and simmer covered for 30 minutes.",
            "Stir in sugar and simmer 10 more minutes until sauce reduces.",
            "Optional: Pan-fry chicken in oil until crisp, then return to sauce.",
            "Serve with steamed rice."
        ],
        prepTime: 15,
        cookTime: 45,
        servings: 6,
        calories: 380,
        youtube: "https://www.youtube.com/watch?v=cONMBueJGAs",
        comments: []
    },
    {
        id: 4,
        name: "Beef Steak (Bistek Tagalog)",
        category: "Main Dish",
        rating: 4.6,
        reviewCount: 610,
        img: "https://cdn.sanity.io/images/f3knbc2s/production/b5318405e36335e00e82b10ffcf7b439fff513af-2500x1600.jpg?auto=format",
        ingredients: [
            "1 lb beef sirloin (thinly sliced)",
            "⅓ cup soy sauce",
            "1 calamansi (or ½ lemon)",
            "½ tsp black pepper",
            "3 cloves garlic (minced)",
            "1 large onion (cut into rings)",
            "3 tbsp cooking oil"
        ],
        instructions: [
            "Marinate beef in soy sauce, calamansi juice, garlic, and pepper for 1 hour.",
            "Heat oil. Sauté onion rings until soft; remove and set aside.",
            "In same pan, fry beef slices in batches until browned.",
            "Pour marinade and simmer 5-10 minutes until beef tender.",
            "Top with sautéed onions and serve with rice."
        ],
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        calories: 420,
        youtube: "https://www.youtube.com/watch?v=xH746HwUlbQ",
        comments: []
    },
    {
        id: 5,
        name: "Authentic Carbonara",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1900,
        img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400",
        ingredients: [
            "10 oz spaghetti",
            "4 oz guanciale or pancetta (diced)",
            "2 large eggs",
            "1 cup Pecorino Romano (grated)",
            "Fresh black pepper",
            "1 clove garlic (optional)"
        ],
        instructions: [
            "Cook pasta in salted water until al dente. Reserve ½ cup pasta water.",
            "Sauté guanciale in large skillet until crispy.",
            "In a bowl, whisk eggs and cheese with plenty of black pepper.",
            "Add hot pasta to skillet with guanciale. Remove from heat.",
            "Pour egg mixture and splash of pasta water over pasta. Toss quickly to create creamy sauce.",
            "Serve immediately with extra cheese and pepper."
        ],
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        calories: 520,
        youtube: "https://www.youtube.com/watch?v=D_2DBLAt57c",
        comments: []
    },
    {
        id: 6,
        name: "Kare-Kare",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 875,
        img: "01 MAIN DISH - KARE-KARE.jpg",
        ingredients: [
            "1 kg Oxtail or beef chuck (boiled until tender)",
            "½ cup Peanut butter (smooth)",
            "¼ cup Toasted ground rice (or cornstarch for thickening)",
            "2 tbsp Annatto seeds/oil (for the orange color)",
            "1 liter Beef broth (from boiling the meat)",
            "1 medium Onion, chopped",
            "4 cloves Garlic, minced",
            "1 bundle String beans (sitaw), cut into 2-inch pieces",
            "2 pieces Eggplant, sliced",
            "1 bundle Bok choy or Pechay",
            "1 piece Banana blossom (puso ng saging), sliced",
            "Salt & Pepper to taste",
            "Bagoong (Shrimp paste) for serving"
        ],
        instructions: [
            "Heat oil in a large pot. Sauté garlic and onions until soft.",
            "Add the tender beef and cook for 2 minutes.",
            "Pour in the beef broth and bring to a simmer.",
            "Stir in the peanut butter and annatto oil until well blended.",
            "Add the toasted rice flour (diluted in a little water) and stir until the sauce thickens.",
            "Add the banana blossoms and string beans. Cook for 3 minutes.",
            "Add the eggplant and bok choy. Simmer for another 2 minutes until tender.",
            "Season with salt and pepper to taste.",
            "Transfer to a bowl and serve hot with a side of sautéed bagoong."
        ],
        prepTime: 30,
        cookTime: 120,
        servings: 6,
        calories: 650,
        youtube: "https://www.youtube.com/watch?v=Na6JTwQ66H0",
        comments: []
    },
    {
        id: 7,
        name: "Lechon Belly with Kare-Kare Sauce",
        category: "Main Dish",
        rating: 5.0,
        reviewCount: 432,
        img: "01 MAIN DISH - LECHON BELLY.webp",
        ingredients: [
            "1 kg Lechon Belly (store-bought or home-roasted), sliced",
            "½ cup Peanut butter",
            "¼ cup Toasted ground rice (diluted in ½ cup water)",
            "2 tbsp Annatto oil (for the orange color)",
            "3 cups Beef or pork broth",
            "1 medium Onion, chopped",
            "4 cloves Garlic, minced",
            "1 bundle String beans (sitaw)",
            "2 pieces Eggplant, sliced",
            "1 bundle Bok choy (pechay)",
            "1 piece Banana blossom (optional)",
            "Bagoong (Shrimp paste) on the side"
        ],
        instructions: [
            "Slice your crispy Lechon Belly into serving pieces. Set aside (do not mix into liquid yet to keep skin crunchy).",
            "In a pot, sauté garlic and onions in a little oil until fragrant.",
            "Pour in the broth and bring to a gentle boil.",
            "Stir in the peanut butter and annatto oil until the sauce is smooth.",
            "Pour in the ground rice mixture. Stir constantly until sauce reaches thick, gravy-like consistency.",
            "Add the banana blossom and string beans; simmer for 3 minutes.",
            "Add the eggplant and bok choy. Cook for another 2 minutes until eggplant is tender.",
            "Pour the sauce and vegetables into a serving bowl.",
            "Top with the crispy lechon belly pieces.",
            "Serve immediately with rice and bagoong."
        ],
        prepTime: 20,
        cookTime: 30,
        servings: 6,
        calories: 780,
        youtube: "https://youtu.be/PWjiWwKWAAY?si=iAXKoBqH9QyNouqc",
        comments: []
    },
    {
        id: 8,
        name: "Adobong Puti (White Adobo)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 567,
        img: "01 MAIN DISH - ADOBONG PUTI.jpg",
        ingredients: [
            "1 kg Pork belly (liempo), cut into cubes",
            "1 cup White cane vinegar (Sukang Paombong or Silver Swan)",
            "1 head Garlic, crushed (use lots!)",
            "1 tsp Whole peppercorns",
            "3 pieces Dried bay leaves (laurel)",
            "2 tsp Salt (adjust to taste)",
            "1 cup Water",
            "2 tbsp Cooking oil (only if the pork isn't fatty)",
            "2 pieces Green chili (siling haba) for a mild kick"
        ],
        instructions: [
            "In a heavy pot, heat oil and sear the pork cubes until edges are golden brown and fat starts to render.",
            "Add the crushed garlic and peppercorns. Sauté until garlic is fragrant but not burnt.",
            "Pour in the vinegar, water, salt, and bay leaves. Do not stir yet—let the vinegar boil for 2–3 minutes to cook off the raw acidic punch.",
            "Lower the heat, cover, and simmer for 30–40 minutes or until pork is tender. Add a little water if it dries out too fast.",
            "Once pork is tender, remove the lid. Let liquid evaporate until only the oil and small amount of concentrated sauce remain.",
            "Add the green chilis and stir. Taste and add more salt if needed.",
            "Let the meat fry slightly in its own rendered fat for 2 more minutes for that authentic, slightly toasted flavor.",
            "Best served with hot garlic rice."
        ],
        prepTime: 15,
        cookTime: 60,
        servings: 6,
        calories: 620,
        youtube: "https://youtu.be/QEZ3ShWZ1BI?si=EwQGcN02TMCUYogW",
        comments: []
    },
    {
        id: 9,
        name: "Adobong Pusit (Squid Adobo)",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 389,
        img: "01 MAIN DISH - ADOBONG PUSIT.webp",
        ingredients: [
            "½ kg Fresh medium squid (cleaned, ink sacs reserved)",
            "⅓ cup Cane vinegar",
            "¼ cup Soy sauce",
            "1 head Garlic, crushed and minced",
            "1 medium Red onion, sliced",
            "2 pieces Tomatoes, diced",
            "1 tsp Whole peppercorns",
            "2 pieces Dried bay leaves",
            "1 tbsp Brown sugar",
            "2 pieces Green chilies (siling haba)",
            "2 tbsp Cooking oil"
        ],
        instructions: [
            "Pull the heads from the bodies of the squid. Remove the clear 'pen' (plastic-like spine) and the beak. Keep the ink sacs in a small bowl with a tablespoon of vinegar and mash them.",
            "In a large pan, heat oil. Sauté the garlic until golden, then add onions and tomatoes. Cook until tomatoes are mushy.",
            "Pour in the soy sauce, the rest of the vinegar, peppercorns, and bay leaves. Let it boil for 2 minutes without stirring to cook the vinegar.",
            "Stir in the mashed ink sacs. This gives the dish its deep black color and umami punch.",
            "Add the squid and chilies. Turn the heat up to medium-high.",
            "Cook for only 3 to 5 minutes. Any longer and the squid will get tough.",
            "Add the sugar, salt, and pepper to taste.",
            "Once the sauce has thickened slightly and the squid is opaque and curled, turn off the heat immediately.",
            "Serve over a mountain of white rice."
        ],
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        calories: 280,
        youtube: "https://youtu.be/1MYnQyHOmCo?si=zONyAnU2JMvj0DJW",
        comments: []
    },
    {
        id: 10,
        name: "Paksiw na Bangus (Milkfish Stew)",
        category: "Main Dish",
        rating: 4.6,
        reviewCount: 421,
        img: "01 MAIN DISH - PAKSIW NA BANGUS.jpg",
        ingredients: [
            "1 large Bangus (Milkfish), cleaned and sliced into steak cuts",
            "½ cup Cane vinegar (Sukang Paombong is best)",
            "1 cup Water",
            "1 thumb-sized Ginger, sliced and pounded",
            "1 head Garlic, crushed",
            "1 medium Onion, sliced",
            "2 pieces Eggplant, sliced diagonally",
            "1 piece Bitter gourd (Ampalaya), sliced (optional)",
            "3 pieces Finger chilies (Siling haba)",
            "1 tsp Whole peppercorns",
            "1 tsp Salt (adjust to taste)",
            "2 tbsp Cooking oil"
        ],
        instructions: [
            "In a medium pot, layer the ginger, garlic, and onions at the bottom to prevent the fish from sticking.",
            "Arrange the bangus slices on top of the aromatics.",
            "Place the eggplant, ampalaya, and finger chilies on top of or around the fish.",
            "Sprinkle the salt and whole peppercorns over everything.",
            "Pour in the vinegar and water. Do not stir.",
            "Turn the heat to medium-high and bring to a boil. Let it bubble for 3–5 minutes uncovered to let the sharp 'bite' of the vinegar evaporate.",
            "Lower the heat, cover the pot, and simmer for 10–12 minutes or until the fish is cooked and the vegetables are tender.",
            "Drizzle the cooking oil over the dish. This balances the acidity and gives the sauce a smoother mouthfeel.",
            "Serve warm with a side of hot rice."
        ],
        prepTime: 15,
        cookTime: 25,
        servings: 4,
        calories: 310,
        youtube: "https://youtu.be/be5p7MDiLyo?si=l4BSkFYqGzmm2iCI",
        comments: []
    },
    {
        id: 11,
        name: "Bulgogi (Korean BBQ Beef)",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 2150,
        img: "01 MAIN DISH - BULGOGI.webp",
        ingredients: [
            "500g Beef sirloin or ribeye (sliced paper-thin)",
            "½ piece Asian pear (grated) or ¼ cup pear juice",
            "3 tbsp Soy sauce",
            "2 tbsp Brown sugar",
            "1 tbsp Sesame oil",
            "3 cloves Garlic, minced",
            "1 tsp Ginger, grated",
            "1 piece Small onion, thinly sliced",
            "2 stalks Green onions, cut into 2-inch pieces",
            "1 tbsp Toasted sesame seeds",
            "¼ tsp Black pepper",
            "1 tbsp Cooking oil (for searing)"
        ],
        instructions: [
            "In a large bowl, mix the grated pear, soy sauce, sugar, sesame oil, garlic, ginger, and pepper.",
            "Add the thinly sliced beef to the marinade. Massage the meat with your hands to ensure every slice is coated.",
            "Add the sliced onions and green onions. Cover and refrigerate for at least 30 minutes (or overnight for the best texture).",
            "Get a heavy skillet or wok ripping hot over high heat. Add the cooking oil.",
            "Add the beef in a single layer (do not crowd the pan, or it will boil instead of sear). Cook for 1–2 minutes per side until caramelized and slightly charred.",
            "Toss everything together quickly once the meat is cooked through.",
            "Sprinkle with toasted sesame seeds and extra chopped green onions.",
            "Serve with steamed rice, lettuce wraps (sangchu-ssam), and kimchi."
        ],
        prepTime: 20,
        cookTime: 10,
        servings: 4,
        calories: 420,
        youtube: "https://youtu.be/_BhDaFe_ZQ0?si=Zw0gosBwnzp8BiVl",
        comments: []
    },
    {
        id: 12,
        name: "Bibimbap (Korean Mixed Rice Bowl)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1870,
        img: "01 MAIN DISH - BIBIMBAP.jpg",
        ingredients: [
            "2 cups Steamed white rice (warm)",
            "150g Ground beef or thinly sliced ribeye",
            "1 bunch Fresh spinach (blanched)",
            "1 cup Bean sprouts (blanched)",
            "1 medium Carrot (julienned and sautéed)",
            "1 small Zucchini (sliced and sautéed)",
            "3-4 pieces Shiitake mushrooms (sliced and sautéed)",
            "1 large Egg (fried sunny-side up)",
            "1 sheet Roasted seaweed (nori), shredded (optional)",
            "2 tbsp Gochujang (Korean red chili paste)",
            "1 tbsp Sesame oil",
            "1 tbsp Brown sugar",
            "1 tbsp Toasted sesame seeds"
        ],
        instructions: [
            "Mix gochujang, sesame oil, brown sugar, and 1 tbsp water in a small bowl until smooth. Set aside.",
            "Heat a pan with a little oil. Sauté the beef over high heat until browned and slightly crispy. Remove and set aside.",
            "Sauté the carrots, zucchini, and mushrooms separately with a pinch of salt until tender but still colorful.",
            "Blanch the spinach and bean sprouts in boiling water for 30 seconds. Drain, squeeze out excess water, and toss with a drop of sesame oil and salt.",
            "Fry your egg sunny-side up—you want the yolk runny so it acts as a creamy sauce when mixed.",
            "Place a big scoop of rice in a deep bowl. Arrange the meat and vegetables in neat piles around the edge.",
            "Place the fried egg in the middle and sprinkle with seaweed and sesame seeds.",
            "Add a generous dollop of the Gochujang sauce.",
            "Use a spoon to vigorously mix everything together until every grain of rice is coated in red sauce and yolk."
        ],
        prepTime: 45,
        cookTime: 20,
        servings: 4,
        calories: 550,
        youtube: "https://youtu.be/5bQTDFUNz6g?si=EexrTivZDuK3WKKx",
        comments: []
    },
    {
        id: 13,
        name: "Galbi (Korean BBQ Short Ribs)",
        category: "Main Dish",
        rating: 5.0,
        reviewCount: 2340,
        img: "01 MAIN DISH - GALBI.jpg",
        ingredients: [
            "1 kg Flanken-style beef short ribs (about ½ inch thick)",
            "½ cup Soy sauce",
            "¼ cup Water",
            "¼ cup Brown sugar",
            "2 tbsp Mirin (rice wine)",
            "1 tbsp Sesame oil",
            "½ piece Asian pear (grated)",
            "1 small Onion (grated)",
            "4 cloves Garlic (minced)",
            "1 tsp Ginger (minced)",
            "2 stalks Green onions (finely chopped)",
            "½ tsp Black pepper"
        ],
        instructions: [
            "Rinse the ribs under cold water to remove any tiny bone fragments. Pat them completely dry with paper towels.",
            "In a large bowl, combine the soy sauce, water, sugar, mirin, sesame oil, grated pear, onion, garlic, ginger, green onions, and pepper.",
            "Submerge the ribs in the marinade. Massage the meat to ensure it's well-coated.",
            "Refrigerate for at least 4 hours, but overnight (8–12 hours) is highly recommended for the most tender results.",
            "Preheat a grill or a heavy cast-iron stovetop griddle to high heat.",
            "Remove ribs from the marinade (let excess drip off). Grill for 3–4 minutes per side until deeply browned and slightly charred on the edges.",
            "Let the meat rest for 2 minutes before serving.",
            "Use kitchen shears to snip the meat into bite-sized pieces around the bones."
        ],
        prepTime: 30,
        cookTime: 15,
        servings: 6,
        calories: 580,
        youtube: "https://youtu.be/-9LeHaBeXvg?si=PqsZnYkx6ImILqpk",
        comments: []
    },
    {
        id: 14,
        name: "Kimchi Jjigae (Kimchi Stew)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1650,
        img: "01 MAIN DISH - KIMCHI.webp",
        ingredients: [
            "2 cups Sour Kimchi (aged at least 2–3 weeks, chopped)",
            "250g Pork belly or shoulder (sliced into bite-sized pieces)",
            "½ pack Firm tofu (sliced into thick rectangles)",
            "½ medium Onion (sliced)",
            "2 stalks Green onions (chopped)",
            "1 tbsp Gochugaru (Korean red chili flakes)",
            "1 tbsp Gochujang (Korean red chili paste)",
            "1 tsp Sugar",
            "1 tsp Minced garlic",
            "2 cups Rice water or Anchovy broth",
            "1 tbsp Kimchi brine"
        ],
        instructions: [
            "In a pot, sauté the pork belly over medium-high heat until the fat renders and the meat is lightly browned.",
            "Add the sour kimchi and onion. Stir-fry with the pork for 3–5 minutes. This step is crucial for a deep, developed flavor.",
            "Pour in the rice water (or broth) and the kimchi brine.",
            "Stir in the Gochugaru, Gochujang, garlic, and sugar.",
            "Bring to a boil, then lower the heat to medium. Cover and simmer for 15–20 minutes.",
            "Carefully lay the tofu slices on top. Let them simmer for another 5 minutes to soak up the spicy broth.",
            "Toss in the green onions. Give it one last boil for 1 minute.",
            "Serve bubbling hot with a bowl of plain steamed rice."
        ],
        prepTime: 15,
        cookTime: 40,
        servings: 4,
        calories: 320,
        youtube: "https://www.youtube.com/watch?v=9V6LxUO9J5I",
        comments: []
    },
    {
        id: 15,
        name: "Jajangmyeon (Black Bean Noodles)",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 1420,
        img: "01 MAIN DISH - JAJANG.webp",
        ingredients: [
            "200g Chunjang (Korean black bean paste)",
            "½ cup Cooking oil (for frying the paste)",
            "300g Pork belly or shoulder (cut into small cubes)",
            "2 cups Cabbage (chopped into squares)",
            "1 large Onion (chopped)",
            "1 small Zucchini (cubed)",
            "1 small Potato (cubed)",
            "1 tbsp Ginger (minced)",
            "1 tbsp Sugar",
            "1 tbsp Oyster sauce",
            "2 cups Water or chicken stock",
            "2 tbsp Potato starch (diluted in ¼ cup water)",
            "2 packs Jajangmyeon noodles",
            "½ piece Cucumber (julienned for garnish)"
        ],
        instructions: [
            "Heat ½ cup oil in a small pan. Add the Chunjang and fry it over medium heat for 3–5 minutes, stirring constantly. Drain the paste and set aside (save the oil!).",
            "In a large wok or pot, use 2 tbsp of the 'black bean oil.' Sauté the pork cubes until golden and crispy.",
            "Stir in the ginger and onions. Cook until the onions are translucent.",
            "Add the potatoes, zucchini, and cabbage. Sauté for 5 minutes until the potatoes start to soften.",
            "Stir in the fried black bean paste, sugar, and oyster sauce. Mix well until all the meat and veggies are coated in black.",
            "Pour in the water. Bring to a boil, then lower the heat and simmer for 10–15 minutes until the potatoes are fully cooked.",
            "Slowly pour in the starch slurry while stirring. The sauce should become thick, glossy, and dark.",
            "Boil the noodles according to package instructions. Drain and rinse under hot water.",
            "Place the noodles in a large bowl. Pour a generous amount of the black bean sauce on top.",
            "Garnish with fresh julienned cucumbers."
        ],
        prepTime: 20,
        cookTime: 25,
        servings: 4,
        calories: 620,
        youtube: "https://youtu.be/DCUcVG2sHt0?si=50cUeUoUN7Y4zot1",
        comments: []
    },
    {
        id: 16,
        name: "Peking Duck",
        category: "Main Dish",
        rating: 5.0,
        reviewCount: 3120,
        img: "01 MAIN DISH - PEKING DUCK.webp",
        ingredients: [
            "1 whole Duck (approx. 2kg, cleaned and patted dry)",
            "2 tbsp Maltose (or honey/corn syrup)",
            "1 tbsp Soy sauce",
            "1 tbsp Rice vinegar",
            "1 tsp Five-spice powder",
            "1 piece Star anise",
            "1 piece Cinnamon stick",
            "1 knob Ginger, sliced",
            "2 stalks Green onions",
            "1 cup Boiling water",
            "12-15 Mandarin pancakes",
            "1 cucumber, julienned",
            "½ cup hoisin sauce"
        ],
        instructions: [
            "Place the duck on a rack over a sink. Pour a kettle of boiling water all over the duck. You will see the skin tighten and turn white—this is the secret to a crisp finish.",
            "In a small saucepan, simmer the maltose (or honey), soy sauce, vinegar, star anise, cinnamon, and five-spice powder with a little water until dissolved and syrupy.",
            "Brush the glaze generously all over the duck. Don't miss the armpits or the bottom!",
            "Place the duck on a rack over a tray. Leave it uncovered in the refrigerator for at least 24 to 48 hours. The skin must feel like parchment paper before cooking.",
            "Before roasting, stuff the cavity with the ginger and green onions. Tie the legs together if needed.",
            "Preheat your oven to 175°C (350°F). Roast the duck breast-side up for 60–90 minutes.",
            "For the last 10 minutes, turn the heat up to 220°C (425°F) to get that final deep mahogany color and 'shatter' crispiness.",
            "Let the duck rest for at least 15 minutes before carving.",
            "To serve: Slice skin and meat thinly. Warm pancakes, spread with hoisin, add duck, cucumber, and green onions. Roll and enjoy!"
        ],
        prepTime: 1440,
        cookTime: 90,
        servings: 6,
        calories: 680,
        youtube: "https://youtu.be/KnJ3abXjgME?si=8JcvGXnzTIIJyV9X",
        comments: []
    },
    {
        id: 17,
        name: "Mapo Tofu",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1980,
        img: "01 MAIN DISH - MAPO TOFU.jpg",
        ingredients: [
            "400g Soft or Silken Tofu (cut into 1-inch cubes)",
            "100g Ground pork (or beef)",
            "2 tbsp Doubanjiang (Sichuan spicy bean paste)",
            "1 tbsp Douchi (fermented black beans, slightly mashed)",
            "1 tbsp Sichuan peppercorns (toasted and ground)",
            "3 cloves Garlic, minced",
            "1 tsp Ginger, minced",
            "1 tbsp Chili oil (with flakes)",
            "1 cup Chicken broth or water",
            "1 tsp Sugar",
            "2 stalks Green onions, chopped",
            "2 tbsp Potato starch (diluted in 2 tbsp water)"
        ],
        instructions: [
            "Soak tofu cubes in hot, lightly salted water for 5 minutes. This prevents them from breaking easily during cooking. Drain and set aside.",
            "Toast whole Sichuan peppercorns in a dry pan until fragrant. Grind them into a fine powder. Set aside.",
            "Heat oil in a wok. Fry the ground pork until it's crispy and brown.",
            "Lower the heat. Add the Doubanjiang, Douchi, garlic, and ginger. Stir-fry until the oil turns a bright, vibrant red.",
            "Pour in the chicken broth and sugar. Bring to a gentle simmer.",
            "Carefully slide the tofu cubes into the sauce. Simmer for 3–5 minutes. Use a spatula to gently 'push' the tofu rather than stir it so it stays whole.",
            "Give the starch slurry a quick stir and pour it in. Stir gently until the sauce becomes thick and glossy.",
            "Drizzle with chili oil and half of the green onions.",
            "Turn off the heat. Sprinkle the ground Sichuan peppercorn powder over the top.",
            "Serve hot with steamed rice."
        ],
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        calories: 380,
        youtube: "https://youtu.be/ZfsZwwrTFD4?si=BPsIIQrBoLvftuPd",
        comments: []
    },
    {
        id: 18,
        name: "Kung Pao Chicken",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 2150,
        img: "01 MAIN DISH - KUNG PAO.webp",
        ingredients: [
            "500g Chicken thigh (boneless, skinless, cut into 1-inch cubes)",
            "½ cup Roasted peanuts (unsalted)",
            "10–15 Dried red chilies (cut into halves, seeds removed)",
            "1 tsp Sichuan peppercorns (whole)",
            "1 small Bell pepper or Celery (cut into cubes)",
            "3 cloves Garlic (thinly sliced)",
            "1 tbsp Ginger (minced)",
            "2 stalks Green onions",
            "1 tbsp Soy sauce (for marinade)",
            "1 tbsp Shaoxing wine",
            "1 tsp Cornstarch",
            "2 tbsp Chinkiang black vinegar",
            "1 tbsp Light soy sauce",
            "1 tsp Dark soy sauce",
            "1 tbsp Sugar",
            "1 tsp Sesame oil"
        ],
        instructions: [
            "Toss the chicken cubes in soy sauce, Shaoxing wine, and cornstarch. Let it sit for 15–20 minutes.",
            "Whisk black vinegar, light soy sauce, dark soy sauce, sugar, and cornstarch in a small bowl. Set aside.",
            "Heat 2 tbsp oil in a wok until shimmering. Stir-fry the chicken until 80% cooked. Remove and set aside.",
            "In the same wok, add the Sichuan peppercorns and dried chilies. Fry over low-medium heat until fragrant.",
            "Turn the heat to high. Add the garlic, ginger, and green onion whites. Toss for 30 seconds.",
            "Add the bell peppers. Stir-fry for 1 minute until crisp-tender.",
            "Return the chicken to the wok. Pour in the prepared sauce.",
            "Stir rapidly as the sauce thickens and coats everything in a glossy, dark glaze.",
            "Toss in the roasted peanuts and green onion tops. Give it one final flip.",
            "Serve immediately with steamed white rice."
        ],
        prepTime: 25,
        cookTime: 15,
        servings: 4,
        calories: 450,
        youtube: "https://youtu.be/dkIBr4jN54I?si=nSK4fTxedRMUkL_2",
        comments: []
    },
    {
        id: 19,
        name: "Xiaolongbao (Soup Dumplings)",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1850,
        img: "01 MAIN DISH - DUMPLINGS.webp",
        ingredients: [
            "500g Pork skin or chicken feet",
            "3 cups Water",
            "2 slices Ginger",
            "1 stalk Green onion",
            "1 tbsp Shaoxing wine",
            "300g Ground pork",
            "1 tbsp Soy sauce",
            "1 tsp Ginger, finely minced",
            "1 tsp Sesame oil",
            "1 tsp Sugar",
            "XLB wrappers or flour + hot water for dough"
        ],
        instructions: [
            "Boil the pork skin/chicken feet with ginger, onion, and wine for 2 hours until the liquid reduces to 1 cup.",
            "Strain it into a container and refrigerate overnight until it sets into a firm jelly.",
            "Finely mince the soup jelly until it looks like crushed ice.",
            "Mix it thoroughly with the ground pork, soy sauce, ginger, sesame oil, and sugar. Keep this mixture cold.",
            "Roll your dough into thin circles. The edges should be thinner than the center.",
            "Place a small ball of filling in the center. Pleat the edges upward and pinch the top to seal it tight.",
            "Line a bamboo steamer with parchment paper. Place the dumplings inside, leaving space between them.",
            "Steam over high heat for exactly 8 minutes.",
            "Serve immediately with a dipping sauce of Chinkiang black vinegar and julienned fresh ginger."
        ],
        prepTime: 60,
        cookTime: 120,
        servings: 4,
        calories: 380,
        youtube: "https://youtu.be/MpRxnCqUAFM?si=sEnPfMjYJpY7Us4f",
        comments: []
    },
    {
        id: 20,
        name: "Sweet and Sour Pork",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 1680,
        img: "01 MAIN DISH - sweet and sour.webp",
        ingredients: [
            "500g Pork butt or shoulder (cut into 1-inch cubes)",
            "½ cup Pineapple chunks",
            "1 small Green bell pepper (cut into squares)",
            "1 small Red bell pepper (cut into squares)",
            "½ medium White onion (cut into squares)",
            "1 tsp Ginger, minced",
            "1 Egg (beaten)",
            "½ cup Cornstarch",
            "1 tbsp Soy sauce",
            "¼ cup Ketchup",
            "3 tbsp Rice vinegar",
            "2 tbsp Sugar",
            "½ cup Pineapple juice",
            "Oil for deep frying"
        ],
        instructions: [
            "Toss the pork cubes with soy sauce and salt. Let it sit for 15 minutes.",
            "Dip the pork into the beaten egg, then dredge thoroughly in cornstarch. Shake off the excess.",
            "Heat oil to 160°C. Fry the pork in batches for 3–4 minutes until light golden. Remove and drain.",
            "Turn the heat up to 190°C. Fry the pork again for 1 minute until deep golden and very crunchy.",
            "In a small bowl, whisk the ketchup, vinegar, sugar, and pineapple juice.",
            "In a separate wok, sauté ginger, onions, and bell peppers for 1 minute. Add the pineapple chunks.",
            "Pour in the sauce mixture and bring to a boil. Stir in cornstarch slurry until the sauce is thick and glossy.",
            "Turn off the heat. Immediately toss the crispy pork into the sauce. Coat quickly so it stays crunchy.",
            "Serve immediately with white rice."
        ],
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        calories: 520,
        youtube: "https://youtu.be/S-d1ctMx8nw?si=mbExQLLh7CkO_dfK",
        comments: []
    },
    {
        id: 21,
        name: "Pad Thai",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 2450,
        img: "01 MAIN DISH - pad thai.webp",
        ingredients: [
            "200g Dry rice sticks (medium width)",
            "150g Shrimp (peeled and deveined)",
            "2 Eggs (beaten)",
            "½ cup Extra firm tofu (cut into small batons)",
            "2 tbsp Preserved radish (finely chopped)",
            "2 cups Fresh bean sprouts",
            "1 bunch Garlic chives (cut into 2-inch pieces)",
            "2 tbsp Crushed roasted peanuts",
            "2 cloves Garlic (minced)",
            "3 tbsp Tamarind paste",
            "3 tbsp Palm sugar",
            "2 tbsp Fish sauce",
            "1 tsp Chili flakes"
        ],
        instructions: [
            "Soak dry rice noodles in room temperature water for 30–60 minutes. They should be flexible but still firm. Drain and set aside.",
            "In a small saucepan, melt the palm sugar with tamarind and fish sauce over low heat. Stir until smooth. Set aside.",
            "Heat 2 tbsp oil in a wok. Sear the shrimp until just cooked. Remove and set aside.",
            "In the same wok, add more oil. Sauté the tofu, garlic, preserved radish until the tofu edges are golden.",
            "Add the soaked noodles and the sauce. Toss vigorously over high heat. If noodles feel dry, add 1-2 tbsp water.",
            "Push the noodles to one side. Pour the beaten eggs into the empty space. Let them set slightly, then scramble and fold into noodles.",
            "Return the shrimp to the wok. Toss in the bean sprouts and garlic chives. Stir-fry for only 30 seconds.",
            "Platter it up. Sprinkle with crushed peanuts and serve with a fresh lime wedge on the side."
        ],
        prepTime: 30,
        cookTime: 15,
        servings: 4,
        calories: 480,
        youtube: "https://youtu.be/b7YnoRFuZ9o?si=vHUGz1Fcuu4mbGPj",
        comments: []
    },
    {
        id: 22,
        name: "Tom Yum Goong",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1890,
        img: "01 MAIN DISH - tom yung goong.webp",
        ingredients: [
            "500g Whole shrimp",
            "1 liter Water or chicken stock",
            "3 stalks Lemongrass (bruised and cut into pieces)",
            "1 thumb-sized Galangal (sliced)",
            "6-8 pieces Kaffir lime leaves (torn)",
            "200g Oyster mushrooms",
            "2 tbsp Thai Chili Jam (Nam Prik Pao)",
            "3 tbsp Fish sauce",
            "3 tbsp Fresh lime juice",
            "3-5 pieces Bird's eye chilies (bruised)",
            "¼ cup Evaporated milk (optional)",
            "1 handful Fresh cilantro",
            "1 tsp Sugar"
        ],
        instructions: [
            "Peel the shrimp, but save the heads. Sauté the shrimp heads in a pot with a little oil until fragrant.",
            "Pour in the water/stock and simmer for 10 minutes. Strain out the heads and keep the liquid.",
            "Bring the shrimp stock back to a boil. Add lemongrass, galangal, kaffir lime leaves, and chilies. Simmer for 5 minutes.",
            "Stir in the Thai chili jam, fish sauce, and sugar.",
            "Add the mushrooms and simmer for 2-3 minutes until softened.",
            "Add the peeled shrimp. Cook for only 1-2 minutes until they turn pink and curl.",
            "If you want the creamy version, stir in the evaporated milk now and turn the heat to low.",
            "Turn off the stove. Only add the lime juice after the heat is off.",
            "Top with fresh cilantro."
        ],
        prepTime: 20,
        cookTime: 25,
        servings: 4,
        calories: 280,
        youtube: "https://youtu.be/hhcYNjeQ_XY?si=dyHNFiPpta-t4tY8",
        comments: []
    },
    {
        id: 23,
        name: "Green Curry",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1750,
        img: "01 MAIN DISH - green curry.jpg",
        ingredients: [
            "500g Chicken thigh (sliced into bite-sized pieces)",
            "2 cups Coconut milk",
            "3-4 tbsp Green curry paste",
            "½ cup Thai eggplants (quartered)",
            "½ cup Bamboo shoots (sliced)",
            "1 tbsp Palm sugar",
            "1.5 tbsp Fish sauce",
            "5-8 pieces Fresh Thai basil leaves",
            "2-3 pieces Kaffir lime leaves (torn)",
            "1-2 pieces Red spur chilies"
        ],
        instructions: [
            "Scoop out the thick layer of cream from the top of your coconut milk. Put it in a pot over medium heat. Stir until it starts to bubble and the oil begins to separate.",
            "Add the green curry paste to the 'cracked' cream. Fry for 2–3 minutes until the paste is fragrant and deep green.",
            "Add the chicken to the pot. Stir-fry until the outside is no longer pink.",
            "Pour in the remaining coconut milk. Bring to a gentle simmer.",
            "Add the Thai eggplants and bamboo shoots. Cook for about 5 minutes until the eggplant is tender.",
            "Stir in the palm sugar and fish sauce.",
            "Toss in the torn kaffir lime leaves. Let them simmer for 1 minute.",
            "Turn off the heat. Immediately stir in the Thai basil leaves.",
            "Garnish with sliced red chilies."
        ],
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        calories: 420,
        youtube: "https://youtu.be/LIbKVpBQKJI?si=BGYiak3SPCX1SdFp",
        comments: []
    },
    {
        id: 24,
        name: "Pad Kra Pao (Thai Basil Pork)",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1980,
        img: "01 MAIN DISH - pad kra pao.jpg",
        ingredients: [
            "300g Ground pork",
            "1 large handful Fresh Holy Basil leaves",
            "5-10 Bird's eye chilies",
            "5 cloves Garlic",
            "1 tbsp Oil",
            "1 Egg",
            "1 tbsp Oyster sauce",
            "1 tsp Light soy sauce",
            "1 tsp Dark soy sauce",
            "½ tsp Sugar",
            "1 tsp Fish sauce"
        ],
        instructions: [
            "Using a mortar and pestle, pound the garlic and chilies together into a coarse paste.",
            "Heat 3 tbsp oil in a wok until shimmering. Crack the egg in. Let the edges get brown and crispy while the yolk stays runny. Remove and set aside.",
            "Pour out most of the oil, leaving about 1 tbsp. Stir-fry the garlic-chili paste over medium-high heat until fragrant.",
            "Turn the heat to high. Add the ground meat. Spread it out and let it sear for a minute before breaking it up.",
            "Pour in the oyster sauce, soy sauces, fish sauce, and sugar. Toss quickly to coat every piece of meat.",
            "Turn off the heat. Throw in the Holy Basil leaves. Toss for only 15–20 seconds until they just wilt.",
            "Serve over hot jasmine rice and top with that crispy fried egg."
        ],
        prepTime: 10,
        cookTime: 10,
        servings: 2,
        calories: 450,
        youtube: "https://youtu.be/xG_jL8luhF0?si=mfPwT5IUCaVPqq04",
        comments: []
    },
    {
        id: 25,
        name: "Massaman Curry",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1650,
        img: "01 MAIN DISH - massaman.webp",
        ingredients: [
            "500g Beef chuck or chicken thighs",
            "2 cups Coconut milk",
            "3-4 tbsp Massaman curry paste",
            "2 large Potatoes (peeled and cubed)",
            "½ White onion (cut into thick wedges)",
            "¼ cup Roasted peanuts",
            "2 Cinnamon sticks",
            "3-4 Star anise",
            "5 Cardamom pods",
            "2 tbsp Palm sugar",
            "2 tbsp Tamarind paste",
            "2 tbsp Fish sauce"
        ],
        instructions: [
            "Braise your beef in 1 cup of coconut milk mixed with 1 cup of water for about 45–60 minutes.",
            "In a separate pot, boil the thick top layer of coconut milk until the oil separates.",
            "Add the Massaman paste, cinnamon, star anise, and cardamom. Fry in the coconut oil until fragrant.",
            "Add the meat (and its braising liquid) into the pot. Pour in the rest of the coconut milk.",
            "Add the potatoes and onions. Simmer on low heat for 20 minutes.",
            "Stir in the palm sugar, tamarind paste, and fish sauce.",
            "Toss in the roasted peanuts. Let it simmer for another 5 minutes until the potatoes are fork-tender.",
            "Serve with Jasmine rice or buttery Roti bread."
        ],
        prepTime: 20,
        cookTime: 90,
        servings: 4,
        calories: 580,
        youtube: "https://youtu.be/Z5v8F_zhwF8?si=5J4qgSNjocHGxjLV",
        comments: []
    },
    {
        id: 26,
        name: "Beef Noodle Soup",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 2250,
        img: "01 MAIN DISH - beef noodle.webp",
        ingredients: [
            "1 kg Beef shank or chuck",
            "500g Wide wheat noodles",
            "½ cup Soy sauce",
            "2 tbsp Spicy Doubanjiang",
            "1 head Garlic, crushed",
            "2 chunks Ginger, smashed",
            "4 stalks Green onions",
            "1 medium Tomato, wedged",
            "1 small Daikon radish, cubed",
            "1 piece Rock sugar",
            "2 liters Water",
            "2 Star anise",
            "1 Cinnamon stick",
            "1 tsp Sichuan peppercorns"
        ],
        instructions: [
            "Place beef in a pot of cold water. Bring to a boil for 5 minutes. Drain and rinse the meat under cold water.",
            "In a heavy pot, heat 2 tbsp oil. Sear the blanched beef until browned. Add ginger, garlic, and green onions. Sauté until fragrant.",
            "Stir in the Doubanjiang and fry for 1 minute until the oil turns red. Add the rock sugar.",
            "Pour in the soy sauces. Add the water, tomato wedges, and spice bag.",
            "Bring to a boil, then lower to a very gentle simmer. Cover and cook for 2 to 3 hours.",
            "After the first hour, add the daikon radish.",
            "Boil noodles in a separate pot according to package directions.",
            "Place noodles in a deep bowl. Ladle over the rich broth, beef chunks, and tender daikon.",
            "Garnish with chopped cilantro, green onions, and chili oil."
        ],
        prepTime: 30,
        cookTime: 180,
        servings: 6,
        calories: 520,
        youtube: "https://youtu.be/HMNvoHx8Zuw?si=Pr-ThJFyTuCcb1YE",
        comments: []
    },
    {
        id: 27,
        name: "Lu Rou Fan (Taiwanese Braised Pork Rice)",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1780,
        img: "01 MAIN DISH - lu rou fan.jpg",
        ingredients: [
            "500g Pork belly, hand-cut into small strips",
            "½ cup Fried shallots",
            "3-4 Hard-boiled eggs, peeled",
            "4-5 cloves Garlic, minced",
            "2 slices Ginger",
            "2 tbsp Rock sugar",
            "¼ cup Light soy sauce",
            "2 tbsp Dark soy sauce",
            "¼ cup Shaoxing wine",
            "1 tsp Five-spice powder",
            "1 piece Star anise",
            "2 cups Water"
        ],
        instructions: [
            "Place the pork belly strips in cold water. Bring to a boil for 2–3 minutes to remove impurities. Drain and rinse.",
            "In a heavy pot, sear the pork strips over medium-high heat until the fat renders and the meat turns golden brown.",
            "Add the garlic and ginger. Sauté for 1 minute until fragrant.",
            "Add the rock sugar and stir until it melts and coats the pork in a light amber glaze.",
            "Pour in the Shaoxing wine, followed by the light and dark soy sauces. Toss well.",
            "Stir in the fried shallots and five-spice powder.",
            "Pour in the water and add the star anise. Bring to a boil, then lower the heat to a very low simmer.",
            "Gently nestle the hard-boiled eggs into the liquid.",
            "Cover and simmer for 1.5 to 2 hours until the pork is butter-soft.",
            "Serve over hot, fluffy white rice with a halved egg on top."
        ],
        prepTime: 20,
        cookTime: 120,
        servings: 4,
        calories: 620,
        youtube: "https://www.youtube.com/watch?v=Aa4rc5Exz24",
        comments: []
    },
    {
        id: 28,
        name: "Three Cup Chicken",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1420,
        img: "01 MAIN DISH - three cup chicken.webp",
        ingredients: [
            "500g Chicken thighs (bone-in, skin-on)",
            "¼ cup Black sesame oil",
            "¼ cup Soy sauce",
            "¼ cup Shaoxing rice wine",
            "10-12 slices Ginger",
            "10-12 cloves Garlic, whole",
            "1-2 Red chilies, sliced",
            "1 tbsp Rock sugar",
            "2 handfuls Fresh Thai Basil"
        ],
        instructions: [
            "Heat the black sesame oil in a wok over low-medium heat. Add the ginger slices and fry until wrinkled and golden.",
            "Add the whole garlic cloves and chilies. Sauté until the garlic is lightly browned.",
            "Turn the heat to high. Add the chicken pieces. Sear until the skin is golden and meat is mostly cooked.",
            "Pour in the soy sauce, rice wine, and add the rock sugar.",
            "Bring to a boil, then turn the heat down to medium. Simmer uncovered until the liquid reduces to a thick, dark, syrupy glaze.",
            "Turn off the heat. Toss in the massive handful of Thai Basil. Stir quickly for 10 seconds until the leaves wilt.",
            "Serve directly in a clay pot with steamed rice."
        ],
        prepTime: 15,
        cookTime: 25,
        servings: 4,
        calories: 480,
        youtube: "https://www.youtube.com/watch?v=QaIVJ_whoEI",
        comments: []
    },
    {
        id: 29,
        name: "Oyster Omelet",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 980,
        img: "01 MAIN DISH - oyster.jpg",
        ingredients: [
            "10–12 Fresh small oysters, cleaned",
            "2 Eggs, lightly beaten",
            "2 stalks Garland chrysanthemum or Baby bok choy, chopped",
            "2 stalks Green onions, chopped",
            "1 tbsp Lard or cooking oil",
            "4 tbsp Sweet potato starch",
            "1 tbsp All-purpose flour",
            "½ cup Water",
            "¼ tsp White pepper",
            "2 tbsp Ketchup",
            "1 tbsp Miso paste",
            "1 tbsp Sugar",
            "1 tbsp Sweet chili sauce"
        ],
        instructions: [
            "Whisk all sauce ingredients in a small pot. Bring to a simmer, then stir in cornstarch slurry until it thickens. Set aside.",
            "Mix the sweet potato starch, water, salt, and pepper in a bowl.",
            "Heat a large flat skillet or wok with oil over high heat. Add the oysters and green onions. Sear for about 30 seconds.",
            "Give your starch slurry a final stir and pour it directly over the oysters. Let it sit for 20–30 seconds.",
            "Pour the beaten eggs over the starch layer.",
            "Immediately top with the greens.",
            "Once the bottom is crispy and the starch is set, carefully flip the whole thing over.",
            "Cook for another 1–2 minutes until the greens are wilted and the egg side is golden brown.",
            "Slide onto a plate and smother with the warm pink sauce."
        ],
        prepTime: 15,
        cookTime: 10,
        servings: 2,
        calories: 350,
        youtube: "https://www.youtube.com/watch?si=5kPfeRAa62sgfWjq&v=V6gHPhhjgwg&feature=youtu.be",
        comments: []
    },
    {
        id: 30,
        name: "Gua Bao (Taiwanese Pork Belly Buns)",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1560,
        img: "01 MAIN DISH - gua bao.jpg",
        ingredients: [
            "6–8 Frozen lotus leaf buns",
            "500g Pork belly, cut into ½-inch thick slabs",
            "¼ cup Soy sauce",
            "¼ cup Shaoxing wine",
            "1 piece Rock sugar",
            "1 tsp Five-spice powder",
            "3 slices Ginger",
            "3 cloves Garlic",
            "1 cup Pickled mustard greens, finely chopped",
            "½ cup Roasted peanuts, crushed",
            "1 handful Fresh cilantro"
        ],
        instructions: [
            "Sear the pork belly slabs in a dry pot until the fat renders and the edges are golden.",
            "Add ginger, garlic, five-spice, soy sauces, wine, sugar, and enough water to cover.",
            "Simmer on low heat for 1.5 to 2 hours until the fat is translucent and jiggles.",
            "Rinse the pickled mustard greens. Sauté them in a dry pan with a little sugar and minced garlic for 2–3 minutes.",
            "Pulse roasted peanuts in a blender with a little sugar until they look like coarse sand.",
            "Steam your buns for 3–5 minutes until they are pillowy and hot.",
            "Open the hot bun. Spread a layer of peanut powder on the bottom.",
            "Lay down a thick slab of pork belly. Top with mustard greens and cilantro."
        ],
        prepTime: 25,
        cookTime: 120,
        servings: 4,
        calories: 580,
        youtube: "https://www.youtube.com/watch?v=ljsXGdhXSNI",
        comments: []
    },
    {
        id: 31,
        name: "Salmon Sushi",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 3250,
        img: "01 MAIN DISH - salmon sushi.webp",
        ingredients: [
            "200g Sushi-grade Atlantic salmon",
            "2 cups Sushi rice, cooked",
            "2 tbsp Rice vinegar",
            "1 tbsp Sugar",
            "1 tsp Salt",
            "Wasabi paste",
            "Soy sauce for serving",
            "Pickled ginger for serving"
        ],
        instructions: [
            "Mix rice vinegar, sugar, and salt until dissolved. Fold into warm sushi rice. Let cool to room temperature.",
            "Pat the salmon dry with a paper towel.",
            "Slice the salmon at a 45-degree angle against the grain. Aim for pieces about 1cm thick and 5-6cm long.",
            "Take a small amount of sushi rice (about 20g). Shape it into a soft rectangular 'pillow.'",
            "Smear a tiny dot of wasabi on the fish slice.",
            "Place the fish over the rice and gently press the sides with your fingers to marry them.",
            "Serve with soy sauce and pickled ginger."
        ],
        prepTime: 30,
        cookTime: 20,
        servings: 2,
        calories: 380,
        youtube: "https://www.youtube.com/watch?v=JxL1VQnZq5M",
        comments: []
    },
    {
        id: 32,
        name: "Onigiri (Japanese Rice Balls)",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 1420,
        img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400",
        ingredients: [
            "2 cups Cooked Japanese short-grain rice, warm",
            "Salt for seasoning",
            "Nori seaweed strips",
            "Fillings: Grilled salmon flakes, Tuna-mayo, or Umeboshi"
        ],
        instructions: [
            "Wet your hands with water so the rice doesn't stick. Rub a generous pinch of salt over your palms.",
            "Place a handful of warm rice in one hand. Create a small indent in the center.",
            "Add a teaspoon of your chosen filling. Cover it with a bit more rice.",
            "Use your top hand like a 'roof' to press the rice into a triangle shape.",
            "Do not squeeze too hard! You want the grains to hold together, but the center should still be airy.",
            "Wrap a strip of Nori around the bottom as a handle."
        ],
        prepTime: 15,
        cookTime: 0,
        servings: 4,
        calories: 220,
        youtube: "https://www.youtube.com/watch?v=JxL1VQnZq5M",
        comments: []
    },
    {
        id: 33,
        name: "Ramen",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 4120,
        img: "01 MAIN DISH - ramen.jpg",
        ingredients: [
            "1.5kg Chicken carcasses or wings",
            "4 bundles Fresh ramen noodles",
            "4 slices Chashu pork",
            "2 Marinated soft-boiled eggs, halved",
            "2 stalks Green onion, sliced",
            "2 sheets Nori",
            "½ cup Soy sauce",
            "2 tbsp Mirin",
            "1 tsp Sugar",
            "1 piece Kombu"
        ],
        instructions: [
            "Place chicken bones in a pot with water, ginger, and garlic. Simmer gently for 4–6 hours. Skim foam constantly. Strain and keep hot.",
            "Combine soy sauce, mirin, sugar, and kombu in a small pot. Simmer for 5 minutes, then remove kombu. This is your tare.",
            "Boil noodles in a separate pot of water for 1–2 minutes. Drain well.",
            "Warm your serving bowl with hot water.",
            "Pour 2–3 tbsp of tare into the bottom of the dry bowl. Add 1 tbsp of chicken fat or sesame oil.",
            "Fill the bowl 3/4 full with boiling hot chicken broth. Stir gently.",
            "Place the noodles in the soup. Fold them neatly.",
            "Top with chashu pork, jammy egg, green onions, and nori."
        ],
        prepTime: 30,
        cookTime: 240,
        servings: 4,
        calories: 550,
        youtube: "https://www.youtube.com/watch?si=5ug0unZ5dSpQO0yy&v=xNjaodnSMuk&feature=youtu.be",
        comments: []
    },
    {
        id: 34,
        name: "Tonkatsu (Japanese Pork Cutlet)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 2350,
        img: "01 MAIN DISH - tonkatsu.webp",
        ingredients: [
            "2 pieces Pork loin (about 2cm thick)",
            "1 cup Panko breadcrumbs",
            "½ cup All-purpose flour",
            "1 Egg, beaten with 1 tsp oil",
            "Salt and black pepper",
            "Oil for deep frying",
            "2 cups Green cabbage, shredded",
            "2 tbsp Tonkatsu sauce",
            "1 tsp Karashi mustard"
        ],
        instructions: [
            "Pound the pork slightly with a meat mallet. Score the connective tissue to prevent curling.",
            "Season both sides generously with salt and pepper. Let sit for 5 minutes.",
            "Coat the pork in flour, shake off excess. Dip into beaten egg. Press firmly into Panko breadcrumbs.",
            "Heat oil to 170°C. Fry for 3–4 minutes per side until deep golden.",
            "Place on a wire rack for 2 minutes to prevent sogginess.",
            "Slice into 1-inch strips.",
            "Serve with shredded cabbage, tonkatsu sauce, and mustard."
        ],
        prepTime: 15,
        cookTime: 10,
        servings: 2,
        calories: 620,
        youtube: "https://www.youtube.com/watch?si=UO9IgmqVsrltkBcN&v=AtgqMOi2Ze4&feature=youtu.be",
        comments: []
    },
    {
        id: 35,
        name: "Okonomiyaki (Japanese Savory Pancake)",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 1650,
        img: "01 MAIN DISH - okono.jpg",
        ingredients: [
            "1 cup All-purpose flour",
            "¾ cup Dashi stock, cold",
            "2 cups Green cabbage, finely chopped",
            "2 Large eggs",
            "4-6 slices Thin pork belly",
            "2 tbsp Tenkasu (tempura scraps)",
            "1 tbsp Benishoga (pickled red ginger)",
            "Okonomi sauce",
            "Kewpie mayo",
            "Aonori and bonito flakes"
        ],
        instructions: [
            "Whisk the flour and dashi together until smooth. Let rest for 15 minutes in the fridge.",
            "In a large bowl, combine cabbage, eggs, tenkasu, and pickled ginger. Pour batter over and fold gently.",
            "Heat a flat griddle to 200°C with oil. Pour mixture onto pan and shape into a circle about 2cm thick.",
            "Lay pork belly slices across the top of the raw batter.",
            "After 3–5 minutes, flip it in one confident motion. Cover and cook for another 5 minutes.",
            "Flip back so pork side is up. Cook for 2 more minutes to crisp the meat.",
            "Brush with Okonomi sauce. Drizzle Kewpie Mayo in a zigzag.",
            "Sprinkle with Aonori and Katsuobushi."
        ],
        prepTime: 20,
        cookTime: 15,
        servings: 2,
        calories: 480,
        youtube: "https://www.youtube.com/watch?si=5OLJe6y76pZYw_8k&v=S3TG5eLB-rw&feature=youtu.be",
        comments: []
    },
    {
        id: 36,
        name: "Unagi Don (Grilled Eel Bowl)",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 1280,
        img: "01 MAIN DISH - unagi don.webp",
        ingredients: [
            "1 filet Prepared frozen Unagi",
            "2 cups Cooked Japanese rice, hot",
            "1 tbsp Sake",
            "1 stalk Green onion, sliced",
            "1 pinch Sansho pepper",
            "¼ cup Soy sauce",
            "¼ cup Mirin",
            "2 tbsp Sugar",
            "2 tbsp Sake"
        ],
        instructions: [
            "Combine soy sauce, mirin, sugar, and sake in a saucepan. Simmer for 8–10 minutes until reduced by one-third and syrupy.",
            "Defrost unagi. Cut into 3–4 pieces.",
            "Place eel on a baking sheet. Brush with sake.",
            "Broil for 3–5 minutes until sauce bubbles and edges slightly char.",
            "Halfway through, brush with homemade tare.",
            "Fill a deep bowl with hot rice. Drizzle 1–2 tbsp tare over rice.",
            "Lay hot unagi pieces on top. Brush with one final layer of sauce.",
            "Sprinkle with Sansho pepper and garnish with green onions."
        ],
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        calories: 520,
        youtube: "https://www.youtube.com/watch?si=WY9kxfVjBnuJRsmp&v=X_MTywfMnCw&feature=youtu.be",
        comments: []
    },
    {
        id: 37,
        name: "Pierogi (Polish Dumplings)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1420,
        img: "01 MAIN DISH - pierogi dumplings.jpg",
        ingredients: [
            "2.5 cups All-purpose flour",
            "½ cup Warm water",
            "¼ cup Sour cream",
            "1 Egg",
            "½ tsp Salt",
            "2 tbsp Butter, melted",
            "2 cups Mashed potatoes, cold",
            "1 cup Farmer's cheese or ricotta",
            "½ Onion, finely diced and caramelized",
            "½ tsp Black pepper"
        ],
        instructions: [
            "Mix flour, salt, sour cream, and egg. Slowly add warm water while kneading. Knead for 5–8 minutes until smooth.",
            "Cover and let dough rest for 30 minutes.",
            "Mix cold mashed potatoes with cheese and caramelized onions. Season with salt and pepper.",
            "Roll dough to 3mm thickness. Cut into 3-inch rounds.",
            "Place filling in center. Fold and pinch edges firmly.",
            "Drop pierogi into boiling salted water. Once they float, cook 1–2 more minutes.",
            "Pan-fry boiled pierogi in butter until golden-brown and crispy."
        ],
        prepTime: 45,
        cookTime: 20,
        servings: 4,
        calories: 420,
        youtube: "https://www.youtube.com/watch?si=WZqkrw9QqUvAngV4&v=r9jcuPYhTJo&feature=youtu.be",
        comments: []
    },
    {
        id: 38,
        name: "Borscht (Ukrainian Beet Soup)",
        category: "Main Dish",
        rating: 4.7,
        reviewCount: 1650,
        img: "01 MAIN DISH - bors.webp",
        ingredients: [
            "500g Beef shank or pork ribs",
            "3 medium Beets, grated",
            "2 large Potatoes, cubed",
            "¼ head Cabbage, shredded",
            "1 Carrot, grated",
            "1 Onion, finely diced",
            "2 tbsp Tomato paste",
            "1 tbsp Vinegar or Lemon juice",
            "1 tsp Sugar",
            "2 Bay leaves",
            "3 liters Water",
            "Sour cream and fresh dill for serving"
        ],
        instructions: [
            "Place meat in cold water. Bring to boil, skim foam, and simmer with bay leaves for 1.5–2 hours until meat is tender.",
            "Remove meat, shred it, and return to pot.",
            "In a skillet, sauté onions and carrots in oil until soft. Add grated beets, tomato paste, sugar, and vinegar. Cook for 10–15 minutes.",
            "Add potatoes to boiling broth. Cook for 10 minutes. Add cabbage and cook 5 more minutes.",
            "Stir beet mixture into main pot. Simmer for 5–10 minutes.",
            "Turn off heat, add minced garlic, and let sit covered for 20 minutes.",
            "Serve with sour cream and fresh dill."
        ],
        prepTime: 20,
        cookTime: 120,
        servings: 6,
        calories: 320,
        youtube: "https://www.youtube.com/watch?si=A2K7p-uDo9yheveC&v=6CXgPVw_-0g&feature=youtu.be",
        comments: []
    },
    {
        id: 39,
        name: "Goulash (Hungarian Beef Stew)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1850,
        img: "01 MAIN DISH - goulash.jpg",
        ingredients: [
            "800g Beef shank or chuck, cubed",
            "3 large Onions, finely diced",
            "2 tbsp Lard or oil",
            "3 tbsp Hungarian Sweet Paprika",
            "2 Garlic cloves, minced",
            "1 tsp Caraway seeds, crushed",
            "2 Bell peppers, diced",
            "2 Medium tomatoes, chopped",
            "3 large Potatoes, cubed",
            "2 Carrots, sliced",
            "1.5 Liters Water or beef stock",
            "1 Bay leaf"
        ],
        instructions: [
            "Heat lard in a heavy pot. Sauté onions slowly for 15–20 minutes until golden.",
            "Add beef cubes and garlic. Cook until meat is no longer pink.",
            "Remove pot from heat. Stir in paprika and caraway seeds.",
            "Return to heat. Add tomatoes, peppers, and water to cover meat. Add bay leaf.",
            "Cover and simmer on low heat for 1.5 to 2 hours.",
            "Once beef is tender, add potatoes, carrots, and remaining water.",
            "Simmer for 20–30 minutes until potatoes are soft.",
            "Season with salt. Serve with crusty bread."
        ],
        prepTime: 20,
        cookTime: 150,
        servings: 6,
        calories: 450,
        youtube: "https://www.youtube.com/watch?si=CR8wOSqPm15jlQ7e&v=kmvLyGMy9Wo&feature=youtu.be",
        comments: []
    },
    {
        id: 40,
        name: "Sarma (Stuffed Cabbage Rolls)",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1120,
        img: "01 MAIN DISH - sarma.jpg",
        ingredients: [
            "1 head Sour cabbage",
            "500g Ground beef",
            "300g Ground pork",
            "½ cup Uncooked white rice",
            "1 large Onion, finely diced",
            "2 cloves Garlic, minced",
            "200g Smoked pork ribs",
            "2 tbsp Sweet Paprika",
            "1 tsp Black pepper",
            "2 Bay leaves",
            "1 tbsp Tomato paste"
        ],
        instructions: [
            "Carefully peel leaves off sour cabbage. Trim thick vein from each leaf.",
            "Sauté onions and garlic until soft. Mix with raw meats, rice, paprika, salt, and pepper.",
            "Place filling at stem end of leaf. Roll up, fold in sides, and finish rolling.",
            "Scatter shredded cabbage on pot bottom. Pack rolls tightly, seam-side down.",
            "Tuck smoked meat and bay leaves between rolls. Cover with remaining cabbage.",
            "Pour in enough water with tomato paste to cover rolls. Place heavy plate on top.",
            "Bring to boil, reduce to low simmer. Cook for 3 to 4 hours."
        ],
        prepTime: 45,
        cookTime: 240,
        servings: 8,
        calories: 480,
        youtube: "https://www.youtube.com/watch?v=CrO3TpvaG08",
        comments: []
    },
    {
        id: 41,
        name: "Chicken Kiev",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 1650,
        img: "01 MAIN DISH - chicken kiev.jpg",
        ingredients: [
            "2 Large chicken breasts",
            "100g Unsalted butter, softened",
            "3 cloves Garlic, minced",
            "2 tbsp Fresh parsley, chopped",
            "1 tsp Lemon juice",
            "½ cup All-purpose flour",
            "2 Eggs, beaten",
            "1 cup Fine breadcrumbs",
            "Salt and pepper",
            "Oil for frying"
        ],
        instructions: [
            "Mix softened butter, garlic, parsley, lemon juice, salt, and pepper. Shape into small logs. Freeze for 30–60 minutes.",
            "Slice each chicken breast horizontally almost through and open like a book. Pound to 5mm thick.",
            "Place frozen butter log in center. Fold sides in and roll tightly around butter.",
            "Wrap each roll tightly in plastic wrap and chill for 30 minutes.",
            "Coat rolls in flour, dip in egg, coat in breadcrumbs. Double-dredge for extra seal.",
            "Heat oil to 170°C. Fry for 2–3 minutes per side until golden.",
            "Transfer to 190°C oven for 10–12 minutes to finish cooking."
        ],
        prepTime: 30,
        cookTime: 25,
        servings: 2,
        calories: 620,
        youtube: "https://www.youtube.com/watch?si=93I849V2oMtu-tl4&v=kf8XzD-xVGc&feature=youtu.be",
        comments: []
    },
    {
        id: 42,
        name: "Classic Cheeseburger",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 4850,
        img: "01 MAIN DISH - cheeseburger.jpg",
        ingredients: [
            "500g Ground beef chuck",
            "4 Slices American or Cheddar cheese",
            "2 Brioche buns, halved",
            "1 tbsp Butter",
            "Salt and black pepper",
            "Red onion, thinly sliced",
            "Beefsteak tomato, sliced",
            "Iceberg lettuce",
            "Dill pickles",
            "3 tbsp Mayonnaise",
            "1 tbsp Ketchup",
            "1 tsp Yellow mustard",
            "1 tsp Grated onion"
        ],
        instructions: [
            "Mix mayo, ketchup, mustard, and grated onion for special sauce.",
            "Gently shape cold meat into patties slightly wider than bun. Make indentation in center.",
            "Keep patties in fridge until ready to cook.",
            "Butter buns and toast until golden brown.",
            "Heat cast-iron skillet until smoking. Season patties generously with salt and pepper.",
            "Sear for 3–4 minutes without moving. Flip once. Do not press down.",
            "Place cheese on patty. Add water to pan and cover for 30 seconds to melt cheese.",
            "Assemble: Sauce on bottom bun, pickles and lettuce, cheesy patty, tomato and onion, top bun."
        ],
        prepTime: 15,
        cookTime: 10,
        servings: 4,
        calories: 580,
        youtube: "https://www.youtube.com/watch?si=WA8faDBgYoUJ7J4a&v=ep6k3Ofcf2s&feature=youtu.be",
        comments: []
    },
    {
        id: 43,
        name: "BBQ Ribs",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 3250,
        img: "01 MAIN DISH - bbq ribs.jpg",
        ingredients: [
            "1 rack Pork Baby Back ribs",
            "¼ cup Yellow mustard",
            "½ cup Apple juice",
            "1 cup BBQ sauce",
            "¼ cup Brown sugar",
            "2 tbsp Paprika",
            "1 tbsp Black pepper",
            "1 tbsp Kosher salt",
            "1 tsp Garlic powder",
            "1 tsp Onion powder",
            "½ tsp Cayenne pepper"
        ],
        instructions: [
            "Remove membrane from back of ribs. Pat dry.",
            "Mix brown sugar, paprika, pepper, salt, garlic powder, onion powder, and cayenne for rub.",
            "Rub mustard over ribs, then generously coat with dry rub. Let sit 30 minutes.",
            "Set smoker or oven to 110-120°C. Place ribs bone-side down. Cook for 3 hours, spritzing with apple juice hourly.",
            "Wrap ribs tightly in foil with apple juice. Return to heat for 2 hours.",
            "Remove from foil. Increase heat to 150°C. Brush with BBQ sauce and cook 15–30 minutes until tacky."
        ],
        prepTime: 20,
        cookTime: 330,
        servings: 4,
        calories: 680,
        youtube: "https://www.youtube.com/watch?si=Uv2PjrO2BZKPnju6&v=B5wIE4zyW5k&feature=youtu.be",
        comments: []
    },
    {
        id: 44,
        name: "Fried Chicken",
        category: "Main Dish",
        rating: 4.9,
        reviewCount: 5620,
        img: "01 MAIN DISH - fried chicken.jpg",
        ingredients: [
            "1kg Chicken pieces",
            "2 cups Buttermilk",
            "1 tbsp Hot sauce",
            "2 cups All-purpose flour",
            "½ cup Cornstarch",
            "2 tbsp Salt",
            "1 tbsp Black pepper",
            "1 tbsp Paprika",
            "1 tsp Garlic powder",
            "1 tsp Onion powder",
            "1 tsp Cayenne pepper",
            "Oil for frying"
        ],
        instructions: [
            "Whisk buttermilk, hot sauce, and half the spice mix. Submerge chicken and refrigerate 4+ hours.",
            "Mix flour, cornstarch, and remaining spices. Drizzle in buttermilk and rub to create clumps.",
            "Take chicken from brine, let excess drip, and coat in flour. Press firmly. Rest on rack 15 minutes.",
            "Heat oil to 175°C. Fry chicken 12–15 minutes, turning halfway.",
            "Internal temperature should reach 74°C.",
            "Drain on wire rack, not paper towels."
        ],
        prepTime: 20,
        cookTime: 25,
        servings: 4,
        calories: 520,
        youtube: "https://www.youtube.com/watch?si=B64XknOo9VUw4ClB&v=6zHR1ABP7N0&feature=youtu.be",
        comments: []
    },
    {
        id: 45,
        name: "Pot Roast",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 2350,
        img: "01 MAIN DISH - pot roast.jpg",
        ingredients: [
            "1.5kg Beef Chuck Roast",
            "2 tbsp Neutral oil",
            "1 cup Dry red wine",
            "2 cups Beef stock",
            "1 tbsp Tomato paste",
            "3 large Carrots, chunked",
            "500g Baby potatoes, halved",
            "2 Yellow onions, quartered",
            "3 cloves Garlic, smashed",
            "2 sprigs Fresh rosemary",
            "3 sprigs Thyme",
            "2 Bay leaves",
            "Salt and black pepper"
        ],
        instructions: [
            "Pat beef dry. Season heavily with salt and pepper. Sear in Dutch oven over high heat until dark crust forms. Remove meat.",
            "Add onions and carrots to pot. Cook 5 minutes. Stir in tomato paste and garlic.",
            "Pour in wine, scrape bottom. Let reduce by half.",
            "Return beef to pot. Add stock until halfway up meat. Add herbs.",
            "Cover and place in 150°C oven for 3–4 hours.",
            "Add potatoes during last hour of cooking.",
            "Remove meat, rest 15 minutes. Skim fat, simmer sauce to reduce if needed."
        ],
        prepTime: 20,
        cookTime: 240,
        servings: 6,
        calories: 520,
        youtube: "https://www.youtube.com/watch?v=5QCtlnNx3xg",
        comments: []
    },
    {
        id: 46,
        name: "Clam Chowder",
        category: "Main Dish",
        rating: 4.8,
        reviewCount: 2150,
        img: "01 MAIN DISH - CLAM CHOWDER.jpg",
        ingredients: [
            "500g Clams, chopped, juice reserved",
            "2 cups Clam juice",
            "150g Thick-cut bacon, diced",
            "2 tbsp Unsalted butter",
            "1 large Onion, finely diced",
            "2 stalks Celery, finely diced",
            "2 cloves Garlic, minced",
            "3 cups Potatoes, ½-inch cubes",
            "¼ cup All-purpose flour",
            "1.5 cups Heavy cream",
            "2 Bay leaves",
            "½ tsp Dried thyme",
            "Salt and white pepper"
        ],
        instructions: [
            "Cook bacon in heavy pot until crispy. Remove bacon, keep fat.",
            "Add butter to bacon fat. Sauté onion and celery 5–7 minutes until soft. Add garlic and thyme.",
            "Sprinkle flour over vegetables. Stir constantly for 2 minutes.",
            "Slowly whisk in clam juice. Bring to gentle simmer.",
            "Add potatoes. Simmer 15–20 minutes until tender.",
            "Stir in clams and heavy cream. Cook 3–5 minutes just to heat clams.",
            "Season with salt and white pepper. Fold in half the bacon."
        ],
        prepTime: 20,
        cookTime: 35,
        servings: 4,
        calories: 480,
        youtube: "https://www.youtube.com/watch?si=5wl5BS736NQL1Yn5&v=FRNcmhvdUGA&feature=youtu.be",
        comments: []
    },
    {
        id: 47,
        name: "One-Bowl Chocolate Cake",
        category: "Dessert",
        rating: 4.9,
        reviewCount: 2100,
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
        ingredients: [
            "2 cups white sugar",
            "1¾ cups all-purpose flour",
            "¾ cup cocoa powder",
            "1½ tsp baking powder",
            "1½ tsp baking soda",
            "1 tsp salt",
            "2 eggs",
            "1 cup milk",
            "½ cup vegetable oil",
            "2 tsp vanilla extract",
            "1 cup boiling water"
        ],
        instructions: [
            "Preheat oven to 350°F. Grease two 9-inch cake pans.",
            "Mix dry ingredients in large bowl.",
            "Add eggs, milk, oil, vanilla; beat 2 minutes.",
            "Stir in boiling water (batter will be thin).",
            "Pour into pans and bake 30-35 minutes.",
            "Cool 10 minutes then remove to wire racks."
        ],
        prepTime: 15,
        cookTime: 35,
        servings: 12,
        calories: 380,
        youtube: "https://www.youtube.com/watch?v=3xtVWwX9vTk",
        comments: []
    },
    {
        id: 48,
        name: "Creamy Leche Flan",
        category: "Dessert",
        rating: 5.0,
        reviewCount: 850,
        img: "https://www.nestlegoodnes.com/ph/sites/default/files/styles/2_1_1920px_width/public/2025-11/Leche%20Flan.png.webp?itok=lPLS46Te",
        ingredients: [
            "10 egg yolks",
            "1 can (14 oz) condensed milk",
            "1 can (12 oz) evaporated milk",
            "1 tsp vanilla extract",
            "1 cup sugar (for caramel)"
        ],
        instructions: [
            "Melt sugar in llanera over low heat until golden. Spread around base.",
            "Combine egg yolks, condensed milk, evaporated milk, vanilla. Stir gently.",
            "Strain mixture into llanera with caramel.",
            "Cover with foil and steam 45-60 minutes until firm.",
            "Cool and refrigerate before serving."
        ],
        prepTime: 20,
        cookTime: 50,
        servings: 8,
        calories: 320,
        youtube: "https://www.youtube.com/watch?v=GgBVN3ZfbxU",
        comments: []
    },
    {
        id: 49,
        name: "Grandma's Apple Pie",
        category: "Dessert",
        rating: 4.7,
        reviewCount: 1450,
        img: "https://chelanfresh.com/wp-content/uploads/2019/02/ApplePieWEB-2.jpg",
        ingredients: [
            "1 recipe double-crust pie pastry",
            "½ cup unsalted butter",
            "3 tbsp flour",
            "¼ cup water",
            "½ cup white sugar",
            "½ cup brown sugar",
            "8 Granny Smith apples (sliced)"
        ],
        instructions: [
            "Preheat oven to 425°F.",
            "Melt butter, stir in flour. Add water and sugars; simmer.",
            "Place bottom crust in pan. Fill with apples, mounded slightly.",
            "Add top crust or lattice. Pour sugar mixture over.",
            "Bake 15 minutes at 425°F, then 35-45 minutes at 350°F."
        ],
        prepTime: 30,
        cookTime: 60,
        servings: 8,
        calories: 410,
        youtube: "https://www.youtube.com/watch?v=abPsaAS91w0",
        comments: []
    },
    {
        id: 50,
        name: "Fudgy Cocoa Brownies",
        category: "Dessert",
        rating: 4.8,
        reviewCount: 3200,
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
        ingredients: [
            "½ cup butter (melted)",
            "1 cup white sugar",
            "1 egg",
            "1 tsp vanilla",
            "⅓ cup cocoa powder",
            "½ cup flour",
            "¼ tsp salt",
            "¼ tsp baking powder"
        ],
        instructions: [
            "Preheat oven to 350°F. Grease 8-inch pan.",
            "Mix butter, sugar, egg, vanilla.",
            "Beat in cocoa, flour, salt, baking powder.",
            "Spread in pan and bake 25-30 minutes.",
            "Cool completely before cutting."
        ],
        prepTime: 10,
        cookTime: 25,
        servings: 9,
        calories: 220,
        youtube: "https://www.youtube.com/watch?v=lIb_741_dIw",
        comments: []
    },
    {
        id: 51,
        name: "Easy Mango Float",
        category: "Dessert",
        rating: 4.9,
        reviewCount: 580,
        img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
        ingredients: [
            "2 cups heavy cream (chilled)",
            "1 can (14 oz) condensed milk",
            "1 tsp vanilla",
            "2 packs Graham crackers",
            "3 ripe mangoes (sliced)"
        ],
        instructions: [
            "Whip cream until double in volume.",
            "Fold in condensed milk and vanilla.",
            "Layer crackers, cream, mangoes in dish.",
            "Repeat layers ending with mangoes.",
            "Chill 6 hours or overnight."
        ],
        prepTime: 20,
        cookTime: 0,
        servings: 8,
        calories: 380,
        youtube: "https://www.youtube.com/watch?v=8zj1SyTwX3w",
        comments: []
    },
    {
        id: 52,
        name: "Classic Lime Margarita",
        category: "Drinks",
        rating: 4.7,
        reviewCount: 720,
        img: "https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=400",
        ingredients: [
            "2 oz silver tequila",
            "1 oz fresh lime juice",
            "½ oz agave nectar",
            "Lime wedge and salt for rim",
            "Ice"
        ],
        instructions: [
            "Rub lime wedge around rim of glass and dip in salt.",
            "Combine tequila, lime juice, agave in shaker with ice.",
            "Shake vigorously 15 seconds.",
            "Strain into prepared glass with fresh ice.",
            "Garnish with lime wheel."
        ],
        prepTime: 5,
        cookTime: 0,
        servings: 1,
        calories: 180,
        youtube: "https://www.youtube.com/watch?v=1qsuP9hozvo",
        comments: []
    },
    {
        id: 53,
        name: "Fresh Mango Smoothie",
        category: "Drinks",
        rating: 4.8,
        reviewCount: 430,
        img: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
        ingredients: [
            "2 ripe mangoes (cubed)",
            "1 cup milk",
            "½ cup yogurt",
            "1 tbsp honey",
            "1 cup ice"
        ],
        instructions: [
            "Place all ingredients in blender.",
            "Blend until smooth and creamy.",
            "Pour into glass and serve immediately."
        ],
        prepTime: 5,
        cookTime: 0,
        servings: 2,
        calories: 210,
        youtube: "https://www.youtube.com/watch?v=ezFLb2fM0EA",
        comments: []
    },
    {
        id: 54,
        name: "Perfect Iced Coffee",
        category: "Drinks",
        rating: 4.6,
        reviewCount: 1850,
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
        ingredients: [
            "1 cup strong brewed coffee (cooled)",
            "2 tbsp milk",
            "1-2 tsp sugar",
            "1 cup ice",
            "Splash vanilla (optional)"
        ],
        instructions: [
            "Brew coffee double strength and cool.",
            "Fill glass with ice.",
            "Pour coffee over ice.",
            "Stir in sugar and milk.",
            "Add vanilla if desired."
        ],
        prepTime: 5,
        cookTime: 5,
        servings: 1,
        calories: 50,
        youtube: "https://www.youtube.com/watch?v=lfA2GdOoUQI",
        comments: []
    },
    {
        id: 55,
        name: "Strawberry Lemonade",
        category: "Drinks",
        rating: 4.9,
        reviewCount: 620,
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
        ingredients: [
            "1 lb fresh strawberries",
            "1 cup sugar",
            "1 cup fresh lemon juice",
            "6 cups cold water",
            "Ice and lemon slices"
        ],
        instructions: [
            "Puree strawberries with ½ cup water.",
            "Pour puree into pitcher.",
            "Add lemon juice, sugar, remaining water.",
            "Stir until sugar dissolves.",
            "Refrigerate 1 hour. Serve over ice."
        ],
        prepTime: 10,
        cookTime: 0,
        servings: 6,
        calories: 140,
        youtube: "https://www.youtube.com/watch?v=pVeYqSgC6xk",
        comments: []
    },
    {
        id: 56,
        name: "Creamy Hot Cocoa",
        category: "Drinks",
        rating: 4.8,
        reviewCount: 1300,
        img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400",
        ingredients: [
            "⅓ cup cocoa powder",
            "¾ cup sugar",
            "Pinch salt",
            "⅓ cup boiling water",
            "3½ cups milk",
            "¾ tsp vanilla",
            "Whipped cream or marshmallows"
        ],
        instructions: [
            "Combine cocoa, sugar, salt in saucepan.",
            "Stir in boiling water; bring to simmer.",
            "Cook 2 minutes stirring constantly.",
            "Stir in milk and heat until very hot (do not boil).",
            "Remove from heat, add vanilla.",
            "Top with marshmallows or whipped cream."
        ],
        prepTime: 5,
        cookTime: 10,
        servings: 4,
        calories: 210,
        youtube: "https://www.youtube.com/watch?v=-sCoBX841mE",
        comments: []
    }
];

// --- FEATURED RECIPE CAROUSEL ---
let featuredRecipes = [];
let currentFeaturedIndex = 0;
let carouselInterval = null;

function initFeaturedCarousel() {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    featuredRecipes = shuffled.slice(0, 5);
    
    renderFeaturedCarousel();
    startCarouselAutoSlide();
}

function renderFeaturedCarousel() {
    const container = document.getElementById('dishOfDayContainer');
    if (!container || featuredRecipes.length === 0) return;

    const dish = featuredRecipes[currentFeaturedIndex];

    container.style.opacity = 0;

    setTimeout(() => {
        container.innerHTML = `
            <div style="position: relative; width: 100%;">
                <div onmouseenter="pauseCarousel()" onmouseleave="resumeCarousel()" 
                     style="border-radius: 15px; padding: 15px 15px 15px 20px; width: 100%;">

                    <div style="display: flex; align-items: center; gap: 20px;">
                        
                        <div style="flex: 1;">
                            <h3 style="font-size: 1.6rem; font-weight: 700; margin: 0 0 8px;">
                                ${dish.name}
                            </h3>

                            <div style="display: flex; gap: 20px; font-size: 0.9rem; color: rgba(255,255,255,0.9); flex-wrap: wrap; margin-bottom: 12px;">
                                <span><i class="fas fa-star" style="color: var(--accent); margin-right: 4px;"></i> ${dish.rating} rating</span>
                                <span><i class="fas fa-clock" style="color: var(--accent); margin-right: 4px;"></i> ${dish.prepTime + dish.cookTime} mins</span>
                                <span><i class="fas fa-fire" style="color: var(--accent); margin-right: 4px;"></i> ${dish.calories} cal</span>
                            </div>

                            <button onclick="viewRecipe(${dish.id})"
                                style="background: white; color: var(--primary); border: none;
                                padding: 10px 20px; border-radius: 40px; font-weight: 600;
                                cursor: pointer; display: inline-flex; align-items: center;
                                gap: 8px; font-size: 0.9rem;">
                                <i class="fas fa-arrow-right"></i> View Recipe
                            </button>
                        </div>

                        <div style="width: 250px; height: 250px;">
                            <img src="${dish.img}" alt="${dish.name}"
                                style="width: 100%; height: 100%; object-fit: cover;
                                border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"
                                onerror="this.src='https://via.placeholder.com/250x250?text=Recipe'">
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
                    ${featuredRecipes.map((_, index) => `
                        <div onclick="goToFeaturedSlide(${index})"
                            style="width: 10px; height: 10px; border-radius: 50%;
                            background: ${index === currentFeaturedIndex ? 'white' : 'rgba(255,255,255,0.3)'};
                            cursor: pointer; transition: all 0.3s;">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.style.opacity = 1;

    }, 600);
}

function startCarouselAutoSlide() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        nextFeaturedSlide();
    }, 5000);
}

function pauseCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function resumeCarousel() {
    if (!carouselInterval) {
        startCarouselAutoSlide();
    }
}

function nextFeaturedSlide() {
    if (featuredRecipes.length === 0) return;
    currentFeaturedIndex = (currentFeaturedIndex + 1) % featuredRecipes.length;
    renderFeaturedCarousel();
}

function prevFeaturedSlide() {
    if (featuredRecipes.length === 0) return;
    currentFeaturedIndex = (currentFeaturedIndex - 1 + featuredRecipes.length) % featuredRecipes.length;
    renderFeaturedCarousel();
}

function goToFeaturedSlide(index) {
    if (index >= 0 && index < featuredRecipes.length) {
        currentFeaturedIndex = index;
        renderFeaturedCarousel();
        
        pauseCarousel();
        startCarouselAutoSlide();
    }
}

function renderDishOfTheDay() {
    initFeaturedCarousel();
}

document.addEventListener('DOMContentLoaded', renderDishOfTheDay);

// DISH OF THE DAY FUNCTION
function pickDishOfTheDay() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
}