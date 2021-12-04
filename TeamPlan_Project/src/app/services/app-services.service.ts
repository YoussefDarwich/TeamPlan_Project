import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Task{
  id:number,
  project_id:number,
  title:string,
  assigned_id:number,
  completed:number,
  description:string,
  due_date:string
}
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  url = "http://localhost:80/MobileProjectAPIs/";

  constructor(private http : HttpClient) { }

  getAllCards(){
     return this.http.get<Task[]>(this.url + "getAllTasks.php");
  }

  getAllProjects(){
    return this.http.get<string[]>(this.url + "getAllProjects.php");
  }
}
