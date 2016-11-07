///<reference path="./lib/three.d.ts"/>
var ThreeJSTest = (function () {
    function ThreeJSTest() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0xFF0000, 1);
        document.getElementById('content').appendChild(this.renderer.domElement);
    }
    ThreeJSTest.prototype.start = function () {
        this.renderer.clear();
    };
    return ThreeJSTest;
})();
window.onload = function () {
    var three = new ThreeJSTest();
    three.start();
};
//# sourceMappingURL=app.js.map