import { RouteGuardService } from './../route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { Block1Component } from './components/block1/block1.component';
import { Block2Component } from './components/block2/block2.component';
import { Block3Component } from './components/block3/block3.component';
import { SummaryComponent } from './components/tasks/summary/summary.component'
import { Summary2Component } from './components/tasks/summary2/summary2.component';
import { Summary3Component } from './components/tasks/summary3/summary3.component';
import { UsersComponent } from './components/users/users.component';
import { FilesComponent } from './components/files/files.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent
  },
  
  // { path: 'viewAuctionHouseAd/:id', component: OctionComponent },
  // { path: 'viewAuctionLandAd/:id', component: AuctionLandComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","Supervisor","ProjectManager"] },
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","Supervisor","ProjectManager"] },
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","ProjectManager"] },
  },

  {
    path: 'block1',
    component: Block1Component,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","Supervisor","ProjectManager"]},
  },

  {
    path: 'block2',
    component: Block2Component,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","Supervisor","ProjectManager"]},
  },

  {
    path: 'block3',
    component: Block3Component,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","Supervisor","ProjectManager"]},
  },

  {
    path: 'block1Summary',
    component: SummaryComponent,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","ProjectManager"]},
  },

  {
    path: 'block2Summary',
    component: Summary2Component,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","ProjectManager"]},
  },

  {
    path: 'block3Summary',
    component: Summary3Component,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","ProjectManager"]},
  },

  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","ProjectManager"]},
  },

  {
    path: 'files',
    component: FilesComponent,
    canActivate: [RouteGuardService],
    data: { type: ["Engineer","ProjectManager"]},
  },

  // {
  //   path: 'postAuctionLandAd',
  //   component: PostAuctionLandAdComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1, 2] },
  // },
  // {
  //   path: 'postAuctionHouseAd',
  //   component: PostAuctionHouseAdComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1, 2] },
  // },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'auctions', component: PageComponent },
  // {
  //   path: 'managerDashboard',
  //   component: ManagerComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [2] },
  // },
  // {
  //   path: 'newAdmin',
  //   component: NewAdminComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [2] },
  // },
  // {
  //   path: 'payment',
  //   component: PaymentGatewayComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [0, 1, 2] },
  // },
  // { path: 'test', component: TestComponent },
  // {
  //   path: 'adminDashboard',
  //   component: AdminDashboardComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1] },
  // },
  // {
  //   path: 'reviewLand/:id',
  //   component: ReviewLandComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1] },
  // },
  // {
  //   path: 'reviewHouse/:id',
  //   component: ReviewHouseComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1] },
  // },
  // {
  //   path: 'reviewUser/:id',
  //   component: ReviewUserComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1] },
  // },
  // { path: 'viewLand/:id', component: ViewLandComponent },
  // { path: 'viewHouse/:id', component: ViewHouseComponent },
  // {
  //   path: 'editprofile',
  //   component: EditprofileComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [0, 1, 2] },
  // },

  // {
  //   path: 'directHousePostByAdmin',
  //   component: DirectHousePostByAdminComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1, 2] },
  // },
  // {
  //   path: 'directLandPostByAdmin',
  //   component: DirectLandPostByAdminComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [1, 2] },
  // },
  // {
  //   path: 'userDashboard',
  //   component: UserDashboardComponent,
  //   canActivate: [RouteGuardService],
  //   data: { type: [0] },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
