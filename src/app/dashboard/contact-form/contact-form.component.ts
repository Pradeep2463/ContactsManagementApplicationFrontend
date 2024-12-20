import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  @Input() contact: Contact | null = null;
  @Output() formSubmit = new EventEmitter<void>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService,private router:Router,private route: ActivatedRoute,private toastr: ToastrService) {
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.contactService.getContactById(+id).subscribe(contact => {
        this.contact = contact;
        this.contactForm.patchValue(contact);
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      if (contact.id) {
        this.contactService.updateContact(contact).subscribe(
          () => {
            this.toastr.success('Contact updated successfully');
            this.router.navigate(['']);
          },
          (error: Error) => {
            this.toastr.error(error.message);
          }
        );
      } else {
        this.contactService.addContact(contact).subscribe(
          () => {
            this.toastr.success('Contact created successfully');
            this.router.navigate(['']);
          },
          (error: Error) => {
            this.toastr.error(error.message);
          }
        );
      }
    }
  }

  getActionText(): string {
    return this.contact?.id ? 'Update' : 'Create';
  }
}
