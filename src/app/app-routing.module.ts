import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdobeEventHistoryComponent } from './admin/adobe-event-history/adobe-event-history.component';
import { ApproversComponent } from './admin/approvers/approvers.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { ReviewContractorComponent } from './admin/review-contractor/review-contractor.component';
import { ReviewEmployeeComponent } from './admin/review-employee/review-employee.component';
import { ServiceEmployeeRequestsDetailComponent } from './admin/service-employee-requests-detail/service-employee-requests-detail.component';
import { ServiceRequestsDetailComponent } from './admin/service-requests-detail/service-requests-detail.component';
import { ServiceRequestsComponent } from './admin/service-requests/service-requests.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { AuthGuard } from './core/services/auth.guard';
import { ContractorFormComponent } from './form/contractor-form/contractor-form.component';
import { EmployeeFormComponent } from './form/employee-form/employee-form.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
  },
  {
    path: 'contractor-form',
    component: ContractorFormComponent,
  },
  {
    path: 'confirmation-page',
    component: ConfirmationPageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'service-requests',
        component: ServiceRequestsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'adobe-event-history/:requestNumber',
        component: AdobeEventHistoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'service-contractor-request-detail/:requestNumber',
        component: ServiceRequestsDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'service-employee-request-detail/:requestNumber',
        component: ServiceEmployeeRequestsDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'review-employee/:requestNumber',
        component: ReviewEmployeeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'review-contractor/:requestNumber',
        component: ReviewContractorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'approvers',
        component: ApproversComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
