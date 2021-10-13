<template>
  <a-card hoverable title="Fuente Seleccionada">
    <a-descriptions>
      <a-descriptions-item label="Nombre">
        {{ selectedSource.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Referencia" :span="2">
        {{ selectedSource.ref }}
      </a-descriptions-item>
      <a-descriptions-item label="Tipo">
        {{ selectedSource.type }}
      </a-descriptions-item>
      <a-descriptions-item label="Medio">
        {{ selectedSource.subType }}
      </a-descriptions-item>
      <a-descriptions-item label="Soporte">
        {{ selectedSource.support }}
      </a-descriptions-item>
    </a-descriptions>
    <div v-if="selectedSource.type === 'Linguística'">
      <a-descriptions>
        <a-descriptions-item label="Bloque">
          {{ selectedSource.bloque }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="selectedSource.bloque === 'NoFicción'"
          label="Tema"
        >
          {{ selectedSource.theme }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="selectedSource.bloque === 'Ficción'"
          label="Género"
        >
          {{ selectedSource.theme }}
        </a-descriptions-item>
      </a-descriptions>
      <div v-if="selectedSource.support === 'Publicación Periódica'">
        <a-descriptions>
          <a-descriptions-item label="Sección del Periódico">
            {{ selectedSource.session_p }}
          </a-descriptions-item>
          <a-descriptions-item label="Tipo de revista">
            {{ selectedSource.magazine_type_p }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div v-if="selectedSource.subType === 'Oral'">
        <a-descriptions>
          <a-descriptions-item label="Descripción del Hablante" :span="2">
            {{ selectedSource.speaker }}
          </a-descriptions-item>
          <a-descriptions-item label="Medio de Difusión">
            {{ selectedSource.broadcastMedium }}
          </a-descriptions-item>
          <a-descriptions-item label="Tipología">
            {{ selectedSource.typology }}
          </a-descriptions-item>
          <a-descriptions-item label="Duración">
            {{ selectedSource.cantMin }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha de grabación">
            {{ selectedSource.recording_date }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha de emisión">
            {{ selectedSource.broadcast_date }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <div v-if="selectedSource.type === 'Metalinguística'">
      <a-descriptions>
        <a-descriptions-item label="Tipo de Diccionario">
          {{ selectedSource.dictionaryType }}
        </a-descriptions-item>
        <a-descriptions-item label="Siglo">
          {{ selectedSource.century }}
        </a-descriptions-item>
        <a-descriptions-item label="Nombre de la biblioteca">
          {{ selectedSource.library_name }}
        </a-descriptions-item>
        <a-descriptions-item label="Localización URL">
          {{ selectedSource.url_location }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-card>
  <br />
  <a-table
    :data-source="entriesOfTheSource"
    :columns="columns"
    size="small"
    :row-key="(record) => record.id"
    bordered
  >
    <template #title>
      Unidades Fraseológicas Candidatas
      <a-tooltip title="Agregar UF" placement="right">
        <PlusSquareFilled
          :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
          @click="onAdd"
        />
      </a-tooltip>
    </template>
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
      <a-popconfirm
        v-if="entriesOfTheSource.length"
        title="Seguro de Eliminar?"
        @confirm="deleteEntryByID(record.id)"
      >
        <a>
          <DeleteFilled
            :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
          />
        </a>
      </a-popconfirm>
    </template>
  </a-table>
  <br />
  <div style="text-align: right">
    <a-button key="back" type="primary" @click="goSources">Finalizar</a-button>
  </div>
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
  DeleteFilled,
  EditFilled,
  PlusSquareFilled,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import EntryDetailsModal from './entryDetailsModal.vue';

export default defineComponent({
  components: {
    PlusSquareFilled,
    DeleteFilled,
    EditFilled,
    EyeFilled,
    EntryDetailsModal,
  },
  data() {
    const selectedEntry = {};
    const fileType = '';
    const entryDetailsModalShow = false;
    const columns = [
      {
        title: 'UF',
        dataIndex: 'UF',
        key: 'UF',
        sorter: true,
        slots: { customRender: 'UF' },
      },
      {
        title: 'Operación',
        key: 'operation',
        width: 150,
        slots: { customRender: 'operation' },
      },
    ];
    return {
      selectedEntry,
      fileType,
      entryDetailsModalShow,
      columns,
      selectedSource: {},
      entriesOfTheSource: [],
    };
  },
  async mounted() {
    const sID = this.$route.params.source.toString();
    console.log('sID', sID);
    const s = await Sources.getSourceByID(sID);
    console.log('s', s);
    this.selectedSource = s.data.getSourceByID;
    console.log('this.selectedSource', this.selectedSource);

    const { data } = await EntryA.getAllEntriesBySourceID(sID);
    this.entriesOfTheSource = data.getAllEntriesBySourceID;
  },
  methods: {
    async deleteEntryByID(id) {
      let index = 0;
      let found = false;
      for (index; index < this.entriesOfTheSource.length && !found; index++) {
        const element = this.entriesOfTheSource[index];
        if (element.id === id) {
          found = true;
        }
      }
      this.entriesOfTheSource = this.entriesOfTheSource.filter(
        (item) => item.id !== id
      );
      await EntryA.deleteEntryByID(id);
    },
    selectFilterOption(input: string, option: any) {
      return (
        option.props.value.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    onAdd() {
      this.$router.push({
        name: 'newEntryA',
        params: {
          source: this.selectedSource.id,
        },
      });
    },
    entryDetailsModalShowMethod(entry) {
      this.selectedEntry = entry;
      this.fileType = this.selectedEntry.context.split('_')[0];
      this.entryDetailsModalShow = true;
      console.log('selectedEntry esta:', this.selectedEntry);
    },
    closeEntryDetailsModal() {
      this.entryDetailsModalShow = false;
    },
    goSources() {
      this.$router.push({ name: 'firstExtraction' });
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
