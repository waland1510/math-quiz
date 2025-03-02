<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { translations } from './translations';
    import { firstGroupVerbs } from './firstGroupVerbs';
    import { secondGroupVerbs } from './secondGroupVerbs';
    import { thirdGroupVerbs } from './thirdGroupVerbs';
    
    export let verbsType: 'firstGroup' | 'secondGroup' | 'thirdGroup';
    export let language: 'en' | 'fr' | 'es' | 'uk';

    const dispatch = createEventDispatcher();

    let currentVerb = '';
    let currentPronoun = '';
    let currentConjugation = '';
    let feedback = '';
    let options: string[] = [];
    let selectedVoice: SpeechSynthesisVoice | null = null;
    let muted = false;
    const wrongSound = new Audio('/audio/wrong.mp3');
    let lastSpokenTime = 0;
    const debounceTime = 100;
  
    const pronouns = ['je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles'];
  
    const verbs = {
      firstGroup: firstGroupVerbs,
      secondGroup: secondGroupVerbs,
      thirdGroup: thirdGroupVerbs
    };
  
    const getRandomVerb = () => verbs[verbsType][Math.floor(Math.random() * verbs[verbsType].length)];
  
    const nextVerb = () => {
      const verb = getRandomVerb();
      const pronounIndex = Math.floor(Math.random() * pronouns.length);
      currentVerb = verb.infinitive;
      currentPronoun = pronouns[pronounIndex];
      currentConjugation = verb.conjugations[pronounIndex];
      feedback = '';
      options = generateOptions(verb.conjugations, currentConjugation);
    };
  
    const generateOptions = (conjugations: string[], correctAnswer: string) => {
      const uniqueConjugations = Array.from(new Set(conjugations));
      const shuffled = uniqueConjugations.sort(() => 0.5 - Math.random());
      const options = shuffled.slice(0, 2);
      if (!options.includes(correctAnswer)) {
        options.push(correctAnswer);
      }
      return options.sort(() => 0.5 - Math.random());
    };
  
    const checkAnswer = (selectedAnswer: string) => {
      if (selectedAnswer === currentConjugation) {
        feedback = translations[language].correct;
        speakText(`${currentPronoun} ${selectedAnswer}`);
        setTimeout(nextVerb, 1200);
      } else {
        feedback = translations[language].incorrect;
        wrongSound.play();
      }
    };
  
    const speakText = (text: string) => {
      if (muted) return;
      const currentTime = Date.now();
      if (currentTime - lastSpokenTime < debounceTime) return;
      lastSpokenTime = currentTime;
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    };
  
    const setVoiceForLanguage = () => {
      const voices = speechSynthesis.getVoices();
      selectedVoice = voices.find((voice) => voice.lang.startsWith('fr')) || null;
    };
  
    onMount(() => {
      speechSynthesis.onvoiceschanged = setVoiceForLanguage;
      setVoiceForLanguage();
      nextVerb();
    });
  
    const toggleMute = () => {
      muted = !muted;
    };

    const goBackToSelector = () => {
        dispatch('backToSelector');
    };
  </script>
  
  <main>
    <div class="button-container">
        <button id="backButton" on:click={goBackToSelector} aria-label="Go Back">
            {translations[language].backButton}
        </button>
    </div>
    <h1>Test de conjugaison des verbes français - {verbsType === 'firstGroup' ? 'Premier groupe' : verbsType === 'secondGroup' ? 'Deuxième groupe' : 'Troisième groupe'}</h1>
    <div class="verb-test">
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <p on:mouseenter={() => speakText(`${currentPronoun} ${currentVerb}`)}> <strong>{currentPronoun} <span class="infinitive">({currentVerb})</span></strong></p>
      <div class="options">
        {#each options as option}
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <button on:click={() => checkAnswer(option)} on:mouseover={() => speakText(option)}>
            {option}
          </button>
        {/each}
      </div>
      <p class="feedback">{feedback}</p>
      <button on:click={toggleMute}>{muted ? 'Unmute' : 'Mute'}</button>
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      max-width: 600px;
      margin: 0 auto;
    }
  
    .verb-test {
      display: flex;
      font-size: 1.5rem;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    }
  
    .options {
      display: flex;
      flex-direction: row; /* Change to row */
      align-items: center;
      margin-top: 1rem;
      gap: 1rem; /* Add gap between buttons */
    }
  
    .options button {
      padding: 0.75rem 1.5rem;
      font-size: 1.2rem;
      color: white;
      background-color: #4caf50;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .options button:hover,
    .options button:focus {
      background-color: #45a049;
      outline: none;
    }
  
    .feedback {
      font-size: 1.2rem;
      font-weight: bold;
      margin-top: 1rem;
    }

    .infinitive {
      font-style: italic;
      color: #555;
    }
  </style>
