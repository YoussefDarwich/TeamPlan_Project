import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent implements OnInit {

  @Input() taskTitle:string;
  @Input() taskAssigned:string;
  @Input() taskDate:string;

  colors:string[]=["nameBlue","nameYellow","nameGreen","nameRed"];
  @Input() colorIndex:number=0;
  constructor() { }

  ngOnInit() {}

  getColor(){
    return this.colors[this.colorIndex];
  }

}
