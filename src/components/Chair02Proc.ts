import { AbstractMesh, Axis, InstancedMesh, Matrix, Mesh, MeshBuilder, Quaternion, Space, TransformNode, Vector3 } from "@babylonjs/core";

export default class BaseModelClass {
    customDiameter: number;
    constructor( customDiameter = 2) {
        this.customDiameter = customDiameter;
    }

    async createChair(chairPosition: Vector3, chairRotation: Matrix): Promise<Mesh> {
        const armRestDistance = .5;

        const seat = MeshBuilder.CreateBox("Box", {width: armRestDistance*2, height: .1, depth: 1});
        const back = MeshBuilder.CreateBox("Box", {width: armRestDistance*2 + .1, height: 1, depth: .1});
        const armRestR = MeshBuilder.CreateBox("Box", {width: .1, height: 1, depth: 1});
        const armRestL = MeshBuilder.CreateBox("Box", {width: .1, height: 1, depth: 1});
    
        back.position.y = .5;
        back.position.z = .45;
        armRestR.position.x = armRestDistance;
        armRestL.position.x = -armRestDistance;
    
        const chairArray = [seat, back, armRestL, armRestR];
    
        const chairMesh = Mesh.MergeMeshes(chairArray)


        if (chairMesh === null) {
            console.log("it has gone wrong!")
            return chairArray[0];
        }
        chairMesh.position = chairPosition;
        chairMesh.rotationQuaternion = Quaternion.FromRotationMatrix(chairRotation);
        chairMesh.rotate(Axis.X, -Math.PI / 2, Space.LOCAL);
        chairMesh.rotate(Axis.Y, Math.PI, Space.LOCAL);

        return chairMesh;
    }
}


