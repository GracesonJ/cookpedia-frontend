import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';

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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}

  constructor(private router: Router, private api:ApiService) {
    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
      this.chartOptions = {
        chart :{
          type:'bar'
        },
        title:{
          text:'Analysis of Download Recipes Based on Cuisine',
          align:'left'
        },
        xAxis:{
          type:'category'
        },
        yAxis:{
          title:{
            text:'Total Download Recipe Count'
          }
        },
        legend:{
          enabled:false
        },
        credits:{
          enabled:false
        },
        series:[{
          name:"Cuisine",
          colorByPoint:true,
          type:'bar',
          data:chartData
          // data:[
          //   {name :"Italian", y:4},
          //   {name :"Asian", y:2},
          //   {name :"Thai", y:6}
          // ]
          
        }]
      }
    } 
   }

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
// ---------------------------------------------------------------
      console.log(res);

      // code to extracting suisine and its total download count as object and added to an array
      // input : [{recipeCuisine, count}]
      // output : [{name: cuisine, y:totalcount}]

      // algorithm
      // 1. create array for output, object for storing each array item
      // 2. get each array item of res and store its recipeCuisine and its count to a variable.
      // 3. check recipe cuisine is available in output object. if present then set the value of recipeCuisine key as total and total existing recipeCuisine value with new Count, not present then insert recipeCusine as key and value as its count.
      // 4. push each key from output object into output array.

      // let downloadArrayList:any = []
      // let output:any = {}
      // res.forEach((item:any)=>{
      //   let cuisine = item.recipeCuisine
      //   let currentCount = item.count
      //   if(output.hasOwnProperty(cuisine)){
      //     output[cuisine] += currentCount
      //   }else{
      //       output[cuisine] = currentCount
      //   }
      // })
      // console.log(output);

      // for(let cuisine in output){
      //   downloadArrayList.push({name:cuisine, y:output[cuisine]})
      // }
      // console.log(downloadArrayList);
      
    })
  }

  getRequestCount(){
    this.api.getallFeedbackListAPI().subscribe((res:any)=>{      
      this.requestCount = res.filter((item:any)=>item.status=="Pending").length
    })
  }
}
