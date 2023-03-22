import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingStatusHistoryComponent } from './invoicing-status-history.component';

describe('InvoicingStatusHistoryComponent', () => {
  let component: InvoicingStatusHistoryComponent;
  let fixture: ComponentFixture<InvoicingStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicingStatusHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicingStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
