import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn :'root'
})
export class LeaveService{
    url : string = 'https://employees-89f66-default-rtdb.asia-southeast1.firebasedatabase.app/leave.json'
    
    constructor(private http : HttpClient){}

    getLeaves(){
       return this.http.get(this.url)
    }


    postLeaves(leaveObj : any){
        return this.http.post(this.url , leaveObj)
    }


    updateLeave(leaveObj : any , leaveId : any){
        return this.http.patch(('https://employees-89f66-default-rtdb.asia-southeast1.firebasedatabase.app/leave/' + leaveId + '.json') , leaveObj)
    }
}