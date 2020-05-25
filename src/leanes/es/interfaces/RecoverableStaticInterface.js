

export interface RecoverableStaticInterface<Module, Instance> {
  restoreObject(acModule: Class<Module>, replica: object): Promise<Instance>;

  replicateObject(instance: Instance): Promise<object>;
}
