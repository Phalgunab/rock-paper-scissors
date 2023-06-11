let score = localStorage.getItem('score')||{
  wins: 0,
  loses: 0,
  ties:0
};
async function getCompVal() {
  let compVal = '';
  const compTry = Math.random();
  if (compTry < 0.33) {
    compVal = 'rock';
  } else if (compTry < 0.66) {
    compVal = 'paper';
  } else {
    compVal = 'scissors';
  }
  document.getElementById('compVal').innerHTML =`Computer: ${await getImage(compVal)}`;
  return compVal;
}

async function getWinner(yourMove, compMove) {
  if (yourMove === 'rock') {
    if (compMove === 'rock') {
      score.ties++;
      return 'tie';
    } else if (compMove === 'paper') {
      score.loses++;
      return 'comp';
    } else {
      score.wins++;
      return 'you';
    }
  } else if (yourMove === 'paper') {
    if (compMove === 'paper') {
      score.ties++;
      return 'tie';
    } else if (compMove === 'scissors') {
      score.loses++;
      return 'comp';
    } else {
      score.wins++;
      return 'you';
    }
  } else {
    if (yourMove === 'scissors') {
      if (compMove === 'scissors') {
        score.ties++;
        return 'tie';
      } else if (compMove === 'rock') {
        score.loses++;
        return 'comp';
      } else {
        score.wins++;
        return 'you';
      }
    }
  }
}

async function getImage(val){
  if(val ==='rock')
    return "<img src='images/rock.png'>";
  else if (val ==='scissors')
    return "<img src='images/scissors.png'>";
  else
    return "<img src='images/paper.png'>";
}
async function display(yourMove) {
  document.getElementById('yourVal').innerHTML = `You: ${await getImage(yourMove)}`;
  let result = await getWinner(yourMove, await getCompVal())
  if (result === "you")
    document.getElementById('result').innerHTML = 'YOU WON!!';
  else if (result === "comp")
    document.getElementById('result').innerHTML = 'COMPUTER WON!!';
  else
    document.getElementById('result').innerHTML = 'TIE!!';
    await displayResult();  
}

async function displayResult(){
  document.getElementById("count").innerHTML = `Wins: ${score.wins}    Loses: ${score.loses}   Ties: ${score.ties}`;
}

async function clearScore(){
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  await displayResult();
}