
// Enhanced React app logic for quiz (with tracking and scoring features)
document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('root');
  const quizData = [
    { question: "What is the main purpose of a load balancer?", options: ["Distribute traffic", "Manage databases", "Optimize routing"], answer: "Distribute traffic" },
    { question: "Which database type is best for hierarchical data storage?", options: ["SQL", "NoSQL", "Graph Database"], answer: "Graph Database" },
    { question: "What is the key benefit of microservices architecture?", options: ["Monolithic development", "Scalability and isolation", "Single point of failure"], answer: "Scalability and isolation" },
    { question: "Which protocol is commonly used for secure data transfer?", options: ["HTTP", "FTP", "HTTPS"], answer: "HTTPS" },
    { question: "What is a CDN primarily used for?", options: ["Content Delivery", "Data Storage", "User Authentication"], answer: "Content Delivery" }
  ];
  let currentQuestion = 0;
  let score = 0;
  let startTime, endTime;
  let timeTaken = [];

  function renderQuestion() {
    if (currentQuestion === 0) startTime = new Date();
    const question = quizData[currentQuestion];
    appRoot.innerHTML = `<h2>${question.question}</h2>` + 
      question.options.map((option, index) => `<button onclick="selectAnswer('${option}')">${option}</button>`).join('');
  }

  window.selectAnswer = function (answer) {
    endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000; // time in seconds
    timeTaken.push(timeDiff);
    startTime = new Date(); // reset start time for next question

    if (quizData[currentQuestion].answer === answer) score++;
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      renderQuestion();
    } else {
      showResults();
    }
  };

  function showResults() {
    const averageTime = (timeTaken.reduce((a, b) => a + b, 0) / timeTaken.length).toFixed(2);
    appRoot.innerHTML = `<h2>Your score is ${score}/${quizData.length}</h2>` +
                        `<p>Average time per question: ${averageTime} seconds</p>` +
                        `<button onclick="restartQuiz()">Restart Quiz</button>`;
  }

  window.restartQuiz = function () {
    currentQuestion = 0;
    score = 0;
    timeTaken = [];
    renderQuestion();
  };

  renderQuestion();
});
