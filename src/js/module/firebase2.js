import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEnXLzs0KErv6Y-W6gGUUglIKL7EwkUpM",
    authDomain: "oopp-39320.firebaseapp.com",
    projectId: "oopp-39320",
    storageBucket: "oopp-39320.appspot.com",
    messagingSenderId: "90209929521",
    appId: "1:90209929521:web:a675cc4cd33fb19aa00810",
    measurementId: "G-QR4F959BW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. สร้าง div container สำหรับ checkbox
const container = document.createElement('div');
container.classList.add('h1');

// 2. สร้างข้อมูลรายการ checkbox
const tasks = [
    { id: 'flexSwitchCheckDefault1', label: 'อ่านหนังสือ' },
    { id: 'flexSwitchCheckDefault2', label: 'ออกกำลังกาย 1' },
    { id: 'flexSwitchCheckDefault3', label: 'ขายของ 1' }
];

// 3. สร้าง checkbox สำหรับแต่ละรายการใน tasks
tasks.forEach(task => {
    // สร้าง div ที่บรรจุ checkbox
    const formCheckDiv = document.createElement('div');
    formCheckDiv.classList.add('form-check', 'form-switch');

    // สร้าง input checkbox
    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.type = 'checkbox';
    checkbox.id = task.id;

    // สร้าง label
    const label = document.createElement('label');
    label.classList.add('form-check-label');
    label.setAttribute('for', task.id);
    label.textContent = task.label;

    // เพิ่ม checkbox และ label ลงใน div
    formCheckDiv.appendChild(checkbox);
    formCheckDiv.appendChild(label);

    // เพิ่ม div ของ checkbox ลงใน container
    container.appendChild(formCheckDiv);
});

// 4. สร้างปุ่มและข้อความแสดงสถานะ
const button = document.createElement('button');
button.id = 'btn';
button.textContent = 'บันทึกสถานะ';

const statusParagraph = document.createElement('p');
statusParagraph.id = 'status';

// 5. เพิ่มทุกอย่างลงใน body หรือ element ที่ต้องการ
document.body.appendChild(container);
document.body.appendChild(button);
document.body.appendChild(statusParagraph);

// 6. การจัดการกับการคลิกปุ่ม (ต้องการใช้ async/await สำหรับการดึงข้อมูลจาก Firestore)
async function checkStatus() {
    const checkbox1 = document.getElementById('flexSwitchCheckDefault1');
    const checkbox2 = document.getElementById('flexSwitchCheckDefault2');
    const checkbox3 = document.getElementById('flexSwitchCheckDefault3');

    // สร้างอ็อบเจ็กต์ routines เพื่อจัดเก็บสถานะของ checkbox
    const routines = {
        day: " 1/12/2567",
        "อ่านหนังสือ": checkbox1.checked,
        "ออกกำลังกาย": checkbox2.checked,
        "ขายของ": checkbox3.checked
    };

    // เพิ่มข้อมูลลงใน Firestore
    try {
        await addDoc(collection(db, "test"), routines);
        console.log("ข้อมูลถูกบันทึกเรียบร้อยแล้ว:", routines);
    } catch (error) {
        console.log(error);
        statusParagraph.innerHTML = "เกิดข้อผิดพลาดในการบันทึกข้อมูล:" + error.message;
    }
}

// 7. เพิ่ม event listener สำหรับปุ่ม
button.addEventListener('click', checkStatus);

// ฟังก์ชันสำหรับดึงข้อมูลจาก Firestore (อัปเดตสถานะจากฐานข้อมูล)
async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "test"));
    const routines = [];

    querySnapshot.forEach((doc) => {
        routines.push(doc.data());
    });

    if (routines.length > 0) {
        statusParagraph.innerHTML = routines.map(routine => `
        วัน: ${routine.day}<br>
        อ่านหนังสือ: ${routine["อ่านหนังสือ"] ? 'ทำแล้ว' : 'ยังไม่ทำ'}<br>
        ออกกำลังกาย: ${routine["ออกกำลังกาย"] ? 'ทำแล้ว' : 'ยังไม่ทำ'}<br>
        ขายของ: ${routine["ขายของ"] ? 'ทำแล้ว' : 'ยังไม่ทำ'}<br><br>
    `).join('');
    }

}

// เรียกฟังก์ชัน fetchData เมื่อโหลดหน้า
fetchData();
