///<reference path="./lib/three.d.ts"/>
var ThreeJSTest = (function () {
    function ThreeJSTest() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xFFFFFF, 1);
        document.getElementById('content').appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.camera.position = new THREE.Vector3(0, 0, -20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        var sphereGeometry = new THREE.SphereGeometry(5, 20, 20);
        var sphereMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("leo_sphere.jpg")
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.sphere);
        this.ambientLight = new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex());
        this.scene.add(this.ambientLight);
        this.renderer.render(this.scene, this.camera);
        this.rotationSpeed = 0.01;
    }
    ThreeJSTest.prototype.rotateSphere = function () {
        this.sphere.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.rotationSpeed);
    };
    ThreeJSTest.prototype.changeSpeed = function (value) {
        this.rotationSpeed = value / 100;
    };
    ThreeJSTest.prototype.changeFOV = function (value) {
        this.camera.fov = value;
    };
    ThreeJSTest.prototype.changeColorIntensity = function (value) {
        value = value / 100;
        this.ambientLight.color = new THREE.Color(value * 1.0, value * 1.0, value * 1.0);
    };
    ThreeJSTest.prototype.render = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.render(); });
        this.rotateSphere();
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
};
//# sourceMappingURL=app.js.map