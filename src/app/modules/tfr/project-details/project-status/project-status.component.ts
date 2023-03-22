import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  projectId!: number;
  projectStatus: any;
  projStatus: string[][] = [[], [], []];
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getProjectStatus(this.projectId).subscribe((data: any) => {
      this.projectStatus = data;
      // console.log(this.projectStatus);
      this.projectStatus.forEach((data: any) => {
        // console.log(data);
        if (data.status_type == "RU") {
          this.projStatus[0].push(data.status);
        } else if (data.status_type == "MD") {
          this.projStatus[1].push(data.status);
        } else {
          this.projStatus[2].push(data.status);
        }
      })
    });
  }
  toProjectStatusDetails() {
    this.router.navigate(['tfr/details/project-status-details', this.projectId]);
  }
}
