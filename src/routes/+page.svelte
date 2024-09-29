<script context="module" lang="ts">
  export type Language = 'en' | 'fr' | 'es' | 'uk';
</script>

<script lang="ts">
  import { translations } from './translations';
  import LanguageSelect from './LanguageSelect.svelte';
  import Quiz from './Quiz.svelte';
  import Records from './Records.svelte';

  let currentLanguage: Language = 'en';
  let quizType: 'multiplication' | 'division' | null = null;

  const startQuiz = (type: 'multiplication' | 'division') => {
    quizType = type;
  };

  const changeLanguage = (lang: Language) => {
    currentLanguage = lang;
  };

  const showQuizSelector = () => {
    quizType = null;
  };
</script>

<main>
  {#if !quizType}
    <div class="language-toggle">
      <LanguageSelect
        {currentLanguage}
        onChangeLanguage={(lang) => changeLanguage(lang)}
      />
    </div>
    <h1>{translations[currentLanguage].title}</h1>
    <div class="start-buttons">
      <button on:click={() => startQuiz('multiplication')}>
        {translations[currentLanguage].startMultiplication}
      </button>
      <button on:click={() => startQuiz('division')}>
        {translations[currentLanguage].startDivision}
      </button>
    </div>
  {/if}

  {#if quizType}
    <Quiz {quizType} language={currentLanguage} on:backToSelector={showQuizSelector} />
  {/if}
  <Records language={currentLanguage} />
</main>

<style>
  h1 {
    text-align: center;
    color: #4a4a4a;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 2em;
  }

  .start-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .start-buttons button {
    padding: 12px 24px;
    font-size: 1.2em;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px;
    min-width: 180px;
  }

  .start-buttons button:hover {
    background-color: #45a049;
  }

  .language-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 1.8em;
    }

    .start-buttons button {
      padding: 10px 20px;
      font-size: 1em;
    }
  }
</style>
