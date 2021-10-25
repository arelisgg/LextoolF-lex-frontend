<template>
  <a-page-header>
    <template #title>
      <h2>Fuentes utilizadas en la Extracción</h2>
    </template>
  </a-page-header>
  <a-table
    :data-source="sources"
    :columns="columns"
    :row-key="(record) => record.id"
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
        <a @click="sourceDetailsModalShowMethod(record)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
    </template>
  </a-table>
  <source-details-modal
    v-model:visible="sourceDetailsModalShow"
    :selected-source="selectedSource"
    @close-modal="closeSourceDetailsModal"
  ></source-details-modal>
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
import SourceDetailsModal from '../sourcesA/sourceDetailsModal.vue';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    SearchOutlined,
    SourceDetailsModal,
  },
  data() {
    const sourceDetailsModalShow = false;
    const selectedSource = {};
    const fileType = '';
    const searchInput = ref();
    return {
      searchInput,
      fileType,
      selectedSource,
      sourceDetailsModalShow,
      columns: [
        {
          title: 'Nombre de la Fuente',
          dataIndex: 'ref',
          key: 'ref',
          sorter: (a, b) => a.name.localeCompare(b.name),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.ref
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Referencia de la Fuente',
          dataIndex: 'ref',
          key: 'ref',
          width: 400,
          sorter: (a, b) => a.ref.localeCompare(b.ref),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.ref
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
      sources: [],
    };
  },
  async mounted() {
    const { data } = await Sources.findAllExtractionSources();
    const sources = data.findAllExtractionSources;
    this.sources = sources;
    console.log('this.sources', this.sources);
  },
  methods: {
    handleSearch: (confirm) => {
      confirm();
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
    async sourceDetailsModalShowMethod(source) {
      this.selectedSource = source;
      this.sourceDetailsModalShow = true;
    },
    closeSourceDetailsModal() {
      this.sourceDetailsModalShow = false;
    },
  },
});
</script>
