import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShellComponent } from './pages/shell/shell.component';
import { HomeComponent } from './pages/home/home.component';
import { HexagonalComponent } from './pages/architecture/hexagonal/hexagonal.component';
import { MvcComponent } from './pages/architecture/mvc/mvc.component';
import { MicrokernelComponent } from './pages/architecture/microkernel/microkernel.component';
import { MvvmComponent } from './pages/architecture/mvvm/mvvm.component';
import { CbaComponent } from './pages/architecture/cba/cba.component';
import { FeatureBasedComponent } from './pages/architecture/feature-based/feature-based.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomTemplatesComponent } from './pages/custom-templates/custom-templates.component';
import { catchAllRoute } from 'ngx-clerk-iliad';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'architecture/HEXAGONAL', component: HexagonalComponent },
            { path: 'architecture/MVC', component: MvcComponent },
            { path: 'architecture/MICROKERNEL', component: MicrokernelComponent },
            { path: 'architecture/MVVM', component: MvvmComponent },
            { path: 'architecture/CBA', component: CbaComponent },
            { path: 'architecture/FEATURE_BASED', component: FeatureBasedComponent },
            { path: 'customtemplates', component: CustomTemplatesComponent, canActivate: [authGuard] }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NotFoundComponent }
];
