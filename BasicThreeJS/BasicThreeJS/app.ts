///<reference path="./lib/three.d.ts"/>

class ThreeJSTest {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    sphere: THREE.Mesh;
    rotationSpeed: number;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });

        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xFFFFFF, 1);

        document.getElementById('content').appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.camera.position = new THREE.Vector3(0, 0, -20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var sphereGeometry = new THREE.SphereGeometry(5, 20, 20);

        var sphereMaterial = new THREE.MeshPhongMaterial(
            {
                map: THREE.ImageUtils.loadTexture("leo_sphere.jpg")
            }
        );

        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.sphere);
        this.scene.add(new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex()));
        this.renderer.render(this.scene, this.camera);

        this.rotationSpeed = 0.01;
    }

    rotateSphere() {
        this.sphere.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.rotationSpeed);
    }

    changeSpeed(value : number) {
        this.rotationSpeed = value / 100;
    }

    changeFOV(value: number) {
        this.camera.fov = value;
    }

    render() {
        requestAnimationFrame(() => this.render());
        this.rotateSphere();
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.render();
    }
}

let three: ThreeJSTest;

window.onload = () => {
    three = new ThreeJSTest();
    three.start();
};