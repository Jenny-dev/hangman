import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit,OnChanges {

  @Input() id:string;
  private selectedImg:string;
  private images:string[] = ["assets\\Hangman 1.png",
                            "assets\\Hangman 2.png",
                            "assets\\Hangman 3.png",
                            "assets\\Hangman 4.png",
                            "assets\\Hangman 5.png",
                            "assets\\Hangman 6.png",
                            "assets\\Hangman 7.png"]
  constructor() { }

  ngOnInit():void{
    this.selectedImg = this.images[0];
  }

  ngOnChanges():void{
    this.selectedImg = this.images[this.id];
  }

}
