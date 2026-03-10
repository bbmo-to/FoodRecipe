// 03 - FIREBASE - FUNCTIONS.js

// ============================================
// FIREBASE AUTHENTICATION FUNCTIONS
// ============================================

// Sign Up
async function firebaseSignUp(name, email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update profile with name
        await user.updateProfile({
            displayName: name
        });
        
        // Create user document in Firestore
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
}

// Sign In
async function firebaseSignIn(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Get user data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        return { 
            success: true, 
            user: {
                uid: user.uid,
                name: user.displayName || userData.name,
                email: user.email,
                ...userData
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign Out
async function firebaseSignOut() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// SAVED RECIPES FUNCTIONS
// ============================================

// Save recipe
async function firebaseSaveRecipe(userId, recipeId, recipeName) {
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
}

// Remove saved recipe
async function firebaseRemoveSavedRecipe(userId, recipeId) {
    try {
        await db.collection('users').doc(userId)
            .collection('savedRecipes').doc(recipeId.toString())
            .delete();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get saved recipes
async function firebaseGetSavedRecipes(userId) {
    try {
        const snapshot = await db.collection('users').doc(userId)
            .collection('savedRecipes').get();
        
        const savedIds = [];
        snapshot.forEach(doc => {
            savedIds.push(parseInt(doc.id));
        });
        
        return { success: true, data: savedIds };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// QUESTIONS & ANSWERS FUNCTIONS
// ============================================

// Submit a question
async function firebaseSubmitQuestion(userName, userEmail, question) {
    console.log("🔥 Firebase submit function CALLED", { userName, userEmail, question }); // ADD THIS
    try {
        const docRef = await db.collection('questions').add({
            name: userName,
            email: userEmail,
            question: question,
            date: new Date().toLocaleString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'pending',
            replies: [],
            userId: auth.currentUser ? auth.currentUser.uid : null
        });
        
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get all questions
async function firebaseGetQuestions() {
    try {
        const snapshot = await db.collection('questions')
            .orderBy('timestamp', 'desc')
            .get();
        
        const questions = [];
        snapshot.forEach(doc => {
            questions.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return { success: true, data: questions };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Add reply to a question (for support team)
// REPLACE with this fixed version
async function firebaseAddReply(questionId, replyMessage) {
    console.log("📝 Adding reply:", { questionId, replyMessage });
    
    try {
        // Get the question document
        const questionRef = db.collection('questions').doc(questionId);
        const questionDoc = await questionRef.get();
        
        if (!questionDoc.exists) {
            console.log("❌ Question not found");
            return { success: false, error: "Question not found" };
        }
        
        const question = questionDoc.data();
        const replies = question.replies || [];
        
        // Add new reply
        const newReply = {
            message: replyMessage,
            date: new Date().toLocaleString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            supportName: auth.currentUser?.displayName || 'Support Team'
        };
        
        replies.push(newReply);
        
        // IMPORTANT: Update BOTH replies AND status
        await questionRef.update({
            replies: replies,
            status: 'answered'  // This changes from 'pending' to 'answered'
        });
        
        console.log("✅ Reply added, status changed to 'answered'");
        
        // Verify the update
        const verifyDoc = await questionRef.get();
        console.log("📝 Updated status:", verifyDoc.data().status);
        
        return { success: true };
    } catch (error) {
        console.error("❌ Reply error:", error);
        return { success: false, error: error.message };
    }
}

// ============================================
// REPLY TO QUESTIONS (Admin function)
// ============================================

// Add reply to a question
// REPLACE with this fixed version
async function firebaseAddReply(questionId, replyMessage) {
    console.log("📝 Adding reply:", { questionId, replyMessage }); // Debug
    
    try {
        // Get the question document
        const questionRef = db.collection('questions').doc(questionId);
        const questionDoc = await questionRef.get();
        
        if (!questionDoc.exists) {
            console.log("❌ Question not found");
            return { success: false, error: "Question not found" };
        }
        
        const question = questionDoc.data();
        const replies = question.replies || [];
        
        // Add new reply with CORRECT format
        const newReply = {
            message: replyMessage,                    // ← This was missing!
            date: new Date().toLocaleString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            supportName: auth.currentUser?.displayName || 'Support Team'
        };
        
        console.log("📝 New reply object:", newReply); // Debug
        
        replies.push(newReply);
        
        // Update document with new reply and change status to answered
        await questionRef.update({
            replies: replies,
            status: 'answered'                         // ← This changes to answered
        });
        
        console.log("✅ Reply added successfully");
        return { success: true };
    } catch (error) {
        console.error("❌ Reply error:", error);
        return { success: false, error: error.message };
    }
}

// Check if current user is admin (you can set this)
async function isUserAdmin() {
    if (!auth.currentUser) return false;
    
    try {
        const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
        const userData = userDoc.data();
        return userData?.role === 'admin' || false;
    } catch (error) {
        return false;
    }
}

// Set user as admin (run this once for your account)
async function setUserAsAdmin(email) {
    try {
        // Find user by email
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();
        
        if (snapshot.empty) {
            return { success: false, error: "User not found" };
        }
        
        const userDoc = snapshot.docs[0];
        await userDoc.ref.update({
            role: 'admin'
        });
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}