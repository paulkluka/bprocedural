import { Axis, InstancedMesh, Matrix, Mesh, MeshBuilder, Quaternion, Space, Vector3 } from "@babylonjs/core";

export default class CreateChair {
    customDiameter: number;
    private chairTemplate: Mesh | null = null;
    private createdMeshes: Mesh[] = [];
    private chairInstances: InstancedMesh[] = [];
    
    constructor(customDiameter = 2) {
        this.customDiameter = customDiameter;
    }
    
    // Clean up method to dispose of created meshes
    cleanupMeshes() {
        console.log("Chair02Proc: Starting cleanup");
        
        // Dispose chair instances
        this.chairInstances.forEach(instance => {
            if (instance && !instance.isDisposed()) {
                instance.dispose();
            }
        });
        this.chairInstances = [];
        
        // Dispose chair template
        if (this.chairTemplate && !this.chairTemplate.isDisposed()) {
            this.chairTemplate.dispose();
            this.chairTemplate = null;
        }
        
        // Dispose any other temporary meshes
        this.createdMeshes.forEach(mesh => {
            if (mesh && !mesh.isDisposed()) {
                mesh.dispose();
            }
        });
        this.createdMeshes = [];
        
        console.log("Chair02Proc: Cleanup complete");
    }

    async createChair(chairPosition: Vector3, chairRotation: Matrix): Promise<InstancedMesh> {
        const armRestDistance = .5;

        const seat = MeshBuilder.CreateBox("Box", {width: armRestDistance*2, height: .1, depth: 1});
        const back = MeshBuilder.CreateBox("Box", {width: armRestDistance*2 + .1, height: 1, depth: .1});
        const armRestR = MeshBuilder.CreateBox("Box", {width: .1, height: 1, depth: 1});
        const armRestL = MeshBuilder.CreateBox("Box", {width: .1, height: 1, depth: 1});
        
        // Add to temporary meshes for later cleanup
        this.createdMeshes.push(seat, back, armRestR, armRestL);
    
        back.position.y = .5;
        back.position.z = .45;
        armRestR.position.x = armRestDistance;
        armRestL.position.x = -armRestDistance;
    
        const chairArray = [seat, back, armRestL, armRestR];
    
        const chairMesh = Mesh.MergeMeshes(chairArray);

        if (chairMesh === null) {
            console.log("Chair creation failed!");
            const errorMesh = seat.createInstance("errorMesh");
            this.chairInstances.push(errorMesh);
            return errorMesh;
        }
        
        // Track the chair template for later disposal
        this.chairTemplate = chairMesh;
    
        chairMesh.position = chairPosition;
        chairMesh.rotationQuaternion = Quaternion.FromRotationMatrix(chairRotation);
        chairMesh.rotate(Axis.X, -Math.PI / 2, Space.LOCAL);
        chairMesh.rotate(Axis.Y, Math.PI, Space.LOCAL);

        const chairInstance = chairMesh.createInstance('chair_instance');
        this.chairInstances.push(chairInstance);

        return chairInstance;
    }
} 