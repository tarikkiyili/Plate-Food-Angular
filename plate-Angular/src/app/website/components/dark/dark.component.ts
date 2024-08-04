import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-dark',
  standalone: true,
  imports: [],
  templateUrl: './dark.component.html',
  styleUrl: './dark.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DarkComponent implements AfterViewInit, OnDestroy {
  private toggleButton: HTMLElement | null = null;

  ngAfterViewInit() {
    this.toggleButton = document.querySelector('.dark button');
    if (this.toggleButton) {
      this.toggleButton.addEventListener(
        'click',
        this.toggleDarkMode.bind(this)
      );
    }
  }

  ngOnDestroy() {
    if (this.toggleButton) {
      this.toggleButton.removeEventListener(
        'click',
        this.toggleDarkMode.bind(this)
      );
    }
  }

  toggleDarkMode() {
    const container = document.querySelector('.container') as HTMLElement;
    container.classList.toggle('sun-active');

    const darkContainer = document.querySelector('.dark') as HTMLElement;
    darkContainer.classList.toggle('active');

    const moonIcon = darkContainer.querySelector('.moon') as HTMLElement;
    const sunnyIcon = darkContainer.querySelector('.sunny') as HTMLElement;

    if (moonIcon && sunnyIcon) {
      moonIcon.style.display = darkContainer.classList.contains('active')
        ? 'none'
        : 'block';
      sunnyIcon.style.display = darkContainer.classList.contains('active')
        ? 'block'
        : 'none';
    }

    const icon = this.toggleButton?.querySelector('ion-icon');
    if (icon) {
      icon.setAttribute(
        'name',
        container.classList.contains('sun-active')
          ? 'sunny-outline'
          : 'moon-outline'
      );
    }
  }
}
