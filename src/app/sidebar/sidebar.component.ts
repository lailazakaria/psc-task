import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() formActivated = new EventEmitter<void>();

  activateImpactAnalysisForm() {
    this.formActivated.emit();
  }

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
