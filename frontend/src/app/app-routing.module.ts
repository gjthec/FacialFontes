import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile.component';
import { DefaultDashboardComponent } from './shared/components/default-dashboard/default-dashboard.component';

export const appRoutes: Route[] = [
  // Auth routes for guests
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('app/core/pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('app/core/pages/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('app/core/pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'resetPassword',
    loadChildren: () =>
      import('app/core/pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: 'error-404',
    loadChildren: () =>
      import('app/core/pages/error/error-404/error-404.module').then(
        (m) => m.Error404Module
      ),
  },
  {
    path: 'error-500',
    loadChildren: () =>
      import('app/core/pages/error/error-500/error-500.module').then(
        (m) => m.Error500Module
      ),
  },
  {
    path: 'callback',
    loadChildren: () =>
      import('app/core/pages/callback/callback.module').then(
        (m) => m.CallbackModule
      ),
  },
  { path: 'home', canMatch: [AuthGuard], component: SideNavComponent },

  {
    path: 'tenant',
    canMatch: [AuthGuard],
    component: SideNavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('app/core/tenant/tenant.module').then((m) => m.TenantModule),
      },
    ],
  },

  // Admin routes
  {
    path: '',
    canMatch: [AuthGuard],
    component: SideNavComponent,
    children: [
      { path: 'dashboard/:id', component: DefaultDashboardComponent },
      {
        path: 'teste',
        loadChildren: () =>
          import('./modules/teste/teste.module').then((m) => m.TesteModule),
      },
      {
        path: 'registro-presenca',
        loadChildren: () =>
          import('./modules/registro-presenca/registro-presenca.module').then(
            (m) => m.RegistroPresencaModule
          ),
      },
      {
        path: 'registro',
        loadChildren: () =>
          import('./modules/registro/registro.module').then(
            (m) => m.RegistroModule
          ),
      },
      {
        path: 'editProfile',
        pathMatch: 'full',
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('app/core/pages/error/error-404/error-404.module').then(
        (m) => m.Error404Module
      ),
  },
];
