export class OcurrenceRecordStore {
  source: String;
  numAppearance: Number;
  appearances: [Appearence];
  isVariation: Boolean;
  variationUF: String;
  status: String;
}

export class Appearence {
  useContext: String;
}
