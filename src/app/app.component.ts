import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { GameComponentRegistry } from './decorators/dynamic-component';
import { ViewComponent } from './view/view.component';
import { ViewHandlerService } from './services/view-handler.service';
import { IGameComponent } from './interfaces/component.interface';
import { ViewComponentsModule } from './view/view-components.module';
import { RageService } from './services/rage.service';

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
export class AppComponent implements AfterViewInit {
  title = 'ragemp-angular';

  isRAGE: boolean = window.isRage;
  devMode: boolean = environment.production;

  constructor(
    /* Do not delete these! These are mandatory for the UI to work. */
    private readonly viewHandler: ViewHandlerService,
    private readonly rage: RageService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  /**
   * Sends a client event telling client that the Angular instance has loaded.
   */
  ngAfterViewInit(): void {
    this.rage.sendClient('onBrowserLoaded');
  }

  /**
   * Gets all components registered in GameComponentRegistry.
   * @returns all component names
   */
  getAllComponentNames() {
    return [...GameComponentRegistry.keys()]
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
  onComponentSelected(component: string) {
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
