import { Axis, MeshBuilder, Space, Vector3} from "@babylonjs/core";


export default class conferenceRooms{

    static createConferenceroom  = function(spawnPoint: Vector3, roomWidth: number, roomHeight: number) {  // Our built-in 'ground' shape. Params: name, options, scene

        const pillarHeight = 6;
        const floorboardHeight = .2;
        const pillarDiameter = .5;

        const roomCore = MeshBuilder.CreateGround("ground", {width: roomWidth, height: roomHeight});
        roomCore.position = spawnPoint;

        const roomPillarPos1 = new Vector3(spawnPoint.x + roomWidth/2, (pillarHeight/2),spawnPoint.z + roomHeight/2);
        const roomPillarPos2 = new Vector3(spawnPoint.x - roomWidth/2, (pillarHeight/2),spawnPoint.z - roomHeight/2);
        const roomPillarPos3 = new Vector3(spawnPoint.x + roomWidth/2, (pillarHeight/2),spawnPoint.z - roomHeight/2);
        const roomPillarPos4 = new Vector3(spawnPoint.x - roomWidth/2, (pillarHeight/2),spawnPoint.z + roomHeight/2);

        const wallPos1 = new Vector3(spawnPoint.x + roomWidth/2, pillarHeight/2,spawnPoint.z);
        const wallPos2 = new Vector3(spawnPoint.x - roomWidth/2, pillarHeight/2,spawnPoint.z);
        const wallPos3 = new Vector3(spawnPoint.x, pillarHeight/2,spawnPoint.z + roomHeight / 2);
        const wallPos4 = new Vector3(spawnPoint.x, pillarHeight/2,spawnPoint.z - roomHeight / 2);

        const floorboardPos1 = new Vector3(spawnPoint.x + roomWidth/2 - pillarDiameter/4, floorboardHeight/2, spawnPoint.z);
        const floorboardPos2 = new Vector3(spawnPoint.x - roomWidth/2 + pillarDiameter/4, floorboardHeight/2, spawnPoint.z);
        const floorboardPos3 = new Vector3(spawnPoint.x, floorboardHeight/2, spawnPoint.z - roomHeight/2 );
        const floorboardPos4 = new Vector3(spawnPoint.x, floorboardHeight/2 ,spawnPoint.z + roomHeight/2- pillarDiameter/4);

        const roomPillar1 = MeshBuilder.CreateCylinder('pillar1', {height: pillarHeight, diameter: pillarDiameter, arc: .25});
        const roomPillar2 = MeshBuilder.CreateCylinder('pillar2', {height: pillarHeight, diameter: pillarDiameter, arc: .25});
        const roomPillar3 = MeshBuilder.CreateCylinder('pillar3', {height: pillarHeight, diameter: pillarDiameter, arc: .25});
        const roomPillar4 = MeshBuilder.CreateCylinder('pillar4', {height: pillarHeight, diameter: pillarDiameter, arc: .25});

        const wall1 = MeshBuilder.CreateGround("ground", {width: pillarHeight, height: roomHeight});
        wall1.position = wallPos1;
        wall1.rotate(Axis.Z, Math.PI /2, Space.LOCAL);

        const wall2 = MeshBuilder.CreateGround("ground", {width: pillarHeight, height: roomHeight});
        wall2.position = wallPos2;
        wall2.rotate(Axis.Z, -Math.PI /2, Space.LOCAL);

        const wall3 = MeshBuilder.CreateGround("ground", {width: roomWidth, height: pillarHeight});
        wall3.position = wallPos3;
        wall3.rotate(Axis.X, -Math.PI /2, Space.LOCAL);

        const wall4 = MeshBuilder.CreateGround("ground", {width: roomWidth, height: pillarHeight});
        wall4.position = wallPos4;
        wall4.rotate(Axis.X, Math.PI /2, Space.LOCAL);

        roomPillar1.rotate(Axis.Y, Math.PI /2, Space.LOCAL);
        roomPillar2.rotate(Axis.Y, -Math.PI /2, Space.LOCAL);
        roomPillar3.rotate(Axis.Y, Math.PI, Space.LOCAL);        

        roomPillar1.position = roomPillarPos1;
        roomPillar2.position = roomPillarPos2;
        roomPillar3.position = roomPillarPos3;
        roomPillar4.position = roomPillarPos4;

        const floorboards1 = MeshBuilder.CreateBox('floorboard1', {height: 1, width: 1, depth: 1});
        floorboards1.scaling.x = pillarDiameter / 2;
        floorboards1.scaling.y = floorboardHeight;
        floorboards1.scaling.z = roomHeight;
        floorboards1.position = floorboardPos1;

        const floorboards2 = MeshBuilder.CreateBox('floorboard2', {height: 1, width: 1, depth: 1});
        floorboards2.scaling.x = pillarDiameter / 2;
        floorboards2.scaling.y = floorboardHeight;
        floorboards2.scaling.z = roomHeight;
        floorboards2.position = floorboardPos2;

        const floorboards3 = MeshBuilder.CreateBox('floorboard3', {height: 1, width: 1, depth: 1});
        floorboards3.scaling.x = roomWidth;
        floorboards3.scaling.y = floorboardHeight;
        floorboards3.scaling.z = pillarDiameter / 2;
        floorboards3.position = floorboardPos3;

        const floorboards4 = MeshBuilder.CreateBox('floorboard4', {height: 1, width: 1, depth: 1});
        floorboards4.scaling.x = roomWidth;
        floorboards4.scaling.y = floorboardHeight;
        floorboards4.scaling.z = pillarDiameter / 2;
        floorboards4.position = floorboardPos4;
    }
}