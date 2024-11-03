import pygame
from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GL.shaders import compileProgram, compileShader
from pygltflib import GLTF2
import numpy as np
from OpenGL.GLU import gluPerspective
import os

# Initialize Pygame and OpenGL
def init_pygame():
    pygame.init()
    display = (800, 600)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
    glEnable(GL_DEPTH_TEST)
    gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
    glTranslatef(0.0, 0.0, -5)

# Basic shader setup for rendering
VERTEX_SHADER = """
#version 330
in vec3 position;
uniform mat4 model;
void main() {
    gl_Position = model * vec4(position, 1.0);
}
"""

FRAGMENT_SHADER = """
#version 330
out vec4 fragColor;
void main() {
    fragColor = vec4(1.0, 0.5, 0.5, 1.0); // Changed color to light red for visibility
}
"""

# Load GLTF model and extract vertex data
def load_gltf_model(file_path):
    gltf = GLTF2().load(file_path)
    vertices = []

    base_dir = os.path.dirname(file_path)

    for mesh in gltf.meshes:
        for primitive in mesh.primitives:
            accessor = gltf.accessors[primitive.attributes.POSITION]
            bufferView = gltf.bufferViews[accessor.bufferView]
            buffer = gltf.buffers[bufferView.buffer]

            bin_file = os.path.join(base_dir, buffer.uri)
            with open(bin_file, 'rb') as f:
                f.seek(bufferView.byteOffset)
                data = np.frombuffer(f.read(bufferView.byteLength), dtype=np.float32)
                vertices.extend(data.tolist())
    
    vertices = np.array(vertices, dtype=np.float32)
    return vertices

# Setup vertex buffer and shader
def setup_model(vertices):
    shader = compileProgram(
        compileShader(VERTEX_SHADER, GL_VERTEX_SHADER),
        compileShader(FRAGMENT_SHADER, GL_FRAGMENT_SHADER)
    )

    VAO = glGenVertexArrays(1)
    glBindVertexArray(VAO)

    VBO = glGenBuffers(1)
    glBindBuffer(GL_ARRAY_BUFFER, VBO)
    glBufferData(GL_ARRAY_BUFFER, vertices.nbytes, vertices, GL_STATIC_DRAW)

    position = glGetAttribLocation(shader, 'position')
    glEnableVertexAttribArray(position)
    glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE, 0, None)

    return shader, VAO

# Main render loop
def main():
    init_pygame()
    vertices = load_gltf_model("C:/Users/H P/OneDrive/Desktop/sethu/sethe/public/DESKTOP/scene.gltf")
    shader, VAO = setup_model(vertices)

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        glUseProgram(shader)
        
        # Bind model transformation matrix
        model_loc = glGetUniformLocation(shader, 'model')
        model_matrix = np.identity(4, dtype=np.float32)
        model_matrix = model_matrix * 0.5  # Scale down the model to fit within view
        glUniformMatrix4fv(model_loc, 1, GL_FALSE, model_matrix)

        glBindVertexArray(VAO)
        glDrawArrays(GL_TRIANGLES, 0, len(vertices) // 3)

        pygame.display.flip()
        pygame.time.wait(10)

main()
