///<reference path="./lib/three.d.ts"/>
var ThreeJSTest = (function () {
    function ThreeJSTest() {
        // Create the renderer, in this case using WebGL, we want an alpha channel
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        // Set dimensions to 500x500 and background color to white
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xFFFFFF, 1);
        // Bind the renderer to the HTML, parenting it to our 'content' DIV
        document.getElementById('content').appendChild(this.renderer.domElement);
        // Create a Scene
        this.scene = new THREE.Scene();
        // And a camera.  Set Field of View, Near and Far clipping planes
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        // Position is -20 along the Z axis and look at the origin
        this.camera.position = new THREE.Vector3(0, 0, -20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        // Createa the geometry for a sphere with a radius of 5
        // This time we cranked up the number of sections horizontal and vertical to make a higher resolution globe
        var sphereGeometry = new THREE.SphereGeometry(5, 20, 20);
        // This time we create a Phong shader material and provide a texture.
        var sphereMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("leo_sphere.jpg")
        });
        // Now make a THREE.Mesh using the geometry and a shader
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // And put it at the origin
        this.sphere.position = new THREE.Vector3(0, 0, 0);
        // Add it to the scene and render the scene using the Scene and Camera objects
        this.scene.add(this.sphere);
        // We need some light so our texture will show, ad an ambient light to the scene
        this.scene.add(new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex()));
        this.renderer.render(this.scene, this.camera);
    }
    ThreeJSTest.prototype.rotateSphere = function () {
        this.sphere.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
    };
    ThreeJSTest.prototype.render = function () {
        var _this = this;
        // Each frame we want to render the scene again
        // Use typescript Arrow notation to retain the thisocity passing render to requestAnimationFrame
        // It's possible I invented the word thisocity.
        requestAnimationFrame(function () { return _this.render(); });
        this.rotateSphere();
        this.renderer.render(this.scene, this.camera);
    };
    ThreeJSTest.prototype.start = function () {
        // Not so pointless now!
        this.render();
    };
    return ThreeJSTest;
})();
window.onload = function () {
    var three = new ThreeJSTest();
    three.start();
};
//# sourceMappingURL=app.js.map