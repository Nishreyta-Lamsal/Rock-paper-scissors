            //we're converting the localStorage score to object again
            //when something doesn't exist in localStorage, it gives null. 
            //We reset the score, so there's no value in 'score' anymore.
            //So, to resolve that we conduct an if statement for when the score is null. 
            let score = JSON.parse(localStorage.getItem('score'));

            if (score === null){
                score = {
                    wins: 0,
                    losses: 0,
                    ties:0
                }
            };
            

            updateScoreElement();

            let isAutoPlaying = false;
            //setInterval() returns an ID which can be used to stop the interval
            let intervalId;

            function autoPlay(){
                if (!isAutoPlaying){
                intervalId = setInterval(() => {
                    const playerMove = pickComputerMove();
                    playGame(playerMove);

                } , 1000);
                isAutoPlaying = true;
                document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
            } else {
                clearInterval(intervalId);
                isAutoPlaying = false;
                document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
                
            }
        }

            document.querySelector('.auto-play-button')
            .addEventListener('click', () =>{
                autoPlay();
            })
                


            document.querySelector('.js-paper-button')
            .addEventListener('click', () => {
                playGame('paper');
            });

            //keydown means pressing any key in the keyboard to run the code
            //the 'event' contains key that we pressed in the keyboard and saves it
            document.body.addEventListener('keydown', (event) => {
                if(event.key === 'r'){
                    playGame('rock')

                } else if(event.key === 'p'){
                    playGame('paper');

                }else if(event.key === 's'){
                    playGame('scissors');
                } else if(event.key === 'a'){
                    autoPlay();
                } else if(event.key === 'Backspace'){
                    resetscore();
                }

            });

            function playGame(playerMove){
                const computerMove = pickComputerMove();

                    let result = '';

                    if(playerMove === 'scissors'){
                        if (computerMove === 'rock'){
                            result = 'You lose.';
                        } else if (computerMove === 'paper'){
                            result = 'You win.';

                        } else if (computerMove === 'scissors'){
                            result = 'Tie.'
                        }

                        
                    } else if (playerMove === 'rock'){
                                    
                        if (computerMove === 'rock'){
                            result = 'Tie.';
                        }

                        else if(computerMove === 'paper'){
                            result = 'You lose.';
                        }

                        else if (computerMove === 'scissors'){
                            result = 'You win.';
                        }


                    } else if (playerMove === 'paper'){
                        if (computerMove === 'rock'){
                            result = 'You win.';
                        } else if (computerMove === 'paper'){
                            result = 'Tie.';

                        } else if (computerMove === 'scissors'){
                            result = 'You lose.'
                        }
                    }

                    if(result === "You win."){
                        score.wins += 1;
                    } else if (result === "You lose."){
                        score.losses += 1;
                    } else if (result === "Tie."){
                        score.ties += 1;
                    }
                

                    //localstorage only supports string, so we're converting the score to string
                    localStorage.setItem('score', JSON.stringify(score));

                    updateScoreElement();

                    document.querySelector('.js-result')
                     .innerHTML = result;

                    
                    document.querySelector('.js-moves')
                     .innerHTML = ` You 
                     <img src=" ${playerMove}-emoji.png" class="your-move">
                     <img src="${computerMove}-emoji.png" class="computers-move"> 
                     Computer. `;

                }     

                    function updateScoreElement(){
                        document.querySelector('.js-score')
                         .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

                    }

                    document.querySelector('.reset-button')
                    .addEventListener('click', () => {
                        showResetConfirmation(); 
                        
                    })


                    function resetscore(){
                        score.wins = 0;
                        score.losses = 0;
                        score.ties = 0;
                        localStorage.removeItem('score');
                        updateScoreElement();

                    }


                    function showResetConfirmation(){
                        document.querySelector('.js-reset-confirmation')
                        .innerHTML = `Are you sure you want to reset the score? 
                            <button class ="js-reset-confirm-yes reset-confirm-yes" > Yes </button>
                            <button class ="js-reset-confirm-no reset-confirm-no"> No </button>`;

                    

                    document.querySelector('.js-reset-confirm-yes')
                    .addEventListener('click',() => {
                        resetscore();
                        hideResetConfirmation();
                    });

                    document.querySelector('.js-reset-confirm-no')
                    .addEventListener('click', () => {
                        hideResetConfirmation();
                    })
                }


                    function hideResetConfirmation(){
                        document.querySelector('.js-reset-confirmation')
                        .innerHTML = '';
                    }
                


               function pickComputerMove(){
                    const randomNum = Math.random();
                    let computerMove = '';

                    if (randomNum >= 0 && randomNum < 1/3){
                        computerMove = 'rock';
                    } else if (randomNum >= 1/3 && randomNum < 2/3){
                        computerMove = 'paper';
                    } else if (randomNum >= 2/3 && randomNum < 1){
                        computerMove = 'scissors';
                    }

                    return computerMove;

            }