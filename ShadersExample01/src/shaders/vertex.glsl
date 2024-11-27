// uniform float uTime;
// void main(){
//     vec3 pos=position;
//     pos.y += .1*sin(pos.x*3.*pos.y*3. + uTime);
//     pos.x += .1*sin(pos.x*2.*pos.y*2. + uTime);
//     gl_Position = projectionMatrix*modelViewMatrix*vec4(pos, 1.);
// }

uniform float uTime;  // Time uniform to animate the wave effect
varying vec2 vUv;  // UV coordinates for texture mapping

void main() {
    vUv = uv;  // Pass UV coordinates to the fragment shader

    // Apply wave effect to the Y position of the vertices
    float waveStrength = .2;  // Control the strength of the wave
    float waveSpeed = 1.0;     // Control the speed of the wave
    float waveFrequency = 3.0; // Control the frequency of the wave

    // Apply a sine wave function to the Y position of the vertices
    vec3 pos = position;
    pos.y += sin(pos.x * waveFrequency + uTime * waveSpeed) * waveStrength;
    pos.x += .1*sin(pos.x*2.*pos.y*2. + uTime);
    pos.z += .1*sin(pos.x*2.*pos.y*2. + uTime);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}