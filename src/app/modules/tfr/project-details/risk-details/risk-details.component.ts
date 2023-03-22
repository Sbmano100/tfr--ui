import { Component, OnInit } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-risk-details',
  templateUrl: './risk-details.component.html',
  styleUrls: ['./risk-details.component.scss']
})
export class RiskDetailsComponent implements OnInit {

  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  risks: any;
  projectId !: number;
  riskForm: any;
  displayedRiskColumns = this.tfrService.displayedRiskColumns;
  routeId!: any
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getRisks(this.projectId).subscribe((data: any) => {
      this.risks = data;
      console.log(this.risks);
      
    });
    this.form();
  }

  form() {
    this.riskForm = new FormGroup({
      risk_mitigation: new FormControl(""),
      // end_date: new FormControl("")
      // modifiedBy: new FormGroup({
      //   id: new FormControl("")
      // })
    });
  }
  public get showaddrisk():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[12];
  }
  public get showupdaterisk():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[13];
  }
  addRisk() {
    this.router.navigate(['/tfr/forms/addrisk', this.projectId])
  }

  riskId!: number;

  getRiskID(id: number) {
    this.riskId = id;
  }

  onSubmit() {
    console.log(this.riskForm.value);
    // this.riskForm.value.end_date = this.tfrService.date;
    // this.riskForm.value.modifiedBy.id = this.tfrService.gettokenid();
    console.log(this.riskForm.value);
    this.tfrService.updateRiskMit(this.riskId, this.riskForm.value).subscribe();
    location.reload();
  }
}
