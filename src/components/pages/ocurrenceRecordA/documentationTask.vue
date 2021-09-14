<template>
  <h4>Documentar Unidades Fraseológicas Candidatas</h4>
  <div style="text-align: right">
    <a-button key="back" type="primary" @click="goEntries">Finalizar</a-button>
  </div>
  <a-space direction="horizontal" align="end">
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
            <h4 style="padding: 50px">
              Seleccione una Unidad Fraseológica Candidata en el menu lateral
            </h4>
          </div>
          <div v-show="entrySelected.UF !== ''">
            <a-table
              :data-source="entryROcurrences"
              :columns="columnsO"
              size="small"
              :pagination="{ pageSize: 20 }"
              :scroll="{ y: 190 }"
              :row-key="(record) => record.id"
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
                <a-popconfirm
                  v-if="entrySelected.documentation.length"
                  title="Seguro de Eliminar?"
                  @confirm="deleteRoByID(record.id)"
                >
                  <a>
                    <DeleteFilled
                      :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
                    />
                  </a>
                </a-popconfirm>
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
                  <a v-if="record.status === 'En Proceso'">
                    <EditFilled
                      :style="{
                        fontSize: '20px',
                        color: '#08c',
                        margin: '5px',
                      }"
                    />
                  </a>
                </a-tooltip>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Registro de Variación" force-render>
          <div v-show="entrySelected.UF === ''">
            <h4 style="padding: 50px">
              Seleccione una Unidad Fraseológica Candidata en el menu lateral
            </h4>
          </div>
          <div v-show="entrySelected.UF !== ''">
            <a-table
              :data-source="entryRVariations"
              :columns="columnsV"
              size="small"
              :pagination="{ pageSize: 20 }"
              :scroll="{ y: 190 }"
              :row-key="(record) => record.id"
              bordered
            >
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
                  <a v-if="record.status === 'En Proceso'">
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
                  v-if="entryVariations.length"
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
  <ocurrence-record-details-modal
    v-model:visible="ocurrenceRecordDetailsShow"
    :selected-ocurrence-record="selectedOcurrenceRecord"
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
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';

export default defineComponent({
  components: {
    PlusSquareFilled,
    DeleteFilled,
    EyeFilled,
    EditFilled,
    SearchOutlined,
    OcurrenceRecordDetailsModal,
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
        title: 'CORPUS/Tesoro',
        dataIndex: 'corpus_treasure',
        key: 'corpus_treasure',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.corpus_treasure
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: 'No. Apariciones',
        dataIndex: 'numAppearance',
        key: 'numAppearance',
        width: 100,
        sorter: true,
        slots: { customRender: 'numAppearance' },
      },
      {
        title: 'No. Fuentes',
        dataIndex: 'numSources',
        key: 'numSources',
        width: 100,
        sorter: true,
        slots: { customRender: 'numSources' },
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.status
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
    ];
    const columnsV = [
      {
        title: 'Variación',
        dataIndex: 'variationUF',
        key: 'variationUF',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.variationUF
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: 'CORPUS/Tesoro',
        dataIndex: 'corpus_treasure',
        key: 'corpus_treasure',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.corpus_treasure
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: 'No. Apariciones',
        dataIndex: 'numAppearance',
        key: 'numAppearance',
        width: 100,
        sorter: true,
        slots: { customRender: 'numAppearance' },
      },
      {
        title: 'No. Fuentes',
        dataIndex: 'numSources',
        key: 'numSources',
        width: 100,
        sorter: true,
        slots: { customRender: 'numSources' },
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.status
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
    ];
    const ocurrenceRecordDetailsShow = false;
    const selectedOcurrenceRecord = {};
    return {
      entrySelected,
      columnsO,
      columnsV,
      ocurrenceRecordDetailsShow,
      selectedOcurrenceRecord,
      entryRVariations: [],
      entryROcurrences: [],
      canditateUFs: [],
    };
  },
  async mounted() {
    const { data } = await EntryA.findAllEntriesWithDocs();
    this.canditateUFs = data.findAllEntriesWithDocs;
    console.log('this.entrySelected', this.entrySelected);
  },
  methods: {
    ocurrenceRecordDetailsShowMethod(record) {
      this.selectedOcurrenceRecord = record;
      this.ocurrenceRecordDetailsShow = !this.ocurrenceRecordDetailsShow;
    },
    callback(key) {
      console.log(key);
    },
    async onAddOR() {
      const { data } = await EntryA.getEntryByIDWithDocs(this.entrySelected.id);
      console.log('this.entrySelected.id', this.entrySelected.id);
      this.$store.entryA = data.getEntryByIDWithDocs;
      this.$router.push({ name: 'newOcurrenceRecord' });
    },
    async onAddVR() {
      const { data } = await EntryA.getEntryByIDWithDocs(this.entrySelected.id);
      console.log('this.entrySelected.id', this.entrySelected.id);
      this.$store.entryA = data.getEntryByIDWithDocs;
      this.$router.push({ name: 'newVariationRecord' });
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
      let d = this.entrySelected.documentation;
      let index = 0;
      if (d !== null) {
        for (index; index < d.length; index++) {
          const element = d[index];
          const { data } = await OcurrenceRecord.getOcurrenceRecordByID(
            element
          );
          const or = data.getOcurrenceRecordByID;
          console.log('or', or);
          if (or.isVariation) {
            this.entryRVariations.push(or);
          } else {
            this.entryROcurrences.push(or);
          }
        }
        console.log('this.entryROcurrences', this.entryROcurrences);
        console.log('this.entryRVariations', this.entryRVariations);
      }
    },
    goEntries() {
      this.$router.push({ name: 'entries' });
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
  height: 400px;
  min-width: 800px;
  min-height: 400px;
}

.dropdown-content {
  display: show;
  background-color: #f6f6f6;
  min-width: 250px;
  min-height: 356px;
  width: 250px;
  height: 356px;
  overflow: auto;
  border: 1px solid #ddd;
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
</style>
