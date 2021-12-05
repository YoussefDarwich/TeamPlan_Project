import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Task{
  id:number,
  project_id:number,
  title:string,
  assigned_username:number,
  completed:number,
  description:string,
  due_date:string
}

export interface Project{
  id:number,
  admin_username:string,
  title:string
}

export interface User{
  username:string,
  full_name:string
}
@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  url = "http://localhost:80/MobileProjectAPIs/";

  constructor(private http : HttpClient) { }

  getAllCards(project_id){
     return this.http.post<Task[]>(this.url + "getAllTasks.php",project_id);
  }

  getAllProjects(user){
    return this.http.post<Project[]>(this.url + "getAllProjects.php",user);
  }

  getAllMembers(project_id){
    return this.http.post<User[]>(this.url + "getAllMembers.php",project_id);
  }


  authenticate(creds){
    return this.http.post(this.url + "login.php",creds);
  }
}
