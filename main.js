const recommendBtn = document.getElementById("recommend-btn");
const resultContainer = document.getElementById("recommendation-result");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const meals = [
    { name: "Kimchi Stew (Kimchi-jjigae)", category: "Korean" },
    { name: "Bibimbap", category: "Korean" },
    { name: "Bulgogi", category: "Korean" },
    { name: "Tteokbokki", category: "Korean" },
    { name: "Sushi", category: "Japanese" },
    { name: "Ramen", category: "Japanese" },
    { name: "Tonkatsu", category: "Japanese" },
    { name: "Pasta", category: "Western" },
    { name: "Pizza", category: "Western" },
    { name: "Hamburger", category: "Western" },
    { name: "Jajangmyeon", category: "Chinese" },
    { name: "Tangsuyuk", category: "Chinese" },
    { name: "Pad Thai", category: "Asian" },
    { name: "Tacos", category: "Mexican" },
    { name: "Sandwich", category: "Quick" },
    { name: "Salad", category: "Healthy" }
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
        themeToggle.textContent = "Dark Mode";
    } else {
        themeToggle.textContent = "Light Mode";
    }
});
