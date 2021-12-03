export interface ICompra {
  idCompra?: number;
  productos: string;
  cantidad: number;
  total: number;
  idcomprador: number;
  fechaRealizada: number;
  fechaSeleccionada: Date;
  hora: Date;
}
