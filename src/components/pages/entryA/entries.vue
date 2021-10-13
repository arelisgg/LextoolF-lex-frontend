<template>
  <a-page-header>
    <template #title>
      <h2>Unidades Fraseológicas Candidatas</h2>
    </template>
    <template #extra>
      <a-tooltip
        title="Documentar Unidades Fraseológicas Candidatas"
        placement="bottom"
      >
        <a-button
          key="documentar"
          type="primary"
          style="margin-right: 5px"
          @click="goDocumentation"
        >
          Documentar UFs
        </a-button>
      </a-tooltip>
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
      <a-tooltip
        title="Seleccionar de la UF candidata"
        placement="bottom"
      ></a-tooltip>

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
      <a-popconfirm
        v-if="entries.length"
        title="Seguro de Eliminar?"
        @confirm="deleteUFByID(record.entry.id)"
      >
        <a-tooltip title="Eliminar UF candidata" placement="bottom">
          <a>
            <DeleteFilled
              :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
            />
          </a>
        </a-tooltip>
      </a-popconfirm>
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
import EntryDetailsModal from './entryDetailsModal.vue';
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
          sorter: (a, b) => a.name.localeCompare(b.name),
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
          width: 500,
          sorter: (a, b) => a.name.localeCompare(b.name),
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
          title: '',
          key: 'operation',
          width: 100,
          slots: { customRender: 'operation' },
        },
      ],
      entries: [],
    };
  },
  async mounted() {
    const { data } = await EntryA.getAllEntriesToDocument();
    const entries = data.getAllEntriesToDocument;
    for (let index = 0; index < entries.length; index++) {
      const element = entries[index];
      const entrySource = {} as {
        entry: {
          id: String;
          UF: String;
          lemma: String;
          source: String;
          letter: String;
          context: String;
          selected: Boolean;
          criteria: String;
          included: String;
          frecuency: String;
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
    goDocumentation() {
      this.$router.push({ name: 'documentationTask' });
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
        name: 'editEntryA',
        params: {
          id: selectedEntry.id,
        },
      });
    },
  },
});
</script>
