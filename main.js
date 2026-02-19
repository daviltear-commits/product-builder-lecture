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
    if (event) event.currentTarget.classList.add("active");
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

// 동물상 테스트 (Teachable Machine) 공용 변수 및 데이터
const TM_URL = "https://teachablemachine.withgoogle.com/models/rE0jxOhAX/";
let model, webcam, labelContainer, maxPredictions;

const animalData = {
    "Class 1": {
        name: "강아지상",
        emoji: "🐶",
        description: "다정다감하고 사교적인 성격! 주변 사람들에게 에너지를 주는 타입입니다. 웃는 모습이 매력적이며 누구와도 쉽게 친해지는 친화력을 가지고 있습니다."
    },
    "Class 2": {
        name: "고양이상",
        emoji: "🐱",
        description: "도도하지만 내 사람에게는 따뜻한 반전 매력! 혼자만의 시간도 소중히 여기며, 섬세하고 지적인 분위기를 풍기는 타입입니다."
    },
    "dog": {
        name: "강아지상",
        emoji: "🐶",
        description: "다정다감하고 사교적인 성격! 주변 사람들에게 에너지를 주는 타입입니다. 웃는 모습이 매력적이며 누구와도 쉽게 친해지는 친화력을 가지고 있습니다."
    },
    "cat": {
        name: "고양이상",
        emoji: "🐱",
        description: "도도하지만 내 사람에게는 따뜻한 반전 매력! 혼자만의 시간도 소중히 여기며, 섬세하고 지적인 분위기를 풍기는 타입입니다."
    }
};

async function loadModel() {
    if (!model) {
        const modelURL = TM_URL + "model.json";
        const metadataURL = TM_URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }
}

function getPredictionHTML(prediction) {
    // 확률이 가장 높은 순으로 정렬
    prediction.sort((a, b) => b.probability - a.probability);
    
    const topResult = prediction[0];
    const topData = animalData[topResult.className] || { name: topResult.className, emoji: "❓", description: "" };
    
    let html = `
        <div class="top-prediction">
            <div class="top-emoji">${topData.emoji}</div>
            <div class="top-name">${topData.name}</div>
            <div class="top-prob">${(topResult.probability * 100).toFixed(0)}%</div>
            <div class="top-description">${topData.description}</div>
        </div>
        <div class="prediction-list">
    `;

    for (let i = 0; i < maxPredictions; i++) {
        const prob = (prediction[i].probability * 100).toFixed(0);
        const data = animalData[prediction[i].className] || { name: prediction[i].className };
        
        html += `
            <div class="prediction-bar-container">
                <span class="class-label">${data.name}</span>
                <div class="bar-outer">
                    <div class="bar-inner" style="width: ${prob}%"></div>
                </div>
                <span class="prob-label">${prob}%</span>
            </div>
        `;
    }
    html += "</div>";
    return html;
}

// 실시간 테스트 로직
async function initTM() {
    const startBtn = document.getElementById("start-webcam");
    startBtn.style.display = "none";

    await loadModel();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loopTM);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
}

async function loopTM() {
    webcam.update();
    await predictTM();
    window.requestAnimationFrame(loopTM);
}

async function predictTM() {
    const prediction = await model.predict(webcam.canvas);
    labelContainer.innerHTML = getPredictionHTML(prediction);
}

// 업로드 테스트 로직
const fileInput = document.getElementById("file-input");
const uploadBtn = document.getElementById("upload-btn");
const imagePreview = document.getElementById("image-preview");
const uploadLabelContainer = document.getElementById("upload-label-container");

if (uploadBtn) {
    uploadBtn.addEventListener("click", () => fileInput.click());
}

if (fileInput) {
    fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = "block";
            
            await loadModel();
            const prediction = await model.predict(imagePreview);
            uploadLabelContainer.innerHTML = getPredictionHTML(prediction);
        };
        reader.readAsDataURL(file);
    });
}

const startTMBtn = document.getElementById("start-webcam");
if (startTMBtn) {
    startTMBtn.addEventListener("click", initTM);
}
