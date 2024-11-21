varying vec2 vUv;
varying vec3 vPosition;

void main(){
    vUv = uv;
    vPosition = position;
    vec4 modelPosition = modelMatrix * vec4(vPosition, 1.); // Transforms the vertex's position from local (object) space to world space using the modelMatrix
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
}