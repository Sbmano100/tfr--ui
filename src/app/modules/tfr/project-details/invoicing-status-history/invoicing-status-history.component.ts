import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-invoicing-status-history',
  templateUrl: './invoicing-status-history.component.html',
  styleUrls: ['./invoicing-status-history.component.scss']
})
export class InvoicingStatusHistoryComponent implements OnInit {

  invoiceId !: number;
  invoiceHis: any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  displayInvColumns = this.tfrService.displayInvColumns
  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getInvoice(this.invoiceId).subscribe((data: any) => {
      this.invoiceHis = data;
      console.log(this.invoiceHis);
    });

  }

  // invoiceHis = [
  //   {
  //     invoicing_status: "pending",
  //     remark: "Remark",
  //     date_of_modified: new Date,
  //     modified_by: "abc"
  //   },
  //   {
  //     invoicing_status: "pending",
  //     remark: "Remark",
  //     date_of_modified: new Date,
  //     modified_by: "abc"
  //   },
  //   {
  //     invoicing_status: "pending",
  //     remark: "Remark",
  //     date_of_modified: new Date,
  //     modified_by: "abc"
  //   },
  //   {
  //     invoicing_status: "pending",
  //     remark: "Remark",
  //     date_of_modified: new Date,
  //     modified_by: "abc"
  //   },
  //   {
  //     invoicing_status: "pending",
  //     remark: "Remark",
  //     date_of_modified: new Date,
  //     modified_by: "abc"
  //   },
  //   {
  //     invoicing_status: "pending",
  //     remark: "Remark",
  //     date_of_modified: new Date,
  //     modified_by: "abc"
  //   }
  // ]
}
