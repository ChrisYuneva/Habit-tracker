import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdProgressbarBasicComponent } from './ngbd-progressbar-basic.component';

describe('NgbdProgressbarBasicComponent', () => {
  let component: NgbdProgressbarBasicComponent;
  let fixture: ComponentFixture<NgbdProgressbarBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdProgressbarBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdProgressbarBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
