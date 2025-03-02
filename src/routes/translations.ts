export type Translation = {
	title: string;
	backButton: string;
	startMultiplication: string;
	startDivision: string;
	question: string;
	of: string;
	submit: string;
	correct: string;
	incorrect: string;
	quizCompleted: string;
	timeTaken: string;
	incorrectAttempts: string;
	seconds: string;
	topScores: string;
	rank: string;
	type: string;
	time: string;
	date: string;
	multiplication: string;
	division: string;
	recordsTitle: string; // Add this
	noRecords: string; // Add this
	mute: string;
	unmute: string;
	playAgain: string;
	verbs: string;
	firstGroup: string;
	secondGroup: string;
	thirdGroup: string;
};

export const translations: Record<'en' | 'fr' | 'es' | 'uk', Translation> = {
	en: {
		title: '🧮 Fun Math Quiz 🧮',
		backButton: '← Back',
		startMultiplication: 'Start Multiplication Quiz',
		startDivision: 'Start Division Quiz',
		question: 'Question',
		of: 'of',
		submit: 'Submit',
		correct: 'Correct! Well done!',
		incorrect: 'Oops! Try again!',
		quizCompleted: 'Quiz Completed!',
		timeTaken: 'Time taken:',
		incorrectAttempts: 'Incorrect attempts:',
		seconds: 'seconds',
		topScores: 'Top Scores',
		rank: 'Rank',
		type: 'Type',
		time: 'Time',
		date: 'Date',
		multiplication: 'Multiplication',
		division: 'Division',
		recordsTitle: 'Top Scores',
		noRecords: 'No scores yet',
		mute: 'Mute',
		unmute: 'Unmute',
		playAgain: 'Play Again',
		verbs: 'Verbs',
		firstGroup: 'First Group',
		secondGroup: 'Second Group',
		thirdGroup: 'Third Group'
	},
	fr: {
		title: '🧮 Quiz de Maths Amusant 🧮',
		backButton: '← Retour',
		startMultiplication: 'Commencer le Quiz de Multiplication',
		startDivision: 'Commencer le Quiz de Division',
		question: 'Question',
		of: 'sur',
		submit: 'Soumettre',
		correct: 'Correct ! Bien joué !',
		incorrect: 'Oups ! Essayez encore !',
		quizCompleted: 'Quiz Terminé !',
		timeTaken: 'Temps pris :',
		incorrectAttempts: 'Tentatives incorrectes :',
		seconds: 'secondes',
		topScores: 'Meilleurs Scores',
		rank: 'Rang',
		type: 'Type',
		time: 'Temps',
		date: 'Date',
		multiplication: 'Multiplication',
		division: 'Division',
		recordsTitle: 'Meilleurs Scores',
		noRecords: "Aucun score pour l'instant",
		mute: 'Silencieux',
		unmute: 'Son',
		playAgain: 'Rejouer',
		verbs: 'Verbes',
		firstGroup: 'Premier Groupe',
		secondGroup: 'Deuxième Groupe',
		thirdGroup: 'Troisième Groupe'
	},
	es: {
		title: '🧮 Divertido Quiz de Matemáticas 🧮',
		backButton: '← Volver',
		startMultiplication: 'Iniciar Quiz de Multiplicación',
		startDivision: 'Iniciar Quiz de División',
		question: 'Pregunta',
		of: 'de',
		submit: 'Enviar',
		correct: '¡Correcto! ¡Bien hecho!',
		incorrect: '¡Ups! ¡Inténtalo de nuevo!',
		quizCompleted: '¡Quiz Completado!',
		timeTaken: 'Tiempo tomado:',
		incorrectAttempts: 'Intentos incorrectos:',
		seconds: 'segundos',
		topScores: 'Mejores Puntuaciones',
		rank: 'Rango',
		type: 'Tipo',
		time: 'Tiempo',
		date: 'Fecha',
		multiplication: 'Multiplicación',
		division: 'División',
		recordsTitle: 'Mejores Puntuaciones',
		noRecords: 'Aún no hay puntuaciones',
		mute: 'Silencio',
		unmute: 'Sonido',
		playAgain: 'Jugar de nuevo',
		verbs: 'Verbos',
		firstGroup: 'Primer Grupo',
		secondGroup: 'Segundo Grupo',
		thirdGroup: 'Tercer Grupo'
	},
	uk: {
		title: '🧮 Веселий математичний тест 🧮',
		backButton: '← Назад',
		startMultiplication: 'Почати тест на множення',
		startDivision: 'Почати тест на ділення',
		question: 'Питання',
		of: 'з',
		submit: 'Відповісти',
		correct: 'Правильно! Молодець!',
		incorrect: 'Ой! Спробуй ще раз!',
		quizCompleted: 'Тест завершено!',
		timeTaken: 'Витрачений час:',
		incorrectAttempts: 'Неправильні спроби:',
		seconds: 'секунд',
		topScores: 'Найкращі результати',
		rank: 'Ранг',
		type: 'Тип',
		time: 'Час',
		date: 'Дата',
		multiplication: 'Множення',
		division: 'Ділення',
		recordsTitle: 'Найкращі результати',
		noRecords: 'Поки що немає результатів',
		mute: 'Вимкнути звук',
		unmute: 'Увімкнути звук',
		playAgain: 'Грати знову',
		verbs: 'Дієслова',
		firstGroup: 'Перша група',
		secondGroup: 'Друга група',
		thirdGroup: 'Третя група'
	}
};
