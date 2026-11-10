import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TerceroService } from '../../services/tercero.service';

@Component({
  selector: 'app-terceros-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './terceros-form.html',
  styleUrl: './terceros-form.css'
})
export class TercerosFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly terceroService = inject(TerceroService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    tipoDocumento: ['RUC', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(15)]],
    razonSocial: ['', [Validators.required, Validators.maxLength(200)]],
    tipoTercero: ['PROVEEDOR', Validators.required],
    telefono: [''],
    correo: ['', [Validators.email]],
    direccion: ['']
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const terceroData = this.form.getRawValue();

    this.terceroService.crear(terceroData).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.router.navigate(['/terceros/lista']);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Error al guardar el tercero.');
        this.loading.set(false);
      }
    });
  }
  
}