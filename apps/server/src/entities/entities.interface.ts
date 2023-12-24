export class Actor {
  readonly instanceId: string;
  readonly userId: string;
}


export type Entity = string|boolean|Record< string|number, any>|Array<any>|null;
