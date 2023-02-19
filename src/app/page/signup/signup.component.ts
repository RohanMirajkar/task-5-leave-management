import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { signupService } from 'src/app/shared/services/signup-service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers : [ MessageService]
})
export class SignupComponent implements OnInit ,OnDestroy{
  public departments : any[] = ['Salse' , 'Account','hr'];
  public myForm !: FormGroup;
  private unSubscribe$ = new Subject<void>()
  

  constructor(private signupServ : signupService , private messageServ : MessageService){};

  ngOnInit(): void {
    this.myForm = new FormGroup({
      role : new FormControl('', Validators.required),
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      contact : new FormControl('', Validators.required),
      department : new FormControl('', Validators.required),
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    })
  }


  register(){
    let userObj = this.myForm.value;
    if(userObj.role === 'hod'){
      this.signupServ.getUsers().pipe(takeUntil(this.unSubscribe$)).subscribe((UsersArr : any) => {
        let departmentArr : any[] = []
        for(let key in UsersArr){
         departmentArr.push(UsersArr[key].department)
        }
        if(departmentArr.includes(userObj.department)){
          this.messageServ.add({
            severity : 'error',
            summary : 'Error',
            detail : `${userObj.department} HOD is already there`,
            life:50000
          })
        }else{
          this.signupServ.postNewUser(userObj).pipe(takeUntil(this.unSubscribe$)).subscribe((data : any)=>{
            console.log(data);
            this.messageServ.add({
              severity : 'success',
              summary : 'Signup SuccessFul',
              detail : `hello ..!${userObj.firstname} ${userObj.lastname} ,you can Login with your username and password`,
              life:100000
            })
          })
        }
      })
    }else{
      this.signupServ.postNewUser(userObj).pipe(takeUntil(this.unSubscribe$)).subscribe((res)=>{
        this.messageServ.add({
          severity : 'success',
          summary : 'signup SuccessFul',
          detail : `hello ..!${userObj.firstname} ${userObj.lastname} ,you can Login with your username and password`,
          life:100000
        })
      })
    }
   
  
    this.myForm.reset()
  }








  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete()
  }
}


