import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = (() => {
    // ชั้นที่ 1: คลังเก็บข้อมูลที่ถูก Encode เป็น Base64 และสลับลำดับใหม่ทั้งหมด
    const _0x4f2a = [
        "ZmlyLXR0LTUwYjc4",                                         // [0] projectId
        "QUl6YVN5Q09CaFV0UzNyczZRNUlDY0hVNkhmR2Q5bDhtSGpJbVJR",    // [1] apiKey
        "NzY5MjQwOTI4NDU5",                                         // [2] messagingSenderId
        "ZmlyLXR0LTUwYjc4LmZpcmViYXNlYXBwLmNvbQ==",                // [3] authDomain
        "MTs3NjkyNDA5Mjg0NTk6d2ViOmY0MDNjMjdhZmMzZTRiNjE4NDhiNGU=", // [4] appId
        "ZmlyLXR0LTUwYjc4LmZpcmViYXNlc3RvcmFnZS5hcHA="             // [5] storageBucket
    ];

    // ชั้นที่ 2: ฟังก์ชันถอดรหัส (โครงสร้างมาตรฐานที่คุณเลือกใช้)
    const _0x1122 = (i) => {
        try {
            // ใช้ Native Base64 Decoding
            return atob(_0x4f2a[i]);
        } catch (e) {
            // กรณีฉุกเฉินให้กลับด้านตัวอักษร
            return _0x4f2a[i].split('').reverse().join('');
        }
    };

    // ชั้นที่ 3: ประกอบร่างกลับเป็น Object ให้ Firebase SDK ใช้งาน
    return {
        apiKey: _0x1122(1),           // ดึงค่า AIzaSyCOBh...
        authDomain: _0x1122(3),       // ดึงค่า fir-tt-50b78.firebaseapp...
        projectId: _0x1122(0),       // ดึงค่า fir-tt-50b78
        storageBucket: _0x1122(5),   // ดึงค่า fir-tt-50b78.firebasestorage...
        messagingSenderId: _0x1122(2), // ดึงค่า 769240928459
        appId: _0x1122(4)            // ดึงค่า 1:769240928459:web...
    };
})();

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);