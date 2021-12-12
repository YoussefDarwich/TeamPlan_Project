import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {Output, EventEmitter} from '@angular/core';import { PopoverController } from '@ionic/angular';
;

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @ViewChild('username') username: ElementRef;
  @Output() usernameOutput = new EventEmitter<string>();


  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  sendUsername(){
      // this.usernameOutput.emit(this.username.nativeElement.value);
      // this.test.emit(false);
      // this.usernameOutput.emit("Hello from component");
      console.log("Even emitted.");
      this.popoverController.dismiss({data:"Hello"});

  }

}
