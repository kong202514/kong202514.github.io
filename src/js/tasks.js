import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEnXLzs0KErv6Y-W6gGUUglIKL7EwkUpM",
    authDomain: "oopp-39320.firebaseapp.com",
    projectId: "oopp-39320",
    storageBucket: "oopp-39320.appspot.com",
    messagingSenderId: "90209929521",
    appId: "1:90209929521:web:a675cc4cd33fb19aa00810",
    measurementId: "G-QR4F959BW2"
};
const app = initializeApp(firebaseConfig), db = getFirestore(app);

const tasks = [
    "แปรงฟัน",
    "กินข้าว เช้า",
    "อ่านหนังสือ",
    "กินข้าว เที่ยง",
    "ฝึกกินจุ",
    "ขายของ",
    "ออกกำลังกาย",
    "กินข้าว เย็น",


];

function generateDates() {
    const dates = [], startDate = new Date(2025, 0, 1), endDate = new Date(2025, 0, 31);
    while (startDate <= endDate) {
        dates.push(`${startDate.getDate().toString().padStart(2, '0')}/${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate.getFullYear() + 543}`);
        startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
}

function createTableHeader() {
    const tableHeader = document.getElementById('table-header');
    const row = document.createElement('tr');
    row.innerHTML = `<th>วันที่</th>${tasks.map(task => `<th>${task}</th>`).join('')}`;
    tableHeader.appendChild(row);
}

function populateTable() {
    const tableBody = document.getElementById('table-body');
    generateDates().forEach(date => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${date}</td>${tasks.map(task => `<td><input type="checkbox" data-date="${date}" data-task="${task}"></td>`).join('')}`;
        tableBody.appendChild(row);
    });
}

document.getElementById("save-button").addEventListener("click", () => {
    const dataToSave = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        let { date, task } = checkbox.dataset;
        date = date.replace(/\//g, "_");
        if (!dataToSave[date]) dataToSave[date] = {};
        dataToSave[date][task] = { status: checkbox.checked };
    });
    setDoc(doc(db, "tasks", "user_tasks"), dataToSave).then(() => {



        relode();
    });
});

function fetchData() {
    getDoc(doc(db, "tasks", "user_tasks")).then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            Object.keys(data).forEach(date => {
                const formattedDate = date.replace(/_/g, "/");
                Object.keys(data[date]).forEach(task => {
                    const checkbox = document.querySelector(`input[data-date="${formattedDate}"][data-task="${task}"]`);
                    if (checkbox) checkbox.checked = data[date][task].status;
                });
            });
        }
    });
}



function relode() {
    setTimeout(() => {
        location.reload();
    }, 2500);
}
createTableHeader();
populateTable();
fetchData();