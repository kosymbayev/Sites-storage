const quizData = [
    {
        question: 'What color is the grass?',
        a: 'white',
        b: 'green',
        c: 'red',
        d: 'blue',
        correct: 'b'
    },
    {
        question: 'In what years did the WW2 take place?',
        a: '1914 - 1918',
        b: '1941 - 1945',
        c: '1939 - 1945',
        d: '1940 - 1945',
        correct: 'c'
    },
    {
        question: 'First president of Kazakhstan?',
        a: 'Naruto Uzumaki',
        b: 'Leonardo DiCaprio',
        c: 'Captain Jack Sparrow',
        d: 'Nursultan Nazarbayev',
        correct: 'd'
    },
    {
        question: '___, I\'m gay? (ha-ha)',
        a: 'Yes',
        b: 'No',
        c: 'Maybe',
        d: 'Leave test',
        correct: 'a'
    }
]

const quiz = document.getElementById('quiz')
const answersEls = document.querySelectorAll('.answer')

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question;
    
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {

    let answer = undefined

    answersEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

function deselectAnswers() {
    answersEls.forEach((answerEl) => {
        answerEl.checked = false
    })
}

submitBtn.addEventListener('click', () => {

    const answer = getSelected()
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++
            
        if( currentQuiz < quizData.length ) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2 class='final_h2'> Правильных ответов ${score}/${quizData.length}</h2> <button onclick='location.reload()'>Заново</button> `
        }
    }
})