import {Mesh, MeshBuilder, InstancedMesh} from "@babylonjs/core";

export default class TwoCube {
    mainCount: number;
    mainRadius: number;
    subCount: number;
    subRadius: number;
    
    constructor( mainCount = 2, mainRadius = 5, subCount = 4, subRadius = 1) {
        this.mainCount = mainCount;
        this.mainRadius = mainRadius;
        this.subCount = subCount;
        this.subRadius = subRadius;
    }

    async seatPositions(): Promise<InstancedMesh[]> {

        const seats: InstancedMesh[] = [];
        const newCube = MeshBuilder.CreateBox("seatingCube", {
            size: 2
        });
        const TwoCube = MeshBuilder.CreateBox("seatingCube", {
            size: 2
        });
        const seat = newCube.createInstance(`cube1`);
        const otherseat = TwoCube.createInstance(`cube2`);

        seats.push(seat);
        seats.push(otherseat);
        
        return seats;

    }
}