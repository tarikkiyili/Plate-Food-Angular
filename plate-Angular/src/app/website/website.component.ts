import { Component, AfterViewInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebsiteComponent implements AfterViewInit {
  constructor(private translocoService: TranslocoService) {}

  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }
  ngAfterViewInit() {
    /* Slider */
    document.addEventListener('DOMContentLoaded', () => {
      const sliderItems = document.querySelectorAll('.slider-item');
      const allNumbers = document.querySelectorAll('.numbers');

      allNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
          document
            .querySelectorAll('.active')
            .forEach((el) => el.classList.remove('active'));

          number.classList.add('active');
          sliderItems[index % sliderItems.length].classList.add('active');

          for (let i = index % 4; i < allNumbers.length; i += 4) {
            allNumbers[i].classList.add('active');
          }
        });
      });
    });

    /* Client Sat Slider */
    const images = document.querySelectorAll('.clients_img_container img');
    const clients = document.querySelectorAll('.clients_slider');
    const dashes = document.querySelectorAll('.dash');

    function activateSlide(index: number) {
      clients.forEach((client, idx) => {
        client.classList.toggle('show', idx === index);
      });

      dashes.forEach((dash, idx) => {
        dash.classList.toggle('active', idx === index);
      });

      images.forEach((img, idx) => {
        img.classList.toggle('active_img', idx === index);
      });
    }

    images.forEach((img, index) => {
      img.addEventListener('click', () => activateSlide(index));
    });

    dashes.forEach((dash, index) => {
      dash.addEventListener('click', () => activateSlide(index));
    });

    activateSlide(0);
  }
}
