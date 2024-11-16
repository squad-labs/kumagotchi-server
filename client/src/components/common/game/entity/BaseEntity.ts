import { tweet } from "@/shared/api/Chat";
import { GAME_ENTITY_ASSETS } from "@/shared/constants/game";
import { Physics, Scene } from "phaser";

export class BaseEntity extends Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    initFrame: string
  ) {
    super(scene, x, y, texture, initFrame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody().setCollideWorldBounds(true);
  }

  static preload(scene: Scene): void {
    scene.load.setPath(GAME_ENTITY_ASSETS.BASE_DIR);
    scene.load.atlas(
      GAME_ENTITY_ASSETS.TEXTURE.KEY,
      GAME_ENTITY_ASSETS.TEXTURE.FILE_NAME,
      GAME_ENTITY_ASSETS.ATLAS
    );
    scene.load.animation(
      GAME_ENTITY_ASSETS.ANIMS.KEY,
      GAME_ENTITY_ASSETS.ANIMS.FILE_NAME
    );
  }

  create() {
    this.setInteractive();
    this.on("pointerdown", async () => {
      window.status = "mission";
      Math.random() === 0.4 && tweet();
      setTimeout(() => {
        window.status = "";
      }, 1000);
    });
  }

  public getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  update() {
    if (window.status === "hello") {
      this.anims.play(GAME_ENTITY_ASSETS.ANIMS.TYPE.hello, true);
    } else if (window.status === "mission") {
      this.anims.play(GAME_ENTITY_ASSETS.ANIMS.TYPE.mission, true);
    } else {
      this.anims.play(GAME_ENTITY_ASSETS.ANIMS.TYPE.hello, false);
      this.anims.play(GAME_ENTITY_ASSETS.ANIMS.TYPE.mission, false);
    }
  }
}
