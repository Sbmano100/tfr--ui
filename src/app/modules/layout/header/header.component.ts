import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TfrService } from '../../tfr/tfr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private tfrService:TfrService,private router: Router){}
  
  public get login():boolean{
    return this.tfrService.isloggedin();
  }
  ngOnInit(): void {
  }
 
  // isauthenticated(){
  //   return false;
  // }
  public get showadddesignation():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[15];
  }
  public get showaddorganization():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[16];
  }
  public get showaddclient():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[14];
  }
  toDashboard(){
    if(!this.tfrService.isloggedin()){
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    else
    this.router.navigate(['tfr/dashboard']);
  } 

  toLogin(){
    this.router.navigate(['login']);
  }
  toLogout(){
    this.tfrService.removetoken('token');
    this.router.navigate(['']);
  }
  
  designation(){
    this.router.navigate(['/tfr/forms/adddesignation']);
  }

  division(){
    this.router.navigate(['/tfr/forms/adddivision']);
  }

  resource(){
    this.router.navigate(['/tfr/forms/addresource']);
  }

  client(){
    this.router.navigate(['/tfr/forms/addclient']);
  }
}
