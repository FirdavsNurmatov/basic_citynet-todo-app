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

  const minusTask = [
    { first: 15, second: 0, third: 0, forth: 5 },
    { first: 1, second: 0, third: 3, forth: 73 },
    { first: 0, second: 8, third: 0, forth: 29 },
    { first: 5, second: 5, third: 5, forth: 4 },
    { first: 0, second: 0, third: 3, forth: 33 },
    { first: 1, second: 0, third: 0, forth: 1 },
    { first: 4, second: 0, third: 0, forth: 2 },
    { first: 0, second: 0, third: 0, forth: 1 },
  ];

  users.forEach((item, index) => {
    let firstBox = item.data[1] + item.data[5];
    let secondBox = item.data[2] + item.data[6];
    let thirdBox = item.data[4];
    let forthBox = item.data[3];

    firstBox -= minusTask[index].first;
    secondBox -= minusTask[index].second;
    thirdBox -= minusTask[index].third;
    forthBox -= minusTask[index].forth;

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
            <p class="todo_quantity">${firstBox}</p>
          </div>
          <div class="yellow_card">
            <p class="icon">🔧</p>
            <p class="todo_quantity">${secondBox}</p>
          </div>
          <div class="green_card">
            <p class="icon">🕓</p>
            <p class="todo_quantity">${thirdBox}</p>
          </div>
          <div class="red_card">
            <p class="icon">✔️</p>
            <p class="todo_quantity">${forthBox}</p>
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

setInterval(getAllData, 5 * 1000);
setInterval(updateTime, 1000);
