import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent implements OnInit {

  routeId !: number;

  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) {
  }

  ProjectDetail !: any;
  headId !: number;
  leadId !: number;
  spocId !: number;
  clientId !: number;
  deptId !: number;
  supDeptId !: number;
  divId !: number;
  desIdOfRes !: number;

  checkClient = true;
  checkSPOC = true;
  checkDesHead = true;
  checkLead = true;
  checkOrg = true;

  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getResourceById(this.tfrService.gettokenid()).subscribe((data: any) => {
      // console.log(data);
      this.desIdOfRes = data.resourceList.id;
      if (this.desIdOfRes == 5) {
        this.checkClient = false;
        this.checkDesHead = false;
        this.checkLead = false;
        this.checkOrg = false;
      } else if (this.desIdOfRes == 4) {
        this.checkClient = false;
        this.checkDesHead = false;
        this.checkOrg = false;
      } else if (this.desIdOfRes == 3) {
        this.checkClient = false;
        this.checkOrg = false;
      }
    })

    this.tfrService.getProjectDetail(this.routeId).subscribe((data: any) => {
      this.ProjectDetail = data;
      this.headId = this.ProjectDetail.depHead.id;
      this.leadId = this.ProjectDetail.projectLead.id;
      this.spocId = this.ProjectDetail.spoc.id;
      this.clientId = this.ProjectDetail.client.id;
      this.deptId = this.ProjectDetail.department.id;
      this.divId = this.ProjectDetail.division.id;
      this.supDeptId = this.ProjectDetail.superDepartment.id;
      let rag = document.getElementById("rag");


      if (this.ProjectDetail.rag_status.toLowerCase() == "r") {
        rag?.setAttribute('src', '../../../../../assets/red.png');
        rag?.setAttribute('alt', 'RED');
      } else if (this.ProjectDetail.rag_status.toLowerCase() == "a") {
        rag?.setAttribute('src', '../../../../../assets/amber.png');
        rag?.setAttribute('alt', 'AMBER');
      } else if (this.ProjectDetail.rag_status.toLowerCase() == "g") {
        rag?.setAttribute('src', '../../../../../assets/green.png');
        rag?.setAttribute('alt', 'GREEN');
      }
    });
  }

  public get showupdateproject():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[1];
  }

  toUpdateProject() {
    this.router.navigate(['tfr/details/update-project', this.routeId]);
  }
  toDepHeadHistory() {
    if (this.checkDesHead) {
      this.router.navigate(['tfr/details/resource-history', this.headId]);
    }
  }
  toTeamLeadHistory() {
    if (this.checkLead) {
      this.router.navigate(['tfr/details/resource-history', this.leadId]);
    }
  }
  toSPOCHistory() {
    if (this.checkSPOC) {
      this.router.navigate(['tfr/details/resource-history', this.spocId]);
    }
  }
  toClientHistory() {
    if (this.checkClient) {
      this.router.navigate(['tfr/details/client-details', this.clientId]);
    }
  }
  toInvoicingStatusHistory() {
    this.router.navigate(['tfr/details/invoicing-status-history', this.routeId]);
  }
  toProjectHistory() {
    this.router.navigate(['tfr/details/project-history', this.routeId]);
  }
  toDivProjects() {
    if (this.checkOrg) {
      this.router.navigate(['tfr/details/organization-projects', this.divId]);
    }
  }
  toSuperDeptProjects() {
    if (this.checkOrg) {
      this.router.navigate(['tfr/details/organization-projects', this.supDeptId]);
    }
  }
  toDeptProjects() {
    if (this.checkOrg) {
      this.router.navigate(['tfr/details/organization-projects', this.deptId]);
    }
  }
}
