import { useCallback, useState } from 'react';
import { useApp } from '@playcanvas/react/hooks';
import { CameraComponent } from 'playcanvas';
import { Camera } from '@playcanvas/react/components';
import type { Entity } from '@playcanvas/react';
import { XRTYPE_AR, XRTYPE_VR, XRSPACE_LOCAL, XRSPACE_LOCALFLOOR } from 'playcanvas';
export const useXrPageContext = () => {

    const [isInXR, setIsInXR] = useState(false);
    const [isInAR, setIsInAR] = useState(false);
    const app = useApp();

    // メインカメラを探す関数
    const findMainCamera = () => {
        const cameraEntity = app.root.findByName('camera');
        if (!cameraEntity) {
            throw new Error('Camera entity not found');
        }
        // @ts-expect-error
        const camera = cameraEntity.camera as CameraComponent;
        if (!camera) {
            throw new Error('Camera component not found');
        }
        return camera;
    }


    // 空の関数を作成して返す
    return {
        isInXR,
        isInAR,
        startXR: () => {
            const camera = findMainCamera();
            if (!app.xr) return;
            alert('startAR');
            app.xr.start(camera, XRTYPE_VR, XRSPACE_LOCALFLOOR, {
                callback: function (err) {
                    if (err)
                        alert("WebXR Immersive AR failed to start: " + err.message);
                },
            });
            setIsInAR(true);
        },
        endXR: () => {
            if (!app.xr) return;
            app.xr.end();
            setIsInXR(false);
        },
        startAR: () => {
            const camera = findMainCamera();
            if (!app.xr) return;
            alert('startAR');
            app.xr.start(camera, XRTYPE_AR, XRSPACE_LOCAL, {
                callback: function (err) {
                    if (err)
                        alert("WebXR Immersive AR failed to start: " + err.message);
                },
            });
            setIsInAR(true);
        },
        endAR: () => {
            if (!app.xr) return;
            app.xr.end();
            setIsInAR(false);
        }
    }
}