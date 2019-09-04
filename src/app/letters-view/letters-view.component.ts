import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-letters-view',
  templateUrl: './letters-view.component.html',
  styleUrls: ['./letters-view.component.css']
})
export class LettersViewComponent implements OnInit {
  @Input() disabledLetters:string[];
  @Output() chooseLetter:EventEmitter<string> = new EventEmitter<string>();
  private lettersStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private letters:string[];
  
  constructor() { }

  ngOnInit():void{
    this.letters = this.lettersStr.split("");
  }

  choose(letter:string):void{
    this.chooseLetter.emit(letter);
  }

}
