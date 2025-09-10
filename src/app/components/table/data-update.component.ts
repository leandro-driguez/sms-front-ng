import { Component, inject, OnInit } from '@angular/core'; // <-- Import OnInit
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RepositoryService } from '../../services/repository.service';

// It's good practice to define the shape of the data the dialog expects.
export interface DialogData<T> {
  row: T;
  url: string;
  service: RepositoryService<T>; // <-- The service instance will be passed in
}

@Component({
  selector: 'data-update',
  templateUrl: 'data-update.component.html',
  styleUrl: 'data-update.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DataUpdate<T extends object> implements OnInit { // <-- Implement OnInit
  // Inject the dialog data with the new, correct shape
  private data = inject<DialogData<T>>(DIALOG_DATA);
  
  // Properties now correctly typed and assigned
  private repositoryService: RepositoryService<T>;
  private row: T;
  private url: string;

  private fb = inject(FormBuilder);
  formGroup: FormGroup = this.fb.group({});
  formKeys: string[] = [];

  constructor() {
    // Assign properties from the injected data
    this.row = this.data.row;
    this.url = this.data.url;
    this.repositoryService = this.data.service;
  }

  ngOnInit(): void {
    if (this.row) {
      this.formKeys = Object.keys(this.row);
      this.createForm(this.row);
    }
  }

  // ngOnChanges has been removed as it does not run without @Input() properties.

  handleSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('Form is invalid.');
      return;
    }

    const updatedObject: T = this.formGroup.value;

    console.log(`Sending update to ${this.url}`, updatedObject);
    this.repositoryService
      .put(this.url, updatedObject)
      .subscribe((response) => {
        console.log('Update successful:', response);
        // Here you would typically close the dialog
      });
  }

  private createForm(data: T): void {
    const controls: { [key: string]: FormControl } = {};
    for (const key of this.formKeys) {
      const value = data[key as keyof T];
      controls[key] = this.fb.control(value, Validators.required);
    }
    this.formGroup = this.fb.group(controls);
  }
}