

export interface ConfigurationInterface {
  ROOT: string;

  environment: string;

  name: ?string;

  description: ?string;

  license: ?string;

  version: ?string;

  keywords: ?string[];

  defineConfigProperties(): void;
}
