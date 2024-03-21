export interface Reserva {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

export const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

export interface Precios {
  standard: number;
  suite: number;
}
