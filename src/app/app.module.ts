import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { ApproversComponent } from './admin/approvers/approvers.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { ReviewContractorComponent } from './admin/review-contractor/review-contractor.component';
import { ReviewEmployeeComponent } from './admin/review-employee/review-employee.component';
import { ServiceEmployeeRequestsDetailComponent } from './admin/service-employee-requests-detail/service-employee-requests-detail.component';
import { ServiceRequestsDetailComponent } from './admin/service-requests-detail/service-requests-detail.component';
import { ServiceRequestsComponent } from './admin/service-requests/service-requests.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/services/auth.guard';
import { ContractorFormComponent } from './form/contractor-form/contractor-form.component';
import { AdditionalInformationComponent } from './form/employee-form/additional-information/additional-information.component';
import { EmployeeFormComponent } from './form/employee-form/employee-form.component';
import { InternetAccessComponent } from './form/employee-form/internet-access/internet-access.component';
import { ManagerInformationComponent } from './form/employee-form/manager-information/manager-information.component';
import { SubmitPageComponent } from './form/employee-form/submit-page/submit-page.component';
import { LoadingPageComponent } from './form/shared/loading-page/loading-page.component';
import { SubmissionConfirmationPageComponent } from './form/shared/submission-confirmation-page/submission-confirmation-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { AdobeEventHistoryComponent } from './admin/adobe-event-history/adobe-event-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AdditionalInformationComponent,
    SubmitPageComponent,
    EmployeeFormComponent,
    ContractorFormComponent,
    AdminComponent,
    ServiceRequestsComponent,
    ResetPasswordComponent,
    ServiceRequestsDetailComponent,
    ServiceEmployeeRequestsDetailComponent,

    ReviewEmployeeComponent,
    NavbarComponent,
    LoadingPageComponent,
    SubmissionConfirmationPageComponent,
    ConfirmationPageComponent,
    ApproversComponent,
    ManagerInformationComponent,
    InternetAccessComponent,
    ReviewContractorComponent,
    AdobeEventHistoryComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatChipsModule,
    LayoutModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
