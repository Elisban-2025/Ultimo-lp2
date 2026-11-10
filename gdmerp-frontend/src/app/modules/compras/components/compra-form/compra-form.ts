import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompraService } from '../../services/compra.service';
import { Proveedor } from '../../services/compra.model';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './compra-form.html',
  styleUrl: './compra-form.css'
})
export class CompraFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly compraService = inject(CompraService);
  private readonly router = inject(Router);

  proveedores = signal<Proveedor[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    idProveedor: [0, [Validators.required, Validators.min(1)]],
    fechaEmision: ['', Validators.required],
    condicionPago: ['CONTADO', Validators.required],
    numeroComprobante: ['', Validators.required],
    costoFlete: [0],
    detalles: [[]] 
  });

  ngOnInit(): void {
    // Cargamos los proveedores del backend para el select
    this.compraService.listarProveedores().subscribe({
      next: (data: any) => this.proveedores.set(data),
      error: () => this.error.set('No se pudieron cargar los proveedores.')
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const compraData = this.form.getRawValue() as any;
    
    this.compraService.crearCompra(compraData).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.router.navigate(['/compras/lista']);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Error al registrar la compra.');
        this.loading.set(false);
      }
    });
  }
}