import { AbstractMesh, Axis, InstancedMesh, Matrix, Mesh, MeshBuilder, Quaternion, Space, TransformNode, Vector3 } from "@babylonjs/core";

export default class Chair01Proc {
    customDiameter: number;
    private createdMeshes: Mesh[] = [];
    private mergedChairs: Mesh[] = [];
    
    constructor(customDiameter = 2) {
        this.customDiameter = customDiameter;
    }
    
    // Add cleanup method
    cleanupMeshes() {
        console.log("Chair01Proc: Starting cleanup");
        
        // Dispose merged chair meshes
        this.mergedChairs.forEach(mesh => {
            if (mesh && !mesh.isDisposed()) {
                mesh.dispose();
            }
        });
        this.mergedChairs = [];
        
        // Dispose temporary component meshes
        this.createdMeshes.forEach(mesh => {
            if (mesh && !mesh.isDisposed()) {
                mesh.dispose();
            }
        });
        this.createdMeshes = [];
        
        console.log("Chair01Proc: Cleanup complete");
    }

    async createChair(chairPosition: Vector3, chairRotation: Matrix): Promise<Mesh> {
        const armRestDistance = .5;

        const seat = MeshBuilder.CreateBox("Box", {width: armRestDistance*2, height: .1, depth: 1});
        const back = MeshBuilder.CreateBox("Box", {width: armRestDistance*2 + .1, height: 1, depth: .1});
        const armRestR = MeshBuilder.CreateBox("Box", {width: .1, height: 1, depth: 1});
        const armRestL = MeshBuilder.CreateBox("Box", {width: .1, height: 1, depth: 1});
        
        // Track component meshes for cleanup
        this.createdMeshes.push(seat, back, armRestR, armRestL);
    
        back.position.y = .5;
        back.position.z = .45;
        armRestR.position.x = armRestDistance;
        armRestL.position.x = -armRestDistance;
    
        const chairArray = [seat, back, armRestL, armRestR];
    
        const chairMesh = Mesh.MergeMeshes(chairArray);
        

        if (chairMesh === null) {
            console.log("Chair creation failed!");
            return chairArray[0];
        }
        
        // Track the merged chair for cleanup
        this.mergedChairs.push(chairMesh);
        
        chairMesh.position = chairPosition;
        chairMesh.rotationQuaternion = Quaternion.FromRotationMatrix(chairRotation);
        chairMesh.rotate(Axis.X, -Math.PI / 2, Space.LOCAL);
        chairMesh.rotate(Axis.Y, Math.PI, Space.LOCAL);

        return chairMesh;
    }
} 