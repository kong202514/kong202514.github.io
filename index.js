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

// กำหนดการทำงานเมื่อปุ่มถูกคลิก
all_buttons.forEach(button => {
    button.addEventListener('click', () => {
        // ดึงข้อมูลออกมาจากปุ่มที่ถูกคลิก
        const button_data = button.textContent;

        let a = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์ ']

        if (button_data === 'วันอาทิตย์') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก  หลังแขน  '
        }

        if (button_data === 'วันจันทร์') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ไหล่  หน้าแขน   '
        }
        if (button_data === 'วันอังคาร') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ขา   '
        }
        if (button_data === 'วันพุธ') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + 'พัก'
        }
        if (button_data === 'วันพฤหัสบดี') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก   หลังแขน'
        }

        if (button_data === 'วันศุกร์') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + 'ไหล่  หน้าแขน '
        }
        if (button_data === 'วันเสาร์') {
            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ขา '
        }


    });
});


