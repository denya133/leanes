

export interface CaseInterface {
  _cleanType: 'case';
  execute(...args: any[]): ?Promise<any>;
}
