export interface Proveedor {
  id: number;
  ruc: string;
  razonSocial: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

export interface ProveedorRequest {
  ruc: string;
  razonSocial: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

export interface RucConsultaResponse {
  numeroDocumento: string;
  razonSocial: string;
  estado: string;
  condicion: string;
  direccion: string;
}

export interface Insumo {
  id: number;
  codigo: string;
  nombre: string;
  unidadMedida: string;
  precioSugerido: number;
  estado: string;
}

export interface DetalleCompra {
  id?: number;
  idInsumo: number;
  nombreInsumo?: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Compra {
  id: number;
  idProveedor: number;
  proveedorRuc?: string;
  proveedorRazonSocial?: string;
  fechaEmision: string;
  condicionPago: string;
  numeroComprobante: string;
  subtotal: number;
  igv: number;
  costoFlete: number;
  total: number;
  estado: string;
  detalles: DetalleCompra[];
}

export interface CompraRequest {
  idProveedor: number;
  fechaEmision: string;
  condicionPago: string;
  numeroComprobante: string;
  costoFlete?: number;
  detalles: DetalleCompra[];
}

export interface AmortizarPagoRequest {
  montoPago: number;
  metodoPago: string;
  numeroOperacion?: string;
}

export interface PagoCompra {
  id: number;
  idCompra: number;
  fechaPago: string;
  montoPagado: number;
  metodoPago: string;
  numeroOperacion?: string;
  estado: string;
}

export interface CompraReporte {
  totalCompras: number;
  montoTotal: number;
  montoPagado: number;
  saldoPendiente: number;
}