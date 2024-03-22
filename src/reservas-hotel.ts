import { Precios, Reserva } from "./reservas-hotel.model";
import { reservas } from "./reservas-hotel.data";

class ReservasHotel {
  private iva: number = 0.21;
  private _preciosHabitaciones: Precios;
  private _costeDesayuno: number;
  private _descuento: number;
  private _recargo: number;

  reservas: Reserva[];

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this._preciosHabitaciones = { standard: 0, suite: 0 };
    this._costeDesayuno = 0;
    this._descuento = 1;
    this._recargo = 0;
  }

  set preciosHabitaciones(importePreciosHabitaciones: Precios) {
    this._preciosHabitaciones = importePreciosHabitaciones;
  }

  set descuento(porcentajeDescuento: number) {
    if (porcentajeDescuento >= 0 && porcentajeDescuento <= 1) {
      this._descuento = 1 - porcentajeDescuento;
    } else {
      throw new Error("El descuento debe tener un valor entre 0 y 1");
    }
  }

  set costeDesayunos(importeCosteDesayunos: number) {
    this._costeDesayuno = importeCosteDesayunos;
  }

  set recargo(importeRecargo: number) {
    this._recargo = importeRecargo;
  }

  get subtotal() {
    let subtotal: number = 0;

    this.reservas.forEach((reserva: Reserva) => {
      const precioNoche = this._preciosHabitaciones[reserva.tipoHabitacion];
      const precioTotalNoches = reserva.noches * precioNoche;
      const precioRecargos: number = this._recargo * reserva.pax * reserva.noches;
      const precioDesayunos: number = reserva.desayuno
        ? reserva.noches * reserva.pax * this._costeDesayuno
        : 0;

      subtotal += precioTotalNoches + precioRecargos + precioDesayunos;
    });

    return Number((subtotal * this._descuento).toFixed(2));
  }

  get total() {
    const subtotal: number = this.subtotal;
    const total: number = subtotal + this.iva * subtotal;

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
    this.costeDesayunos = 15;
  }
}

class ReservasTourOperador extends ReservasHotel {
  constructor(reservas: Reserva[]) {
    super(reservas);

    this.preciosHabitaciones = { standard: 100, suite: 100 };
    this.recargo = 40;
    this.costeDesayunos = 15;
    this.descuento = 0.15;
  }
}

const particular = new ReservasParticular(reservas);
const tourOperador = new ReservasTourOperador(reservas);

console.log("Precios reservas particular:", particular.mostrarResultados());
console.log("Precios reservas tour operador:", tourOperador.mostrarResultados());
