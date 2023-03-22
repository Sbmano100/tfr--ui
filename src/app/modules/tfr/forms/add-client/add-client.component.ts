import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { TfrService } from '../../tfr.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  addclientForm:any;
  options!:any
  constructor(private tfrService:TfrService) {
    this.options = [
      { value: "", viewValue: "Please Select a designation" },
      { value: "ED", viewValue: "ED" },
      { value: "MD", viewValue: "MD" },
    ];
   }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.addclientForm=new FormGroup({
      name:new FormControl("",[Validators.required]),
      emp_name:new FormControl("",[Validators.required]),
      emp_email:new FormControl("",[Validators.required]),
      emp_id:new FormControl("",[Validators.required]),
      client_location:new FormControl("",Validators.required),
      emp_designation:new FormControl("",[Validators.required]),
      date_of_add:new FormControl(""),
      createdBy:new FormGroup({
        id:new FormControl(""),
      }),
      modifiedBy:new FormGroup({
        id:new FormControl(""),
      })
    });
  }
  
  onSubmit(){
    this.addclientForm.value.date_of_add=this.tfrService.date
    this.addclientForm.value.createdBy.id=this.tfrService.gettokenid();
    this.addclientForm.value.modifiedBy.id=this.tfrService.gettokenid();
    console.log(this.addclientForm.value)
    this.tfrService.addclient(this.addclientForm.value).subscribe(result=>{
    })
    location.reload()
  }
}

