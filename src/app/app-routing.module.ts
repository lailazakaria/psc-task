import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalFormComponent } from './approval-form/approval-form.component';

const routes: Routes = [
  { path: 'impact-analysis', component: ApprovalFormComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
