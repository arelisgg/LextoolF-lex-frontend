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
        ref="bloque"
        label="Bloque de la Fuente"
        name="bloque"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-select
          v-model:value="sourceToEdit.bloque"
          :style="{ width: '350px' }"
          @change="handleBloqueChange"
        >
          <a-select-option v-for="bloque in bloques" :key="bloque">
            {{ bloque }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        ref="theme"
        label="Clasificación temática"
        name="theme"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-space direction="horizontal" align="center">
          <a-select
            v-if="bloqueSelected === 'NoFicción'"
            v-model:value="sourceToEdit.theme"
            :style="{ width: '350px' }"
            placeholder="Seleccione un Tema"
            @change="themeSelected"
          >
            <a-select-option v-for="t in themes" :key="t.nombre">
              {{ t.nombre }}
            </a-select-option>
          </a-select>
          <a-tooltip title="Añadir Tema" placement="bottom">
            <PlusOutlined
              v-if="bloqueSelected === 'NoFicción'"
              class="dynamic-add-button"
              :style="{ color: '#1890ff' }"
              @click="showModalT"
            />
          </a-tooltip>
        </a-space>
        <a-space
          direction="horizontal"
          align="center"
          :style="{ padding: '0px' }"
        >
          <a-select
            v-if="bloqueSelected === 'Ficción'"
            v-model:value="sourceToEdit.theme"
            :style="{ width: '350px' }"
            placeholder="Seleccione un Género"
            @change="themeSelected"
          >
            <a-select-option v-for="g in genres" :key="g.nombre">
              {{ g.nombre }}
            </a-select-option>
          </a-select>
          <a-tooltip title="Añadir Género" placement="bottom">
            <PlusOutlined
              v-if="bloqueSelected === 'Ficción'"
              class="dynamic-add-button"
              :style="{ color: '#1890ff' }"
              @click="showModalG"
            />
          </a-tooltip>
        </a-space>
      </a-form-item>
      <a-form-item
        v-show="sourceToEdit.support === 'Publicación Periódica'"
        ref="session_p"
        label="Sección del Periódico"
        name="session_p"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-space direction="horizontal" align="center">
          <a-select :style="{ width: '350px' }" @change="sessionSelected">
            <a-select-option v-for="sp in sessions_p" :key="sp.nombre">
              {{ sp.nombre }}
            </a-select-option>
          </a-select>
          <a-tooltip title="Añadir Sección de Periódico" placement="bottom">
            <PlusOutlined
              class="dynamic-add-button"
              :style="{ color: '#1890ff' }"
              @click="showModalS"
            />
          </a-tooltip>
        </a-space>
      </a-form-item>
      <a-form-item
        v-show="sourceToEdit.support === 'Publicación Periódica'"
        ref="magazine_type_p"
        label="Tipo de revista"
        name="magazine_type_p"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-select
          v-model:value="sourceToEdit.magazine_type_p"
          :style="{ width: '350px' }"
        >
          <a-select-option v-for="mtp in magazine_type_p" :key="mtp">
            {{ mtp }}
          </a-select-option>
        </a-select>
      </a-form-item>
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
  <add-theme-modal
    v-model:visible="addThemeModalShow"
    @close-modal="showModalT"
    @add-theme="addTheme"
  ></add-theme-modal>
  <add-genre-modal
    v-model:visible="addGenreModalShow"
    @close-modal="showModalG"
    @add-genres="addGenres"
  ></add-genre-modal>
  <add-session-modal
    v-model:visible="addSessionModalShow"
    @close-modal="showModalS"
    @add-session="addSession"
  ></add-session-modal>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import moment from 'moment';

import AddThemeModal from '../../entryA/Nomenclators/addThemeModal.vue';
import AddGenreModal from '../../entryA/Nomenclators/addGenreModal.vue';
import AddSessionModal from '../../entryA/Nomenclators/addSessionModal.vue';

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

import { axiosClientPostImage } from '@/plugins/axios';

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
    'add-theme-modal': AddThemeModal,
    'add-genre-modal': AddGenreModal,
    'add-session-modal': AddSessionModal,
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
    const bloques = ['Ficción', 'NoFicción'];
    const magazine_type_p = ['Especializada', 'No especializada'];
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
    const addGenreModalShow = false;
    const addThemeModalShow = false;
    const addSessionModalShow = false;
    return {
      // fuente ******
      addGenreModalShow,
      addThemeModalShow,
      addSessionModalShow,
      bloqueSelected: 'Ficción',
      themes: [],
      genres: [],
      sessions_p: [],
      bloques,
      formRefS,
      magazine_type_p,
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
    const t = await Nomenclator.getAllThemes();
    this.themes = t.data.getAllThemes;

    const g = await Nomenclator.getAllGenres();
    this.genres = g.data.getAllGenres;

    const sp = await Nomenclator.getAllSessionsP();
    this.sessions_p = sp.data.getAllSessionsP;

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
    showModalT() {
      this.addThemeModalShow = !this.addThemeModalShow;
    },
    showModalG() {
      this.addGenreModalShow = !this.addGenreModalShow;
    },
    showModalS() {
      this.addSessionModalShow = !this.addSessionModalShow;
    },
    async addTheme(newTheme) {
      this.themes.push(newTheme);
      await Nomenclator.addTheme(newTheme);
      this.showModalT();
    },
    async addGenres(newGenre) {
      this.genres.push(newGenre);
      await Nomenclator.addGenres(newGenre);
      this.showModalG();
    },
    async addSession(newSession) {
      this.sessions_p.push(newSession);
      await Nomenclator.addSessionP(newSession);
      this.showModalS();
    },
    handleBloqueChange(value) {
      this.bloqueSelected = value;
      this.sourceToEdit.bloque = value;
    },
    themeSelected(value) {
      console.log('value', value);
      this.sourceToEdit.theme = value;
    },
    sessionSelected(value) {
      console.log('value', value);
      this.sourceToEdit.session_p = value;
    },
  },
});
</script>
