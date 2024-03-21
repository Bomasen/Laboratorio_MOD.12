import { Precios, Reserva, reservas } from "./reservas-hotel.model";

class ReservasHotel {
  private iva: number = 0.21;
  private costeDesayunos: number = 15;
  private _preciosHabitaciones: Precios;
  private _descuento: number;
  private _recargo: number;

  reservas: Reserva[];

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this._preciosHabitaciones = { standard: 0, suite: 0 };
    this._descuento = 0;
    this._recargo = 0;
  }

  set preciosHabitaciones(importePreciosHabitaciones: Precios) {
    this._preciosHabitaciones = importePreciosHabitaciones;
  }

  set descuento(porcentajeDescuento: number) {
    if (porcentajeDescuento >= 0 && porcentajeDescuento <= 1) {
      this._descuento = porcentajeDescuento;
    } else {
      throw new Error("El descuento debe tener un valor entre 0 y 1.");
    }
  }

  set recargo(importeRecargo: number) {
    this._recargo = importeRecargo;
  }

  get subtotal() {
    let subtotal: number = 0;

    this.reservas.forEach((reserva: Reserva) => {
      const precioNoche = this._preciosHabitaciones[reserva.tipoHabitacion];
      const precioTotalNoches = reserva.noches * precioNoche;

      if (reserva.desayuno === true) {
        this._recargo += this.costeDesayunos;
      }

      const precioRecargos: number = this._recargo * reserva.pax * reserva.noches;

      subtotal += precioTotalNoches + precioRecargos;
    });

    return Number(subtotal.toFixed(2));
  }

  get total() {
    const subtotal: number = this.subtotal;
    const precioDescuento: number = subtotal * this._descuento;
    const total: number = subtotal + this.iva * subtotal - precioDescuento;
    return Number(total.toFixed(2));
  }

  mostrarResultados() {
    return {
      Subtotal: `${this.subtotal}€`,
      Total: `${this.total}€`,
    };
  }
}

class ReservasParticular extends ReservasHotel {
  constructor(reservas: Reserva[]) {
    super(reservas);
    this.preciosHabitaciones = { standard: 100, suite: 150 };
    this.recargo = 40;
  }
}

class ReservasTourOperador extends ReservasHotel {
  constructor(reservas: Reserva[]) {
    super(reservas);

    this.preciosHabitaciones = { standard: 100, suite: 100 };
    this.descuento = 0.15;
  }
}

const particular = new ReservasParticular(reservas);
const tourOperador = new ReservasTourOperador(reservas);

console.log("Precios reservas particular:", particular.mostrarResultados());
console.log("Precios reservas tour operador:", tourOperador.mostrarResultados());
