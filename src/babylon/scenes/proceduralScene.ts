import { ArcRotateCamera, Engine, HemisphericLight, InstancedMesh, Mesh, PointLight, Scene, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import CircularSeating from "@/babylon/components/circularRooms";
import CreateChair from "@/babylon/components/Chair02Proc";
import Chair01Proc from "@/babylon/components/Chair01Proc";

export class ProceduralScene{
    scene: Scene;
    engine: Engine;
    private circular: CircularSeating;
    private chair: CreateChair;
    private chair01: Chair01Proc;
    private currentGrid: InstancedMesh[] = [];
    private currentChairs: InstancedMesh[] = [];
    private currentMeshes: Mesh[] = [];

    constructor(private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();
        this.circular = new CircularSeating();
        this.chair = new CreateChair();
        this.chair01 = new Chair01Proc();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // Initialize the scene with default grid
        this.initializeScene(3, 3);
    }

    // Method to update the grid
    async updateGrid(xCount: number, zCount: number): Promise<void> {
        console.log(`Updating grid to ${xCount}x${zCount}`);
        
        // First, clean up existing scene elements
        this.cleanupScene();
        
        // Then create new grid
        return this.initializeScene(xCount, zCount);
    }
    
    // Clean up all meshes in the scene
    private cleanupScene(): void {
        console.log("Starting scene cleanup...");
        
        // Dispose all chair instances
        this.currentChairs.forEach(chair => {
            if (chair && !chair.isDisposed()) {
                chair.dispose();
            }
        });
        this.currentChairs = [];
        
        // Dispose all tracked meshes
        this.currentMeshes.forEach(mesh => {
            if (mesh && !mesh.isDisposed()) {
                mesh.dispose();
            }
        });
        this.currentMeshes = [];
        
        // Clean up chair templates and temporary meshes
        this.chair.cleanupMeshes();
        this.chair01.cleanupMeshes();
        
        // Clean up grid and associated tables/seats in the CircularSeating class
        this.circular.cleanupScene();
        
        // Force garbage collection for the scene
        this.scene.dispose();
        this.scene = this.CreateScene();
        
        console.log("Scene cleanup complete");
    }

    // Initialize or reinitialize the scene with new grid parameters
    private async initializeScene(xCount: number, zCount: number): Promise<void> {
        console.log(`Initializing scene with grid ${xCount}x${zCount}`);
        
        // Create new grid
        try {
            const grid = await this.circular.gridCreator(xCount, zCount);
            this.currentGrid = grid;
            await this.setupWithGrid(grid);
            console.log(`Scene initialized with grid ${xCount}x${zCount}`);
        } catch (error) {
            console.error("Error initializing scene:", error);
        }
    }
    
    private async setupWithGrid(grid: InstancedMesh[]): Promise<void> {
        const promises: Promise<any>[] = [];
        
        grid.forEach((element: InstancedMesh) => {
            const roomPosition = new Vector3(element.position.x, .5, element.position.z); 
            const outerRadius = 4;
            const innerRadius = 2;
            const tableNumber = 2;
            const seatNumber = 5;

            // Create tables for this grid element
            this.circular.tablePositions(tableNumber, outerRadius, innerRadius, roomPosition);
            
            // Create seats and chairs for this grid element
            promises.push(
                this.circular.seatLocations(tableNumber, outerRadius, innerRadius, seatNumber, roomPosition)
                    .then(seatingArray => {
                        const chairPromises = seatingArray.map(seat => {
                            const chairRotation = seat.getWorldMatrix().getRotationMatrix();
                            const chairPosition = new Vector3(
                                (seat.position.x + roomPosition.x),
                                (seat.position.y + roomPosition.y),
                                (seat.position.z + roomPosition.z)
                            );
                            
                            return this.chair.createChair(chairPosition, chairRotation)
                                .then(chairInstance => {
                                    if (chairInstance) {
                                        this.currentChairs.push(chairInstance);
                                    }
                                });
                        });
                        return Promise.all(chairPromises);
                    })
            );
        });
        
        await Promise.all(promises);
    }

    CreateScene(): Scene {
        const scene = new Scene(this.engine);

        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 50, Vector3.Zero(), scene);
        camera.attachControl();
        camera.upperBetaLimit = Math.PI / 2;
        
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.2;
        const pointLight = new PointLight("pointLight", new Vector3(0, 25, 0), scene);
        pointLight.intensity = 0.7;

        return scene;
    }
} 