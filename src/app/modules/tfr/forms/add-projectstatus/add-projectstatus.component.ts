import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-add-projectstatus',
  templateUrl: './add-projectstatus.component.html',
  styleUrls: ['./add-projectstatus.component.scss']
})
export class AddProjectstatusComponent implements OnInit {

  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute) { }
  projectId!: number
  addprojectstatusForm!: any
  options!: any;
  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id']
    this.options = [
      { value: "", viewValue: "Please Select a Type" },
      { value: "RU", viewValue: "Resource updates" },
      { value: "MD", viewValue: "Milestone Deliveries" },
      { value: "AP", viewValue: "Appreciation" }
    ];
    this.form();
  }

  form() {
    this.addprojectstatusForm = new FormGroup({
      status: new FormControl("", [Validators.required]),
      status_type: new FormControl("", [Validators.required]),
      project: new FormGroup({
        id: new FormControl("")
      }),
      date_of_add: new FormControl(""),
      addedBy: new FormGroup({
        id: new FormControl("")
      }),
    });
  }


  onSubmit() {
    this.addprojectstatusForm.value.project.id = this.projectId;
    this.addprojectstatusForm.value.date_of_add = this.tfrService.date;
    this.addprojectstatusForm.value.addedBy.id = this.tfrService.gettokenid();
    console.log(this.addprojectstatusForm.value)
    this.tfrService.addprojectstatus(this.addprojectstatusForm.value).subscribe(result => {
      console.log(result)
    })
    this.addprojectstatusForm.reset()
    location.reload();
    //location.reload()
  }
}
