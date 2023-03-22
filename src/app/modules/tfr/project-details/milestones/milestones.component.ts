import { Component, OnInit } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  projectId!: number;
  milestones: any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) {}
  // mileStone = this.tfrService.milestone;
  // milCol = this.tfrService.mileCol;
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if(!this.tfrService.isloggedin()){
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getMilestones(this.projectId).subscribe((data: any) => {
      this.milestones = data;
    });
  }

  toMileDetail(){
    this.router.navigate(['tfr/details/milestone-details', this.projectId]);
  }

}
