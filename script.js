// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const emojiDisplay = document.getElementById('emoji-display');
    const nounDisplay = document.getElementById('noun-display');
    const speakButton = document.getElementById('speak-button');
    const btnDer = document.getElementById('btn-der');
    const btnDie = document.getElementById('btn-die');
    const btnDas = document.getElementById('btn-das');
    const feedbackEl = document.getElementById('feedback');
    const answerDetailsEl = document.getElementById('answer-details');
    const correctArticleEl = document.getElementById('correct-article');
    const pluralFormEl = document.getElementById('plural-form');
    const englishMeaningEl = document.getElementById('english-meaning');
    const btnPracticeAll = document.getElementById('btn-practice-all');
    const btnPracticeMistakes = document.getElementById('btn-practice-mistakes');
    const btnSkipNext = document.getElementById('btn-skip-next');
    const scoreEl = document.getElementById('score');
    const modeInfoEl = document.getElementById('mode-info');

    // --- Application State ---
    let allFlashcards = [];
    let flashcardsToPractice = [];
    let mistakenCards = {}; // Store by card.id: cardObject
    let currentCardIndex = -1;
    let currentCardData = null;
    let score = 0;
    let attemptedInRound = 0;
    let revealed = false;
    let currentPracticeMode = "all"; // "all" or "mistakes"

    // --- TTS ---
    const synth = window.speechSynthesis;
    let germanVoice = null;

    function loadVoices() {
        const voices = synth.getVoices();
        germanVoice = voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith('de')) || voices[0];
        // console.log("Available voices:", voices); // For debugging
        // console.log("Selected German voice:", germanVoice); // For debugging
    }
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    loadVoices(); // Initial attempt, might be empty if voices load async

    function speak(text) {
        if (!text || !synth) return;
        const textToSpeak = text.replace(/\s*\(.*\)\s*$/, '').trim();
        if (!textToSpeak) return;

        // Cancel any ongoing speech before starting a new one
        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        if (germanVoice) {
            utterance.voice = germanVoice;
        } else { // Fallback if no specific German voice found
            const voices = synth.getVoices();
            utterance.voice = voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith('de')) || voices[0];
        }
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        synth.speak(utterance);
    }

    // --- Core Functions ---
    function initializeFlashcards() {
        // This function now relies on data.js providing getFlashcardData
        if (typeof getFlashcardData !== 'function') {
            alert("Error: getFlashcardData function not found in data.js. Make sure data.js is loaded correctly.");
            return;
        }
        allFlashcards = getFlashcardData();
        if (!allFlashcards || allFlashcards.length === 0) {
            alert("Error: No flashcards loaded from data.js!");
            // Disable buttons or show error message prominently
            [btnDer, btnDie, btnDas, btnSkipNext, btnPracticeAll, btnPracticeMistakes, speakButton].forEach(btn => btn.disabled = true);
            return;
        }
        startPracticeMode("all");
    }

    function startPracticeMode(mode) {
        currentPracticeMode = mode;
        currentCardIndex = -1;
        score = 0;
        attemptedInRound = 0;
        updateScoreDisplay();
        answerDetailsEl.style.display = 'none';
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-area';


        if (mode === "all") {
            modeInfoEl.textContent = "Mode: Practicing All Cards";
            flashcardsToPractice = [...allFlashcards];
            shuffleArray(flashcardsToPractice);
        } else if (mode === "mistakes") {
            const mistakesArray = Object.values(mistakenCards);
            if (mistakesArray.length === 0) {
                alert("No mistakes to practice! Switching to 'All Cards'.");
                startPracticeMode("all");
                return;
            }
            modeInfoEl.textContent = `Mode: Practicing ${mistakesArray.length} Mistake(s)`;
            flashcardsToPractice = [...mistakesArray];
            shuffleArray(flashcardsToPractice);
        }
        updateMistakesButton();
        showNextCard();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showNextCard() {
        revealed = false;
        currentCardIndex++;
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-area';
        answerDetailsEl.style.display = 'none';
        enableArticleButtons(true);

        if (currentCardIndex < flashcardsToPractice.length) {
            currentCardData = flashcardsToPractice[currentCardIndex];
            nounDisplay.textContent = currentCardData.front_display;
            emojiDisplay.textContent = currentCardData.emoji || '';
            speakButton.disabled = false;
            btnSkipNext.textContent = "Skip / Next (Space)";
            btnSkipNext.disabled = false;
            
            if (currentCardData.noun_base_for_lookup) {
                speak(currentCardData.noun_base_for_lookup);
            }
        } else {
            showRoundSummary();
        }
    }
    
    function showRoundSummary() {
        nounDisplay.textContent = `${currentPracticeMode.charAt(0).toUpperCase() + currentPracticeMode.slice(1)} Round Finished!`;
        emojiDisplay.textContent = "🎉";
        feedbackEl.textContent = "";
        answerDetailsEl.style.display = 'none';
        enableArticleButtons(false);
        speakButton.disabled = true;
        btnSkipNext.textContent = "Start New Round?"; 
        btnSkipNext.disabled = false; // Allow starting a new round

        let accuracy = attemptedInRound > 0 ? (score / attemptedInRound) * 100 : 0;
        // Use a custom styled modal or a less obtrusive notification later if desired
        setTimeout(() => { // Delay alert slightly so UI updates first
             alert(`Round Summary (${currentPracticeMode}):\nScore: ${score}/${attemptedInRound}\nAccuracy: ${accuracy.toFixed(2)}%`);
        }, 100);
    }

    function checkAnswer(guessedArticle) {
        if (revealed || !currentCardData) return;
        revealed = true;
        attemptedInRound++;

        const correctArticles = currentCardData.article.toLowerCase().split('/');
        const isCorrect = correctArticles.includes(guessedArticle.toLowerCase());

        if (isCorrect) {
            feedbackEl.textContent = "Correct! :)";
            feedbackEl.className = 'feedback-area feedback-correct';
            score++;
            if (currentPracticeMode === "mistakes" && mistakenCards[currentCardData.id]) {
                delete mistakenCards[currentCardData.id];
                updateMistakesButton();
            }
        } else {
            feedbackEl.textContent = "Incorrect. :(";
            feedbackEl.className = 'feedback-area feedback-incorrect';
            mistakenCards[currentCardData.id] = currentCardData;
            updateMistakesButton();
        }

        correctArticleEl.textContent = `Correct: ${currentCardData.full_info_german}`;
        
        let pluralDisplay = currentCardData.noun_base_for_lookup;
        if (currentCardData.plural_form_raw && currentCardData.plural_form_raw !== "-" && 
            !currentCardData.plural_form_raw.startsWith("(")) { // e.g. not (Singular only)
            pluralDisplay += currentCardData.plural_form_raw;
        } else if (currentCardData.plural_form_raw.startsWith("(")) { // (Singular only) or (Plural only)
            pluralDisplay = `${currentCardData.noun_base_for_lookup} ${currentCardData.plural_form_raw}`;
        } else { // Default for "-" or unhandled
             pluralDisplay = `${currentCardData.noun_base_for_lookup} (Plural: ${currentCardData.plural_form_raw || 'not specified'})`;
        }
        pluralFormEl.textContent = `Plural: ${pluralDisplay}`;
        englishMeaningEl.textContent = `Meaning: ${currentCardData.english_meaning}`;
        answerDetailsEl.style.display = 'block';

        updateScoreDisplay();
        enableArticleButtons(false);
        btnSkipNext.textContent = "Next Card (Space)";
        btnSkipNext.disabled = false;
    }

    function handleSkipNext() {
    if (!currentCardData && currentCardIndex >= flashcardsToPractice.length - 1) { // At end of round
        // Default to "all" mode if "Start New Round?" is clicked after summary
        startPracticeMode("all");
        return; // <-- This is the fix
    }

    if (!revealed && currentCardData) { // Skipping current card
        feedbackEl.textContent = "Skipped.";
        feedbackEl.className = 'feedback-area';

        if (currentPracticeMode === "all") {
            mistakenCards[currentCardData.id] = currentCardData;
            updateMistakesButton();
        }

        correctArticleEl.textContent = `Answer: ${currentCardData.full_info_german}`;
        let pluralDisplay = currentCardData.noun_base_for_lookup;
        if (currentCardData.plural_form_raw && currentCardData.plural_form_raw !== "-" &&
            !currentCardData.plural_form_raw.startsWith("(")) {
            pluralDisplay += currentCardData.plural_form_raw;
        } else if (currentCardData.plural_form_raw.startsWith("(")) {
            pluralDisplay = `${currentCardData.noun_base_for_lookup} ${currentCardData.plural_form_raw}`;
        } else {
            pluralDisplay = `${currentCardData.noun_base_for_lookup} (Plural: ${currentCardData.plural_form_raw || 'not specified'})`;
        }
        pluralFormEl.textContent = `Plural: ${pluralDisplay}`;
        englishMeaningEl.textContent = `Meaning: ${currentCardData.english_meaning}`;
        emojiDisplay.textContent = currentCardData.emoji || ''; // Also show emoji on skip

        answerDetailsEl.style.display = 'block';
        revealed = true;
        enableArticleButtons(false);
        btnSkipNext.textContent = "Next Card (Space)";
        btnSkipNext.disabled = false;
    } else { // Moving to next card
        showNextCard();
    }
}

    function updateScoreDisplay() {
        scoreEl.textContent = `Score: ${score}/${attemptedInRound}`;
    }

    function updateMistakesButton() {
        const numMistakes = Object.keys(mistakenCards).length;
        btnPracticeMistakes.textContent = `Practice Mistakes (${numMistakes})`;
        btnPracticeMistakes.disabled = numMistakes === 0;
    }

    function enableArticleButtons(enable) {
        btnDer.disabled = !enable;
        btnDie.disabled = !enable;
        btnDas.disabled = !enable;
    }

    // --- Event Listeners ---
    btnDer.addEventListener('click', () => checkAnswer('der'));
    btnDie.addEventListener('click', () => checkAnswer('die'));
    btnDas.addEventListener('click', () => checkAnswer('das'));
    btnSkipNext.addEventListener('click', handleSkipNext);
    speakButton.addEventListener('click', () => {
        if (currentCardData && currentCardData.noun_base_for_lookup && !speakButton.disabled) {
            speak(currentCardData.noun_base_for_lookup);
        }
    });
    btnPracticeAll.addEventListener('click', () => startPracticeMode('all'));
    btnPracticeMistakes.addEventListener('click', () => {
        if (Object.keys(mistakenCards).length > 0) {
            startPracticeMode('mistakes');
        } else {
            alert("No mistakes to practice!");
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'BUTTON' && e.key === ' ') {
            // Allow space to click focused button, otherwise it's for skip/next
             return;
        }

        if (e.key === '1' && !btnDer.disabled) checkAnswer('der');
        else if (e.key === '2' && !btnDie.disabled) checkAnswer('die');
        else if (e.key === '3' && !btnDas.disabled) checkAnswer('das');
        else if (e.key === ' ' && !btnSkipNext.disabled) {
            e.preventDefault();
            handleSkipNext();
        } else if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
             e.preventDefault();
            if (currentCardData && currentCardData.noun_base_for_lookup && !speakButton.disabled) {
                 speak(currentCardData.noun_base_for_lookup);
            }
        }
    });

    // --- Initialize ---
    initializeFlashcards();
});
