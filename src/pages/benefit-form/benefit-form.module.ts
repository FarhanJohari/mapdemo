import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenefitFormPage } from './benefit-form';

@NgModule({
  declarations: [
    BenefitFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BenefitFormPage),
  ],
})
export class BenefitFormPageModule {}
