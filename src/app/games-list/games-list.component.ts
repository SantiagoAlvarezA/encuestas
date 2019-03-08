import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  @Input() id_juego: string = '';

  juegos: any = [
    { id: 1, name: 'Construir', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/construir.png?alt=media&token=d0c7612b-9e44-4f87-963a-53aa9611f389", descripcion: '', gameUrl: 'https://saydy20.itch.io/construir' },
    // { id: 2, name: 'Lavar', id_juego: 1, img: "https://xombitgames.com/files/2012/12/minecraft.jpg", descripcion: '', gameUrl: '' },
    // { id: 3, name: 'Sembrar', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/sembrar.png?alt=media&token=414329ab-6343-49a0-86ff-700c4264ce2d", descripcion: '', gameUrl: 'https://saydy20.itch.io/sembrar' },
    // { id: 4, name: 'Pinturas', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/pintura.png?alt=media&token=55836feb-9c0b-4b47-9e0b-495bdeebcee6", descripcion: '', gameUrl: 'https://saydy20.itch.io/pinturas' },
    // { id: 3, name: 'El volcan', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/volcan.png?alt=media&token=7ae1c936-6a42-48d4-b855-10de843f0539", descripcion: '', gameUrl: 'https://saydy20.itch.io/volcan-de-lava' },
    { id: 4, name: 'Estacionamiento', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/carro.png?alt=media&token=f64fd4ad-072c-44de-a949-f0af7f0965d1", descripcion: '', gameUrl: 'https://saydy20.itch.io/carros' },
    { id: 5, name: 'Autos de carrera', id_juego: 3, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/carr.png?alt=media&token=3c434df1-f4a8-4d62-a896-17a8485b6029", descripcion: '', gameUrl: 'https://erikareyes.itch.io/autos-de-carrera' },
    // { id: 6, name: 'Parque de diversiones', id_juego: 3, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/barca.png?alt=media&token=2d738b29-c45a-4129-b086-91dd44340df9", descripcion: '', gameUrl: '' }

  ];

  constructor(private router:Router) {

  }

  ngOnInit() {
  }

  navegateToGame(gameUrl){
    // this.router.navigate([gameUrl]);
    if(gameUrl != ''){
      window.open(gameUrl, '_blank');
    }
    
    // this.router.navigateByUrl(gameUrl);
  }

}
