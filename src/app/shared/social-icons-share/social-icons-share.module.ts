import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconsShareComponent } from './social-icons-share.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from 'ngx-sharebuttons';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SocialIconsShareComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ShareModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  exports: [SocialIconsShareComponent],
})
export class SocialIconsShareModule {}