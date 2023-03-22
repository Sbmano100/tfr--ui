import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-project-status-details',
  templateUrl: './project-status-details.component.html',
  styleUrls: ['./project-status-details.component.scss']
})
export class ProjectStatusDetailsComponent implements OnInit {

  projectId !: number;
  projectStatus: any;
  projStatus : string[][] = [[], [], []];
  dateOfAdd : string[][] = [[], [], []];
  addedBy: string[][] = [[], [], []];
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getProjectStatus(this.projectId).subscribe((data: any) => {
      this.projectStatus = data;
      console.log(this.projectStatus);
      this.projectStatus.forEach((data: any) => {
        if (data.status_type == "RU") {
          this.projStatus[0].push(data.status);
          this.dateOfAdd[0].push(data.date_of_add.toString());
          this.addedBy[0].push(data.addedBy.name);
        } else if (data.status_type == "MD") {
          this.projStatus[1].push(data.status);
          this.dateOfAdd[1].push(data.date_of_add.toString());
          this.addedBy[1].push(data.addedBy.name);
        } else {
          this.projStatus[2].push(data.status);
          this.dateOfAdd[2].push(data.date_of_add.toString());
          this.addedBy[2].push(data.addedBy.name);
        }
      })
      console.log(this.projStatus);
    });
  }

  editprojectstatus(){
    this.router.navigate(['tfr/forms/addprojectstatus',this.projectId])
  }
}
