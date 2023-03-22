import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TfrService } from '../../tfr.service';

@Component({
  selector: 'app-add-milestones',
  templateUrl: './add-milestones.component.html',
  styleUrls: ['./add-milestones.component.scss']
})
export class AddMilestonesComponent implements OnInit {

  addmilestoneForm!: any;
  constructor(private tfrService: TfrService, private route: ActivatedRoute) { }
  routeId!: any
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    this.milestoneform();
  }

  milestoneform() {
    this.addmilestoneForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      project: new FormGroup({
        id: new FormControl(""),
      }),
      end_date: new FormControl(""),
      start_date: new FormControl("", [Validators.required]),
      status: new FormControl(""),
      date_of_add: new FormControl(""),
      weightage: new FormControl("", [Validators.required]),
      resource: new FormGroup({
        id: new FormControl(""),
      })
    })

  }

  onSubmit() {
    this.addmilestoneForm.value.project.id = this.routeId
    this.addmilestoneForm.value.resource.id = this.tfrService.gettokenid();
    this.addmilestoneForm.value.date_of_add = this.tfrService.date
    this.addmilestoneForm.value.status = "pending"
    console.log(this.addmilestoneForm.value)
    this.tfrService.addmilestone(this.addmilestoneForm.value).subscribe(result => {

    })
  }

}
