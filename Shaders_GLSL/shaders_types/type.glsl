int num = 12;
float x = 12.;

// vectors ---> (We save the cordinates in vectiors)
vec2 v2 = vec2(1., 2.); //(x, y)
float x2 = v2.x; // 1.
float y2 = v2.y; // 2.

vec3 v3 = vec2(1., 2., 3.); //(x, y, z)
vec4 v4 = vec2(1., 2., 3., 4.); //(rgba)

// Swizzling ---> (Extracting more than one value at a time)
vec3 v3 = vec2(1., 2., 3.);
vec2 swizz = vec3.xy; // swizzling