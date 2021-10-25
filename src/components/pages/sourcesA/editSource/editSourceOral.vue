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
        ref="speaker"
        label="Descripción del Hablante"
        name="speaker"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="sourceToEdit.speaker"
          :style="{ width: '350px' }"
          placeholder="Tenga en cuenta los datos nombre, sexo, grupo etario, nivel educacional, profesión, ciudad de origen, provincia."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        ref="typology"
        label="Tipología"
        name="typology"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-space direction="horizontal" align="center">
          <a-select
            v-model:value="sourceToEdit.typology"
            :style="{ width: '350px' }"
            @change="typologySelected"
          >
            <a-select-option
              v-for="typology in typologies"
              :key="typology.nombre"
            >
              {{ typology.nombre }}
            </a-select-option>
          </a-select>
          <a-tooltip title="Añadir Tipología" placement="bottom">
            <PlusOutlined
              class="dynamic-add-button"
              :style="{ color: '#1890ff' }"
              @click="showModalTY"
            />
          </a-tooltip>
        </a-space>
      </a-form-item>
      <a-form-item
        ref="broadcastMedium"
        label="Medio de Difusión"
        name="broadcastMedium"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-select
          v-model:value="sourceToEdit.broadcastMedium"
          :style="{ width: '350px' }"
        >
          <a-select-option
            v-for="broadcastMedium in broadcastMediums"
            :key="broadcastMedium"
          >
            {{ broadcastMedium }}
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
  <add-typology-modal
    v-model:visible="addTypologyModalShow"
    @close-modal="showModalTY"
    @add-typology="addTypology"
  ></add-typology-modal>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import moment from 'moment';

import AddTypologyModal from '../../entryA/Nomenclators/addTypologyModal.vue';
import AddThemeModal from '../../entryA/Nomenclators/addThemeModal.vue';
import AddGenreModal from '../../entryA/Nomenclators/addGenreModal.vue';

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
    'add-theme-modal': AddThemeModal,
    'add-genre-modal': AddGenreModal,
    'add-typology-modal': AddTypologyModal,
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
    const addTypologyModalShow = false;
    const broadcastMediums = ['Cadena de radio', 'Cadena de TV', 'Internet'];
    return {
      // fuente ******
      addGenreModalShow,
      addThemeModalShow,
      addTypologyModalShow,
      themes: [],
      typologies: [],
      genres: [],
      bloques,
      bloqueSelected: 'Ficción',
      formRefS,
      broadcastMediums,
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
      recording_date: null,
      broadcast_date: null,
      cantMint: null,
      dateFormat: 'YYYY-MM-DD',
      tipo: [],
    };
  },
  async mounted() {
    const t = await Nomenclator.getAllThemes();
    this.themes = t.data.getAllThemes;

    const ty = await Nomenclator.getAllTypologies();
    this.typologies = ty.data.getAllTypologies;

    const g = await Nomenclator.getAllGenres();
    this.genres = g.data.getAllGenres;

    //sourceToEdit
    const id = this.$route.params.id.toString();
    const { data } = await Sources.getSourceByID(id);
    this.sourceToEdit = data.getSourceByID;
    console.log('this.sourceToEdit', this.sourceToEdit);

    // date
    if (this.sourceToEdit.subType == 'Oral') {
      const rd = moment(this.sourceToEdit.recording_date, 'DD-MM-YYYY');
      this.recording_date = rd.format('YYYY-MM-DD');
      console.log('rd', rd);
      const bd = moment(this.sourceToEdit.broadcast_date, 'DD-MM-YYYY');
      this.broadcast_date = bd.format('YYYY-MM-DD');
      console.log('bd', bd);
      const d = this.sourceToEdit.cantMin; //h + 'horas : ' + m + 'minutos : ' + s + 'segundos'
      let h = d.split('horas : ')[0]; //h
      console.log('h', h);
      let t1 = d.split('horas : ')[1]; //m + 'minutos : ' + s + 'segundos
      let m = t1.split('minutos : ')[0]; //m
      console.log('m', m);
      let t2 = d.split('minutos : ')[1]; //s + 'segundos'
      let s = t2.split('segundos')[0]; //s
      console.log('s', s);
      this.cantMint = h + ':' + m + ':' + s;
      console.log('this.cantMint', this.cantMint);
    }
  },
  methods: {
    editSource() {
      console.log(this.sourceToEdit);
      this.loading = true;
      console.log('this.sourceToEdit', this.sourceToEdit);
      Sources.updateSourceByID(this.sourceToEdit);
      this.$router.push({ name: 'firstExtraction' });
    },
    showModalT() {
      this.addThemeModalShow = !this.addThemeModalShow;
    },
    goBack() {
      this.$router.push({ name: 'firstExtraction' });
    },
    showModalG() {
      this.addGenreModalShow = !this.addGenreModalShow;
    },
    showModalTY() {
      this.addTypologyModalShow = !this.addTypologyModalShow;
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
    async addTypology(newTypology) {
      this.typologies.push(newTypology);
      await Nomenclator.addTypology(newTypology);
      this.showModalTY();
    },
    moment,
    setCantMin(time) {
      let t = new Date(time);
      let h = t.getHours();
      let m = t.getMinutes();
      let s = t.getSeconds();
      let duracion = h + 'horas : ' + m + 'minutos : ' + s + 'segundos';
      this.sourceToEdit.cantMin = duracion;
      console.log('cantMin', this.sourceToEdit.cantMin);
    },
    onChangeRecording_date(date) {
      let month = date.format('M');
      let day = date.format('D');
      let year = date.format('YYYY');
      let fecha = day + '-' + month + '-' + year;
      this.sourceToEdit.recording_date = fecha;
      console.log('date', fecha);
    },
    onChangeBroadcast_date(date) {
      let month = date.format('M');
      let day = date.format('D');
      let year = date.format('YYYY');
      let fecha = day + '-' + month + '-' + year;
      this.sourceToEdit.broadcast_date = fecha;
      console.log('date', fecha);
    },
    handleBloqueChange(value) {
      this.bloqueSelected = value;
      this.sourceToEdit.bloque = value;
    },
    typologySelected(value) {
      console.log('value', value);
      this.sourceToEdit.typology = value;
    },
    themeSelected(value) {
      console.log('value', value);
      this.sourceToEdit.theme = value;
    },
  },
});
</script>
