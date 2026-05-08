// Mutable singleton for debug overrides. Read in HeroLaptop's useFrame loop.
// Set from DebugHUD slider events. Bypasses React rendering for low-cost reads.

export const debugState = {
  lidOverride: false,
  lidAngleRad: 0,    // overrides LidPivot rotation.x
  yOverride: false,
  yAngleRad: 0,      // overrides root group rotation.y
  scaleOverride: false,
  scaleValue: 0.08,
}
