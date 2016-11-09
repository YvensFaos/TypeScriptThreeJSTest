///<reference path="./lib/three.d.ts"/>

class ThreeJSTest {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    square: THREE.Mesh;
    ambientLight: THREE.AmbientLight;

    rotationSpeed: number;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });

        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xADFA02, 1);

        document.getElementById('content').appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.camera.position = new THREE.Vector3(0, 0, -10);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var squareGeometry = new THREE.Geometry();
        squareGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));

        squareGeometry.faces.push(new THREE.Face3(0, 1, 2, new THREE.Vector3(0, 0, 1)));
        squareGeometry.faces.push(new THREE.Face3(0, 2, 3, new THREE.Vector3(0, 0, -1)));

        squareGeometry.faceVertexUvs[0] = [];

        var bricks = [
            new THREE.Vector2(0, 1),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(0, 0)
        ];

        squareGeometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[2]];
        squareGeometry.faceVertexUvs[0][1] = [bricks[0], bricks[2], bricks[3]];

        var leoTexture = THREE.ImageUtils.loadTexture("leo_sphere.jpg");
        leoTexture.wrapS = THREE.RepeatWrapping; 
        leoTexture.wrapT = THREE.RepeatWrapping; 
        leoTexture.repeat.x = 1; 
        leoTexture.repeat.y = 1; 

        var squareMaterial = new THREE.MeshBasicMaterial({
               color:0xFFFFAA, 
               map: leoTexture,
               //side: THREE.DoubleSide
            }
        );
        this.square = new THREE.Mesh(squareGeometry, squareMaterial);
        this.square.position = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.square);
        this.ambientLight = new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex());
        this.scene.add(this.ambientLight);
        this.renderer.render(this.scene, this.camera);
    }

    changeFOV(value: number) {
        this.camera.fov = value;
    }

    changeColorIntensity(value: number) {
        value = value / 100;
        this.ambientLight.color = new THREE.Color(value * 1.0, value * 1.0, value * 1.0);
    }

    render() {
        requestAnimationFrame(() => this.render());
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
    three.changeFOV(5);
};