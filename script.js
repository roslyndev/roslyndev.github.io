// Game State
let candidates = []; // Current round candidates
let nextRoundCandidates = []; // Winners moving to next round
let currentPairIndex = 0; // Index of the current pair being displayed
let roundTitle = "16강"; // Current round title
let totalRounds = 8; // Total matches in the current round (initially 8 for 16 candidates)
let currentRoundMatch = 0; // Current match number in the round

// DOM Elements
const landingPage = document.getElementById('landing-page');
const gamePage = document.getElementById('game-page');
const resultPage = document.getElementById('result-page');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

const img0 = document.getElementById('img-0');
const name0 = document.getElementById('name-0');
const img1 = document.getElementById('img-1');
const name1 = document.getElementById('name-1');

const roundTitleEl = document.getElementById('round-title');
const progressBar = document.getElementById('game-progress');
const winnerImg = document.getElementById('winner-img');
const winnerName = document.getElementById('winner-name');

// Initialize Game Data
async function initGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const tournamentId = urlParams.get('id');

    if (!tournamentId) {
        alert('잘못된 접근입니다. 메인 페이지로 이동합니다.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`https://funapi.roslyn.dev/api/Tournaments/${tournamentId}`);
        if (!response.ok) throw new Error('Failed to fetch tournament data');

        const data = await response.json();

        // Handle API response structure
        // Assuming data.items is the array of candidates
        const items = data.items || (Array.isArray(data) ? data : []);

        if (items.length < 2) {
            alert('후보가 부족하여 게임을 진행할 수 없습니다.');
            return;
        }

        candidates = items;

        // Update Title if available
        if (data.title) {
            const mainTitle = document.querySelector('.main-title');
            if (mainTitle) mainTitle.textContent = `🏆 ${data.title} 🏆`;
        }

    } catch (error) {
        console.error('Error loading tournament:', error);
        alert('토너먼트 정보를 불러오는데 실패했습니다.');
        window.location.href = 'index.html';
    }
}

// Start Game
startBtn.addEventListener('click', () => {
    if (candidates.length === 0) return;

    landingPage.classList.add('d-none');
    gamePage.classList.remove('d-none');

    // Shuffle candidates
    candidates.sort(() => Math.random() - 0.5);

    nextRoundCandidates = [];
    currentPairIndex = 0;
    currentRoundMatch = 0;

    // Calculate initial rounds based on candidate count
    const count = candidates.length;
    if (count >= 32) { roundTitle = "32강"; totalRounds = 16; }
    else if (count >= 16) { roundTitle = "16강"; totalRounds = 8; }
    else if (count >= 8) { roundTitle = "8강"; totalRounds = 4; }
    else if (count >= 4) { roundTitle = "4강"; totalRounds = 2; }
    else { roundTitle = "결승"; totalRounds = 1; }

    updateProgress();
    showPair();
});

// Show Current Pair
function showPair() {
    const c1 = candidates[currentPairIndex * 2];
    const c2 = candidates[currentPairIndex * 2 + 1];

    img0.src = c1.imageUrl;
    name0.textContent = c1.text;

    img1.src = c2.imageUrl;
    name1.textContent = c2.text;
}

// Handle Selection
window.selectOption = function (choiceIndex) {
    // choiceIndex: 0 for left, 1 for right
    const selected = candidates[currentPairIndex * 2 + choiceIndex];
    nextRoundCandidates.push(selected);

    currentPairIndex++;
    currentRoundMatch++;
    updateProgress();

    // Check if round is finished
    if (currentPairIndex * 2 >= candidates.length) {
        // Round Over
        if (nextRoundCandidates.length === 1) {
            // Game Over - We have a winner
            showWinner(nextRoundCandidates[0]);
        } else {
            // Prepare next round
            candidates = nextRoundCandidates;
            nextRoundCandidates = [];
            currentPairIndex = 0;
            currentRoundMatch = 0;

            // Update Round Title
            if (candidates.length === 8) {
                roundTitle = "8강";
                totalRounds = 4;
            } else if (candidates.length === 4) {
                roundTitle = "4강";
                totalRounds = 2;
            } else if (candidates.length === 2) {
                roundTitle = "결승";
                totalRounds = 1;
            }

            // Small delay for smooth transition
            setTimeout(() => {
                alert(`${roundTitle}을 시작합니다!`); // Optional: simple alert or modal
                updateProgress();
                showPair();
            }, 100);
        }
    } else {
        // Next Pair
        showPair();
    }
};

// Update Progress UI
function updateProgress() {
    roundTitleEl.textContent = `${roundTitle} (${currentRoundMatch + 1}/${totalRounds})`;
    const progress = ((currentRoundMatch) / totalRounds) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show Winner
function showWinner(winner) {
    gamePage.classList.add('d-none');
    resultPage.classList.remove('d-none');

    winnerImg.src = winner.imageUrl;
    winnerName.textContent = winner.text;

    // Confetti effect could be added here
}

// Restart Game
restartBtn.addEventListener('click', () => {
    resultPage.classList.add('d-none');
    landingPage.classList.remove('d-none');
});

// Share Functionality
shareBtn.addEventListener('click', async () => {
    const winner = winnerName.textContent;
    const shareData = {
        title: '이상형 월드컵 우승!',
        text: `제 이상형 월드컵 우승자는 ${winner}입니다! 당신의 이상형도 찾아보세요.`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for browsers that don't support Web Share API
            await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
            alert('결과가 클립보드에 복사되었습니다! 원하는 곳에 붙여넣기 하세요.');
        }
    } catch (err) {
        console.error('Share failed:', err);
    }
});

// Load data on start
initGameData();
