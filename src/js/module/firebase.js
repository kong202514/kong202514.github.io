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
    , users = await get_data_from_db('users') // 1
    , routine = await get_data_from_db('test') //0
    , form = document.getElementById("addForm")
    , user_name = []
    , user_age = []


function get_data_from_db(db_in) {
    const user_Col = collection(db, db_in)
    const user_Snapshot = getDocs(user_Col)
    return user_Snapshot
}



// console.log(data);

users.forEach((user) => {
    user_name.push(showData_user_name(user));
    user_age.push(showData_user_age(user));
    // console.log(user_name);

    show_all_Data(user);

});

routine.forEach((user) => {
    user_name.push(showData_user_name(user));
    user_age.push(showData_user_age(user));
    // console.log(user_name);

    show_all_Data(user);

});



// console.log(user_name[21]);
// console.log(user_age);



function showData_user_name(users) {
    return users.data().name


}

function show_all_Data(users) {
    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    nameCol.innerHTML = users.data().name
    ageCol.innerHTML = users.data().age

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

    add_data("users", name, age);
    clear_data();
    relode();



})
function add_data(db_name, name, age) {
    addDoc(collection(db, db_name), { name, age });
}

function relode() {
    setTimeout(() => {
        location.reload();
    }, 2500);
}

function clear_data() {
    form.name.value = "";
    form.age.value = "";
}

