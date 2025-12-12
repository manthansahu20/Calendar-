let date = new Date();
let renderDate = new Date();

const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");

function renderCalendar() {
    renderDate.setDate(1);

    const month = renderDate.getMonth();
    const year = renderDate.getFullYear();

    monthYear.innerText = `${renderDate.toLocaleString("default", { month: "long" })} ${year}`;

    const firstDayIndex = renderDate.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    let days = "";

    // Previous month days
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="day other-month">${prevLastDay - x + 1}</div>`;
    }

    // Current month days
    for (let i = 1; i <= lastDay; i++) {
        let todayClass = "";

        if (
            i === date.getDate() &&
            month === date.getMonth() &&
            year === date.getFullYear()
        ) {
            todayClass = "today";
        }

        days += `<div class="day ${todayClass}">${i}</div>`;
    }

    daysContainer.innerHTML = days;
}

// Buttons
document.getElementById("prevBtn").onclick = () => {
    renderDate.setMonth(renderDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById("nextBtn").onclick = () => {
    renderDate.setMonth(renderDate.getMonth() + 1);
    renderCalendar();
};

renderCalendar();
