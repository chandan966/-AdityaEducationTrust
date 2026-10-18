import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { CollegesComponent } from './pages/colleges.component';
import { CollegeDetailComponent } from './pages/college-detail.component';
import { ContentPageComponent } from './pages/content-page.component';
import { EnquiryComponent } from './pages/enquiry.component';
import { LoginComponent } from './pages/login.component';
import { DashboardComponent } from './pages/dashboard.component';
export const routes: Routes = [
 {path:'',component:HomeComponent,title:'Home | Aditya Education Trust'},
 {path:'colleges',component:CollegesComponent,title:'Our Colleges | Aditya Education Trust'},
 {path:'colleges/:slug',component:CollegeDetailComponent},
 {path:'admissions',component:EnquiryComponent,title:'Admissions | Aditya Education Trust'},
 {path:'contact',component:EnquiryComponent,title:'Contact | Aditya Education Trust'},
 {path:'login',component:LoginComponent,title:'Portal Login | Aditya Education Trust'},
 {path:'dashboard',component:DashboardComponent,title:'Dashboard | Aditya Education Trust'},
 {path:':section',component:ContentPageComponent},
 {path:'**',redirectTo:''}
];
