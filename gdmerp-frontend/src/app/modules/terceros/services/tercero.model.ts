export interface Tercero {
  id: number;
  tipoTercero: string;
  numeroDocumento: string;
  razonSocial: string;
  direccion?: string;
  correo?: string;
  telefono?: string;
  activo: boolean;
}

export interface TerceroCreateRequest {
  tipoTercero: string;
  numeroDocumento: string;
  razonSocial: string;
  direccion?: string;
  correo?: string;
  telefono?: string;
}

export type TipoTercero = 'CLIENTE' | 'PROVEEDOR' | 'AMBOS';
