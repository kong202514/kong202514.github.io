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

const imgs = document.getElementsByTagName("img");

let c = [
    '../img/อก/1.png',
    '../img/อก/2.png',
    '../img/อก/3.png',
    '../img/อก/4.png'
]
let sd = [
    '../img/ไหล่/1.png',
    '../img/ไหล่/2.png',
    '../img/ไหล่/3.png',
    '../img/ไหล่/4.png'
]
let df = [
    '../img/df/1.PNG',
    '../img/df/2.PNG',
    '../img/df/3.PNG',
    '../img/df/4.PNG'
]
let ba = [
    '../img/หลังแขน/1.png',
    '../img/หลังแขน/2.png',
    '../img/หลังแขน/3.png',
    df[3]

]
let fa = [
    '../img/หน้าแขน/1.png',
    '../img/หน้าแขน/2.png',
    df[2],
    df[3]

]




// กำหนดการทำงานเมื่อปุ่มถูกคลิก
all_buttons.forEach(button => {

    button.addEventListener('click', () => {

        // ดึงข้อมูลออกมาจากปุ่มที่ถูกคลิก
        const button_data = button.textContent;



        if (button_data === 'วันอาทิตย์') {
            bt0.textContent = "อก "
            bt1.textContent = "หลังแขน "



            bt0.addEventListener('click', (a) => {
                if (a = 'อก') {
                    imgs[0].src = c[0]
                    imgs[1].src = c[1]
                    imgs[2].src = c[2]
                    imgs[3].src = c[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก   555555   '
                }
            })

            bt1.addEventListener('click', (a) => {
                if (a = 'หลังแขน') {
                    imgs[0].src = ba[0]
                    imgs[1].src = ba[1]
                    imgs[2].src = ba[2]
                    imgs[3].src = ba[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' หลังแขน   555555   '
                }
            })
            // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' หลังแขน  หลังแขน  '

            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก  หลังแขน  '
            bt0.addEventListener('click', function ss() {
                if (bt0 === "อก") {
                    text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก  5555555     '

                }

            })


        }


        if (button_data === 'วันจันทร์') {
            bt0.textContent = "ไหล่ "
            bt1.textContent = "หน้าแขน "

            bt0.addEventListener('click', (a) => {
                if (a = 'ไหล่') {
                    imgs[0].src = sd[0]
                    imgs[1].src = sd[1]
                    imgs[2].src = sd[2]
                    imgs[3].src = sd[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก       '
                }
            })

            bt1.addEventListener('click', (a) => {
                if (a = 'หน้าแขน') {
                    imgs[0].src = fa[0]
                    imgs[1].src = fa[1]
                    imgs[2].src = fa[2]
                    imgs[3].src = fa[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' หลังแขน       '
                }
            })

            // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ไหล่  หน้าแขน   '

        }

        if (button_data === 'วันอังคาร') {
            bt0.textContent = "ขา "
            bt1.textContent = "  "

            // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ขา   '
        }

        if (button_data === 'วันพุธ') {
            bt0.textContent = "พัก "
            bt1.textContent = "พัก "
            // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + 'พัก'
        }

        if (button_data === 'วันพฤหัสบดี') {
            bt0.textContent = "อก "
            bt1.textContent = "หลังแขน "

            bt0.addEventListener('click', (a) => {
                if (a = 'อก') {
                    imgs[0].src = c[0]
                    imgs[1].src = c[1]
                    imgs[2].src = c[2]
                    imgs[3].src = c[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก   555555   '
                }
            })

            bt1.addEventListener('click', (a) => {
                if (a = 'หลังแขน') {
                    imgs[0].src = ba[0]
                    imgs[1].src = ba[1]
                    imgs[2].src = ba[2]
                    imgs[3].src = ba[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' หลังแขน   555555   '
                }
            })

            // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก   หลังแขน'
        }

        if (button_data === 'วันศุกร์') {
            bt0.textContent = "ไหล่ "
            bt1.textContent = "หน้าแขน "

            bt0.addEventListener('click', (a) => {
                if (a = 'ไหล่') {
                    imgs[0].src = sd[0]
                    imgs[1].src = sd[1]
                    imgs[2].src = sd[2]
                    imgs[3].src = sd[3]
                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' อก   555555   '
                }
            })

            bt1.addEventListener('click', (a) => {
                if (a = 'หน้าแขน') {
                    imgs[0].src = fa[0]
                    imgs[1].src = fa[1]
                    imgs[2].src = fa[2]
                    imgs[3].src = fa[3]

                    // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' หลังแขน   555555   '
                }
            })

            text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + 'ไหล่  หน้าแขน '
        }

        if (button_data === 'วันเสาร์') {
            bt0.textContent = "ขา "
 

            bt1.textContent = ""

            // text_output.textContent = 'ข้อมูลที่ดึงออกมา:' + ' ขา '//
        }

    });

});


