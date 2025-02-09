import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CollectRequest } from '../../models/collect-request.model';
import { Router } from '@angular/router';
import {CollectService} from '../../services/collect/collect.service';

@Component({
  selector: 'app-collect-request',
  templateUrl: './collect-request.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./collect-request.component.scss']
})
export class CollectRequestComponent {
  collectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collectService: CollectService,
    private router: Router
  ) {
    this.collectForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.collectForm.valid) {
      const request: CollectRequest = {
        id: this.generateId(),
        userId: 'currentUserId',
        ...this.collectForm.value,
        status: 'en attente'
      };
      this.collectService.addRequest(request);
      this.router.navigate(['/dashboard']);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
