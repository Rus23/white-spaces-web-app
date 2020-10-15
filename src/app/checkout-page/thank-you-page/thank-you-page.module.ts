import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankYouPageComponent } from './thank-you-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoModule } from 'src/app/shared/logo/logo.module';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';

@NgModule({
  declarations: [ThankYouPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LogoModule,
    GradientDirectiveModule,
  ],
  exports: [ThankYouPageComponent],
})
export class ThankYouPageModule {}
