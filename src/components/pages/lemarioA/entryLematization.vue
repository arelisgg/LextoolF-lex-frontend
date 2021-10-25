<template>
  <a-page-header>
    <template #title>
      <h4>Lematización de Unidades Fraseológicas Seleccionadas</h4>
    </template>
    <template #extra>
      <a-tooltip
        title="Finalizar Tarea de Lematización de Unidades Fraseológicas"
        placement="bottom"
      >
        <a-button
          key="back"
          type="primary"
          style="text-align: right"
          @click="goBack"
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
          v-for="candidateUF in candidateUFs"
          :key="candidateUF.id"
          :class="{ active: candidateUF.id === activeItem }"
          @click="handleSelectItem(candidateUF)"
        >
          {{ candidateUF.UF }}
        </a>
      </div>
    </div>
    <div class="selectionUF">
      <div v-show="entrySelected.UF === ''">
        <a-alert
          message="Seleccione una Unidad Fraseológica para lematizar en el menú lateral"
          type="info"
          show-icon
        />
      </div>
      <div v-show="entrySelected.UF !== ''">
        <h4>Información de la Entrada</h4>
        <a-form
          ref="formRef"
          :model="entrySelected"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item ref="UF" label="Unidad Fraseológica">
            <span>{{ entrySelected.UF }}</span>
          </a-form-item>
          <a-form-item ref="frecuency" label="Frecuencia de Uso">
            <span>{{ entrySelected.frecuency }}</span>
          </a-form-item>
          <a-form-item v-if="entryVariations.length > 0" label="Variaciones">
            <div
              v-for="entryVariation in entryVariations"
              :key="entryVariation.id"
            >
              <span>{{ entryVariation.variationUF }}</span>
            </div>
          </a-form-item>
          <a-form-item ref="context" label="Contexto" name="context">
            <a-image
              v-show="entrySelected.context.split('_')[0] === 'Image'"
              :src="MINIO_URL_A + '/' + entrySelected.context"
              alt="Contexto de Uso"
              :style="{
                border: '2px solid #fff',
                borderRadius: '10px',
                boxShadow: '5px 5px 5px #ccc',
              }"
            ></a-image>
          </a-form-item>
          <a-form-item
            v-for="(lemma, index) in entrySelected.lemma"
            :key="index"
            :label="'Lema ' + (index + 1)"
          >
            <a-input
              v-model:value="entrySelected.lemma[index].lemma"
              placeholder="Lemma de la Unidad Fraseológica"
              style="width: 300px; margin-right: 10px"
            ></a-input>
            <PlusOutlined
              v-if="entrySelected.lemma.length - 1 === index"
              class="dynamic-add-button"
              :disabled="entrySelected.lemma.length === 1"
              :style="{ color: '#1890ff' }"
              @click="addLemma"
            />
            <MinusCircleFilled
              v-if="entrySelected.lemma.length > 1"
              class="dynamic-delete-button"
              :disabled="entrySelected.lemma.length === 1"
              :style="{ color: 'red', marginLeft: '5px' }"
              @click="removeLemma(lemma)"
            />
          </a-form-item>
          <a-form-item ref="letter" label="Letras">
            <div class="container ml-4 w-100">
              <a-transfer
                :titles="['Sin agregar', 'Agregadas']"
                :data-source="letters"
                :render="(letter) => letter.title"
                :filter-option="filterOptionLettersTransfer"
                show-search
                :target-keys="entrySelected.letter"
                :locale="transferLocale"
                class="w-100"
                @change="handleChangeLettersTransfer"
              ></a-transfer>
            </div>
          </a-form-item>
        </a-form>
        <div style="text-align: right; margin-top: 24px">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="submit"
          >
            Guardar
          </a-button>
          <a-button key="back" style="margin-left: 8px" @click="goBack">
            Cancelar
          </a-button>
        </div>
      </div>
    </div>
  </a-space>
</template>
<script lang="ts">
import {
  EyeFilled,
  DeleteFilled,
  PlusOutlined,
  MinusCircleFilled,
  DownloadOutlined,
  EditFilled,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, watch } from 'vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';
import CarrouselImages from '../ocurrenceRecordA/carrouselImages.vue';
import { MINIO_URL_A as minio_url } from '@/utils/minIO.ts';

export default defineComponent({
  components: {
    PlusOutlined,
    DeleteFilled,
    EyeFilled,
    EditFilled,
    SearchOutlined,
    MinusCircleFilled,
    DownloadOutlined,
    'carrousel-images': CarrouselImages,
  },
  setup() {
    const activeKey = ref([]);
    watch(activeKey, (val) => {
      console.log(val);
    });
    const MINIO_URL_A = minio_url;
    return {
      activeKey,
      MINIO_URL_A,
    };
  },
  data() {
    const transferLocale = {
      itemUnit: '',
      itemsUnit: '',
      notFoundContent: 'No hay letras',
      searchPlaceholder: 'Buscar Letra',
    };
    const letters = [
      { title: 'A', key: 'A' },
      { title: 'B', key: 'B' },
      { title: 'C', key: 'C' },
      { title: 'D', key: 'D' },
      { title: 'E', key: 'E' },
      { title: 'F', key: 'F' },
      { title: 'G', key: 'G' },
      { title: 'H', key: 'H' },
      { title: 'I', key: 'I' },
      { title: 'J', key: 'J' },
      { title: 'K', key: 'K' },
      { title: 'L', key: 'L' },
      { title: 'M', key: 'M' },
      { title: 'N', key: 'N' },
      { title: 'Ñ', key: 'Ñ' },
      { title: 'O', key: 'O' },
      { title: 'P', key: 'P' },
      { title: 'Q', key: 'Q' },
      { title: 'R', key: 'R' },
      { title: 'S', key: 'S' },
      { title: 'T', key: 'T' },
      { title: 'U', key: 'U' },
      { title: 'V', key: 'V' },
      { title: 'W', key: 'W' },
      { title: 'X', key: 'X' },
      { title: 'Y', key: 'Y' },
      { title: 'Z', key: 'Z' },
    ];
    const selectedLetters = [];
    const entrySelected = {
      lemma: [{ lemma: '' }],
      letter: '',
      context: '',
      UF: '',
      source: '',
      selected: false,
      criteria: '',
      frecuency: '',
      included: '',
      documentation: [],
    };
    const entrySource = {};
    const images = [];
    const loading = false;
    return {
      loading,
      transferLocale,
      letters,
      selectedLetters,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      entrySelected,
      entrySource,
      sourceType: '',
      sourceSupport: '',
      images,
      candidateUFs: [],
      entryVariations: [],
      activeItem: null,
    };
  },
  async mounted() {
    const { data } = await EntryA.getAllIncludedEntries();
    this.candidateUFs = data.getAllIncludedEntries;
  },
  methods: {
    removeLemma(lemma) {
      let index = this.entrySelected.lemma.indexOf(lemma);
      if (index !== -1) {
        this.entrySelected.lemma.splice(index, 1);
      }
    },
    addLemma() {
      this.entrySelected.lemma.push({ lemma: '' });
    },
    handleChangeLettersTransfer(targetKeys) {
      this.entrySelected.letter = targetKeys;
    },
    filterOptionLettersTransfer(inputValue, option) {
      return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    },
    goBack() {
      this.$router.push({ name: 'lemario' });
    },
    async submit() {
      console.log('this.entrySelected', this.entrySelected);
      this.loading = true;
      let u = await EntryA.updateEntryByID(this.entrySelected);
      const updated = u.data.updateEntryByID;
      console.log('updated', updated);
      if (updated) {
        this.$message.success(
          'La Unidad fraseológica se guardó correctamente',
          10
        );
        this.candidateUFs = this.candidateUFs.filter(
          (item) => item.id !== this.entrySelected.id
        );
        this.resetForm();
      } else {
        this.$message.error('Error, algo salió mal', 10);
      }
    },
    resetForm() {
      this.entrySelected = {
        lemma: [{ lemma: '' }],
        letter: [],
        context: '',
        UF: '',
        source: '',
        selected: false,
        criteria: '',
        frecuency: '',
        included: '',
        documentation: [],
      };
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
    async handleSelectItem(candidateUF) {
      this.entrySelected = candidateUF;
      this.activeItem = candidateUF.id;

      //Variaciones
      this.entryVariations = [];
      let documentation = this.entrySelected.documentation;
      for (let index = 0; index < documentation.length; index++) {
        const element = documentation[index];
        const or = await OcurrenceRecord.getOcurrenceRecordByID(element);
        console.log(
          'or.data.getOcurrenceRecordByID',
          or.data.getOcurrenceRecordByID
        );
        if (or.data.getOcurrenceRecordByID.isVariation) {
          this.entryVariations.push(or.data.getOcurrenceRecordByID);
        }
      }
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

.selectionUF {
  position: relative;
  display: inline-block;
  padding-left: '24px';
  border-radius: 2px;
  padding: 12px 16px;
  border: solid 1px #ddd;
  width: 800px;
}

.dropdown-content {
  display: show;
  background-color: #f6f6f6;
  width: 250px;
  height: 420px;
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
