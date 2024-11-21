varying vec2 vUv;

void main(){
    vec4 color = vec4(1.0, .650, 1.0, 1.0);
    // color.rgb = vec3(vUv.x, vUv.y, 0.);

    gl_FragColor = color;
}