

class Riddle {
  question: string;
  answer: string;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer.toLowerCase().trim();
  }

  checkAnswer(userAnswer: string): boolean {
    return userAnswer.toLowerCase().trim() === this.answer;
  }

  showQuestion(): void {
    console.log(`🧩 Riddle: ${this.question}`);
  }
}

const riddle1 = new Riddle(
  "Je parle sans bouche et j'entends sans oreilles. Qui suis-je ?",
  'echo',
);

riddle1.showQuestion();

const userAnswer = 'Echo';
const question = 'je me demande si ?';

if (riddle1.checkAnswer(userAnswer)) {
  console.log('Bonne réponse !');
} else {
  console.log('Mauvaise réponse ! Dommage !');
}
