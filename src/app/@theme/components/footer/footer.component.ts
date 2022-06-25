import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b>Mallikarjun & Navil</b> &copy; {{ today | date: 'yyyy' }}.
    </span>
  `,
})
export class FooterComponent {
  today: number = Date.now()
}
