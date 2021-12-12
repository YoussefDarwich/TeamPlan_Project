import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @ViewChild('username') username: ElementRef;
  @Input() field:string;
  @Input() type:string;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  sendUsername(){
      const username:string = this.username.nativeElement.value;
      
      if(username!=""){
        this.popoverController.dismiss({data:username});
      }
  }

}
