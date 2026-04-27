// 1. เก็บข้อมูลเมนูทั้งหมดไว้ที่นี่
    const menuData = [
      {
        title: "Home",
        desc: "หน้าหลักของเว็บไซต์",
        icon: "bi-house-door-fill",
        color: "primary",
        link: "/index.html"
      },
      {
        title: "Workout",
        desc: "บันทึกการออกกำลังกาย",
        icon: "bi-lightning-charge-fill",
        color: "success",
        link: "/src/page/workout.html"
      },
      {
        title: "CRUD Google",
        desc: "จัดการข้อมูลพื้นฐาน",
        icon: "bi-grid-fill",
        color: "dark",
        link: "/src/page/a.html"
      },
      {
        title: "Test Firebase",
        desc: "ทดสอบ Input และ Database",
        icon: "bi-database-fill",
        color: "warning",
        link: "/src/page/test.html"
      },
      {
        title: "Color Picker",
        desc: "เครื่องมือเลือกสี",
        icon: "bi-palette-fill",
        color: "info",
        link: "/src/page/color.html"
      },
      {
        title: "Tools",
        desc: "เครื่องมืออำนวยความสะดวก",
        icon: "bi-tools",
        color: "secondary",
        link: "/src/page/tool.html"
      },
      {
        title: "Tasks",
        desc: "รายการสิ่งที่ต้องทำ",
        icon: "bi-list-check",
        color: "danger",
        link: "/src/page/tasks.html"
      },
      {
        title: "คำนวณจำนวนนม",
        desc: "เครื่องมือคำนวณจำนวนนม",
        icon: "bi-calculator-fill",
        color: "primary",
        link: "/src/page/c_milk.html"
      },
      {
        title: "Note",
        desc: "บันทึกข้อความ",
        icon: "bi-journal-text",
        color: "primary",
        link: "/src/page/note.html"
      },
      {
        title: "book",
        desc: "บันทึกข้อความ",
        icon: "bi-journal-text",
        color: "primary",
        link: "/src/page/book/index.html"
      },
       {
        title: "book admin ",
        desc: "บันทึกข้อความ",
        icon: "bi-journal-text",
        color: "primary",
        link: "/src/page/book/admin.html"
      },
    ];

    // 2. ฟังก์ชันสำหรับสร้าง HTML จากข้อมูล
    function renderMenus(data) {
      const container = document.getElementById('menu-container');

      const html = data.map(item => `
        <div class="col">
            <a href="${item.link}" class="text-decoration-none">
                <div class="card h-100 shadow-sm card-menu border-${item.color} text-center">
                    <div class="card-body">
                        <i class="bi ${item.icon} text-${item.color} card-icon mb-3"></i>
                        <h5 class="card-title text-dark">${item.title}</h5>
                        <p class="card-text text-muted small">${item.desc}</p>
                    </div>
                </div>
            </a>
        </div>
    `).join('');

      container.innerHTML = html;
    }

    // 3. รันฟังก์ชันเมื่อโหลดหน้าเว็บ
    document.addEventListener('DOMContentLoaded', () => {
      renderMenus(menuData);
    });
