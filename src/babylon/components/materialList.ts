import { Color3, Scene, StandardMaterial, Texture } from "@babylonjs/core";


class MaterialLibrary{
    private scene: Scene; // Property to store scene
    
    constructor(scene: Scene) { // Constructor sets up the instance
        this.scene = scene; // Store scene for later use
    }
    export function leftMaterial(scene: any) {
        const leftMaterial = new StandardMaterial("centerMat", scene);
        leftMaterial.diffuseColor = new Color3(0, 1, 0);
        return leftMaterial;
    }
    export function rightMaterial(scene: any) {
        const rightMaterial = new StandardMaterial("centerMat", scene);
        rightMaterial.diffuseColor = new Color3(0, 1, 0);
        return rightMaterial;
    }    
    export function whiteMaterial(scene: any) {
        const whiteMaterial = new StandardMaterial("centerMat", scene);
        whiteMaterial.diffuseColor = new Color3(0, 1, 0);
        return whiteMaterial;
    }    
    export function redMaterial(scene: any) {
        const redMaterial = new StandardMaterial("centerMat", scene);
        redMaterial.diffuseColor = new Color3(0, 1, 0);
        return redMaterial;
    }    
    export function blueMaterial(scene: any) {
        const blueMaterial = new StandardMaterial("centerMat", scene);
        blueMaterial.diffuseColor = new Color3(0, 1, 0);
        return blueMaterial;
    }    
    export function yellowMaterial(scene: any) {
        const yellowMaterial = new StandardMaterial("centerMat", scene);
        yellowMaterial.diffuseColor = new Color3(0, 1, 0);
        return yellowMaterial;
    }    
    export function greenMaterial(scene: any) {
        const greenMaterial = new StandardMaterial("centerMat", scene);
        greenMaterial.diffuseColor = new Color3(0, 1, 0);
        return greenMaterial;
    }    
    export function stoneMat(scene: any) {
        const stoneMat = new StandardMaterial("centerMat", scene);
        stoneMat.diffuseTexture = new Texture("https://assets.babylonjs.com/textures/floor.png");
        return stoneMat;
    }    
    export function dirtMat(scene: any) {
        const dirtMat = new StandardMaterial("dirtMat", scene);
        dirtMat.diffuseTexture = new Texture("https://assets.babylonjs.com/textures/floor.png");
        return dirtMat;
    }  
    export function woodMat(scene: any) {
        const woodMat = new StandardMaterial("dirtMat", scene);
        woodMat.diffuseTexture = new Texture("https://assets.babylonjs.com/textures/floor.png");
        return woodMat;
    }  
}