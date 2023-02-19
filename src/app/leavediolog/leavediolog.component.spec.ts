import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavediologComponent } from './leavediolog.component';

describe('LeavediologComponent', () => {
  let component: LeavediologComponent;
  let fixture: ComponentFixture<LeavediologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavediologComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavediologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
