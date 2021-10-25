<template>
  <a-page-header>
    <template #title>
      <h2>Extracción de Unidades Fraseológicas Candidatas</h2>
    </template>
    <template #extra>
      <a-tooltip
        title="Ir a Unidades Fraseológicas Extraídas"
        placement="bottom"
      >
        <a-button
          key="documentar"
          type="primary"
          style="margin-right: 5px"
          @click="goEntries"
        >
          UFs Extraídas
        </a-button>
      </a-tooltip>
    </template>
  </a-page-header>
  <a-tooltip title="Nueva Unidad Fraseológica" placement="right">
    Nueva UF
    <PlusSquareFilled
      :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
      @click="onAdd"
    />
  </a-tooltip>
  <a-table
    :data-source="nestedData"
    :columns="columns"
    :row-key="(record) => record.source.id"
    :expanded-rows-change="onRowExpand"
    bordered
  >
    <template #title>Contextos de Identificación</template>
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
    <template #name="{ record }">
      <span>{{ record.name }}</span>
    </template>
    <template #operation="{ record }">
      <a-tooltip
        title="Seleccionar de la fuente"
        placement="bottom"
      ></a-tooltip>
      <a-tooltip
        title="Continuar la extracción de UFs de esta Fuente"
        placement="bottom"
      >
        <a @click="selectSourceToWork(record.source.id)">
          <CarryOutFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Detalles de la fuente" placement="bottom">
        <a @click="sourceDetailsModalShowMethod(record.source)">
          <EyeFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-tooltip title="Editar Fuente" placement="bottom">
        <a @click="goToEditSource(record.source)">
          <EditFilled
            :style="{ fontSize: '20px', color: '#08c', margin: '5px' }"
          />
        </a>
      </a-tooltip>
      <a-popconfirm
        v-if="nestedData.length"
        title="Si elimina la Fuente se eliminaran las entradas extraídas de esta.¿Seguro de Eliminar?"
        @confirm="deleteSourceByID(record.source.id)"
      >
        <a-tooltip title="Eliminar de la fuente" placement="bottom">
          <a>
            <DeleteFilled
              :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
            />
          </a>
        </a-tooltip>
      </a-popconfirm>
    </template>
    <template #expandedRowRender="{ record }">
      <a-table
        :data-source="record.nestedEntryData"
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
  <source-details-modal
    v-model:visible="sourceDetailsModalShow"
    :selected-source="selectedSource"
    @close-modal="closeSourceDetailsModal"
  ></source-details-modal>
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
  PlusSquareFilled,
  CarryOutFilled,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import Table from 'ant-design-vue/lib/table';
import SourceDetailsModal from './sourceDetailsModal.vue';

import EntryDetailsModal from '../entryA/entryDetailsModal.vue';

export default defineComponent({
  components: {
    'a-table': Table,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    CarryOutFilled,
    PlusSquareFilled,
    SearchOutlined,
    SourceDetailsModal,
    EntryDetailsModal,
  },
  data() {
    const sourceDetailsModalShow = false;
    const selectedEntry = {};
    const entryDetailsModalShow = false;
    const selectedSource = {};
    const searchInput = ref();
    return {
      searchInput,
      selectedEntry,
      fileType: '',
      selectedSource,
      sourceDetailsModalShow,
      entryDetailsModalShow,
      columns: [
        {
          title: 'Nombre',
          key: 'name',
          dataIndex: 'source.name',
          width: 150,
          sorter: (a, b) => a.source.name.localeCompare(b.source.name),
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => {
            return record.source.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
        },
        {
          title: 'Referencia',
          dataIndex: 'source.ref',
          sorter: (a, b) => a.source.ref.localeCompare(b.source.ref),
          width: 300,
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
          key: 'operation',
          width: 100,
          slots: { customRender: 'operation' },
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
          title: 'Operación',
          key: 'operation',
          width: 70,
          slots: { customRender: 'operation' },
        },
      ],
      nestedData: [],
    };
  },
  async mounted() {
    const { data } = await Sources.findAllExtractionSources();
    const sources = data.findAllExtractionSources;
    for (let i = 0; i < sources.length; i++) {
      const e = sources[i];
      const nestedObject = {} as { source: {}; nestedEntryData: [] };
      nestedObject.source = e;
      const entry = await EntryA.getAllEntriesBySourceID(e.id);
      const entriesOfTheSource = entry.data.getAllEntriesBySourceID;
      nestedObject.nestedEntryData = entriesOfTheSource;
      this.nestedData.push(nestedObject);
    }
    console.log('this.nestedData', this.nestedData);
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: 'firstEntry',
      });
    },
    async deleteSourceByID(id) {
      const entry = await EntryA.getAllEntriesBySourceID(id);
      const entriesOfTheSource = entry.data.getAllEntriesBySourceID;
      for (let index = 0; index < entriesOfTheSource.length; index++) {
        const element = entriesOfTheSource[index];
        await EntryA.deleteEntryByID(element.id);
      }
      let s = await Sources.deleteSourceByID(id);
      if (s) {
        this.$message.success(
          'Se ha eliminado la Fuente y las Entradas extraídas de ella',
          10
        );

        this.nestedData = this.nestedData.filter(
          (item) => item.source.id !== id
        );
      } else {
        this.$message.error('Error, algo salió mal', 10);
      }
    },
    handleSearch: (confirm) => {
      confirm();
    },
    selectFilterOption(input: string, option: any) {
      return (
        option.props.value.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleReset: (clearFilters) => {
      clearFilters();
    },
    sourceDetailsModalShowMethod(source) {
      this.selectedSource = source;
      this.sourceDetailsModalShow = true;
    },
    closeSourceDetailsModal() {
      this.sourceDetailsModalShow = false;
    },
    goEntries() {
      this.$router.push({ name: 'entries' });
    },
    async selectSourceToWork(sourceID) {
      const { data } = await Sources.getSourceByID(sourceID);
      this.selectedSource = data.getSourceByID;
      this.$router.push({
        name: 'extractionTask',
        params: {
          source: sourceID,
        },
      });
    },
    onRowExpand(e) {
      console.log('e', e);
    },
    entryDetailsModalShowMethod(entry) {
      console.log('Entry esta:', entry);
      this.selectedEntry = entry;
      console.log('Entry esta:', entry);
      console.log('selectedEntry esta:', this.selectedEntry);
      this.fileType = this.selectedEntry.context.split('_')[0];
      this.entryDetailsModalShow = true;
    },
    closeEntryDetailsModal() {
      this.entryDetailsModalShow = false;
    },
    goToEditEntryA(selectedEntry) {
      this.$router.push({
        name: 'editEntryASource',
        params: {
          id: selectedEntry.id,
        },
      });
    },
    goToEditSource(selectedSource) {
      console.log('selectedSource', selectedSource);
      if (selectedSource.subType === 'Escrita') {
        this.$router.push({
          name: 'editSourceEscrita',
          params: {
            id: selectedSource.id,
          },
        });
      }
      if (selectedSource.subType === 'Oral') {
        this.$router.push({
          name: 'editSourceOral',
          params: {
            id: selectedSource.id,
          },
        });
      }
      if (selectedSource.type === 'Metalinguística') {
        this.$router.push({
          name: 'editSourceDictionary',
          params: {
            id: selectedSource.id,
          },
        });
      }
    },
  },
});
</script>
