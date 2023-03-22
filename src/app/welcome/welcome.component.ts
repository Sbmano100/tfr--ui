import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TfrService } from '../modules/tfr/tfr.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private tfrserv:TfrService, private router:Router) { }

  ngOnInit(): void {
    if(this.tfrserv.isloggedin()){
      this.router.navigate(['tfr'])
    }
  }

}
