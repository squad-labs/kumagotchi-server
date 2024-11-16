import { LoadingScene } from "@/components/common/game/scene/LoadingScene";
import { BaseGame } from "@/components/common/game/game";
import { BaseScene } from "@/components/common/game/scene/BaseScene";
import { Scale, Types, WEBGL } from "phaser";

export const gameConfig: Types.Core.GameConfig = {
  title: "Kumagochi",
  type: WEBGL,
  parent: "kumagochi-parent",
  backgroundColor: "#ffffff",
  scale: {
    mode: Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
    min: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    max: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  render: {
    antialias: true,
    pixelArt: true,
  },
  callbacks: {
    postBoot: (game: Phaser.Game) => {
      window.changeSize = () => {
        if (window.game.isBooted) {
          setTimeout(() => {
            game.scale.resize(window.innerWidth, window.innerHeight);
          }, 100);
        }
      };
    },
    preBoot: (game: Phaser.Game) => {},
  },
  autoFocus: true,
  audio: {
    disableWebAudio: true,
  },
  scene: [LoadingScene, BaseScene],
};

const StartGame = (parent: string) => {
  return new BaseGame({ ...gameConfig, parent });
};

export default StartGame;
