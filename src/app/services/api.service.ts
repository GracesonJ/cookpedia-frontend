import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getAllRecipesApi() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add-testimony
  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // register
  registerApi(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // login
  loginApi(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  // appendToken in req header
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // View Recipe api
  viewRecipeApi(recipeId: string) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())
  }

  // related Recipe Api
  relatedRecipeApi(cuisine: string) {
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  // Download Recipe Api
  // recipe/67b44c0cdff57192daf7c410/download
  downloadRecipeApi(recipeId: any, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody, this.appendToken())
  }

  //recipe/:id/save
  saveRecipeAPI(recipeId: string, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`, reqBody, this.appendToken())
  }

  //get-save-recipes
  getUserSaveRecipesAPI() {
    return this.http.get(`${this.server_url}/get-save-recipes`, this.appendToken())
  }

  //save-recipes/6756c4a46917775a90386a45/remove
  deleteSaveRecipeAPI(id: string) {
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`, this.appendToken())
  }

  //user-downloads
  getUserDownloadRecipesAPI() {
    return this.http.get(`${this.server_url}/user-downloads`, this.appendToken())
  }

  //user/edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`, reqBody, this.appendToken())
  }

  //all-users
  allUsersAPI(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

   //download-list
   allDownloadListAPI(){
    return this.http.get(`${this.server_url}/download-list`,this.appendToken())
  }

   //all-feedback
   getallFeedbackListAPI(){
    return this.http.get(`${this.server_url}/all-feedback`,this.appendToken())
  }

   //feedback/6750283f6e6c436259862c60/update?status=Approved
   updateFeedbackStatusAPI(feedBackId:string,status:string){
    return this.http.get(`${this.server_url}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
  }

  //all-approve-feedback
  getAllApprovedFeedbackAPI(){
    return this.http.get(`${this.server_url}/all-approve-feedback`)
  }

   //add-recipe
   addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

   //recipe/675bf1f1707fc502be2aa71b/edit
   updateRecipeAPI(id:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  //recipes/:id/remove
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipes/${id}/remove`,this.appendToken())
  }

}
