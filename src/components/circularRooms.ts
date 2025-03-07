import {AbstractMesh, Axis, InstancedMesh, MeshBuilder, Space, TransformNode, Vector3} from "@babylonjs/core";

export default class CircularSeating {
    /*
    mainCount: number;
    mainRadius: number;
    subCount: number;
    subRadius: number;
    roomPosition: Vector3;
    */

    constructor( /*mainCount = 2, mainRadius = 5, subCount = 4, subRadius = 1, roomPosition = new Vector3(0,0,0)*/) {
        /*
        this.mainCount = mainCount;
        this.mainRadius = mainRadius;
        this.subCount = subCount;
        this.subRadius = subRadius;
        this.roomPosition = roomPosition;
        */
    }

    
    async gridCreator(xCount: number, zCount: number): Promise<AbstractMesh[]> {
        const xSize = 60;
        const zSize = 60;

        const boxInstances: InstancedMesh[] = [];

        const xBoxWidth = xSize / xCount;
        const zBoxWidth = zSize / zCount;

        const point1 = new Vector3(-xSize/2, 0, -zSize/2);  // X- Z-

        const boxTemplate = MeshBuilder.CreateBox("boxTemplate", {size: 1});
        boxTemplate.isVisible = false;
        
        for (let x = 0; x < xCount; x++) {
            for (let z = 0; z < zCount; z++) {

                const boxInstance = boxTemplate.createInstance(`box_${x}_${z}`);
                
                const xPos = point1.x + (x + 0.5) * xBoxWidth;
                const zPos = point1.z + (z + 0.5) * zBoxWidth;
                boxInstance.position = new Vector3(xPos, 0, zPos);
                
                boxInstance.scaling = new Vector3(xBoxWidth, .1, zBoxWidth);
                
                boxInstances.push(boxInstance);
            }
        }
        return boxInstances;
    }

    async seatLocations(mCount: number, mRadius: number, sRadius: number, sCount: number, roomPosition: Vector3): Promise<TransformNode[]> {
        const outObjects: TransformNode[] = [];

        const root = new TransformNode(`roomTransform`);
        root.position = roomPosition;
        
        for (let i = 0; i < mCount; i++) {
            const mainAngle = (i / mCount) * Math.PI * 2;
            const mainX = mRadius * Math.cos(mainAngle);
            const mainZ = mRadius * Math.sin(mainAngle);
            
            for (let j = 0; j < sCount; j++) {
                const subAngle = (j / sCount) * Math.PI * 2;
                const subX = sRadius * Math.cos(subAngle);
                const subZ = sRadius * Math.sin(subAngle);
                
                const seat = new TransformNode(`seat_${i}_${j}`, root.getScene());
                seat.parent = root;
                
                const spherePosition = new Vector3(
                    mainX + subX,
                    0,
                    mainZ + subZ
                );
                seat.position = spherePosition;
    
                const subCenterPosition = new Vector3(mainX, 0, mainZ);
                const directionToSubCenter = subCenterPosition.subtract(spherePosition).normalize();
                
                const targetPoint = spherePosition.add(directionToSubCenter.scale(1));
                seat.lookAt(targetPoint);
                
                seat.rotate(Axis.X, Math.PI / 2, Space.LOCAL);
    
                outObjects.push(seat);
            }
        }
    
        return outObjects;
    }

    async tablePositions(mCount: number, mRadius: number, sRadius: number,  roomPosition: Vector3): Promise<InstancedMesh[]>{
        const outObjects: InstancedMesh[] = [];

        const table = MeshBuilder.CreateCylinder("table", {
            height: 0.05, 
            diameter: 0.8
        });
        //table.material = subCenterMaterial;
        table.isVisible = false;

        for (let i = 0; i < mCount; i++) {
            const mainAngle = (i / mCount) * Math.PI * 2;
            const mainX = mRadius * Math.cos(mainAngle);
            const mainZ = mRadius * Math.sin(mainAngle);
            
            const centerTable = table.createInstance(`table_${i}`);
            const tablePosition = new Vector3(
                mainX,
                0,
                mainZ
            );
            centerTable.position = tablePosition;
            centerTable.scaling.x = sRadius * 2;
            centerTable.scaling.z = sRadius * 2;
            outObjects.push(centerTable);

        }

        const root = new TransformNode(`roomTransform`);
        outObjects.forEach(mesh =>{
            mesh.parent = root
        })
        root.position = roomPosition;

        return outObjects;
    }
}