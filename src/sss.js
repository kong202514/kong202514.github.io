let user_name_array = [];

var container = document.getElementById('data-container');
var text_output = document.getElementById('text_output');
var htmlContent = '';


// ดึงข้อมูลจากไฟล์ JSON
fetch('data.json')
    .then(parseJSONResponse()) // แปลงข้อมูลเป็น JSON
    .then(processData());

let html_tag = {
    div_open: '<div class="data-item">',
    br: "<br>",
    div_close: '</div>'
},
    fields = [
        [{ label: 'ชื่อ', key: 'name' }, { label: 'อายุ', key: 'age' }],
        [{ label: 'id', key: 'id' }, { label: 'price', key: 'price' }]
    ];

// ฟังก์ชันสำหรับสร้าง HTML สำหรับแต่ละบุคคล
function create_Person_HTML(person, fields) {
    let personHTML = html_tag.div_open;

    // วนลูปผ่านแต่ละฟิลด์เพื่อสร้างข้อความ HTML
    personHTML = generateFieldHTML(fields, person, personHTML);

    // ปิดแท็ก <div>
    personHTML += html_tag.div_close;

    return personHTML;
}

function generateFieldHTML(fields, person, personHTML) {
    fields.forEach(field => {
        const fieldLabel = field.label;
        const fieldValue = person[field.key];
        personHTML += `${fieldLabel}: ${fieldValue}${html_tag.br}`;
    });
    return personHTML;
}

function renderUserData(data) {
    data.user.forEach(person => {
        htmlContent += create_Person_HTML(person, fields[0]);
    });
    container.innerHTML = htmlContent;
}

function renderItemData(data) {
    data.item.forEach(item => {
        htmlContent += create_Person_HTML(item, fields[1]);
    });
    container.innerHTML = htmlContent;
}


function parseJSONResponse() {
    return response => response.json();
}

function processData() {
    return (data) => {
        renderUserData(data);
        renderItemData(data);
        storeUserNames(data);
    };
}

function storeUserNames(data) {
    user_name_array.push(
        data.user[0].name,
        data.user[1].name,
        data.user[2].name
    );
    text_output.innerHTML += user_name_array;
}
