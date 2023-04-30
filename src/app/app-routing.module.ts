import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'logout',
        loadComponent: () => import('./logout/logout.component').then(c => c.LogoutComponent)
      },
      {
        path: '',
        component: SidebarComponent,
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
          },
          {
            path: 'users',
            loadComponent: () => import('./users/users.component').then(c => c.UsersComponent)
          },
          {
            path: 'faculties',
            loadComponent: () => import('./faculty/faculty.component').then(c => c.FacultyComponent)
          },
          {
            path: 'faculties/:id',
            loadComponent: () => import('./faculty-schedules/faculty-schedules.component').then(c => c.FacultySchedulesComponent)
          },
          {
            path: 'attendances',
            loadComponent: () => import('./attendances/attendances.component').then(c => c.AttendancesComponent)
          },
          {
            path: 'keys',
            loadComponent: () => import('./keys/keys.component').then(c => c.KeysComponent)
          },
          {
            path: 'settings',
            loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent)
          }
        ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
