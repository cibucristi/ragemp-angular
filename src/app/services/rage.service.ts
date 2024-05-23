import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare global {
  interface Window { 
    mp: {
      invoke(eventName: string, ...args: any[]): void;
      events: {
        /**
         * Registers an event.
         * @param eventName event name
         * @param callback event callback
         */
        add(eventName: string, callback: (...args: any[]) => void): void;
        /**
         * Removes an registered event.
         * @param eventName name of the event to be removed
         * @param callback callback
         */
        remove(eventName: string): void;
        /**
         * Emits an event to client.
         * @param eventName event name
         * @param args arguments
         */
        call(eventName: string, ...args: any[]): void;
        /**
         * Emits an event to server-side.
         * @param eventName event name
         * @param args arguments
         */
        callRemote(eventName: string, ...args: any[]): void;
        /**
         * Triggers an event.
         * @param eventName event name
         * @param args arguments
         */
        trigger(eventName: string, ...args: any[]): void;
      };
    };
    isRage: boolean;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RageService {
  constructor() {}

  /**
   * Sends an event to server-side.
   * @param event_name event name to be called
   * @param args arguments
   */
  sendServer(event_name: string, ...args: any) {
    if (window.isRage) {
      window.mp.events.callRemote(event_name, ...args);
    } else {
      if (environment.eventLogs) {
        if (args.length == 0) console.log(`[SERVER EVENT] -> ${event_name}`)
        else console.log(`[SERVER EVENT] -> ${event_name} - Arguments: [${args}].`)
      }
    }
  }

  /**
   * Sends an event to client-side.
   * @param event_name event name to be called
   * @param args arguments
   */
  sendClient(event_name: string, ...args: Array<any>) {
    if (window.isRage) {
      window.mp.invoke(event_name, ...args);
    } else {
      if (environment.eventLogs) {
        if (args.length == 0) console.log(`[CLIENT EVENT] -> ${event_name}`)
        else console.log(`[CLIENT EVENT] -> ${event_name} - Arguments: [${args}].`)
      }
    }
  }

  /**
   * Registers an event in browser.
   * @param eventName event name
   * @param callback callback
   */
  registerEvent(eventName: string, callback: (...args: any[]) => void) {
    if (window.isRage) {
      window.mp.events.add(eventName, callback);
    }
  }

  /**
   * Removes a registered event in browser.
   * @param eventName event name
   * @param args args
   */
  removeLocalEvent(eventName: string, ...args: any) {
    if (window.isRage) {
      window.mp.events.remove(eventName);
    }
  }
}