import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  @Input() id_juego: string = '';

  juegos: any = [
    { id: 1, name: 'Construir', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/construir.png?alt=media&token=d0c7612b-9e44-4f87-963a-53aa9611f389", descripcion: '' },
    { id: 2, name: 'Lavar', id_juego: 1, img: "https://xombitgames.com/files/2012/12/minecraft.jpg", descripcion: '' },
    { id: 3, name: 'Sembrar', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/sembrar.png?alt=media&token=414329ab-6343-49a0-86ff-700c4264ce2d", descripcion: '' },
    { id: 4, name: 'Pinturas', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/pintura.png?alt=media&token=55836feb-9c0b-4b47-9e0b-495bdeebcee6", descripcion: '' },
    { id: 3, name: 'El volcan', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/volcan.png?alt=media&token=7ae1c936-6a42-48d4-b855-10de843f0539", descripcion: '' }

  ];

  constructor() {

  }

  ngOnInit() {
  }

}
