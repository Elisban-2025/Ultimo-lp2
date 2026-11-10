import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TerceroService } from '../../services/tercero.service';
import { Tercero } from '../../services/tercero.model';

@Component({
  selector: 'app-terceros-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './terceros-list.html',
  styleUrl: './terceros-list.css'
})
export class TercerosListComponent implements OnInit {
  terceros: Tercero[] = [];
  tercerosFiltrados: Tercero[] = [];
  cargando: boolean = true;
  errorMessage: string = '';
  
  filtroTipo: string = 'TODOS';
  terminoBusqueda: string = '';

  constructor(private terceroService: TerceroService) {}

  ngOnInit(): void {
    this.cargarTerceros();
  }

  cargarTerceros(): void {
    this.cargando = true;
    this.terceroService.listar().subscribe({
      next: (data: any[]) => {
        this.terceros = data;
        this.tercerosFiltrados = data;
        this.cargando = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al conectar con el backend en el puerto 8081';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  cambiarFiltro(tipo: string): void {
    this.filtroTipo = tipo;
    this.aplicarFiltros();
  }

  filtrarTerceros(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultado = this.terceros;

    if (this.filtroTipo !== 'TODOS') {
      resultado = resultado.filter(t => t.tipoTercero === this.filtroTipo || t.tipoTercero === 'AMBOS');
    }

    if (this.terminoBusqueda && this.terminoBusqueda.trim() !== '') {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultado = resultado.filter(t => 
        (t.razonSocial && t.razonSocial.toLowerCase().includes(termino)) ||
        (t.numeroDocumento && t.numeroDocumento.toLowerCase().includes(termino)) ||
        (t.direccion && t.direccion.toLowerCase().includes(termino))
      );
    }

    this.tercerosFiltrados = resultado;
  }
}
