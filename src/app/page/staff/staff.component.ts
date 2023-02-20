import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LeaveService } from 'src/app/shared/services/leave-service';
import { signupService } from 'src/app/shared/services/signup-service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  providers: [MessageService]
})
export class StaffComponent implements OnInit, OnDestroy {
  isobj !: any;
  isData !: any[];
  displayModal: boolean = false;
  myForm !: FormGroup;
  totalLeaves !: any;
  rejected !: any;
  approvedLeaves !: any;

  private unSubscribe$ = new Subject<void>()

  constructor(private leaveServ: LeaveService, private signupServ: signupService, private messageServ: MessageService) { }
  ngOnInit() {
    this.myForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required)
    })

    // to recogonize the user 
    this.signupServ.getUsers().pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      let obj = data.filter(obj => obj.id === localStorage.getItem('id'));
      this.isobj = obj[0]
    })


    // to get previous leaves
    this.leaveServ.getLeaves().pipe(takeUntil(this.unSubscribe$)).subscribe((data: any) => {
      let leavesArr: any[] = []
      for (let key in data) {
        if (data[key].id === localStorage.getItem('id')) {
          leavesArr.push(data[key]);
        }
      }
      // to show after leave submit
      if (!(leavesArr.length === 0)) {
        this.isData = leavesArr;
        this.totalLeaves = this.isData.length;
        this.rejected = this.isData.filter((obj) => obj.leaveStatus === 'rejected').length;
        this.approvedLeaves = this.isData.filter((obj) => obj.leaveStatus === 'approved').length;
      }
    })
  }


  // submit the leave object
  submitLeave() {
    let data = this.myForm.value;
    let day1: Date = new Date(data.startDate);
    let day2: Date = new Date(data.endDate);
    let timeDiff = day2.getTime() - day1.getTime();
    let dayDiff = timeDiff / (1000 * 3600 * 24);
    let leaveObj = { ...this.isobj, ...data, NOD: dayDiff, leaveStatus: 'pending' };
    this.leaveServ.postLeaves(leaveObj).pipe(takeUntil(this.unSubscribe$))
      .subscribe((res => {
        console.log(res);
        // tost message for user to tell leave has sent
        this.messageServ.add({
          severity: 'success',
          summary: 'SuccessFully Applied',
          detail: `applyed leave for ${leaveObj.NOD} days..`,
          life: 100000
        })
        this.leaveServ.getLeaves().pipe(takeUntil(this.unSubscribe$)).subscribe((data: any) => {
          let leavesArr: any[] = []
          for (let key in data) {
            if (data[key].id === this.isobj.id) {
              leavesArr.push(data[key]);
            }
          }
          // to show after leave submit
          this.isData = leavesArr;
          this.totalLeaves = this.isData.length;
          this.rejected = this.isData.filter((obj) => obj.leaveStatus === 'reject').length;
          this.approvedLeaves = this.isData.filter((obj) => obj.leaveStatus === 'approve').length;
        })
      }))
    this.myForm.reset()
  }

  applyLeave() {
    this.displayModal = !this.displayModal;
  }

  logout() {
    localStorage.clear()
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete()
  }
}
