import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-cat',
  templateUrl: './games-cat.component.html',
  styleUrls: ['./games-cat.component.css']
})
export class GamesCatComponent implements OnInit {
  @Output() public id_cat = new EventEmitter;
  data: string = '';

  isAuthenticated: boolean = false;
  emailUser: any = null;
  categorias: any = [
    { id: 1, name: 'Entrada y Salida' },
    { id: 2, name: 'Condicionales' },
    { id: 3, name: 'Ciclos' }
  ];

  constructor() { };



  ngOnInit() {
  }

  setId(id) {
    this.id_cat.emit({ data: id });
  }

}
