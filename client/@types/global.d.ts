export declare global {
  interface Window {
    changeSize: () => void;
    game: Game;
    ethereum: Eip1193Provider;
    status: "hello" | "mission";
  }
}
