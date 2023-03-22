import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-organization-projects',
  templateUrl: './organization-projects.component.html',
  styleUrls: ['./organization-projects.component.scss']
})
export class OrganizationProjectsComponent implements OnInit {
  
  orgId !: number;
  orgProjects: any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  displayOrgColumns = this.tfrService.displayOrgColumns;
  ngOnInit(): void {
    this.orgId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }

    this.tfrService.getOrgProjects(this.orgId).subscribe((data: any) => {
      this.orgProjects = data;
    })
  }

  toProjectDetails(id: number){
    this.router.navigate(['tfr/details/project-details', id]);
  }

}
