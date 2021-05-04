'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p'); /* CSSセレクタ文字列を使う方法なので、id属性は特別に#を付ける */

  const quizSet = [
    {q: '添付ファイル1つあたりのサイズ上限は？', c: ['1GB', '5MB', '5GB']},
    {q: '1アプリにつき作成できる「一覧」の上限は？', c: ['1000', '100', '50']},
    {q: '1アプリにつき設定できるフィールド数の上限は？', c: ['500', '100', '50']},
    {q: '1アプリにつき作成できるレコード数の上限は？', c: ['なし', '10万', '100万']},
    {q: '1アプリにつき作成できる「グラフ」の上限は？', c: ['1000', '100', '50']},
    {q: '1アプリにつき設定できるプラグインの上限は？', c: ['20', '5', '10']},
    {q: 'アプリテンプレート1つに含まれるアプリ数の上限は？', c: ['100', '10', '1000']},
    {q: 'CSVファイル書き出しの際のサイズ上限は？', c: ['100MB', '50MB', '1GB']},
  ];
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]]; 
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) { // choicesの最初の子要素がある限り最初の子要素を消す。whileはfalseやnullでない限り処理を実行する。
      choices.removeChild(choices.firstChild);
    }
    const shuffledChoices = shuffle([...quizSet[currentNum].c]); // スプレッド構文で配列の要素を配列内に展開
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length -1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}