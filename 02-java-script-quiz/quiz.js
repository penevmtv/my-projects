function solve() {
  const allSections = document.querySelectorAll('#quizzie section');
  const resultUl = document.getElementById('results');
  
  allSections.forEach(section => section.addEventListener('click', onClick));
  const rightAnswers = [2, 4, 2];
  let givenAns = [];
  let currentIdx = 0;
  
  function onClick(event) {
    const clickedLi = event.target.closest('li[data-quiz-index]');
    
    if (!clickedLi) return;
    
    const idx = Number(clickedLi.dataset.quizIndex);
    
    givenAns.push(idx);

    if (!allSections[currentIdx + 1]) {
      allSections[currentIdx].style.display = 'none';
      resultUl.querySelector('h1').textContent = checkResults();
      resultUl.style.display = 'block'; 
      return;
    }
    
    allSections[currentIdx].style.display = 'none';
    currentIdx++;
    allSections[currentIdx].style.display = 'block';
  }
  
  function checkResults() {
    const numRightAnswers = rightAnswers.reduce((acc, ans, idx) => ans === givenAns[idx] ? acc + 1 : acc ,0);
    if (rightAnswers.length === numRightAnswers) {
      return 'You are recognized as top JavaScript fan!';
    } else {
      return `You have ${numRightAnswers} right answers`;
    }
  }
}
