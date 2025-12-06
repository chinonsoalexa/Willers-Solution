document.getElementById("courseSelector").addEventListener("change", async function () {
    const course = this.value;
    
    if (course === "All") return;

    const res = await fetch(`https://willers-solutions-backend.onrender.com/get-course/${course}`);
    const data = await res.json();

    // Show stats
    document.getElementById("courseStats").style.display = "flex";
    document.getElementById("totalStudents").textContent = data.totalStudents;
    document.getElementById("totalRevenue").textContent = `₦${data.totalRevenue?.toLocaleString()}`;

    // Render table
    const tableBody = document.getElementById("studentsTable");
    tableBody.innerHTML = "";

    data.students.forEach((u, i) => {
        tableBody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${u.surn_name} ${u.other_name}</td>
                <td>${u.email}</td>
                <td>${u.phone}</td>
                <td>₦${u.amount_paid.toLocaleString()}</td>
            </tr>`;
    });

    // Enable email button
    document.getElementById("sendEmailBtn").disabled = false;
});
