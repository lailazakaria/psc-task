import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { FormService } from '../form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css'],
})
export class ApprovalFormComponent {
  approvalForm: FormGroup;
  authors = ['Amir', 'Yousef', 'Ahmad'];
  references = ['Amir', 'Yousef', 'Ahmad'];
  approvers = ['Amir', 'Yousef', 'Ahmad'];
  statusesApprovers = ['Approved', 'Pending', 'Rejected'];

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.approvalForm = this.fb.group({
      author: [''],
      reference: [''],
      statusApprover: [''],
      approver: [''],
      nextReviewDate: [''],
      endReviewDate: [''],
    });
  }

  ngOnInit(): void {
    const draft = localStorage.getItem('draftForm');
    if (draft) {
      this.approvalForm.setValue(JSON.parse(draft));
      console.log('Draft data loaded into form.');
    }
  }

  private saveForm(status: 'submitted' | 'draft') {
    const formData = {
      ...this.approvalForm.value,
      status,
    };
    console.log('Saving form with status:', status, 'Data:', formData);

    return of(formData)
      .pipe(
        delay(500), // Simulate a delay
        switchMap((data) => {
          if (status === 'submitted') {
            // Call the service method for submitted status
            return this.formService
              .submitForm(data)
              .pipe(
                tap(() => console.log('Form successfully submitted to API.'))
              );
          } else {
            // Handle draft status by saving to local storage
            localStorage.setItem('draftForm', JSON.stringify(data));
            console.log('Form saved as draft in local storage.');
            return of(data); // Return an observable with the data
          }
        })
      )
      .subscribe(
        (result) => console.log('Form processed:', result),
        (error) => console.error('Error processing form:', error)
      );
  }

  onSubmit() {
    // Trigger saveForm with 'submitted' status when submitting
    this.saveForm('submitted');
    this.approvalForm.reset();
    localStorage.clear();
  }

  onSaveDraft() {
    // Trigger saveForm with 'draft' status when saving as draft
    this.saveForm('draft');
  }

  // onCancel() {

  //   this.approvalForm.reset();
  // }
  onCancel() {
    Swal.fire({
      title: 'هل تريد الالغاء؟',
      text: 'لديك بيانات غير محفوظة اذا تابعت فلن يتم حفظها',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6a0dad',
      cancelButtonColor: 'red',
      confirmButtonText: 'تاكيد',
      cancelButtonText: 'الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.approvalForm.reset();
      }
    });
  }
}
