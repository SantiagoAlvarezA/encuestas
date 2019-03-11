import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  @Input() id_juego = '';

  juegos: any = [
    { id: 1, name: 'Construir', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/construir.png?alt=media&token=d0c7612b-9e44-4f87-963a-53aa9611f389", descripcion: 'Este juego se basa en la identificación de los elementos de un algoritmo (entrada, proceso y salida). La funcion de este juego se fundamenta en la construccion de una casa, donde el jugador debera dezplazarse por el puente con las direcciones (ir izquierda, ir derecha, ir arriba e ir abajo) llevando los elementos que encuentra en el inicio (madera,ladrillos) para finalmente lograr el objetivo con la instrucción construir la casa.', gameUrl: 'https://saydy20.itch.io/construir' },
    { id: 2, name: 'Lavar', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/Sin%20t%C3%ADtulo.png?alt=media&token=fd6aa0b8-95a1-4c0c-9c4b-de19f30fad06", descripcion: 'En este reto deberas hacer un quehacer cotidiano como lavar ropa. utilizando las siguientes instrucciones ()', gameUrl: 'https://erikareyes.itch.io/lavar' },
    {
      id: 3, name: 'Sembrar', id_juego: 1, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/SEMBFR.png?alt=media&token=a67a3f2e-2bc9-4066-9565-01ec1a5d7540",

      descripcion: 'Este juego tiene un fin lograr que identifiques los elementos de un algoritmo (entrada, proceso y salida). El reto consiste en sembrar una planta, donde tu avatar debera dezplazarse  con las direcciones (izquierda y derecha) llevando los elementos que encuentra en el inicio (tierra,agua,planta) para finalmente lograr sembrar una planta.    Debes tener en cuenta el orden al llevar los elementos en el proceso de lo contrario no lograras cumplir el objetivo.', gameUrl: 'https://saydy20.itch.io/sembrar'
    },
    { id: 4, name: 'Pinturas', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/pintura.png?alt=media&token=55836feb-9c0b-4b47-9e0b-495bdeebcee6", descripcion: 'Este juego tiene como fin el reconocimiento de condicionales anidados , usted debera combinar dos de los colores primarios (amarillo, azul y rojo) para optener el color secundario que se asigne', gameUrl: 'https://saydy20.itch.io/pinturas' },
    { id: 3, name: 'El volcan', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/volcan.png?alt=media&token=7ae1c936-6a42-48d4-b855-10de843f0539", descripcion: 'Ahora lograras identificar un condicional basico. El reto consiste en pasar el puente donde tu avatar debera desplazarse con las direcciones (ir izquierda, ir derecha,ir arriba,ir abajo) evitando caer a la lava con el uso de saltos (saltar ) dependiendo del caso en donde debera tomar una desición.', gameUrl: 'https://saydy20.itch.io/volcan-de-lava' },
    { id: 4, name: 'Estacionamiento', id_juego: 2, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/carro.png?alt=media&token=f64fd4ad-072c-44de-a949-f0af7f0965d1", descripcion: 'Una forma de entender que es condicional, en este reto deberas llevar el auto utilizando las direcciones (derecho, giro a la izquierda y giro a la derecha) para llegar hasta el estacionamiento. Ten en cuenta la Y con la cual te encontraras ya que debes tomar una desicion para llegar al objetivo.', gameUrl: 'https://saydy20.itch.io/carros' },
    { id: 5, name: 'Autos de carrera', id_juego: 3, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/carr.png?alt=media&token=3c434df1-f4a8-4d62-a896-17a8485b6029", descripcion: 'Este juego se basa en las estructuras ciclicas. La funcion de este juego se fundamenta el reconocimiento de ciclos, para este caso se podra ingresar 3 tipos de carreras en donde se lograra ver como los autos realizan un ciclo', gameUrl: 'https://erikareyes.itch.io/autos-de-carrera' },
    { id: 6, name: 'Parque de diversiones', id_juego: 3, img: "https://firebasestorage.googleapis.com/v0/b/algoritbuild-21705.appspot.com/o/barca.png?alt=media&token=2d738b29-c45a-4129-b086-91dd44340df9", descripcion: 'En este resto ingresa la direcciòn y nùmero de vueltas que deseas para que la barca de marcopolo gire. Las instrucciones validas son (izquierda, derecha) y el nùmero de vueltas es 10', gameUrl: '' }
  ];

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  navegateToGame(gameUrl) {
    // this.router.navigate([gameUrl]);
    if (gameUrl != '') {
      window.open(gameUrl, '_blank');
    }

    // this.router.navigateByUrl(gameUrl);
  }

}
