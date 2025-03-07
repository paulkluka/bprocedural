import { ArcRotateCamera, Engine, HemisphericLight, InstancedMesh, PointLight, Scene, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import CircularSeating from "@/components/circularRooms";
import CreateChair from "@/components/Chair02Proc";

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
    pointLight.intensity = 0.7;

    const circular = new CircularSeating;
    const chair = new CreateChair;

    function initializeScene() {
        circular.gridCreator(3, 3).then(grid => {
            setupWithGrid(grid);
        });
    }
    
    function setupWithGrid(grid: InstancedMesh[]) {

        grid.forEach((element: InstancedMesh) => {
            const roomPosition = new Vector3(element.position.x, .5, element.position.z); 
            const outerRadius = 4;
            const innerRadius = 2;
            const tableNumber = 2;
            const seatNumber = 5;

            circular.seatLocations(tableNumber, outerRadius, innerRadius, seatNumber, roomPosition).then(seatingArray => {
                seatingArray.forEach((seat) => {
                    const chairRotation = seat.getWorldMatrix().getRotationMatrix();
                    const chairPosition = new Vector3((seat.position.x + roomPosition.x),(seat.position.y + roomPosition.y),(seat.position.z + roomPosition.z));
                    
                    chair.createChair(chairPosition, chairRotation);

                });
            });
            circular.tablePositions(tableNumber, outerRadius, innerRadius, roomPosition);
        });
    }
    
    initializeScene();

    return scene;
    }
}

