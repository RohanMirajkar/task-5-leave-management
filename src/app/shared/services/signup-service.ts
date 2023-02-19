import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class signupService{
    url : string = 'https://employees-89f66-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

    constructor(private http : HttpClient){}
    
    postNewUser(body : object){
       return this.http.post(this.url , body)
    }

    getUsers(){
       return this.http.get(this.url).pipe(
        map((res : any)=>{
            let empArr : any[] = [];
            for(let key in res){
                empArr.push({...res[key] , id : key})
            }
            return empArr
        })
       )
    }
}