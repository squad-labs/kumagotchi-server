import {
  GAME_BG_ASSETS,
  GAME_ENTITY_ASSETS,
  GAME_SCENE_KEY,
} from "@/shared/constants/game";
import { BaseEntity } from "@/components/common/game/entity/BaseEntity";
import { Scene, GameObjects } from "phaser";

export class BaseScene extends Scene {
  public entity!: BaseEntity;
  public background!: GameObjects.Image;

  constructor() {
    super(GAME_SCENE_KEY.BASE);
  }

  preload(): void {
    this.load.setPath(GAME_BG_ASSETS.BASE_DIR);
    this.load.image(GAME_BG_ASSETS.KEY, GAME_BG_ASSETS.FILE_NAME);
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
    this.background = this.add.image(0, 0, GAME_BG_ASSETS.KEY).setOrigin(0, 0);
    this.background.setDisplaySize(this.scale.width, this.scale.height);

    this.add.existing(this.background);
    this.entity = new BaseEntity(
      this,
      0,
      0,
      GAME_ENTITY_ASSETS.TEXTURE.KEY,
      GAME_ENTITY_ASSETS.INIT_FRAME
    );
    this.entity.create();
    this.entity.setPosition(window.innerWidth / 2, window.innerHeight - 290);
    this.entity.getBody().setVelocity(0);
  }

  update(): void {
    this.entity.update();
  }
}
