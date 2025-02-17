import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SearchPipe, FormsModule, NgxPaginationModule ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes: any = []
  cuisineArray: any = []
  mealArray: any = []
  dummyAllRecipes:any = []
  searchKey:string =  ""
  p: number = 1;

  constructor(private api: ApiService, private router:Router) { }

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      this.allRecipes = res
      //
      this.dummyAllRecipes = this.allRecipes
      console.log(this.allRecipes);
      // recipes
      this.allRecipes.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      });
      console.log(this.cuisineArray);

      // meal Type
      const dummyMeal = this.allRecipes.map((item: any) => item.mealType)
      console.log(dummyMeal.flat(Infinity));
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item: any) => {
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
      console.log(this.mealArray);


      // this.allRecipes.forEach((item:any) => {
      //   !this.mealArray.includes(item.mealType) && this.mealArray.push(item.mealType)
      // });
      // console.log(this.mealArray);
    })
  }

  filterAllRecipes(key:string, value:string){
   this.allRecipes =  this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem("token")){
      // View Recipes - recipe/:id/view
      this.router.navigateByUrl(`/recipe/${recipeId}/view`)

    }else{
      alert("Login to get full access to our recipes details!!!")
    }
  }

}
