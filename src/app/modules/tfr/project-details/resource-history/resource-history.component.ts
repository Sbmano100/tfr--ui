import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-resource-history',
  templateUrl: './resource-history.component.html',
  styleUrls: ['./resource-history.component.scss']
})
export class ResourceHistoryComponent implements OnInit {

  resourceId !: number;
  projectId !: number;
  checkHeads : boolean = false;
  resourceInfo: any;
  resourceHistory: any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  // resourceHistory = this.tfrService.resourceHistory;
  displayResHisColumns: string[] = this.tfrService.displayResHisColumns;
  ngOnInit(): void {
    this.resourceId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.tfrService.getResourceById(this.resourceId).subscribe((data: any) => {
      this.resourceInfo = data;
      
      if(this.resourceInfo.projectListForDep.length != 0){
        document.getElementsByClassName("head-p")[0].classList.remove("d-none");
        document.getElementsByClassName("head-s")[0].classList.remove("d-none");
        document.getElementsByClassName("head-e")[0].classList.remove("d-none");
        document.getElementsByClassName("norm-p")[0].classList.add("d-none");
        document.getElementsByClassName("norm-s")[0].classList.add("d-none");
        document.getElementsByClassName("norm-e")[0].classList.add("d-none");
        document.getElementsByClassName("skill")[0].classList.add("d-none");
      }else if(this.resourceInfo.projectListForLead.length != 0){
        document.getElementsByClassName("lead-p")[0].classList.remove("d-none");
        document.getElementsByClassName("lead-s")[0].classList.remove("d-none");
        document.getElementsByClassName("lead-e")[0].classList.remove("d-none");
        document.getElementsByClassName("norm-p")[0].classList.add("d-none");
        document.getElementsByClassName("norm-s")[0].classList.add("d-none");
        document.getElementsByClassName("norm-e")[0].classList.add("d-none");
        document.getElementsByClassName("skill")[0].classList.add("d-none");
      }else{
        this.projectId = data.project[0].id;
      }
    });

    this.tfrService.getResourceHistory(this.resourceId).subscribe((data: any) => {
      this.resourceHistory = data;
    });
  }
  toProject(id: any){
    this.projectId = id.querySelector("span").innerText;
    this.router.navigate(['tfr/details/project-details', this.projectId]);
  }
}
