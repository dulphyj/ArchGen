import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShellComponent } from './pages/shell/shell.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            { path: '', component: HomeComponent }
        ]
    },
    { path: 'login', component: LoginComponent }
];
