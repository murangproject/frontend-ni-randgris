## CICT - Class Monitoring and Key Inventory System
### Project Folder/File Structure
```
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── attendances
│   │   │   ├── attendances.component.html
│   │   │   ├── attendances.component.ts
│   │   │   └── attendances.enum.ts
│   │   ├── dashboard
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.ts
│   │   ├── faculty
│   │   │   ├── faculty.component.html
│   │   │   └── faculty.component.ts
│   │   ├── faculty-attendance
│   │   │   ├── faculty-attendance.component.html
│   │   │   └── faculty-attendance.component.ts
│   │   ├── faculty-schedules
│   │   │   ├── faculty-schedules.component.html
│   │   │   ├── faculty-schedules.component.ts
│   │   │   └── schedules.service.ts
│   │   ├── forgot-password
│   │   │   ├── forgot-password.component.html
│   │   │   └── forgot-password.component.ts
│   │   ├── init
│   │   │   ├── init.component.html
│   │   │   └── init.component.ts
│   │   ├── key
│   │   │   ├── key.component.html
│   │   │   ├── key.component.ts
│   │   │   └── key.model.ts
│   │   ├── keys
│   │   │   ├── keys.component.html
│   │   │   ├── keys.component.ts
│   │   │   └── keys.enum.ts
│   │   ├── login
│   │   │   ├── login.component.html
│   │   │   └── login.component.ts
│   │   ├── logout
│   │   │   ├── logout.component.html
│   │   │   └── logout.component.ts
│   │   ├── manage-profile
│   │   │   ├── manage-profile.component.html
│   │   │   └── manage-profile.component.ts
│   │   ├── print-attendance
│   │   │   ├── print-attendance.component.html
│   │   │   └── print-attendance.component.ts
│   │   ├── profile
│   │   │   ├── profile.component.html
│   │   │   └── profile.component.ts
│   │   ├── reset-password
│   │   │   ├── reset-password.component.html
│   │   │   └── reset-password.component.ts
│   │   ├── schedules
│   │   │   ├── schedules.component.html
│   │   │   └── schedules.component.ts
│   │   ├── settings
│   │   │   ├── activity.service.ts
│   │   │   ├── settings.component.html
│   │   │   ├── settings.component.ts
│   │   │   ├── settings.enum.ts
│   │   │   └── settings.service.ts
│   │   ├── shared
│   │   │   ├── auth.guard.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── role.guard.ts
│   │   │   └── toast.service.ts
│   │   ├── sidebar
│   │   │   ├── menu-list.ts
│   │   │   ├── sidebar.component.html
│   │   │   └── sidebar.component.ts
│   │   ├── themes
│   │   │   ├── themes.component.html
│   │   │   └── themes.component.ts
│   │   └── users
│   │       ├── users.component.html
│   │       ├── users.component.ts
│   │       ├── users.enum.ts
│   │       └── users.service.ts
│   ├── assets
│   │   ├── bulsu-main-gate.jpg
│   │   └── icons
│   │       ├── CICT.png
│   │       ├── logo.svg
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── package.json
├── package-lock.json
├── README.md
├── security-headers.conf
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

### Routing
```
      -- AUTHENTICATION -- 
      'login'
      'logout'
      
      -- PASSWORD RESET --
      'forgot-password'
      
      -- PROTECTED ROUTES --
      'dashboard' 
      'users'
      'faculties'
      'faculties/:id'
      'faculties/:id/attendance'
      'attendances'
      'schedules'
      'attendance-records'
      'profile'
      'keys'
      'settings'
      'themes'
      
      -- PRINT ATTENDANCE (Per User) --
      'print-attendance/:id'
      
      -- REDIRECTS --
      '**' redirects all to login
```

### Project Setup
  - FRAMEWORK: Angular v15.0 
    - The project heavily relies on the new standalone feature of angular
  - UI Framework: TailwindCSS and DaisyUI
    - Used the daisyui library of tailwind for easy theming

