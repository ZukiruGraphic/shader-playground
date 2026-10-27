uniform sampler2D uTexture;
uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;
uniform vec3 uAmbientColor;
uniform vec3 uCameraPosition;
uniform vec3 uSpecularColor;
uniform float uSpecularPower;
uniform float uSpecularIntensity;
uniform float uAOStrength;

uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

varying float vAO;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float aoEffect = mix(1.0, vAO, uAOStrength);
    
    vec3 N = normalize(vWorldNormal);
    vec3 L = normalize(uDirLightPos);
    vec3 V = normalize(uCameraPosition - vWorldPosition);

    float NdotL = max(dot(N, L), 0.0);
    vec3 diffuse = uDirLightColor * NdotL;

    vec3 H = normalize(L + V);
    float NdotH = max(dot(N, H), 0.0);
    float spec = pow(NdotH, uSpecularPower);
    vec3 specular = uSpecularColor * spec * uSpecularIntensity * NdotL;
    
    vec3 finalColor = texColor.rgb * (uAmbientColor + diffuse) + specular;
    finalColor *= aoEffect;

    float dist = length(uCameraPosition - vWorldPosition);
    float fogFactor = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);

    finalColor = mix(finalColor, uFogColor, fogFactor);

    gl_FragColor = vec4(finalColor, 1.0);
}
