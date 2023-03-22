import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TfrService } from './modules/tfr/tfr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tfr-ui';
  constructor(private tfrService:TfrService,private router:Router){}
  ngOnInit(){
    }

    // public get loggedin():boolean{
    //   if (!this.tfrService.isloggedin()) {
    //     this.tfrService.sessionexpired();
    //     this.router.navigate(['']);
    //   }
    //     return this.tfrService.isloggedin();
    // }
  }

