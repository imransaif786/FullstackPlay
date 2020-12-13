import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './Layout/app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { from } from 'rxjs';
import { EditComponent } from './Component/edit/edit.component';
import { AddUpdateUserFormComponent } from './add-update-user-form/add-update-user-form.component';
import { ShowUserDataComponent } from './show-user-data/show-user-data.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrationFormComponent,
    EditComponent,
    AddUpdateUserFormComponent,
    ShowUserDataComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'ShowUserData', component: ShowUserDataComponent },
     { path: 'Registration/:id', component: RegistrationFormComponent },
      {path: 'Registration', component: RegistrationFormComponent},
      {path: 'AddUpdate', component: AddUpdateUserFormComponent}
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
