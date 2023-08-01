import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent {
  empForm: FormGroup;

  education: string[] = ['High School', 'Diploma', 'Degree', 'Master'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      salary: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        // Edit
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              // alert('Employee Updated');
              this._coreService.openSnackBar('Employee Updated');
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.error(err);
            },
          });
      } else {
        // Add
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee Added');
            this._coreService.openSnackBar('Employee Added');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    }
  }
}
