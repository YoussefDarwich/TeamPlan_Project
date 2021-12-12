import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService} from './../services/app-services.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  showMessage:boolean=false;
  errorMessage:string="";

  constructor(private storage:Storage,private router: Router, private serv : AppServicesService) { }

  ngOnInit() {
  }

  onSubmit(creds){

    let jsoncreds = {
      'username' : creds.value.Username,
      'password' : creds.value.Password,
      'full_name' : creds.value.Full_name
    }
    if(jsoncreds.password.length<8){
      this.showMessage=true;
      this.errorMessage="Password must be at least 8 characters long.";
      return;
    }

    if(jsoncreds.password!=creds.value.Password_confirm){
      this.showMessage=true;
      this.errorMessage="The password confirmation does not match."
      return;
    }

    this.serv.register(jsoncreds).subscribe(res=>{

 
      if(res['success_status'] == 'success'){
        this.router.navigate(['signin']);
      }
      else{
        this.showMessage=true;
        this.errorMessage="An error occured while registering."

      }
    });
  }

}
