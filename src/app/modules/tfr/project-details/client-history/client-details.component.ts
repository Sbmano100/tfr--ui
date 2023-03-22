import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  clientInfo: any;
  projectList: any;
  clientId !: number;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  displayCliDetColumns = this.tfrService.displayCliDetColumns;

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['id'];
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }

    this.tfrService.getClientInfo(this.clientId).subscribe((data: any) => {
      this.clientInfo = data;
      this.projectList = data.clientList
      console.log(this.projectList);
    });
  }

  toProjectDetails(id: number){
    this.router.navigate(['tfr/details/project-details', id]);
  }
}
