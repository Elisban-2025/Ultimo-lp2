import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompraService } from '../../services/compra.service';
import { Proveedor } from '../../services/compra.model';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './proveedor-list.html',
  styleUrl: './proveedor-list.css'
})
export class ProveedorListComponent implements OnInit {
  private readonly compraService = inject(CompraService);
  proveedores: Proveedor[] = [];

  ngOnInit(): void {
    this.compraService.listarProveedores().subscribe({
      next: (data: any) => {
        this.proveedores = data;
      },
      error: (err: any) => {
        console.error('Error al cargar proveedores', err);
      }
    });
  }
}