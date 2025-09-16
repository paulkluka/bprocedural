import { ArcRotateCamera, Axis, Color3, Engine, HemisphericLight, InstancedMesh, Material, Mesh, MeshBuilder, PointLight, Scene, Space, StandardMaterial, Texture, TransformNode, Vector3, Vector4 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import meshTools from "../components/meshConstruction";
import conferenceRooms from "../components/conferenceRoom";

export class ProceduralScene{

    scene: Scene;
    engine: Engine;

    constructor(private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() =>{
            this.scene.render();
        })
    }

    CreateScene(): Scene{
    const scene = new Scene(this.engine);

    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 20, Vector3.Zero(), scene);
    camera.attachControl();
    camera.upperBetaLimit = Math.PI / 2;
    
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    
    const pointLight = new PointLight("pointLight", new Vector3(0, 5, 0), scene);
    pointLight.intensity = 0.3;

    const centerMaterial = new StandardMaterial("centerMat", scene);
    centerMaterial.diffuseColor = new Color3(0, 1, 0);
    
    const leftMaterial = new StandardMaterial("leftMat", scene);
    leftMaterial.diffuseColor = new Color3(1, 1, 0);
    
    const rightMaterial = new StandardMaterial("rightMat", scene);
    rightMaterial.diffuseColor = new Color3(1, 0.45, 1);

    const whiteMaterial = new StandardMaterial("whteMat", scene);
    whiteMaterial.diffuseColor = new Color3(1, 0.98, 0.93);

    const redMaterial = new StandardMaterial("whteMat", scene);
    redMaterial.diffuseColor = new Color3(1, 0.47, 0.47);

    const blueMaterial = new StandardMaterial("whteMat", scene);
    blueMaterial.diffuseColor = new Color3(0.2, 0.84, 1);

    const yellowMaterial = new StandardMaterial("whteMat", scene);
    yellowMaterial.diffuseColor = new Color3(1, 0.99, 0.55);

    const greenMaterial = new StandardMaterial("whteMat", scene);
    greenMaterial.diffuseColor = new Color3(0.22, 0.39, 0.22);

    const stoneMat = new StandardMaterial("stoneMat");
    stoneMat.diffuseTexture = new Texture("https://assets.babylonjs.com/textures/floor.png");
    const dirtMat = new StandardMaterial("dirtMat");
    dirtMat.diffuseTexture = new Texture("https://assets.babylonjs.com/textures/dirt.jpg");
    const woodMat = new StandardMaterial("dirtMat");
    woodMat.diffuseTexture = new Texture("https://cdn.glitch.global/fab8eef8-e2ba-4158-9c30-8b45716885cc/plankFix.webp?v=1746123896069");

    function initializeScene() {
        //min value 4 increments of 2
        //max value 20
        const lobbyZ = 10;
        //min value 4 increments of 2
        //max value 20
        const lobbyX = 10;
        //min value 4
        const northSouthScale = 15;
        const eastWestScale = 25;
        //currently larger than 3 negates offices
        //this could be a ToDo
        const walkWidth = 3;
        //min 4, is awkward if less than corresponding conference width/depth
        const northSouthLobbyWidth = 15;
        const northSouthLobbyDepth = 10;
        const eastWestLobbyWidth = 15;
        const eastWestLobbyDepth = 10;
        //Should not be smaller than meeting width depth
        const conferenceWidth = 12;
        const conferenceDepth = 19;
        //min 10 should not be larger than conference
        const meetingWidth = 10;
        //min 12 should not be larger than conference
        const meetingDepth = 12;
        //min 0 max 1 - .5 is diagonal line
        const cornershape = 1;
        const conferenceAmount = 4;

        createOfficeStructure(northSouthScale,
                                eastWestScale,
                                lobbyZ,
                                lobbyX,
                                northSouthLobbyDepth,
                                northSouthLobbyWidth,
                                eastWestLobbyDepth,
                                eastWestLobbyWidth,
                                walkWidth,
                                conferenceDepth,
                                conferenceWidth,
                                meetingDepth,
                                meetingWidth,
                                cornershape,
                                )
    }

    const createOfficeStructure = function(
                                        northSouthScale:number,
                                        eastWestScale:number,
                                        lobbyZ:number,
                                        lobbyX: number,
                                        northSouthLobbyDepth:number,
                                        northSouthLobbyWidth:number,
                                        eastWestLobbyDepth:number,
                                        eastWestLobbyWidth:number,
                                        walkWidth:number,
                                        conferenceDepth:number,
                                        conferenceWidth:number,
                                        meetingDepth:number,
                                        meetingWidth:number,
                                        cornerShape:number
                                        ) {

        const officeCenter = new Vector3(0, 0, 0);

        const sideBoxWidth = northSouthScale - lobbyX / 2;
        const sideBoxHeight = eastWestScale - lobbyZ / 2;
        const officeScaling = new Vector3(sideBoxWidth, 1, sideBoxHeight);

        const northWalkCenter = new Vector3(0,  0, eastWestScale - (sideBoxHeight/2));
        const eastWalkCenter = new Vector3(northSouthScale - (sideBoxWidth/2), 0, 0);
        const southWalkCenter = new Vector3(0, 0, -eastWestScale + (sideBoxHeight/2));        
        const westWalkCenter = new Vector3(-northSouthScale + (sideBoxWidth/2), 0, 0);
        const southWestCenter = new Vector3(westWalkCenter.x, 0, southWalkCenter.z);
        const southEastCenter = new Vector3(eastWalkCenter.x, 0, southWalkCenter.z);
        const northEastCenter = new Vector3(eastWalkCenter.x, 0, northWalkCenter.z);
        const northWestCenter = new Vector3(westWalkCenter.x, 0, northWalkCenter.z);

        const southGridPoint = new Vector3(southWalkCenter.x, 0, southWalkCenter.z - (sideBoxHeight / 2));
        const northGridPoint = new Vector3(northWalkCenter.x, 0, northWalkCenter.z + (sideBoxHeight / 2));
        const eastGridPoint = new Vector3(eastWalkCenter.x + (sideBoxWidth /2), 0, eastWalkCenter.z);
        const westGridPoint = new Vector3(westWalkCenter.x - (sideBoxWidth /2), 0, westWalkCenter.z);

        const northLobbyCenter = new Vector3(southWalkCenter.x, 0, southWalkCenter.z - (sideBoxHeight / 2) - (northSouthLobbyDepth / 2));
        const southLobbyCenter = new Vector3(northWalkCenter.x, 0, northWalkCenter.z + (sideBoxHeight / 2) + (northSouthLobbyDepth / 2));
        
        // Build Core Grid
        meshTools.cubeGrid(officeCenter, lobbyX, lobbyZ, whiteMaterial, woodMat, scene);
        meshTools.cubeGrid(westWalkCenter, sideBoxWidth, lobbyZ, whiteMaterial, woodMat, scene);
        meshTools.cubeGrid(southWalkCenter, lobbyX, sideBoxHeight, whiteMaterial, woodMat, scene);
        meshTools.cubeGrid(northWalkCenter, lobbyX, sideBoxHeight, whiteMaterial, woodMat, scene);
        meshTools.cubeGrid(eastWalkCenter, sideBoxWidth, lobbyZ, whiteMaterial, woodMat, scene);
        
        meshTools.cubeGrid(southEastCenter, sideBoxWidth, sideBoxHeight, whiteMaterial, redMaterial, scene);
        meshTools.cubeGrid(southWestCenter, sideBoxWidth, sideBoxHeight, whiteMaterial, greenMaterial, scene);
        meshTools.cubeGrid(northWestCenter, sideBoxWidth, sideBoxHeight, whiteMaterial, blueMaterial, scene);
        meshTools.cubeGrid(northEastCenter, sideBoxWidth, sideBoxHeight, whiteMaterial, yellowMaterial, scene);
        
        meshTools.officeGrid(southEastCenter, officeScaling, scene)
        meshTools.officeGrid(southWestCenter, officeScaling, scene)
        meshTools.officeGrid(northWestCenter, officeScaling, scene)
        meshTools.officeGrid(northEastCenter, officeScaling, scene)
        
        //Build Vert Office spaces
        const northLocator = new TransformNode("northLocator");
        northLocator.scaling.x = northSouthLobbyWidth;
        northLocator.scaling.z = northSouthLobbyDepth;
        northLocator.position = northLobbyCenter;

        const southLocator = new TransformNode("southLocator");
        southLocator.scaling.x = northSouthLobbyWidth;
        southLocator.scaling.z = northSouthLobbyDepth;
        southLocator.position = southLobbyCenter;
        
        const northLobbyMesh = MeshBuilder.CreateGround("NorthLobbyMesh", {width:1, height: 1}, scene);
        northLobbyMesh.scaling.x = northSouthLobbyWidth;
        northLobbyMesh.scaling.z = northSouthLobbyDepth;
        northLobbyMesh.position = northLobbyCenter;
        northLobbyMesh.material = redMaterial;

        const southLobbyMesh = MeshBuilder.CreateGround("SouthLobbyMesh", {width:1, height: 1}, scene);
        southLobbyMesh.scaling = southLocator.scaling;
        southLobbyMesh.position = southLocator.position;
        southLobbyMesh.material = greenMaterial;

        const northWalkBack = MeshBuilder.CreateGround("northWalkback", {width: 1, height: 1}, scene);
        northWalkBack.scaling.x = northSouthScale * 2;
        northWalkBack.scaling.z = walkWidth;
        northWalkBack.position = new Vector3(0,0,northGridPoint.z + northSouthLobbyDepth + (walkWidth/2));
        northWalkBack.material = woodMat; 

        const southWalkBack = MeshBuilder.CreateGround("northWalkback", {width: 1, height: 1}, scene);
        southWalkBack.scaling.x = northSouthScale * 2;
        southWalkBack.scaling.z = walkWidth;
        southWalkBack.position = new Vector3(0,0,southGridPoint.z - northSouthLobbyDepth - (walkWidth/2));
        southWalkBack.material = woodMat; 

        //North South Offices and Walkways

        const southWalk1 = MeshBuilder.CreateGround("southWalk1", {width: 1, height: 1}, scene);
        southWalk1.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        southWalk1.scaling.z = walkWidth
        southWalk1.position = new Vector3(((northSouthLobbyWidth / 2) + eastGridPoint.x) / 2, 0, southGridPoint.z - (walkWidth /2));
        southWalk1.material = woodMat;

        const southWalk2 = MeshBuilder.CreateGround("southWalk2", {width: 1, height: 1}, scene);
        southWalk2.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        southWalk2.scaling.z = walkWidth
        southWalk2.position = new Vector3((-(northSouthLobbyWidth / 2) + westGridPoint.x) / 2, 0, southGridPoint.z - (walkWidth /2));
        southWalk2.material = woodMat;

        const southOffices1 = MeshBuilder.CreateGround("southOffices1", {width: 1, height: 1}, scene);
        southOffices1.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        southOffices1.scaling.z = northSouthLobbyDepth - walkWidth;
        southOffices1.position = new Vector3(((northSouthLobbyWidth / 2) + eastGridPoint.x) / 2, 0, southGridPoint.z - walkWidth - ((northSouthLobbyDepth - walkWidth) / 2));
        southOffices1.material = centerMaterial;

        const southOffices2 = MeshBuilder.CreateGround("southOffices2", {width: 1, height: 1}, scene);
        southOffices2.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        southOffices2.scaling.z = northSouthLobbyDepth - walkWidth;
        southOffices2.position = new Vector3((-(northSouthLobbyWidth / 2) + westGridPoint.x) / 2, 0, southGridPoint.z - walkWidth - ((northSouthLobbyDepth - walkWidth) / 2));
        southOffices2.material = centerMaterial;

        const northWalk1 = MeshBuilder.CreateGround("northWalk1", {width: 1, height: 1}, scene);
        northWalk1.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        northWalk1.scaling.z = walkWidth
        northWalk1.position = new Vector3(((northSouthLobbyWidth / 2) + eastGridPoint.x) / 2, 0, northGridPoint.z + (walkWidth /2));
        northWalk1.material = woodMat;

        const northWalk2 = MeshBuilder.CreateGround("northWalk2", {width: 1, height: 1}, scene);
        northWalk2.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        northWalk2.scaling.z = walkWidth;
        northWalk2.position = new Vector3((-(northSouthLobbyWidth / 2) + westGridPoint.x) / 2, 0, northGridPoint.z + (walkWidth /2));
        northWalk2.material = woodMat;

        const northOffices1 = MeshBuilder.CreateGround("northOffices1", {width: 1, height: 1}, scene);
        northOffices1.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        northOffices1.scaling.z = northSouthLobbyDepth - walkWidth;
        northOffices1.position = new Vector3(((northSouthLobbyWidth / 2) + eastGridPoint.x) / 2, 0, northGridPoint.z + walkWidth + ((northSouthLobbyDepth - walkWidth) / 2));
        northOffices1.material = centerMaterial;

        const northOffices2 = MeshBuilder.CreateGround("northOffices2", {width: 1, height: 1}, scene);
        northOffices2.scaling.x = (northSouthScale - (northSouthLobbyWidth / 2));
        northOffices2.scaling.z = northSouthLobbyDepth - walkWidth;
        northOffices2.position = new Vector3((-(northSouthLobbyWidth / 2) + westGridPoint.x) / 2, 0, northGridPoint.z + walkWidth + ((northSouthLobbyDepth - walkWidth) / 2));
        northOffices2.material = centerMaterial;
        
        //East West Offices and Walkways

        const westLobby = MeshBuilder.CreateGround("westLobby", {width: 1, height: 1}, scene);
        westLobby.scaling.x = eastWestLobbyDepth;
        westLobby.scaling.z = eastWestLobbyWidth;
        westLobby.position = new Vector3(westGridPoint.x - (eastWestLobbyDepth /2), 0, westGridPoint.z);
        westLobby.material = blueMaterial;

        const eastLobby = MeshBuilder.CreateGround("eastLobby", {width: 1, height: 1}, scene);
        eastLobby.scaling.x = eastWestLobbyDepth;
        eastLobby.scaling.z = eastWestLobbyWidth;
        eastLobby.position = new Vector3(eastGridPoint.x + (eastWestLobbyDepth /2), 0, eastGridPoint.z);
        eastLobby.material = yellowMaterial;

        const eastWalkBack = MeshBuilder.CreateGround("eastWalkBack", {width: 1, height: 1}, scene);
        eastWalkBack.scaling.x = walkWidth;
        eastWalkBack.scaling.z = eastWestScale * 2;
        eastWalkBack.position = new Vector3(eastGridPoint.x + eastWestLobbyDepth + (walkWidth / 2), 0, eastGridPoint.z);
        eastWalkBack.material = woodMat;

        const westBackWalk = MeshBuilder.CreateGround("westBackWalk", {width: 1, height: 1}, scene);
        westBackWalk.scaling.x = walkWidth;
        westBackWalk.scaling.z = eastWestScale * 2;
        westBackWalk.position = new Vector3(westGridPoint.x - eastWestLobbyDepth - (walkWidth / 2), 0, eastGridPoint.z);
        westBackWalk.material = woodMat;

        const eastWalk1 = MeshBuilder.CreateGround("eastWalk1", {width: 1, height: 1}, scene);
        eastWalk1.scaling.x = walkWidth;
        eastWalk1.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        eastWalk1.position = new Vector3(eastGridPoint.x + (walkWidth / 2),0,-((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        eastWalk1.material = woodMat;

        const eastWalk2 = MeshBuilder.CreateGround("eastWalk2", {width: 1, height: 1}, scene);
        eastWalk2.scaling.x = walkWidth;
        eastWalk2.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        eastWalk2.position = new Vector3(eastGridPoint.x + (walkWidth / 2),0,((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        eastWalk2.material = woodMat;

        const eastOffices1 = MeshBuilder.CreateGround("eastOffices2", {width: 1, height: 1}, scene);
        eastOffices1.scaling.x = eastWestLobbyDepth - walkWidth;
        eastOffices1.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        eastOffices1.position = new Vector3(eastGridPoint.x + walkWidth + ((eastWestLobbyDepth - walkWidth)/2),0,((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        eastOffices1.material = centerMaterial;

        const eastOffices2 = MeshBuilder.CreateGround("eastOffices2", {width: 1, height: 1}, scene);
        eastOffices2.scaling.x = eastWestLobbyDepth - walkWidth;
        eastOffices2.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        eastOffices2.position = new Vector3(eastGridPoint.x + walkWidth + ((eastWestLobbyDepth - walkWidth)/2),0,-((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        eastOffices2.material = centerMaterial;

        const westOffices1 = MeshBuilder.CreateGround("westOffices1", {width: 1, height: 1}, scene);
        westOffices1.scaling.x = eastWestLobbyDepth - walkWidth;
        westOffices1.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        westOffices1.position = new Vector3(westGridPoint.x - walkWidth - ((eastWestLobbyDepth - walkWidth)/2),0,((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        westOffices1.material = centerMaterial;

        const westOffices2 = MeshBuilder.CreateGround("westOffices2", {width: 1, height: 1}, scene);
        westOffices2.scaling.x = eastWestLobbyDepth - walkWidth;
        westOffices2.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        westOffices2.position = new Vector3(westGridPoint.x - walkWidth - ((eastWestLobbyDepth - walkWidth)/2),0,-((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        westOffices2.material = centerMaterial;

        const westWalk1 = MeshBuilder.CreateGround("westWalk1", {width: 1, height: 1}, scene);
        westWalk1.scaling.x = walkWidth;
        westWalk1.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        westWalk1.position = new Vector3(westGridPoint.x - (walkWidth / 2),0,((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        westWalk1.material = woodMat;

        const westWalk2 = MeshBuilder.CreateGround("westWalk2", {width: 1, height: 1}, scene);
        westWalk2.scaling.x = walkWidth;
        westWalk2.scaling.z = (eastWestScale - (eastWestLobbyWidth / 2));
        westWalk2.position = new Vector3(westGridPoint.x - (walkWidth / 2),0,-((eastWestLobbyWidth / 2) + northGridPoint.z) / 2);
        westWalk2.material = woodMat;
        
        const innerRadius = walkWidth;
        const outerRadius = eastWestLobbyDepth;
        const segments = 6;
        const startAngle = Math.PI;
        const endAngle = Math.PI /2;

        const conferenceWestPos = new Vector3(westGridPoint.x - walkWidth - eastWestLobbyDepth - (conferenceDepth /2),0,0);
        const conferenceEastPos = new Vector3(eastGridPoint.x + walkWidth + eastWestLobbyDepth + (conferenceDepth /2),0,0);
        const conferenceSouthPos = new Vector3(0,0,southGridPoint.z - walkWidth - northSouthLobbyDepth - (conferenceDepth /2));
        const conferenceNorthPos = new Vector3(0,0,northGridPoint.z + walkWidth + northSouthLobbyDepth + (conferenceDepth /2));

        const conferenceWestBuild = conferenceRooms.createConferenceroom(conferenceWestPos, conferenceDepth, conferenceWidth);
        const conferenceEastBuild = conferenceRooms.createConferenceroom(conferenceEastPos, conferenceDepth, conferenceWidth);
        const conferenceSouthBuild = conferenceRooms.createConferenceroom(conferenceNorthPos, conferenceWidth, conferenceDepth);
        const conferenceNorthBuild = conferenceRooms.createConferenceroom(conferenceSouthPos, conferenceWidth, conferenceDepth);        

        const floorCorner1 = meshTools.createArcGeo(woodMat, segments, cornerShape, scene);
        floorCorner1.position = new Vector3(westGridPoint.x, 0, northGridPoint.z)
        const officeCorner1 = meshTools.createCircularRibbon(innerRadius, outerRadius, segments, startAngle, endAngle, yellowMaterial, scene);
        officeCorner1.position = new Vector3(westGridPoint.x, 0, northGridPoint.z);
        const walkCorner1 = meshTools.createCircularRibbon(outerRadius, outerRadius + walkWidth, segments, startAngle, endAngle, woodMat, scene);
        walkCorner1.position = new Vector3(westGridPoint.x, 0, northGridPoint.z);
        
        const officeCorner2 = meshTools.createCircularRibbon(innerRadius, outerRadius, segments, 0, endAngle, yellowMaterial, scene);
        officeCorner2.position = new Vector3(eastGridPoint.x, 0, northGridPoint.z);
        const walkCorner2 = meshTools.createCircularRibbon(outerRadius, outerRadius + walkWidth, segments, 0, endAngle, woodMat, scene);
        walkCorner2.position = new Vector3(eastGridPoint.x, 0, northGridPoint.z);
        const officeCorner3 = meshTools.createCircularRibbon(innerRadius, outerRadius, segments, 0, -Math.PI /2, yellowMaterial, scene);
        officeCorner3.position = new Vector3(eastGridPoint.x, 0, southGridPoint.z)
        const walkCorner3 = meshTools.createCircularRibbon(outerRadius, outerRadius + walkWidth, segments, 0, -Math.PI /2, woodMat, scene);
        walkCorner3.position = new Vector3(eastGridPoint.x, 0, southGridPoint.z)
        const officeCorner4 = meshTools.createCircularRibbon(innerRadius, outerRadius, segments, Math.PI * 1.5, Math.PI, yellowMaterial, scene);
        officeCorner4.position = new Vector3(westGridPoint.x, 0, southGridPoint.z)
        const walkCorner4 = meshTools.createCircularRibbon(outerRadius, outerRadius + walkWidth, segments, Math.PI * 1.5, Math.PI, woodMat, scene);
        walkCorner4.position = new Vector3(westGridPoint.x, 0, southGridPoint.z)
        
        //--Cafe Areas
        const cornerLobby1 = meshTools.createCircularRibbon(innerRadius, 6, 12, 0, -Math.PI, woodMat, scene);
        cornerLobby1.position = new Vector3(westGridPoint.x - walkWidth - 3, .1, eastWestLobbyWidth /2)

        const cornerLobby2 = meshTools.createCircularRibbon(innerRadius, 6, 12, 0, Math.PI, woodMat, scene);
        cornerLobby2.position = new Vector3(eastGridPoint.x + walkWidth + 3, .1, -eastWestLobbyWidth /2)

        const cornerLobby3 = meshTools.createCircularRibbon(innerRadius, 6, 12, 0, Math.PI, woodMat, scene);
        cornerLobby3.position = new Vector3(westGridPoint.x - walkWidth - 3, .1, -eastWestLobbyWidth /2)

        const cornerLobby4 = meshTools.createCircularRibbon(innerRadius, 6, 12, 0, -Math.PI, woodMat, scene);
        cornerLobby4.position = new Vector3(eastGridPoint.x + walkWidth + 3, .1, eastWestLobbyWidth /2)
        
        const startPosition = new Vector3(eastGridPoint.x + walkWidth + eastWestLobbyDepth + (meetingDepth / 2),0, conferenceWidth);

        const arrayRoom = MeshBuilder.CreateGround("cube", {width: 1, height: 1}, scene);
        arrayRoom.scaling.x = meetingDepth;
        arrayRoom.scaling.z = meetingWidth;
        arrayRoom.position = startPosition;
        const meetingDirection = new Vector3(0,0,1);
        meshTools.arrayObjectWithRotation(arrayRoom, meetingDirection, 2, 16.5, 0);

    };

    initializeScene();

    return scene;
    }
} 