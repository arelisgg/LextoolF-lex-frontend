<template>
  <a-page-header>
    <template #title>
      <h2>Unidades Fraseológicas Excluídas del Lemario</h2>
    </template>
  </a-page-header>
  <a-table
    :data-source="entries"
    :columns="columns"
    :row-key="(record) => record.entry.id"
    bordered
  >
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
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #operation="{ record }">
      <a-tooltip title="Detalles de la UF candidata " placement="bottom">
        <a @click="ufDetailsModalShowMethod(record.entry)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Editar" placement="bottom">
        <a @click="goToEditEntryA(record.entry)">
          <EditFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
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
import { defineComponent, ref } from 'vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import Table from 'ant-design-vue/lib/table';
import EntryDetailsModal from '../entryA/entryDetailsModal.vue';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';

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
    const selectedEntry = {};
    const fileType = '';
    const searchInput = ref();
    return {
      searchInput,
      fileType,
      selectedEntry,
      entryDetailsModalShow,
      columns: [
        {
          title: 'UF',
          dataIndex: 'entry.UF',
          key: 'UF',
          width: 300,
          sorter: (a, b) => a.entry.name.localeCompare(b.entry.name),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.entry.UF.toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Fuente',
          dataIndex: 'source.ref',
          key: 'source',
          width: 400,
          sorter: (a, b) => a.source.name.localeCompare(b.source.name),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.source.ref
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Frecuencia de Uso',
          dataIndex: 'entry.frecuency',
          key: 'frecuency',
          sorter: (a, b) => a.entry.frecuency.localeCompare(b.entry.frecuency),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.entry.frecuency
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Criterio de exclusión',
          dataIndex: 'entry.criteria',
          key: 'criteria',
          sorter: (a, b) => a.entry.criteria.localeCompare(b.entry.criteria),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.entry.criteria
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: '',
          key: 'operation',
          width: 50,
          slots: { customRender: 'operation' },
        },
      ],
      entries: [],
    };
  },
  async mounted() {
    const { data } = await EntryA.getAllExcludedEntries();
    const entries = data.getAllExcludedEntries;
    for (let index = 0; index < entries.length; index++) {
      const element = entries[index];
      const entrySource = {} as {
        entry: {
          id: String;
          lemma: [{ lemma: String }];
          letter: [];
          context: String;
          UF: String;
          source: String;
          selected: Boolean;
          criteria: String;
          frecuency: String;
          included: String;
          documentation: [];
        };
        source: {};
      };
      entrySource.entry = element;
      const s = await Sources.getSourceByID(element.source);
      entrySource.source = s.data.getSourceByID;
      this.entries.push(entrySource);
    }
    console.log();
  },
  methods: {
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
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
        name: 'editEntryAExcluded',
        params: {
          id: selectedEntry.id,
        },
      });
    },
  },
});
</script>
