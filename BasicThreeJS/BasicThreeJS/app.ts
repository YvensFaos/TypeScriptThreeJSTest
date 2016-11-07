///<reference path="./lib/three.d.ts"/>

class ThreeJSTest {
    renderer: THREE.WebGLRenderer;
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xFF0000, 1);
        document.getElementById('content').appendChild(this.renderer.domElement);
    }

    start() {
        this.renderer.clear();
    }
}

window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};