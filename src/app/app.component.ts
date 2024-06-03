import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { GameComponentsRegistry } from './decorators/dynamic-component';
import { ViewComponent } from './view/view.component';
import { ViewHandlerService } from './services/view-handler.service';
import { IGameComponent } from './interfaces/component.interface';
import { ViewComponentsModule } from './view/view-components.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule, 
    ViewComponent, 
    ViewComponentsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ViewHandlerService]
})
export class AppComponent {
  title = 'ragemp-angular';

  isRAGE: boolean = window.isRage;
  devMode: boolean = environment.production;

  constructor(
    /* Do not delete these! These are mandatory for the UI to work. */
    private readonly viewHandler: ViewHandlerService
  ) { }

  /**
   * Gets all components registered in GameComponentsRegistry.
   * @returns all component names
   */
  getAllComponentNames() {
    return [...GameComponentsRegistry.keys()]
  }

  /**
   * Triggered when you enter the mouse over the dev menu.
   * @param value boolean
   */
  toggleGameDevMenu(value: boolean): void {
    this.devMode = value;
  }

  /**
   * This method is called when a component name is pressed in the Development Menu.
   * @param component component name
   */
  renderComponentSelected(component: string) {
    !this.viewHandler.isComponentLoaded(component) ? this.viewHandler.renderComponent(component) : this.viewHandler.unrenderComponent(component);
  }

  /**
   * Gets the list of components rendered in the view.
   * @returns IGameComponent array
   */
  get gameComponents(): IGameComponent[] {
    return this.viewHandler.getComponentsList();
  }
}
