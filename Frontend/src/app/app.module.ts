import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {MatDialogModule} from "@angular/material/dialog";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { Block1Component } from './components/block1/block1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './components/tasks/add/add.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewComponent } from './components/tasks/view/view.component';
import { SummaryComponent } from './components/tasks/summary/summary.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    Block1Component,
    AddComponent,
    AdminComponent,
    ViewComponent,
    SummaryComponent,
    ImageUploaderComponent,
    RegisterUserComponent,
    EditProfileComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    },],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent]
})
export class AppModule { }
