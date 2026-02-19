// 탭 전환 로직
function openTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// 메뉴 추천 로직
const recommendBtn = document.getElementById("recommend-btn");
const resultContainer = document.getElementById("recommendation-result");

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

if (recommendBtn) {
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
}

// 동물상 테스트 (Teachable Machine) 로직
const TM_URL = "https://teachablemachine.withgoogle.com/models/rE0jxOhAX/";
let model, webcam, labelContainer, maxPredictions;

async function initTM() {
    const startBtn = document.getElementById("start-webcam");
    startBtn.style.display = "none";

    const modelURL = TM_URL + "model.json";
    const metadataURL = TM_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loopTM);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loopTM() {
    webcam.update();
    await predictTM();
    window.requestAnimationFrame(loopTM);
}

async function predictTM() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const prob = (prediction[i].probability * 100).toFixed(0);
        const className = prediction[i].className === "dog" ? "강아지상" : 
                          prediction[i].className === "cat" ? "고양이상" : prediction[i].className;
        
        labelContainer.childNodes[i].innerHTML = `
            <div class="prediction-bar-container">
                <span class="class-label">${className}</span>
                <div class="bar-outer">
                    <div class="bar-inner" style="width: ${prob}%"></div>
                </div>
                <span class="prob-label">${prob}%</span>
            </div>
        `;
    }
}

const startTMBtn = document.getElementById("start-webcam");
if (startTMBtn) {
    startTMBtn.addEventListener("click", initTM);
}
