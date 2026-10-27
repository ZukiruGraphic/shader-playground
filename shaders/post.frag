uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float uCameraNear;
uniform float uCameraFar;
uniform float uVignetteIntensity;
uniform float uVignetteRoundness;
varying vec2 vUv;

float readDepth(sampler2D depthSampler, vec2 coord) {
float fragCoordZ = texture2D(depthSampler, coord).x;
if (fragCoordZ >= 1.0) {
return uCameraFar;
}
float z_n = 2.0 * fragCoordZ - 1.0;
float z_e = (2.0 * uCameraNear * uCameraFar) / (uCameraFar + uCameraNear - z_n * (uCameraFar - uCameraNear));
return z_e;
}

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    float depth = readDepth(tDepth, vUv);
    depth = 1.0 - exp(-depth / 35.0);

    vec2 uv = vUv - 0.5;
    
    float dist = length(uv);
    float vignette = smoothstep(uVignetteRoundness, uVignetteRoundness - 0.4, dist * uVignetteIntensity);
    
    color.rgb *= mix(0.3, 1.0, vignette);

    gl_FragColor = color;
}
