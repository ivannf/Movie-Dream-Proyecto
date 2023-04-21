import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cards = [
    {
      title: 'EVENTO 1',
      description:
        'Maratón olímpico de París 2024: Toda la información',
      buttonText: 'CLASIFICACIÓN',
      img: '../../../assets/img/arco_triunfo.jpg',
    },
    {
      title: 'EVENTO 2',
      description: 'Maratón de Málaga 2022: Toda la información',
      buttonText: 'CLASIFICACIÓN',
      img: '../../../assets/img/maraton_malaga.jpg',
    },
    {
      title: 'EVENTO 3',
      description:
        'Mediterránea Triatlón de Valencia 2022: Toda la información',
      buttonText: 'CLASIFICACIÓN',
      img: '../../../assets/img/triatlon_valencia.jpg',
    },
    {
      title: 'EVENTO 4',
      description: 'Maratón de Nueva York 2022: Toda la información',
      buttonText: 'CLASIFICACIÓN',
      img: '../../../assets/img/maraton_new_york.jpg',
    },
  ];
}
