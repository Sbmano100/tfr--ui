import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TfrService } from '../tfr.service';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.scss']
})
export class AddProjectFormComponent implements OnInit {

  addprojectForm: any;
  divisionvalue = new Array();
  supdeptvalue = new Array();
  deptvalue = new Array();
  clientvalue = new Array();
  map = new Map()
  did!: any
  pid!: any
  sid!: any
  constructor(private tfrService: TfrService, private router: Router) { }

  ngOnInit(): void {
    if (!this.tfrService.isloggedin()) {
      this.tfrService.sessionexpired();
      this.router.navigate(['']);
    }
    this.form();
    this.tfrService.getresource().subscribe(result => {
      Object.entries(result).forEach(([key, val]) => {
        this.map.set(key, val)
      })
    })
    this.tfrService.division();
    this.divisionvalue = this.tfrService.divisionvalue;
    this.tfrService.superdept();
    this.supdeptvalue = this.tfrService.supdeptvalue;
    this.tfrService.department();
    this.deptvalue = this.tfrService.deptvalue;
    this.tfrService.client();
    this.clientvalue = this.tfrService.clientvalue;
  }

  form() {
    this.addprojectForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      sow: new FormControl("", [Validators.required]),
      rag_status: new FormControl(""),
      division: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      superDepartment: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      department: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      client: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      depHead: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      projectLead: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      spoc: new FormGroup({
        id: new FormControl("", [Validators.required]),
      }),
      invoicing_status: new FormControl(""),
      date_of_add: new FormControl(""),
      createdBy: new FormGroup({
        id: new FormControl(""),
      }),
      modifiedBy: new FormGroup({
        id: new FormControl(""),
      }),
    });
  }


  onSubmit() {
    this.did = this.addprojectForm.value.depHead.id
    this.pid = this.addprojectForm.value.projectLead.id
    this.sid = this.addprojectForm.value.spoc.id
    this.addprojectForm.value.invoicing_status = "pending";
    this.addprojectForm.value.date_of_add = this.tfrService.date;
    this.addprojectForm.value.createdBy.id = this.tfrService.gettokenid();
    this.addprojectForm.value.modifiedBy.id = this.tfrService.gettokenid();
    this.addprojectForm.value.rag_status = "a";
    this.addprojectForm.value.division.id = this.tfrService.divmap.get(this.addprojectForm.value.division.id)
    this.addprojectForm.value.superDepartment.id = this.tfrService.supdeptmap.get(this.addprojectForm.value.superDepartment.id)
    this.addprojectForm.value.department.id = this.tfrService.deptmap.get(this.addprojectForm.value.department.id)
    this.addprojectForm.value.client.id = this.tfrService.clientmap.get(this.addprojectForm.value.client.id)
    this.addprojectForm.value.depHead.id = this.map.get(this.did)
    this.addprojectForm.value.projectLead.id = this.map.get(this.pid)
    this.addprojectForm.value.spoc.id = this.map.get(this.sid)
    //console.log(this.addprojectForm.value)
    this.tfrService.addproject(this.addprojectForm.value).subscribe(result => {
    })
    location.reload()
  }
}
