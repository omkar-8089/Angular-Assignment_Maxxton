import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'employee-details', pathMatch: 'full'
  },
  {
    path: 'employee-details', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  { path: '**', redirectTo: 'employee-details'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
