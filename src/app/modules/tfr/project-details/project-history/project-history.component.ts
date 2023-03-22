import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss']
})
export class ProjectHistoryComponent implements OnInit {

  routeId !: number;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  displayProHisColumns = this.tfrService.displayProHisColumns;
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    if(!this.tfrService.isloggedin()){
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
  }

  projectHis = [
    {
      remark : "This is one of the important change in this Project.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "Department Head is changed from name 1 to name 2 due to xyz reasons.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "This is one of the important change in this Project.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "Department Head is changed from name 1 to name 2 due to xyz reasons.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "This is one of the important change in this Project.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "Department Head is changed from name 1 to name 2 due to xyz reasons.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "This is one of the important change in this Project.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "Department Head is changed from name 1 to name 2 due to xyz reasons.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "This is one of the important change in this Project.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "Department Head is changed from name 1 to name 2 due to xyz reasons.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "This is one of the important change in this Project.",
      date_of_modified: new Date,
      modified_by: "Name"
    },
    {
      remark : "Department Head is changed from name 1 to name 2 due to xyz reasons.",
      date_of_modified: new Date,
      modified_by: "Name"
    }
  ]

}
