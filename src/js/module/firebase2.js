
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBEnXLzs0KErv6Y-W6gGUUglIKL7EwkUpM",
    authDomain: "oopp-39320.firebaseapp.com",
    projectId: "oopp-39320",
    storageBucket: "oopp-39320.appspot.com",
    messagingSenderId: "90209929521",
    appId: "1:90209929521:web:a675cc4cd33fb19aa00810",
    measurementId: "G-QR4F959BW2"
};



let app = initializeApp(firebaseConfig)
    , db = getFirestore(app)
    // , data = await get_user_(db) //0

    , routine = await get_data_from_db('test') //0
    , form = document.getElementById("addForm")
    , btn = document.getElementById("btn")
    , y = []
    , x = []


function get_data_from_db(db_in) {
    const user_Col = collection(db, db_in)
    const user_Snapshot = getDocs(user_Col)
    return user_Snapshot
}

let routines = {
    day: "31/5/2566",
    อ่านหนังสือ: true,
    ออกกำลังกาย: true,
    ขายของ: false
}
// add_data("test", name, age);

btn.addEventListener("click", checkStatus)

var status = document.getElementById("status");
function checkStatus() {
    var checkbox = document.querySelectorAll("#flexSwitchCheckDefault");
    routines.อ่านหนังสือ = checkbox[0].checked;
    routines.ออกกำลังกาย = checkbox[1].checked;
    routines.ขายของ = checkbox[2].checked;
    console.log(routines);
    addDoc(collection(db, "test"), { routines });
}
// console.log(data);



routine.forEach((data) => {
    y.push(data.data())
         
     
}); 

let z = JSON.stringify(y);

x = JSON.parse(z); 

console.log(x[0].routines.อ่านหนังสือ);
 
status.innerHTML = x.map((data, index) => {
    return `Day: ${data.routines.day}<br>
    อ่านหนังสือ: ${data.routines.อ่านหนังสือ}<br>
    ออกกำลังกาย: ${data.routines.ออกกำลังกาย}<br>
    ขายของ: ${data.routines.ขายของ}<br>
    <hr>`;
}).join("");




// console.log(y[0].routine.day);







