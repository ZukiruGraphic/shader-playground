uniform sampler2D uTexture;
uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;
uniform vec3 uAmbientColor;
uniform vec3 uCameraPosition;
uniform vec3 uSpecularColor;
uniform float uSpecularPower;
uniform float uSpecularIntensity;
uniform float uAOStrength;
varying float vAO;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

float sdCube(vec3 p) {
    vec3 q = abs(p - vec3(0.0, 0.75, 0.0)) - vec3(0.75);
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float getSmoothRayMarchedShadow(vec3 rayOrigin, vec3 rayDir) {
    vec2 shadowCenter = vec2(0.0) - rayDir.xz * (0.75 / max(rayDir.y, 0.001));
    float distToShadowCenter = length(rayOrigin.xz - shadowCenter);
    
    // Increase limit or scale it dynamically when the sun is low (sunset)
    float maxShadowDist = mix(15.0, 5.0, clamp(rayDir.y * 3.0, 0.0, 1.0));
    if (distToShadowCenter > maxShadowDist) {
        return 1.0;
    }

    float res = 1.0;
    float t = 0.02;
    float k = 16.0;

    for (int i = 0; i < 24; i++) {
        vec3 p = rayOrigin + rayDir * t;
        float h = sdCube(p);

        if (h < 0.001) {
            return 0.0;
        }

        res = min(res, k * h / t);
        t += clamp(h, 0.03, 0.3);

        if (t > 15.0) break;
    }

    res = clamp(res, 0.0, 1.0);
    return smoothstep(0.0, 1.0, res);
}


void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float aoEffect = mix(1.0, vAO, uAOStrength);

    vec3 N = normalize(vWorldNormal);
    vec3 L = normalize(uDirLightPos);
    vec3 V = normalize(uCameraPosition - vWorldPosition);

    float shadow = getSmoothRayMarchedShadow(vWorldPosition + N * 0.005, L);

    vec3 shadowLighting = mix(uAmbientColor * 1.3, vec3(1.0), shadow);

    float NdotL = max(dot(N, L), 0.0);
    vec3 diffuse = uDirLightColor * NdotL * shadowLighting;

    vec3 H = normalize(L + V);
    float NdotH = max(dot(N, H), 0.0);
    float spec = pow(NdotH, uSpecularPower);
    vec3 specular = uSpecularColor * spec * uSpecularIntensity * NdotL * shadow;

    vec3 finalColor = texColor.rgb * (uAmbientColor + diffuse) + specular;
    
    finalColor *= aoEffect;
    
    gl_FragColor = vec4(finalColor, gl_FragCoord.z);
}
