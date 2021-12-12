import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService} from './../services/app-services.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  private auth:number;
  showMessage:boolean = false;

  constructor(private storage:Storage,private router: Router, private serv : AppServicesService) { }

  ngOnInit() {
  }


  onSubmit(creds){
    let jsoncreds = {
      'username' : creds.value.Username,
      'password' : creds.value.Password
    }

    this.serv.authenticate(jsoncreds).subscribe(res=>{
      this.auth =res['isFound'];
 
      if(this.auth == 1){
        this.storage.set('username',jsoncreds.username);
        this.router.navigate(['home']);
      }
      if(this.auth == 0){
        this.showMessage=true;

      }
    });
  }

  redirectToSignup(){
    this.router.navigate(['signup']);
  }

}
