import { Component, OnInit } from '@angular/core';
import { TfrService } from '../tfr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private tfrService: TfrService, private router: Router) { }
  projectInfo: any;
  ngOnInit(): void {

    this.tfrService.getResourceById(this.tfrService.gettokenid()).subscribe(result=>{
      if((result.resourceList.id==1)||(result.resourceList.id==2)){
        this.tfrService.getAllProjects().subscribe((data: any) => {
          this.projectInfo = data;
          this.projectInfo.forEach((val: any) => {
            if (val.rag_status.toLowerCase() == "a") {
              val.rag_status = '../../../../assets/amber.png';
            } else if (val.rag_status.toLowerCase() == "r") {
              val.rag_status = '../../../../assets/red.png';
            } else if (val.rag_status.toLowerCase() == "g") {
              val.rag_status = '../../../../assets/green.png';
            }
          });
          // console.log(this.projectInfo);
        });
      }
      else{
        this.tfrService.getprojectbyresid(this.tfrService.gettokenid()).subscribe(res=>{
          //console.log(res)
          this.projectInfo=res;
          this.projectInfo.forEach((val: any) => {
            if (val.rag_status.toLowerCase() == "a") {
              val.rag_status = '../../../../assets/amber.png';
            } else if (val.rag_status.toLowerCase() == "r") {
              val.rag_status = '../../../../assets/red.png';
            } else if (val.rag_status.toLowerCase() == "g") {
              val.rag_status = '../../../../assets/green.png';
            }
          });
        })
      }
    })

    
  }
  public get showaddproject():boolean{
    const itemStr = localStorage.getItem('token')
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr)
    return item.featurelist[0];
  }

  displayedColumns: string[] = this.tfrService.displayedColumns;
  // ProjectList: ProjectData[] = this.tfrService.ProjectList;
  // public get addproject():boolean{
  //   return this.tfrService.showaddproject();
  // }
  toAddProject() {
    this.router.navigate(['tfr/add-project']);
  }

  toProjectDetails(id: number) {
    setTimeout(()=> this.fetch(id), 300);
  }

  fetch(id: number){
    this.router.navigate(['tfr/details/project-details', id]);
  }

  searchProject() {
    let search = (<HTMLInputElement>document.getElementById("search-bar"))?.value;
    search = search.toLowerCase();
    let projName = document.getElementsByClassName("mat-column-name");
    let client = document.getElementsByClassName("mat-column-client-name");
    let div = document.getElementsByClassName("mat-column-division-name");
    let superDept = document.getElementsByClassName("mat-column-superDepartment-name");
    let dept = document.getElementsByClassName("mat-column-department-name");
    let row = document.getElementsByClassName("table-row");
    let entries = projName.length;
    // console.log(row);

    for (let i = 1; i <= entries; i++) {
      if (!projName[i].innerHTML.toLowerCase().includes(search) && !client[i].innerHTML.toLowerCase().includes(search) && !div[i].innerHTML.toLowerCase().includes(search) && !superDept[i].innerHTML.toLowerCase().includes(search) && !dept[i].innerHTML.toLowerCase().includes(search)) {
        row[i].classList.add("d-none");
      } else {
        row[i].classList.remove("d-none");
      }
    }
  }
}
