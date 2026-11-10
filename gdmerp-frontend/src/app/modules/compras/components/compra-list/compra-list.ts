import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../services/compra.model';

@Component({
  selector: 'app-compra-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compra-list.html',
  styleUrl: './compra-list.css'
})
export class CompraListComponent implements OnInit {
  private readonly compraService = inject(CompraService);
  compras: Compra[] = [];
  
  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.compraService.listarCompras().subscribe({
      next: (data: any) => {
        this.compras = data;
      },
      error: (err: any) => {
        console.error('Error al cargar las compras', err);
      }
    });
  }
}