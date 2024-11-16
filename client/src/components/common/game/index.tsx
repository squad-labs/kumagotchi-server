import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "@/shared/configs/game/setting";
import { BaseGame } from "@/components/common/game/game";
import Phaser from "phaser";
import { EventBus } from "@/shared/event/emit";
import { BaseScene } from "@/components/common/game/scene/BaseScene";

interface IGameProps {
  setCurrentScene?: (sceneInstance: BaseScene) => void;
}

export interface IGameRef {
  game: BaseGame | undefined;
  scene: Phaser.Scene | undefined;
}

const GameContainer = forwardRef<IGameRef, IGameProps>(function GameBody(
  { setCurrentScene },
  ref
) {
  const game = useRef<BaseGame | undefined>(undefined);

  useLayoutEffect(() => {
    game.current = game.current ?? StartGame("kumagochi-parent");

    if (typeof ref === "function") {
      ref({ game: game.current, scene: undefined });
    } else if (ref) {
      ref.current = { game: game.current, scene: undefined };
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current) {
          game.current = undefined;
        }
      }
    };
  }, []);

  useEffect(() => {
    EventBus.on("scene-ready", (sceneInstance: BaseScene) => {
      if (setCurrentScene && typeof setCurrentScene === "function") {
        setCurrentScene(sceneInstance);
      }

      if (typeof ref === "function") {
        ref({ game: game.current, scene: sceneInstance });
      } else if (ref) {
        ref.current = { game: game.current, scene: sceneInstance };
      }
    });
    return () => {
      EventBus.removeListener("scene-ready");
    };
  }, [setCurrentScene, ref]);

  return <section id="kumagochi-parent" />; // kk-container
});

export default GameContainer;
