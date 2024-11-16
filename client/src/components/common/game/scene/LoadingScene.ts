import { GAME_SCENE_KEY } from "@/shared/constants/game";
import { Scene } from "phaser";
import { BaseEntity } from "@/components/common/game/entity/BaseEntity";

export class LoadingScene extends Scene {
  constructor() {
    super(GAME_SCENE_KEY.LOADING);
  }

  preload(): void {
    BaseEntity.preload(this);
  }

  create(): void {
    this.scene.start(GAME_SCENE_KEY.BASE);
    this.scene.remove(GAME_SCENE_KEY.LOADING);
  }
}
