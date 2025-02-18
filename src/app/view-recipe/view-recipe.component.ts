import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipeId:string = ""
  recipe:any = {}
  allRelatedRecipes:any = []
  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      // console.log(res);
      this.recipeId = res.id
      console.log(this.recipeId); 
      this.getRecipeDetails(this.recipeId)
      
    })
  }
  getRecipeDetails(recipeId:string){
    this.api.viewRecipeApi(recipeId).subscribe((res:any)=>{
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.relatedRecipeApi(cuisine).subscribe((res:any)=>{
      this.allRelatedRecipes = res
      console.log(this.allRelatedRecipes);
    })
  }
}
