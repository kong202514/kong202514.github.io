import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
const firebaseConfig = (() => {
    // ชั้นที่ 1: คลังเก็บข้อมูลที่ถูก Encode เป็น Base64 และสลับลำดับใหม่ทั้งหมด
    const _0x4f2a = [
        "b29wcC0zOTMyMC5maXJlYmFzZWFwcC5jb20=",                   
        "MTo5MDIwOTkyOTUyMTp3ZWI6YTY3NWNjNGNkMzNmYjE5YWEwMDgxMA==",
        "Ry1RUjRGOTU5Qlcy",                                        
        "Ym9wcC0zOTMyMA==",                                        
        "QUl6YVN5QkVuWEx6czBLRXJ2NlktVzZnR1VVZ2xJS0w3RXdrVXBN",   
        "OTAyMDk5Mjk1MjE=",                                        
        "b29wcC0zOTMyMC5hcHBzcG90LmNvbQ=="                        
    ];

    // ชั้นที่ 2: ฟังก์ชันถอดรหัส Base64 (โครงสร้างที่คุณกำหนด)
    const _0x1122 = (i) => {
        try {
            return atob(_0x4f2a[i]);
        } catch (e) {
            // สำรองกรณีเกิดข้อผิดพลาด
            return _0x4f2a[i].split('').reverse().join('');
        }
    };

    // ชั้นที่ 3: ประกอบร่างกลับเป็น Object ให้ Firebase SDK เรียกใช้
    return {
        apiKey: _0x1122(4),           
        authDomain: _0x1122(0),       
        projectId: _0x1122(3),       
        storageBucket: _0x1122(6),   
        messagingSenderId: _0x1122(5), 
        appId: _0x1122(1),            
        measurementId: _0x1122(2)     
    };
})();


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

