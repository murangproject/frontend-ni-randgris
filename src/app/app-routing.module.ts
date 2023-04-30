import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { authGuard } from './shared/auth.guard';
import { roleGuard } from './shared/role.guard';

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
        title: 'Login Page',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'logout',
        title: 'Logout Page',
        loadComponent: () => import('./logout/logout.component').then(c => c.LogoutComponent)
      },
      {
        path: 'init',
        title: 'Account Initialize',
        loadComponent: () => import('./init/init.component').then(c => c.InitComponent)
      },
      {
        path: '',
        component: SidebarComponent,
        canActivate: [authGuard],
        children: [
          {
            path: 'dashboard',
            title: 'Dashboard',
            data: { roles: ['admin', 'attendance_checker'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
          },
          {
            path: 'users',
            title: 'Users Management',
            data: { roles: ['admin'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./users/users.component').then(c => c.UsersComponent)
          },
          {
            path: 'faculties',
            title: 'Faculties Management',
            data: { roles: ['admin', 'attendance_checker'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./faculty/faculty.component').then(c => c.FacultyComponent)
          },
          {
            path: 'faculties/:id',
            title: 'Faculty',
            data: { roles: ['admin', 'attendance_checker'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./faculty-schedules/faculty-schedules.component').then(c => c.FacultySchedulesComponent)
          },
          {
            path: 'faculties/:id/attendance',
            title: 'Faculty Attendance',
            data: { roles: ['admin', 'attendance_checker', 'faculty'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./faculty-attendance/faculty-attendance.component').then(c => c.FacultyAttendanceComponent)
          },
          {
            path: 'attendances',
            title: 'Attendances',
            data: { roles: ['admin', 'attendance_checker', 'faculty'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./attendances/attendances.component').then(c => c.AttendancesComponent)
          },
          {
            path: 'schedules',
            title: 'Schedules',
            data: { roles: ['faculty'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./schedules/schedules.component').then(c => c.SchedulesComponent)
          },
          {
            path: 'attendance-records',
            title: 'Attendance Records',
            data: { roles: ['faculty'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
          },
          {
            path: 'keys',
            title: 'Keys',
            data: { roles: ['admin', 'attendance_checker', 'faculty'] },
            canMatch: [roleGuard],
            loadComponent: () => import('./keys/keys.component').then(c => c.KeysComponent)
          },
          {
            path: 'settings',
            title: 'Settings',
            loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent)
          }
        ],
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ],

  },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
