import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { LandingComponent } from './landing/landing.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: 'calculator', component: CalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
