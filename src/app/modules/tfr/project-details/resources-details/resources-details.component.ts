import { Component, OnInit } from '@angular/core';
import { TfrService } from '../../tfr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resources-details',
  templateUrl: './resources-details.component.html',
  styleUrls: ['./resources-details.component.scss']
})
export class ResourcesDetailsComponent implements OnInit {

  resourceList: any;
  resourceForm!:any;
  constructor(private tfrService: TfrService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }
  displayedResColumns: string[] = this.tfrService.displayedResColumns;
  addprojectresource!: any
  map = new Map();
  routeId!: any
  id!: String;
  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id']
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
    this.tfrService.getResourcesByProjectId(this.routeId).subscribe((data: any) => {
      this.resourceList = data;
      this.resourceList.sort((a:any, b:any) => {
        if(a.resourceList.id != b.resourceList.id){
          return a.resourceList.id - b.resourceList.id;
        }else{
          return a.emp_id - b.emp_id;
        }
      });
      // console.log(this.resourceList);
    });
    this.resForm();
  }

  form() {
    this.addprojectresource = new FormGroup({
      project_id: new FormControl(""),
      resource_id: new FormControl("", [Validators.required]),
    });
  }

  public get showaddresource():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[3];
  }
  onSubmit() {
    this.addprojectresource.value.project_id = this.routeId;
    this.id = this.addprojectresource.value.resource_id
    this.addprojectresource.value.resource_id = this.map.get(this.id);
    console.log(this.addprojectresource.value)
    this.tfrService.addprojectresource(this.addprojectresource.value).subscribe(result=>{
    })
    this.addprojectresource.reset()
  }
  resId !: number;
  check = true;

  getRowID(id: any){
    this.check = false;
    this.resId = id;
  }

  toResourceHistory(id: number) {
    if(this.check){
      this.router.navigate(['tfr/details/resource-history', id]);
    }
    this.check = true;
  }

  removeResource(id: number){
    this.check = false;
    this.resId = id;
    this.tfrService.removeResource(this.resId, this.routeId).subscribe();
    location.reload();
  }

  resForm(){
    this.resourceForm = new FormGroup({
      remark:new FormControl("")
    });
  }

  onResSubmit(){
    console.log(this.resourceForm.value);
    this.tfrService.updateResRemark(this.resId, this.resourceForm.value).subscribe();
    location.reload();
  }
}
