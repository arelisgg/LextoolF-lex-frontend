<template>
  <h4>Editar Datos de la Fuente</h4>
  <br />
  <div>
    <a-form ref="formRefS" :model="sourceToEdit" :rules="rules">
      <a-form-item
        ref="name"
        label="Nombre de la Fuente"
        name="name"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="sourceToEdit.name"
          placeholde="Nombre de la Fuente"
          :style="{ width: '350px' }"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="ref"
        label="Referencia"
        name="ref"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="sourceToEdit.ref"
          placeholder="Referencia de la Fuente"
          :style="{ width: '350px' }"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        ref="URL"
        label="URL de la Fuente"
        name="URL"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="sourceToEdit.URL"
          placeholde="URL de la Fuente"
          :style="{ width: '350px' }"
        ></a-input>
      </a-form-item>
      <a-form-item
        ref="dictionaryType"
        label="Tipo de diccionario"
        name="dictionaryType"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-space direction="horizontal" align="center">
          <a-select
            v-model:value="sourceToEdit.dictionaryType"
            :style="{ width: '350px' }"
            @change="dictionaryTypeSelected"
          >
            <a-select-option
              v-for="dictionaryType in dictionariesTypes"
              :key="dictionaryType.nombre"
            >
              {{ dictionaryType.nombre }}
            </a-select-option>
          </a-select>
          <a-tooltip title="Añadir Tipo de Diccionario" placement="bottom">
            <PlusOutlined
              class="dynamic-add-button"
              :style="{ color: '#1890ff' }"
              @click="showModalD"
            />
          </a-tooltip>
        </a-space>
      </a-form-item>
      <a-form-item
        ref="century"
        label="Siglo"
        name="century"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input
          v-model:value="sourceToEdit.century"
          placeholde="Siglo"
          :style="{ width: '350px' }"
        ></a-input>
      </a-form-item>
      <div
        v-show="
          sourceToEdit.support === 'Internet' &&
          sourceToEdit.type === 'Metalinguística'
        "
      >
        <a-form-item
          ref="library_name"
          label="Biblioteca Virtual"
          name="library_name"
          :label-col="labelColModal"
          :wrapper-col="wrapperColModal"
        >
          <a-input
            v-model:value="sourceToEdit.library_name"
            placeholde="Nombre de la biblioteca Virtual"
            :style="{ width: '350px' }"
          ></a-input>
        </a-form-item>
        <a-form-item
          ref="url_location"
          label="Localización URL"
          name="url_location"
          :label-col="labelColModal"
          :wrapper-col="wrapperColModal"
        >
          <a-input
            v-model:value="sourceToEdit.url_location"
            placeholde="Localización URL"
            :style="{ width: '350px' }"
          ></a-input>
        </a-form-item>
      </div>
    </a-form>
  </div>
  <div style="text-align: right">
    <a-button
      key="submit"
      type="primary"
      :loading="loading"
      style="margin-left: 8px"
      @click="editSource"
    >
      Editar
    </a-button>
    <a-button key="back" style="margin-left: 8px" @click="goBack">
      Cancelar
    </a-button>
  </div>
  <add-dictionary-type-modal
    v-model:visible="addDictionaryTypeModalShow"
    @close-modal="showModalD"
    @add-dictionary-type="addDictionaryType"
  ></add-dictionary-type-modal>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import moment from 'moment';

import AddDictionaryTypeModal from '../../entryA/Nomenclators/addDictionaryTypeModal.vue';

import { defineComponent, ref } from 'vue';
import {
  InboxOutlined,
  PlusOutlined,
  MinusCircleFilled,
  PlusSquareFilled,
  DoubleRightOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
  EyeFilled,
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons-vue';
import { EntryA } from '@/graphql/modules/entryA/model';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import { Nomenclator } from '@/graphql/modules/nomenclator/model.ts';

export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleFilled,
    PlusSquareFilled,
    DoubleRightOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    EyeFilled,
    EditFilled,
    DeleteFilled,
    InboxOutlined,
    'add-dictionary-type-modal': AddDictionaryTypeModal,
  },
  data() {
    const rules = {
      name: [
        {
          required: true,
          message: 'Por favor escriba el nombre de la fuente',
          trigger: 'blur',
        },
      ],
      ref: [
        {
          required: true,
          message: 'Por favor escriba la referencia de la fuente',
          trigger: 'blur',
        },
      ],
    };
    const sourceToEdit = {
      name: '',
      ref: '',
      type: '',
      subType: '',
      support: '',
      stage: '',

      // linguisticas libro o prensa
      bloque: '',
      theme: '',
      provice_p: '',
      session_p: '',
      magazine_type_p: '',

      //linguisticas internet
      URL: '',

      //linguisticas audio o video
      cantMin: '',
      broadcastMedium: '',
      typology: '',
      speaker: '',
      recording_date: '',
      broadcast_date: '',

      //metalinguisticas
      dictionaryType: '',
      century: '',
      library_name: '',
      url_location: '',
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formRefS = ref();
    const loading = false;
    const entryA = {
      lemma: [{ lemma: '' }],
      letter: [],
      context: '',
      UF: '',
      source: '',
      selected: false,
      criteria: '',
      frecuency: '',
      included: '',
    };
    const addDictionaryTypeModalShow = false;
    return {
      // fuente ******
      addDictionaryTypeModalShow,
      dictionariesTypes: [],
      formRefS,
      formItemLayoutWithOutLabelModal,
      sourceToEdit,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
      // entry *******
      loading,
      entryA,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };
  },
  async mounted() {
    const dt = await Nomenclator.getAllDictionaryTypes();
    this.dictionariesTypes = dt.data.getAllDictionaryTypes;

    //sourceToEdit
    const id = this.$route.params.id.toString();
    const { data } = await Sources.getSourceByID(id);
    this.sourceToEdit = data.getSourceByID;
    console.log('this.sourceToEdit', this.sourceToEdit);
  },
  methods: {
    editSource() {
      console.log(this.sourceToEdit);
      this.loading = true;
      console.log('this.sourceToEdit', this.sourceToEdit);
      Sources.updateSourceByID(this.sourceToEdit);
      this.$router.push({ name: 'firstExtraction' });
    },
    goBack() {
      this.$router.push({ name: 'firstExtraction' });
    },
    showModalD() {
      this.addDictionaryTypeModalShow = !this.addDictionaryTypeModalShow;
    },
    async addDictionaryType(newDictionaryType) {
      this.dictionariesTypes.push(newDictionaryType);
      await Nomenclator.addDictionaryType(newDictionaryType);
      this.showModalD();
    },
    dictionaryTypeSelected(value) {
      console.log('value', value);
      this.sourceToEdit.dictionaryType = value;
    },
  },
});
</script>
