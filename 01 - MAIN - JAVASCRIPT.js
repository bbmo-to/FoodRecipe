// ============================================
// PAGE STATE MANAGEMENT - REMEMBER CURRENT VIEW
// ============================================
const PAGES = {
    HOME: 'home',
    MENU: 'menu',
    SERVICES: 'services',
    ABOUT: 'about',
    LOGIN: 'login',
    PROFILE: 'profile'
};

// Save current page to localStorage
function saveCurrentPage(page) {
    localStorage.setItem('currentPage', page);
    console.log(`💾 Saved page state: ${page}`);
}

// ============================================
// LOAD SAVED PAGE WITH TRANSITION
// ============================================
function loadSavedPage() {
    const savedPage = localStorage.getItem('currentPage');
    console.log(`📂 Loading saved page: ${savedPage}`);
    
    // Hide all views initially
    const views = ['homeView', 'loginView', 'aboutView', 'menuView', 'profileView', 'servicesView'];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) {
            el.style.display = 'none';
            el.style.opacity = '0';
        }
    });
    
    // Check if this is a new session (page just loaded)
    const isNewSession = !sessionStorage.getItem('sessionStarted');
    
    if (isNewSession) {
        // Mark that this session has started
        sessionStorage.setItem('sessionStarted', 'true');
        
        // If it's a new browser session, always go to home
        console.log("🆕 New browser session - showing home");
        setTimeout(() => {
            const homeView = document.getElementById('homeView');
            homeView.style.display = 'block';
            
            // FORCE RENDER HOME CONTENT - THIS IS THE KEY FIX
            console.log("📝 Rendering recipes for home view on first load...");
            
            // Make sure recipes are available
            if (typeof recipes !== 'undefined' && recipes.length > 0) {
                console.log(`✅ Found ${recipes.length} recipes to display`);
                if (typeof displayRecipes === 'function') {
                    displayRecipes(recipes);
                } else {
                    console.error("❌ displayRecipes function not found");
                }
            } else {
                console.error("❌ recipes not found or empty");
                const recipeGrid = document.getElementById('recipeGrid');
                if (recipeGrid) {
                    recipeGrid.innerHTML = '<div class="no-results">Loading recipes...</div>';
                }
            }
            
            // RENDER DISH OF THE DAY
            if (typeof renderDishOfTheDay === 'function') {
                renderDishOfTheDay();
            }
            
            homeView.offsetHeight; // Trigger reflow
            homeView.style.opacity = '1';
        }, 100);
        return;
    }
    
    if (savedPage) {
        setTimeout(() => {
            switch(savedPage) {
            case PAGES.HOME:
                const homeView = document.getElementById('homeView');
                homeView.style.display = 'block';
                
                // FORCE RENDER HOME CONTENT
                console.log("Restoring Home view with recipes");
                if (typeof displayRecipes === 'function') {
                    if (window.recipes && window.recipes.length > 0) {
                        displayRecipes(window.recipes);
                    } else if (typeof recipes !== 'undefined' && recipes.length > 0) {
                        displayRecipes(recipes);
                    } else {
                        console.warn("No recipes available");
                        const recipeGrid = document.getElementById('recipeGrid');
                        if (recipeGrid) recipeGrid.innerHTML = '<div class="no-results">No recipes available</div>';
                    }
                }
                if (typeof renderDishOfTheDay === 'function') {
                    renderDishOfTheDay();
                }
                
                homeView.offsetHeight;
                homeView.style.opacity = '1';
                break;
                    
                case PAGES.MENU:
                    const menuView = document.getElementById('menuView');
                    menuView.style.display = 'block';
                    
                    // FORCE RENDER MENU CONTENT
                    console.log("Restoring Menu view");
                    if (typeof renderMenu === 'function') {
                        renderMenu();
                    }
                    
                    menuView.offsetHeight;
                    menuView.style.opacity = '1';
                    break;
                    
                case PAGES.SERVICES:
                    const servicesView = document.getElementById('servicesView');
                    servicesView.style.display = 'block';
                    
                    // FORCE LOAD SERVICES CONTENT
                    console.log("Restoring Services view");
                    const container = document.getElementById('questionsContainer');
                    if (container) {
                        container.innerHTML = '<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-pulse" style="font-size: 2em; color: var(--primary);"></i><p style="margin-top: 10px;">Loading questions...</p></div>';
                    }
                    if (typeof displayQuestions === 'function') {
                        displayQuestions();
                    }
                    
                    servicesView.offsetHeight;
                    servicesView.style.opacity = '1';
                    break;
                    
                case PAGES.ABOUT:
                    const aboutView = document.getElementById('aboutView');
                    aboutView.style.display = 'block';
                    
                    // FORCE LOAD ABOUT CONTENT
                    console.log("Restoring About view");
                    const aboutImages = aboutView.querySelectorAll('img');
                    aboutImages.forEach(img => {
                        if (!img.complete || img.naturalHeight === 0) {
                            img.src = img.src;
                        }
                    });
                    
                    aboutView.offsetHeight;
                    aboutView.style.opacity = '1';
                    break;
                    
                case PAGES.LOGIN:
                    if (currentUser) {
                        // If logged in, go to profile instead
                        const profileView = document.getElementById('profileView');
                        profileView.style.display = 'block';
                        
                        if (typeof updateProfileDisplay === 'function') {
                            updateProfileDisplay();
                        }
                        
                        profileView.offsetHeight;
                        profileView.style.opacity = '1';
                    } else {
                        const loginView = document.getElementById('loginView');
                        loginView.style.display = 'block';
                        
                        toggleAuth(false);
                        clearLoginForm();
                        checkRememberedUser();
                        
                        loginView.offsetHeight;
                        loginView.style.opacity = '1';
                    }
                    break;
                    
                case PAGES.PROFILE:
                    if (currentUser) {
                        const profileView = document.getElementById('profileView');
                        profileView.style.display = 'block';
                        
                        // FORCE LOAD PROFILE CONTENT
                        console.log("Restoring Profile view");
                        loadUserData(currentUser.uid).then(() => {
                            if (typeof updateProfileDisplay === 'function') {
                                updateProfileDisplay();
                            }
                        });
                        
                        profileView.offsetHeight;
                        profileView.style.opacity = '1';
                    } else {
                        // If not logged in, wait a bit for Firebase auth to initialize
                        console.log("⏳ Waiting for user data before showing profile...");
                        setTimeout(() => {
                            if (currentUser) {
                                const profileView = document.getElementById('profileView');
                                profileView.style.display = 'block';
                                loadUserData(currentUser.uid).then(() => {
                                    if (typeof updateProfileDisplay === 'function') {
                                        updateProfileDisplay();
                                    }
                                });
                                profileView.offsetHeight;
                                profileView.style.opacity = '1';
                            } else {
                                // If still no user after waiting, go to login
                                console.log("❌ No user found, redirecting to login");
                                const loginView = document.getElementById('loginView');
                                loginView.style.display = 'block';
                                loginView.offsetHeight;
                                loginView.style.opacity = '1';
                                toggleAuth(false);
                                clearLoginForm();
                                checkRememberedUser();
                            }
                        }, 1000);
                    }
                    break;
                    
                default:
                    const defaultHomeView = document.getElementById('homeView');
                    defaultHomeView.style.display = 'block';
                    
                    if (typeof displayRecipes === 'function' && window.recipes) {
                        displayRecipes(window.recipes);
                    }
                    if (typeof renderDishOfTheDay === 'function') {
                        renderDishOfTheDay();
                    }
                    
                    defaultHomeView.offsetHeight;
                    defaultHomeView.style.opacity = '1';
            }
        }, 100);
    } else {
        setTimeout(() => {
            const homeView = document.getElementById('homeView');
            homeView.style.display = 'block';
            
            if (typeof displayRecipes === 'function' && window.recipes) {
                displayRecipes(window.recipes);
            }
            if (typeof renderDishOfTheDay === 'function') {
                renderDishOfTheDay();
            }
            
            homeView.offsetHeight;
            homeView.style.opacity = '1';
        }, 100);
    }
}

// ============================================
// LOAD USER DATA FROM FIREBASE
// ============================================
// ============================================
// LOAD USER DATA FROM FIREBASE
// ============================================
async function loadUserData(userId) {
    try {
        console.log("📂 Loading user data for:", userId);
        
        // Initialize arrays if they don't exist
        if (!savedRecipes) savedRecipes = [];
        if (!userReviews) userReviews = [];
        if (!userActivity) userActivity = [];
        
        // Load saved recipes
        try {
            const savedResult = await firebaseGetSavedRecipes(userId);
            if (savedResult && savedResult.success) {
                savedRecipes = savedResult.data || [];
                console.log("✅ Loaded saved recipes:", savedRecipes.length);
            } else {
                console.warn("⚠️ No saved recipes found or error loading");
                savedRecipes = [];
            }
        } catch (e) {
            console.error("❌ Error loading saved recipes:", e);
            savedRecipes = [];
        }
        
        // Load user reviews - FIXED
        try {
            console.log("📝 Fetching reviews for user:", userId);
            const reviewsResult = await window.firebaseGetUserReviews(userId);
            if (reviewsResult && reviewsResult.success) {
                userReviews = reviewsResult.data || [];
                console.log("✅ Loaded user reviews:", userReviews.length);
                console.log("📋 Reviews data:", userReviews);
            } else {
                console.warn("⚠️ No reviews found or error loading:", reviewsResult?.error);
                userReviews = [];
            }
        } catch (e) {
            console.error("❌ Error loading user reviews:", e);
            userReviews = [];
        }
        
        // Load user activities
        try {
            const activitiesResult = await window.firebaseGetUserActivities(userId);
            if (activitiesResult && activitiesResult.success) {
                userActivity = activitiesResult.data || [];
                console.log("✅ Loaded user activities:", userActivity.length);
            } else {
                console.warn("⚠️ No activities found or error loading");
                userActivity = [];
            }
        } catch (e) {
            console.error("❌ Error loading user activities:", e);
            userActivity = [];
        }
        
        // Update profile display if on profile page
        if (document.getElementById('profileView').style.display === 'block') {
            updateProfileDisplay();
        }
        
        return Promise.resolve(); // Always resolve
        
    } catch (error) {
        console.error("❌ Error in loadUserData:", error);
        // Still return resolved promise to prevent hanging
        return Promise.resolve();
    }
}

// ============================================
// EMERGENCY FIX - ENSURE RECIPES EXISTS
// ============================================
console.log("🔍 Checking recipes:", typeof recipes);
if (typeof recipes === 'undefined') {
    console.error("❌ recipes is undefined! Creating emergency fallback.");
    window.recipes = [
        {
            id: 1,
            name: "Loading...",
            category: "Main Dish",
            rating: 4.5,
            reviewCount: 100,
            img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
            ingredients: ["Please wait"],
            instructions: ["Page is loading"],
            prepTime: 10,
            cookTime: 10,
            servings: 2,
            calories: 300,
            youtube: "",
            comments: []
        }
    ];
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingMessage = document.getElementById('loadingMessage');

    // Set up login button
    const navBtn = document.getElementById('navLoginBtn');
    if (navBtn) {
        navBtn.onclick = function() { handleLoginClick(); };
    }
    
    // FORCE HIDE TOAST ON PAGE LOAD
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        toast.className = 'toast';
    }
    
    // Clear any existing toast timeouts
    if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
        window.toastTimeout = null;
    }
    if (window.toastHideTimeout) {
        clearTimeout(window.toastHideTimeout);
        window.toastHideTimeout = null;
    }
    
    // Hide ALL views initially
    const views = ['homeView', 'loginView', 'aboutView', 'menuView', 'profileView', 'servicesView'];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) {
            el.style.display = 'none';
            el.style.opacity = '0';
        }
    });
    
    // Check if this is a page refresh or new tab
    if (!sessionStorage.getItem('sessionStarted')) {
        console.log("🆕 New browser session detected");
        localStorage.removeItem('currentPage');
    }
    
    // Update loading message
    loadingMessage.textContent = 'Connecting to Firebase...';
    
    // Wait for Firebase auth to be ready
    const unsubscribe = firebase.auth().onAuthStateChanged(async function(user) {
        console.log("🔥 Firebase auth ready in DOMContentLoaded");
        
        loadingMessage.textContent = user ? 'Loading your profile...' : 'Preparing recipes...';
        
        // Make sure recipes are loaded
        if (typeof recipes !== 'undefined' && recipes.length > 0) {
            console.log(`📚 Found ${recipes.length} recipes`);
        } else {
            console.warn("⚠️ Recipes not found or empty");
        }
        
        // Load the saved page state
        await loadSavedPage();
        
        loadingMessage.textContent = 'Almost there...';
        
        // Small delay to ensure everything is rendered
        setTimeout(() => {
            // Fade out loading screen
            loadingScreen.style.opacity = '0';
            
            // Remove loading screen after fade
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 300);
        
        // Initialize other features
        if (typeof renderDishOfTheDay === 'function') {
            renderDishOfTheDay();
        }
        
        // Unsubscribe after first call
        unsubscribe();
    });
});

// ============================================
// GLOBAL VARIABLES
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

// Saved recipes pagination
let currentSavedPage = 1;
const SAVED_PER_PAGE = 8;

// ============================================
// EXPORT NAVIGATION FUNCTIONS TO WINDOW
// ============================================
// Make sure all navigation functions are available globally
window.showHome = showHome;
window.showMenu = showMenu;
window.showServices = showServices;
window.showAbout = showAbout;
window.showLoginPage = showLoginPage;
window.showProfile = showProfile;
window.logout = logout;

// ============================================
// GLOBAL FIREBASE REVIEW FUNCTIONS
// ============================================

window.firebaseGetRecipeRating = async function(recipeId) {
    try {
        const ratingDoc = await db.collection('recipeRatings').doc(recipeId.toString()).get();
        if (ratingDoc.exists) {
            return { success: true, data: ratingDoc.data() };
        } else {
            return { success: true, data: { averageRating: 0, totalReviews: 0 } };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.closeRecipeModal = function() {
    document.getElementById('recipeModal').style.display = 'none';
    if (window.timerInterval) clearInterval(window.timerInterval);
};

console.log("✅ Firebase review functions loaded");

// ============================================
// SUBMIT FUNCTIONS - SIMPLE VERSION
// ============================================

// Submit FAQ Question - ULTRA SIMPLE VERSION
window.submitFAQQuestion = async function(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to ask a question!', 'error');
        showLoginPage();
        return;
    }
    
    const name = document.getElementById('faqName').value;
    const email = document.getElementById('faqEmail').value;
    const question = document.getElementById('faqQuestion').value;

    console.log("📝 Question data:", { name, email, question });
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Check if function exists
        if (typeof window.firebaseSubmitQuestion !== 'function') {
            throw new Error('Firebase function not loaded. Please refresh the page.');
        }
        
        console.log("✅ Calling firebaseSubmitQuestion...");
        const result = await window.firebaseSubmitQuestion(name, email, question);
        console.log("✅ Result:", result);
        
        if (result && result.success === true) {
            const faqForm = document.getElementById('faqForm');
            faqForm.innerHTML = `
                <div style="text-align: center; padding: 30px; background: var(--success); color: white; border-radius: 15px;">
                    <i class="fas fa-check-circle" style="font-size: 3em;"></i>
                    <h3>Question Submitted!</h3>
                    <p>Thank you! Our team will answer within 24-48 hours.</p>
                    <button onclick="resetFAQForm()" style="margin-top: 20px; padding: 10px 25px; background: white; color: var(--success); border: none; border-radius: 30px; cursor: pointer;">Ask Another</button>
                </div>
            `;

            // Show loading state before refreshing questions
            const container = document.getElementById('questionsContainer');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin" style="font-size: 2em; color: var(--primary);"></i><p style="margin-top: 15px;">Refreshing questions...</p></div>';
            }
            
            // Wait a moment for Firebase to update, then refresh
            setTimeout(async () => {
                await displayQuestions();
            }, 500);
            
            showToast('Question submitted!', 'success');
            if (typeof addActivity === 'function') {
                addActivity('Asked: ' + question.substring(0, 50) + '...', 'fa-question');
            }
        } else {
            throw new Error(result?.error || 'Unknown error');
        }
    } catch (error) {
        console.error("❌ Error:", error);
        showToast('Error: ' + error.message, 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
};
// Reset FAQ Form
window.resetFAQForm = function() {
    if (!currentUser) {
        showToast('Please login to ask a question!', 'error');
        showLoginPage();
        return;
    }
    
    const faqForm = document.getElementById('faqForm');
    faqForm.innerHTML = `
        <div style="display: grid; gap: 15px; grid-template-columns: 1fr 1fr;">
            <input type="text" id="faqName" placeholder="Your Name" value="${currentUser.name}" required style="width: 100%; padding: 15px; border: none; border-radius: 15px;">
            <input type="email" id="faqEmail" placeholder="Your Email" value="${currentUser.email}" required style="width: 100%; padding: 15px; border: none; border-radius: 15px;">
        </div>
        <textarea id="faqQuestion" rows="4" placeholder="Type your question..." required style="width: 100%; padding: 15px; border: none; border-radius: 15px; margin: 15px 0;"></textarea>
        <button type="submit" style="padding: 15px 30px; background: white; color: var(--primary); border: none; border-radius: 15px; font-weight: 600; cursor: pointer;">Submit Question</button>
    `;
    
    document.getElementById('faqForm').onsubmit = window.submitFAQQuestion;

    // 👇 ADD THIS LINE - Refresh questions when form is reset
    displayQuestions();
};

// Submit Recipe - ULTRA SIMPLE VERSION
window.handleRecipeSubmission = async function(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to submit a recipe!', 'error');
        showLoginPage();
        return;
    }
    
    // Get form values
    const recipeName = document.getElementById('recipeName').value.trim();
    const category = document.getElementById('recipeCategory').value;
    const imageUrl = document.getElementById('recipeImage').value.trim();
    const ingredients = document.getElementById('recipeIngredients').value
        .split('\n')
        .filter(i => i.trim())
        .map(i => i.trim());
    const instructions = document.getElementById('recipeInstructions').value
        .split('\n')
        .filter(i => i.trim())
        .map(i => i.trim());
    const prepTime = parseInt(document.getElementById('prepTime').value) || 15;
    const cookTime = parseInt(document.getElementById('cookTime').value) || 30;
    const servings = parseInt(document.getElementById('servings').value) || 4;
    const calories = parseInt(document.getElementById('calories').value) || 350;
    const youtubeLink = document.getElementById('youtubeLink').value.trim();
    
    if (!recipeName || !category || ingredients.length === 0 || instructions.length === 0) {
        showToast('Please fill in all required fields!', 'error');
        return;
    }
    
    const recipeData = {
        name: recipeName,
        category: category,
        img: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ingredients: ingredients,
        instructions: instructions,
        prepTime: prepTime,
        cookTime: cookTime,
        servings: servings,
        calories: calories,
        youtube: youtubeLink,
        submittedBy: currentUser.uid,
        submittedByName: currentUser.name,
        status: 'pending'
    };
    
const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        let submitFunction = window.firebaseSubmitRecipe;
        
        if (typeof submitFunction !== 'function') {
            console.log("Recipe function not found, waiting 1 second...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            submitFunction = window.firebaseSubmitRecipe;
        }
        
        if (typeof submitFunction !== 'function') {
            throw new Error('Firebase function not loaded. Please refresh the page.');
        }
        
        const result = await submitFunction(recipeData);
        
        if (result.success) {
            showToast('Recipe submitted successfully! Our team will review it.', 'success');
            document.getElementById('submitRecipeForm').reset();
            hideSubmitForm();
            if (typeof addActivity === 'function') {
                addActivity('Submitted recipe: ' + recipeName, 'fa-upload');
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("❌ Error:", error);
        showToast('Error: ' + error.message, 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
};

// ============================================
// AUTH STATE OBSERVER - FIXED (NO AUTO-REDIRECT)
// ============================================
firebase.auth().onAuthStateChanged(async function(user) {
    console.log("🔥 Auth state changed:", user ? "Logged in" : "Logged out");
    
    if (user) {
        try {
            const userDoc = await db.collection('users').doc(user.uid).get();
            const userData = userDoc.data() || {};
            
            currentUser = {
                uid: user.uid,
                name: user.displayName || userData.name || 'User',
                email: user.email,
                ...userData
            };
            
            userProfile = {
                name: currentUser.name,
                email: currentUser.email,
                bio: userData.bio || 'Food lover and home cook',
                location: userData.location || 'Philippines',
                avatar: 'fas fa-user',
                joinDate: userData.joinDate ? new Date(userData.joinDate).getFullYear() : new Date().getFullYear()
            };
            
            // Load all user data from Firebase
            await loadUserData(user.uid);
            
            // Update UI
            const navBtn = document.getElementById('navLoginBtn');
            navBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name.split(' ')[0];
            navBtn.onclick = function() { showProfile(); };
            
            console.log("✅ User session restored:", currentUser.name);
            
            // If current page is profile, refresh it
            const currentPage = localStorage.getItem('currentPage');
            if (currentPage === PAGES.PROFILE && document.getElementById('profileView').style.display === 'block') {
                console.log("🔄 Refreshing profile view");
                updateProfileDisplay();
            }
            
        } catch (error) {
            console.error("Error restoring session:", error);
        }
    } else {
        currentUser = null;
        savedRecipes = [];
        userReviews = [];
        userActivity = [];
        userProfile = {};
        
        const navBtn = document.getElementById('navLoginBtn');
        navBtn.innerHTML = '<i class="fas fa-user"></i> Login';
        navBtn.onclick = function() { showLoginPage(); };
        
        // If current page is profile, redirect to login
        const currentPage = localStorage.getItem('currentPage');
        if (currentPage === PAGES.PROFILE) {
            console.log("🔄 User logged out, redirecting to login");
            showLoginPage(false);
        }
    }
});

// ============================================
// VIEW NAVIGATION WITH SMOOTH TRANSITIONS
// ============================================
function hideAll() {
    forceHideToast(); // Make sure this line is included
    
    const views = ['homeView', 'loginView', 'aboutView', 'menuView', 'profileView', 'servicesView'];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) {
            el.style.display = 'none';
            el.style.opacity = '0';
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== HOME VIEW ==========
function showHome(dontSave = false) {
    console.log("🏠 showHome called");
    
    // Fade out current view
    const currentActive = document.querySelector('.main-content > div[style*="display: block"]');
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (!dontSave) saveCurrentPage(PAGES.HOME);
        
        hideAll();
        const homeView = document.getElementById('homeView');
        homeView.style.display = 'block';
        
        // RENDER HOME CONTENT - MAKE SURE RECIPES EXIST
        console.log("📝 Rendering recipes for home view...");
        if (typeof displayRecipes === 'function') {
            if (window.recipes && window.recipes.length > 0) {
                displayRecipes(window.recipes);
            } else {
                console.warn("recipes not found, using fallback");
                // Create fallback recipes if needed
                if (typeof recipes !== 'undefined' && recipes.length > 0) {
                    displayRecipes(recipes);
                } else {
                    const recipeGrid = document.getElementById('recipeGrid');
                    if (recipeGrid) recipeGrid.innerHTML = '<div class="no-results">Loading recipes...</div>';
                }
            }
        } else {
            console.warn("displayRecipes function not found");
            const recipeGrid = document.getElementById('recipeGrid');
            if (recipeGrid) recipeGrid.innerHTML = '<div class="no-results">Error loading recipes</div>';
        }
        
        // RENDER DISH OF THE DAY
        if (typeof renderDishOfTheDay === 'function') {
            renderDishOfTheDay();
        }
        
        // Reset search
        document.getElementById('searchInput').value = '';
        document.getElementById('searchBadge').style.display = 'none';
        
        // Hide search header if visible
        const searchHeader = document.getElementById('searchHeader');
        if (searchHeader) searchHeader.style.display = 'none';
        
        // Trigger reflow and fade in
        homeView.offsetHeight;
        homeView.style.opacity = '1';
        
        scrollToTop();
    }, 200);
}   

// ========== MENU/RECIPES VIEW ==========
function showMenu(dontSave = false) {
    console.log("🍳 showMenu called");
    
    // Fade out current view
    const currentActive = document.querySelector('.main-content > div[style*="display: block"]');
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (!dontSave) saveCurrentPage(PAGES.MENU);
        
        hideAll();
        const menuView = document.getElementById('menuView');
        menuView.style.display = 'block';
        
        // RENDER MENU CONTENT
        console.log("📝 Rendering menu content...");
        if (typeof renderMenu === 'function') {
            renderMenu();
        } else {
            console.warn("renderMenu function not found");
            const menuContent = document.getElementById('menuContent');
            if (menuContent) {
                menuContent.innerHTML = '<div class="no-results">Menu content loading...</div>';
            }
        }
        
        // Reset search
        document.getElementById('searchInput').value = '';
        document.getElementById('searchBadge').style.display = 'none';
        
        // Hide search header if visible
        const menuSearchHeader = document.getElementById('menuSearchHeader');
        if (menuSearchHeader) menuSearchHeader.style.display = 'none';
        
        // Reset category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes('All')) {
                btn.classList.add('active');
            }
        });
        
        // Trigger reflow and fade in
        menuView.offsetHeight;
        menuView.style.opacity = '1';
        
        scrollToTop();
    }, 200);
}

// ========== SERVICES VIEW ==========
function showServices(dontSave = false) {
    console.log("🔧 showServices called");
    
    // Fade out current view
    const currentActive = document.querySelector('.main-content > div[style*="display: block"]');
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (!dontSave) saveCurrentPage(PAGES.SERVICES);
        
        hideAll();
        const servicesView = document.getElementById('servicesView');
        servicesView.style.display = 'block';
        
        // Reset form visibility
        const submitForm = document.getElementById('submitRecipeFormContainer');
        if (submitForm) submitForm.style.display = 'none';
        
        // RENDER SERVICES CONTENT
        console.log("📝 Loading questions for services view...");
        
        // Show loading state
        const container = document.getElementById('questionsContainer');
        if (container) {
            container.innerHTML = '<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-pulse" style="font-size: 2em; color: var(--primary);"></i><p style="margin-top: 10px;">Loading questions...</p></div>';
        }
        
        // Load questions immediately
        if (typeof displayQuestions === 'function') {
            displayQuestions();
        } else {
            console.warn("displayQuestions function not found");
            if (container) {
                container.innerHTML = '<div class="no-results">Could not load questions</div>';
            }
        }
        
        // Reset minimize states
        minimizedServices = { 1: false, 2: false, 3: false };
        
        // Trigger reflow and fade in
        servicesView.offsetHeight;
        servicesView.style.opacity = '1';
        
        scrollToTop();
    }, 200);
}

// ========== ABOUT VIEW ==========
function showAbout(dontSave = false) {
    console.log("👥 showAbout called");
    
    // Fade out current view
    const currentActive = document.querySelector('.main-content > div[style*="display: block"]');
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (!dontSave) saveCurrentPage(PAGES.ABOUT);
        
        hideAll();
        const aboutView = document.getElementById('aboutView');
        aboutView.style.display = 'block';
        
        // RENDER ABOUT CONTENT
        console.log("📝 Rendering about view content...");
        
        // Force reload team images
        const aboutImages = aboutView.querySelectorAll('img');
        aboutImages.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                const originalSrc = img.src;
                img.src = ''; // Clear
                img.src = originalSrc; // Reload
            }
        });
        
        // Trigger reflow and fade in
        aboutView.offsetHeight;
        aboutView.style.opacity = '1';
        
        scrollToTop();
    }, 200);
}

// ========== LOGIN VIEW ==========
// ========== LOGIN VIEW ==========
function showLoginPage(dontSave = false) {
    console.log("🔐 showLoginPage called");
    
    // Fade out current view
    const currentActive = document.querySelector('.main-content > div[style*="display: block"]');
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (!dontSave) saveCurrentPage(PAGES.LOGIN);
        
        // Hide all views first
        const views = ['homeView', 'loginView', 'aboutView', 'menuView', 'profileView', 'servicesView'];
        views.forEach(v => {
            const el = document.getElementById(v);
            if (el) {
                el.style.display = 'none';
                el.style.opacity = '0';
            }
        });
        
        // Show login view
        const loginView = document.getElementById('loginView');
        loginView.style.display = 'block';
        
        // Reset all sections
        const signInSection = document.getElementById('signInSection');
        const signUpSection = document.getElementById('signUpSection');
        const forgotSection = document.getElementById('forgotPasswordSection');
        
        if (signInSection) signInSection.style.display = 'block';
        if (signUpSection) signUpSection.style.display = 'none';
        if (forgotSection) forgotSection.style.display = 'none';
        
        // Clear forms
        clearLoginForm();
        
        // Check for remembered user
        checkRememberedUser();
        
        // Force a reflow
        loginView.offsetHeight;
        
        // Fade in
        loginView.style.opacity = '1';
        
        console.log("✅ Login view displayed");
        
        scrollToTop();
    }, 200);
}

// ========== PROFILE VIEW ==========
// ========== PROFILE VIEW ==========
function showProfile(dontSave = false) {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        showLoginPage();
        return;
    }
    
    console.log("👤 showProfile called for user:", currentUser.name);
    
    // Fade out current view
    const currentActive = document.querySelector('.main-content > div[style*="display: block"]');
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (!dontSave) saveCurrentPage(PAGES.PROFILE);
        
        hideAll();
        const profileView = document.getElementById('profileView');
        profileView.style.display = 'block';
        
        // FIRST, set default values to show something
        console.log("📝 Setting default profile values...");
        document.getElementById('profileDisplayName').textContent = currentUser.name || 'User';
        document.getElementById('profileEmail').textContent = currentUser.email || 'email@example.com';
        document.getElementById('profileJoinDate').textContent = new Date().getFullYear();
        document.getElementById('displayNameValue').textContent = currentUser.name || 'User';
        document.getElementById('displayEmailValue').textContent = currentUser.email || 'email@example.com';
        document.getElementById('displayBioValue').textContent = 'Food lover and home cook';
        document.getElementById('displayLocationValue').textContent = 'Philippines';
        document.getElementById('profileSavedCount').textContent = '0';
        
        // Clear any existing content to show loading state
        const savedGrid = document.getElementById('savedRecipesGrid');
        if (savedGrid) savedGrid.innerHTML = '<div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Loading saved recipes...</div>';
        
        // THEN load real data
        console.log("📝 Loading user data for profile...");
        if (currentUser && currentUser.uid) {
            loadUserData(currentUser.uid).then(() => {
                console.log("📝 Rendering profile content with loaded data...");
                if (typeof updateProfileDisplay === 'function') {
                    updateProfileDisplay();
                } else {
                    console.warn("updateProfileDisplay function not found");
                }
            }).catch(error => {
                console.error("❌ Error loading user data:", error);
                // Show error message but keep default values
                if (savedGrid) {
                    savedGrid.innerHTML = '<div class="no-results">Error loading saved recipes</div>';
                }
            });
        } else {
            console.warn("No current user found, using default values");
        }
        
        // Trigger reflow and fade in
        profileView.offsetHeight;
        profileView.style.opacity = '1';
        
        scrollToTop();
    }, 200);
}

// Add this new function to wait for Firebase
async function waitForFirebaseAndLoadQuestions() {
    console.log("⏳ Waiting for Firebase to be ready...");
    
    // Check if Firebase auth is ready
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
        if (firebase && firebase.auth && firebase.auth().currentUser !== undefined) {
            console.log("✅ Firebase is ready");
            break;
        }
        console.log(`⏳ Waiting for Firebase... attempt ${attempts + 1}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
    }
    
    // Now load questions
    console.log("📝 Calling displayQuestions...");
    await displayQuestions();
}
 
// ============================================
// FAQ & QUESTIONS UI
// ============================================
async function displayQuestions() {
    const container = document.getElementById('questionsContainer');
    const noQuestionsMsg = document.getElementById('noQuestionsMessage');
    
    if (!container) return;
    
    // Show loading state immediately
    container.innerHTML = '<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin" style="font-size: 2em; color: var(--primary);"></i><p style="margin-top: 15px;">Loading questions...</p></div>';
    
    // Try both window and direct function
    let getFunction = window.firebaseGetQuestions || firebaseGetQuestions;
    
    if (typeof getFunction !== 'function') {
        console.error("firebaseGetQuestions not found");
        container.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--danger);">Error loading questions</div>';
        return;
    }

    // Add retry logic
    let result;
    let retries = 3;
    
    for (let i = 0; i < retries; i++) {
        try {
            result = await getFunction();
            if (result.success) break;
            
            if (i < retries - 1) {
                console.log(`Retry ${i + 1} of ${retries}...`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === retries - 1) throw error;
        }
    }
    
    if (!result.success || !result.data || result.data.length === 0) {
        container.innerHTML = '';
        noQuestionsMsg.style.display = 'block';
        return;
    }
    
    noQuestionsMsg.style.display = 'none';
    container.innerHTML = '';
    
    const isAdmin = await (window.isUserAdmin ? window.isUserAdmin() : Promise.resolve(false));
    
    result.data.forEach(q => {
        const questionCard = document.createElement('div');
        questionCard.id = `question-${q.id}`;
        questionCard.style.background = 'var(--light)';
        questionCard.style.borderRadius = '20px';
        questionCard.style.padding = '25px';
        questionCard.style.marginBottom = '20px';
        questionCard.style.border = '2px solid var(--border)';
        
        let html = `
            <div style="display: flex; gap: 15px; margin-bottom: ${q.replies && q.replies.length > 0 ? '20px' : '0'};">
                <div style="width: 50px; height: 50px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2em;">
                    ${q.name ? q.name[0].toUpperCase() : 'U'}
                </div>
        <div style="flex: 1; min-width: 0; /* THIS IS THE KEY FIX */">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <strong style="color: var(--dark);">${q.name || 'Anonymous'}</strong>
                <span style="color: var(--gray); font-size: 0.85em; white-space: nowrap;">${q.date}</span>
            </div>
            <div style="color: var(--dark); margin-bottom: 10px; word-break: break-word; overflow-wrap: break-word;">
                ${q.question}
            </div>
                <span style="background: ${q.status === 'answered' ? 'var(--success)' : 'var(--primary)'}; color: white; padding: 3px 12px; border-radius: 20px; font-size: 0.8em;">
                    ${q.status === 'answered' ? '✓ Answered' : '⏳ Pending'}
                </span>
                </div>
            </div>
        `;
        
        if (q.replies && q.replies.length > 0) {
            q.replies.forEach(reply => {
                html += `
    <div style="flex: 1; min-width: 0; /* THIS IS THE KEY FIX */">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <strong style="color: var(--primary); display: flex; align-items: center; gap: 5px;">
                <i class="fas fa-headset"></i> ${reply.supportName || 'Support Team'}
            </strong>
            <span style="color: var(--gray); font-size: 0.85em;">${reply.date}</span>
        </div>
        <div style="color: var(--dark); word-break: break-word; overflow-wrap: break-word;">
            ${reply.message || reply}
        </div>
                `;
            });
        }
        
        if (isAdmin && q.status !== 'answered') {
            html += `
                <div style="margin-left: 65px; margin-top: 15px;" id="replyForm-${q.id}">
                    <div style="background: white; border-radius: 15px; padding: 15px;">
                        <textarea id="replyInput-${q.id}" rows="2" placeholder="Type your reply..." style="width: 100%; padding: 10px; border: 2px solid var(--border); border-radius: 10px; margin-bottom: 10px;"></textarea>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="submitReply('${q.id}')" style="padding: 8px 20px; background: var(--primary); color: white; border: none; border-radius: 20px; cursor: pointer;">
                                <i class="fas fa-paper-plane"></i> Send Reply
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        questionCard.innerHTML = html;
        container.appendChild(questionCard);
    });
}

async function submitReply(questionId) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log("🚀 Submitting reply for question:", questionId);
    
    const replyInput = document.getElementById(`replyInput-${questionId}`);
    if (!replyInput) {
        console.log("❌ Reply input not found");
        return;
    }
    
    const reply = replyInput.value.trim();
    console.log("📝 Reply text:", reply);
    
    if (!reply) {
        showToast('Please type a reply!', 'error');
        return;
    }
    
    const replyBtn = event.target.tagName === 'BUTTON' ? event.target : event.target.closest('button');
    if (!replyBtn) return;
    
    const originalText = replyBtn.innerHTML;
    replyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    replyBtn.disabled = true;
    
    try {
        let addReplyFunction = window.firebaseAddReply || firebaseAddReply;
        
        if (typeof addReplyFunction !== 'function') {
            throw new Error('Reply function not found');
        }
        
        const result = await addReplyFunction(questionId, reply);
        
        if (result.success) {
            showToast('Reply sent!', 'success');
            replyInput.value = '';
            await displayQuestions();
        } else {
            showToast('Error: ' + result.error, 'error');
            replyBtn.innerHTML = originalText;
            replyBtn.disabled = false;
        }
    } catch (error) {
        console.error("❌ Error in submitReply:", error);
        showToast('Error sending reply', 'error');
        replyBtn.innerHTML = originalText;
        replyBtn.disabled = false;
    }
}

// ============================================
// RECIPE SUBMISSION UI
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

// ============================================
// SMART AI CHATBOT ASSISTANT (Full class definition)
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

    getTipCategory(category) {
        const cat = this.cookingTips[category];
        if (!cat) return { text: "Sorry, no tips found for that category." };
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
// CHATBOT UI FUNCTIONS
// ============================================
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

window.quickQuestion = function(query) {
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.value = query;
        sendChatbotMessage();
    }
};

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

function removeChatbotTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

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

function minimizeChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (!window || !toggle) return;
    window.style.display = 'none';
    toggle.innerHTML = '<i class="fas fa-robot"></i>';
}

function closeChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    if (!window || !toggle) return;
    window.style.display = 'none';
    toggle.innerHTML = '<i class="fas fa-robot"></i>';
}

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

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createChatbotWidget, 500);
});

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
// EMAIL SUPPORT
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
// SEARCH FUNCTIONALITY
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

// ============================================
// PROFILE FUNCTIONS
// ============================================

function editField(field) {
    console.log("✏️ Editing field:", field);
    
    const row = document.getElementById(field + 'Row');
    if (!row) {
        console.error("❌ Row not found for field:", field);
        return;
    }
    
    // Get the correct ID based on field name
    let valueId;
    if (field === 'name') valueId = 'displayNameValue';
    else if (field === 'email') valueId = 'displayEmailValue';
    else if (field === 'bio') valueId = 'displayBioValue';
    else if (field === 'location') valueId = 'displayLocationValue';
    
    const valueSpan = document.getElementById(valueId);
    if (!valueSpan) {
        console.error("❌ Value span not found for ID:", valueId);
        return;
    }
    
    const currentValue = valueSpan.textContent;
    console.log("📝 Current value:", currentValue);
    
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
    console.log("💾 Saving field:", field);
    
    const input = document.getElementById('editFieldInput');
    if (!input) {
        console.error("❌ Input not found");
        return;
    }
    
    const newValue = input.value.trim();
    console.log("📝 New value:", newValue);
    
    if (!newValue) {
        showToast('Please enter a value', 'error');
        return;
    }
    
    // Update the correct elements based on field
    if (field === 'name') {
        const displayName = document.getElementById('displayNameValue');
        const profileName = document.getElementById('profileDisplayName');
        
        if (displayName) displayName.textContent = newValue;
        if (profileName) profileName.textContent = newValue;
        
        // Update nav button
        const navBtn = document.getElementById('navLoginBtn');
        if (navBtn) navBtn.innerHTML = '<i class="fas fa-user"></i> ' + newValue.split(' ')[0];
        
        // Update userProfile and currentUser
        userProfile.name = newValue;
        if (currentUser) currentUser.name = newValue;
    } 
    else if (field === 'email') {
        const displayEmail = document.getElementById('displayEmailValue');
        const profileEmail = document.getElementById('profileEmail');
        
        if (displayEmail) displayEmail.textContent = newValue;
        if (profileEmail) profileEmail.textContent = newValue;
        
        userProfile.email = newValue;
        if (currentUser) currentUser.email = newValue;
    } 
    else if (field === 'bio') {
        const displayBio = document.getElementById('displayBioValue');
        if (displayBio) displayBio.textContent = newValue;
        userProfile.bio = newValue;
    } 
    else if (field === 'location') {
        const displayLocation = document.getElementById('displayLocationValue');
        if (displayLocation) displayLocation.textContent = newValue;
        userProfile.location = newValue;
    }
    
    // Restore the field row with the new value
    restoreFieldRow(field, newValue);
    
    showToast(field.charAt(0).toUpperCase() + field.slice(1) + ' updated!', 'success');
}

function cancelEdit(field) {
    console.log("❌ Cancelling edit for field:", field);
    
    // Get the current displayed value
    let currentValue = '';
    
    if (field === 'name') {
        const displayName = document.getElementById('displayNameValue');
        currentValue = displayName ? displayName.textContent : (userProfile.name || (currentUser ? currentUser.name : 'User'));
    } else if (field === 'email') {
        const displayEmail = document.getElementById('displayEmailValue');
        currentValue = displayEmail ? displayEmail.textContent : (userProfile.email || (currentUser ? currentUser.email : 'email@example.com'));
    } else if (field === 'bio') {
        const displayBio = document.getElementById('displayBioValue');
        currentValue = displayBio ? displayBio.textContent : (userProfile.bio || 'Food lover and home cook');
    } else if (field === 'location') {
        const displayLocation = document.getElementById('displayLocationValue');
        currentValue = displayLocation ? displayLocation.textContent : (userProfile.location || 'Philippines');
    }
    
    console.log("📝 Restoring value:", currentValue);
    
    // Restore the field row with the current value
    restoreFieldRow(field, currentValue);
    
    showToast('Edit cancelled', 'info');
}

function restoreFieldRow(field, value) {
    console.log("🔄 Restoring row for field:", field, "with value:", value);
    
    const row = document.getElementById(field + 'Row');
    if (!row) {
        console.error("❌ Row not found for field:", field);
        return;
    }
    
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    
    // Determine the correct ID for the value span
    let valueId;
    if (field === 'name') valueId = 'displayNameValue';
    else if (field === 'email') valueId = 'displayEmailValue';
    else if (field === 'bio') valueId = 'displayBioValue';
    else if (field === 'location') valueId = 'displayLocationValue';
    
    row.innerHTML = `
        <span class="info-label">${label}:</span>
        <span class="info-value" id="${valueId}">${value}</span>
        <button class="edit-btn" onclick="editField('${field}')"><i class="fas fa-pen"></i> Edit</button>
    `;
}


function editAvatar() {
    showToast('Avatar feature coming soon!', 'info');
}

function addActivity(action, icon) {
    const activity = {
        action: action,
        icon: icon,
        time: new Date().toLocaleString()
    };
    
    // Add to local array
    userActivity.unshift(activity); // Add to beginning
    
    // Save to Firebase if logged in
    if (currentUser) {
        firebaseSaveActivity(currentUser.uid, activity)
            .then(result => {
                if (result.success) {
                    console.log("✅ Activity saved to Firebase");
                }
            })
            .catch(error => console.error("❌ Error saving activity:", error));
    }
    
    // Limit local array to 50 items
    if (userActivity.length > 50) {
        userActivity = userActivity.slice(0, 50);
    }
    
    // Update display if on profile page
    if (document.getElementById('profileView').style.display === 'block') {
        updateActivityDisplay();
    }
}

async function updateProfileDisplay() {
    if (!currentUser) return;
    
    console.log("📝 Updating profile display for:", currentUser.name);
    console.log("📊 Saved recipes:", savedRecipes);
    console.log("📊 User reviews:", userReviews);
    console.log("📊 User activities:", userActivity);
    
    // Update profile header
    document.getElementById('profileDisplayName').textContent = userProfile.name || currentUser.name;
    document.getElementById('profileEmail').textContent = userProfile.email || currentUser.email;
    document.getElementById('profileJoinDate').textContent = userProfile.joinDate || 2026;
    
    // Update editable fields
    document.getElementById('displayNameValue').textContent = userProfile.name || currentUser.name;
    document.getElementById('displayEmailValue').textContent = userProfile.email || currentUser.email;
    document.getElementById('displayBioValue').textContent = userProfile.bio || 'Food lover and home cook';
    document.getElementById('displayLocationValue').textContent = userProfile.location || 'Philippines';
    
    document.getElementById('profileSavedCount').textContent = savedRecipes.length;
    
    // ===== SAVED RECIPES SECTION =====
    const savedGrid = document.getElementById('savedRecipesGrid');
    if (!savedGrid) return;
    
    savedGrid.innerHTML = '';
    
    if (savedRecipes.length === 0) {
        document.getElementById('noSavedMessage').style.display = 'block';
        // Clear any existing pagination container
        const existingPagination = document.getElementById('savedPagination');
        if (existingPagination) existingPagination.remove();
    } else {
        document.getElementById('noSavedMessage').style.display = 'none';
        
        // Calculate pagination
        const totalPages = Math.ceil(savedRecipes.length / SAVED_PER_PAGE);
        if (currentSavedPage > totalPages) currentSavedPage = 1;
        
        const startIndex = (currentSavedPage - 1) * SAVED_PER_PAGE;
        const endIndex = startIndex + SAVED_PER_PAGE;
        const pageSavedRecipes = savedRecipes.slice(startIndex, endIndex);
        
        // Add header with page info
        // Add header with page info (without duplicate "Saved Recipes" text)
        const headerDiv = document.createElement('div');
        headerDiv.style.cssText = `
            display: flex;
            justify-content: flex-end;  /* Align to the right since we don't need the left text */
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border);
            width: 100%;
        `;
        headerDiv.innerHTML = `
            <span style="color: var(--gray); background: var(--bg-tertiary); padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                Page ${currentSavedPage} of ${totalPages}
            </span>
        `;
        savedGrid.appendChild(headerDiv);
        
        // Create a grid container with the same styling as the main recipe grid
        const gridContainer = document.createElement('div');
        gridContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 20px;
            width: 100%;
        `;
        
        // Add saved recipes for current page
        pageSavedRecipes.forEach(recipeId => {
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.setAttribute('onclick', 'viewRecipe(' + recipe.id + ')');
                card.style.cursor = 'pointer';
                
                card.innerHTML = `
                    <div class="save-btn saved" onclick="removeSavedRecipe(${recipe.id}); event.stopPropagation();">
                        <i class="fas fa-heart"></i>
                    </div>
                    <img src="${recipe.img}" alt="${recipe.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
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
                gridContainer.appendChild(card);
            }
        });
        
        savedGrid.appendChild(gridContainer);
        
        // Add pagination if needed
        if (totalPages > 1) {
            const paginationDiv = document.createElement('div');
            paginationDiv.id = 'savedPagination';
            paginationDiv.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid var(--border);
                width: 100%;
            `;
            
            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.className = 'pagination-btn';
            prevBtn.style.cssText = `
                background: var(--bg-tertiary);
                border: 2px solid var(--border);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
                color: var(--light);
                font-weight: 600;
            `;
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.onclick = () => changeSavedPage(currentSavedPage - 1);
            prevBtn.disabled = currentSavedPage === 1;
            if (currentSavedPage === 1) {
                prevBtn.style.opacity = '0.3';
                prevBtn.style.cursor = 'not-allowed';
            }
            paginationDiv.appendChild(prevBtn);
            
            // Page numbers
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentSavedPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // First page with ellipsis
            if (startPage > 1) {
                const firstPageBtn = document.createElement('button');
                firstPageBtn.className = 'pagination-btn';
                firstPageBtn.style.cssText = `
                    background: var(--bg-tertiary);
                    border: 2px solid var(--border);
                    min-width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    color: var(--light);
                    font-weight: 600;
                `;
                firstPageBtn.textContent = '1';
                firstPageBtn.onclick = () => changeSavedPage(1);
                paginationDiv.appendChild(firstPageBtn);
                
                if (startPage > 2) {
                    const ellipsis = document.createElement('span');
                    ellipsis.style.color = 'var(--gray)';
                    ellipsis.textContent = '...';
                    paginationDiv.appendChild(ellipsis);
                }
            }
            
            // Page number buttons
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'pagination-btn';
                pageBtn.style.cssText = `
                    background: ${i === currentSavedPage ? 'linear-gradient(135deg, var(--primary), var(--primary-light))' : 'var(--bg-tertiary)'};
                    border: 2px solid ${i === currentSavedPage ? 'var(--primary)' : 'var(--border)'};
                    min-width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    color: var(--light);
                    font-weight: 600;
                    transform: ${i === currentSavedPage ? 'scale(1.1)' : 'scale(1)'};
                `;
                pageBtn.textContent = i;
                pageBtn.onclick = () => changeSavedPage(i);
                paginationDiv.appendChild(pageBtn);
            }
            
            // Last page with ellipsis
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const ellipsis = document.createElement('span');
                    ellipsis.style.color = 'var(--gray)';
                    ellipsis.textContent = '...';
                    paginationDiv.appendChild(ellipsis);
                }
                
                const lastPageBtn = document.createElement('button');
                lastPageBtn.className = 'pagination-btn';
                lastPageBtn.style.cssText = `
                    background: var(--bg-tertiary);
                    border: 2px solid var(--border);
                    min-width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    color: var(--light);
                    font-weight: 600;
                `;
                lastPageBtn.textContent = totalPages;
                lastPageBtn.onclick = () => changeSavedPage(totalPages);
                paginationDiv.appendChild(lastPageBtn);
            }
            
            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.className = 'pagination-btn';
            nextBtn.style.cssText = `
                background: var(--bg-tertiary);
                border: 2px solid var(--border);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
                color: var(--light);
                font-weight: 600;
            `;
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.onclick = () => changeSavedPage(currentSavedPage + 1);
            nextBtn.disabled = currentSavedPage === totalPages;
            if (currentSavedPage === totalPages) {
                nextBtn.style.opacity = '0.3';
                nextBtn.style.cursor = 'not-allowed';
            }
            paginationDiv.appendChild(nextBtn);
            
            savedGrid.appendChild(paginationDiv);
        } else {
            // Remove any existing pagination
            const existingPagination = document.getElementById('savedPagination');
            if (existingPagination) existingPagination.remove();
        }
    }
    
    // Update reviews display
    await updateReviewsDisplay();
    
    // Update activity display
    updateActivityDisplay();
}

// Saved recipes pagination function
window.changeSavedPage = function(newPage) {
    if (newPage >= 1) {
        currentSavedPage = newPage;
        updateProfileDisplay(); // This will refresh the entire profile display
    }
};

// Reviews display with pagination
let currentReviewsPage = 1;
const REVIEWS_PER_PAGE = 5;

async function updateReviewsDisplay() {
    const container = document.getElementById('userReviewsContainer');
    if (!container) return;
    
    if (!currentUser) return;
    
    console.log("📝 Updating reviews display. Reviews:", userReviews);
    
    // If no reviews, show the no reviews message
    if (!userReviews || userReviews.length === 0) {
        document.getElementById('noReviewsMessage').style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    document.getElementById('noReviewsMessage').style.display = 'none';
    
    // Calculate pagination
    const totalPages = Math.ceil(userReviews.length / REVIEWS_PER_PAGE);
    if (currentReviewsPage > totalPages) currentReviewsPage = 1;
    
    const startIndex = (currentReviewsPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    const pageReviews = userReviews.slice(startIndex, endIndex);
    
    // Build HTML
    let html = `
        <div class="reviews-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="color: var(--light);">Your Reviews (${userReviews.length})</h3>
            <span style="color: var(--gray);">Page ${currentReviewsPage} of ${totalPages}</span>
        </div>
        <div class="reviews-list">
    `;
    
    // Display each review on current page
    pageReviews.forEach(review => {
        const recipe = recipes.find(r => r.id === review.recipeId);
        const recipeName = recipe ? recipe.name : 'Unknown Recipe';
        
        // Format date properly
        let reviewDate = review.date || '';
        if (review.createdAt && !review.date) {
            try {
                const date = review.createdAt.toDate ? review.createdAt.toDate() : new Date(review.createdAt);
                reviewDate = date.toLocaleString();
            } catch (e) {
                reviewDate = new Date().toLocaleString();
            }
        }
        
        html += `
            <div class="comment-item" style="margin-bottom: 15px; position: relative;">
                <div class="comment-avatar">${review.userName ? review.userName[0].toUpperCase() : 'U'}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-name">${recipeName}</span>
                        <span class="comment-date">${reviewDate}</span>
                    </div>
                    <div class="comment-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                    <div class="comment-text">${review.comment || ''}</div>
                    <div style="margin-top: 10px;">
                        <button onclick="viewRecipe(${review.recipeId})" class="edit-btn" style="margin-right: 10px; padding: 5px 15px;">
                            <i class="fas fa-eye"></i> View Recipe
                        </button>
                        <button onclick="deleteUserReview('${review.id}', ${review.recipeId})" class="edit-btn" style="background: var(--danger); color: white;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    // Add pagination if needed
    if (totalPages > 1) {
        html += `<div class="reviews-pagination" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 25px; padding-top: 20px; border-top: 2px solid var(--border);">`;
        
        // Previous button
        html += `
            <button class="activity-page-btn" onclick="changeReviewsPage(${currentReviewsPage - 1})" 
                    ${currentReviewsPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentReviewsPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            html += `<button class="reviews-page-btn" onclick="changeReviewsPage(1)">1</button>`;
            if (startPage > 2) {
                html += `<span style="color: var(--gray);">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="reviews-page-btn ${i === currentReviewsPage ? 'active' : ''}" 
                        onclick="changeReviewsPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span style="color: var(--gray);">...</span>`;
            }
            html += `<button class="reviews-page-btn" onclick="changeReviewsPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        html += `
            <button class="activity-page-btn" onclick="changeReviewsPage(${currentReviewsPage + 1})" 
                    ${currentReviewsPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        html += `</div>`;
    }
    
    container.innerHTML = html;
}

// Reviews pagination functions
window.changeReviewsPage = function(newPage) {
    if (newPage >= 1) {
        currentReviewsPage = newPage;
        updateReviewsDisplay();
    }
};

// Update your switchTab function to reset reviews page
function switchTab(tab) {
    console.log("🔄 Switching to tab:", tab);
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'saved') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('savedTab').classList.add('active');
        
        // Reset saved page when switching to saved tab
        currentSavedPage = 1;
        
        // Force refresh saved recipes when switching to saved tab
        if (currentUser) {
            updateProfileDisplay();
        }
    } else if (tab === 'reviews') {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('reviewsTab').classList.add('active');
        
        // Reset reviews page when switching to reviews tab
        currentReviewsPage = 1;
        
        // Force refresh reviews when switching to reviews tab
        if (currentUser) {
            updateReviewsDisplay();
        }
    } else {
        document.querySelectorAll('.tab-btn')[2].classList.add('active');
        document.getElementById('activityTab').classList.add('active');
        
        // Reset activity filters when switching to activity tab
        currentActivityCategory = 'all';
        currentActivityPage = 1;
        
        // Force refresh activity when switching to activity tab
        if (currentUser) {
            updateActivityDisplay();
        }
    }
}

// Activity display with categories and pagination
let currentActivityCategory = 'all';
let currentActivityPage = 1;
const ACTIVITIES_PER_PAGE = 5;

function updateActivityDisplay() {
    const container = document.getElementById('activityContainer');
    if (!container) return;
    
    console.log("📝 Updating activity display. Activities:", userActivity);
    
    if (!userActivity || userActivity.length === 0) {
        document.getElementById('noActivityMessage').style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    document.getElementById('noActivityMessage').style.display = 'none';
    
    // Categorize activities
    const categorized = categorizeActivities(userActivity);
    
    // Get current category activities
    let currentActivities = [];
    if (currentActivityCategory === 'all') {
        currentActivities = userActivity;
    } else {
        currentActivities = categorized[currentActivityCategory] || [];
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(currentActivities.length / ACTIVITIES_PER_PAGE);
    if (currentActivityPage > totalPages) currentActivityPage = 1;
    
    const startIndex = (currentActivityPage - 1) * ACTIVITIES_PER_PAGE;
    const endIndex = startIndex + ACTIVITIES_PER_PAGE;
    const pageActivities = currentActivities.slice(startIndex, endIndex);
    
    // Build HTML
    let html = `
        <div class="activity-categories">
            <button class="activity-category-btn ${currentActivityCategory === 'all' ? 'active' : ''}" 
                    onclick="filterActivity('all')">
                All Activities <span class="activity-count-badge">${userActivity.length}</span>
            </button>
            <button class="activity-category-btn ${currentActivityCategory === 'today' ? 'active' : ''}" 
                    onclick="filterActivity('today')">
                Today <span class="activity-count-badge">${categorized.today.length}</span>
            </button>
            <button class="activity-category-btn ${currentActivityCategory === 'week' ? 'active' : ''}" 
                    onclick="filterActivity('week')">
                This Week <span class="activity-count-badge">${categorized.week.length}</span>
            </button>
            <button class="activity-category-btn ${currentActivityCategory === 'month' ? 'active' : ''}" 
                    onclick="filterActivity('month')">
                This Month <span class="activity-count-badge">${categorized.month.length}</span>
            </button>
            <button class="activity-category-btn ${currentActivityCategory === 'older' ? 'active' : ''}" 
                    onclick="filterActivity('older')">
                Older <span class="activity-count-badge">${categorized.older.length}</span>
            </button>
        </div>
        <div class="activity-list">
    `;
    
    if (pageActivities.length === 0) {
        html += `
            <div class="activity-empty">
                <i class="fas fa-calendar-alt"></i>
                <p>No activities in this period</p>
            </div>
        `;
    } else {
        pageActivities.forEach(activity => {
            // Determine icon color based on activity type
            let iconColor = 'var(--primary)';
            if (activity.icon === 'fa-trash-alt' || activity.action.includes('Deleted') || activity.action.includes('Removed')) {
                iconColor = 'var(--danger)';
            } else if (activity.icon === 'fa-star' || activity.action.includes('Reviewed')) {
                iconColor = '#ffc107';
            } else if (activity.icon === 'fa-bookmark' || activity.action.includes('Saved')) {
                iconColor = 'var(--success)';
            }
            
            html += `
                <div class="step-item" style="margin-bottom: 10px; padding: 15px;">
                    <div style="background: ${iconColor}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
                        <i class="fas ${activity.icon || 'fa-clock'}"></i>
                    </div>
                    <div style="flex: 1; margin-left: 15px;">
                        <strong style="color: var(--light);">${activity.action}</strong>
                        <p style="color: var(--gray); font-size: 0.9em; margin-top: 5px;">${activity.time}</p>
                    </div>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    
    // Add pagination with page numbers if needed
    if (totalPages > 1) {
        html += `<div class="activity-pagination" style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 25px; padding-top: 20px; border-top: 2px solid var(--border);">`;
        
        // Previous button
        html += `
            <button class="activity-page-btn" onclick="changeActivityPage(${currentActivityPage - 1})" 
                    ${currentActivityPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers - auto adjust based on total pages
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentActivityPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust startPage if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // First page with ellipsis
        if (startPage > 1) {
            html += `<button class="activity-page-number" onclick="changeActivityPage(1)">1</button>`;
            if (startPage > 2) {
                html += `<span style="color: var(--gray);">...</span>`;
            }
        }
        
        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="activity-page-number ${i === currentActivityPage ? 'active' : ''}" 
                        onclick="changeActivityPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        // Last page with ellipsis
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span style="color: var(--gray);">...</span>`;
            }
            html += `<button class="activity-page-number" onclick="changeActivityPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        html += `
            <button class="activity-page-btn" onclick="changeActivityPage(${currentActivityPage + 1})" 
                    ${currentActivityPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        html += `</div>`;
    }
    
    container.innerHTML = html;
}

function categorizeActivities(activities) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    const categorized = {
        today: [],
        week: [],
        month: [],
        older: []
    };
    
    activities.forEach(activity => {
        const activityDate = new Date(activity.time);
        
        if (activityDate >= today) {
            categorized.today.push(activity);
        } else if (activityDate >= weekAgo) {
            categorized.week.push(activity);
        } else if (activityDate >= monthAgo) {
            categorized.month.push(activity);
        } else {
            categorized.older.push(activity);
        }
    });
    
    return categorized;
}

// Filter functions
window.filterActivity = function(category) {
    console.log("🔍 Filtering activity by:", category);
    currentActivityCategory = category;
    currentActivityPage = 1;
    updateActivityDisplay();
};

window.changeActivityPage = function(newPage) {
    if (newPage >= 1) {
        currentActivityPage = newPage;
        updateActivityDisplay();
    }
};

// ============================================
// AUTHENTICATION
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

async function handleSignUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();
    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d\S]{8,20}$/;
    
    if (!passwordPattern.test(password)) {
        showToast('Password must have uppercase, lowercase, number, and special character', 'error');
        return;
    }
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        await user.updateProfile({
            displayName: name
        });
        
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            bio: 'Food lover and home cook',
            location: 'Philippines',
            joinDate: new Date().toISOString(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('✓ Registration successful! Please login.', 'success');
        
        document.getElementById('signUpName').value = '';
        document.getElementById('signUpEmail').value = '';
        document.getElementById('signUpPassword').value = '';
        
        toggleAuth(false);
        
    } catch (error) {
        console.error("Sign up error:", error);
        showToast(error.message, 'error');
    }
}

async function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        
        if (rememberMe) {
            // Only store email, NEVER password
            localStorage.setItem('rememberedUser', JSON.stringify({ email: email }));
        } else {
            // Clear remembered user if they uncheck remember me
            localStorage.removeItem('rememberedUser');
        }
        
        showToast('Login successful!', 'success');
        showHome();
        
    } catch (error) {
        console.error("Sign in error:", error);
        
        const oldError = document.querySelector('.too-many-error');
        if (oldError) oldError.remove();
        
        if (error.code === 'auth/invalid-credential' || 
            error.code === 'auth/user-not-found' || 
            error.code === 'auth/wrong-password') {
            showToast('Incorrect email or password', 'error');
        } 
        else if (error.code === 'auth/too-many-requests') {
            showToast('Too many failed attempts. Please try again in 10 seconds.', 'error');
            
            const loginBtn = document.querySelector('#loginView button[type="submit"]');
            const originalText = loginBtn.innerHTML;
            loginBtn.disabled = true;
            loginBtn.innerHTML = 'Please wait 10s...';
            
            let secondsLeft = 10;
            const countdown = setInterval(() => {
                secondsLeft--;
                if (secondsLeft > 0) {
                    loginBtn.innerHTML = `Please wait ${secondsLeft}s...`;
                } else {
                    clearInterval(countdown);
                    loginBtn.disabled = false;
                    loginBtn.innerHTML = originalText;
                }
            }, 1000);
        }
        else {
            showToast(error.message, 'error');
        }
    }
}

function forceHideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
    setTimeout(() => {
        toast.className = 'toast';
    }, 300);
    
    if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
        window.toastTimeout = null;
    }
    if (window.toastHideTimeout) {
        clearTimeout(window.toastHideTimeout);
        window.toastHideTimeout = null;
    }
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
            // DON'T auto-fill password for security
            loginPassword.value = '';
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

async function logout() {
    try {
        await auth.signOut();
        
        currentUser = null;
        savedRecipes = [];
        userReviews = [];
        userActivity = [];
        userProfile = {};
        
        clearLoginForm();
        
        const navBtn = document.getElementById('navLoginBtn');
        navBtn.innerHTML = '<i class="fas fa-user"></i> Login';
        navBtn.onclick = function() { handleLoginClick(); };
        
        showToast('Logged out successfully');
        
        // After logout, go to home
        saveCurrentPage(PAGES.HOME);
        showHome(true);
        
    } catch (error) {
        console.error("Logout error:", error);
        showToast('Error logging out', 'error');
    }
}

// ============================================
// RECIPE DISPLAY
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
            <img src="${recipe.img}" alt="${recipe.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
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
    console.log(`🔍 Filtering by category: ${category}`);
    
    // Don't hide all views - we're already in menuView
    // Just filter the recipes and re-render
    
    let filteredRecipes;
    if (category === 'all') {
        filteredRecipes = recipes;
        console.log(`📊 Showing all recipes: ${filteredRecipes.length}`);
    } else {
        filteredRecipes = recipes.filter(r => r.category === category);
        console.log(`📊 Showing ${category} recipes: ${filteredRecipes.length}`);
    }
    
    // Render the filtered menu
    renderFilteredMenu(filteredRecipes);
    
    // Update active button state
    updateCategoryButtons(category);
    
    // Reset search
    document.getElementById('searchInput').value = '';
    document.getElementById('searchBadge').style.display = 'none';
    document.getElementById('menuSearchHeader').style.display = 'none';
    
    // Scroll to top smoothly
    scrollToTop();
}

function renderFilteredMenu(filteredRecipes) {
    const menuContent = document.getElementById('menuContent');
    if (!menuContent) return;
    
    menuContent.innerHTML = '';
    
    const categories = ['Main Dish', 'Dessert', 'Drinks'];
    let hasRecipes = false;
    
    categories.forEach(cat => {
        const catRecipes = filteredRecipes.filter(r => r.category === cat);
        if (catRecipes.length > 0) {
            hasRecipes = true;
            let html = `<h2 class="menu-category-title">${cat}</h2><div class="menu-list">`;
            
            catRecipes.forEach(r => {
                html += `
                    <div class="menu-item" onclick="viewRecipe(${r.id})">
                        <div class="menu-item-info">
                            <img src="${r.img}" alt="${r.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80'">
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
    
    // Show "no results" message if no recipes found
    if (!hasRecipes) {
        menuContent.innerHTML = `
            <div class="no-results">
                <i class="fas fa-utensils"></i>
                <h3>No recipes found in this category</h3>
                <p>Try selecting a different category</p>
                <button onclick="filterByCategory('all')" style="margin-top: 20px; padding: 12px 30px; background: var(--primary); color: white; border: none; border-radius: 30px; cursor: pointer;">
                    View All Recipes
                </button>
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
        
        // Save to Firebase
        firebaseSaveRecipe(currentUser.uid, recipeId, recipe.name)
            .then(result => {
                if (result.success) {
                    console.log("✅ Recipe saved to Firebase");
                    // Refresh profile display if on profile page
                    if (document.getElementById('profileView').style.display === 'block') {
                        updateProfileDisplay();
                    }
                }
            })
            .catch(error => console.error("❌ Error saving recipe:", error));
        
        // More detailed activity message
        addActivity('Saved recipe: "' + recipe.name + '"', 'fa-bookmark');
        showToast('Recipe saved to your profile!');
        
        // Update UI
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
    
    // Remove from Firebase
    if (currentUser) {
        firebaseRemoveSavedRecipe(currentUser.uid, recipeId)
            .then(result => {
                if (result.success) {
                    console.log("✅ Recipe removed from Firebase");
                    // Refresh profile display
                    updateProfileDisplay();
                }
            })
            .catch(error => console.error("❌ Error removing recipe:", error));
    }
    
    // More detailed activity message
    addActivity('Removed recipe: "' + recipe.name + '" from saved', 'fa-trash-alt');
    showToast('Recipe removed from saved');
}


// ============================================
// RECIPE MODAL
// ============================================
async function viewRecipe(id) {
    console.log("🔍 viewRecipe called for ID:", id);
    
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
        console.error("❌ Recipe not found for ID:", id);
        return;
    }
    
    console.log("✅ Recipe found:", recipe.name);
    
    const modal = document.getElementById('recipeModal');
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; padding: 50px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3em; color: var(--primary);"></i>
            <p style="margin-top: 20px;">Loading recipe...</p>
        </div>
    `;
    modal.style.display = 'flex';
    
    try {
        console.log("📚 Fetching reviews for recipe ID:", id);
        
        const reviewsResult = await window.firebaseGetRecipeReviews(id);
        console.log("📚 Reviews result:", reviewsResult);
        
        const recipeReviews = reviewsResult.success ? reviewsResult.data : [];
        console.log("📝 Processed reviews:", recipeReviews);
        
        console.log("⭐ Fetching rating for recipe ID:", id);
        const ratingResult = await window.firebaseGetRecipeRating(id);
        console.log("⭐ Rating result:", ratingResult);
        
        const ratingData = ratingResult.success ? ratingResult.data : { averageRating: recipe.rating, totalReviews: recipe.reviewCount };
        console.log("📊 Rating data:", ratingData);
        
        console.log("🎨 Generating HTML...");
        
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
        
        const commentsHtml = recipeReviews.map(comment => {
            console.log("💬 Processing comment:", comment);
            return `
            <div class="comment-item">
                <div class="comment-avatar">${comment.userName ? comment.userName[0] : 'G'}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-name">${comment.userName || 'Guest'}</span>
                        <span class="comment-date">${comment.date || new Date().toLocaleString()}</span>
                    </div>
                    <div class="comment-rating">${'★'.repeat(comment.rating || 5)}${'☆'.repeat(5-(comment.rating || 5))}</div>
                    <div class="comment-text">${comment.comment || 'Great recipe!'}</div>
                    ${comment.userId === currentUser?.uid ? `
                        <button onclick="deleteUserReview('${comment.id}', ${recipe.id})" style="margin-top: 10px; padding: 5px 15px; background: var(--danger); color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 0.8em;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    ` : ''}
                </div>
            </div>
        `}).join('');
        
        console.log("✅ HTML generated, updating modal...");
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <img src="${recipe.img}" alt="${recipe.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400'">
                    <div class="modal-header-overlay">
                        <h1>${recipe.name}</h1>
                        <div class="meta-info">
                            <span><i class="fas fa-star" style="color: #ffc107;"></i> ${ratingData.averageRating.toFixed(1)} (${ratingData.totalReviews})</span>
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
                        ${recipe.youtube ? `
                            <a href="${recipe.youtube}" target="_blank" class="action-btn" style="background: #ff0000; color: white; border-color: #ff0000;">
                                <i class="fab fa-youtube"></i> Watch Video
                            </a>
                        ` : ''}
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
                        <h2 style="margin-bottom: 20px;"><i class="fas fa-comments"></i> Reviews & Comments (${recipeReviews.length})</h2>
                        
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
        
        console.log("✅ Modal updated successfully");
        modal.scrollTop = 0;
        
    } catch (error) {
        console.error("❌ Error in viewRecipe:", error);
        modal.innerHTML = `
            <div class="modal-content" style="text-align: center; padding: 50px;">
                <i class="fas fa-exclamation-circle" style="font-size: 3em; color: var(--danger);"></i>
                <p style="margin-top: 20px;">Error loading recipe: ${error.message}</p>
                <button onclick="closeRecipeModal()" style="margin-top: 20px; padding: 10px 30px; background: var(--primary); color: white; border: none; border-radius: 30px; cursor: pointer;">Close</button>
            </div>
        `;
    }
}

function closeRecipeModal() {
    document.getElementById('recipeModal').style.display = 'none';
    if (timerInterval) clearInterval(timerInterval);
}

async function addComment(recipeId) {
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
    
    // Find the recipe name
    const recipe = recipes.find(r => r.id === recipeId);
    const recipeName = recipe ? recipe.name : 'Unknown Recipe';
    
    const commentBtn = document.querySelector(`#commentsContainer${recipeId}`).previousElementSibling.querySelector('button');
    const originalText = commentBtn.innerHTML;
    commentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
    commentBtn.disabled = true;
    
    const reviewData = {
        userName: currentUser.name,
        rating: parseInt(ratingSelect.value),
        comment: input.value.trim()
    };
    
    console.log("📝 Submitting review:", { recipeId, reviewData });
    
    const result = await window.firebaseSubmitReview(recipeId, reviewData);
    console.log("📝 Submit result:", result);
    
    if (result.success) {
        input.value = '';
        
        // Reload user reviews immediately
        console.log("🔄 Reloading user reviews after posting...");
        const reviewsResult = await window.firebaseGetUserReviews(currentUser.uid);
        if (reviewsResult.success) {
            userReviews = reviewsResult.data || [];
            console.log("✅ Reviews reloaded:", userReviews.length);
            
            // If on profile page, update the display
            if (document.getElementById('profileView').style.display === 'block') {
                updateReviewsDisplay();
            }
        }
        
        // Refresh the recipe modal to show new review
        viewRecipe(recipeId);
        
        // Add more detailed activity message
        addActivity(`Reviewed "${recipeName}" with ${reviewData.rating} stars`, 'fa-star');
        
        showToast('Review posted! Thank you for your feedback.', 'success');
    } else {
        showToast('Error posting review: ' + result.error, 'error');
    }
    
    commentBtn.innerHTML = originalText;
    commentBtn.disabled = false;
}

async function deleteUserReview(reviewId, recipeId) {
    if (!confirm('Are you sure you want to delete this review?')) {
        return;
    }
    
    console.log("🗑️ Deleting review:", reviewId, "for recipe:", recipeId);
    
    // Find the recipe name before deleting
    const recipe = recipes.find(r => r.id === recipeId);
    const recipeName = recipe ? recipe.name : 'Unknown Recipe';
    
    const result = await window.firebaseDeleteReview(reviewId, recipeId);
    console.log("🗑️ Delete result:", result);
    
    if (result.success) {
        // Reload user reviews
        const reviewsResult = await window.firebaseGetUserReviews(currentUser.uid);
        if (reviewsResult.success) {
            userReviews = reviewsResult.data || [];
            console.log("✅ Reviews reloaded after delete:", userReviews.length);
        }
        
        // Add activity for deleting review
        addActivity(`Deleted review for "${recipeName}"`, 'fa-trash-alt');
        
        showToast('Review deleted successfully', 'success');
        
        // If we're on the recipe modal, refresh it
        if (document.getElementById('recipeModal').style.display === 'flex') {
            viewRecipe(recipeId);
        }
        
        // If on profile page, refresh display
        if (document.getElementById('profileView').style.display === 'block') {
            updateReviewsDisplay();
            updateProfileDisplay(); // This will refresh the whole profile
        }
    } else {
        showToast('Error deleting review: ' + result.error, 'error');
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
        window.toastTimeout = null;
    }
    
    if (window.toastHideTimeout) {
        clearTimeout(window.toastHideTimeout);
        window.toastHideTimeout = null;
    }
    
    toast.classList.remove('show');
    
    setTimeout(() => {
        toast.className = 'toast ' + type;
        toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        window.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
            
            window.toastHideTimeout = setTimeout(() => {
                toast.className = 'toast';
            }, 300);
        }, 3000);
    }, 50);
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
// SERVICE CARDS
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
// INITIALIZATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeRecipeModal();
    }
});

// ============================================
// CHECK RECIPE STATUS FOR CURRENT USER
// ============================================
async function checkMyRecipeStatus() {
    if (!currentUser) {
        showToast('Please login first!', 'error');
        return;
    }
    
    try {
        const result = await firebaseGetUserRecipes(currentUser.uid);
        
        if (!result.success || result.data.length === 0) {
            showToast('You haven\'t submitted any recipes yet', 'info');
            return;
        }
        
        let message = "📝 YOUR RECIPE SUBMISSIONS:\n\n";
        
        result.data.forEach((recipe, index) => {
            const status = recipe.status.toUpperCase();
            const statusEmoji = recipe.status === 'approved' ? '✅' : 
                               recipe.status === 'rejected' ? '❌' : '⏳';
            
            message += `${statusEmoji} ${index + 1}. ${recipe.name}\n`;
            message += `   Status: ${status}\n`;
            
            if (recipe.status === 'approved') {
                message += `   ✅ Published!\n`;
            } else if (recipe.status === 'rejected' && recipe.rejectionReason) {
                message += `   Reason: ${recipe.rejectionReason}\n`;
            } else if (recipe.status === 'pending') {
                message += `   ⏳ Waiting for review...\n`;
            }
            message += `\n`;
        });
        
        showRecipeStatusModal(message, result.data);
        
    } catch (error) {
        console.error("Error checking status:", error);
        showToast('Error checking recipe status', 'error');
    }
}

function showRecipeStatusModal(message, recipes) {
    const modal = document.createElement('div');
    modal.style.cssText = `
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
    
    let recipesHtml = '';
    recipes.forEach(recipe => {
        const statusColor = recipe.status === 'approved' ? 'var(--success)' : 
                           recipe.status === 'rejected' ? 'var(--danger)' : 'var(--primary)';
        const statusIcon = recipe.status === 'approved' ? 'fa-check-circle' : 
                          recipe.status === 'rejected' ? 'fa-times-circle' : 'fa-clock';
        
        recipesHtml += `
            <div style="background: var(--light); border-radius: 15px; padding: 15px; margin-bottom: 10px; border-left: 4px solid ${statusColor};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="color: var(--dark); margin: 0;">${recipe.name}</h4>
                    <span style="color: ${statusColor};">
                        <i class="fas ${statusIcon}"></i> ${recipe.status.toUpperCase()}
                    </span>
                </div>
                ${recipe.status === 'rejected' && recipe.rejectionReason ? 
                    `<p style="color: var(--gray); margin-top: 10px;"><strong>Reason:</strong> ${recipe.rejectionReason}</p>` : ''}
                ${recipe.status === 'approved' ? 
                    `<p style="color: var(--gray); margin-top: 10px;">✅ Your recipe is live!</p>` : ''}
                ${recipe.status === 'pending' ? 
                    `<p style="color: var(--gray); margin-top: 10px;">⏳ Our team is reviewing your recipe.</p>` : ''}
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div style="background: white; width: 90%; max-width: 500px; border-radius: 30px; overflow: hidden; animation: modalSlide 0.4s;">
            <div style="background: linear-gradient(135deg, var(--primary), var(--primary-light)); padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-clipboard-list" style="font-size: 1.5em;"></i>
                    <h3 style="margin: 0;">My Recipe Submissions</h3>
                </div>
                <button onclick="this.closest('div[style*="fixed"]').remove()" style="background: none; border: none; color: white; font-size: 1.5em; cursor: pointer;">&times;</button>
            </div>
            <div style="padding: 30px; max-height: 400px; overflow-y: auto;">
                ${recipesHtml}
            </div>
            <div style="padding: 20px; border-top: 2px solid var(--border); text-align: center;">
                <button onclick="this.closest('div[style*="fixed"]').remove()" style="padding: 10px 30px; background: var(--primary); color: white; border: none; border-radius: 25px; cursor: pointer;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Handle login button click - this will check auth state first
window.handleLoginClick = function() {
    console.log("🔑 Login button clicked");
    console.log("Current user state:", currentUser);
    
    // Check if user is logged in
    if (currentUser) {
        console.log("👤 User is logged in, going to profile");
        showProfile();
    } else {
        console.log("🔐 No user logged in, going to login page");
        showLoginPage();
    }
}


// DEBUG AREA


// Debug helper - type debug() in console
window.debug = function() {
    console.log("=== DEBUG INFO ===");
    console.log("recipes exists:", typeof recipes !== 'undefined');
    console.log("recipes count:", recipes ? recipes.length : 0);
    console.log("currentUser:", currentUser);
    console.log("displayRecipes function:", typeof displayRecipes === 'function');
    console.log("renderMenu function:", typeof renderMenu === 'function');
    console.log("homeView display:", document.getElementById('homeView').style.display);
    console.log("recipeGrid content:", document.getElementById('recipeGrid').children.length);
}

// Debug function - type debugProfile() in console
window.debugProfile = function() {
    console.log("=== PROFILE DEBUG ===");
    console.log("currentUser:", currentUser);
    console.log("savedRecipes:", savedRecipes);
    console.log("userReviews:", userReviews);
    console.log("userActivity:", userActivity);
    console.log("profileView display:", document.getElementById('profileView').style.display);
    console.log("savedRecipesGrid content:", document.getElementById('savedRecipesGrid')?.innerHTML);
    console.log("updateProfileDisplay exists:", typeof updateProfileDisplay === 'function');
}

// Test function - type testLogin() in console
window.testLogin = function() {
    console.log("Testing login navigation...");
    console.log("Current loginView display:", document.getElementById('loginView').style.display);
    console.log("showLoginPage function exists:", typeof showLoginPage === 'function');
    showLoginPage();
}

window.checkAuth = function() {
    console.log("=== AUTH CHECK ===");
    console.log("currentUser:", currentUser);
    console.log("Firebase currentUser:", firebase.auth().currentUser);
    console.log("Login button text:", document.getElementById('navLoginBtn').innerHTML);
}

// Debug function for login view
window.debugLogin = function() {
    console.log("=== LOGIN DEBUG ===");
    const loginView = document.getElementById('loginView');
    console.log("loginView exists:", !!loginView);
    console.log("loginView display:", loginView.style.display);
    console.log("loginView opacity:", loginView.style.opacity);
    console.log("signInSection exists:", !!document.getElementById('signInSection'));
    console.log("signInSection display:", document.getElementById('signInSection')?.style.display);
}

// Debug function for category filtering
window.testFilter = function(category) {
    console.log(`🧪 Testing filter: ${category}`);
    const filtered = category === 'all' ? recipes : recipes.filter(r => r.category === category);
    console.log(`Found ${filtered.length} recipes`);
    console.log('Categories found:', [...new Set(recipes.map(r => r.category))]);
}

// Debug function to check reviews
window.debugReviews = function() {
    console.log("=== REVIEWS DEBUG ===");
    console.log("currentUser:", currentUser);
    console.log("userReviews array:", userReviews);
    console.log("userReviews length:", userReviews?.length);
    
    if (currentUser) {
        window.firebaseGetUserReviews(currentUser.uid).then(result => {
            console.log("Firebase reviews result:", result);
            if (result.success) {
                console.log("Firebase reviews data:", result.data);
            }
        });
    }
    
    console.log("updateReviewsDisplay exists:", typeof updateReviewsDisplay === 'function');
    console.log("noReviewsMessage display:", document.getElementById('noReviewsMessage')?.style.display);
    console.log("userReviewsContainer content:", document.getElementById('userReviewsContainer')?.innerHTML);
}
