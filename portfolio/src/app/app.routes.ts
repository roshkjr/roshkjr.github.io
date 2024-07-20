import { Routes } from '@angular/router';
import { HomePageComponent} from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
    {path:'', component: HomePageComponent},
    {path:'profile', component: ProfileComponent},
    {path:'resume', component: ResumeComponent}
];
