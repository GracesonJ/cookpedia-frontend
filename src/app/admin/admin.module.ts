import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { UsersComponent } from './users/users.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DownloadListComponent,
    UsersComponent,
    RequestListComponent,
    RecipeListComponent,
    ManageRecipeComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
