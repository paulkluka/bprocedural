import {Axis, InstancedMesh, Mesh, MeshBuilder, Scene, Space, TransformNode, Vector3} from "@babylonjs/core";

export default class CircularSeating {
    private boxTemplate: Mesh | null = null;
    private tableTemplate: Mesh | null = null;
    private currentInstances: InstancedMesh[] = [];
    private currentSeats: TransformNode[] = [];
    private currentTables: InstancedMesh[] = [];
    private roomTransformNodes: TransformNode[] = [];

    // Method to clean up all created meshes
    cleanupScene() {
        console.log("CircularSeating: Starting cleanup");
        
        // Dispose all instance meshes
        this.currentInstances.forEach(instance => {
            if (instance && !instance.isDisposed()) {
                instance.dispose();
            }
        });
        this.currentInstances = [];

        // Dispose all seat transform nodes
        this.currentSeats.forEach(seat => {
            if (seat && !seat.isDisposed()) {
                seat.dispose();
            }
        });
        this.currentSeats = [];

        // Dispose all table instances
        this.currentTables.forEach(table => {
            if (table && !table.isDisposed()) {
                table.dispose();
            }
        });
        this.currentTables = [];
        
        // Dispose all room transform nodes
        this.roomTransformNodes.forEach(node => {
            if (node && !node.isDisposed()) {
                node.dispose();
            }
        });
        this.roomTransformNodes = [];

        // Finally dispose the templates if they exist
        if (this.boxTemplate && !this.boxTemplate.isDisposed()) {
            this.boxTemplate.dispose();
            this.boxTemplate = null;
        }

        if (this.tableTemplate && !this.tableTemplate.isDisposed()) {
            this.tableTemplate.dispose();
            this.tableTemplate = null;
        }
        
        console.log("CircularSeating: Cleanup complete");
    }

    async gridCreator(xCount: number, zCount: number): Promise<InstancedMesh[]> {
        // Clean up previous meshes before creating new ones
        this.cleanupScene();
        
        console.log(`Creating grid: ${xCount}x${zCount}`);

        const xSize = 60;
        const zSize = 60;

        const boxInstances: InstancedMesh[] = [];

        const xBoxWidth = xSize / xCount;
        const zBoxWidth = zSize / zCount;

        const point1 = new Vector3(-xSize/2, 0, -zSize/2);  // X- Z-

        this.boxTemplate = MeshBuilder.CreateBox("boxTemplate", {size: 1});
        this.boxTemplate.isVisible = false;
        
        for (let x = 0; x < xCount; x++) {
            for (let z = 0; z < zCount; z++) {

                const boxInstance = this.boxTemplate.createInstance(`box_${x}_${z}`);
                
                const xPos = point1.x + (x + 0.5) * xBoxWidth;
                const zPos = point1.z + (z + 0.5) * zBoxWidth;
                boxInstance.position = new Vector3(xPos, 0, zPos);
                
                boxInstance.scaling = new Vector3(xBoxWidth, .1, zBoxWidth);
                
                boxInstances.push(boxInstance);
                this.currentInstances.push(boxInstance);
            }
        }
        return boxInstances;
    }

    async seatLocations(mCount: number, mRadius: number, sRadius: number, sCount: number, roomPosition: Vector3): Promise<TransformNode[]> {
        // Clear previous seats
        this.currentSeats.forEach(seat => {
            if (seat && !seat.isDisposed()) {
                seat.dispose();
            }
        });
        this.currentSeats = [];

        const outObjects: TransformNode[] = [];

        const root = new TransformNode(`roomTransform`);
        root.position = roomPosition;
        this.roomTransformNodes.push(root);
        
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
                this.currentSeats.push(seat);
            }
        }
    
        return outObjects;
    }

    async tablePositions(mCount: number, mRadius: number, sRadius: number, roomPosition: Vector3): Promise<InstancedMesh[]>{
        // Clear previous tables
        this.currentTables.forEach(table => {
            if (table && !table.isDisposed()) {
                table.dispose();
            }
        });
        this.currentTables = [];

        const outObjects: InstancedMesh[] = [];

        this.tableTemplate = MeshBuilder.CreateCylinder("table", {
            height: 0.05, 
            diameter: 0.8
        });
        this.tableTemplate.isVisible = false;

        for (let i = 0; i < mCount; i++) {
            const mainAngle = (i / mCount) * Math.PI * 2;
            const mainX = mRadius * Math.cos(mainAngle);
            const mainZ = mRadius * Math.sin(mainAngle);
            
            const centerTable = this.tableTemplate.createInstance(`table_${i}`);
            const tablePosition = new Vector3(
                mainX,
                0,
                mainZ
            );
            centerTable.position = tablePosition;
            centerTable.scaling.x = sRadius * 2;
            centerTable.scaling.z = sRadius * 2;
            outObjects.push(centerTable);
            this.currentTables.push(centerTable);
        }

        const root = new TransformNode(`roomTransform`);
        this.roomTransformNodes.push(root);
        
        outObjects.forEach(mesh => {
            mesh.parent = root;
        });
        root.position = roomPosition;

        return outObjects;
    }
} 