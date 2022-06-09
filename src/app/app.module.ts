import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ErrorComponent } from './shared/error/error.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component'
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './landing/landing.component';
import { DocumentsComponent } from './documents/documents.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CalculatorComponent } from './calculator/calculator.component'
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch'
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button';
// import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartModule } from 'primeng/chart'
import { PanelModule } from "primeng/panel";
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects'
import * as fromApp from './store/app.reducer'
import { TransactionEffects} from './transactions/store/transactions.effects'
import { DashboardEffects } from './dashboard/store/dashboard.effects';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptor } from './auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadingComponent,
    ErrorComponent,
    MortgageCalculatorComponent,
    DocumentViewerComponent,
    HeaderComponent,
    LandingComponent,
    DocumentsComponent,
    AuthComponent,
    SubHeaderComponent,
    TransactionsComponent,
    PieChartComponent,
    CalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ButtonModule,
    ChartModule,
    PanelModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([TransactionEffects, DashboardEffects, AuthEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
