

export interface TransitionInterface {
  testGuard(): Promise<?any>;
  testIf(): Promise<?any>;
  testUnless(): Promise<?any>;
  doAfter(): Promise<?any>;
  doSuccess(): Promise<?any>;
}
