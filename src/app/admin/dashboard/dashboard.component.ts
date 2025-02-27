import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSideBarOpen: boolean = true
  columnWidth: string = "col-lg-10"

  selected = new Date()
  userCount: number = 0
  recipeCount: number = 0
  downloadCount: number = 0
  requestCount: number = 0

  constructor(private router: Router, private api:ApiService) { }

  menuBtnClick() {
    this.isSideBarOpen = !this.isSideBarOpen
    this.isSideBarOpen ? this.columnWidth = "col-lg-10" : this.columnWidth = "col"
  }

  logoutAdmin() {
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  getUserCount(){
    this.api.allUsersAPI().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipesApi().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.allDownloadListAPI().subscribe((res:any)=>{
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
    })
  }

  getRequestCount(){
    this.api.getallFeedbackListAPI().subscribe((res:any)=>{      
      this.requestCount = res.filter((item:any)=>item.status=="Pending").length
    })
  }
}
