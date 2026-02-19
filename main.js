const generatorBtn = document.getElementById("generator-btn");
const lottoNumbersContainer = document.querySelector(".lotto-numbers");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

generatorBtn.addEventListener("click", () => {
    lottoNumbersContainer.innerHTML = "";
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    numbers.forEach(number => {
        const numberDiv = document.createElement("div");
        numberDiv.classList.add("number");
        numberDiv.textContent = number;
        lottoNumbersContainer.appendChild(numberDiv);
    });
});

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        themeToggle.textContent = "Dark Mode";
    } else {
        themeToggle.textContent = "Light Mode";
    }
});
