import { Component, OnInit } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})

export class ResourcesComponent implements OnInit {
  projectId !: number;
  resourceList: any;
  sortedResourceList: any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  // resourceList = this.tfrService.resourceList;
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getResourcesByProjectId(this.projectId).subscribe((data: any) => {
      this.resourceList = data;
      this.resourceList.sort((a: any, b: any) => {
        if (a.resourceList.id != b.resourceList.id) {
          return a.resourceList.id - b.resourceList.id;
        } else {
          return a.emp_id - b.emp_id;
        }
      });
    });
  }
  toResourceDetails() {
    this.router.navigate(['tfr/details/resource-details', this.projectId]);
  }
}
