// src/app/pages/collect-request/collect-request.component.ts
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CollectRequest } from '../../models/collect-request.model';
import { CollectService } from '../../services/collect/collect.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-collect-request',
  templateUrl: './collect-request.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./collect-request.component.scss']
})
export class CollectRequestComponent {
  collectForm: FormGroup;
  errorMessage: string = '';
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private collectService: CollectService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.collectForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      timeSlot: ['', [Validators.required, Validators.pattern(/^(0[9]|1[0-8]):[0-5][0-9]$/)]],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.collectForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        this.errorMessage = 'Vous devez être connecté pour soumettre une demande.';
        return;
      }

      const requestId = this.route.snapshot.paramMap.get('id') || this.generateId();

      const request: CollectRequest = {
        id: requestId,
        userId: currentUser.id,
        ...this.collectForm.value,
        status: 'en attente'
      };

      if (this.route.snapshot.paramMap.get('id')) {
        this.collectService.updateRequest(requestId, request);
      } else {
        if (!this.collectService.addRequestWithValidation(request)) {
          this.errorMessage = 'Limite de demandes ou de poids atteinte (max 3 demandes, 10 kg).';
          return;
        }
      }

      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.isEditMode = true;
      const request = this.collectService.getRequestById(requestId);
      if (request) {
        this.collectForm.patchValue(request);
      }
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
