// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc, // For updating/creating a document with a known ID
    addDoc, // For adding a new document with an auto-generated ID
    deleteDoc,
    collection,
    query,
    onSnapshot, // For real-time updates
    // orderBy is not used as sorting is done in memory to avoid index issues
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// Get references to HTML elements
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const codeLanguageInput = document.getElementById('codeLanguage');
const codeSnippetInput = document.getElementById('codeSnippet');
const codeOutputInput = document.getElementById('codeOutput');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const clearImageBtn = document.getElementById('clearImageBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const notesListDiv = document.getElementById('notesList');
const noNotesMessage = document.getElementById('noNotesMessage');
const loadingSpinner = document.getElementById('loadingSpinner');

// Firebase variables (now simplified and global within this module scope)
let app;
let db;
let appId = null; // Make appId globally accessible within this module

// Internal application state
let notes = [];
let editingNoteId = null;
let currentImageData = null; // Base64 string for the current image


// --- Firebase Initialization ---
window.onload = async function () {
    // Mandated global variables from Canvas environment
    // If __app_id is not defined, use a default for local development.
    appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Assign to global appId
    // If __firebase_config is not defined, use the provided hardcoded config for local development.
    // IMPORTANT: In the Canvas environment, __firebase_config will be provided automatically.
    const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : `{
        "apiKey": "AIzaSyBk8MJFJyDRb0dntOVDzTkCR3ZYoYR7tOM",
        "authDomain": "project-8081640552287860215.firebaseapp.com",
        "projectId": "project-8081640552287860215",
        "storageBucket": "project-8081640552287860215.firebasestorage.app",
        "messagingSenderId": "774249998965",
        "appId": "1:774249998965:web:d6fe740af6805f06d3e63c",
        "measurementId": "G-HCDSG888GX"
    }`);

    if (Object.keys(firebaseConfig).length === 0) {
        console.error("Firebase config is missing or invalid. Please ensure __firebase_config is set.");
        showErrorMessage("เกิดข้อผิดพลาด: การตั้งค่า Firebase ไม่สมบูรณ์");
        return;
    }

    // Initialize Firebase App
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    // Display loading spinner initially
    loadingSpinner.classList.remove('hidden');

    // Setup real-time listener
    await setupRealtimeNotesListener();
};

// --- Firebase Firestore Operations ---

// Setup real-time listener for notes
async function setupRealtimeNotesListener() {
    if (!db || !appId) {
        console.warn("Firestore or App ID not available for listener setup.");
        return;
    }
    try {
        // Define the collection path for public data (no authentication needed)
        // Data is now stored directly under artifacts/{appId}/notes
        const notesCollectionRef = collection(db, `artifacts/${appId}/notes`);
        // Use onSnapshot to get real-time updates.
        onSnapshot(notesCollectionRef, (snapshot) => {
            notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort notes by timestamp, most recent first (in memory)
            notes.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            displayNotes();
            loadingSpinner.classList.add('hidden'); // Hide spinner once notes are loaded
        }, (error) => {
            console.error("Error getting real-time notes:", error);
            showErrorMessage(`เกิดข้อผิดพลาดในการดึงข้อมูล: ${error.message}`);
            loadingSpinner.classList.add('hidden'); // Hide spinner on error
        });
    } catch (error) {
        console.error("Error setting up notes listener:", error);
        showErrorMessage(`เกิดข้อผิดพลาดในการตั้งค่าตัวรับข้อมูล: ${error.message}`);
        loadingSpinner.classList.add('hidden'); // Hide spinner on error
    }
}


// Function to save or update a note in Firestore
async function saveNoteToFirestore(noteData) {
    if (!db || !appId) {
        console.error("Firestore not initialized or App ID missing.");
        showErrorMessage("ไม่สามารถบันทึกความรู้ได้: ยังไม่ได้เชื่อมต่อกับฐานข้อมูลหรือข้อมูลไม่ครบถ้วน");
        return;
    }
    try {
        // Data is now stored directly under artifacts/{appId}/notes
        const notesCollectionRef = collection(db, `artifacts/${appId}/notes`);
        if (noteData.id) {
            // Update existing document
            const docRef = doc(notesCollectionRef, noteData.id);
            await setDoc(docRef, noteData, { merge: true }); // Use merge to avoid overwriting entire doc
            console.log("Note updated successfully with ID:", noteData.id);
        } else {
            // Add new document
            const newDocRef = await addDoc(notesCollectionRef, noteData);
            console.log("New note added successfully with ID:", newDocRef.id);
        }
    } catch (error) {
        console.error("Error saving note to Firestore:", error);
        showErrorMessage(`เกิดข้อผิดพลาดในการบันทึก: ${error.message}`);
    }
}

// Function to delete a note from Firestore
async function deleteNoteFromFirestore(noteId) {
    if (!db || !appId) {
        console.error("Firestore not initialized or App ID missing.");
        showErrorMessage("ไม่สามารถลบความรู้ได้: ยังไม่ได้เชื่อมต่อกับฐานข้อมูลหรือข้อมูลไม่ครบถ้วน");
        return;
    }
    try {
        // Data is now stored directly under artifacts/{appId}/notes
        const notesCollectionRef = collection(db, `artifacts/${appId}/notes`);
        const docRef = doc(notesCollectionRef, noteId);
        await deleteDoc(docRef);
        console.log("Note deleted successfully:", noteId);
    } catch (error) {
        console.error("Error deleting note from Firestore:", error);
        showErrorMessage(`เกิดข้อผิดพลาดในการลบ: ${error.message}`);
    }
}

// --- UI Utility Functions ---

// Utility function to escape HTML for safe display
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Function to show a custom error message box
function showErrorMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    messageBox.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p class="text-lg font-semibold text-red-600 mb-4">ข้อผิดพลาด!</p>
            <p class="text-gray-700 mb-6">${escapeHTML(message)}</p>
            <button onclick="this.closest('.fixed').remove()" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">ปิด</button>
        </div>
    `;
    document.body.appendChild(messageBox);
}

// Function to reset image input and preview state
function resetImageInput() {
    imageInput.value = ''; // Clear file input
    imagePreview.src = '';
    imagePreview.classList.add('hidden');
    clearImageBtn.classList.add('hidden');
    currentImageData = null; // Reset current image data
    console.log("Image input and preview reset.");
}

// Function to clear all input fields
function clearInputFields() {
    noteTitleInput.value = '';
    noteContentInput.value = '';
    codeLanguageInput.value = '';
    codeSnippetInput.value = '';
    codeOutputInput.value = '';
    resetImageInput();
    editingNoteId = null;
    saveNoteBtn.textContent = 'บันทึกความรู้';
    cancelEditBtn.classList.add('hidden');
}

// --- UI Event Handlers ---

// Function to display notes in the UI
function displayNotes() {
    notesListDiv.innerHTML = '<h2 class="text-2xl font-semibold text-[#4A5A6A] mb-4">ความรู้ที่บันทึกไว้</h2>';

    if (notes.length === 0) {
        const message = document.createElement('p');
        message.id = 'noNotesMessage';
        message.className = 'text-[#8D9BAA] text-center italic';
        message.textContent = 'ยังไม่มีความรู้ที่บันทึกไว้';
        notesListDiv.appendChild(message);
    } else {
        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.setAttribute('data-id', note.id);

            const titleElement = document.createElement('h3');
            titleElement.className = 'text-xl font-semibold text-[#007B8C] mb-2';
            titleElement.textContent = note.title;

            const contentElement = document.createElement('p');
            contentElement.className = 'text-[#3A4A5A] text-base mb-4 flex-grow';
            contentElement.textContent = note.content;

            noteCard.appendChild(titleElement);
            noteCard.appendChild(contentElement);

            // Add Code Section if available
            if (note.codeSnippet) {
                const codeSectionTitle = document.createElement('h3');
                codeSectionTitle.className = 'text-lg font-medium text-[#4A5A6A] mt-4 mb-1';
                codeSectionTitle.innerHTML = `โค้ด: <span class="text-[#00A3B5]">${note.language ? `(${escapeHTML(note.language)})` : ''}</span>`;
                noteCard.appendChild(codeSectionTitle);

                const codePre = document.createElement('pre');
                codePre.className = 'whitespace-pre-wrap break-words';
                const codeBlock = document.createElement('code');
                codeBlock.className = `language-${note.language || 'text'}`;
                codeBlock.textContent = note.codeSnippet;
                codePre.appendChild(codeBlock);
                noteCard.appendChild(codePre);
            }

            // Add Code Output Section if available
            if (note.codeOutput) {
                const outputSectionTitle = document.createElement('h3');
                outputSectionTitle.className = 'text-lg font-medium text-[#4A5A6A] mt-4 mb-1';
                outputSectionTitle.textContent = 'ผลลัพธ์/คำอธิบาย:';
                noteCard.appendChild(outputSectionTitle);

                const outputDiv = document.createElement('div');
                outputDiv.className = 'bg-[#F2F6F8] p-3 rounded-lg text-sm font-mono whitespace-pre-wrap break-words text-[#3A4A5A]';
                outputDiv.textContent = note.codeOutput;
                noteCard.appendChild(outputDiv);
            }

            // Add Image Section if available
            if (note.imageSrc) {
                const imageSectionTitle = document.createElement('h3');
                imageSectionTitle.className = 'text-lg font-medium text-[#4A5A6A] mt-4 mb-1';
                imageSectionTitle.textContent = 'รูปภาพที่บันทึกไว้:';
                noteCard.appendChild(imageSectionTitle);

                const imageContainer = document.createElement('div');
                imageContainer.className = 'mt-2 mb-2';
                const imgElement = document.createElement('img');
                imgElement.className = 'max-w-full h-auto rounded-lg border border-gray-200 shadow-md';
                imgElement.src = note.imageSrc;
                imgElement.alt = 'Captured Image';
                imgElement.onerror = () => { imgElement.src = 'https://placehold.co/150x100/CCCCCC/333333?text=Image+Error'; imgElement.title = 'Failed to load image'; }; // Fallback
                noteCard.appendChild(imgElement);
            }

            const timestampElement = document.createElement('p');
            timestampElement.className = 'text-[#8D9BAA] text-sm mt-2';
            timestampElement.textContent = `บันทึกเมื่อ: ${new Date(note.timestamp).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}`;
            noteCard.appendChild(timestampElement);

            const actionButtonsDiv = document.createElement('div');
            actionButtonsDiv.className = 'action-buttons';

            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.textContent = 'แก้ไข';
            editButton.onclick = () => editNote(note.id);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'ลบ';
            deleteButton.onclick = () => confirmDelete(note.id); // Call custom confirmation

            actionButtonsDiv.appendChild(editButton);
            actionButtonsDiv.appendChild(deleteButton);
            noteCard.appendChild(actionButtonsDiv);

            notesListDiv.appendChild(noteCard);
        });
    }
}

// Custom confirmation dialog for deletion
function confirmDelete(idToDelete) {
    const confirmBox = document.createElement('div');
    confirmBox.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    confirmBox.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center custom-confirm-box">
            <p class="text-lg font-semibold text-[#3A4A5A] mb-4">ยืนยันการลบ?</p>
            <p class="text-[#4A5A6A] mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบความรู้นี้?</p>
            <div class="flex justify-center space-x-4">
                <button id="confirmDeleteBtn" class="btn-delete-confirm">ลบ</button>
                <button id="cancelDeleteBtn" class="btn-cancel-confirm">ยกเลิก</button>
            </div>
        </div>
    `;
    notesListDiv.appendChild(confirmBox); // Append to body to ensure it's on top

    document.getElementById('confirmDeleteBtn').onclick = () => {
        deleteNoteFromFirestore(idToDelete);
        confirmBox.remove();
        if (editingNoteId === idToDelete) {
            clearInputFields(); // Clear fields if deleting the one being edited
        }
    };
    document.getElementById('cancelDeleteBtn').onclick = () => {
        confirmBox.remove();
    };
}


// Image input change listener
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            clearImageBtn.classList.remove('hidden');
            currentImageData = e.target.result; // Store Base64 string
        };
        reader.readAsDataURL(file); // Read file as Base64 data URL
    } else {
        resetImageInput();
    }
});

// Clear image button listener
clearImageBtn.addEventListener('click', resetImageInput);

// Paste event listener for images
document.addEventListener('paste', (event) => {
    console.log("Paste event fired."); // Log when paste event happens
    const items = event.clipboardData.items;
    let imageFound = false;
    for (let i = 0; i < items.length; i++) {
        console.log(`Item ${i}: type = ${items[i].type}`); // Log item type
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
                console.log("Image file found in clipboard:", file.name, file.size, file.type); // Log image file details
                resetImageInput(); // Clear any existing image before processing new one

                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log("FileReader loaded image:", e.target.result.substring(0, 50) + "..."); // Log part of Base64 data
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                    // Ensure the image element is visible by setting display style directly
                    imagePreview.style.display = 'block';
                    clearImageBtn.classList.remove('hidden');
                    currentImageData = e.target.result; // Store Base64 string
                };
                reader.onerror = (e) => {
                    console.error("FileReader error:", e);
                    showErrorMessage("เกิดข้อผิดพลาดในการโหลดรูปภาพจากคลิปบอร์ด");
                };
                reader.readAsDataURL(file); // Read the image file as a data URL

                imageFound = true;
                event.preventDefault(); // Prevent default paste behavior (e.g., pasting binary as text)
                break; // Stop after finding the first image
            } else {
                console.log("File object is null, even though type is image.");
            }
        }
    }
    if (!imageFound) {
        console.log("No image found in clipboard items.");
    }
});

// Save/Update Note Button Listener
saveNoteBtn.addEventListener('click', async () => {
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    const language = codeLanguageInput.value.trim();
    const codeSnippet = codeSnippetInput.value.trim();
    const codeOutput = codeOutputInput.value.trim();
    const imageSrc = currentImageData;

    if (title && content) {
        const noteData = {
            title: title,
            content: content,
            language: language,
            codeSnippet: codeSnippet,
            codeOutput: codeOutput,
            imageSrc: imageSrc,
            timestamp: Date.now() // Always update timestamp on save/update for sorting
        };

        if (editingNoteId) {
            noteData.id = editingNoteId; // Add ID for updating existing doc
            await saveNoteToFirestore(noteData); // Call update function
        } else {
            await saveNoteToFirestore(noteData); // Call add function
        }
        clearInputFields();
    } else {
        showErrorMessage("โปรดกรอกหัวข้อและเนื้อหาความรู้");
    }
});

// Function to handle editing a note (populating form fields)
function editNote(idToEdit) {
    const noteToEdit = notes.find(note => note.id === idToEdit);
    if (noteToEdit) {
        noteTitleInput.value = noteToEdit.title;
        noteContentInput.value = noteToEdit.content;
        codeLanguageInput.value = noteToEdit.language || '';
        codeSnippetInput.value = noteToEdit.codeSnippet || '';
        codeOutputInput.value = noteToEdit.codeOutput || '';

        if (noteToEdit.imageSrc) {
            imagePreview.src = noteToEdit.imageSrc;
            imagePreview.classList.remove('hidden');
            // Ensure display style is block when showing image
            imagePreview.style.display = 'block';
            clearImageBtn.classList.remove('hidden');
            currentImageData = noteToEdit.imageSrc;
        } else {
            resetImageInput();
        }

        editingNoteId = idToEdit;
        saveNoteBtn.textContent = 'อัปเดตความรู้';
        cancelEditBtn.classList.remove('hidden');
        noteTitleInput.focus();
    }
}

// Cancel Edit Button Listener
cancelEditBtn.addEventListener('click', clearInputFields);
