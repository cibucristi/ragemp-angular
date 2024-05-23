import { ChangeDetectorRef, Injectable, WritableSignal, signal } from '@angular/core';
import { IGameComponent } from '../interfaces/component.interface';
import { RageService } from './rage.service';

@Injectable({
  providedIn: 'root'
})
export class ViewHandlerService {
  private componentsList: WritableSignal<IGameComponent[]> = signal([]);

  constructor(
    private readonly rage: RageService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.rage.registerEvent('renderWebComponent', (component: string) => this.renderComponent(component));
    this.rage.registerEvent('unrenderWebComponent', (component: string) => this.unrenderComponent(component));
  }

  /**
   * Renders a component in the view.
   * @param component component name
   */
  public renderComponent(component: string) {
    const component_str = component.toString();
    const index = this.componentsList().findIndex(
      (componentEntry: IGameComponent) =>
        componentEntry.identifier == component.toString()
    );
    if (index != -1) return;

    this.componentsList.update(list => [...list, { identifier: component_str }]);
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Unrenders a component from the view.
   * @param component component name 
   */
  public unrenderComponent(component: string) {
    const index = this.componentsList().findIndex(
      (componentEntry: IGameComponent) =>
        componentEntry.identifier == component.toString()
    );
    if (index == -1) return;

    this.componentsList.update(list => list.filter((_, i) => i !== index));
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Gets the component list rendered in the view.
   * @returns IGameComponent array
   */
  public getComponentsList(): any {
    return this.componentsList()
  }

  /**
   * Checks if the component is loaded in the view.
   * @param component component name to be checked
   * @returns boolean
   */
  public isComponentLoaded(component: string): boolean {
    return this.componentsList().findIndex((componentEntry: IGameComponent) => componentEntry.identifier == component.toString()) > -1;
  }
}
