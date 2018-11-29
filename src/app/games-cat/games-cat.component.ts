import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-cat',
  templateUrl: './games-cat.component.html',
  styleUrls: ['./games-cat.component.css']
})
export class GamesCatComponent implements OnInit {
  id_juego: number=0;

  juegos: any = [
    {id: 1, name: 'Construir', id_juego:1,img:"https://xombitgames.com/files/2012/12/minecraft.jpg",descripcion:''},
    {id: 2, name: 'Lavar',id_juego:1,img:"https://xombitgames.com/files/2012/12/minecraft.jpg",descripcion:''},
    {id: 3, name: 'Sembrar',id_juego:1,img:"https://xombitgames.com/files/2012/12/minecraft.jpg",descripcion:''},
    {id: 4, name: 'Pinturas',id_juego:2,img:"https://xombitgames.com/files/2012/12/minecraft.jpg",descripcion:''},
    {id: 3, name: 'El volcan',id_juego:2,img:"https://xombitgames.com/files/2012/12/minecraft.jpg",descripcion:''}
    
];

  constructor(private route:ActivatedRoute) {
    this.id_juego=this.route.snapshot.params['id_juego'];

console.log(this.id_juego)
;
   }

  ngOnInit() {
  }

}
