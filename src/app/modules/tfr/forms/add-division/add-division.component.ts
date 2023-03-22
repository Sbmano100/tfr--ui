import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TfrService } from '../../tfr.service';


@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {

  adddivisionForm: any;
  options!: any
  divisionvalue = new Array();
  supdeptvalue = new Array();
  gid!: any;
  pid!: any
  constructor(private tfrService: TfrService) {
    this.options = [
      { value: "", viewValue: "Please Select a Type" },
      { value: "Division", viewValue: "Division" },
      { value: "Super Department", viewValue: "Super Department" },
      { value: "Department", viewValue: "Department" }
    ];
  }

  ngOnInit(): void {
    this.form();
    console.log("hai")
    this.onselectchanges();
    this.tfrService.division();
    this.divisionvalue=this.tfrService.divisionvalue;
    console.log(this.divisionvalue)
    this.tfrService.superdept();
    this.supdeptvalue=this.tfrService.supdeptvalue;
  }

  form() {
    this.adddivisionForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      department_type: new FormControl("", Validators.required),
      grand_parent_id: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ]),
      parent_id: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ]),
    });
  }
  onselectchanges() {
    this.adddivisionForm.get('department_type').valueChanges.subscribe((value: any) => {
      if (value == 'Division') {
        this.adddivisionForm.get('grand_parent_id').disable();
        this.adddivisionForm.get('parent_id').disable();
      }
      if (value == 'Super Department') {
        this.adddivisionForm.get('grand_parent_id').enable();
        this.adddivisionForm.get('parent_id').disable();
      }
      if (value == 'Department') {
        this.adddivisionForm.get('grand_parent_id').enable();
        this.adddivisionForm.get('parent_id').enable();
      }

    });
  }


  onSubmit() {
    this.gid = this.adddivisionForm.value.grand_parent_id
    this.pid = this.adddivisionForm.value.parent_id
    if (this.adddivisionForm.value.department_type == 'Division') {
      this.adddivisionForm.value.grand_parent_id = 0;
      this.adddivisionForm.value.parent_id = 0;
    }
    if (this.adddivisionForm.value.department_type == 'Super Department') {
      this.adddivisionForm.value.parent_id = this.tfrService.divmap.get(this.gid);
      this.adddivisionForm.value.grand_parent_id = 0;
    }
    if (this.adddivisionForm.value.department_type == 'Department') {
      this.adddivisionForm.value.grand_parent_id = this.tfrService.divmap.get(this.gid);
      this.adddivisionForm.value.parent_id = this.tfrService.supdeptmap.get(this.pid);
    }
    this.tfrService.adddivision(this.adddivisionForm.value).subscribe(result=>{
    })
    location.reload()
  }

}
