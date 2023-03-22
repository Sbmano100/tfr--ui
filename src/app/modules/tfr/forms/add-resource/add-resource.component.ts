import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  addresourceForm: any
  options!: any;
  designationvalue = new Array();
  designationmap = new Map();
  id!: any
  constructor(private tfrService: TfrService, private router: Router) {
    this.options = [
      { value: "", viewValue: "Please Select a gender" },
      { value: "male", viewValue: "Male" },
      { value: "female", viewValue: "Female" },
      { value: "others", viewValue: "Others" }
    ];
  }

  ngOnInit(): void {
    this.form();
    this.tfrService.getdesignation().subscribe(result => {
      this.designation(result);
      //console.log(result)
    });
  }

  form() {
    this.addresourceForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      emp_id: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      skill: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      resourceList: new FormGroup({
        id: new FormControl("", [Validators.required]),
      })
    })

  }

  designation(value: any) {
    for (let i = 0; i < value.length; i++) {
      this.designationvalue[i + 1] = value[i].designation_name
      this.designationmap.set(value[i].designation_name, value[i].id)
    }
    //console.log(this.map1);
  }
  // res: Resource = {
  //   resourceList: Object,
  //   location: String,
  //   skill: String,
  //   password: String,
  //   name: String,
  //   email: String,
  //   emp_id: Number,
  //   gender: String,
  // }
  onSubmit() {
    //console.log(this.addresourceForm.value.resourceList.id )
    this.id = this.addresourceForm.value.resourceList.id
    this.addresourceForm.value.resourceList.id = this.designationmap.get(this.id)
    console.log(this.addresourceForm.value)
    // this.res.name = this.addresourceForm.value.name
    // this.res.emp_id = this.addresourceForm.value.emp_id
    // this.res.email = this.addresourceForm.value.email;
    // this.res.password = this.addresourceForm.value.password;
    // this.res.gender = this.addresourceForm.value.gender;
    // this.res.skill = this.addresourceForm.value.Skill
    // this.res.location = this.addresourceForm.value.location
    // this.res.resourceList = {
    //   id: this.addresourceForm.value.ResourceList
    // }
    // console.log(this.res)
    this.tfrService.addresource(this.addresourceForm.value).subscribe(result => {
      console.log(result)
    })
    this.addresourceForm.reset();
  }

}
// export class Resource {
//   resourceList: any
//   location: any
//   skill: any
//   password: any
//   name: any
//   email: any
//   emp_id: any
//   gender: any

// }
