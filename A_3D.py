from direct.showbase.ShowBase import ShowBase
from panda3d.core import DirectionalLight, AmbientLight, Vec4, Point3
import sys

class ModelViewer(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        
        # Load the GLTF model
        self.model = self.loader.loadModel("public/DESKTOP/scene.gltf")
        self.model.reparentTo(self.render)
        
        # Scale down the model to fit better in the view
        self.model.setScale(0.5, 0.5, 0.5)  # Adjust as needed

        # Set up a basic light
        self.add_lights()
        
        # Position the camera for full model view
        self.camera.setPos(0, -40, 15)
        self.camera.lookAt(self.model)

        # Enable keyboard controls
        self.accept("arrow_up", self.move_model, [0, 0.5, 0])
        self.accept("arrow_down", self.move_model, [0, -0.5, 0])
        self.accept("arrow_left", self.move_model, [-0.5, 0, 0])
        self.accept("arrow_right", self.move_model, [0.5, 0, 0])
        self.accept("w", self.move_model, [0, 0, 0.5])  # Move up
        self.accept("s", self.move_model, [0, 0, -0.5])  # Move down
        self.accept("a", self.move_model, [-0.5, 0, 0])  # Move left
        self.accept("d", self.move_model, [0.5, 0, 0])  # Move right
        self.accept("q", self.move_model, [0, -0.5, 0])  # Move backward
        self.accept("e", self.move_model, [0, 0.5, 0])   # Move forward

        # Add slow rotation for model
        self.taskMgr.add(self.rotate_model, "rotateModelTask")

    def add_lights(self):
        # Directional light to simulate sunlight
        d_light = DirectionalLight("directionalLight")
        d_light.setColor(Vec4(1, 1, 1, 1))
        light_node = self.render.attachNewNode(d_light)
        light_node.setHpr(45, -45, 0)
        self.render.setLight(light_node)

        # Ambient light to soften the shadows
        a_light = AmbientLight("ambientLight")
        a_light.setColor(Vec4(0.3, 0.3, 0.3, 1))
        ambient_node = self.render.attachNewNode(a_light)
        self.render.setLight(ambient_node)

    def rotate_model(self, task):
        # Slow rotation for a clearer view of the model
        angle = task.time * 10
        self.model.setHpr(angle, 0, 0)
        return task.cont

    def move_model(self, dx, dy, dz):
        # Adjust the model's position based on the input direction
        pos = self.model.getPos()
        self.model.setPos(pos.x + dx, pos.y + dy, pos.z + dz)

# Run the viewer
app = ModelViewer()
app.run()
