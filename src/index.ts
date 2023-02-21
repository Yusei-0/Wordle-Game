import { fromEvent, Subject } from "rxjs";
import WORD_LIST from './wordList.json'

const letterRows = document.getElementsByClassName("letter-row")
const onKeyDown$ = fromEvent(document, 'keydown');
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [''];
const messageText = document.getElementsByClassName("message-text") || { textContent: ""}
userAnswer.pop()

const getRandomWord = () => WORD_LIST[Math.round(Math.random()* WORD_LIST.length)];
let rightWord = getRandomWord();

const userWinOrLoose$ = new Subject();

const insertLetter = {
    next : event => {
        const { key , keyCode} = event;
       

        if(keyCode === 8){
         
            if(letterIndex === 0) return;

            letterIndex--;
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            letterBox.textContent = null;
            userAnswer.pop()
        }

        if(key.length === 1 && key.match(/[a-z]/i)){
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            if(letterIndex === 5)
                return;

            console.log(key);
        
           letterBox.classList.add('filled-letter');
           letterBox.textContent = key.toUpperCase();
           userAnswer.push(key.toUpperCase())
           console.log(userAnswer);
           
           letterIndex++;
        }

    }
}


const checkWord = {
    next : event => {

        const { key } = event;
        if(key === "Enter" && userAnswer.length === 5){
            console.log(userAnswer.join(""));
            console.log(rightWord);
            if(userAnswer.join("") === rightWord){
                messageText[0].textContent = "Esta es la palabra correcta"
                userWinOrLoose$.next("win")
            }
            else {
                messageText[0].textContent = "Te faltan algunas letras";
                let rightWordArray = Array.from(rightWord);

                for( let i =0; i < 5; i++){
                    let letterBoxAll= Array.from(letterRows)[letterRowIndex].children[i];
                    
                    let letterPosition = Array.from(rightWord).indexOf(userAnswer[i])
                    console.log(letterPosition);
                
                    if(letterPosition === -1){
                        letterBoxAll.classList.add("letter-grey")
                    }
                    else{
                        if(rightWordArray[i] === userAnswer[i])
                        letterBoxAll.classList.add("letter-green");
                        else
                        letterBoxAll.classList.add("letter-yellow");
                    }
              }
                    
                letterRowIndex++;
                letterIndex = 0;
                userAnswer =[];
            }

    
        }

        
        
    }
}

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
userWinOrLoose$.subscribe( (value) => {
    let letterBoxWin = Array.from(letterRows)[letterRowIndex]
    console.log(letterBoxWin);
    
    for (let i = 0; i < 5; i++) {
        const element = letterBoxWin.children[i];
        element.classList.add('letter-green'); 
    }
})