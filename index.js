console.log(555);




let as = [['อก', 'หลังแขน'], ['ไหล่', 'หน้าแขน'], 'ขา', 'พัก']
let as2 = [

    'อก', [4],
    'หลังแขน', [2],
    'ไหล่', [4],
    'หน้าแขน', [3],
    'ขา',
    'พัก']


let w = [

    [['วันอาทิตย์'], ['อก', 4], ['หลังแขน', 2]],

    [['วันจันทร์'], ['ไหล่', 4], ['หน้าแขน', 3]],

    [['วันอังคาร'], ['ขา']],

    [['วันพุธ'], ['พัก']],

    [['วันพฤหัสบดี'], ['อก', 4], ['หลังแขน', 2]],

    [['วันศุกร์'], ['ไหล่', 4], ['หน้าแขน', 3]],

    [['วันเสาร์'], ['ขา']],
]




// รับอ้างถึงปุ่มและผลลัพธ์
const all_buttons = document.querySelectorAll('button');
const text_output = document.getElementById('ms');
const bt0 = document.getElementById('bt0');
const bt1 = document.getElementById('bt1');
// khhfrgthghfhgfg

function ss() {

    bt0.style.display = "none"
    bt1.style.display = "none"
}


function aa() {

    bt0.style.display = "show"
    bt1.style.display = "show"
}

// กำหนดการทำงานเมื่อปุ่มถูกคลิก
all_buttons.forEach(button => {
    button.addEventListener('click', () => {
        // ดึงข้อมูลออกมาจากปุ่มที่ถูกคลิก
        const button_data = button.textContent;

        let a = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์ ']





        // if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // } else if (condition) {

        // }





















        if (button_data === 'วันอาทิตย์') {

            bt0.textContent = "อก "
            bt1.textContent = "หลังแขน "
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก  หลังแขน  '
            return
        }

        if (button_data === 'วันจันทร์') {


            bt0.textContent = "ไหล่ "
            bt1.textContent = "หน้าแขน "

            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ไหล่  หน้าแขน   '
            return

        }
        if (button_data === 'วันอังคาร') {


            bt0.textContent = "ขา "

            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ขา   '
            return

        }
        if (button_data === 'วันพุธ') {


            bt0.textContent = "พัก "
            bt1.textContent = "พัก "
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + 'พัก'

        }
        if (button_data === 'วันพฤหัสบดี') {





            bt0.textContent = "อก "
            bt1.textContent = "หลังแขน "
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก   หลังแขน'
            return

        }

        if (button_data === 'วันศุกร์') {
            bt0.textContent = "ไหล่ "
            bt1.textContent = "หน้าแขน "
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + 'ไหล่  หน้าแขน '
            return

        }
        if (button_data === 'วันเสาร์') {


            bt0.textContent = "ขา "
            bt1.textContent = "  "
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ขา '
            return

        }


    });
});


