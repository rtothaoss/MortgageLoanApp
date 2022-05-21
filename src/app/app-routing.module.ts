import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { LandingComponent } from './landing/landing.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'transactions', component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
