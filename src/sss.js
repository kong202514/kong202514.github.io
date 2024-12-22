// let user_name = [];
// let user_age = [];
// let user_email = [];

// let indexss = 0;

// // ฟังก์ชันย้อนกลับ (Previous)
// function Previous() {
//     if (indexss > 0) {
//         indexss -= 1; // ลดค่า index เมื่อกดปุ่ม "Previous"
//     }
//     navigate(0);
// }

// // ฟังก์ชันไปข้างหน้า (Next)
// function next() {
//     if (indexss < user_name.length - 1) {
//         indexss += 1; // เพิ่มค่า index เมื่อกดปุ่ม "Next"
//     }
//     navigate(0);
// }

// // ฟังก์ชันสำหรับการแสดงข้อมูลและนำข้อมูลไปใช้
// fetch('data.json')
//     .then(response => response.json())
//     .then(data => {

//         data[0].name.push("aaa")
//         console.log(data[0].name);



//         // show_all_data(data);
//         // add_user_name_to_array(data);
//         // get_user_age(data);
//         // get_user_email(data);

//         // console.log(user_name);  // แสดง user_name ใน console


// let currentIndex = 0;

// // ฟังก์ชันในการเปลี่ยนค่าจากการคลิกปุ่ม Next/Previous
// function navigate(direction) {
//     currentIndex += direction;

//     if (currentIndex < 0) {
//         currentIndex = 0;
//     } else if (currentIndex >= user_name.length) {
//         currentIndex = user_name.length - 1;
//     }

//     document.getElementById('name').value = user_name[currentIndex];
//     document.getElementById('age').value = user_age[currentIndex];
//     document.getElementById('email').value = user_email[currentIndex];
// }

// // ฟังก์ชันแสดงข้อมูลในตาราง
// function show_all_data(data) {
//     const tableBody = document.getElementById('data-table').querySelector('tbody');
//     data.forEach(item => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${item.name}</td>
//             <td>${item.age}</td>
//             <td>${item.email}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// // ฟังก์ชันเพิ่มชื่อเข้าใน array
// function add_user_name_to_array(data) {
//     for (let i = 0; i < data.length; i++) {
//         user_name.push(data[i].name);
//     }
//     return user_name;
// }

// // ฟังก์ชันเพิ่มอายุเข้าใน array
// function get_user_age(data) {
//     for (let i = 0; i < data.length; i++) {
//         user_age.push(data[i].age);
//     }
//     return user_age;
// }

// // ฟังก์ชันเพิ่มอีเมลเข้าใน array
// function get_user_email(data) {
//     for (let i = 0; i < data.length; i++) {
//         user_email.push(data[i].email);
//     }
//     return user_email;
// }



//         function saveDataToServer() {
//             const editedData = user_name.map((name, index) => ({
//                 name: name,
//                 age: user_age[index],
//                 email: user_email[index],
//             }));

//             fetch('/save-data', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(editedData),
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         alert('Data saved successfully!');
//                     } else {
//                         alert('Failed to save data.');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                 });
//         }


//     })




const fileData = {
    author: "Maria",
    title: "Date.prototype.toJSON()",
    createdAt: new Date(2019, 3, 15),
    updatedAt: new Date(2020, 6, 26),
};
const response = JSON.stringify(fileData);

// Imagine transmission through network

const data = JSON.parse(response, (key, value) => {
    if (key === "createdAt" || key === "updatedAt") {
        return new Date(value);
    }
    return value;
});

console.log(data);
