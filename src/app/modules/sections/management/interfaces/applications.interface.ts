
export interface IApplication {
  uuid: string;
  code: string;
  key: string;
  description?: string;
  route?: string;
  parentApplication?: string;
  image: string;
  // ↓ not included in entity ↓
  name?: string;
}
