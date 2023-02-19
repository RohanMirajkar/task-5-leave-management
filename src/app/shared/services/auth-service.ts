import { Injectable } from "@angular/core";
import { filter, map } from "rxjs";
import { signupService } from "./signup-service";

@Injectable({
    providedIn : 'root'
})

export class AuthService{
    private islogedIn : boolean = false;

    
}