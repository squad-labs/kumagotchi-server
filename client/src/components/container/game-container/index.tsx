import React, { useRef, useState } from "react";
import styles from "@/components/container/game-container/GameContainer.module.scss";
import classNames from "classnames/bind";
import GameContainer, { IGameRef } from "@/components/common/game";
import { IBaseGame } from "@/components/common/game/game";

const cx = classNames.bind(styles);

const GameWrapper = () => {
  const [currentScene, setCurrentScene] = useState<IBaseGame | undefined>(
    undefined
  );
  const gameRef = useRef<IGameRef>({
    game: undefined,
    scene: undefined,
  });
  return (
    <div className={cx("game-container")}>
      <GameContainer ref={gameRef} setCurrentScene={setCurrentScene} />
    </div>
  );
};

export default GameWrapper;
