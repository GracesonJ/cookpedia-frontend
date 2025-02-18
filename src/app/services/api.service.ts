import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }
  
  getAllRecipesApi(){
   return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add-testimony
  addTestimonyApi(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // register
  registerApi(reqBody:any){
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // login
  loginApi(reqBody:any){
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  // appendToken in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return {headers}
  }

  // View Recipe api
  viewRecipeApi(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())
  }

  // related Recipe Api
  relatedRecipeApi(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  



}
