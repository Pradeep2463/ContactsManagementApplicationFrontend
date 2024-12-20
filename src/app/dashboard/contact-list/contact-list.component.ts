import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contacts: Contact[] = [];
  searchQuery: string;
  sortBy: string;
  ascending: boolean = true;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  selectedId: any;

  constructor(private contactService: ContactService, private router: Router,private toastr: ToastrService) {
    this.searchQuery='';
    this.sortBy = 'firstName';
    this.currentPage = 1;
    this.pageSize = 5;
    this.ascending = true;
    this.hasNextPage = false;
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getPaginatedContacts(this.currentPage, this.pageSize).subscribe(
      response => {
        this.contacts = response.data;
        this.hasNextPage = response.hasNext;
      },
      error => console.error(error)
    );
  }

  searchContacts(): void {
    this.contactService.searchContacts(this.searchQuery).subscribe(
      data => this.contacts = data,
      error => console.error(error)
    );
  }

  sortContacts(orderBy: string): void {
    this.sortBy = orderBy;
    this.ascending = !this.ascending;
    this.contactService.getSortedContacts(this.sortBy, this.ascending).subscribe(
      data => this.contacts = data,
      error => console.error(error)
    );
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.toastr.success('Contact deleted successfully');
        this.router.navigate(['']);
        this.loadContacts();
      },
         error => {
          this.toastr.error('Failed to delete contact');
        }
    );
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/contacts/edit', contact.id]);
  }

  changePage(page: number): void {
    if (page < 1) return;

    this.currentPage = page;
    this.contactService.getPaginatedContacts(this.currentPage, this.pageSize).subscribe(
      response => {
        if (response.data.length > 0) {
          this.contacts = response.data;
          this.hasNextPage = response.hasNext;
        } else {
          this.currentPage = Math.max(1, this.currentPage - 1);
        }
      },
      error => console.error(error)
    );
  }

  selectToDelete(index: number) {
    this.selectedId = index;

  }
}
