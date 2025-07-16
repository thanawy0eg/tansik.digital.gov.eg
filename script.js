
function goToResult(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const seat = document.getElementById('seat').value;
  const nid = document.getElementById('nid').value;
  const division = document.getElementById('division').value;

  localStorage.setItem('studentName', name);
  localStorage.setItem('seatNumber', seat);
  localStorage.setItem('nidNumber', nid);
  localStorage.setItem('division', division);

  window.location.href = "result.html";
}

function generateGrades(division) {
    const subjects = [
        "اللغة العربية",
        "اللغة الإنجليزية",
        "الرياضيات",
        "الفيزياء",
        "الكيمياء",
        "الأحياء",
        "التاريخ",
        "الجغرافيا",
        "الإحصاء"
    ];

    return subjects.map(subject => {
        let grade = 0;

        // المواد غير التابعة لكل شعبة
        const notInLiterary = ["الأحياء", "الكيمياء", "الفيزياء", "الرياضيات"];
        const notInScienceMath = ["التاريخ", "الجغرافيا", "الإحصاء", "الأحياء"];
        const notInScienceBio = ["التاريخ", "الجغرافيا", "الإحصاء", "الرياضيات"];

        const excludedSubjects =
            division === "أدبي" ? notInLiterary :
            division === "رياضة" ? notInScienceMath :
            division === "علوم" ? notInScienceBio : [];

        if (excludedSubjects.includes(subject)) {
            grade = 0;
        } else {
            if (subject === "اللغة العربية") {
                grade = Math.floor(Math.random() * (80 - 73 + 1)) + 73; // من 73 إلى 80
            } else {
                grade = Math.floor(Math.random() * (60 - 54 + 1)) + 54; // من 54 إلى 60
            }
        }

        return {
            name: subject,
            grade: grade
        };
    });
}

if (window.location.pathname.includes("result.html")) {
  const division = localStorage.getItem('division');
  document.getElementById("name").innerText = localStorage.getItem('studentName');
  document.getElementById("seat").innerText = localStorage.getItem('seatNumber');
  document.getElementById("nid").innerText = localStorage.getItem('nidNumber');
  document.getElementById("division").innerText = division;

  const gradesList = document.getElementById("grades");
  const grades = generateGrades(division);

  grades.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.grade}`;
    gradesList.appendChild(li);
  });
}
