import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TfrService } from '../modules/tfr/tfr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  id!:any
  emp!:any
  constructor(private tfrserv:TfrService, private router:Router) { }

  auth:boolean=false;
  public get invalid():boolean{
    return this.auth;
  }
  public get employee():boolean{
    return this.emp;
  }
  ngOnInit() {
    this.initform();
    if(this.tfrserv.isloggedin()){
      this.router.navigate(['tfr'])
    }
     //console.log(this.auth)
  }
  initform(){
    this.loginForm=new FormGroup({
      email:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
    });
    }

    onSubmit(){
      setTimeout(()=>this.fetch(),200)
    }
    fetch(){
      if(this.loginForm.valid){
        this.tfrserv.login(this.loginForm.value).subscribe(result=>{
          if(result[0]==true){
            this.tfrserv.userid=result[1];
            this.tfrserv.getresourcefeature(result[1]).subscribe(res=>{
             // console.log(res)
              this.tfrserv.featurelist=res;
              this.tfrserv.ifvalid();
              this.tfrserv.getResourceById(this.tfrserv.gettokenid()).subscribe(obj=>{
                this.id=obj.resourceList.id
                if(this.id==6){
                this.auth=false;  
                this.emp=true;
                }
                else
                this.router.navigate(['tfr']);
              })
              //console.log(this.tfrserv.featurelist)
            })
            
            //this.tfrserv.sendusername(this.tfrserv.username);
            
          }
          else
          this.auth=true;
        })
      }
    }

}
