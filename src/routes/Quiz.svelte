<script lang="ts">
	import { translations, type Translation } from './translations';
	import { onMount, createEventDispatcher } from 'svelte';
	import { addRecord, type Record } from '../store';
	import Chest from './Chest.svelte';

	const dispatch = createEventDispatcher();

	export let quizType: 'multiplication' | 'division';
	export let language: 'en' | 'fr' | 'es' | 'uk';

	let currentQuestion = 0;
	let questions: { question: string; answer: number }[] = [];
	let feedback = '';
	let answer: number | null = null;
	let incorrectAnswers = 0;
	let quizCompleted = false;
	let selectedVoice: SpeechSynthesisVoice | null = null;
	let encouragementMessage = '';
	let startTime: number;
	let timeTaken: number = 0;

	const totalQuestions = 10;

	const getRandomNumber = () => Math.floor(Math.random() * 7) + 3;

	const generateQuestion = () => {
		const num1 = getRandomNumber();
		const num2 = getRandomNumber();

		return quizType === 'multiplication'
			? { question: `${num1} × ${num2}`, answer: num1 * num2 }
			: { question: `${num1 * num2} ÷ ${num1}`, answer: num2 };
	};

	const mathTranslations = {
		en: { times: 'times', dividedBy: 'divided by' },
		fr: { times: 'fois', dividedBy: 'divisé par' },
		es: { times: 'por', dividedBy: 'dividido por' },
		uk: { times: 'помножити на', dividedBy: 'поділено на' }
	};

	const convertToSpokenFormat = (questionText: string): string =>
		questionText
			.replace('×', mathTranslations[language]?.times)
			.replace('÷', mathTranslations[language]?.dividedBy);

	const encouragements = {
		en: [
			"🌟 Perfect score! You're a math genius!",
			'🚀 Great job! Almost perfect!',
			'👍 Good effort! Keep practicing!',
			"💪 Don't give up! You'll improve with more practice!"
		],
		fr: [
			'🌟 Score parfait ! Tu es un génie des maths !',
			'🚀 Super travail ! Presque parfait !',
			'👍 Bon effort ! Continue à pratiquer !',
			"💪 N'abandonne pas ! Tu t'amélioreras avec plus de pratique !"
		],
		es: [
			'🌟 ¡Puntuación perfecta! ¡Eres un genio de las matemáticas!',
			'🚀 ¡Gran trabajo! ¡Casi perfecto!',
			'👍 ¡Buen esfuerzo! ¡Sigue practicando!',
			'💪 ¡No te rindas! ¡Mejorarás con más práctica!'
		],
		uk: [
			'🌟 Ідеальний результат! Ти математичний геній!',
			'🚀 Чудова робота! Майже ідеально!',
			'👍 Гарне зусилля! Продовжуй практикуватися!',
			'💪 Не здавайся! Ти покращишся з більшою практикою!'
		]
	};

	const getEncouragement = () => {
		const levels = [0, 2, 5, Infinity];
		const index = levels.findIndex((level) => incorrectAnswers <= level);
		return encouragements[language]?.[incorrectAnswers === 0 ? 0 : index];
	};

	const saveRecord = () => {
		const record: Record = {
			type: quizType,
			time: timeTaken,
			incorrectAttempts: incorrectAnswers,
			date: new Date().toLocaleString()
		};
		addRecord(record);
	};

	const nextQuestion = () => {
		if (currentQuestion < totalQuestions) {
			const newQuestion = generateQuestion();
			questions.push(newQuestion);
			feedback = '';
			answer = null;
			currentQuestion++;
			document.querySelector('input')?.focus();
			speakQuestion(newQuestion.question);
		} else {
			quizCompleted = true;
			timeTaken = Math.floor((Date.now() - startTime) / 1000);
			encouragementMessage = getEncouragement();
			saveRecord();
			playSound(tadaaSound);
		}
	};

	let muted = false;

	const toggleMute = () => {
		muted = !muted;
	};

	const playSound = (sound: HTMLAudioElement) => {
		if (!muted) {
			sound.play();
		}
	};
	const correctSound = new Audio('/audio/correct.mp3');
	const wrongSound = new Audio('/audio/wrong.mp3');
	const tadaaSound = new Audio('/audio/tadaa.mp3');

	const checkAnswer = () => {
    const correctAnswer = questions[currentQuestion - 1]?.answer;
    const utterance = new SpeechSynthesisUtterance(answer?.toString() || '');
    utterance.voice = selectedVoice;
    utterance.onend = () => {
        const isCorrect = answer === correctAnswer;
        feedback = isCorrect ? translations[language].correct : translations[language].incorrect;

        if (isCorrect) {
            if (!quizCompleted) {
                setTimeout(nextQuestion, 500);
                playSound(correctSound);
            }
        } else {
            incorrectAnswers++;
            playSound(wrongSound);
        }
        answer = null;
    };
    speechSynthesis.speak(utterance);
};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && answer !== null) checkAnswer();
	};

	const goBackToSelector = () => {
		dispatch('backToSelector');
	};

	const speakQuestion = (text: string) => {
		if (muted) return;
		const utterance = new SpeechSynthesisUtterance(convertToSpokenFormat(text));
		if (selectedVoice) utterance.voice = selectedVoice;
		speechSynthesis.speak(utterance);
	};

	const setVoiceForLanguage = () => {
		const voices = speechSynthesis.getVoices();
		const langMap = { en: 'en-CA', fr: 'fr-CA', es: 'es-MX', uk: 'uk-UA' };
		selectedVoice = voices.find((voice) => voice.lang.startsWith(langMap[language])) || null;
	};

	$: setVoiceForLanguage();

	const playAgain = () => {
		currentQuestion = 0;
		questions = [];
		feedback = '';
		answer = null;
		incorrectAnswers = 0;
		quizCompleted = false;
		encouragementMessage = '';
		startTime = Date.now();
		nextQuestion();
	};

	onMount(() => {
		speechSynthesis.onvoiceschanged = setVoiceForLanguage;
		startTime = Date.now();
		nextQuestion();
	});
</script>

<!-- Quiz UI -->
<div id="quiz">
	<div class="button-container">
		<button id="backButton" on:click={goBackToSelector} aria-label="Go Back">
			{translations[language].backButton}
		</button>

		<button id="muteButton" on:click={toggleMute} aria-label="Toggle Mute">
			{muted ? translations[language].unmute : translations[language].mute}
		</button>
	</div>

	{#if !quizCompleted}
		<div id="progress">
			<div id="progress-bar" style="width: {(currentQuestion / totalQuestions) * 100}%"></div>
		</div>
		<p>
			{translations[language].question}
			{currentQuestion}
			{translations[language].of}
			{totalQuestions}
		</p>
		<p class="question">{questions[currentQuestion - 1]?.question} = ?</p>
		<input type="number" bind:value={answer} on:keydown={handleKeyDown} aria-label="Answer Input" />
		<button on:click={checkAnswer} disabled={answer === null}
			>{translations[language].submit}</button
		>
		<p
			class="feedback {feedback.includes(translations[language].correct) ? 'correct' : 'incorrect'}"
		>
			{feedback}
		</p>
	{:else}
		<p>{translations[language].quizCompleted}</p>
		<p>{translations[language].timeTaken}: {timeTaken} {translations[language].seconds}</p>
		<p>{translations[language].incorrectAttempts}: {incorrectAnswers}</p>
		<p class="encouragement">{encouragementMessage}</p>
		<Chest isQuizCompleted={quizCompleted} />
		<button class="play-again-button" on:click={playAgain} aria-label="Play Again">
			{translations[language].playAgain}
		</button>
	{/if}
</div>

<style>
	#quiz {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	#backButton {
		align-self: flex-start;
		background-color: #f5f5f5;
		border: none;
		color: #333;
		padding: 0.5rem 1rem;
		margin-bottom: 1rem;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
	}

	#backButton:hover,
	#backButton:focus {
		background-color: #ddd;
		outline: none;
	}

	#muteButton {
		align-self: flex-end;
		padding: 0.5rem 1rem;
		background-color: #f5f5f5;
		border: none;
		color: #333;
		margin-bottom: 1rem;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
	}

	#muteButton:hover,
	#muteButton:focus {
		background-color: #ddd;
		outline: none;
	}

	.play-again-button {
		position: absolute;
		top: 90px;
		left: 50%;
		transform: translateX(-50%);
		padding: 1rem 2rem;
		font-size: 1.2rem;
		color: white;
		background-color: #4caf50;
	}

	#progress {
		width: 100%;
		height: 10px;
		background-color: #e0e0e0;
		border-radius: 5px;
		margin-bottom: 1rem;
	}

	#progress-bar {
		height: 100%;
		background-color: #4caf50;
		border-radius: 5px;
		transition: width 0.4s ease;
	}

	.question {
		font-size: 1.5rem;
		margin: 1rem 0;
		font-weight: bold;
		text-align: center;
	}

	input[type='number'] {
		width: 100%;
		padding: 0.5rem;
		font-size: 1.2rem;
		border: 2px solid #ccc;
		border-radius: 5px;
		margin-bottom: 1rem;
		box-sizing: border-box;
	}

	input[type='number']:focus {
		border-color: #4caf50;
		outline: none;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1.2rem;
		color: white;
		background-color: #4caf50;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button[disabled] {
		background-color: #ccc;
		cursor: not-allowed;
	}

	button:hover:not([disabled]),
	button:focus:not([disabled]) {
		background-color: #45a049;
		outline: none;
	}

	.feedback {
		font-size: 1.2rem;
		font-weight: bold;
		margin: 1rem 0;
	}

	.correct {
		color: #4caf50;
	}

	.incorrect {
		color: #f44336;
	}

	.encouragement {
		font-size: 1.5rem;
		margin-top: 1.5rem;
		color: #ff9800;
	}
</style>
