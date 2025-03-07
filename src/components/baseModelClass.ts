import { Mesh, MeshBuilder } from "@babylonjs/core";

export default class BaseModelClass {
    customDiameter: number;
    constructor( customDiameter = 2) {
        this.customDiameter = customDiameter;
    }

    async createCube(): Promise<Mesh> {
        const newCube = MeshBuilder.CreateBox("seatingCube", {
            size: 2
        });
        
        return newCube;
    }
}