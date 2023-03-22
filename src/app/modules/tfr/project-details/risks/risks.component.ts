import { Component, OnInit, Input } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.scss']
})
export class RisksComponent implements OnInit {

  projectId!: number;
  risks: any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  // risks = this.tfrService.risks;
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if(!this.tfrService.isloggedin()){
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getRisks(this.projectId).subscribe((data: any) => {
      this.risks = data;
    });
  }
  toRiskDetails(){
    this.router.navigate(['tfr/details/risk-details', this.projectId]);
  }
}
