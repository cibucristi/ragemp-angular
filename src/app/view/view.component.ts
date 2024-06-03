import { Component, ComponentRef, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { GameComponentsRegistry } from '../decorators/dynamic-component';
import { RageService } from '../services/rage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-component', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss' 
})
export class ViewComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly game: RageService,
  ) {}

  dynamicRef!: ComponentRef<any>;

  @Input()
  public component: string = ''; 

  ngOnInit() {
    const component = GameComponentsRegistry.get(this.component.toString());
    if (!component) return;

    // Creates the component into the view.
    this.dynamicRef = this.viewContainerRef.createComponent(component);
    setTimeout(() => {
      this.dynamicRef.changeDetectorRef.detectChanges();
    }, 20);
  }

  ngOnChanges() {
    setTimeout(() => {
      if (!this.dynamicRef) return;
      this.dynamicRef.changeDetectorRef.detectChanges();
    }, 100);
  }

  ngOnDestroy() {
    if (GameComponentsRegistry.get(this.component)) {
      this.dynamicRef.destroy();
      this.viewContainerRef.clear();
    }
  }
}
