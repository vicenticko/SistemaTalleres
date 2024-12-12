import { Component, OnInit } from '@angular/core';
import { TallerService } from 'src/app/services/taller.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
})
export class TalleresPage implements OnInit {

  talleres: any[] = [];

  constructor(private tallerService: TallerService) { }

  ngOnInit() {
    this.cargarTalleres();
  }

  async cargarTalleres() {
    this.talleres = await this.tallerService.getTalleres();
  }

  tomarTaller() {
  }
}
