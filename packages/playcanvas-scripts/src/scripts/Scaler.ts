import { Vec3, Script } from "playcanvas";

class Scaler extends Script {
  scaleSpeed = new Vec3(0.1, 0.1, 0.1);

  minScale = 0.5;
  maxScale = 2.0;
  direction = 1;

  update(dt: number) {
    const currentScale = this.entity.getLocalScale();
    if (currentScale.x >= this.maxScale) {
      this.direction = -1;
    } else if (currentScale.x <= this.minScale) {
      this.direction = 1;
    }

    const scaleDelta = new Vec3(this.scaleSpeed.x * dt * this.direction, this.scaleSpeed.y * dt * this.direction, this.scaleSpeed.z * dt * this.direction);

    this.entity.setLocalScale(currentScale.add(scaleDelta));
  }
}

export { Scaler };
