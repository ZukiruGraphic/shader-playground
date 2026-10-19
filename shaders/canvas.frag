uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D tengstur;
varying vec2 vUv;

void main() {
    // Example standalone 2D Shadertoy-style procedural animation
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec3 color = 0.5 + 0.5 * cos(uTime + st.xyx + vec3(0.0, 2.0, 4.0));
    gl_FragColor = vec4(color, 1.0);
}
