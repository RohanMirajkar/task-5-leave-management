import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { signupService } from 'src/app/shared/services/signup-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit , OnDestroy{
  errMeg : boolean = false;
  myForm !: FormGroup;
  private unSubscribe$ = new Subject<void>()

  constructor(private signupServ : signupService , private router : Router){}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username : new FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required)
    })
  }

  logIn(){
    let loggedUser = this.myForm.value
    this.signupServ.getUsers().pipe(takeUntil(this.unSubscribe$)).subscribe((userArr : any[]) =>{
      let userDetail = userArr.filter((user : any) => user.username === loggedUser.username && user.password === loggedUser.password);
      if(!(userDetail.length === 0)){
        localStorage.setItem('id' , userDetail[0].id);
        if(userDetail[0].role === 'hod'){
          this.router.navigate(['hod'])
        }else{
          this.router.navigate(['staff'])
        }
      }else{
        this.errMeg = true
      }
    })
  }


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete()
  }

}
