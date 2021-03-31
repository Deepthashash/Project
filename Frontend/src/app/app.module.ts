import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {MatDialogModule} from "@angular/material/dialog";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
import { Block2Component } from './components/block2/block2.component';
import { Block3Component } from './components/block3/block3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './components/tasks/add/add.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewComponent } from './components/tasks/view/view.component';
import { SummaryComponent } from './components/tasks/summary/summary.component';
import { Summary2Component } from './components/tasks/summary2/summary2.component';
import { Summary3Component } from './components/tasks/summary3/summary3.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { ViewCommentComponent } from './components/comments/view-comment/view-comment.component';
import { DeleteComponent } from './components/delete/delete.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { UsersComponent } from './components/users/users.component';
import { FilesComponent } from './components/files/files.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    Block1Component,
    Block2Component,
    Block3Component,
    AddComponent,
    AdminComponent,
    ViewComponent,
    SummaryComponent,
    Summary2Component,
    Summary3Component,
    ImageUploaderComponent,
    RegisterUserComponent,
    EditProfileComponent,
    UploadFilesComponent,
    NotificationsComponent,
    NavigationComponent,
    AddCommentComponent,
    ViewCommentComponent,
    DeleteComponent,
    EditTaskComponent,
    UsersComponent,
    FilesComponent,
    EditUserComponent
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
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),

  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent]
})
export class AppModule { }
