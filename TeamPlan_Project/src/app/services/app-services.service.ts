import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Card{

}
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  url = "http://localhost:80/";

  constructor(private http : HttpClient) { }

  getAllCards(){
    return this.http.get<JSON>(this.url + "trying/mobiletry.php");
  }
}
