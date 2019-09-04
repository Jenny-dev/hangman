import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent {
  
  @Input() id:string;
  @Output() newGame:EventEmitter<any> = new EventEmitter();
  private images:string[] = ["assets\\shit_symbol.png","assets\\yes_symbol.png"];
  private texts:string[] = ["SHIT!\n YOU\n DIED\n :(","YES\n YOU\n DID\n IT!"];
  
  constructor() { }

  playAgain():void{
    this.newGame.emit();
  }

}
