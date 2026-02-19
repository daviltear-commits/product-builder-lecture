const recommendBtn = document.getElementById("recommend-btn");
const resultContainer = document.getElementById("recommendation-result");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const meals = [
    { name: "김치찌개", category: "한식" },
    { name: "비빔밥", category: "한식" },
    { name: "불고기", category: "한식" },
    { name: "떡볶이", category: "한식" },
    { name: "초밥", category: "일식" },
    { name: "라멘", category: "일식" },
    { name: "돈가츠", category: "일식" },
    { name: "파스타", category: "양식" },
    { name: "피자", category: "양식" },
    { name: "햄버거", category: "양식" },
    { name: "짜장면", category: "중식" },
    { name: "탕수육", category: "중식" },
    { name: "팟타이", category: "아시안" },
    { name: "타코", category: "멕시칸" },
    { name: "샌드위치", category: "간편식" },
    { name: "샐러드", category: "건강식" }
];

recommendBtn.addEventListener("click", () => {
    resultContainer.classList.add("fade-out");
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * meals.length);
        const selectedMeal = meals[randomIndex];
        
        resultContainer.innerHTML = `
            <div class="meal-display">
                <span class="category">[${selectedMeal.category}]</span>
                <h2 class="meal-name">${selectedMeal.name}</h2>
            </div>
        `;
        resultContainer.classList.remove("fade-out");
    }, 300);
});

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        themeToggle.textContent = "다크 모드";
    } else {
        themeToggle.textContent = "라이트 모드";
    }
});
