const baseUrl = "https://my.burgutsoft.uz/taskdashboard77.php";

const block1 = document.querySelector(".block1");
const block2 = document.querySelector(".block2");
const block3 = document.querySelector(".block3");
const time = document.getElementById("current_time");

function updateTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const timeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  time.textContent = timeString;
}

const getAllData = async () => {
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();

    render(data);
  } catch (error) {
    console.error("Xatolik:", error.message);
  }
};

const render = (users) => {
  const array1 = [];
  const array2 = [];
  const array3 = [];

  users.forEach((item, index) => {
    const userCard = `
      <div class="user_card">
        <div class="user_card__block">
          <img class="img" src="${item.image}" alt="user image" />
          <div>
            <h3 class="user_card__fullname">${item.last_name.trim()[0]}.${
      item.first_name
    }</h3>
          </div>
        </div>
        <div class="user_card__block2">
          <div class="blue_card">
            <p class="icon">📌</p>
            <p class="todo_quantity">${item.data[1] + item.data[5]}</p>
          </div>
          <div class="yellow_card">
            <p class="icon">⚠️</p>
            <p class="todo_quantity">${item.data[2] + item.data[6]}</p>
          </div>
          <div class="green_card">
            <p class="icon">🧪</p>
            <p class="todo_quantity">${item.data[4]}</p>
          </div>
          <div class="red_card">
            <p class="icon">✅</p>
            <p class="todo_quantity">${item.data[3]}</p>
          </div>
        </div>
      </div>
    `;

    if (index < 3) {
      array1.push(userCard);
    } else if (index < 6) {
      array2.push(userCard);
    } else {
      array3.push(userCard);
    }
  });

  block1.innerHTML = array1.join("");
  block2.innerHTML = array2.join("");
  block3.innerHTML = array3.join("");
};

document.addEventListener("DOMContentLoaded", () => {
  getAllData(), updateTime();
});

setInterval(getAllData, 5 * 60 * 1000);
setInterval(updateTime, 1000);
