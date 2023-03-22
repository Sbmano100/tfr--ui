import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-add-risk',
  templateUrl: './add-risk.component.html',
  styleUrls: ['./add-risk.component.scss']
})
export class AddRiskComponent implements OnInit {


  constructor(private tfrService:TfrService,private route:ActivatedRoute) { }
addriskForm!:any
routeId!:any
date!:any

  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id']
    this.form();
  }

  form() {
    this.addriskForm = new FormGroup({
      risk: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      risk_mitigation: new FormControl(""),
      modifiedBy: new FormGroup({
        id: new FormControl(""),
      }),
      end_date: new FormControl(""),
      date_of_add: new FormControl(""),
      date_of_modified: new FormControl(""),
      createdBy: new FormGroup({
        id: new FormControl(""),
      }),
      projectRisk: new FormGroup({
        id: new FormControl(""),
      }),
    })
  }


onSubmit(){
this.date=this.addriskForm.value.start_date
this.addriskForm.value.modifiedBy.id=this.tfrService.gettokenid();
this.addriskForm.value.date_of_add=this.tfrService.date;
this.addriskForm.value.date_of_modified=this.tfrService.date;
this.addriskForm.value.createdBy.id=this.tfrService.gettokenid();
this.addriskForm.value.projectRisk.id=this.routeId;
this.addriskForm.value.start_date=formatDate(this.date,'dd-MM-yyyy','en-US')
console.log(this.addriskForm.value)
this.tfrService.addrisk(this.addriskForm.value).subscribe(result=>{
})
location.reload()
}
}
