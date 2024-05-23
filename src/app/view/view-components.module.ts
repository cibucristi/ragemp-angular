import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from '../game-components/test/test.component';

const components = [
  TestComponent,
  /* Other game components */
]

@NgModule({
  imports: [
    CommonModule,
    ...components
  ]
})
export class ViewComponentsModule { }
