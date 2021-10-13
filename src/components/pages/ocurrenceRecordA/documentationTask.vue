<template>
  <a-page-header>
    <template #title>
      <h4>Documentar Unidades Fraseológicas Candidatas</h4>
    </template>
    <template #extra>
      <a-tooltip
        title="Finalizar Tarea de Documentación Unidades Fraseológicas Candidatas"
        placement="bottom"
      >
        <a-button
          key="back"
          type="primary"
          style="text-align: right"
          @click="goEntries"
        >
          Finalizar
        </a-button>
      </a-tooltip>
    </template>
  </a-page-header>
  <a-space direction="horizontal" align="start">
    <div class="dropdown">
      <div id="myDropdown" class="dropdown-content">
        <a-input-search
          id="myInput"
          placeholder="input search text"
          @keyup="filterFunction"
        />
        <a
          v-for="canditateUF in canditateUFs"
          :key="canditateUF.id"
          :class="{ active: canditateUF.id === activeItem }"
          @click="handleSelectItem(canditateUF)"
        >
          {{ canditateUF.UF }}
        </a>
      </div>
    </div>
    <div class="documentationUF">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Registro de Ocurrencias">
          <div v-show="entrySelected.UF === ''">
            <a-alert
              message="Seleccione una Unidad Fraseológica Candidata en el menú lateral"
              type="info"
              show-icon
            />
          </div>
          <div v-show="entrySelected.UF !== ''">
            <a-table
              :data-source="entryROcurrences"
              :columns="columnsO"
              size="small"
              :pagination="{ pageSize: 10 }"
              :scroll="{ y: 282 }"
              :row-key="(record) => record.or.id"
              bordered
            >
              <template #title>
                Registro de Ocurrencias
                <a-tooltip
                  title="Agregar Registro de Ocurrencias"
                  placement="right"
                >
                  <PlusSquareFilled
                    :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
                    @click="onAddOR"
                  />
                </a-tooltip>
              </template>
              <template #operation="{ record }">
                <a-tooltip
                  title="Detalles del Registro de Ocurrencias"
                  placement="bottom"
                >
                  <a @click="roDetailsModalShowMethod(record)">
                    <EyeFilled
                      :style="{
                        fontSize: '20px',
                        color: '#08c',
                        margin: '5px',
                      }"
                    />
                  </a>
                </a-tooltip>
                <a-tooltip
                  title="Editar del estudio fraseologico"
                  placement="bottom"
                >
                  <a>
                    <EditFilled
                      :style="{
                        fontSize: '20px',
                        color: '#08c',
                        margin: '5px',
                      }"
                    />
                  </a>
                </a-tooltip>
                <a-popconfirm
                  v-if="entrySelected.documentation.length"
                  title="Seguro de Eliminar?"
                  @confirm="deleteRoByID(record)"
                >
                  <a>
                    <DeleteFilled
                      :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
                    />
                  </a>
                </a-popconfirm>
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
                      (e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
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
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Registro de Variación" force-render>
          <div v-show="entrySelected.UF === ''">
            <a-alert
              message="Seleccione una Unidad Fraseológica Candidata en el menú lateral"
              type="info"
              show-icon
            />
          </div>
          <div v-show="entrySelected.UF !== ''">
            <a-table
              :data-source="entryRVariations"
              :columns="columnsV"
              size="small"
              :pagination="{ pageSize: 10 }"
              :scroll="{ y: 282 }"
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
                      (e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
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
              <template #title>
                Registro de Variaciones
                <a-tooltip
                  title="Agregar Registro de Variación"
                  placement="right"
                >
                  <PlusSquareFilled
                    :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
                    @click="onAddVR"
                  />
                </a-tooltip>
              </template>
              <template #operation="{ record }">
                <a-tooltip
                  title="Editar del estudio fraseologico"
                  placement="bottom"
                >
                  <a>
                    <EditFilled
                      :style="{
                        fontSize: '20px',
                        color: '#08c',
                        margin: '5px',
                      }"
                    />
                  </a>
                </a-tooltip>
                <a-tooltip
                  title="Detalles del Registro de Variación"
                  placement="bottom"
                >
                  <a @click="rvDetailsModalShowMethod(record)">
                    <EyeFilled
                      :style="{
                        fontSize: '20px',
                        color: '#08c',
                        margin: '5px',
                      }"
                    />
                  </a>
                </a-tooltip>
                <a-popconfirm
                  v-if="entryRVariations.length"
                  title="Seguro de Eliminar?"
                  @confirm="deleteRvByID(record.id)"
                >
                  <a>
                    <DeleteFilled
                      :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
                    />
                  </a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-space>
  <variation-record-details-modal
    v-model:visible="variationRecordDetailsModalShow"
    :source-type="sourceType"
    :source-support="sourceSupport"
    :source-bloque="sourceBloque"
    :images="images"
    :selected-variation-record="selectedVariationRecord"
    @close-modal="closeRVDetailsModal"
  ></variation-record-details-modal>
  <ocurrence-record-details-modal
    v-model:visible="ocurrenceRecordDetailsShow"
    :source-type="sourceType"
    :source-support="sourceSupport"
    :source-bloque="sourceBloque"
    :images="images"
    :selected-ocurrence-record="selectedOcurrenceRecord"
    @close-modal="closeRODetailsModal"
  ></ocurrence-record-details-modal>
</template>
<script lang="ts">
import {
  EyeFilled,
  DeleteFilled,
  PlusSquareFilled,
  EditFilled,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import OcurrenceRecordDetailsModal from './ocurrenceRecordDetailsModal.vue';
import VariationRecordDetailsModal from './variationRecordDetailsModal.vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';

export default defineComponent({
  components: {
    PlusSquareFilled,
    DeleteFilled,
    EyeFilled,
    EditFilled,
    SearchOutlined,
    'ocurrence-record-details-modal': OcurrenceRecordDetailsModal,
    'variation-record-details-modal': VariationRecordDetailsModal,
  },
  data() {
    const entrySelected = {
      lemma: '',
      letter: '',
      context: '',
      UF: '',
      source: '',
      selected: false,
      documentation: [],
    };
    const columnsO = [
      {
        title: 'Nombre de la Fuente',
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
        title: 'Referencia de la Fuente',
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
        title: 'No. Apariciones',
        dataIndex: 'or.numAppearance',
        key: 'numAppearance',
        width: 100,
        sorter: (a, b) => a.or.numAppearance.localeCompare(b.or.numAppearance),
      },
      {
        title: '',
        key: 'operation',
        width: 50,
        slots: { customRender: 'operation' },
      },
    ];
    const columnsV = [
      {
        title: 'Variación',
        dataIndex: 'or.variationUF',
        key: 'variationUF',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.or.variationUF
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: 'Nombre de la Fuente',
        key: 'name',
        dataIndex: 'source.name',
        width: 100,
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
        title: 'Referencia de la Fuente',
        dataIndex: 'source.ref',
        sorter: (a, b) => a.source.ref.localeCompare(b.source.ref),
        width: 250,
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
        title: 'No. Apariciones',
        dataIndex: 'or.numAppearance',
        key: 'numAppearance',
        width: 100,
        sorter: (a, b) => a.or.numAppearance.localeCompare(b.or.numAppearance),
      },
      {
        title: '',
        key: 'operation',
        width: 50,
        slots: { customRender: 'operation' },
      },
    ];
    const ocurrenceRecordDetailsShow = false;
    const variationRecordDetailsModalShow = false;
    const selectedOcurrenceRecord = {};
    const selectedVariationRecord = {};
    const sourceType = '';
    const sourceSupport = '';
    const sourceBloque = '';
    const images = [];
    return {
      entrySelected,
      images,
      sourceType,
      sourceSupport,
      sourceBloque,
      columnsO,
      columnsV,
      ocurrenceRecordDetailsShow,
      variationRecordDetailsModalShow,
      selectedOcurrenceRecord,
      selectedVariationRecord,
      entryRVariations: [],
      entryROcurrences: [],
      canditateUFs: [],
      activeItem: null,
    };
  },
  async mounted() {
    const { data } = await EntryA.getAllEntriesToDocument();
    this.canditateUFs = data.getAllEntriesToDocument;
  },
  methods: {
    async deleteRvByID(record) {
      const entryID = this.entrySelected.id;
      const vrID = record.or.id;
      await EntryA.deleteEntryDocByID(entryID, vrID);
      await OcurrenceRecord.deleteOcurrenceRecordByID(vrID);
      await Sources.deleteSourceByID(record.or.source);
      this.entrySelected.documentation = this.entrySelected.documentation.filter(
        (item) =>
          record.or.id !== item.or.id ||
          record.or.variationUF !== item.or.variationUF
      );
    },
    async deleteRoByID(record) {
      const entryID = this.entrySelected.id;
      const orID = record.or.id;
      await EntryA.deleteEntryDocByID(entryID, orID);
      await OcurrenceRecord.deleteOcurrenceRecordByID(orID);
      await Sources.deleteSourceByID(record.or.source);
      this.entryROcurrences = this.entryROcurrences.filter(
        (item) => record.or.id !== item.or.id
      );
    },
    callback(key) {
      console.log(key);
    },
    async onAddOR() {
      const { data } = await EntryA.getEntryByIDWithDocs(this.entrySelected.id);
      this.$store.entryA = data.getEntryByIDWithDocs;
      this.$router.push({
        name: 'newOcurrenceRecord',
        params: {
          id: this.entrySelected.id,
        },
      });
    },
    async onAddVR() {
      const { data } = await EntryA.getEntryByIDWithDocs(this.entrySelected.id);
      this.$store.entryA = data.getEntryByIDWithDocs;
      this.$router.push({
        name: 'newVariationRecord',
        params: {
          id: this.entrySelected.id,
        },
      });
    },
    filterFunction() {
      var input, filter, a, i, div, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      div = document.getElementById('myDropdown');
      a = div.getElementsByTagName('a');
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = '';
        } else {
          a[i].style.display = 'none';
        }
      }
    },
    async handleSelectItem(canditateUF) {
      this.entrySelected = canditateUF;
      this.activeItem = canditateUF.id;
      let d = this.entrySelected.documentation;
      this.entryRVariations = [];
      this.entryROcurrences = [];
      let index = 0;
      if (d !== null) {
        for (index; index < d.length; index++) {
          const element = d[index];
          const { data } = await OcurrenceRecord.getOcurrenceRecordByID(
            element
          );
          if (data.getOcurrenceRecordByID !== null) {
            const or = {} as {
              or: {
                id: String;
                source: String;
                numAppearance: Number;
                appearances: [];
                isVariation: Boolean;
                variationUF: String;
              };
              source: {};
            };
            or.or = data.getOcurrenceRecordByID;
            const s = await Sources.getSourceByID(or.or.source);
            or.source = s.data.getSourceByID;

            if (or.or.isVariation) {
              this.entryRVariations.push(or);
            } else {
              this.entryROcurrences.push(or);
            }
          }
        }
        console.log('this.entryROcurrences', this.entryROcurrences);
        console.log('this.entryRVariations', this.entryRVariations);
      }
    },
    goEntries() {
      this.$router.push({ name: 'entries' });
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
    roDetailsModalShowMethod(record) {
      this.selectedOcurrenceRecord = record;
      this.sourceType = record.source.type;
      this.images = record.or.appearances;
      this.sourceSupport = record.source.support;
      this.sourceBloque = record.source.bloque;
      this.ocurrenceRecordDetailsShow = true;
    },
    closeRODetailsModal() {
      this.ocurrenceRecordDetailsShow = false;
    },
    closeRVDetailsModal() {
      this.variationRecordDetailsModalShow = false;
    },
    rvDetailsModalShowMethod(record) {
      this.selectedVariationRecord = record;
      this.sourceType = record.source.type;
      this.images = record.or.appearances;
      this.sourceSupport = record.source.support;
      this.sourceBloque = record.source.bloque;
      this.variationRecordDetailsModalShow = true;
    },
  },
});
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
  overflow: auto;
}

.documentationUF {
  position: relative;
  display: inline-block;
  background: '#fff';
  padding-left: '24px';
  width: 800px;
  height: 493px;
}

.dropdown-content {
  display: show;
  margin-top: 46px;
  background-color: #f6f6f6;
  width: 250px;
  height: 393px;
  overflow: auto;
  border-radius: 2px;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: #ddd;
}

.dropdown a.active {
  background-color: #ddd;
}
</style>
