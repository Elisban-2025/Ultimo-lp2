import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'compras/proveedores', pathMatch: 'full' },
  {
    path: 'compras',
    children: [
      {
        path: 'proveedores',
        loadComponent: () => import('./modules/compras/components/proveedor-list/proveedor-list').then(m => m.ProveedorListComponent)
      },
      {
        path: 'proveedores/nuevo',
        loadComponent: () => import('./modules/compras/components/proveedor-form/proveedor-form').then(m => m.ProveedorFormComponent)
      },
      {
        path: 'lista',
        loadComponent: () => import('./modules/compras/components/compra-list/compra-list').then(m => m.CompraListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () => import('./modules/compras/components/compra-form/compra-form').then(m => m.CompraFormComponent)
      }
    ]
  },
  {
    path: 'terceros',
    children: [
      {
        path: 'lista',
        loadComponent: () => import('./modules/terceros/components/terceros-list/terceros-list').then(m => m.TercerosListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () => import('./modules/terceros/components/terceros-form/terceros-form').then(m => m.TercerosFormComponent)
      }
    ]
  }
];