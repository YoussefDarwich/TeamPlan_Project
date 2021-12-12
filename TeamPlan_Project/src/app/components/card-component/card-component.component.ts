import { Component,Input, OnInit } from '@angular/core';
import { Task } from '../../services/app-services.service'

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent implements OnInit {


  @Input() task:Task
  @Input() assigned_name:string;

  colors:string[]=["nameBlue","nameYellow","nameGreen","nameRed"];
  @Input() colorIndex:number=0;
  constructor() { }

  ngOnInit() {}

  getColor(){
    return this.colors[this.colorIndex];
  }

}
