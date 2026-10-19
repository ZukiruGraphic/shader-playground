uniform sampler2D tDiffuse;
uniform float uVignetteIntensity;
uniform float uVignetteRoundness;
varying vec2 vUv;

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float vignette = smoothstep(uVignetteRoundness, uVignetteRoundness - 0.4, dist * uVignetteIntensity);
    color.rgb *= mix(0.3, 1.0, vignette);
    gl_FragColor = color;
}
