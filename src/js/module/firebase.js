// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
let app = initializeApp(firebaseConfig)
    , db = getFirestore(app)
    , data = await get_user_(db)
    , form = document.getElementById("addForm")
    , user_name = []
    , user_age = []


function get_user_(db) {
    const user_Col = collection(db, 'users')
    const user_Snapshot = getDocs(user_Col)
    return user_Snapshot
}


data.forEach((user) => {
    user_name.push(showData_user_name(user));
    user_age.push(showData_user_age(user));
    showData(user);
});




console.log(user_name);
console.log(user_age);



function showData_user_name(users) {
    return users.data().name


}

function showData(users) {



    const row = table.insertRow(-1)

    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)




    nameCol.innerHTML = users.data().name
    ageCol.innerHTML = users.data().age

    // console.log(users.data().name + "  =   age " + users.data().age);






}
function showData_user_age(users) {

    return users.data().age

}




//ดึงข้อมูลจากแบบฟอร์ม
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let name = form.name.value
        , age = Number(form.age.value)


    if (name === "") {
        alert('name nooooo');
    } else if (age === "") {
        alert('age nooooo');
    } else if (isNaN(age)) {
        alert('age isNaN');
        return;
    }

    // addDoc(collection(db, 'users'), {
    //     name: name,
    //     age: age
    // })


    await addDoc(collection(db, 'users'), { name, age });

    clear_data();

    setTimeout(() => {
        location.reload();
    }, 2500);










})

function clear_data() {
    form.name.value = "";
    form.age.value = "";
}

