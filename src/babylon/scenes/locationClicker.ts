import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PickingInfo } from "@babylonjs/core/Collisions/pickingInfo";
import { PointerInfo } from "@babylonjs/core/Events/pointerEvents";
import { Animation } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui';

export class LocationClicker{

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
    const advancedTexture: GUI.AdvancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    camera.upperBetaLimit = Math.PI / 2;
    
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    
    const plane = MeshBuilder.CreateBox("box", {size: 1});
    
    // Create ground plane
    const ground: Mesh = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    const groundMaterial: StandardMaterial = new StandardMaterial("groundMat", scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
    groundMaterial.specularColor = new Color3(0, 0, 0);
    ground.material = groundMaterial;
    
    // Array to store created objects
    const createdObjects: Mesh[] = [];
    
    const createBox = (position: Vector3): Mesh => {
        const box: Mesh = MeshBuilder.CreateBox("box", {size: 0.5}, scene);
        box.position = position;
        box.position.y += 0.25; // Lift box above ground
        
        // Random color material
        const material: StandardMaterial = new StandardMaterial("boxMat", scene);
        material.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
        box.material = material;
        
        // Create GUI Rectangle
        const rectangle = new GUI.Rectangle();
        rectangle.widthInPixels = 200;
        rectangle.heightInPixels = 50;
        rectangle.cornerRadius = 10;
        rectangle.color = "white";
        rectangle.thickness = 2;
        rectangle.background = "rgba(0, 0, 0, 0.7)";
        rectangle.isPointerBlocker = true;
        
        // Create text block
        const textBlock = new GUI.TextBlock();
        textBlock.text = "Click to edit";
        textBlock.color = "white";
        textBlock.fontSize = 18;
        rectangle.addControl(textBlock);
        
        // Add rectangle to GUI
        advancedTexture.addControl(rectangle);
        
        // Link rectangle to 3D position
        const worldPosition = new Vector3(position.x, position.y + 1, position.z);
        rectangle.linkWithMesh(box);

        const updateOffset = () => {
            const distance = Vector3.Distance(camera.position, box.position);
            rectangle.linkOffsetYInPixels = Math.max(-50, Math.min(-200, -distance * 10));
        };
        
        // Initial offset calculation
        updateOffset();
        
        // Update offset when camera moves (register observer)
        const cameraObserver = camera.onViewMatrixChangedObservable.add(() => {
            updateOffset();
        });
        
        // Store observer for cleanup
        (box as any).cameraObserver = cameraObserver;

        // Make rectangle clickable
        rectangle.onPointerClickObservable.add(() => {
            const newText = prompt("Enter new text:", textBlock.text);
            if (newText !== null) {
                textBlock.text = newText;
            }
        });
        
        // Store reference to GUI rectangle in box for cleanup
        (box as any).guiRectangle = rectangle;
        
        createdObjects.push(box);
        return box;
    };

    const deleteBox = (box: Mesh) => {
        // Remove from created objects array
        const index = createdObjects.indexOf(box);
        if (index > -1) {
            createdObjects.splice(index, 1);
        }
        
        // Clean up camera observer
        if ((box as any).cameraObserver) {
            camera.onViewMatrixChangedObservable.remove((box as any).cameraObserver);
        }
        
        // Clean up GUI rectangle
        if ((box as any).guiRectangle) {
            advancedTexture.removeControl((box as any).guiRectangle);
        }
        
        // Dispose the 3D mesh
        box.dispose();
    };
    
    // Handle pointer events
    scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
            // Check if pointer is over any GUI element
            const isOverGUI = advancedTexture.getDescendants().some((control: any) => {
                return control.isPointerBlocker && control.isVisible && control.contains(scene.pointerX, scene.pointerY);
            });
            
            // Handle left click - create boxes or set camera target
            if (pointerInfo.event.button === 0 && !isOverGUI) {
                const pickResult: PickingInfo = scene.pick(scene.pointerX, scene.pointerY);
                
                if (pickResult.hit) {
                    if (pickResult.pickedMesh === ground) {
                        // Create box at clicked position
                        const clickedPosition: Vector3 = pickResult.pickedPoint!;
                        createBox(clickedPosition);
                        
                        console.log("Box created at:", clickedPosition);
                    } else if (pickResult.pickedMesh && pickResult.pickedMesh.name === "box") {
                        // Set camera target to clicked box with smooth animation
                        const targetBox = pickResult.pickedMesh as Mesh;
                        const targetPosition = targetBox.position.clone();
                        
                        // Smooth camera target transition
                        Animation.CreateAndStartAnimation(
                            "cameraTargetAnimation",
                            camera,
                            "target",
                            60, // 60 FPS
                            60, // 1 second duration (60 frames at 60 FPS)
                            camera.target.clone(),
                            targetPosition,
                            Animation.ANIMATIONLOOPMODE_CONSTANT
                        );
                        
                        console.log("Camera target animating to box at:", targetBox.position);
                    }
                }
            }
            
            // Handle right click - delete boxes
            if (pointerInfo.event.button === 2) {
                const pickResult: PickingInfo = scene.pick(scene.pointerX, scene.pointerY);
                
                if (pickResult.hit && pickResult.pickedMesh && pickResult.pickedMesh.name === "box") {
                    deleteBox(pickResult.pickedMesh as Mesh);
                    console.log("Box deleted");
                }
            }
        }
    });


    return scene;
    }
} 