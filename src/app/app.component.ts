import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from './services/movies.service';
import { Movie } from "./movie";

const MAX_FAILURES = 6;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  private title:string = 'HANGMAN';
  private movies:Movie[];                 //all movies

  private movieWordsLetters: string[][]; //array of movie words. Each word is represented as array of letters.
  private movieLetters:object[];         //movie's different letters map. for each letter we save it's locations (wordIndex and letter index) in the movie string
  
  private chosenLetters:string[] = [];  //disabled letters in bank
  private initOpenLetters:string = "";  //string that contains all the letters that were randomly open at the beginning 

  private failuresNum:number;
  private gameEnded:boolean;
  private gameWin:boolean;

  private subscription:Subscription;

  constructor(private moviesService:MoviesService){
  }

  ngOnInit():void{
    this.subscription =this.moviesService.getMovies().subscribe(
      data => { 
        this.initGame();
     }, 
     error => console.log(error));
  }

  initGame():void{
    let movieName = this.moviesService.getRandMovie();

    this.movieWordsLetters = [];
    this.movieLetters = [];
    this.chosenLetters = [];
    this.initOpenLetters = "";
    this.failuresNum = 0;
    this.gameEnded = false;

    this.processString(movieName.toUpperCase());
    this.openRandLetters();
  }

  processString(movie:string):void{
    let movieWords = movie.split(" ");

    for(let i=0; i<movieWords.length; i++){
      this.movieWordsLetters[i] =movieWords[i].split("");
      for(let j=0; j<this.movieWordsLetters[i].length; j++){
        let letter = this.movieWordsLetters[i][j];
          if(!this.movieLetters[letter]){
            this.movieLetters[letter] = [];
          }
          this.movieLetters[letter].push({word:i,letter:j});
          this.movieWordsLetters[i][j] = "*"; //mark hidden letter with * 
      }
    }
  }

  //open 25% of the different letters in movie string
  openRandLetters():void{
    let differentLetters = Object.keys(this.movieLetters).length;
    let num = Math.floor(differentLetters / 4); 

    for(let i=0; i<num; i++){
      let randId = Math.floor(Math.random()*(differentLetters-i));
      let randLetter = Object.keys(this.movieLetters)[randId];

      this.chosenLetters.push(randLetter); 

      this.movieLetters[randLetter].forEach(idObj=> {
        this.movieWordsLetters[idObj.word][idObj.letter] = randLetter;
      });
      
      this.initOpenLetters += randLetter;
      delete this.movieLetters[randLetter];
    }

  }

  openLetter(letter:string):void{
    if(this.chosenLetters.indexOf(letter) == -1){
      if(this.movieLetters[letter]){ //letter exists in movie word
        
        this.movieLetters[letter].forEach(idObj=> {
          this.movieWordsLetters[idObj.word][idObj.letter] = letter;
        });

        delete this.movieLetters[letter];
        this.checkIfWin();
      }else{
        this.failuresNum++;
        this.checkIfLose();
      }
      this.chosenLetters.push(letter);
    }

  }

  checkIfWin():void{
    if(Object.keys(this.movieLetters).length == 0){
      this.gameWin = true;
      this.gameEnded = true;
    }
  }

  checkIfLose():void{
    if(this.failuresNum == MAX_FAILURES){
      this.gameWin = false;
      this.gameEnded = true;
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
}
