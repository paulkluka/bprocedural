import { Axis, Material, Mesh, MeshBuilder, Space, TransformNode, Vector3, Vector4} from "@babylonjs/core";
import earcut from "earcut";

import CircularSeating from "@/babylon/components/circularRooms";
import CreateChair from "@/babylon/components/Chair02Proc";

export default class meshTools{

    static createArcPoints = function(numPoints = 8, lerpAmount: number) {

        const center = new Vector3(0, 0, 0);
        const offsetCenter = new Vector3(-1, 0, 1);
        
        const startAngle = Math.PI;
        const endAngle = Math.PI/2;

        const arcPoints = [];
        
        for (let i = 0; i < numPoints; i++) {

            const angle1 = startAngle + (endAngle - startAngle) * (i / (numPoints - 1));
            const angle2 = (startAngle + Math.PI /2 ) + (endAngle - startAngle + Math.PI) * (i / (numPoints - 1));
            
            const value1 = new Vector3(center.x + 1 * Math.cos(angle1), 0, center.z + 1 * Math.sin(angle1));
            const value2 = new Vector3(offsetCenter.x + 1 * Math.cos(angle2), 0, offsetCenter.z + 1 * Math.sin(angle2));

            const cubePosition = Vector3.Lerp(value1, value2, lerpAmount)

            arcPoints.push(new Vector3(cubePosition.x, cubePosition.y, cubePosition.z));
        }
        
        return arcPoints;
    };

    static arrayObjectWithRotation = (
        originalMesh: Mesh, 
        directionVector: Vector3, 
        iterations: number, 
        spacing: number, 
        rotationPerStep: number
        ): Mesh[] => {
        const arrayedMeshes: Mesh[] = [originalMesh];
        
        for (let i = 1; i < iterations; i++) {
            const clonedMesh: Mesh = originalMesh.clone(`${originalMesh.name}_rotated_${i}`);
            
            const normalizedDirection: Vector3 = directionVector.normalize();
            const offset: Vector3 = normalizedDirection.scale(i * spacing);
            clonedMesh.position = originalMesh.position.add(offset);
            
            clonedMesh.rotation.y = originalMesh.rotation.y + (i * rotationPerStep);
            
            arrayedMeshes.push(clonedMesh);
        }
        
        return arrayedMeshes;
    };

    static createArcGeo = function(mat1: Material, arcCurve: number, shape: number, scene: any){

        const arcPointsInner = meshTools.createArcPoints(arcCurve, shape);
        const zeroPoint = new Vector3(0,0,0);
        arcPointsInner.push(zeroPoint);

        const innerUV = [];
        innerUV[0] = new Vector4(0, 0, 1, 1);
        innerUV[1] = new Vector4(0, 0.5, 0, 0.5);
        innerUV[2] = new Vector4(0, 0, 1, 1);

        const inner = MeshBuilder.CreatePolygon("inner", {shape: arcPointsInner, faceUV:innerUV},scene,earcut);
        inner.material = mat1;

        const root = new TransformNode(`root`);
        inner.parent = root;
        const scaleValue = 3;
        root.scaling = new Vector3(scaleValue,1,scaleValue);
        root.position = new Vector3(scaleValue / 2, 2, -scaleValue / 2);

        return root;
    };

    static createFloorCorner = function(mat1:Material, mat2:Material, scene: any){

        const arcPointsInner = meshTools.createArcPoints(6, 1);
        const zeroPoint = new Vector3(0,0,0);
        arcPointsInner.push(zeroPoint);
        const arcPointsOuter = meshTools.createArcPoints(6, 1);
        const onePoint = new Vector3(-1,0,1);
        arcPointsOuter.push(onePoint);

        const innerUV = [];
        innerUV[0] = new Vector4(0, 0, 1, 1);
        innerUV[1] = new Vector4(0, 0.5, 0, 0.5);
        innerUV[2] = new Vector4(0, 0, 1, 1);

        const inner = MeshBuilder.CreatePolygon("inner", {shape: arcPointsInner, faceUV:innerUV},scene, earcut);
        const outer = MeshBuilder.CreatePolygon("Outer", {shape: arcPointsOuter, faceUV:innerUV},scene, earcut);
        outer.material = mat1;
        inner.material = mat2;

        const root = new TransformNode(`root`);
        inner.parent = root;
        outer.parent = root;
        root.position = new Vector3(.5, 0, -.5);

        return root;
    };

    static createCircularRibbon(innerRadius: number, outerRadius: number, segments: number, startAngle: number, endAngle: number, mat1: Material, scene: any) {

        const combinedPaths = [];
        const innerCirclePath = [];
        const outerCirclePath = [];
        
        const angleRange = endAngle - startAngle;
        const angleIncrement = angleRange / segments;
        
        for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (i * angleIncrement);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            
            innerCirclePath.push(new Vector3(innerRadius * cos, 0, innerRadius * sin));
            outerCirclePath.push(new Vector3(outerRadius * cos, 0, outerRadius * sin));
        }
        
        combinedPaths.push(innerCirclePath);
        combinedPaths.push(outerCirclePath);
        
        const ribbon = MeshBuilder.CreateRibbon("ribbon", {
            pathArray: combinedPaths,
            sideOrientation: Mesh.DOUBLESIDE
        }, scene);
        
        ribbon.material = mat1;
        
        return ribbon;
    }

    static cubeGrid = (locations: Vector3, gridSizeX: number, gridSizeZ: number, mat1: Material, mat2: Material, scene: any) => {
        
        for (let x = 0; x < gridSizeX; x++) {
            for (let z = 0; z < gridSizeZ; z++) {
                const posX = x + locations.x - gridSizeX / 2 + .5;
                const posZ = z + locations.z - gridSizeZ / 2 + .5;
                const posY = locations.y;

                if (x === 1 && z === 1) {
                    const corner1 = meshTools.createFloorCorner(mat1, mat2, scene);
                    corner1.position.x = posX + .5;
                    corner1.position.y = posY;
                    corner1.position.z = posZ + .5;
                    corner1.rotate(Axis.Y, -Math.PI / 2, Space.LOCAL);
                } else if (x === gridSizeX - 2 && z === 1) {
                    const corner2 = meshTools.createFloorCorner(mat1, mat2, scene);
                    corner2.position.x = posX + -.5;
                    corner2.position.y = posY;
                    corner2.position.z = posZ + .5;
                    corner2.rotate(Axis.Y, Math.PI , Space.LOCAL);
                } else if (x === 1 && z === gridSizeZ - 2) {
                    const corner3 = meshTools.createFloorCorner(mat1, mat2, scene);
                    corner3.position.x = posX + .5;
                    corner3.position.y = posY;
                    corner3.position.z = posZ + -.5;
                } else if (x === gridSizeX - 2 && z === gridSizeZ - 2) {
                    const corner4 = meshTools.createFloorCorner(mat1, mat2, scene);
                    corner4.position.x = posX + -.5;
                    corner4.position.y = posY;
                    corner4.position.z = posZ + -.5;
                    corner4.rotate(Axis.Y, Math.PI / 2, Space.LOCAL);
                } else if ((x === 0 || z === 0) || (x === gridSizeX -1 || z === gridSizeZ - 1)){
                    const cubeOuter = MeshBuilder.CreateGround("cube_", {height: 1, width: 1});
                    cubeOuter.position.x = posX;
                    cubeOuter.position.y = posY;
                    cubeOuter.position.z = posZ;
                    cubeOuter.material = mat1;
                } else {
                    const cube = MeshBuilder.CreateGround("cube_", {height: 1, width: 1}, scene);
                    cube.position.x = posX;
                    cube.position.y = posY;
                    cube.position.z = posZ;
                    cube.material = mat2;
                }
            }
        }
    }
    
    static officeGrid = function(officeLocations: Vector3, officeScales: Vector3, scene: any) {

        const circular = new CircularSeating;
        const chair = new CreateChair;

        const gridSizeX = 1;
        const gridSizeZ = 3;
        const cubeSize = 1;
        
        const outerRadius = 0;
        const innerRadius = 2;
        const tableNumber = 1;
        const seatNumber = 5;

        const gridScaleX = 4.5 *(officeScales.x / gridSizeX);
        const gridScaleZ = 4.5 *(officeScales.z /gridSizeZ);
        
        const baseSpacing = .2;
        
        const spacingX = baseSpacing * gridScaleX;
        const spacingZ = baseSpacing * gridScaleZ;
        
        const halfGridX = (gridSizeX - 1) * spacingX / 2;
        const halfGridZ = (gridSizeZ - 1) * spacingZ / 2;
        
        const centerX = officeLocations.x;
        const centerZ = officeLocations.z;

        for (let x = 0; x < gridSizeX; x++) {
            for (let z = 0; z < gridSizeZ; z++) {
                const posX = (x * spacingX) - halfGridX + centerX;
                const posZ = (z * spacingZ) - halfGridZ + centerZ;
                
                const cube = MeshBuilder.CreateGround("cube_",{width: cubeSize, height: cubeSize}, scene);
                
                cube.position.x = posX;
                cube.position.y = 0;
                cube.position.z = posZ;

                const centerPosition = new Vector3(posX, 0, posZ);

                circular.seatLocations(tableNumber, outerRadius, innerRadius, seatNumber, centerPosition).then(seatingArray => {
                    seatingArray.forEach((seat) => {
                        const chairRotation = seat.getWorldMatrix().getRotationMatrix();
                        const chairPosition = new Vector3((seat.position.x + centerPosition.x),(seat.position.y + centerPosition.y),(seat.position.z + centerPosition.z));
                        
                        chair.createChair(chairPosition, chairRotation);

                    });
                });
                circular.tablePositions(tableNumber, outerRadius, innerRadius, centerPosition);
            }
        }
    }

}
