export const GameComponentsRegistry: Map<string, any> = new Map<string, any>();

// DECORATOR USED FOR INJECTING GAME COMPONENTS
export function GameComponent(name: string): ClassDecorator {
  return (target: any) => {
    GameComponentsRegistry.set(name, target);
  };
}