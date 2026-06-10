// Floating-mote point shader. Particles drift slowly upward, sway, and parallax
// with the pointer. Designed to read as dust / pollen in raked light.

export const particlesVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform float uRange;

  attribute float aScale;
  attribute float aSpeed;
  attribute float aOffset;

  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Continuous vertical drift, wrapped within a vertical band.
    p.y = mod(position.y + uTime * aSpeed, uRange) - uRange * 0.5;

    // Gentle lateral sway so motes never feel mechanical.
    p.x += sin(uTime * 0.35 + aOffset) * 0.35;
    p.z += cos(uTime * 0.28 + aOffset) * 0.35;

    // Subtle pointer parallax — deeper motes move less.
    float depth = (p.z + 4.0) / 8.0;
    p.xy += uPointer * (0.6 * depth);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);

    // Fade with depth and with each mote's own scale.
    vAlpha = smoothstep(0.0, 0.4, aScale) * clamp(1.0 / -mvPosition.z * 2.2, 0.0, 1.0);
  }
`

export const particlesFragment = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = smoothstep(0.5, 0.0, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a * vAlpha * 0.7);
  }
`
