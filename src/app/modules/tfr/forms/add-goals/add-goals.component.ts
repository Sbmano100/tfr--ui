import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TfrService } from '../../tfr.service';


@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss']
})
export class AddGoalsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tfrService: TfrService) { }
  routeId!: any
  addgoalsForm!: any
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id']
    this.form();
  }


  form() {
    this.addgoalsForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      milestone: new FormGroup({
        id: new FormControl(""),
      }),
      goal_status: new FormControl(""),
      goal_description: new FormControl("", [Validators.required]),
      end_date: new FormControl("",[Validators.required]),
      date_of_add: new FormControl(""),
      createdBy: new FormGroup({
        id: new FormControl(""),
      })
    });
  }
  onSubmit() {
    this.addgoalsForm.value.milestone.id = this.routeId;
    this.addgoalsForm.value.goal_status = "pending";
    this.addgoalsForm.value.date_of_add = this.tfrService.date;
    this.addgoalsForm.value.createdBy.id = this.tfrService.gettokenid();
    console.log(this.addgoalsForm.value)
    this.tfrService.addgoals(this.addgoalsForm.value).subscribe(result=>{
    })
    location.reload()
  }
}
