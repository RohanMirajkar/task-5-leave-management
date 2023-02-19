import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocomponentComponent } from './nocomponent.component';

describe('NocomponentComponent', () => {
  let component: NocomponentComponent;
  let fixture: ComponentFixture<NocomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NocomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
