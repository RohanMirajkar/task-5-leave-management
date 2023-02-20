import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LeaveService } from 'src/app/shared/services/leave-service';
import { signupService } from 'src/app/shared/services/signup-service';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css']
})
export class HodComponent implements OnInit {
  private unSubscribe$ = new Subject<void>();
  userObj !: any;
  isData: boolean = false;
  leaveArr: any[] = [];

  constructor(private leaveServ: LeaveService, private signupServ: signupService) { }

  ngOnInit() {
    //to recognize which hod is loged in
    this.signupServ.getUsers().pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      let obj = data.filter(obj => obj.id === localStorage.getItem('id'));
      this.userObj = obj[0]
    })

    //get leaves of department 
    this.leaveServ.getLeaves().pipe(
      takeUntil(this.unSubscribe$))
      .subscribe((data: any) => {
        let leaveArr: any[] = [];
        for (let key in data) {
          if (data[key].department === this.userObj.department) {
            leaveArr.push({ ...data[key], leaveID: key })
          }
        }
        if (!(leaveArr.length === 0)) {
          this.leaveArr = leaveArr;
          this.isData = true;
          console.log(this.leaveArr)
        }
      })
  }



  leaveAct(leaveObj: any, btn: any) {
    if (btn.innerText === 'Approve') {
      leaveObj.leaveStatus = 'approved'
      console.log(leaveObj)
      this.leaveServ.updateLeave(leaveObj, leaveObj.leaveID).pipe(takeUntil(this.unSubscribe$)).subscribe((data: any) => {
        console.log(data)
      })
    } else if (btn.innerText === 'Reject') {
      leaveObj.leaveStatus = 'rejected'
      console.log(leaveObj)
      this.leaveServ.updateLeave(leaveObj, leaveObj.leaveID).pipe(takeUntil(this.unSubscribe$)).subscribe((data: any) => {
        console.log(data)
      })
    }
  }


  logout() {
    localStorage.clear()
  }
}
