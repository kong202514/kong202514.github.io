console.log(555);

let a = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์ ']


let as = [['อก', 'หลังแขน'], ['ไหล่', 'หน้าแขน'], 'ขา', 'พัก']
let as2 = [

    'อก',[4],
    'หลังแขน' ,[2]   ,
     'ไหล่',[4],
    'หน้าแขน',[3],
    'ขา',
    'พัก']


let w = [

    [['วันอาทิตย์'], ['อก',4], ['หลังแขน',2]],

    [['วันจันทร์'], ['ไหล่',4], ['หน้าแขน',3]],

    [['วันอังคาร'], ['ขา']],

    [['วันพุธ'], ['พัก']],

    [['วันพฤหัสบดี'], ['อก',4], ['หลังแขน',2]],

    [['วันศุกร์'], ['ไหล่',4], ['หน้าแขน',3]],

    [['วันเสาร์'], ['ขา']],
]



 
// รับอ้างถึงปุ่มและผลลัพธ์
const buttons = document.querySelectorAll('button');
const resultDiv = document.getElementById('ms');

// กำหนดการทำงานเมื่อปุ่มถูกคลิก
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // ดึงข้อมูลออกมาจากปุ่มที่ถูกคลิก
        const buttonData = button.textContent;
        
        // แสดงข้อมูลที่ดึงออกมาใน div ผลลัพธ์
        resultDiv.textContent = `ข้อมูลที่ดึงออกมา: ${buttonData}`;
    });
});





// // รับอ้างถึงปุ่มและผลลัพธ์
// const buttons2 = document.querySelectorAll('button');
// const resultDiv2 = document.getElementById('ms');

// // กำหนดการทำงานเมื่อปุ่มถูกคลิก
// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         // ดึงข้อมูลออกมาจากปุ่มที่ถูกคลิก
//         const buttonData = button.textContent;
        
//         // แสดงข้อมูลที่ดึงออกมาใน div ผลลัพธ์
//         resultDiv2.textContent = `ข้อมูลที่ดึงออกมา: ${buttonData}`;
//     });
// });
