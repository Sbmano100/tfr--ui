import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectstatusComponent } from './add-projectstatus.component';

describe('AddProjectstatusComponent', () => {
  let component: AddProjectstatusComponent;
  let fixture: ComponentFixture<AddProjectstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
