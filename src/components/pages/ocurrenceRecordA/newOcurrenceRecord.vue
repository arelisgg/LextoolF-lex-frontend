<template>
  <a-page-header>
    <template #title>
      <h4>Registro de Ocurrencias</h4>
    </template>
    <template #extra>
      <a-tooltip
        title="Acceso a los sitios oficiales de Corpus y Tesoros Linguísticos"
        placement="topRight"
      >
        <a-button type="primary" @click="showDrawer">
          <LinkOutlined />
          Corpus/Tesoros
        </a-button>
      </a-tooltip>
    </template>
  </a-page-header>
  <a-drawer
    title="Corpus y Tesoros Online"
    placement="right"
    :closable="false"
    :visible="visible"
    :after-visible-change="afterVisibleChange"
    @close="onClose"
  >
    <h6>Corpus</h6>
    <ul style="padding-left: 0px">
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          href="https://www.corpusdelespanol.org/xs.asp"
          target="_blank"
        >
          Corpus del español
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          target="_blank"
          href="https://apps2.rae.es/CORPES/view/inicioExterno.view;jsessionid=8A846C32D0144E8A763724C90BB2AA1B"
        >
          CORPES
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          target="_blank"
          href="https://apps2.rae.es/CREA/view/inicioExterno.view"
        >
          CREA
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          href="http://corpus.rae.es/cordenet.html"
          target="_blank"
        >
          CORDE
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          target="_blank"
          href="https://apps.rae.es/CNDHE/view/inicioExterno.view"
        >
          CDH
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a class="nav-link" target="_blank" href="https://cemc.colmex.mx">
          CEMC
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a class="nav-link" target="_blank" href="https://www.cordiam.org/">
          CORDIAM
        </a>
      </li>
    </ul>
    <a-divider />
    <h6>Tesoros</h6>
    <ul style="padding-left: 0px">
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          target="_blank"
          href="http://ntlle.rae.es/ntlle/SrvltGUILoginNtlle"
        >
          NTLE
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a
          class="nav-link"
          target="_blank"
          href="https://apps2.rae.es/ntllet/SrvltGUILoginNtlletPub"
        >
          MDA
        </a>
      </li>
      <li class="nav-item hvr-forward">
        <a class="nav-link" target="_blank" href="https://tesoro.pr/">TLDEPR</a>
      </li>
    </ul>
  </a-drawer>
  <div class="steps-content">
    <h6>
      Describir Contexto de Identificación de la Unidad Fraseológica Candidata
    </h6>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="General">
        <a-form ref="formRefS" :model="source" :rules="rules">
          <a-form-item
            ref="name"
            label="Nombre de la Fuente"
            name="name"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              v-model:value="source.name"
              placeholde="Nombre de la Fuente"
              :style="{ width: '450px' }"
            ></a-input>
          </a-form-item>
          <a-form-item
            ref="ref"
            label="Referencia"
            name="ref"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-textarea
              v-model:value="source.ref"
              placeholder="Referencia de la Fuente"
              :style="{ width: '450px' }"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            ref="type"
            label="Datos de clasificación"
            name="type"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-cascader
              :options="options"
              placeholder="Seleccione una Tipo"
              :style="{ width: '450px' }"
              @change="handleOptionsChange"
            />
          </a-form-item>
          <a-form-item
            ref="URL"
            label="URL de la Fuente"
            name="URL"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              v-model:value="source.URL"
              placeholde="URL de la Fuente"
              :style="{ width: '450px' }"
            ></a-input>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Especificaciones" force-render>
        <a-form :model="source">
          <div v-show="source.type === ''">
            <a-alert
              message="Debe seleccionar un tipo de fuente para poder especificar otros datos"
              type="info"
              show-icon
            />
          </div>
          <div v-show="source.type === 'Metalinguística'">
            <a-form-item
              ref="dictionaryType"
              label="Tipo de diccionario"
              name="dictionaryType"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-space direction="horizontal" align="center">
                <a-select
                  v-model:value="source.dictionaryType"
                  :style="{ width: '450px' }"
                  @change="dictionaryTypeSelected"
                >
                  <a-select-option
                    v-for="dictionaryType in dictionariesTypes"
                    :key="dictionaryType.id"
                  >
                    {{ dictionaryType.nombre }}
                  </a-select-option>
                </a-select>
                <a-tooltip
                  title="Añadir Tipo de Diccionario"
                  placement="bottom"
                >
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-input
                v-model:value="source.century"
                placeholde="Siglo"
                :style="{ width: '450px' }"
              ></a-input>
            </a-form-item>
            <div
              v-show="
                source.support === 'Internet' &&
                source.type === 'Metalinguística'
              "
            >
              <a-form-item
                ref="library_name"
                label="Biblioteca Virtual"
                name="library_name"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-input
                  v-model:value="source.library_name"
                  placeholde="Nombre de la biblioteca Virtual"
                  :style="{ width: '450px' }"
                ></a-input>
              </a-form-item>
              <a-form-item
                ref="url_location"
                label="Localización URL"
                name="url_location"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-input
                  v-model:value="source.url_location"
                  placeholde="Localización URL"
                  :style="{ width: '450px' }"
                ></a-input>
              </a-form-item>
            </div>
          </div>
          <div v-show="source.type === 'Linguística'">
            <a-form-item
              ref="bloque"
              label="Bloque de la Fuente"
              name="bloque"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-select
                :default-value="bloques[0]"
                :style="{ width: '450px' }"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-space direction="horizontal" align="center">
                <a-select
                  v-if="bloqueSelected === 'NoFicción'"
                  :style="{ width: '450px' }"
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
                  :style="{ width: '450px' }"
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
              v-show="source.support === 'Publicación Periódica'"
              ref="session_p"
              label="Sección del Periódico"
              name="session_p"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-space direction="horizontal" align="center">
                <a-select :style="{ width: '450px' }" @change="sessionSelected">
                  <a-select-option v-for="sp in sessions_p" :key="sp.nombre">
                    {{ sp.nombre }}
                  </a-select-option>
                </a-select>
                <a-tooltip
                  title="Añadir Sección de Periódico"
                  placement="bottom"
                >
                  <PlusOutlined
                    class="dynamic-add-button"
                    :style="{ color: '#1890ff' }"
                    @click="showModalS"
                  />
                </a-tooltip>
              </a-space>
            </a-form-item>
            <a-form-item
              v-show="source.support === 'Publicación Periódica'"
              ref="magazine_type_p"
              label="Tipo de revista"
              name="magazine_type_p"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-select
                v-model:value="source.magazine_type_p"
                :style="{ width: '450px' }"
              >
                <a-select-option v-for="mtp in magazine_type_p" :key="mtp">
                  {{ mtp }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div
            v-show="source.support === 'Audio' || source.support === 'Video'"
          >
            <a-form-item
              ref="speaker"
              label="Descripción del Hablante"
              name="speaker"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-textarea
                v-model:value="source.speaker"
                :style="{ width: '450px' }"
                placeholder="Tenga en cuenta los datos nombre, sexo, grupo etario, nivel educacional, profesión, ciudad de origen, provincia."
                allow-clear
              />
            </a-form-item>
            <a-form-item
              ref="typology"
              label="Tipología"
              name="typology"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-space direction="horizontal" align="center">
                <a-select
                  :style="{ width: '450px' }"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-select
                v-model:value="source.broadcastMedium"
                :style="{ width: '450px' }"
              >
                <a-select-option
                  v-for="broadcastMedium in broadcastMediums"
                  :key="broadcastMedium"
                >
                  {{ broadcastMedium }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              ref="recording_date"
              label="Fecha de grabación"
              name="recording_date"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-date-picker
                style="width: 300px"
                placeholder="Seleccione la Fecha de grabación"
                :default-open-value="moment('YYYY-MM-DD')"
                @change="onChangeRecording_date"
              />
            </a-form-item>
            <a-form-item
              ref="broadcast_date"
              label="Fecha de emisión"
              name="broadcast_date"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-date-picker
                style="width: 300px"
                placeholder="Seleccione la Fecha de emisión"
                :default-open-value="moment('YYYY-MM-DD')"
                @change="onChangeBroadcast_date"
              />
            </a-form-item>
            <a-form-item
              ref="cantMin"
              label="Tiempo de duración"
              name="cantMin"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-time-picker
                style="width: 300px"
                placeholder="Seleccione el Tiempo de duración"
                :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                @change="setCantMin"
              />
            </a-form-item>
          </div>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
  <croppie-modal @crop="crop"></croppie-modal>
  <div class="w-100">
    <carrousel-images
      :images="images"
      :show-delete-icon="true"
      :show-add-image="true"
      @delete-image="deleteImage"
    ></carrousel-images>
  </div>
  <a-form ref="formRef" :model="ocurrenceRecord" :rules="rules">
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-right: 5px"
        @click="submit"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goBack">Cancelar</a-button>
    </div>
  </a-form>
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
  <add-dictionary-type-modal
    v-model:visible="addDictionaryTypeModalShow"
    @close-modal="showModalD"
    @add-dictionary-type="addDictionaryType"
  ></add-dictionary-type-modal>
  <add-session-modal
    v-model:visible="addSessionModalShow"
    @close-modal="showModalS"
    @add-session="addSession"
  ></add-session-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';
import moment from 'moment';

import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  PlusOutlined,
  LinkOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';

import AddThemeModal from '../entryA/Nomenclators/addThemeModal.vue';
import AddGenreModal from '../entryA/Nomenclators/addGenreModal.vue';
import AddSessionModal from '../entryA/Nomenclators/addSessionModal.vue';
import AddDictionaryTypeModal from '../entryA/Nomenclators/addDictionaryTypeModal.vue';
import AddTypologyModal from '../entryA/Nomenclators/addTypologyModal.vue';
import CarrouselImages from './carrouselImages.vue';
import CroppieModal from '../entryA/VueCroppie/CroppieModal.vue';

import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';
import { EntryA } from '@/graphql/modules/entryA/model';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import { Nomenclator } from '@/graphql/modules/nomenclator/model.ts';

import { axiosClientPostImage } from '@/plugins/axios';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
    LinkOutlined,
    PlusOutlined,
    DeleteOutlined,
    'add-theme-modal': AddThemeModal,
    'add-genre-modal': AddGenreModal,
    'add-dictionary-type-modal': AddDictionaryTypeModal,
    'add-typology-modal': AddTypologyModal,
    'add-session-modal': AddSessionModal,
    'carrousel-images': CarrouselImages,
    'croppie-modal': CroppieModal,
  },
  data() {
    const rules = {};
    const ocurrenceRecord: UnwrapRef<any> = reactive({
      source: '',
      numAppearance: 0,
      appearances: [],
      isVariation: false,
    });

    //fuentes****
    const options = [
      {
        value: 'Linguística',
        label: 'Linguística',
        children: [
          {
            value: 'Escrita',
            label: 'Escrita',
            children: [
              {
                value: 'Libro',
                label: 'Libro',
              },
              {
                value: 'Publicación Periódica',
                label: 'Publicación Periódica',
              },
              {
                value: 'Internet',
                label: 'Internet',
              },
            ],
          },
          {
            value: 'Oral',
            label: 'Oral',
            children: [
              {
                value: 'Audio',
                label: 'Audio',
              },
              {
                value: 'Video',
                label: 'Video',
              },
            ],
          },
        ],
      },
      {
        value: 'Metalinguística',
        label: 'Metalinguística',
        children: [
          {
            value: 'Escrita',
            label: 'Escrita',
            children: [
              {
                value: 'Libro',
                label: 'Libro',
              },
              {
                value: 'Internet',
                label: 'Internet',
              },
            ],
          },
        ],
      },
    ];
    const bloques = ['Ficción', 'NoFicción'];
    const magazine_type_p = ['Especializada', 'No especializada'];
    const broadcastMediums = ['Cadena de radio', 'Cadena de TV', 'Internet'];
    const source = {
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
    const formRef = ref();
    const formRefS = ref();
    const loading = false;
    const entryA = {
      UF: '',
      lemma: '',
      source: '',
      letter: '',
      context: '',
      selected: false,
    };
    const addGenreModalShow = false;
    const addThemeModalShow = false;
    const addDictionaryTypeModalShow = false;
    const addTypologyModalShow = false;
    const addSessionModalShow = false;
    const images = [];
    const selectedImageIndex = -1;
    return {
      entryA,
      loading,
      images,
      selectedImageIndex,
      formRef,
      count: 0,
      ocurrenceRecord,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      disabled: true,
      visible: false,

      // fuente ******
      addGenreModalShow,
      addThemeModalShow,
      addDictionaryTypeModalShow,
      addTypologyModalShow,
      addSessionModalShow,
      bloqueSelected: 'Ficción',
      themes: [],
      typologies: [],
      dictionariesTypes: [],
      genres: [],
      sessions_p: [],
      options,
      bloques,
      formRefS,
      magazine_type_p,
      broadcastMediums,
      source,
      formItemLayoutWithOutLabelModal,
    };
  },
  async mounted() {
    const t = await Nomenclator.getAllThemes();
    this.themes = t.data.getAllThemes;
    console.log('themes', this.themes);
    const ty = await Nomenclator.getAllTypologies();
    this.typologies = ty.data.getAllTypologies;
    console.log('typologies', this.typologies);
    const dt = await Nomenclator.getAllDictionaryTypes();
    this.dictionariesTypes = dt.data.getAllDictionaryTypes;
    console.log('dictionariesTypes', this.dictionariesTypes);
    const g = await Nomenclator.getAllGenres();
    this.genres = g.data.getAllGenres;
    console.log('genres', this.genres);
    const sp = await Nomenclator.getAllSessionsP();
    this.sessions_p = sp.data.getAllSessionsP;
    console.log('sessions_p', this.sessions_p);
  },
  methods: {
    async submit() {
      this.loading = true;
      this.source.stage = 'Documentación';
      const s = await this.createSource();
      const sourceID = s.data.createSource.id;
      this.ocurrenceRecord.source = sourceID;
      if (this.images.length !== 0) {
        await this.uploadFileImage();
      }
      await this.createOcurrenceRecord();
      this.$router.push({ name: 'documentationTask' });
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    //file image
    uploadFileImage() {
      let contexts = [];
      for (let i = 0; i < this.images.length; i++) {
        const element = this.images[i];
        const extensionFile = '.' + element.file.name.split('.')[1];
        const date = Date.now();
        contexts.push(
          'Aparición_' +
            this.source.name +
            '_' +
            date +
            '_' +
            (i + 1) +
            extensionFile
        );
      }
      this.ocurrenceRecord.numAppearance = contexts.length;
      for (let index = 0; index < contexts.length; index++) {
        const element = contexts[index];
        const newAppearance = {} as { useContext: '' };
        newAppearance.useContext = element;
        this.ocurrenceRecord.appearances.push(newAppearance);
      }
      // Uploading Images
      for (let i = 0; i < this.images.length; i++) {
        const fd = new FormData();
        fd.append('file', this.images[i].file);
        axiosClientPostImage.post(`/${contexts[i]}`, fd);
      }
    },
    crop(e) {
      this.images.push(e);
      console.log('this.images', this.images);
    },
    changeSelectedImage(index) {
      console.log('changeSelectedImage:', index);
      if (index === this.selectedImageIndex) {
        this.selectedImageIndex = -1;
      } else {
        this.selectedImageIndex = index;
      }
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    async createOcurrenceRecord() {
      this.loading = true;
      const { data } = await OcurrenceRecord.createOcurrenceRecord(
        this.ocurrenceRecord
      );
      const or = data.createOcurrenceRecord;
      console.log('or', or);

      //añadiendo el registro de ocurrencias a la documentacion de la entrada
      const id = this.$route.params.id.toString();
      const e = await EntryA.getEntryByIDWithDocs(id);
      let newEntry = e.data.getEntryByIDWithDocs;
      newEntry.documentation.push(or.id);
      let updated = await EntryA.updateEntryDocumentation(newEntry);
      const eu = updated.data.updateEntryDocumentation;
      let updatedID = eu.id;
      console.log('updatedID', updatedID);
      let u = await EntryA.updateEntryFrecuency(updatedID);
      console.log('u', u.data.updateEntryFrecuency);
    },
    goBack() {
      this.$router.push({ name: 'documentationTask' });
    },

    // fuente******
    moment,
    setCantMin(time) {
      let t = new Date(time);
      let h = t.getHours();
      let m = t.getMinutes();
      let s = t.getSeconds();
      let duracion = h + 'horas : ' + m + 'minutos : ' + s + 'segundos';
      this.source.cantMin = duracion;
      console.log('cantMin', this.source.cantMin);
    },
    onChangeRecording_date(date) {
      let month = date.format('M');
      let day = date.format('D');
      let year = date.format('YYYY');
      let fecha = day + '-' + month + '-' + year;
      this.source.recording_date = fecha;
      console.log('date', fecha);
    },
    onChangeBroadcast_date(date) {
      let month = date.format('M');
      let day = date.format('D');
      let year = date.format('YYYY');
      let fecha = day + '-' + month + '-' + year;
      this.source.broadcast_date = fecha;
      console.log('date', fecha);
    },
    callback(key) {
      console.log(key);
    },
    createSource() {
      console.log(this.source);
      let claves = Object.keys(this.source); // claves = ["nombre", "color", "macho", "edad"]
      console.log('claves', claves);
      for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        console.log(this.source[clave]);
        if (this.source[clave] === '') {
          this.source[clave] = '( No Definido )';
        }
      }
      console.log('this.source', this.source);
      const s = Sources.createSource(this.source);
      return s;
    },
    handleOptionsChange(value) {
      console.log('value', value);
      this.source.type = value[0];
      this.source.subType = value[1];
      this.source.support = value[2];
    },
    showModalT() {
      this.addThemeModalShow = !this.addThemeModalShow;
    },
    showModalG() {
      this.addGenreModalShow = !this.addGenreModalShow;
    },
    showModalTY() {
      this.addTypologyModalShow = !this.addTypologyModalShow;
    },
    showModalS() {
      this.addSessionModalShow = !this.addSessionModalShow;
    },
    showModalD() {
      this.addDictionaryTypeModalShow = !this.addDictionaryTypeModalShow;
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
    async addSession(newSession) {
      this.sessions_p.push(newSession);
      await Nomenclator.addSessionP(newSession);
      this.showModalS();
    },
    async addDictionaryType(newDictionaryType) {
      this.dictionariesTypes.push(newDictionaryType);
      await Nomenclator.addDictionaryType(newDictionaryType);
      this.showModalD();
    },

    handleBloqueChange(value) {
      console.log('value', value);
      this.bloqueSelected = value;
      this.source.bloque = value;
    },
    typologySelected(value) {
      console.log('value', value);
      this.source.typology = value;
    },
    themeSelected(value) {
      console.log('value', value);
      this.source.theme = value;
    },
    sessionSelected(value) {
      console.log('value', value);
      this.source.session_p = value;
    },
    dictionaryTypeSelected(value) {
      console.log('value', value);
      this.source.dictionaryType = value;
    },
  },
});
</script>
<style scoped>
.ant-cascader-menu {
  height: 235px;
}

.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #f6f6f6;
  min-height: 200px;
  padding: 20px;
}
</style>
