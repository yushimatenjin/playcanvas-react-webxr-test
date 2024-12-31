import { Vec3, Script } from "playcanvas";


class Rotator extends Script {

    speed = new Vec3(0, 1, 0);
    
    update(dt: number) {
        this.entity.rotate(this.speed);
    }
}

export { Rotator };