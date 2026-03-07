// ============================================
// SECTION 2: USER DATA & STORAGE
// Manages user sessions, profiles, saved recipes
// ============================================

let currentUser = null;
let savedRecipes = [];
let userReviews = [];
let userActivity = [];

let userProfile = {
    name: '',
    email: '',
    bio: 'Food lover and home cook',
    location: 'Philippines',
    avatar: 'fas fa-user',
    joinDate: new Date().getFullYear()
};

// Load user from session storage
function loadUserFromStorage() {
    const savedUser = sessionStorage.getItem('currentUser');
    const savedRecipesData = sessionStorage.getItem('savedRecipes');
    const savedReviews = sessionStorage.getItem('userReviews');
    const savedProfile = sessionStorage.getItem('userProfile');
    const savedActivity = sessionStorage.getItem('userActivity');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        savedRecipes = savedRecipesData ? JSON.parse(savedRecipesData) : [];
        userReviews = savedReviews ? JSON.parse(savedReviews) : [];
        userActivity = savedActivity ? JSON.parse(savedActivity) : [];
        
        if (savedProfile) {
            userProfile = JSON.parse(savedProfile);
        } else {
            userProfile.name = currentUser.name;
            userProfile.email = currentUser.email;
        }
        
        // Update login button
        const navBtn = document.getElementById('navLoginBtn');
        navBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name.split(' ')[0];
        navBtn.onclick = function() { showProfile(); };
    } else {
        // Set default login button behavior
        document.getElementById('navLoginBtn').onclick = function() { showLoginPage(); };
    }
}

// Save user to session storage
function saveUserToStorage() {
    if (currentUser) {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        sessionStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        sessionStorage.setItem('userReviews', JSON.stringify(userReviews));
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
        sessionStorage.setItem('userActivity', JSON.stringify(userActivity));
    }
}

// Clear user from storage
function clearUserStorage() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('savedRecipes');
    sessionStorage.removeItem('userReviews');
    sessionStorage.removeItem('userProfile');
    sessionStorage.removeItem('userActivity');
}

// Load on startup
loadUserFromStorage();

// ============================================
// SECTION 3: VIEW NAVIGATION
// Handles page/view switching and scrolling
// ============================================

function hideAll() {
    document.getElementById('homeView').style.display = 'none';
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('aboutView').style.display = 'none';
    document.getElementById('menuView').style.display = 'none';
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('servicesView').style.display = 'none';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showHome() {
    hideAll();
    document.getElementById('homeView').style.display = 'block';
    displayRecipes(recipes);
    updateCategoryButtons('all');
    document.getElementById('searchHeader').style.display = 'none';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBadge').style.display = 'none';
    scrollToTop();
}

function showMenu() {
    hideAll();
    document.getElementById('menuView').style.display = 'block';
    renderMenu();
    document.getElementById('menuSearchHeader').style.display = 'none';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBadge').style.display = 'none';
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes('All')) {
            btn.classList.add('active');
        }
    });
    
    scrollToTop();
}

function showServices() {
    hideAll();
    document.getElementById('servicesView').style.display = 'block';
    document.getElementById('submitRecipeFormContainer').style.display = 'none';
    displayQuestions();
    scrollToTop();
}

function showAbout() {
    hideAll();
    document.getElementById('aboutView').style.display = 'block';
}

function showLoginPage() {
    hideAll();
    document.getElementById('loginView').style.display = 'block';
    toggleAuth(false);
}

function showProfile() {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        showLoginPage();
        return;
    }
    hideAll();
    document.getElementById('profileView').style.display = 'block';
    updateProfileDisplay();
}

// ============================================
// SECTION 4: SMART AI CHATBOT ASSISTANT
// Complete cooking assistant with menu system and intent recognition
// ============================================

class SmartChatbotAssistant {
    constructor() {
        this.context = {
            userPreferences: [],
            conversationHistory: [],
            currentTopic: null,
            lastRecipes: [],
            userMood: 'neutral',
            dietaryRestrictions: [],
            skillLevel: 'beginner',
            favoriteCuisines: [],
            sessionStarted: false,
            userName: null,
            lastQuestion: null,
            questionCount: 0,
            awaitingSearchQuery: false
        };
        
        this.knowledgeBase = {
            cuisines: ['filipino', 'korean', 'chinese', 'japanese', 'thai', 'italian', 'american', 'mexican', 'indian', 'french'],
            dietary: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'low-carb', 'low-calorie', 'paleo', 'halal'],
            techniques: ['baking', 'grilling', 'frying', 'roasting', 'steaming', 'braising', 'sous-vide', 'poaching', 'blanching', 'fermenting'],
            mealTypes: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'appetizer', 'brunch'],
            occasions: ['holiday', 'party', 'date night', 'family dinner', 'meal prep', 'potluck'],
            difficulty: ['easy', 'medium', 'hard', 'expert']
        };

        this.funFacts = [
            "Did you know? Honey never spoils! Archaeologists found 3000-year-old honey in Egyptian tombs that's still edible! 🍯",
            "Fun fact: The world's most expensive pizza costs $12,000 and takes 72 hours to make! 🍕",
            "Did you know? Potatoes were the first vegetable grown in space! 🥔",
            "Fun fact: Cashews grow attached to apples! The 'cashew apple' is a fruit, and the nut grows outside it! 🥜",
            "Did you know? Pound cake got its name because it originally used a pound each of flour, butter, eggs, and sugar! 🍰",
            "Fun fact: Carrots were originally purple, not orange! 🥕",
            "Did you know? The world's largest lasagna weighed over 5,000 pounds! 🍝",
            "Fun fact: Chocolate was once used as currency by the Aztecs! 🍫",
            "Did you know? Bananas are berries, but strawberries aren't! 🍌🍓",
            "Fun fact: The hottest chili pepper in the world is the Carolina Reaper, measuring over 2.2 million Scoville units! 🌶️",
            "Did you know? A group of oysters is called a bed! 🦪",
            "Fun fact: The most expensive coffee in the world, Kopi Luwak, is made from beans eaten and excreted by civet cats! ☕"
        ];

        this.cookingTips = {
            'main_dish': {
                title: "🍛 Main Dish Tips",
                tips: [
                    "For tender adobo, simmer low and slow – don't rush!",
                    "When making bistek, marinate the beef for at least 1 hour to tenderize.",
                    "To get crispy lechon belly, dry the skin overnight in the fridge before roasting.",
                    "For kare-kare, toast the rice grains until golden before grinding for a nutty flavor.",
                    "In carbonara, never add cream – the creaminess comes from eggs and cheese mixed off-heat.",
                    "When grilling bulgogi, use high heat and don't overcrowd the pan for that smoky char.",
                    "For pad thai, soak rice noodles in room‑temp water – not hot – to keep them chewy.",
                    "In tom yum, add lime juice only after turning off the heat to preserve freshness.",
                    "For Peking duck, pour boiling water over the skin first to tighten it for crispiness.",
                    "When making mapo tofu, use silken tofu and gently push it into the sauce to avoid breaking."
                ]
            },
            'dessert': {
                title: "🍰 Dessert Tips",
                tips: [
                    "For fluffy pancakes, don't overmix the batter – lumps are okay!",
                    "In leche flan, strain the custard twice for a silky smooth texture.",
                    "When baking chocolate cake, use hot water to bloom the cocoa for deeper flavor.",
                    "For mango float, use ripe but firm mangoes and chill overnight for best texture.",
                    "To prevent brownies from drying out, pull them from the oven when a toothpick comes out with a few moist crumbs.",
                    "For apple pie, toss sliced apples with sugar and let sit for 30 minutes to release juices – then use that juice in the filling."
                ]
            },
            'drinks': {
                title: "🥤 Drinks Tips",
                tips: [
                    "For a perfect margarita, use fresh lime juice – bottled won't do.",
                    "When making iced coffee, brew double strength so it doesn't get watery as ice melts.",
                    "For strawberry lemonade, macerate the strawberries with sugar first to draw out the syrup.",
                    "In hot cocoa, add a pinch of salt to enhance the chocolate flavor.",
                    "For smoothies, freeze your fruit beforehand for a thicker, creamier result without ice."
                ]
            },
            'ingredient_chicken': {
                title: "🐔 Chicken Tips",
                tips: [
                    "Always pat chicken dry before searing to get a golden crust.",
                    "In chicken adobo, use thighs – they stay juicier than breasts.",
                    "For fried chicken, brine in buttermilk overnight for tenderness.",
                    "When making chicken Kiev, freeze the butter logs so they don't leak during frying.",
                    "For three cup chicken, use dark sesame oil and lots of ginger for authentic flavor."
                ]
            },
            'ingredient_beef': {
                title: "🐄 Beef Tips",
                tips: [
                    "For bistek, slice beef thinly against the grain for tenderness.",
                    "In bulgogi, grate an Asian pear into the marinade – it naturally tenderizes the meat.",
                    "When braising beef for pot roast, sear it well first to build flavor.",
                    "For beef noodle soup, blanch the beef first to remove impurities for a clear broth.",
                    "In goulash, use sweet Hungarian paprika and cook it gently – burnt paprika turns bitter."
                ]
            },
            'ingredient_pork': {
                title: "🐖 Pork Tips",
                tips: [
                    "For lechon belly, score the skin and rub with salt to draw out moisture for crackling.",
                    "In adobong puti (white adobo), let the vinegar boil uncovered for a few minutes to mellow the acidity.",
                    "For tonkatsu, press panko firmly onto the pork and let it rest before frying to prevent breading from falling off.",
                    "When making BBQ ribs, remove the membrane on the back for maximum tenderness.",
                    "For gua bao, braise the pork belly until it's melt-in-your-mouth tender – at least 2 hours."
                ]
            },
            'ingredient_seafood': {
                title: "🦐 Seafood Tips",
                tips: [
                    "For adobong pusit, cook squid for only 3–5 minutes – longer makes it rubbery.",
                    "In paksiw na bangus, layer ginger and aromatics at the bottom to prevent sticking and add flavor.",
                    "When making clam chowder, add the clams at the very end just to heat through – overcooking makes them tough.",
                    "For oyster omelet, use sweet potato starch for that chewy, crispy texture.",
                    "In tom yum goong, sauté the shrimp heads first to extract maximum flavor into the broth."
                ]
            },
            'technique': {
                title: "🔪 Cooking Techniques",
                tips: [
                    "**Searing**: Pat meat dry, get pan smoking hot, and don't move it until a crust forms.",
                    "**Braising**: Cook low and slow with liquid – perfect for tough cuts like chuck or oxtail.",
                    "**Blanching**: Briefly boil veggies then plunge into ice water to retain color and crunch.",
                    "**Tempering eggs**: Slowly whisk hot liquid into beaten eggs, then return to pot to avoid scrambling.",
                    "**Kneading dough**: Use the heel of your hand, fold, turn, repeat until smooth and elastic.",
                    "**Proofing bread**: Create a warm, humid environment (oven with light on + pan of hot water)."
                ]
            },
            'mistakes': {
                title: "⚠️ Common Cooking Mistakes to Avoid",
                tips: [
                    "❌ Overcrowding the pan when searing – it steams instead of browns.",
                    "❌ Not resting meat after cooking – juices run out, leaving it dry.",
                    "❌ Adding lime/lemon juice too early in soups – it can turn bitter.",
                    "❌ Using cold eggs for tempering – they'll scramble. Always bring to room temp first.",
                    "❌ Overmixing pancake batter – develops gluten, making them tough.",
                    "❌ Peeling ginger with a knife – use a spoon to save more flesh.",
                    "❌ Boiling vinegar uncovered in adobo – let it boil for a few minutes uncovered to mellow, then cover to finish."
                ]
            }
        };
    }

    startSession(userName) {
        this.context.sessionStarted = true;
        this.context.userName = userName;
        this.context.conversationHistory = [];
        this.context.questionCount = 0;
        this.context.awaitingSearchQuery = false;
        
        const hour = new Date().getHours();
        let timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

        return {
            text: `${timeGreeting}, ${userName}! 👋 I'm your AI cooking assistant. I can help you with:\n\n• Finding recipes by ingredient, cuisine, or occasion\n• Cooking tips (categorized by dish, ingredient, technique)\n• Fun cooking facts and jokes\n\nWhat would you like to explore today?`,
            suggestions: [
                { text: '🔍 Find Recipe', action: 'find recipe' },
                { text: '💡 Cooking Tips', action: 'cooking tip' },
                { text: '🔥 Popular', action: 'popular' },
                { text: '🎲 Fun Fact', action: 'fun fact' },
                { text: '⏱️ Quick Meals', action: 'quick meals' }
            ]
        };
    }

    async processMessage(message, user) {
        const lowerMsg = message.toLowerCase().trim();
        
        if (this.context.awaitingSearchQuery) {
            this.context.awaitingSearchQuery = false;
            return this.handleRecipeSearch(lowerMsg, user);
        }

        this.context.conversationHistory.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });
        
        this.context.questionCount++;
        this.context.lastQuestion = message;

        const actionMap = {
            'find recipe': 'recipe_search',
            'cooking tip': 'cooking_help',
            'cooking tips': 'cooking_help',
            'popular': 'popular',
            'fun fact': 'fun_fact',
            'quick meals': 'quick_meals',
            'save recipe': 'save_recipe',
            'browse all': 'browse_all',
            'help': 'help',
            'clear': 'clear',
            'joke': 'joke',
            'main menu': 'menu',
            'menu': 'menu',
            'start over': 'menu',
            'restart': 'menu',
            'under 15 min': 'time_filter_15',
            '15-30 min': 'time_filter_30',
            '30-60 min': 'time_filter_60',
            'over 60 min': 'time_filter_60plus',
            'main dish popular': 'popular_main',
            'dessert popular': 'popular_dessert',
            'drinks popular': 'popular_drinks',
            'main dish tips': 'tip_main',
            'dessert tips': 'tip_dessert',
            'drinks tips': 'tip_drinks',
            'chicken tips': 'tip_chicken',
            'beef tips': 'tip_beef',
            'pork tips': 'tip_pork',
            'seafood tips': 'tip_seafood',
            'technique tips': 'tip_technique',
            'mistakes to avoid': 'tip_mistakes'
        };

        let intent = actionMap[lowerMsg] || this.analyzeIntent(lowerMsg);
        const sentiment = this.analyzeSentiment(lowerMsg);
        this.updateContext(lowerMsg, intent);

        let response;
        switch(intent) {
            case 'greeting':
                response = this.generateGreeting(user);
                break;
            case 'recipe_search':
                response = this.promptRecipeSearch();
                break;
            case 'cooking_help':
                response = this.showCookingTipCategories();
                break;
            case 'tip_main':
                response = this.getTipCategory('main_dish');
                break;
            case 'tip_dessert':
                response = this.getTipCategory('dessert');
                break;
            case 'tip_drinks':
                response = this.getTipCategory('drinks');
                break;
            case 'tip_chicken':
                response = this.getTipCategory('ingredient_chicken');
                break;
            case 'tip_beef':
                response = this.getTipCategory('ingredient_beef');
                break;
            case 'tip_pork':
                response = this.getTipCategory('ingredient_pork');
                break;
            case 'tip_seafood':
                response = this.getTipCategory('ingredient_seafood');
                break;
            case 'tip_technique':
                response = this.getTipCategory('technique');
                break;
            case 'tip_mistakes':
                response = this.getTipCategory('mistakes');
                break;
            case 'substitution':
                response = this.handleSubstitution(lowerMsg);
                break;
            case 'joke':
                response = this.tellJoke();
                break;
            case 'fun_fact':
                response = this.tellFunFact();
                break;
            case 'popular':
                response = this.handlePopularCategories();
                break;
            case 'popular_main':
                response = this.handlePopularByCategory('Main Dish');
                break;
            case 'popular_dessert':
                response = this.handlePopularByCategory('Dessert');
                break;
            case 'popular_drinks':
                response = this.handlePopularByCategory('Drinks');
                break;
            case 'quick_meals':
                response = this.handleQuickMealsOptions();
                break;
            case 'time_filter_15':
                response = this.handleTimeFilter(0, 15);
                break;
            case 'time_filter_30':
                response = this.handleTimeFilter(15, 30);
                break;
            case 'time_filter_60':
                response = this.handleTimeFilter(30, 60);
                break;
            case 'time_filter_60plus':
                response = this.handleTimeFilter(60, 999);
                break;
            case 'save_recipe':
                response = this.handleSaveRecipe(user);
                break;
            case 'browse_all':
                response = this.handleBrowseAll();
                break;
            case 'menu':
                response = this.handleMenu(user);
                break;
            case 'help':
                response = this.showHelp();
                break;
            case 'clear':
                response = this.clearConversation();
                break;
            default:
                response = await this.handleRecipeSearch(lowerMsg, user);
        }

        const suggestions = this.generateSuggestions(intent);
        this.context.conversationHistory.push({
            role: 'assistant',
            content: response.text,
            suggestions: suggestions,
            timestamp: new Date()
        });

        return {
            text: response.text,
            suggestions: suggestions,
            recipeCards: response.recipeCards || [],
            quickActions: response.quickActions || []
        };
    }

    // Show cooking tip categories
    showCookingTipCategories() {
        return {
            text: "💡 **Cooking Tips – Choose a category:**",
            suggestions: [
                { text: 'Main Dish Tips', action: 'main dish tips' },
                { text: 'Dessert Tips', action: 'dessert tips' },
                { text: 'Drinks Tips', action: 'drinks tips' },
                { text: 'Chicken Tips', action: 'chicken tips' },
                { text: 'Beef Tips', action: 'beef tips' },
                { text: 'Pork Tips', action: 'pork tips' },
                { text: 'Seafood Tips', action: 'seafood tips' },
                { text: 'Technique Tips', action: 'technique tips' },
                { text: 'Mistakes to Avoid', action: 'mistakes to avoid' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    // Get tips for a specific category
    getTipCategory(category) {
        const cat = this.cookingTips[category];
        if (!cat) return { text: "Sorry, no tips found for that category." };
        // Pick 3 random tips from the list to keep it fresh
        const shuffled = cat.tips.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        return {
            text: `${cat.title}\n\n• ` + selected.join('\n• '),
            suggestions: [
                { text: 'More tips', action: 'cooking tip' },
                { text: 'Another category', action: 'cooking tip' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    // Prompt user to enter a search query
    promptRecipeSearch() {
        this.context.awaitingSearchQuery = true;
        return {
            text: "🔍 **What would you like to cook?**\n\nTell me an ingredient, dish name, or cuisine (e.g., 'chicken', 'pasta', 'filipino', 'adobo').",
            suggestions: [
                { text: 'Chicken', action: 'chicken' },
                { text: 'Beef', action: 'beef' },
                { text: 'Vegetarian', action: 'vegetarian' },
                { text: 'Pasta', action: 'pasta' },
                { text: 'Filipino', action: 'filipino' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    // Show time filter options
    handleQuickMealsOptions() {
        return {
            text: "⏱️ **Filter by cooking time:**\n\nChoose a time range:",
            suggestions: [
                { text: 'Under 15 min', action: 'under 15 min' },
                { text: '15-30 min', action: '15-30 min' },
                { text: '30-60 min', action: '30-60 min' },
                { text: 'Over 60 min', action: 'over 60 min' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    // Filter recipes by time
    handleTimeFilter(min, max) {
        const filtered = recipes.filter(r => {
            const total = r.prepTime + r.cookTime;
            return total >= min && total <= max;
        }).slice(0, 5);

        if (filtered.length === 0) {
            return {
                text: `No recipes found in this time range. Try another range!`,
                suggestions: [
                    { text: 'Try another range', action: 'quick meals' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }

        const rangeText = max === 999 ? 'over 60 minutes' : `${min}-${max} minutes`;
        return {
            text: `🍳 Here are some recipes ready in **${rangeText}**:`,
            recipeCards: filtered.map(r => ({
                id: r.id,
                name: r.name,
                image: r.img,
                rating: r.rating,
                time: r.prepTime + r.cookTime,
                calories: r.calories
            })),
            suggestions: [
                { text: 'Another range', action: 'quick meals' },
                { text: 'Find Recipe', action: 'find recipe' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    // Popular categories selection
    handlePopularCategories() {
        return {
            text: "🔥 **Popular recipes by category:**\n\nChoose a category:",
            suggestions: [
                { text: 'Main Dish', action: 'main dish popular' },
                { text: 'Dessert', action: 'dessert popular' },
                { text: 'Drinks', action: 'drinks popular' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    // Popular by category
    handlePopularByCategory(category) {
        const filtered = recipes
            .filter(r => r.category === category)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);

        return {
            text: `🔥 Top 5 popular **${category}** recipes:`,
            recipeCards: filtered.map(r => ({
                id: r.id,
                name: r.name,
                image: r.img,
                rating: r.rating,
                time: r.prepTime + r.cookTime,
                calories: r.calories
            })),
            suggestions: [
                { text: 'Another category', action: 'popular' },
                { text: 'Find Recipe', action: 'find recipe' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    analyzeIntent(message) {
        const patterns = {
            greeting: /\b(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup|what'?s up|start|begin)\b/i,
            recipe_search: /\b(find|search|looking for|want to make|cook|recipe for|how to make|recipe|what can i make|do you have|recipe ideas|show me)\b/i,
            cooking_help: /\b(how (do|can) i|help me|advice|tip|technique|method|way to|struggling|problem with|cooking tip|cooking tips|kitchen tip|kitchen tips)\b/i,
            substitution: /\b(substitute|replacement|swap|instead of|alternative|without|out of|don't have|no more|ran out)\b/i,
            dietary_advice: /\b(vegetarian|vegan|gluten[ -]?free|dairy[ -]?free|keto|low carb|paleo|allergic|allergy|diet|restriction)\b/i,
            technique_explanation: /\b(what is|explain|define|tell me about|how does|what does mean|how to do)\b.*?\b(sous vide|braising|roasting|grilling|kneading|proofing|tempering|blanching|poaching|fermenting|knife skills|searing)\b|\b(how to (knead|proof|temper|sear|chop|dice|mince))\b/i,
            joke: /\b(joke|funny|laugh|humor|make me laugh|crack me up)\b/i,
            fun_fact: /\b(fun fact|interesting fact|did you know|tell me something interesting|fact)\b/i,
            popular: /\b(popular|trending|top rated|best|famous|most popular)\b/i,
            quick_meals: /\b(quick meal|quick meals|fast meal|30 minute|under 30|speedy|express|30 min)\b/i,
            help: /\b(help|what can you do|how do you work|instructions|commands)\b/i,
            clear: /\b(clear|reset|start over|new conversation|fresh start)\b/i,
            capabilities: /\b(capabilities|features|what can you do|abilities|skills)\b/i
        };

        for (const [intent, pattern] of Object.entries(patterns)) {
            if (pattern.test(message)) {
                return intent;
            }
        }
        
        return 'unknown';
    }

    analyzeSentiment(message) {
        const positiveWords = ['good', 'great', 'amazing', 'excellent', 'love', 'happy', 'excited', 'wonderful', 'fantastic', 'perfect', 'awesome', 'delicious', 'yummy', 'tasty'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'disappointed', 'frustrated', 'difficult', 'hard', 'problem', 'issue', 'fail', 'ruin', 'waste'];
        
        const words = message.toLowerCase().split(/\s+/);
        let score = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score++;
            if (negativeWords.includes(word)) score--;
        });
        
        return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
    }

    updateContext(message, intent) {
        this.knowledgeBase.dietary.forEach(diet => {
            if (message.includes(diet)) {
                if (!this.context.dietaryRestrictions.includes(diet)) {
                    this.context.dietaryRestrictions.push(diet);
                }
            }
        });

        this.knowledgeBase.cuisines.forEach(cuisine => {
            if (message.includes(cuisine)) {
                if (!this.context.favoriteCuisines.includes(cuisine)) {
                    this.context.favoriteCuisines.push(cuisine);
                }
            }
        });

        if (message.includes('beginner') || message.includes('new to') || message.includes('first time') || message.includes('novice')) {
            this.context.skillLevel = 'beginner';
        } else if (message.includes('advanced') || message.includes('expert') || message.includes('professional') || message.includes('chef')) {
            this.context.skillLevel = 'advanced';
        } else if (message.includes('intermediate') || message.includes('some experience') || message.includes('familiar')) {
            this.context.skillLevel = 'intermediate';
        }

        this.context.currentTopic = intent;
    }

    generateGreeting(user) {
        const hour = new Date().getHours();
        let timeGreeting = '';
        
        if (hour < 12) timeGreeting = 'Good morning';
        else if (hour < 18) timeGreeting = 'Good afternoon';
        else timeGreeting = 'Good evening';

        if (this.context.questionCount > 0) {
            const greetings = [
                `Welcome back, ${user?.name || 'Chef'}! 👋 Ready for more cooking adventures?`,
                `Hey again, ${user?.name || 'there'}! What are we cooking today? 🍳`,
                `Back for more culinary wisdom? I'm ready! What would you like to know? 🧑‍🍳`,
                `Great to see you again, ${user?.name || 'food lover'}! How can I help you cook something amazing? 🌟`
            ];
            return {
                text: greetings[Math.floor(Math.random() * greetings.length)],
                quickActions: [
                    { icon: 'fa-search', text: 'Find Recipe', action: 'find recipe' },
                    { icon: 'fa-lightbulb', text: 'Cooking Tip', action: 'cooking tip' },
                    { icon: 'fa-fire', text: 'Popular', action: 'popular' },
                    { icon: 'fa-clock', text: 'Quick Meals', action: 'quick meals' },
                    { icon: 'fa-home', text: 'Main Menu', action: 'main menu' }
                ]
            };
        }

        const greetings = [
            `${timeGreeting}, ${user?.name || 'Chef'}! 🧑‍🍳 Ready to cook something amazing today? I can help you find recipes, learn techniques, and much more!`,
            `Hey ${user?.name || 'there'}! 👋 I'm your AI cooking assistant. What culinary adventure shall we embark on?`,
            `Welcome to Food Recipe 101, ${user?.name || 'food lover'}! 🌟 I'm here to help you create magic in the kitchen. What would you like to learn?`,
            `${timeGreeting}! 🍳 I'm your personal cooking guide. Whether you need recipes, tips, or just some kitchen inspiration, I've got you covered!`
        ];

        return {
            text: greetings[Math.floor(Math.random() * greetings.length)],
            quickActions: [
                { icon: 'fa-search', text: 'Find Recipe', action: 'find recipe' },
                { icon: 'fa-lightbulb', text: 'Cooking Tip', action: 'cooking tip' },
                { icon: 'fa-fire', text: 'Popular', action: 'popular' },
                { icon: 'fa-clock', text: 'Quick Meals', action: 'quick meals' },
                { icon: 'fa-home', text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    showHelp() {
        return {
            text: "🔍 **Here's how I can help you:**\n\n" +
                  "• **Find recipes** - 'find chicken recipes', 'what can I make with eggs'\n" +
                  "• **Cooking tips** - 'how to knead dough', 'tips for searing steak'\n" +
                  "• **Substitutions** - 'substitute for eggs', 'replace butter'\n" +
                  "• **Dietary advice** - 'vegetarian recipes', 'gluten-free options'\n" +
                  "• **Techniques** - 'explain sous vide', 'how to temper eggs'\n" +
                  "• **Fun stuff** - 'tell me a joke', 'fun fact'\n" +
                  "• **Main Menu** - 'main menu' or 'start over' to reset conversation\n\n" +
                  "Just ask me anything about cooking!",
            suggestions: [
                { text: 'Find Recipe', action: 'find recipe' },
                { text: 'Cooking Tip', action: 'cooking tip' },
                { text: 'Substitution', action: 'substitution' },
                { text: 'Fun Fact', action: 'fun fact' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    showCapabilities() {
        return {
            text: "🎯 **My Capabilities:**\n\n" +
                  "✅ Recipe search by ingredients, cuisine, or name\n" +
                  "✅ Cooking technique explanations\n" +
                  "✅ Ingredient substitutions\n" +
                  "✅ Dietary restriction guidance\n" +
                  "✅ Time management tips\n" +
                  "✅ Ingredient comparisons\n" +
                  "✅ Personalized recommendations\n" +
                  "✅ Cooking jokes and fun facts\n" +
                  "✅ Conversation memory (I remember your preferences!)\n" +
                  "✅ Main Menu to reset conversation\n\n" +
                  "What would you like to try?",
            suggestions: [
                { text: 'Find Recipe', action: 'find recipe' },
                { text: 'Cooking Tip', action: 'cooking tip' },
                { text: 'Fun Fact', action: 'fun fact' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    clearConversation() {
        this.context.conversationHistory = [];
        this.context.currentTopic = null;
        this.context.lastRecipes = [];
        this.context.questionCount = 0;
        this.context.awaitingSearchQuery = false;
        
        return {
            text: "🧹 Conversation cleared! Let's start fresh. What would you like to talk about?",
            suggestions: [
                { text: 'Find Recipe', action: 'find recipe' },
                { text: 'Cooking Tip', action: 'cooking tip' },
                { text: 'Popular', action: 'popular' },
                { text: 'Help', action: 'help' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    tellFunFact() {
        const fact = this.funFacts[Math.floor(Math.random() * this.funFacts.length)];
        return {
            text: fact,
            suggestions: [
                { text: 'Another Fact', action: 'fun fact' },
                { text: 'Tell Joke', action: 'joke' },
                { text: 'Back to Cooking', action: 'cooking tip' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    tellJoke() {
        const jokes = [
            "Why did the tomato turn red? Because it saw the salad dressing! 🍅",
            "What do you call a fake noodle? An impasta! 🍝",
            "Why did the egg hide? It was a little chicken! 🥚",
            "What do you call cheese that isn't yours? Nacho cheese! 🧀",
            "Why did the cookie go to the doctor? It was feeling crumbly! 🍪",
            "What's a garlic's favorite game? Clove-er! 🧄"
        ];
        return {
            text: jokes[Math.floor(Math.random() * jokes.length)],
            suggestions: [
                { text: 'Another Joke', action: 'joke' },
                { text: 'Fun Fact', action: 'fun fact' },
                { text: 'Back to Cooking', action: 'cooking tip' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    handleSaveRecipe(user) {
        if (!user) {
            return {
                text: "You need to be logged in to save recipes. Please log in first!",
                suggestions: [
                    { text: 'Login', action: 'login' },
                    { text: 'Browse recipes', action: 'find recipe' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        return {
            text: "To save a recipe, click the heart icon on any recipe card. Your saved recipes will appear in your profile.",
            suggestions: [
                { text: 'Browse recipes', action: 'find recipe' },
                { text: 'Go to profile', action: 'profile' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    handleBrowseAll() {
        return {
            text: "Here are all our recipes. You can browse by category or use the search bar.",
            recipeCards: recipes.slice(0, 5).map(recipe => ({
                id: recipe.id,
                name: recipe.name,
                image: recipe.img,
                rating: recipe.rating,
                time: recipe.prepTime + recipe.cookTime,
                calories: recipe.calories
            })),
            suggestions: [
                { text: 'Show more', action: 'browse all' },
                { text: 'Filter by category', action: 'filter' },
                { text: 'Search', action: 'find recipe' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    handleMenu(user) {
        this.context.conversationHistory = [];
        this.context.currentTopic = null;
        this.context.lastRecipes = [];
        this.context.questionCount = 0;
        this.context.awaitingSearchQuery = false;
        return this.startSession(user?.name || 'Chef');
    }

    async handleRecipeSearch(message, user) {
        const searchTerms = this.extractSearchTerms(message);
        let filteredRecipes = [...recipes];

        if (this.context.dietaryRestrictions.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                return this.context.dietaryRestrictions.every(restriction => {
                    return this.checkDietaryCompatibility(recipe, restriction);
                });
            });
        }

        if (this.context.favoriteCuisines.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                return this.context.favoriteCuisines.some(cuisine => 
                    this.guessCuisine(recipe) === cuisine
                );
            });
        }

        if (searchTerms.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                return searchTerms.some(term => 
                    recipe.name.toLowerCase().includes(term) ||
                    recipe.ingredients.some(i => i.toLowerCase().includes(term)) ||
                    recipe.category.toLowerCase().includes(term)
                );
            });
        }

        filteredRecipes = this.sortByRelevance(filteredRecipes, searchTerms);

        if (filteredRecipes.length === 0) {
            if (this.context.favoriteCuisines.length > 0) {
                return {
                    text: `I couldn't find exact matches, but I can show you some popular ${this.context.favoriteCuisines[0]} recipes instead!`,
                    recipeCards: recipes
                        .filter(r => this.guessCuisine(r) === this.context.favoriteCuisines[0])
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5)
                        .map(recipe => ({
                            id: recipe.id,
                            name: recipe.name,
                            image: recipe.img,
                            rating: recipe.rating,
                            time: recipe.prepTime + recipe.cookTime,
                            calories: recipe.calories
                        })),
                    suggestions: [
                        { text: `Show more ${this.context.favoriteCuisines[0]}`, action: this.context.favoriteCuisines[0] },
                        { text: 'Browse all', action: 'browse all' },
                        { text: 'Try different search', action: 'find recipe' },
                        { text: 'Main Menu', action: 'main menu' }
                    ]
                };
            }
            
            return {
                text: "I couldn't find any exact matches. Try being more specific or browse our popular recipes!",
                suggestions: [
                    { text: 'Show popular recipes', action: 'popular' },
                    { text: 'Browse all recipes', action: 'browse all' },
                    { text: 'Help me search', action: 'help' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }

        const topRecipes = filteredRecipes.slice(0, 5);
        this.context.lastRecipes = topRecipes;
        
        return {
            text: this.generateRecipeResponse(topRecipes, searchTerms),
            recipeCards: topRecipes.map(recipe => ({
                id: recipe.id,
                name: recipe.name,
                image: recipe.img,
                rating: recipe.rating,
                time: recipe.prepTime + recipe.cookTime,
                calories: recipe.calories
            })),
            suggestions: [
                { text: 'Show more results', action: 'more recipes' },
                { text: 'Filter by time', action: 'quick meals' },
                { text: 'Save to favorites', action: 'save recipe' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    extractSearchTerms(message) {
        const words = message.toLowerCase().split(/\s+/);
        return words.filter(word => word.length > 2 && !this.isCommonWord(word));
    }

    isCommonWord(word) {
        const commonWords = ['the', 'and', 'for', 'with', 'from', 'have', 'that', 'this', 'what', 'find', 'show', 'recipe', 'recipes', 'cook', 'make', 'want', 'looking', 'search'];
        return commonWords.includes(word);
    }

    guessCuisine(recipe) {
        const cuisineMap = {
            'filipino': ['adobo', 'kare-kare', 'bistek', 'lechon', 'paksiw', 'sisig', 'sinigang'],
            'korean': ['bulgogi', 'bibimbap', 'galbi', 'kimchi', 'jajangmyeon', 'korean'],
            'japanese': ['sushi', 'ramen', 'tonkatsu', 'okonomiyaki', 'unagi', 'onigiri', 'japanese'],
            'chinese': ['peking duck', 'mapo tofu', 'kung pao', 'xiaolongbao', 'sweet and sour', 'chinese'],
            'thai': ['pad thai', 'tom yum', 'green curry', 'massaman', 'thai'],
            'italian': ['carbonara', 'lasagna', 'pancakes', 'italian'],
            'american': ['cheeseburger', 'bbq ribs', 'fried chicken', 'pot roast', 'clam chowder', 'american']
        };

        for (let [cuisine, keywords] of Object.entries(cuisineMap)) {
            for (let keyword of keywords) {
                if (recipe.name.toLowerCase().includes(keyword) || 
                    recipe.ingredients.some(i => i.toLowerCase().includes(keyword))) {
                    return cuisine;
                }
            }
        }
        return 'international';
    }

    checkDietaryCompatibility(recipe, restriction) {
        const allIngredients = recipe.ingredients.join(' ').toLowerCase();
        
        const restrictions = {
            'vegetarian': ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'meat', 'sausage', 'bacon'],
            'vegan': ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'meat', 'egg', 'milk', 'cheese', 'butter', 'cream', 'yogurt', 'honey'],
            'gluten-free': ['flour', 'wheat', 'barley', 'rye', 'pasta', 'noodles', 'bread', 'breading'],
            'dairy-free': ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'ricotta', 'mozzarella', 'parmesan'],
            'keto': ['sugar', 'honey', 'syrup', 'rice', 'pasta', 'noodles', 'potato', 'flour', 'bread']
        };

        if (restrictions[restriction]) {
            return !restrictions[restriction].some(item => allIngredients.includes(item));
        }
        return true;
    }

    sortByRelevance(recipes, searchTerms) {
        if (searchTerms.length === 0) return recipes;
        
        return recipes.sort((a, b) => {
            let scoreA = 0, scoreB = 0;
            
            searchTerms.forEach(term => {
                if (a.name.toLowerCase().includes(term)) scoreA += 3;
                if (b.name.toLowerCase().includes(term)) scoreB += 3;
                if (a.ingredients.some(i => i.toLowerCase().includes(term))) scoreA += 2;
                if (b.ingredients.some(i => i.toLowerCase().includes(term))) scoreB += 2;
                if (a.category.toLowerCase().includes(term)) scoreA += 1;
                if (b.category.toLowerCase().includes(term)) scoreB += 1;
            });
            
            scoreA += a.rating * 0.1;
            scoreB += b.rating * 0.1;
            
            return scoreB - scoreA;
        });
    }

    generateRecipeResponse(recipes, searchTerms) {
        if (searchTerms.length > 0) {
            return `I found ${recipes.length} recipe${recipes.length > 1 ? 's' : ''} matching your search! Here are the top picks:`;
        }
        return `Here are some delicious recipes you might enjoy:`;
    }

    generateSuggestions(intent) {
        const baseMenuOption = { text: '🏠 Main Menu', action: 'main menu', icon: 'fa-home' };
        
        const suggestionMap = {
            'recipe_search': [
                { text: 'Filter by time', action: 'quick meals', icon: 'fa-clock' },
                { text: 'Popular', action: 'popular', icon: 'fa-fire' },
                { text: 'Save recipe', action: 'save recipe', icon: 'fa-bookmark' },
                baseMenuOption
            ],
            'cooking_help': [
                { text: 'Main Dish Tips', action: 'main dish tips', icon: 'fa-utensils' },
                { text: 'Dessert Tips', action: 'dessert tips', icon: 'fa-cake-candles' },
                { text: 'Chicken Tips', action: 'chicken tips', icon: 'fa-drumstick-bite' },
                { text: 'Beef Tips', action: 'beef tips', icon: 'fa-cow' },
                { text: 'Seafood Tips', action: 'seafood tips', icon: 'fa-fish' },
                { text: 'Mistakes to Avoid', action: 'mistakes to avoid', icon: 'fa-exclamation-triangle' },
                baseMenuOption
            ],
            'substitution': [
                { text: 'Egg substitutes', action: 'substitute egg', icon: 'fa-egg' },
                { text: 'Butter alternatives', action: 'substitute butter', icon: 'fa-cheese' },
                { text: 'Dairy-free', action: 'dairy free', icon: 'fa-cow' },
                baseMenuOption
            ],
            'popular': [
                { text: 'Main Dish', action: 'main dish popular', icon: 'fa-utensils' },
                { text: 'Dessert', action: 'dessert popular', icon: 'fa-cake-candles' },
                { text: 'Drinks', action: 'drinks popular', icon: 'fa-mug-saucer' },
                baseMenuOption
            ],
            'quick_meals': [
                { text: 'Under 15 min', action: 'under 15 min', icon: 'fa-clock' },
                { text: '15-30 min', action: '15-30 min', icon: 'fa-clock' },
                { text: '30-60 min', action: '30-60 min', icon: 'fa-clock' },
                { text: 'Over 60 min', action: 'over 60 min', icon: 'fa-clock' },
                baseMenuOption
            ],
            'default': [
                { text: 'Find Recipe', action: 'find recipe', icon: 'fa-search' },
                { text: 'Cooking Tips', action: 'cooking tip', icon: 'fa-lightbulb' },
                { text: 'Popular', action: 'popular', icon: 'fa-fire' },
                { text: 'Fun Fact', action: 'fun fact', icon: 'fa-star' },
                baseMenuOption
            ]
        };
        
        return suggestionMap[intent] || suggestionMap['default'];
    }

    handleSubstitution(message) {
        if (message.includes('egg')) {
            return {
                text: "🥚 **Egg Substitutes:**\n\n• 1/4 cup applesauce\n• 1 mashed banana\n• 2 tbsp flaxseed + 3 tbsp water (flax egg)\n• 1/4 cup yogurt\n• 1/4 cup silken tofu\n\nEach works best for different recipes!",
                suggestions: [
                    { text: 'Butter substitutes', action: 'substitute butter' },
                    { text: 'Milk alternatives', action: 'dairy free' },
                    { text: 'Sugar alternatives', action: 'substitute sugar' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        if (message.includes('butter')) {
            return {
                text: "🧈 **Butter Substitutes:**\n\n• Coconut oil (1:1 ratio)\n• Olive oil (3/4 cup per 1 cup butter)\n• Avocado (1/2 cup per 1 cup butter)\n• Applesauce (1/2 cup per 1 cup butter)\n• Margarine (1:1 ratio)",
                suggestions: [
                    { text: 'Egg substitutes', action: 'substitute egg' },
                    { text: 'Milk alternatives', action: 'dairy free' },
                    { text: 'Sugar alternatives', action: 'substitute sugar' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        
        return {
            text: "🔄 **Common Ingredient Substitutions:**\n\n• Eggs 🥚 - applesauce, banana, flax eggs\n• Butter 🧈 - coconut oil, olive oil\n• Milk 🥛 - almond, oat, soy milk\n• Flour 🌾 - almond, oat, gluten-free blends\n• Sugar 🍚 - honey, maple syrup, stevia\n\nTell me what ingredient you need to substitute!",
            suggestions: [
                { text: 'Egg substitutes', action: 'substitute egg' },
                { text: 'Butter alternatives', action: 'substitute butter' },
                { text: 'Dairy-free', action: 'dairy free' },
                { text: 'Sugar alternatives', action: 'substitute sugar' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    handleDietaryAdvice(message) {
        if (message.includes('vegetarian')) {
            return {
                text: "🌱 **Vegetarian Cooking Tips:**\n\n• Protein sources: legumes, tofu, tempeh, eggs, dairy\n• Umami boosters: mushrooms, soy sauce, nutritional yeast\n• Iron-rich: spinach, lentils, quinoa\n• Try meat alternatives like jackfruit or seitan",
                suggestions: [
                    { text: 'Vegan options', action: 'vegan' },
                    { text: 'Gluten-free', action: 'gluten-free' },
                    { text: 'Vegetarian recipes', action: 'vegetarian recipes' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        if (message.includes('vegan')) {
            return {
                text: "🌿 **Vegan Cooking Tips:**\n\n• Protein: tofu, tempeh, seitan, legumes\n• Dairy alternatives: nut milks, coconut cream, vegan butter\n• Egg replacements: flax eggs, applesauce, silken tofu\n• Calcium: fortified plant milks, leafy greens, tahini",
                suggestions: [
                    { text: 'Vegetarian', action: 'vegetarian' },
                    { text: 'Gluten-free', action: 'gluten-free' },
                    { text: 'Vegan recipes', action: 'vegan recipes' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        
        return {
            text: "🥗 **Dietary Advice Available For:**\n\n• Vegetarian 🌱\n• Vegan 🌿\n• Gluten-free 🌾\n• Dairy-free 🥛\n• Keto 🥑\n• Low-carb 📉\n\nWhat dietary preference would you like to learn about?",
            suggestions: [
                { text: 'Vegetarian', action: 'vegetarian' },
                { text: 'Vegan', action: 'vegan' },
                { text: 'Gluten-free', action: 'gluten-free' },
                { text: 'Keto', action: 'keto' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    handleTechniqueExplanation(message) {
        if (message.includes('sous vide')) {
            return {
                text: "🌊 **Sous Vide:**\n\nCooking food in a temperature-controlled water bath. Perfect for precise results!\n\n• Seal food in vacuum bag\n• Set water bath to exact desired temp\n• Cook longer (1-4 hours usually)\n• Finish with quick sear for texture\n\nBenefits: Perfect doneness every time, very tender results, hard to overcook!",
                suggestions: [
                    { text: 'Braising', action: 'explain braising' },
                    { text: 'Roasting', action: 'explain roasting' },
                    { text: 'Grilling', action: 'grilling tips' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        if (message.includes('braising')) {
            return {
                text: "🥩 **Braising:**\n\nA combination cooking method using both dry and wet heat.\n\n1. Sear meat until browned\n2. Add liquid (stock, wine, etc.)\n3. Cover and cook low and slow\n4. Meat becomes fork-tender\n\nPerfect for tough cuts like chuck, short ribs, and lamb shanks!",
                suggestions: [
                    { text: 'Sous Vide', action: 'explain sous vide' },
                    { text: 'Roasting', action: 'explain roasting' },
                    { text: 'Stewing', action: 'explain stewing' },
                    { text: 'Main Menu', action: 'main menu' }
                ]
            };
        }
        
        return {
            text: "🔪 **Cooking Techniques I Can Explain:**\n\n• Sous Vide - precision water bath cooking\n• Braising - slow-cooked in liquid\n• Roasting - dry heat in oven\n• Grilling - direct high heat\n• Poaching - gentle simmering\n• Blanching - quick boil then ice bath\n• Fermenting - beneficial bacteria growth\n\nWhich technique interests you?",
            suggestions: [
                { text: 'Sous Vide', action: 'explain sous vide' },
                { text: 'Braising', action: 'explain braising' },
                { text: 'Roasting', action: 'explain roasting' },
                { text: 'Grilling', action: 'grilling tips' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }

    handleUnknown(message) {
        // Check if it might be a simple question about a specific recipe
        if (message.includes('how to make')) {
            const recipeName = message.replace('how to make', '').trim();
            const matchingRecipe = recipes.find(r => 
                r.name.toLowerCase().includes(recipeName) ||
                recipeName.includes(r.name.toLowerCase())
            );
            
            if (matchingRecipe) {
                return {
                    text: `I found a recipe for ${matchingRecipe.name}! Would you like to see it?`,
                    recipeCards: [{
                        id: matchingRecipe.id,
                        name: matchingRecipe.name,
                        image: matchingRecipe.img,
                        rating: matchingRecipe.rating,
                        time: matchingRecipe.prepTime + matchingRecipe.cookTime,
                        calories: matchingRecipe.calories
                    }],
                    suggestions: [
                        { text: 'View Recipe', action: `view ${matchingRecipe.id}` },
                        { text: 'Save Recipe', action: 'save recipe' },
                        { text: 'Find Similar', action: 'find similar' },
                        { text: 'Main Menu', action: 'main menu' }
                    ]
                };
            }
        }
        
        return {
            text: "I'm not sure how to help with that. Try asking about recipes, cooking tips, or say 'help' to see what I can do!",
            suggestions: [
                { text: 'Find Recipe', action: 'find recipe' },
                { text: 'Cooking Tip', action: 'cooking tip' },
                { text: 'Help', action: 'help' },
                { text: 'Fun Fact', action: 'fun fact' },
                { text: 'Main Menu', action: 'main menu' }
            ]
        };
    }
}

// Initialize the smart chatbot
const smartChatbot = new SmartChatbotAssistant();

// ============================================
// SECTION 5: CHATBOT UI FUNCTIONS
// Handles message display, typing indicators, and UI interactions
// ============================================

// Start a new chat session
function startChatSession() {
    if (!currentUser) {
        showToast('Please login to use the chatbot!', 'error');
        showLoginPage();
        return;
    }
    
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    chatbotMessages.innerHTML = '';
    
    const response = smartChatbot.startSession(currentUser.name);
    
    addChatbotMessage(response.text, 'bot');
    
    updateSuggestedActions(response.suggestions);
    
    chatbotWindow.hasInitialized = true;
    
    showToast('New chat session started!', 'success');
}

// Send message from user
async function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message || !currentUser) {
        if (!currentUser) {
            showToast('Please login to use the chatbot!', 'error');
            showLoginPage();
        }
        return;
    }
    
    addChatbotMessage(message, 'user');
    input.value = '';
    
    showChatbotTyping();
    
    const sendButton = document.getElementById('sendButton');
    input.disabled = true;
    sendButton.disabled = true;
    
    try {
        let response;

        try {
            response = await smartChatbot.processMessage(message, currentUser);
        } catch (err) {
            console.error("Smart chatbot failed:", err);
            response = {
                text: "⚠️ The AI assistant crashed. Please try again."
            };
        }

        removeChatbotTyping();
        addChatbotMessage(response.text || "⚠️ No response returned.", "bot");
        
        if (response.recipeCards && response.recipeCards.length > 0) {
            addRecipeCards(response.recipeCards);
        }
        
        updateSuggestedActions(response.suggestions || []);   
    } finally {
        input.disabled = false;
        sendButton.disabled = false;
        input.focus();
    }
}

// Add recipe cards to chat
function addRecipeCards(recipes) {
    const messagesDiv = document.getElementById('chatbotMessages');
    
    const cardsContainer = document.createElement('div');
    cardsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 10px 0 15px 45px;
    `;
    
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-suggestion';
        card.onclick = () => {
            closeChatbot();
            viewRecipe(recipe.id);
        };
        
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-suggestion-info">
                <h5>${recipe.name}</h5>
                <p>
                    <span><i class="fas fa-star" style="color: #ffc107;"></i> ${recipe.rating}</span>
                    <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                </p>
            </div>
        `;
        
        cardsContainer.appendChild(card);
    });
    
    messagesDiv.appendChild(cardsContainer);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Update suggested action chips
function updateSuggestedActions(actions) {
    const container = document.getElementById('suggestedActions');
    if (!container) return;
    container.innerHTML = '';
    
    actions.forEach(action => {
        const chip = document.createElement('div');
        chip.className = 'action-chip';
        chip.onclick = () => quickQuestion(action.action);
        chip.innerHTML = `
            <i class="fas ${action.icon || 'fa-arrow-right'}"></i>
            <span>${action.text}</span>
        `;
        container.appendChild(chip);
    });
}

// Quick question function for action chips
window.quickQuestion = function(query) {
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.value = query;
        sendChatbotMessage();
    }
};

// Add chat message to window
function addChatbotMessage(message, sender) {
    const messagesDiv = document.getElementById('chatbotMessages');
    if (!messagesDiv) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                ${message.replace(/\n/g, '<br>')}
            </div>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Show typing indicator
function showChatbotTyping() {
    const messagesDiv = document.getElementById('chatbotMessages');
    if (!messagesDiv) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Remove typing indicator
function removeChatbotTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Toggle chatbot window open/close
function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    const notification = document.getElementById('chatNotification');
    
    if (!window || !toggle) return;
    
    if (window.style.display === 'flex') {
        window.style.display = 'none';
        toggle.innerHTML = '<i class="fas fa-robot"></i>';
        if (notification) notification.style.display = 'none';
    } else {
        if (!currentUser) {
            showToast('Please login to use the chatbot!', 'error');
            showLoginPage();
            return;
        }
        window.style.display = 'flex';
        toggle.innerHTML = '<i class="fas fa-times"></i>';
        
        if (!window.hasInitialized) {
            setTimeout(() => {
                const response = smartChatbot.startSession(currentUser?.name || 'Chef');
                addChatbotMessage(response.text, 'bot');
                updateSuggestedActions(response.suggestions);
            }, 500);
            window.hasInitialized = true;
        }
    }
}

// Minimize chatbot
function minimizeChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (!window || !toggle) return;
    window.style.display = 'none';
    toggle.innerHTML = '<i class="fas fa-robot"></i>';
}

// Close chatbot
function closeChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (!window || !toggle) return;
    window.style.display = 'none';
    toggle.innerHTML = '<i class="fas fa-robot"></i>';
}

// Create chatbot widget HTML
function createChatbotWidget() {
    if (document.getElementById('chatbotWidget')) return;
    
    const chatbotHTML = `
    <div id="chatbotWidget">
        <div class="chatbot-toggle" id="chatbotToggle" onclick="toggleChatbot()">
            <i class="fas fa-robot"></i>
            <span class="notification-badge" id="chatNotification">1</span>
        </div>
        
        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header" onclick="toggleChatbot()">
                <div class="chatbot-header-left">
                    <div class="chatbot-avatar">
                        <i class="fas fa-robot"></i>
                        <span class="online-indicator"></span>
                    </div>
                    <div class="chatbot-title">
                        <h4>AI Cooking Assistant</h4>
                        <p>Online • Ask me anything!</p>
                    </div>
                </div>
                <div class="chatbot-header-actions">
                    <button onclick="minimizeChatbot(); event.stopPropagation();">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button onclick="closeChatbot(); event.stopPropagation();">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="chatbot-messages" id="chatbotMessages"></div>
        
            <div class="suggested-actions" id="suggestedActions">
                <div class="action-chip" onclick="quickQuestion('find recipe')">
                    <i class="fas fa-search"></i> Find Recipe
                </div>
                <div class="action-chip" onclick="quickQuestion('cooking tip')">
                    <i class="fas fa-lightbulb"></i> Cooking Tip
                </div>
                <div class="action-chip" onclick="quickQuestion('popular')">
                    <i class="fas fa-fire"></i> Popular
                </div>
                <div class="action-chip" onclick="quickQuestion('fun fact')">
                    <i class="fas fa-star"></i> Fun Fact
                </div>
                <div class="action-chip" onclick="quickQuestion('main menu')">
                    <i class="fas fa-home"></i> Main Menu
                </div>
            </div>
            
            <div class="chatbot-input-area">
                <input type="text" id="chatbotInput" placeholder="Ask me anything about cooking..." onkeypress="if(event.key==='Enter') sendChatbotMessage()">
                <button onclick="sendChatbotMessage()" id="sendButton">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// Initialize chatbot on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createChatbotWidget, 500);
});

// Open chatbot from services page
function openChatBot() {
    if (!currentUser) {
        showToast('Please login to use the chatbot!', 'error');
        showLoginPage();
        return;
    }
    
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotToggle = document.getElementById('chatbotToggle');
    
    if (chatbotWindow && chatbotToggle) {
        chatbotWindow.style.display = 'flex';
        chatbotToggle.innerHTML = '<i class="fas fa-times"></i>';
        
        if (!chatbotWindow.hasInitialized) {
            setTimeout(() => {
                const response = smartChatbot.startSession(currentUser?.name || 'Chef');
                addChatbotMessage(response.text, 'bot');
                updateSuggestedActions(response.suggestions);
            }, 500);
            chatbotWindow.hasInitialized = true;
        }
        
        const notification = document.getElementById('chatNotification');
        if (notification) notification.style.display = 'none';
    }
}

// ============================================
// SECTION 6: EMAIL SUPPORT
// Handles email support modal and functionality
// ============================================

function openEmailSupport() {
    if (!currentUser) {
        showToast('Please login to use email support!', 'error');
        showLoginPage();
        return;
    }
    
    const emailModal = document.createElement('div');
    emailModal.id = 'emailModal';
    emailModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.8);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    emailModal.innerHTML = `
        <div style="background: white; width: 90%; max-width: 500px; border-radius: 30px; overflow: hidden; animation: modalSlide 0.4s;">
            <div style="background: linear-gradient(135deg, var(--primary), var(--primary-light)); padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-envelope" style="font-size: 1.5em;"></i>
                    <h3 style="margin: 0;">Email Support</h3>
                </div>
                <button onclick="closeEmailModal()" style="background: none; border: none; color: white; font-size: 1.5em; cursor: pointer;">&times;</button>
            </div>
            <div style="padding: 30px;">
                <form onsubmit="sendEmailSupport(event)">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Subject</label>
                        <select id="emailSubject" required style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 15px;">
                            <option value="general">General Inquiry</option>
                            <option value="recipe">Recipe Question</option>
                            <option value="account">Account Issue</option>
                            <option value="submission">Recipe Submission</option>
                            <option value="bug">Report a Bug</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Your Email</label>
                        <input type="email" id="supportEmail" value="${currentUser.email}" readonly style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 15px; background: var(--light);">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Message</label>
                        <textarea id="emailMessage" rows="6" required placeholder="Describe your issue or question in detail..." style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 15px;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input type="checkbox" id="sendCopy" checked>
                            <span style="color: var(--gray);">Send a copy to my email</span>
                        </label>
                    </div>
                    
                    <button type="submit" style="width: 100%; padding: 15px; background: var(--primary); color: white; border: none; border-radius: 15px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                </form>
                
                <div style="margin-top: 20px; padding: 15px; background: var(--light); border-radius: 15px; border-left: 4px solid var(--primary);">
                    <p style="color: var(--gray); margin: 0; font-size: 0.9em;">
                        <i class="fas fa-clock"></i> Response time: 24-48 hours
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(emailModal);
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) modal.remove();
}

function sendEmailSupport(event) {
    event.preventDefault();
    
    const subject = document.getElementById('emailSubject');
    const subjectText = subject.options[subject.selectedIndex].text;
    const message = document.getElementById('emailMessage').value;
    const sendCopy = document.getElementById('sendCopy').checked;
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const emailContent = {
            to: 'support@foodrecipe101.com',
            from: currentUser.email,
            subject: subjectText,
            message: message,
            sendCopy: sendCopy
        };
        
        console.log('Email sent:', emailContent);
        
        const modal = document.getElementById('emailModal');
        modal.innerHTML = `
            <div style="background: white; width: 90%; max-width: 400px; border-radius: 30px; overflow: hidden; animation: modalSlide 0.4s; text-align: center; padding: 40px;">
                <div style="font-size: 4em; color: var(--success); margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="margin-bottom: 15px;">Message Sent!</h3>
                <p style="color: var(--gray); margin-bottom: 25px;">
                    Thank you for contacting us. Our support team will respond within 24-48 hours.
                </p>
                <button onclick="closeEmailModal()" style="padding: 12px 30px; background: var(--primary); color: white; border: none; border-radius: 30px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;
        
        addActivity('Sent support email: ' + subjectText, 'fa-envelope');
        
        showToast('Email sent successfully!', 'success');
    }, 1500);
}

// ============================================
// SECTION 7: RECIPE SUBMISSION
// Handles recipe submission form
// ============================================

let isFormMinimized = false;

function toggleMinimizeForm() {
    const formContent = document.getElementById('submitFormContent');
    const minimizeIcon = document.getElementById('minimizeIcon');
    
    if (isFormMinimized) {
        formContent.style.display = 'block';
        minimizeIcon.className = 'fas fa-minus';
        isFormMinimized = false;
    } else {
        formContent.style.display = 'none';
        minimizeIcon.className = 'fas fa-plus';
        isFormMinimized = true;
    }
}

function showSubmitRecipeForm() {
    if (!currentUser) {
        showToast('Please login to submit a recipe!', 'error');
        showLoginPage();
        return;
    }
    const formContainer = document.getElementById('submitRecipeFormContainer');
    formContainer.style.display = 'block';
    
    const formContent = document.getElementById('submitFormContent');
    const minimizeIcon = document.getElementById('minimizeIcon');
    formContent.style.display = 'block';
    minimizeIcon.className = 'fas fa-minus';
    isFormMinimized = false;
    
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

function hideSubmitForm() {
    document.getElementById('submitRecipeFormContainer').style.display = 'none';
    const formContent = document.getElementById('submitFormContent');
    const minimizeIcon = document.getElementById('minimizeIcon');
    formContent.style.display = 'block';
    minimizeIcon.className = 'fas fa-minus';
    isFormMinimized = false;
}

function handleRecipeSubmission(event) {
    event.preventDefault();
    
    const newRecipe = {
        id: recipes.length + 1,
        name: document.getElementById('recipeName').value,
        category: document.getElementById('recipeCategory').value,
        rating: 0,
        reviewCount: 0,
        img: document.getElementById('recipeImage').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(i => i.trim()),
        instructions: document.getElementById('recipeInstructions').value.split('\n').filter(i => i.trim()),
        prepTime: parseInt(document.getElementById('prepTime').value) || 15,
        cookTime: parseInt(document.getElementById('cookTime').value) || 30,
        servings: parseInt(document.getElementById('servings').value) || 4,
        calories: parseInt(document.getElementById('calories').value) || 350,
        youtube: document.getElementById('youtubeLink').value || '',
        comments: [],
        submittedBy: currentUser.name,
        status: 'pending'
    };
    
    if (!window.pendingRecipes) window.pendingRecipes = [];
    window.pendingRecipes.push(newRecipe);
    
    showToast('Recipe submitted successfully! Our team will review it.', 'success');
    document.getElementById('submitRecipeForm').reset();
    hideSubmitForm();
    addActivity('Submitted recipe: ' + newRecipe.name, 'fa-upload');
}

// ============================================
// SECTION 8: FAQ & QUESTIONS
// Handles user questions and support replies
// ============================================

function submitFAQQuestion(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to ask a question!', 'error');
        showLoginPage();
        return;
    }
    
    const name = document.getElementById('faqName').value;
    const email = document.getElementById('faqEmail').value;
    const question = document.getElementById('faqQuestion').value;
    
    const newQuestion = {
        id: Date.now(),
        name: name,
        email: email,
        question: question,
        date: new Date().toLocaleString(),
        user: currentUser.name,
        status: 'pending',
        replies: []
    };
    
    if (!window.askedQuestions) window.askedQuestions = [];
    window.askedQuestions.push(newQuestion);
    
    sessionStorage.setItem('askedQuestions', JSON.stringify(window.askedQuestions));
    
    const faqForm = document.getElementById('faqForm');
    faqForm.innerHTML = `
        <div style="text-align: center; padding: 30px; background: var(--success); color: white; border-radius: 15px;">
            <i class="fas fa-check-circle" style="font-size: 3em;"></i>
            <h3>Question Submitted!</h3>
            <p>Thank you! Our team will answer within 24-48 hours.</p>
            <button onclick="resetFAQForm()" style="margin-top: 20px; padding: 10px 25px; background: white; color: var(--success); border: none; border-radius: 30px; cursor: pointer;">Ask Another</button>
        </div>
    `;
    
    displayQuestions();
    
    showToast('Question submitted!', 'success');
    addActivity('Asked: ' + question.substring(0, 50) + '...', 'fa-question');
}

function resetFAQForm() {
    const faqForm = document.getElementById('faqForm');
    faqForm.innerHTML = `
        <div style="display: grid; gap: 15px; grid-template-columns: 1fr 1fr;">
            <input type="text" id="faqName" placeholder="Your Name" required style="width: 100%; padding: 15px; border: none; border-radius: 15px;">
            <input type="email" id="faqEmail" placeholder="Your Email" required style="width: 100%; padding: 15px; border: none; border-radius: 15px;">
        </div>
        <textarea id="faqQuestion" rows="4" placeholder="Type your question..." required style="width: 100%; padding: 15px; border: none; border-radius: 15px; margin: 15px 0;"></textarea>
        <button type="submit" style="padding: 15px 30px; background: white; color: var(--primary); border: none; border-radius: 15px; font-weight: 600; cursor: pointer;">Submit Question</button>
    `;
}

function displayQuestions() {
    const container = document.getElementById('questionsContainer');
    const noQuestionsMsg = document.getElementById('noQuestionsMessage');
    
    if (!container) return;
    
    const savedQuestions = sessionStorage.getItem('askedQuestions');
    if (savedQuestions) {
        window.askedQuestions = JSON.parse(savedQuestions);
    }
    
    if (!window.askedQuestions || window.askedQuestions.length === 0) {
        container.innerHTML = '';
        noQuestionsMsg.style.display = 'block';
        return;
    }
    
    noQuestionsMsg.style.display = 'none';
    container.innerHTML = '';
    
    const sortedQuestions = [...window.askedQuestions].reverse();
    
    sortedQuestions.forEach(q => {
        const questionCard = document.createElement('div');
        questionCard.style.background = 'var(--light)';
        questionCard.style.borderRadius = '20px';
        questionCard.style.padding = '25px';
        questionCard.style.marginBottom = '20px';
        questionCard.style.border = '2px solid var(--border)';
        
        let html = `
            <div style="display: flex; gap: 15px; margin-bottom: ${q.replies && q.replies.length > 0 ? '20px' : '0'};">
                <div style="width: 50px; height: 50px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2em;">
                    ${q.user ? q.user[0].toUpperCase() : 'U'}
                </div>
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="color: var(--dark);">${q.user || 'Anonymous'}</strong>
                        <span style="color: var(--gray); font-size: 0.85em;">${q.date}</span>
                    </div>
                    <p style="color: var(--dark); margin-bottom: 10px;">${q.question}</p>
                    <span style="background: ${q.status === 'answered' ? 'var(--success)' : 'var(--primary)'}; color: white; padding: 3px 12px; border-radius: 20px; font-size: 0.8em;">
                        ${q.status === 'answered' ? '✓ Answered' : '⏳ Pending'}
                    </span>
                </div>
            </div>
        `;
        
        if (q.replies && q.replies.length > 0) {
            html += `<div style="margin-left: 65px; margin-top: 15px;">`;
            q.replies.forEach(reply => {
                html += `
                    <div style="background: white; border-radius: 15px; padding: 15px; margin-bottom: 10px; border-left: 4px solid var(--primary);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <strong style="color: var(--primary);"><i class="fas fa-headset"></i> Support Team</strong>
                            <span style="color: var(--gray); font-size: 0.8em;">${reply.date}</span>
                        </div>
                        <p style="color: var(--dark);">${reply.message}</p>
                    </div>
                `;
            });
            html += `</div>`;
        }
        
        questionCard.innerHTML = html;
        container.appendChild(questionCard);
    });
}

function showReplyForm(questionId) {
    document.getElementById(`replyForm-${questionId}`).style.display = 'block';
}

function hideReplyForm(questionId) {
    document.getElementById(`replyForm-${questionId}`).style.display = 'none';
}

function submitReply(questionId) {
    const replyInput = document.getElementById(`replyInput-${questionId}`);
    const reply = replyInput.value.trim();
    
    if (!reply) {
        showToast('Please type a reply!', 'error');
        return;
    }
    
    const question = window.askedQuestions.find(q => q.id === questionId);
    if (question) {
        if (!question.replies) question.replies = [];
        question.replies.push({
            message: reply,
            date: new Date().toLocaleString(),
            supportName: 'Support Team'
        });
        question.status = 'answered';
        
        sessionStorage.setItem('askedQuestions', JSON.stringify(window.askedQuestions));
        
        displayQuestions();
        hideReplyForm(questionId);
        showToast('Reply sent!', 'success');
    }
}

window.addEventListener('load', function() {
    const savedQuestions = sessionStorage.getItem('askedQuestions');
    if (savedQuestions) {
        window.askedQuestions = JSON.parse(savedQuestions);
    }
});

// ============================================
// SECTION 9: SEARCH FUNCTIONALITY
// Handles recipe search across home and menu views
// ============================================

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    const homeView = document.getElementById('homeView');
    const menuView = document.getElementById('menuView');
    
    let currentView = null;
    if (homeView.style.display === 'block' || homeView.style.display === '') {
        currentView = 'home';
    } else if (menuView.style.display === 'block') {
        currentView = 'menu';
    }
    
    if (!currentView) return;
    
    if (query.length === 0) {
        if (currentView === 'home') {
            document.getElementById('searchHeader').style.display = 'none';
            displayRecipes(recipes);
        } else {
            document.getElementById('menuSearchHeader').style.display = 'none';
            renderMenu();
        }
        document.getElementById('searchBadge').style.display = 'none';
        return;
    }
    
    const filtered = recipes.filter(r => 
        r.name.toLowerCase().includes(query) || 
        r.ingredients.some(i => i.toLowerCase().includes(query)) ||
        r.category.toLowerCase().includes(query)
    );
    
    const badge = document.getElementById('searchBadge');
    badge.textContent = filtered.length;
    badge.style.display = filtered.length > 0 ? 'block' : 'none';
    
    if (currentView === 'home') {
        const header = document.getElementById('searchHeader');
        if (filtered.length > 0) {
            header.innerHTML = `
                <div class="search-header">
                    <h3><i class="fas fa-search"></i> Search Results for "${query}"</h3>
                    <span>${filtered.length} recipe${filtered.length > 1 ? 's' : ''} found</span>
                    <button class="clear-search" onclick="clearSearch()">Clear Search</button>
                </div>
            `;
            header.style.display = 'block';
            displayRecipes(filtered);
        } else {
            header.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No recipes found for "${query}"</h3>
                    <p>Try searching with different keywords or browse all recipes</p>
                    <button onclick="clearSearch()" style="margin-top: 20px; padding: 12px 30px; background: var(--primary); color: white; border: none; border-radius: 30px; cursor: pointer;">View All Recipes</button>
                </div>
            `;
            header.style.display = 'block';
            document.getElementById('recipeGrid').innerHTML = '';
        }
    } else {
        const header = document.getElementById('menuSearchHeader');
        if (filtered.length > 0) {
            header.innerHTML = `
                <div class="search-header">
                    <h3><i class="fas fa-search"></i> Search Results for "${query}"</h3>
                    <span>${filtered.length} recipe${filtered.length > 1 ? 's' : ''} found</span>
                    <button class="clear-search" onclick="clearSearch()">Clear Search</button>
                </div>
            `;
            header.style.display = 'block';
            renderFilteredMenu(filtered);
        } else {
            header.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No recipes found for "${query}"</h3>
                    <p>Try searching with different keywords</p>
                    <button onclick="clearSearch()" style="margin-top: 20px; padding: 12px 30px; background: var(--primary); color: white; border: none; border-radius: 30px; cursor: pointer;">Clear Search</button>
                </div>
            `;
            header.style.display = 'block';
            document.getElementById('menuContent').innerHTML = '';
        }
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBadge').style.display = 'none';
    
    const homeView = document.getElementById('homeView');
    const menuView = document.getElementById('menuView');
    
    if (homeView.style.display === 'block' || homeView.style.display === '') {
        document.getElementById('searchHeader').style.display = 'none';
        displayRecipes(recipes);
    } else if (menuView.style.display === 'block') {
        document.getElementById('menuSearchHeader').style.display = 'none';
        renderMenu();
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.removeEventListener('keyup', handleSearch);
        searchInput.addEventListener('keyup', handleSearch);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    checkRememberedUser();
    displayRecipes(recipes);
});

window.addEventListener('load', function() {
    initializeSearch();
});

// ============================================
// SECTION 10: PROFILE FUNCTIONS
// Manages user profile display and editing
// ============================================

function updateProfileDisplay() {
    if (!currentUser) return;
    
    document.getElementById('profileDisplayName').textContent = userProfile.name || currentUser.name;
    document.getElementById('profileEmail').textContent = userProfile.email || currentUser.email;
    document.getElementById('profileJoinDate').textContent = userProfile.joinDate || 2026;
    
    document.getElementById('displayNameValue').textContent = userProfile.name || currentUser.name;
    document.getElementById('displayEmailValue').textContent = userProfile.email || currentUser.email;
    document.getElementById('displayBioValue').textContent = userProfile.bio || 'Food lover and home cook';
    document.getElementById('displayLocationValue').textContent = userProfile.location || 'Philippines';
    
    document.getElementById('profileSavedCount').textContent = savedRecipes.length;
    
    const savedGrid = document.getElementById('savedRecipesGrid');
    savedGrid.innerHTML = '';
    
    if (savedRecipes.length === 0) {
        document.getElementById('noSavedMessage').style.display = 'block';
    } else {
        document.getElementById('noSavedMessage').style.display = 'none';
        
        savedRecipes.forEach(recipeId => {
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                const card = document.createElement('div');
                card.className = 'saved-recipe-card';
                card.setAttribute('onclick', 'viewRecipe(' + recipe.id + ')');
                card.innerHTML = `
                    <img src="${recipe.img}" alt="${recipe.name}">
                    <div class="saved-recipe-info">
                        <h4>${recipe.name}</h4>
                        <p><i class="fas fa-star" style="color: #ffc107;"></i> ${recipe.rating}</p>
                    </div>
                    <div class="remove-saved" onclick="removeSavedRecipe(${recipe.id}); event.stopPropagation();">
                        <i class="fas fa-trash"></i>
                    </div>
                `;
                savedGrid.appendChild(card);
            }
        });
    }
    
    updateReviewsDisplay();
    updateActivityDisplay();
}

function editField(field) {
    const row = document.getElementById(field + 'Row');
    const valueSpan = document.getElementById('display' + field.charAt(0).toUpperCase() + field.slice(1) + 'Value');
    const currentValue = valueSpan.textContent;
    
    let inputHtml = '';
    if (field === 'bio') {
        inputHtml = `<textarea class="edit-input" id="editFieldInput" rows="3">${currentValue}</textarea>`;
    } else {
        inputHtml = `<input type="text" class="edit-input" id="editFieldInput" value="${currentValue}">`;
    }
    
    row.innerHTML = `
        <span class="info-label">${field.charAt(0).toUpperCase() + field.slice(1)}:</span>
        <div style="flex: 1;">
            ${inputHtml}
        </div>
        <div>
            <button class="save-edit-btn" onclick="saveField('${field}')"><i class="fas fa-check"></i> Save</button>
            <button class="cancel-edit-btn" onclick="cancelEdit('${field}')"><i class="fas fa-times"></i> Cancel</button>
        </div>
    `;
}

function saveField(field) {
    const input = document.getElementById('editFieldInput');
    if (!input) return;
    
    const newValue = input.value.trim();
    
    if (newValue) {
        userProfile[field] = newValue;
        
        if (field === 'name') {
            document.getElementById('profileDisplayName').textContent = newValue;
            document.getElementById('displayNameValue').textContent = newValue;
            
            const navBtn = document.getElementById('navLoginBtn');
            navBtn.innerHTML = '<i class="fas fa-user"></i> ' + newValue.split(' ')[0];
            
            if (currentUser) currentUser.name = newValue;
        } 
        else if (field === 'email') {
            document.getElementById('profileEmail').textContent = newValue;
            document.getElementById('displayEmailValue').textContent = newValue;
            
            if (currentUser) currentUser.email = newValue;
        } 
        else if (field === 'bio') {
            document.getElementById('displayBioValue').textContent = newValue;
        } 
        else if (field === 'location') {
            document.getElementById('displayLocationValue').textContent = newValue;
        }
        
        saveUserToStorage();
        
        restoreFieldRow(field, newValue);
        
        showToast(field.charAt(0).toUpperCase() + field.slice(1) + ' updated!', 'success');
    }
}

function cancelEdit(field) {
    let currentValue;
    if (field === 'name') currentValue = userProfile.name || (currentUser ? currentUser.name : '');
    else if (field === 'email') currentValue = userProfile.email || (currentUser ? currentUser.email : '');
    else if (field === 'bio') currentValue = userProfile.bio || 'Food lover and home cook';
    else if (field === 'location') currentValue = userProfile.location || 'Philippines';
    
    restoreFieldRow(field, currentValue);
}

function restoreFieldRow(field, value) {
    const row = document.getElementById(field + 'Row');
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    
    row.innerHTML = `
        <span class="info-label">${label}:</span>
        <span class="info-value" id="display${label}Value">${value}</span>
        <button class="edit-btn" onclick="editField('${field}')"><i class="fas fa-pen"></i> Edit</button>
    `;
}

function editAvatar() {
    showToast('Avatar feature coming soon!', 'info');
}

function addActivity(action, icon) {
    userActivity.push({
        action: action,
        icon: icon,
        time: new Date().toLocaleString()
    });
    saveUserToStorage();
}

function updateReviewsDisplay() {
    const container = document.getElementById('userReviewsContainer');
    if (!container) return;
    
    if (userReviews.length === 0) {
        document.getElementById('noReviewsMessage').style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    document.getElementById('noReviewsMessage').style.display = 'none';
    container.innerHTML = '';
    
    const userComments = [];
    recipes.forEach(recipe => {
        if (recipe.comments) {
            recipe.comments.forEach(comment => {
                if (comment.user === currentUser.name) {
                    userComments.push({
                        recipe: recipe,
                        comment: comment
                    });
                }
            });
        }
    });
    
    userComments.forEach(item => {
        const reviewEl = document.createElement('div');
        reviewEl.className = 'comment-item';
        reviewEl.innerHTML = `
            <div class="comment-avatar">${item.recipe.name[0]}</div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-name">${item.recipe.name}</span>
                    <span class="comment-date">${item.comment.date}</span>
                </div>
                <div class="comment-rating">${'★'.repeat(item.comment.rating)}${'☆'.repeat(5-item.comment.rating)}</div>
                <div class="comment-text">${item.comment.text}</div>
                <button onclick="viewRecipe(${item.recipe.id})" style="margin-top: 10px; padding: 5px 15px; background: var(--primary); color: white; border: none; border-radius: 20px; cursor: pointer;">View Recipe</button>
            </div>
        `;
        container.appendChild(reviewEl);
    });
}

function updateActivityDisplay() {
    const container = document.getElementById('activityContainer');
    if (!container) return;
    
    if (userActivity.length === 0) {
        document.getElementById('noActivityMessage').style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    document.getElementById('noActivityMessage').style.display = 'none';
    container.innerHTML = '';
    
    userActivity.slice().reverse().forEach(activity => {
        const activityEl = document.createElement('div');
        activityEl.className = 'step-item';
        activityEl.style.marginBottom = '10px';
        activityEl.innerHTML = `
            <div style="background: var(--primary); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div style="flex: 1;">
                <strong>${activity.action}</strong>
                <p style="color: var(--gray); font-size: 0.9em;">${activity.time}</p>
            </div>
        `;
        container.appendChild(activityEl);
    });
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'saved') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('savedTab').classList.add('active');
    } else if (tab === 'reviews') {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('reviewsTab').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[2].classList.add('active');
        document.getElementById('activityTab').classList.add('active');
    }
}

// ============================================
// SECTION 11: AUTHENTICATION
// Handles sign in, sign up, password reset
// ============================================

function toggleAuth(isSignUp) {
    document.getElementById('signInSection').style.display = isSignUp ? 'none' : 'block';
    document.getElementById('signUpSection').style.display = isSignUp ? 'block' : 'none';
}

function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        element.textContent = '🙈';
    } else {
        input.type = 'password';
        element.textContent = '👁️';
    }
}

function showForgotPassword() {
    document.getElementById('signInSection').style.display = 'none';
    document.getElementById('signUpSection').style.display = 'none';
    document.getElementById('forgotPasswordSection').style.display = 'block';
}

function hideForgotPassword() {
    document.getElementById('forgotPasswordSection').style.display = 'none';
    document.getElementById('signInSection').style.display = 'block';
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    
    showToast(`Password reset link sent to ${email}!`, 'success');
    
    const forgotSection = document.getElementById('forgotPasswordSection');
    forgotSection.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4em; color: var(--success); margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="margin-bottom: 15px;">Check Your Email</h3>
            <p style="color: var(--gray); margin-bottom: 25px;">We've sent password reset instructions to<br><strong>${email}</strong></p>
            <button onclick="resetForgotPassword()" style="padding: 12px 30px; background: var(--primary); color: white; border: none; border-radius: 30px; cursor: pointer;">Back to Login</button>
        </div>
    `;
}

function resetForgotPassword() {
    const forgotSection = document.getElementById('forgotPasswordSection');
    forgotSection.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 3em; color: var(--primary);"><i class="fas fa-key"></i></div>
            <h3>Reset Password</h3>
            <p style="color: var(--gray);">Enter your email to receive reset instructions</p>
        </div>
        <form onsubmit="handleForgotPassword(event)">
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email</label>
                <input type="email" id="resetEmail" placeholder="your.email@gmail.com" required style="width: 100%; padding: 15px; border: 2px solid var(--border); border-radius: 15px; font-size: 1em;">
            </div>
            <button type="submit" style="width: 100%; padding: 15px; background: var(--primary); color: white; border: none; border-radius: 15px; font-weight: 700; font-size: 1.1em; cursor: pointer; margin-bottom: 15px;">Send Reset Link</button>
            <button type="button" onclick="hideForgotPassword()" style="width: 100%; padding: 15px; background: var(--light); color: var(--gray); border: 2px solid var(--border); border-radius: 15px; font-weight: 600; cursor: pointer;">Back to Login</button>
        </form>
    `;
    
    hideForgotPassword();
}

function handleSignUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();
    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d\S]{8,20}$/;
    
    if (!passwordPattern.test(password)) {
        showToast('Password must have uppercase, lowercase, number, and special character', 'error');
        return;
    }
    
    const newUser = {
        name: name,
        email: email,
        password: password
    };
    
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    if (registeredUsers.some(user => user.email === email)) {
        showToast('Email already registered!', 'error');
        return;
    }
    
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    showToast('✓ Registration successful! Please login.', 'success');
    
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpPassword').value = '';
    
    document.getElementById('signUpSection').style.display = 'none';
    document.getElementById('signInSection').style.display = 'block';
    document.getElementById('forgotPasswordSection').style.display = 'none';
    
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    
    document.getElementById('rememberMe').checked = false;
}

function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email);
    
    if (!user) {
        showToast('No account found with this email. Please sign up first!', 'error');
        return;
    }
    
    if (user.password !== password) {
        showToast('Incorrect password!', 'error');
        return;
    }
    
    currentUser = {
        name: user.name,
        email: user.email
    };
    
    userProfile = {
        name: user.name,
        email: user.email,
        bio: 'Food lover and home cook',
        location: 'Philippines',
        joinDate: 2026
    };
    
    if (!savedRecipes) savedRecipes = [];
    if (!userReviews) userReviews = [];
    if (!userActivity) userActivity = [{
        action: 'Logged in',
        icon: 'fa-sign-in-alt',
        time: new Date().toLocaleString()
    }];
    
    const navBtn = document.getElementById('navLoginBtn');
    navBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name;
    navBtn.onclick = function() { showProfile(); };
    
    saveUserToStorage();
    
    if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({
            email: email,
            name: currentUser.name,
            password: password
        }));
        showToast('Welcome back, ' + currentUser.name + '! (Remembered)');
    } else {
        localStorage.removeItem('rememberedUser');
        showToast('Welcome back, ' + currentUser.name + '!');
    }
    
    showHome();
}

function checkRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const rememberMeCheck = document.getElementById('rememberMe');
    
    if (loginEmail && loginPassword && rememberMeCheck) {
        if (rememberedUser) {
            const user = JSON.parse(rememberedUser);
            loginEmail.value = user.email || '';
            loginPassword.value = user.password || '';
            rememberMeCheck.checked = true;
        } else {
            loginEmail.value = '';
            loginPassword.value = '';
            rememberMeCheck.checked = false;
        }
    }
}

function clearLoginForm() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const rememberMeCheck = document.getElementById('rememberMe');
    
    if (loginEmail) loginEmail.value = '';
    if (loginPassword) loginPassword.value = '';
    if (rememberMeCheck) rememberMeCheck.checked = false;
}

function showLoginPage() {
    hideAll();
    document.getElementById('loginView').style.display = 'block';
    toggleAuth(false);
    
    clearLoginForm();
    
    checkRememberedUser();
}

function logout() {
    currentUser = null;
    savedRecipes = [];
    userReviews = [];
    userActivity = [];
    userProfile = {};
    
    clearUserStorage();
    
    const navBtn = document.getElementById('navLoginBtn');
    navBtn.innerHTML = '<i class="fas fa-user"></i> Login';
    navBtn.onclick = function() { showLoginPage(); };
    
    clearLoginForm();
    
    showToast('Logged out successfully');
    showHome();
}

document.addEventListener('DOMContentLoaded', function() {
    checkRememberedUser();
});

// ============================================
// SECTION 12: RECIPE DISPLAY
// Handles recipe card display and filtering
// ============================================

function displayRecipes(recipeList) {
    const grid = document.getElementById('recipeGrid');
    grid.innerHTML = '';
    
    recipeList.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="save-btn ${savedRecipes.includes(recipe.id) ? 'saved' : ''}" onclick="saveRecipe(${recipe.id}); event.stopPropagation();">
                <i class="fas fa-heart"></i>
            </div>
            <img src="${recipe.img}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/400?text=Recipe'">
            <div class="recipe-info">
                <div class="recipe-rating">
                    <i class="fas fa-star"></i> ${recipe.rating} <span>(${recipe.reviewCount} reviews)</span>
                </div>
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime + recipe.cookTime} min</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                </div>
            </div>
        `;
        card.onclick = () => viewRecipe(recipe.id);
        grid.appendChild(card);
    });
}

function filterByCategory(category) {
    hideAll();
    document.getElementById('menuView').style.display = 'block';
    
    let filteredRecipes;
    if (category === 'all') {
        filteredRecipes = recipes;
    } else {
        filteredRecipes = recipes.filter(r => r.category === category);
    }
    
    renderFilteredMenu(filteredRecipes);
    
    updateCategoryButtons(category);
    
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBadge').style.display = 'none';
    document.getElementById('menuSearchHeader').style.display = 'none';
    
    scrollToTop();
}

function renderFilteredMenu(filteredRecipes) {
    const menuContent = document.getElementById('menuContent');
    menuContent.innerHTML = '';
    
    const categories = ['Main Dish', 'Dessert', 'Drinks'];
    
    categories.forEach(cat => {
        const catRecipes = filteredRecipes.filter(r => r.category === cat);
        if (catRecipes.length > 0) {
            let html = `<h2 class="menu-category-title">${cat}</h2><div class="menu-list">`;
            catRecipes.forEach(r => {
                html += `
                    <div class="menu-item" onclick="viewRecipe(${r.id})" style="cursor: pointer;">
                        <div class="menu-item-info">
                            <img src="${r.img}" alt="${r.name}" onerror="this.src='https://via.placeholder.com/80x80?text=Recipe'">
                            <div>
                                <h4>${r.name}</h4>
                                <p>${r.ingredients.slice(0, 3).join(', ')}...</p>
                            </div>
                        </div>
                        <button class="order-btn" onclick="viewRecipe(${r.id}); event.stopPropagation();">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                `;
            });
            html += `</div>`;
            menuContent.innerHTML += html;
        }
    });
    
    if (filteredRecipes.length === 0) {
        menuContent.innerHTML = `
            <div class="no-results">
                <i class="fas fa-utensils"></i>
                <h3>No recipes found in this category</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
    }
}

function updateCategoryButtons(activeCategory) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.trim().toLowerCase();
        if (activeCategory === 'all' && btnText.includes('all')) {
            btn.classList.add('active');
        } else if (btnText.includes(activeCategory.toLowerCase())) {
            btn.classList.add('active');
        }
    });
}

function showMenuWithCategory(category) {
    showMenu();
    setTimeout(() => {
        filterByCategory(category);
    }, 100);
}

function renderMenu() {
    const menuContent = document.getElementById('menuContent');
    menuContent.innerHTML = '';
    
    const categories = ['Main Dish', 'Dessert', 'Drinks'];
    
    categories.forEach(cat => {
        const catRecipes = recipes.filter(r => r.category === cat);
        if (catRecipes.length > 0) {
            let html = `<h2 class="menu-category-title">${cat}</h2><div class="menu-list">`;
            catRecipes.forEach(r => {
                html += `
                    <div class="menu-item" onclick="viewRecipe(${r.id})" style="cursor: pointer;">
                        <div class="menu-item-info">
                            <img src="${r.img}" alt="${r.name}">
                            <div>
                                <h4>${r.name}</h4>
                                <p>${r.ingredients.slice(0, 3).join(', ')}...</p>
                            </div>
                        </div>
                        <button class="order-btn" onclick="viewRecipe(${r.id}); event.stopPropagation();">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                `;
            });
            html += `</div>`;
            menuContent.innerHTML += html;
        }
    });
}

function saveRecipe(recipeId) {
    if (!currentUser) {
        showToast('Please login to save recipes!', 'error');
        showLoginPage();
        return false;
    }
    
    if (!savedRecipes.includes(recipeId)) {
        savedRecipes.push(recipeId);
        const recipe = recipes.find(r => r.id === recipeId);
        addActivity('Saved recipe: ' + recipe.name, 'fa-bookmark');
        showToast('Recipe saved to your profile!');
        saveUserToStorage();
        
        document.querySelectorAll('.save-btn').forEach(btn => {
            if (btn.closest('.recipe-card') && btn.closest('.recipe-card').querySelector(`[onclick*="${recipeId}"]`)) {
                btn.classList.add('saved');
            }
        });
        
        return true;
    } else {
        showToast('Recipe already saved!', 'info');
        return false;
    }
}

function removeSavedRecipe(recipeId) {
    savedRecipes = savedRecipes.filter(id => id !== recipeId);
    const recipe = recipes.find(r => r.id === recipeId);
    addActivity('Removed recipe: ' + recipe.name, 'fa-trash');
    showToast('Recipe removed from saved');
    saveUserToStorage();
    updateProfileDisplay();
}

// ============================================
// SECTION 13: RECIPE MODAL
// Displays full recipe details with comments
// ============================================

function viewRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    const modal = document.getElementById('recipeModal');
    
    const ingredientsHtml = recipe.ingredients.map((ing, i) => `
        <div class="ingredient-item">
            <input type="checkbox" id="ing${i}" onchange="this.closest('.ingredient-item').classList.toggle('checked')">
            <label for="ing${i}">${ing}</label>
        </div>
    `).join('');
    
    const stepsHtml = recipe.instructions.map((step, i) => `
        <div class="step-item">
            <div class="step-number">${i + 1}</div>
            <div class="step-text">${step}</div>
        </div>
    `).join('');
    
    const commentsHtml = recipe.comments.map(comment => `
        <div class="comment-item">
            <div class="comment-avatar">${comment.user ? comment.user[0] : 'G'}</div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-name">${comment.user || 'Guest'}</span>
                    <span class="comment-date">${comment.date || new Date().toLocaleDateString()}</span>
                </div>
                <div class="comment-rating">${'★'.repeat(comment.rating || 5)}${'☆'.repeat(5-(comment.rating || 5))}</div>
                <div class="comment-text">${comment.text || 'Great recipe!'}</div>
            </div>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <img src="${recipe.img}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/800x400?text=Recipe'">
                <div class="modal-header-overlay">
                    <h1>${recipe.name}</h1>
                    <div class="meta-info">
                        <span><i class="fas fa-star" style="color: #ffc107;"></i> ${recipe.rating} (${recipe.reviewCount})</span>
                        <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime} min</span>
                        <span><i class="fas fa-fire"></i> Cook: ${recipe.cookTime} min</span>
                        <span><i class="fas fa-users"></i> Serves: ${recipe.servings}</span>
                        <span><i class="fas fa-utensils"></i> ${recipe.calories} cal</span>
                    </div>
                </div>
                <div class="modal-close" onclick="closeRecipeModal()">&times;</div>
            </div>
            <div class="modal-body">
                <div class="recipe-actions">
                    <button class="action-btn primary" onclick="saveRecipe(${recipe.id})">
                        <i class="fas fa-heart"></i> Save Recipe
                    </button>
                    <button class="action-btn" onclick="printRecipe(${recipe.id})">
                        <i class="fas fa-print"></i> Print
                    </button>
                    <button class="action-btn" onclick="shareRecipe('${recipe.name}')">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <a href="${recipe.youtube}" target="_blank" class="action-btn" style="background: #ff0000; color: white; border-color: #ff0000;">
                        <i class="fab fa-youtube"></i> Watch Video
                    </a>
                </div>
                
                <h2 style="margin: 30px 0 15px;"><i class="fas fa-shopping-basket"></i> Ingredients</h2>
                <div class="ingredients-list">
                    ${ingredientsHtml}
                </div>
                
                <h2 style="margin: 30px 0 15px;"><i class="fas fa-list-ol"></i> Instructions</h2>
                <div class="steps-container">
                    ${stepsHtml}
                </div>
                
                <div class="comments-section">
                    <h2 style="margin-bottom: 20px;"><i class="fas fa-comments"></i> Reviews & Comments (${recipe.comments.length})</h2>
                    
                    <div class="comment-form">
                        <input type="text" id="commentInput${recipe.id}" placeholder="Share your experience...">
                        <select id="ratingSelect${recipe.id}">
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="1">★☆☆☆☆</option>
                        </select>
                        <button onclick="addComment(${recipe.id})">Post Review</button>
                    </div>
                    
                    <div id="commentsContainer${recipe.id}">
                        ${commentsHtml || '<p style="text-align: center; padding: 30px; color: var(--gray);">No reviews yet. Be the first to comment!</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    modal.scrollTop = 0;
}

function closeRecipeModal() {
    document.getElementById('recipeModal').style.display = 'none';
    if (timerInterval) clearInterval(timerInterval);
}

function addComment(recipeId) {
    if (!currentUser) {
        showToast('Please login to comment!', 'error');
        showLoginPage();
        return;
    }
    
    const input = document.getElementById(`commentInput${recipeId}`);
    const ratingSelect = document.getElementById(`ratingSelect${recipeId}`);
    
    if (!input || !input.value.trim()) {
        showToast('Please write a comment!', 'error');
        return;
    }
    
    const recipe = recipes.find(r => r.id === recipeId);
    const comment = {
        user: currentUser.name,
        text: input.value,
        rating: parseInt(ratingSelect.value),
        date: new Date().toLocaleDateString()
    };
    
    if (!recipe.comments) recipe.comments = [];
    recipe.comments.push(comment);
    userReviews.push(recipeId);
    
    addActivity('Reviewed: ' + recipe.name, 'fa-star');
    viewRecipe(recipeId);
    showToast('Comment added! Thanks for your feedback.');
    saveUserToStorage();
    
    input.value = '';
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toast.className = 'toast ' + type;
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function printRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>${recipe.name} Recipe</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                    h1 { color: var(--primary); }
                    img { max-width: 100%; border-radius: 20px; margin: 20px 0; }
                    ul, ol { margin: 20px 0; }
                    li { margin: 10px 0; line-height: 1.6; }
                    .header { text-align: center; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${recipe.name}</h1>
                    <p>⭐ ${recipe.rating} (${recipe.reviewCount} reviews) | ⏱️ ${recipe.prepTime + recipe.cookTime} mins | 🔥 ${recipe.calories} cal</p>
                </div>
                <img src="${recipe.img}">
                <h2>Ingredients</h2>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                <h2>Instructions</h2>
                <ol>${recipe.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function shareRecipe(name) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this recipe!',
            text: `I found this amazing recipe for ${name} on Food Recipe 101!`,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(`Check out this recipe for ${name} on Food Recipe 101!`);
        showToast('Link copied to clipboard!');
    }
}

// ============================================
// SECTION 14: SERVICE CARDS
// Handles minimize functionality for service cards
// ============================================

let minimizedServices = {
    1: false,
    2: false,
    3: false
};

function showMinimizeIcon(index) {
    if (!minimizedServices[index]) {
        document.getElementById(`minimizeIcon-${index}`).style.display = 'flex';
    }
}

function hideMinimizeIcon(index) {
    if (!minimizedServices[index]) {
        document.getElementById(`minimizeIcon-${index}`).style.display = 'none';
    }
}

function toggleMinimizeService(index) {
    const card = document.getElementById(`minimizeIcon-${index}`).closest('div[style*="position: relative"]');
    const mainContent = card.querySelector('div[onclick]');
    const minimizedContent = document.getElementById(`minimizedContent-${index}`);
    const minimizeIcon = document.getElementById(`minimizeIcon-${index}`);
    const icon = minimizeIcon.querySelector('i');
    
    if (minimizedServices[index]) {
        mainContent.style.display = 'block';
        minimizedContent.style.display = 'none';
        icon.className = 'fas fa-minus';
        minimizedServices[index] = false;
        minimizeIcon.style.display = 'flex';
    } else {
        mainContent.style.display = 'none';
        minimizedContent.style.display = 'block';
        icon.className = 'fas fa-plus';
        minimizedServices[index] = true;
        minimizeIcon.style.display = 'flex';
    }
}

// ============================================
// SECTION 15: INITIALIZATION
// Sets up initial state and event listeners
// ============================================

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeRecipeModal();
    }
});

// Initialize
displayRecipes(recipes);