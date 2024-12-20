let user_name = [];
let user_age = [];
let user_email = [];

let indexss = 0;

// ฟังก์ชันย้อนกลับ (Previous)
function Previous() {
    if (indexss > 0) {
        indexss -= 1; // ลดค่า index เมื่อกดปุ่ม "Previous"
    }
    navigate(0);
}

// ฟังก์ชันไปข้างหน้า (Next)
function next() {
    if (indexss < user_name.length - 1) {
        indexss += 1; // เพิ่มค่า index เมื่อกดปุ่ม "Next"
    }
    navigate(0);
}

// ฟังก์ชันสำหรับการแสดงข้อมูลและนำข้อมูลไปใช้
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        show_all_data(data);
        add_user_name_to_array(data);
        get_user_age(data);
        get_user_email(data);

        console.log(user_name);  // แสดง user_name ใน console
    })

let currentIndex = 0;

// ฟังก์ชันในการเปลี่ยนค่าจากการคลิกปุ่ม Next/Previous
function navigate(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex >= user_name.length) {
        currentIndex = user_name.length - 1;
    }

    document.getElementById('name').value = user_name[currentIndex];
    document.getElementById('age').value = user_age[currentIndex];
    document.getElementById('email').value = user_email[currentIndex];
}

// ฟังก์ชันแสดงข้อมูลในตาราง
function show_all_data(data) {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// ฟังก์ชันเพิ่มชื่อเข้าใน array
function add_user_name_to_array(data) {
    for (let i = 0; i < data.length; i++) {
        user_name.push(data[i].name);
    }
    return user_name;
}

// ฟังก์ชันเพิ่มอายุเข้าใน array
function get_user_age(data) {
    for (let i = 0; i < data.length; i++) {
        user_age.push(data[i].age);
    }
    return user_age;
}

// ฟังก์ชันเพิ่มอีเมลเข้าใน array
function get_user_email(data) {
    for (let i = 0; i < data.length; i++) {
        user_email.push(data[i].email);
    }
    return user_email;
}


const fs = require('fs');

// ฟังก์ชันสำหรับบันทึกข้อมูลลงในไฟล์ JSON
function saveData(data, filename) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 4), 'utf8');
    console.log(`${filename} has been saved.`);
}

// ตัวอย่างข้อมูลที่ต้องการบันทึก
const data = {
    name: 'wwwww',
    age: 30,
    city: 'Bangkok'
};

// บันทึกข้อมูลลงไฟล์ data.json
saveData(data, 'data.json');
