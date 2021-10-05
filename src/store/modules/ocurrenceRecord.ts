export class OcurrenceRecordStore {
  source: String;
  numAppearance: Number;
  appearances: [Appearence];
  isVariation: Boolean;
  variationUF: String;
}

export class Appearence {
  useContext: String;
}
