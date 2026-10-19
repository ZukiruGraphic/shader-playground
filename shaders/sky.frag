uniform vec3 uSunPosition;
varying vec3 vWorldPosition;
void main() {
    vec3 dir = normalize(vWorldPosition);
    vec3 sunDir = normalize(uSunPosition);
    float sunDot = max(dot(dir, sunDir), 0.0);
    vec3 skyColor = mix(vec3(0.7, 0.8, 0.95), vec3(0.1, 0.35, 0.75), max(dir.y, 0.0));
    vec3 sunColor = vec3(1.0, 0.95, 0.8) * pow(sunDot, 128.0) * 2.0;
    gl_FragColor = vec4(skyColor + sunColor, 1.0);
}
