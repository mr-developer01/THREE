// void main() {
//     gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
// }

uniform sampler2D uTexture;  // The texture to apply
uniform float uTime;         // Optional: For any time-based effects, like animation

varying vec2 vUv;  // The texture coordinates passed from the vertex shader

void main() {
    // Sample the texture using the UV coordinates
    vec4 textureColor = texture2D(uTexture, vUv);
    
    // Set the final color of the fragment (pixel)
    gl_FragColor = textureColor;  // Apply the sampled texture color
}
