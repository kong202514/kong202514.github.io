let user_name_array = []



var container = document.getElementById('data-container');
var text_output = document.getElementById('text_output');
var htmlContent = ''; // ตัวแปรสำหรับเก็บ HTML string


let html_tag = {
    div_open: '<div class="data-item">',
    br: "<br>",
    div_close: '</div>'
},
    fields = [
        [{ label: 'ชื่อ', key: 'name' }, { label: 'อายุ', key: 'age' }],
        [{ label: 'id', key: 'id' }, { label: 'price', key: 'price' }]
    ]


// ฟังก์ชันสำหรับสร้าง HTML สำหรับแต่ละบุคคล
function create_Person_HTML(person, fields) {
    // เปิดแท็ก <div>
    let personHTML = html_tag.div_open;


    // วนลูปผ่านแต่ละฟิลด์เพื่อสร้างข้อความ HTML
    personHTML = qqq(fields, person, personHTML);

    // ปิดแท็ก <div>
    personHTML += html_tag.div_close;

    return personHTML;
}



function qqq(fields, person, personHTML) {
    fields.forEach(field => {
        const fieldLabel = field.label;
        const fieldValue = person[field.key];
        personHTML += `${fieldLabel}: ${fieldValue}${html_tag.br}`;
    });
    return personHTML;
}

function get_user(data) {
    data.user.forEach(person => {
        htmlContent += create_Person_HTML(person, fields[0]);
    });
    container.innerHTML = htmlContent;

}


function get_item(data) {
    data.item.forEach(item => {
        htmlContent += create_Person_HTML(item, fields[1]);
    });
    container.innerHTML = htmlContent;
}

// ดึงข้อมูลจากไฟล์ JSON
fetch('data.json')
    .then(get_data_to_json()) // แปลงข้อมูลเป็น JSON
    .then(main()
    )




function get_data_to_json() {
    return response => response.json();
}

function main() {
    return (data) => {
        get_user(data);
        get_item(data);
        newFunction2(data);
        
    };
}

function newFunction2(data) {
    user_name_array.push(
        data.user[0].name,
        data.user[1].name,
        data.user[2].name
    );
    text_output.innerHTML += user_name_array;
}

