<template>
  <a-page-header>
    <template #title>
      <h2>Lemario</h2>
    </template>
    <template #extra>
      <a-tooltip
        title="Lematizar Unidades Fraseológicas Seleccionadas"
        placement="bottom"
      >
        <a-button
          key="documentar"
          type="primary"
          style="margin-right: 5px"
          @click="goLematization"
        >
          Lematizar UFs
        </a-button>
      </a-tooltip>
    </template>
  </a-page-header>
  <a-table
    :data-source="entriesByLetter"
    :columns="columns"
    :row-key="(record) => record.letter"
    :expanded-rows-change="onRowExpand"
    bordered
  >
    <template #expandedRowRender="{ record }">
      <a-table
        :data-source="record.entries"
        :columns="entryColumns"
        :row-key="(record) => record.id"
        :pagination="false"
      >
        <template #operation="{ record }">
          <a-tooltip title="Detalles de la Entrada" placement="bottom">
            <a @click="entryDetailsModalShowMethod(record)">
              <EyeFilled
                :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
              />
            </a>
          </a-tooltip>
          <a-tooltip title="Editar" placement="bottom">
            <a @click="goToEditEntryA(record)">
              <EditFilled
                :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
              />
            </a>
          </a-tooltip>
        </template>
        <template
          #filterDropdown="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
        >
          <div style="padding: 8px">
            <a-input
              ref="searchInput"
              :placeholder="`Buscar ${column.title}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="
                (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
              "
              @pressEnter="handleSearch(confirm)"
            />
            <a-button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(confirm)"
            >
              <template #icon><SearchOutlined /></template>
              Search
            </a-button>
            <a-button
              size="small"
              style="width: 90px"
              @click="handleReset(clearFilters)"
            >
              Reset
            </a-button>
          </div>
        </template>
        <template #filterIcon="filtered">
          <search-outlined
            :style="{ color: filtered ? '#108ee9' : undefined }"
          />
        </template>
      </a-table>
    </template>
  </a-table>
  <entry-details-modal
    v-model:visible="entryDetailsModalShow"
    :selected-entry="selectedEntry"
    :file-type="fileType"
    @close-modal="closeEntryDetailsModal"
  ></entry-details-modal>
</template>
<script lang="ts">
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, h } from 'vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import Table from 'ant-design-vue/lib/table';
import EntryDetailsModal from '../entryA/entryDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    SearchOutlined,
    EntryDetailsModal,
  },
  data() {
    const entryDetailsModalShow = false;
    const entriesByLetter = [];
    const letters = [];
    const activeKey = letters[0];
    const selectedEntry = {};
    const fileType = '';
    const searchInput = ref();
    return {
      letters,
      searchInput,
      activeKey,
      entriesByLetter,
      fileType,
      selectedEntry,
      entryDetailsModalShow,
      columns: [
        {
          title: 'Letra',
          dataIndex: 'letter',
          key: 'letter',
          width: 300,
          sorter: (a, b) => a.letter.localeCompare(b.letter),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.letter
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
      ],
      entryColumns: [
        {
          title: 'UF',
          dataIndex: 'UF',
          sorter: (a, b) => a.UF.localeCompare(b.UF),
          width: 300,
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.UF.toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Lemas',
          dataIndex: 'lemma',
          customRender: ({ text }) => {
            let result = [];
            text.forEach((element) => {
              result.push(element.lemma);
              result.push(', ');
            });
            return h('span', { href: 'javascript:;' }, result);
          },
        },
        {
          title: 'Operación',
          key: 'operation',
          width: 70,
          slots: { customRender: 'operation' },
        },
      ],
      entries: [],
    };
  },
  async mounted() {
    const { data } = await EntryA.getAllEntriesOfLemario();
    const entries = data.getAllEntriesOfLemario;
    for (let index = 0; index < entries.length; index++) {
      const element = entries[index].letter;
      console.log('element', element);
      for (let i = 0; i < element.length; i++) {
        const e = element[i];
        console.log('e', e);
        let isIncluded = this.letters.includes(e);
        if (!isIncluded) {
          this.letters.push(e);
        }
      }
    }
    this.letters.sort((a, b) => a.localeCompare(b));
    this.entries = entries;
    console.log('this.letters', this.letters);
    console.log('this.entries', this.entries);

    //////////////////////////////////////////////////////////////

    for (let b = 0; b < this.letters.length; b++) {
      const letter = this.letters[b];
      const entriesOfLetter: any = [];
      const entryletter = {} as {
        letter: String;
        entries: [];
      };
      entryletter.letter = letter;
      for (let s = 0; s < this.entries.length; s++) {
        const entry = this.entries[s];
        for (let l = 0; l < entry.lemma.length; l++) {
          const lemma = entry.lemma[l].lemma;
          const letra = lemma[0].toUpperCase();
          if (letra === letter) {
            entriesOfLetter.push(entry);
          }
        }
      }
      entryletter.entries = entriesOfLetter;
      this.entriesByLetter.push(entryletter);
    }
    console.log('this.entriesByLetter', this.entriesByLetter);
    console.log('this.entriesByLetter', this.entriesByLetter[0].letter);
    console.log('this.entriesByLetter', this.entriesByLetter[0].entries[0]);
    console.log('this.entriesByLetter', this.entriesByLetter[0].entries[0].id);
  },
  methods: {
    async deleteUFByID(id) {
      let index = 0;
      let found = false;
      for (index; index < this.entries.length && !found; index++) {
        const element = this.entries[index];
        if (element.entry.id === id) {
          found = true;
        }
      }
      this.entries = this.entries.filter((item) => item.entry.id !== id);
      await EntryA.deleteEntryByID(id);
    },
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
    goLematization() {
      this.$router.push({ name: 'entryLematization' });
    },
    async ufDetailsModalShowMethod(entry) {
      this.selectedEntry = entry;
      this.fileType = this.selectedEntry.context.split('_')[0];
      this.entryDetailsModalShow = true;
    },
    closeEntryDetailsModal() {
      this.entryDetailsModalShow = false;
    },
    goToEditEntryA(selectedEntry) {
      this.$router.push({
        name: 'editEntryAFinal',
        params: {
          id: selectedEntry.id,
        },
      });
    },
  },
});
</script>
