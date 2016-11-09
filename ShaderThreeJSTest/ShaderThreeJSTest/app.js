///<reference path="./lib/three.d.ts"/>
var ThreeJSTest = (function () {
    function ThreeJSTest() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xADFA02, 1);
        document.getElementById('content').appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.camera.position = new THREE.Vector3(0, 0, -10);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        var squareGeometry = new THREE.Geometry();
        squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
        squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
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
        this.textureName = "leo_sphere.jpg";
        this.texture = THREE.ImageUtils.loadTexture(this.textureName);
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.x = 1;
        this.texture.repeat.y = 1;
        this.textureMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFAA, map: this.texture });
        this.square = new THREE.Mesh(squareGeometry, this.textureMaterial);
        this.square.position = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.square);
        this.ambientLight = new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex());
        this.scene.add(this.ambientLight);
        this.renderer.render(this.scene, this.camera);
    }
    ThreeJSTest.prototype.changeFOV = function (value) {
        this.camera.fov = value;
    };
    ThreeJSTest.prototype.changeColorIntensity = function (value) {
        value = value / 100;
        this.ambientLight.color = new THREE.Color(value * 1.0, value * 1.0, value * 1.0);
    };
    ThreeJSTest.prototype.changeTexture = function (textureName) {
        this.textureName = textureName;
        this.texture.dispose();
        this.texture = THREE.ImageUtils.loadTexture(this.textureName);
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.x = 1;
        this.texture.repeat.y = 1;
        this.textureMaterial.map = this.texture;
        this.square.material = this.textureMaterial;
        this.square.material.needsUpdate = true;
    };
    ThreeJSTest.prototype.render = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.render(); });
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    };
    ThreeJSTest.prototype.start = function () {
        this.render();
    };
    return ThreeJSTest;
})();
var three;
window.onload = function () {
    three = new ThreeJSTest();
    three.start();
    three.changeFOV(12);
};
//# sourceMappingURL=app.js.map