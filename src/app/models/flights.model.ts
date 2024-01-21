export class Let {
    id: number;
    od: string;
    destinacija: string;
    vreme: string;
    brojputnika: number;
    cena: number;
  
    constructor(id: number, od: string, destinacija: string, vreme: string, brojputnika: number, cena: number) {
      this.id = id;
      this.od = od;
      this.destinacija = destinacija;
      this.vreme = vreme;
      this.brojputnika = brojputnika;
      this.cena = cena;
    }
  }