let playerName = "";
let scores = { scramble: 0, search: 0, quiz: 0 };
let gamesCompleted = { scramble: false, search: false, quiz: false };

const scrambleData = [
    { jumbled: "A N A Y A K I V", correct: "VINAYAKA" },
    { jumbled: "J A A N A A N G", correct: "GAJANANA" },
    { jumbled: "M O A D A R O L B", correct: "LAMBODARA" },
    { jumbled: "V I A N A H G A R T H", correct: "VIGHNAHARTA" },
    { jumbled: "K A E T N A A D", correct: "EKADANTA" },
    { jumbled: "A D N U T A K A R V", correct: "VAKRATUNDA" },
    { jumbled: "P A T I B A P", correct: "BAPPA" },
    { jumbled: "M U K A H S U", correct: "SUMUKHA" },
    { jumbled: "V I N I D D H A S I Y A K", correct: "SIDDHIVINAYAK" },
    { jumbled: "A H S I H D N E V", correct: "VIGNESH" }
];

const gridParts = [
    "SIDDHIVINAYAKAM", "MGAJANANASMHNVM", "OLAMBODARASMHNV", "RHNMSVBAPPACASR", "ESHVIGNESHNHMHA",
    "SHMNNSAVNMIISVN", "WGANAPATIMSNIHI", "ARMVHNASMVTXSMH", "REKADANTAHSANVA", "SUMUKHANSMXMVHN",
    "HNSMVAHNSMAXNSV", "MVIGHNAHARTANSM", "SMHNVASMHVIASMH", "ANBHALCHANDRAVS", "ANSVAKRATUNDAMN"
];
const gridArray = gridParts.join("").replace(/X/g, "A").split("");

const searchWords = [
    "BAPPA", "BHALCHANDRA", "CHINTAMANI", "EKADANTA", "GAJANANA", 
    "GANAPATI", "LAMBODARA", "MORESHWAR", "SIDDHIVINAYAK", "SUMUKHA", 
    "VAKRATUNDA", "VIGHNAHARTA", "VIGNESH"
];

const quizQuestions = [
    {
        q: "Which prominent freedom fighter from Maharashtra transformed Ganesh Chaturthi from a private family ritual into a grand public festival to unite citizens?",
        as: ["Vinayak Damodar Savarkar", "Bal Gangadhar Tilak", "Gopal Krishna Gokhale", "Shivaram Hari Rajguru"],
        c: 1
    },
    {
        q: "In Southern India, particularly in Tamil Nadu, Lord Ganesha is most affectionately called:",
        as: ["Vinayakudu", "Moreshwar", "Pillayar", "Heramba"],
        c: 2
    },
    {
        q: "During Durga Puja in West Bengal, what is 'Kala Bo' (associated with Ganesha) structurally made of?",
        as: ["Nine types of holy clay", "A banana tree draped in a saree", "A sacred brass pot", "Seven types of leaves"],
        c: 1
    },
    {
        q: "According to Puranic traditions, Lord Ganesha acted as the scribe to write down which epic scripture?",
        as: ["The Ramayana", "The Bhagavad Gita", "The Mahabharata", "The Upanishads"],
        c: 2
    },
    {
        q: "What is the symbolic meaning behind Ganesha’s famous name 'Vakratunda'?",
        as: ["The One with a Big Belly", "The Lord with a Curved Trunk", "The Destroyer of All Hurdles", "The One who Rides a Peacock"],
        c: 1
    },
    {
        q: "What is the standard, highly auspicious number of Modaks or Durva grass blades offered to Him?",
        as: ["11", "21", "51", "108"],
        c: 1
    },
    {
        q: "In Maharashtra, the famous pilgrimage circuit consisting of eight historic Ganesha temples is called:",
        as: ["Navagraha", "Ashtavinayak", "Pancha Bhoota", "Char Dham"],
        c: 1
    },
    {
        q: "According to sacred Puranic texts, which unique and benevolent deity is widely worshipped as the daughter of Lord Ganesha, representing wellness and absolute prosperity?",
        as: ["Goddess Santoshi Maa", "Goddess Lakshmi", "Goddess Saraswati", "Goddess Riddhi"],
        c: 0
    },
    {
        q: "On which country's currency note could you historically find an image of Lord Ganesha printed?",
        as: ["Thailand", "Indonesia", "Cambodia", "Nepal"],
        c: 1
    },
    {
        q: "Looking at which celestial object on Ganesh Chaturthi night is believed to bring false accusations (Mithya Kalank)?",
        as: ["The Sun", "The Pole Star", "The Moon", "Mars"],
        c: 2
    },
    {
        q: "Who famously broke Ganesha's second tusk during a standoff, leading to his name 'Ekadanta'?",
        as: ["Lord Shiva", "Lord Parashurama", "Ravana", "Indrajit"],
        c: 1
    },
    {
        q: "What is the symbolic spiritual meaning behind a giant god riding a tiny mouse vehicle (Vahana)?",
        as: ["It represents controlling desire, ego, and wandering thoughts", "It signifies speed over size", "It shows love for small animals", "It represents fitting into tiny spaces"],
        c: 0
    },
    {
        q: "Which esoteric deity revered in historic Japanese temples is recognized as a direct Buddhist evolution of Lord Ganesha?",
        as: ["Daikokuten", "Kangiten", "Bishamonten", "Benzaiten"],
        c: 1
    },
    {
        q: "In traditional household celebrations, Ganesha is accompanied by his mother, Goddess Gauri. What symbol represents her?",
        as: ["Five smooth river stones", "A collection of wild field grass or bundled leaves", "A silver coin wrapped in red cloth", "A clay lamp"],
        c: 1
    },
    {
        q: "How did Ganesha win his legendary race around the world against his brother, Lord Kartikeya?",
        as: ["He used a magical flying chariot", "He walked around his parents, stating they were his universe", "He hypnotized the peacock", "He calculated a shortcut through space"],
        c: 1
    }
];

function startHub() {
    const input = document.getElementById('player-name').value.trim();
    if (!input) return alert('Please enter your name to begin!'); 
    playerName = input;
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('hub-screen').classList.remove('hidden');
    document.getElementById('welcome-msg').innerText = "Ganpati Bappa Morya, " + playerName + "!";
    initGames();
}

function initGames() {
    const scrambleContainer = document.getElementById('scramble-container');
    scrambleContainer.innerHTML = '';
    scrambleData.forEach((item, index) => {
        scrambleContainer.innerHTML += `<div class="scramble-item"><label>${index + 1}. ${item.jumbled}</label><input type="text" id="scramble-ans-${index}" placeholder="Your Answer"></div>`;
    });

    const gridContainer = document.getElementById('search-grid');
    gridContainer.innerHTML = '';
    gridArray.forEach((letter) => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.innerText = letter;
        cell.onclick = function() { cell.classList.toggle('selected'); };
        gridContainer.appendChild(cell);
    });

    const wordListContainer = document.getElementById('search-word-list');
    wordListContainer.innerHTML = '';
    searchWords.forEach(word => {
        wordListContainer.innerHTML += `<li class="word-item" id="word-${word}" onclick="toggleWordFound('${word}')">${word}</li>`;
    });

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizQuestions.forEach((qItem, qIdx) => {
        let optionsHtml = '';
        qItem.as.forEach((ans, aIdx) => {
            optionsHtml += `<label><input type="radio" name="quiz-q-${qIdx}" value="${aIdx}"> ${String.fromCharCode(65 + aIdx)}) ${ans}</label>`;
        });
        const div = document.createElement('div');
        div.className = 'quiz-item';
        div.innerHTML = `<p>${qIdx + 1}. ${qItem.q}</p><div class="quiz-options">${optionsHtml}</div>`;
        quizContainer.appendChild(div);
    });
}

function showGame(game) {
    document.getElementById('hub-screen').classList.add('hidden');
    document.getElementById(game + '-screen').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function backToHub() {
    document.querySelectorAll('.container > div').forEach(div => { div.classList.add('hidden'); });
    document.getElementById('hub-screen').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function toggleWordFound(word) {
    document.getElementById('word-' + word).classList.toggle('found');
}

function submitScramble() {
    let correctCount = 0;
    scrambleData.forEach((item, index) => {
        const playerAns = document.getElementById(`scramble-ans-${index}`).value.trim().toUpperCase();
        if (playerAns === item.correct) correctCount++;
    });
    scores.scramble = correctCount * 10; 
    gamesCompleted.scramble = true;
    document.getElementById('btn-scramble').innerText = '✓ Scramble Completed (' + scores.scramble + ' pts)';
    document.getElementById('btn-scramble').style.backgroundColor = '#2ecc71';
    backToHub();
    checkAllCompleted();
}

function submitWordSearch() {
    let foundCount = 0;
    searchWords.forEach(word => {
        if (document.getElementById('word-' + word).classList.contains('found')) foundCount++;
    });
    scores.search = foundCount * 10; 
    gamesCompleted.search = true;
    document.getElementById('btn-search').innerText = '✓ Word Search Completed (' + scores.search + ' pts)';
    document.getElementById('btn-search').style.backgroundColor = '#2ecc71';
    backToHub();
    checkAllCompleted();
}

function submitQuiz() {
    let correctCount = 0;
    quizQuestions.forEach((qItem, qIdx) => {
        const selected = document.querySelector(`input[name="quiz-q-${qIdx}"]:checked`);
        if (selected && parseInt(selected.value) === qItem.c) correctCount++;
    });
    scores.quiz = correctCount * 10; 
    gamesCompleted.quiz = true;
    document.getElementById('btn-quiz').innerText = '✓ Trivia Completed (' + scores.quiz + ' pts)';
    document.getElementById('btn-quiz').style.backgroundColor = '#2ecc71';
    backToHub();
    checkAllCompleted();
}

function checkAllCompleted() {
    if (gamesCompleted.scramble && gamesCompleted.search && gamesCompleted.quiz) saveAndShowScores();
}

function saveAndShowScores() {
    const total = scores.scramble + scores.search + scores.quiz;
    let leaderboard = JSON.parse(localStorage.getItem('ganesh_leaderboard')) || [];
    const existingIndex = leaderboard.findIndex(p => p.name === playerName);
    if (existingIndex > -1) {
        if (total > leaderboard[existingIndex].score) leaderboard[existingIndex].score = total;
    } else {
