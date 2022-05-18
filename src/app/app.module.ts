import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DocumentsPageComponent } from './documents-page/documents-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ErrorComponent } from './shared/error/error.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { DocumentsComponent } from './documents/documents.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    DocumentsPageComponent,
    AuthPageComponent,
    LoadingComponent,
    ErrorComponent,
    MortgageCalculatorComponent,
    DocumentViewerComponent,
    HeaderComponent,
    DocumentsComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
