// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs ,addDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";



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
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig)
    , db = getFirestore(app)

let t = document.querySelector(".ms")
const form = document.getElementById("addForm")

async function getEmployees(db) {
    const empCol = collection(db, 'users')
    const empSnapshot = await getDocs(empCol)
    return empSnapshot
}
const data = await getEmployees(db)

 



function showData(users) {

    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    const deleteCol = row.insertCell(2)
    nameCol.innerHTML = users.data().name
    ageCol.innerHTML = users.data().age

    console.log(users.data().name + "  =====  " + users.data().age);
}


//ดึงกลุ่ม document
data.forEach((users) => {
    showData(users)
     
})


// //ดึงข้อมูลจากแบบฟอร์ม
// form.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     addDoc(collection(db,'users'),{
//         name:form.name.value,
//         age:form.age.value
//     })
//     form.name.value=""
//     form.age.value=""
//     alert("บันทึกข้อมูลเรียบร้อย")


// })



//////////////////

 