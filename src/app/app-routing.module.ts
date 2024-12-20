import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './dashboard/contact-form/contact-form.component';
import { ContactListComponent } from './dashboard/contact-list/contact-list.component';

const routes: Routes = [

  { path: '', component: ContactListComponent },
  { path: 'contacts/add', component: ContactFormComponent },
  { path: 'contacts/edit/:id', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
