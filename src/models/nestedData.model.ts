import { EntryAStore } from "@/store/modules/entryA";
import { SourcesStore } from "@/store/modules/sourcesA";

export class NestedData {
    source: SourcesStore;
    nestedEntryData: EntryAStore[];
}
