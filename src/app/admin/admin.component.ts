import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { FlightService } from '../services/flight.service';
import { HttpClient } from '@angular/common/http';
import { Let } from '../models/flights.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  letForm: FormGroup;
  showErrorMessage: boolean = false;
  letovi: Let[] = [];
  selectedPhones: Let[] = [];
  newLet: Let = {
    id: 0, od: '', destinacija: '', vreme: '', brojputnika: 0, cena: 0
  };


  constructor(private http: HttpClient, private fb: FormBuilder, private restService: RestService) {
    this.letForm = this.fb.group({
      od: ['', Validators.required],
      destinacija: ['', Validators.required],
      vreme: ['', Validators.required],
      brojputnika: [0, [Validators.required, Validators.min(0)]],
      cena: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    
    this.restService.getAllLet().subscribe((data: any) => {
      console.log('Response from server:', data);
      this.letovi = data;
    });

    this.restService.getAllLet()
      .subscribe((data: Let[]) => {
        this.letovi = data;
      });


    this.refreshLet();
  }
  onSubmit(): void {
    // Your submit logic here
    console.log('Form submitted!');
  }


  refreshLet() {
    this.restService.getAllLet().subscribe((data: Let[]) => {
      this.letovi = data;
    });
  }


  dodajLet() {
    if (!this.letForm) {
      console.error('Forma nije inicijalizovana.');
      return;
    }

    if (this.letForm.invalid) {
      console.log('Forma nije validna');

      // Ispisujemo greške za svako polje koje nije validno
      Object.keys(this.letForm.controls).forEach(key => {
        const control: AbstractControl | null = this.letForm.get(key);

        if (control != null) {
          const controlErrors = control.errors;

          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log(`Polje ${key} ima grešku: ${keyError}`);
            });
          }
        }
      });

      this.showErrorMessage = true;
      window.location.reload();
      return;
    }

    console.log('Vrednosti forme:', this.letForm!.value);
    console.log('Pokrenuta funkcija dodajTelefon');

    // Resetujemo prikaz poruke o grešci
    this.showErrorMessage = false;

    // Šaljemo podatke na server i dodajemo novi telefon
    this.restService.addLet(this.letForm.value).subscribe(
      (data: Let) => {
        // Uspesno dodavanje - ažuriranje lokalnog prikaza telefona
        this.letovi.push(data);

        // Resetovanje forme nakon uspešnog dodavanja
        this.letForm.reset();

        // Resetovanje newPhone na podrazumevanu vrednost
        this.newLet = { id: 0, od: '', destinacija: '', vreme: '', brojputnika: 0, cena: 0};
      },
      (error) => {
        console.error('Greška prilikom slanja podataka na server:', error);
      }
    );
  }



  //dugme u tabeli da bi se peokazali podaci koji treba da se azuriraju
  async azurirajLet(letovi: Let): Promise<void> {
    this.refreshLet();
    console.log('Vrednost izabranog telefona (pre postavljanja):', letovi);

    // Postavi vrednosti forme na osnovu izabranog telefona
    this.letForm.patchValue({
      id: letovi.id,
      od: letovi.od,
      destinacija: letovi.destinacija,
      vreme: letovi.vreme,
      brojputnika: letovi.brojputnika,
      cena: letovi.cena
    });

    // Ažuriraj 'newPhone' objekat sa informacijama izabranog telefona
    this.newLet = { ...letovi, id: letovi.id };
    // Postavi 'id' svojstvo na odgovarajuću vrednost

    console.log('Vrednost newLet (posle postavljanja):', this.newLet);

    try {
      // Sačekaj završetak asinhrone operacije pre nego što nastaviš dalje
      await this.restService.someAsyncOperation();

      // Ažuriraj izabrane telefone na serveru i lokalno
      await this.sacuvajAzuriranje();

    } catch (error) {
      console.error('Greška prilikom ažuriranja telefona:', error);
    }

  }

  async sacuvajAzuriranje(): Promise<void> {
    if (this.letForm.invalid) {
      console.log('Forma nije validna');
      return;
    }

    try {
      // Ažuriranje izabranih telefona na serveru
      await this.restService.updateLet(this.newLet.id, this.letForm.value).toPromise();

      // Ažuriraj lokalne podatke o telefonu
      const updatedLetIndex = this.letovi.findIndex(p => p.id === this.newLet.id);
      if (updatedLetIndex !== -1) {
        this.letovi[updatedLetIndex] = { ...this.newLet, ...this.letForm.value };
      }

      // Resetuj formu nakon ažuriranja
      this.handleFormReset();
    } catch (error) {
      console.error('Greška prilikom ažuriranja telefona:', error);
    }

  }


  obrisiLet(id: number | undefined): void {
    if (id === undefined) {
      console.error('id nije definisan.');
      return;
    }

    console.log(`Brisanje telefona sa ID:`, id);

    this.restService.deleteLet(id).subscribe(
      () => {
        // Ukloni telefon iz lokalnog niza
        const index = this.letovi.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.letovi.splice(index, 1);
        }

        // Ažuriraj prikaz selektovanih telefona
        this.selectedPhones = this.selectedPhones.filter((p) => p.id !== id);
      },
      (error) => {
        console.error(`Greška prilikom brisanja telefona sa ID: ${id}`, error);
      }
    );
    this.refreshLet();
  }

  //resetovanje forme
  private handleFormReset(): void {
    this.letForm.reset();
    this.newLet = { id: 0, od: '', destinacija: '', vreme: '', brojputnika: 0, cena: 0 };
  }







  //   flightForm: FormGroup;
  //   updateFlightForm: FormGroup;
  //   //flights: Flights[] = [];
  //   selectedFlightId: number | null = null;

  //   constructor(private fb: FormBuilder, private restService: RestService) {
  //     this.flightForm = this.fb.group({
  //       name: ['', Validators.required],
  //       destination: ['', Validators.required]
  //     });

  //     this.updateFlightForm = this.fb.group({
  //       updateName: ['', Validators.required],
  //       updateDestination: ['', Validators.required]
  //     });
  //   }

  //   ngOnInit() {
  //     this.loadFlights();
  //   }

  //   loadFlights() {
  //     // Pozovi servis za dohvat svih letova
  //     this.restService.getFlights().subscribe(
  //       (flights) => {
  //         this.flights = flights;
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }

  //   addFlight() {
  //     if (this.flightForm.valid) {
  //       const name = this.flightForm.value.name;
  //       const destination = this.flightForm.value.destination;

  //       // Pozovi servis za dodavanje novog leta
  //       this.restService.addFlight({ name, destination }).subscribe(
  //         (response) => {
  //           console.log('Flight added successfully:', response);
  //           // Osvježi listu letova nakon dodavanja
  //           this.loadFlights();
  //           // Resetuj formu
  //           this.flightForm.reset();
  //         },
  //         (error) => {
  //           console.error('Error adding flight:', error);
  //         }
  //       );
  //     }
  //   }

  //   editFlight(flight: any) {
  //     // Postavi selektovani let
  //     this.selectedFlightId = flight.id;
  //     // Popuni podatke u formi za ažuriranje
  //     this.updateFlightForm.patchValue({
  //       updateName: flight.name,
  //       updateDestination: flight.destination
  //     });
  //   }

  //   updateFlight() {
  //     if (this.updateFlightForm.valid && this.selectedFlightId !== null) {
  //       const name = this.updateFlightForm.value.updateName;
  //       const destination = this.updateFlightForm.value.updateDestination;

  //       // Pozovi servis za ažuriranje leta
  //       this.restService.updateFlight(this.selectedFlightId, { name, destination }).subscribe(
  //         (response) => {
  //           console.log('Flight updated successfully:', response);
  //           // Osvježi listu letova nakon ažuriranja
  //           this.loadFlights();
  //           // Resetuj formu
  //           this.updateFlightForm.reset();
  //           // Resetuj selektovani let
  //           this.selectedFlightId = null;
  //         },
  //         (error) => {
  //           console.error('Error updating flight:', error);
  //         }
  //       );
  //     }
  //   }

  //   deleteFlight(flightId: number) {
  //     // Pozovi servis za brisanje leta
  //     this.restService.deleteFlight(flightId).subscribe(
  //       (response) => {
  //         console.log('Flight deleted successfully:', response);
  //         // Osvježi listu letova nakon brisanja
  //         this.loadFlights();
  //       },
  //       (error) => {
  //         console.error('Error deleting flight:', error);
  //       }
  //     );
  //   }
}





// // // admin.component.ts

// // import { Component, OnInit } from '@angular/core';
// // import { FlightService } from '../services/flight.service';

// // @Component({
// //   selector: 'app-admin',
// //   templateUrl: './admin.component.html',
// //   styleUrls: ['./admin.component.scss']
// // })
// // export class AdminComponent implements OnInit {
// //   flights: any[] = [];
// //   selectedFlight: any = {};
// //   isNewFlight: boolean = false;

// //   constructor(private flightService: FlightService) { }

// //   ngOnInit() {
// //     this.loadFlights();
// //   }

// //   loadFlights() {
// //     this.flightService.getAllFlights().subscribe(
// //       (flights) => {
// //         this.flights = flights;
// //       },
// //       (error) => {
// //         console.error('Error loading flights', error);
// //       }
// //     );
// //   }

// //   selectFlight(flight: any) {
// //     this.selectedFlight = { ...flight };
// //     this.isNewFlight = false;
// //   }

// //   addFlight() {
// //     this.selectedFlight = {};
// //     this.isNewFlight = true;
// //   }

// //   saveFlight() {
// //     if (this.isNewFlight) {
// //       this.flightService.addFlight(this.selectedFlight).subscribe(
// //         () => {
// //           this.loadFlights();
// //         },
// //         (error) => {
// //           console.error('Error adding flight', error);
// //         }
// //       );
// //     } else {
// //       const flightId = this.selectedFlight.id; // Pretpostavljamo da letovi imaju 'id' polje
// //       this.flightService.updateFlight(flightId, this.selectedFlight).subscribe(
// //         () => {
// //           this.loadFlights();
// //         },
// //         (error) => {
// //           console.error('Error updating flight', error);
// //         }
// //       );
// //     }
// //   }

// //   deleteFlight(flightId: string) {
// //     this.flightService.deleteFlight(flightId).subscribe(
// //       () => {
// //         this.loadFlights();
// //       },
// //       (error) => {
// //         console.error('Error deleting flight', error);
// //       }
// //     );
// //   }
// // }
