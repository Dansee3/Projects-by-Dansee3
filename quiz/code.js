window.onload = function () {
  quiz.init();
};

class Quiz {
  questions = [
    {
      q: 'How much is 10/2 ?',
      answers: ['4', '5', '4.5'],
      correctAnswerNum: 1,
    },
    {
      q: 'How much is  16 + 2 ?',
      answers: ['18', '16', '20'],
      correctAnswerNum: 0,
    },
    {
      q: 'How much is 8 * 2 ?',
      answers: ['18', '10', '16'],
      correctAnswerNum: 2,
    },
  ];

  currentQuestionIndex = -1;
  heading = null;
  questionParagraph = null;
  answer0 = null;
  answer1 = null;
  answer2 = null;
  correctAnswerNum = null;

  userSelectedInput = null;
  userCorrectAnswersNum = 0;
  userIncorrectAnswersNum = 0;
  saveAnswerButton = null;
  nextQuestionButton = null;

  modalWindow = null;

  init() {
    this.heading = document.querySelector('.alert-heading');
    this.answer0 = document.querySelector('#answer0');
    this.answer1 = document.querySelector('#answer1');
    this.answer2 = document.querySelector('#answer2');
    this.questionParagraph = document.querySelector('#questionParagraph');

    this.saveAnswerButton = document.querySelector('#saveAnswerButton');
    this.nextQuestionButton = document.querySelector('#nextQuestionButton');

    this.setNextQuestionData();
    this.saveAnswerButton.addEventListener('click', this.checkAnswer);
    this.nextQuestionButton.addEventListener('click', this.setNextQuestionData);

    this.initModal();
  }

  initModal = () => {
    this.modalWindow = new bootstrap.Modal(
      document.getElementById('modalWindow'),
    );

    document.getElementById('closeModal').addEventListener('click', () => {
      this.modalWindow.hide();
      this.restartQuiz();
    });
  };

  checkAnswer = () => {
    this.userSelectedInput = document.querySelector(
      "input[type='radio']:checked",
    );
    if (!this.userSelectedInput) return;

    const selectedIndex = this.userSelectedInput.getAttribute('data-index');

    if (selectedIndex == this.correctAnswerNum) {
      //prawidłowa odpowiedz
      this.userCorrectAnswersNum++;
      this.userSelectedInput.classList.add('is-valid');
    } else {
      // odpowiedź nie prawidłowa
      this.userIncorrectAnswersNum++;
      this.userSelectedInput.classList.add('is-invalid');
    }

    this.setUserStats();

    this.saveAnswerButton.classList.add('disabled');
    this.nextQuestionButton.classList.remove('disabled');
  };

  setUserStats = () => {
    document.querySelector('#correctAnswers').innerHTML =
      this.userCorrectAnswersNum;
    document.querySelector('#incorrectAnswers').innerHTML =
      this.userIncorrectAnswersNum;
  };

  setNextQuestionData = () => {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      console.log('Koniec quizu');
      this.showModalResults();
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    const qStr = `Question ${this.currentQuestionIndex + 1} z ${
      this.questions.length
    }: `;
    this.heading.innerHTML = qStr + question.q;
    this.answer0.innerHTML = question.answers[0];
    this.answer1.innerHTML = question.answers[1];
    this.answer2.innerHTML = question.answers[2];
    this.correctAnswerNum = question.correctAnswerNum;

    document.querySelectorAll("input[type='radio']").forEach((el) => {
      el.classList.remove('is-valid');
      el.classList.remove('is-invalid');
      el.checked = false;
    });

    this.saveAnswerButton.classList.remove('disabled');
    this.nextQuestionButton.classList.add('disabled');
  };

  showModalResults = () => {
    const modalParagraph = document.getElementById('modalResults');
    let information;
    if (this.userCorrectAnswersNum >= this.userIncorrectAnswersNum) {
      information = 'Nice job ! Half or more of the answers are correct ! ';
    } else {
      information =
        'Unfortunately, less than half of the answers are incorrect';
    }
    modalParagraph.innerHTML = information;
    this.modalWindow.toggle();
  };

  restartQuiz = () => {
    this.currentQuestionIndex = -1;
    this.userCorrectAnswersNum = 0;
    this.userIncorrectAnswersNum = 0;

    this.setUserStats();

    this.setNextQuestionData();
  };
}

const quiz = new Quiz();
