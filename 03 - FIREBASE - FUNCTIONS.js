// ============================================
// FIREBASE STORAGE REFERENCE
// ============================================
if (typeof storage === 'undefined') {
    var storage;
    if (firebase && firebase.storage) {
        storage = firebase.storage();
    }
}

// ============================================
// IMAGE UPLOAD FUNCTIONS
// ============================================
window.uploadRecipeImage = async function(file, recipeName) {
    try {
        if (!storage) {
            if (firebase && firebase.storage) {
                storage = firebase.storage();
            } else {
                throw new Error("Firebase Storage not initialized");
            }
        }
        
        const timestamp = Date.now();
        const safeName = recipeName.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${timestamp}_${safeName}`;
        const storageRef = storage.ref(`recipes/${fileName}`);
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        
        console.log("✅ Image uploaded successfully:", downloadURL);
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error("❌ Upload error:", error);
        return { success: false, error: error.message };
    }
};

window.uploadMultipleImages = async function(files) {
    const results = [];
    for (const file of files) {
        const result = await window.uploadRecipeImage(file, file.name);
        results.push({ originalName: file.name, ...result });
    }
    return results;
};

window.deleteRecipeImage = async function(imageUrl) {
    try {
        if (!storage) storage = firebase.storage();
        const storageRef = storage.refFromURL(imageUrl);
        await storageRef.delete();
        return { success: true };
    } catch (error) {
        console.error("❌ Delete error:", error);
        return { success: false, error: error.message };
    }
};

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================
window.firebaseSignUp = async function(name, email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        await user.updateProfile({ displayName: name });
        
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            bio: 'Food lover and home cook',
            location: 'Philippines',
            joinDate: new Date().toISOString(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, user: user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseSignIn = async function(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        return { 
            success: true, 
            user: {
                uid: user.uid,
                name: user.displayName || (userData ? userData.name : 'User'),
                email: user.email,
                ...userData
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseSignOut = async function() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ============================================
// SAVED RECIPES FUNCTIONS
// ============================================
window.firebaseSaveRecipe = async function(userId, recipeId, recipeName) {
    try {
        await db.collection('users').doc(userId)
            .collection('savedRecipes').doc(recipeId.toString())
            .set({
                recipeId: recipeId,
                recipeName: recipeName,
                savedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseRemoveSavedRecipe = async function(userId, recipeId) {
    try {
        await db.collection('users').doc(userId)
            .collection('savedRecipes').doc(recipeId.toString())
            .delete();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseGetSavedRecipes = async function(userId) {
    try {
        const snapshot = await db.collection('users').doc(userId)
            .collection('savedRecipes').get();
        
        const savedIds = [];
        snapshot.forEach(doc => savedIds.push(parseInt(doc.id)));
        return { success: true, data: savedIds };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ============================================
// QUESTIONS & ANSWERS FUNCTIONS - FIXED
// ============================================
window.firebaseSubmitQuestion = async function(name, email, question) {
    console.log("📝 firebaseSubmitQuestion called with:", { name, email, question });
    
    try {
        if (!db) {
            throw new Error("Firestore not initialized");
        }
        
        const docRef = await db.collection('questions').add({
            name: name || 'Anonymous',
            email: email || 'no-email@example.com',
            question: question,
            date: new Date().toLocaleString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'pending',
            replies: []
        });

        console.log("✅ Question saved with ID:", docRef.id);

        return {
            success: true,
            id: docRef.id,
            message: "Question submitted successfully!"
        };

    } catch (error) {
        console.error("❌ Submit question error:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

window.firebaseGetQuestions = async function() {
    try {
        console.log("🔥 Fetching questions from Firebase...");
        const snapshot = await db.collection('questions')
            .orderBy('timestamp', 'desc')
            .get();
        
        const questions = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            questions.push({ 
                id: doc.id, 
                ...data,
                // Ensure date exists
                date: data.date || new Date().toLocaleString()
            });
        });
        
        console.log(`✅ Found ${questions.length} questions`);
        return { success: true, data: questions };
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
        return { success: false, error: error.message, data: [] };
    }
};

window.firebaseAddReply = async function(questionId, replyMessage) {
    console.log("📝 Adding reply:", { questionId, replyMessage });
    
    try {
        const questionRef = db.collection('questions').doc(questionId);
        const questionDoc = await questionRef.get();
        
        if (!questionDoc.exists) {
            return { success: false, error: "Question not found" };
        }
        
        const question = questionDoc.data();
        const replies = question.replies || [];
        
        const newReply = {
            message: replyMessage,
            date: new Date().toLocaleString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            supportName: auth.currentUser?.displayName || 'Support Team'
        };
        
        replies.push(newReply);
        
        await questionRef.update({
            replies: replies,
            status: 'answered'
        });
        
        console.log("✅ Reply added");
        return { success: true };
    } catch (error) {
        console.error("❌ Reply error:", error);
        return { success: false, error: error.message };
    }
};

window.isUserAdmin = async function() {
    if (!auth.currentUser) return false;
    
    try {
        const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
        const userData = userDoc.data();
        return userData?.role === 'admin' || false;
    } catch (error) {
        return false;
    }
};

window.setUserAsAdmin = async function(email) {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();
        
        if (snapshot.empty) {
            return { success: false, error: "User not found" };
        }
        
        const userDoc = snapshot.docs[0];
        await userDoc.ref.update({ role: 'admin' });
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ============================================
// RECIPE SUBMISSION FUNCTIONS
// ============================================
window.firebaseSubmitRecipe = async function(recipeData) {
    console.log("🔥 Submitting recipe:", recipeData);
    
    try {
        if (!db) {
            throw new Error("Firestore not initialized");
        }
        
        const docRef = await db.collection('pendingRecipes').add({
            ...recipeData,
            submittedBy: auth.currentUser?.uid || null,
            submittedByName: auth.currentUser?.displayName || 'Anonymous',
            submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'pending',
            reviewedBy: null,
            reviewedAt: null,
            comments: []
        });
        
        console.log("✅ Recipe submitted with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("❌ Error submitting recipe:", error);
        return { success: false, error: error.message };
    }
};

window.firebaseGetPendingRecipes = async function() {
    try {
        const snapshot = await db.collection('pendingRecipes')
            .where('status', '==', 'pending')
            .orderBy('submittedAt', 'desc')
            .get();
        
        const recipes = [];
        snapshot.forEach(doc => recipes.push({ id: doc.id, ...doc.data() }));
        return { success: true, data: recipes };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseGetApprovedRecipes = async function() {
    try {
        const snapshot = await db.collection('approvedRecipes')
            .orderBy('createdAt', 'desc')
            .get();
        
        const recipes = [];
        snapshot.forEach(doc => recipes.push({ id: doc.id, ...doc.data() }));
        return { success: true, data: recipes };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseApproveRecipe = async function(pendingId, recipeData) {
    try {
        const approvedRef = await db.collection('approvedRecipes').add({
            ...recipeData,
            approvedAt: firebase.firestore.FieldValue.serverTimestamp(),
            approvedBy: auth.currentUser?.uid || null,
            rating: 0,
            reviewCount: 0
        });
        
        await db.collection('pendingRecipes').doc(pendingId).update({
            status: 'approved',
            reviewedBy: auth.currentUser?.uid || null,
            reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
            approvedId: approvedRef.id
        });
        
        return { success: true, id: approvedRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseRejectRecipe = async function(pendingId, reason) {
    try {
        await db.collection('pendingRecipes').doc(pendingId).update({
            status: 'rejected',
            rejectionReason: reason,
            reviewedBy: auth.currentUser?.uid || null,
            reviewedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

window.firebaseGetUserRecipes = async function(userId) {
    try {
        const snapshot = await db.collection('pendingRecipes')
            .where('submittedBy', '==', userId)
            .orderBy('submittedAt', 'desc')
            .get();
        
        const recipes = [];
        snapshot.forEach(doc => recipes.push({ id: doc.id, ...doc.data() }));
        return { success: true, data: recipes };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ============================================
// REVIEWS & COMMENTS FUNCTIONS
// ============================================
async function updateRecipeAverageRating(recipeId, newRating) {
    try {
        const snapshot = await db.collection('reviews')
            .where('recipeId', '==', recipeId)
            .get();
        
        let totalRating = 0;
        snapshot.forEach(doc => totalRating += doc.data().rating);
        
        totalRating += newRating;
        const averageRating = totalRating / (snapshot.size + 1);
        
        const ratingRef = db.collection('recipeRatings').doc(recipeId.toString());
        const ratingDoc = await ratingRef.get();
        
        if (ratingDoc.exists) {
            await ratingRef.update({
                averageRating: averageRating,
                totalReviews: snapshot.size + 1,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            await ratingRef.set({
                recipeId: recipeId,
                averageRating: averageRating,
                totalReviews: snapshot.size + 1,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        return { success: true };
    } catch (error) {
        console.error("❌ Error updating rating:", error);
        return { success: false, error: error.message };
    }
}

async function recalculateRecipeAverageRating(recipeId) {
    try {
        const snapshot = await db.collection('reviews')
            .where('recipeId', '==', recipeId)
            .get();
        
        if (snapshot.empty) {
            await db.collection('recipeRatings').doc(recipeId.toString()).set({
                recipeId: recipeId,
                averageRating: 0,
                totalReviews: 0,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        }
        
        let totalRating = 0;
        snapshot.forEach(doc => totalRating += doc.data().rating);
        
        const averageRating = totalRating / snapshot.size;
        
        await db.collection('recipeRatings').doc(recipeId.toString()).update({
            averageRating: averageRating,
            totalReviews: snapshot.size,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true };
    } catch (error) {
        console.error("❌ Error recalculating rating:", error);
        return { success: false, error: error.message };
    }
}

window.firebaseGetRecipeReviews = async function(recipeId) {
    try {
        console.log("🔍 Getting reviews for recipe:", recipeId);
        
        // TEMPORARY FIX: Remove orderBy to avoid index issues
        const snapshot = await db.collection('reviews')
            .where('recipeId', '==', recipeId)
            .get(); // Removed .orderBy('createdAt', 'desc')
        
        const reviews = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.username && !data.userName) data.userName = data.username;
            reviews.push({ id: doc.id, ...data });
        });
        
        // Sort manually by createdAt (newest first)
        reviews.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(a.date || 0);
            const dateB = b.createdAt?.toDate?.() || new Date(b.date || 0);
            return dateB - dateA;
        });
        
        console.log(`✅ Found ${reviews.length} reviews for recipe ${recipeId}`);
        return { success: true, data: reviews };
    } catch (error) {
        console.error("❌ Error getting reviews:", error);
        return { success: false, error: error.message };
    }
};

window.firebaseGetRecipeRating = async function(recipeId) {
    try {
        const ratingDoc = await db.collection('recipeRatings')
            .doc(recipeId.toString())
            .get();
        
        if (ratingDoc.exists) {
            return { success: true, data: ratingDoc.data() };
        } else {
            return { success: true, data: { averageRating: 0, totalReviews: 0 } };
        }
    } catch (error) {
        console.error("❌ Error getting rating:", error);
        return { success: false, error: error.message };
    }
};

window.firebaseSubmitReview = async function(recipeId, reviewData) {
    try {
        const user = auth.currentUser;
        if (!user) return { success: false, error: "You must be logged in to review" };
        
        // Create a proper date object
        const now = new Date();
        
        const review = {
            recipeId: recipeId,
            userId: user.uid,
            userName: user.displayName || reviewData.userName || 'Anonymous',
            userEmail: user.email,
            rating: reviewData.rating,
            comment: reviewData.comment,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            date: now.toLocaleString() // Store a readable date string
        };
        
        console.log("📝 Saving review:", review);
        
        const docRef = await db.collection('reviews').add(review);
        console.log("✅ Review saved with ID:", docRef.id);
        
        return { success: true, id: docRef.id, review: review };
    } catch (error) {
        console.error("❌ Error submitting review:", error);
        return { success: false, error: error.message };
    }
};

window.firebaseGetUserReviews = async function(userId) {
    try {
        console.log("🔍 Getting reviews for user:", userId);
        
        // IMPORTANT: No orderBy here to avoid index requirement
        const snapshot = await db.collection('reviews')
            .where('userId', '==', userId)
            .get(); // NO orderBy!
        
        const reviews = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            reviews.push({ id: doc.id, ...data });
        });
        
        // Sort manually in JavaScript instead
        reviews.sort((a, b) => {
            // Handle different date formats
            const dateA = a.createdAt?.toDate?.() || new Date(a.date || 0);
            const dateB = b.createdAt?.toDate?.() || new Date(b.date || 0);
            return dateB - dateA;
        });
        
        console.log(`✅ Found ${reviews.length} reviews for user ${userId}`);
        return { success: true, data: reviews };
    } catch (error) {
        console.error("❌ Error getting user reviews:", error);
        return { success: false, error: error.message };
    }
};

window.firebaseDeleteReview = async function(reviewId, recipeId) {
    try {
        await db.collection('reviews').doc(reviewId).delete();
        await recalculateRecipeAverageRating(recipeId);
        return { success: true };
    } catch (error) {
        console.error("❌ Error deleting review:", error);
        return { success: false, error: error.message };
    }
};

// ============================================
// USER ACTIVITY FUNCTIONS
// ============================================
window.firebaseSaveActivity = async function(userId, activity) {
    try {
        await db.collection('users').doc(userId).collection('activities').add({
            action: activity.action,
            icon: activity.icon,
            time: activity.time || new Date().toLocaleString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("❌ Error saving activity:", error);
        return { success: false, error: error.message };
    }
};

window.firebaseGetUserActivities = async function(userId) {
    try {
        const snapshot = await db.collection('users').doc(userId)
            .collection('activities')
            .orderBy('timestamp', 'desc')
            .limit(100)
            .get();
        
        const activities = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            activities.push({
                id: doc.id,
                action: data.action,
                icon: data.icon,
                time: data.time
            });
        });
        return { success: true, data: activities };
    } catch (error) {
        console.error("❌ Error getting activities:", error);
        return { success: false, error: error.message };
    }
};

// ============================================
// USER PROFILE FUNCTIONS
// ============================================
window.firebaseUpdateUserProfile = async function(userId, profileData) {
    try {
        await db.collection('users').doc(userId).update(profileData);
        return { success: true };
    } catch (error) {
        console.error("❌ Error updating profile:", error);
        return { success: false, error: error.message };
    }
};

// Log that all functions are loaded
console.log("✅ All Firebase functions loaded on window object!");
console.log("✅ window.firebaseSubmitQuestion:", typeof window.firebaseSubmitQuestion === 'function' ? 'YES' : 'NO');
console.log("✅ window.firebaseSubmitRecipe:", typeof window.firebaseSubmitRecipe === 'function' ? 'YES' : 'NO');
