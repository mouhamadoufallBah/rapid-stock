import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { ChartComponent } from "ng-apexcharts";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


import {
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { ClientService } from '../../../services/client/client.service';
import { VenteService } from '../../../services/vente/vente.service';
import { AchatService } from '../../../services/achat/achat.service';
import { AuthService } from '../../../services/users/auth.service';
import { ClientIdToClientInfoPipe } from '../../../pipes/clients/client-id-to-client-info.pipe';

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};



@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, NgApexchartsModule, ClientIdToClientInfoPipe],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions2>;

  dtOptions: DataTables.Settings = {};

  allClient: number = 0;
  allEmploye: number = 0;
  allAchat: number = 0;
  allVente: number = 0;
  montantvente: number = 0;
  montantAchat: number = 0;
  latestVente: any[] = [];
  allClients: any[] = []

  montantTotalVenteParMois: any[] = []


  constructor(private authService: AuthService, private clientService: ClientService, private venteService: VenteService, private achatService: AchatService) {
    this.chartOptions = {
      series: [
        {
          name: "Achat",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Vente",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 150,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };



    this.chartOptions2 = {
      series: [], // Initialize to empty array
      chart: {
        type: 'donut',
        height: 150
      },
      labels: ["Achat", "Vente"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };



  }


  async ngOnInit() {
    this.getAllEmploye();
    this.getAllclient();
    this.getAllVente();
    this.getAllAchat();
    this.montantAllVente();
    this.montantAllAchat();
    this.updateChartOptions();
    this.getLatestVente();

    this.getMontantVenteTotalParMois();


    this.dtOptions = {
      searching: false,
      lengthChange: false,
      paging: false,
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };

  }

  getAllclient() {
    this.clientService.getAllClient().subscribe(
      (resp) => {
        this.allClient = resp.data.length;
        this.allClients = resp.data;
      }
    )
  }

  getAllEmploye() {
    this.authService.getAllEmploye().subscribe(
      (resp) => {
        // console.log(resp);

        this.allEmploye = resp.data.length
      }
    )
  }

  getAllVente() {
    this.venteService.getAllVente().subscribe(
      (resp) => {
        this.allVente = resp.data.length
      }
    )
  }

  getAllAchat() {
    this.achatService.getAllAchat().subscribe(
      (resp) => {
        this.allAchat = resp.data.length
      }
    )
  }

  async updateChartOptions() {
    const montantAchat = await this.montantAllAchat();
    const montantVente = await this.montantAllVente();
    this.chartOptions2.series = [montantAchat, montantVente];
  }

  async montantAllAchat() {
    const resp = await this.achatService.getAllAchat().toPromise();
    let montantAchat = 0;
    resp.data.forEach((elt) => {
      montantAchat += parseInt(elt.montantachat);
      this.montantAchat = montantAchat;
    });
    return montantAchat;
  }

  async montantAllVente() {
    const resp = await this.venteService.getAllVente().toPromise();
    let montantVente = 0;
    resp.data.forEach((elt) => {
      montantVente += parseInt(elt.montant_total);
      this.montantvente = montantVente;
    });
    return montantVente;
  }


  getLatestVente() {
    this.venteService.getLatestVentes().subscribe(
      (resp) => {
        this.latestVente = resp;

      }
    );
  }

  getMontantVenteTotalParMois(){
    this.venteService.getTotalParMois().subscribe(
      (response) =>{
        this.montantTotalVenteParMois = response
        // console.log(this.montantTotalVenteParMois);

      }
    )
  }


}





