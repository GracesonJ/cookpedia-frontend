import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  allUserDownloadList:any = []
  profileImage:string = "https://tse1.mm.bing.net/th?id=OIP._jKjZYeqWX6e6E7DpcOM_gHaHa&pid=Api&P=0&h=180"

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()

    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getUserDownloads(){
    this.api.getUserDownloadRecipesAPI().subscribe((res:any)=>{
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);      
    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    //convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
    }
  }

  updateProfile(){
    this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert("Profile Updated successfully!!!")
    })
  }

}
