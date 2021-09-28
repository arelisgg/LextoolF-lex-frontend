<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <!-- Step 2 -->
    <div v-show="steps[current].title === 'Nueva UF'" class="steps-content">
      <h4>Nueva Unidad Fraseológica Candidata</h4>
      <br />
      <a-form ref="formRef" :model="entryA" :rules="rules">
        <a-form-item
          ref="UF"
          label="Unidad Fraseológica"
          name="UF"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input v-model:value="entryA.UF"></a-input>
        </a-form-item>
        <a-form-item
          ref="tipoOrigen"
          label="Tipo de Origen"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-radio-group
            v-model="value"
            :default-value="1"
            button-style="solid"
            :disabled="disabledRadio"
            @change="radioSelect"
          >
            <a-radio-button :value="1">Imagen</a-radio-button>
            <a-radio-button :value="2">Audio</a-radio-button>
            <a-radio-button :value="3">Video</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <div v-show="radio === 1">
          <croppie-modal @crop="crop"></croppie-modal>
          <a-form-item
            v-if="image !== null && showPreviewImage"
            ref="context"
            label="Contexto"
            name="context"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <img
              v-show="image !== null && showPreviewImage"
              :src="image.base64"
            />
          </a-form-item>
          <a-form-item
            v-else
            label="Info"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-alert
              message='Click en cualquier parte de la ventana y luego "CTRL + V" para pegar la Imagen'
              type="info"
              show-icon
            />
          </a-form-item>
        </div>
        <div v-show="radio === 3">
          <a-form-item
            ref="context"
            label="Contexto"
            name="context"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <input
              ref="fileInput"
              type="file"
              name="file"
              style="display: none"
              accept="video/mp4,video/x-m4v,video/*"
              @change="onFileSelectedV"
            />
            <a-button type="primary" @click="$refs.fileInput.click()">
              Seleccione el Video
            </a-button>
            <br />
            <span v-if="!selectedFile" class="file-info">
              No files selected
            </span>
            <span v-else class="file-info">{{ selectedFile.name }}</span>
            <br />
            <video
              v-show="showPreview"
              :src="videoPreview"
              width="320"
              height="240"
              controls
            ></video>
          </a-form-item>
        </div>
        <div v-show="radio === 2">
          <a-form-item
            ref="context"
            label="Contexto"
            name="context"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <input
              ref="fileInputA"
              type="file"
              name="file"
              style="display: none"
              accept="audio/*"
              @change="onFileSelectedA"
            />
            <a-button type="primary" @click="$refs.fileInputA.click()">
              Seleccione el Audio
            </a-button>
            <br />
            <span v-if="!selectedFile" class="file-info">
              No files selected
            </span>
            <span v-else class="file-info">{{ selectedFile.name }}</span>
            <br />
            <audio
              v-show="showPreviewAudio"
              :src="audioPreview"
              controls
            ></audio>
          </a-form-item>
        </div>
      </a-form>
    </div>
    <!-- Step 2 -->
    <div v-show="steps[current].title === 'Nueva Fuente'" class="steps-content">
      <h4>
        Describir Contexto de Identificación de la Unidad Fraseológica Candidata
      </h4>
      <br />
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="General">
            <a-form ref="formRef" :model="source" :rules="rules">
              <a-form-item
                ref="name"
                label="Nombre de la Fuente"
                name="name"
                :label-col="labelColModal"
                :wrapper-col="wrapperColModal"
              >
                <a-input
                  v-model:value="source.name"
                  placeholde="Nombre de la Fuente"
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
                  v-model:value="source.ref"
                  placeholder="Referencia de la Fuente"
                  allow-clear
                />
              </a-form-item>
              <a-form-item
                ref="type"
                label="Datos de clasificación"
                name="type"
                :label-col="labelColModal"
                :wrapper-col="wrapperColModal"
              >
                <a-cascader
                  v-if="showPreviewAudio"
                  :options="options"
                  :default-value="['Linguística', 'Oral', 'Audio']"
                  placeholder="Seleccione una Tipo"
                  @change="handleOptionsChange"
                />
                <a-cascader
                  v-else-if="showPreview"
                  :options="options"
                  :default-value="['Linguística', 'Oral', 'Video']"
                  placeholder="Seleccione una Tipo"
                  @change="handleOptionsChange"
                />
                <a-cascader
                  v-else
                  :options="options"
                  placeholder="Seleccione una Tipo"
                  @change="handleOptionsChange"
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
                  v-model:value="source.URL"
                  placeholde="URL de la Fuente"
                ></a-input>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Especificaciones" force-render>
            <a-form :model="source">
              <div v-show="source.type === ''">
                <h4>
                  Debe seleccionar un tipo de fuente para poder especificar
                  otros datos
                </h4>
              </div>
              <div v-show="source.type === 'Metalinguística'">
                <a-form-item
                  ref="dictionaryType"
                  label="Tipo de diccionario"
                  name="dictionaryType"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-select v-model:value="source.dictionaryType">
                    <a-select-option
                      v-for="dictionaryType in dictionariesTypes"
                      :key="dictionaryType"
                    >
                      {{ dictionaryType }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  ref="century"
                  label="Siglo"
                  name="century"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-input
                    v-model:value="source.century"
                    placeholde="Siglo"
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
                    :label-col="labelColModal"
                    :wrapper-col="wrapperColModal"
                  >
                    <a-input
                      v-model:value="source.library_name"
                      placeholde="Nombre de la biblioteca Virtual"
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
                      v-model:value="source.url_location"
                      placeholde="Localización URL"
                    ></a-input>
                  </a-form-item>
                </div>
              </div>
              <div v-show="source.type === 'Linguística'">
                <a-form-item
                  ref="bloque"
                  label="Bloque de la Fuente"
                  name="bloque"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-select
                    v-model:value="source.bloque"
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
                  <a-select v-model:value="source.theme">
                    <a-select-option v-for="tema in temas" :key="tema">
                      {{ tema }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  v-show="source.support === 'Publicación Periódica'"
                  ref="session_p"
                  label="Sección del Periódico"
                  name="session_p"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-select v-model:value="source.session_p">
                    <a-select-option v-for="sp in session_p" :key="sp">
                      {{ sp }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  v-show="source.support === 'Publicación Periódica'"
                  ref="magazine_type_p"
                  label="Tipo de revista"
                  name="magazine_type_p"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-select v-model:value="source.magazine_type_p">
                    <a-select-option v-for="mtp in magazine_type_p" :key="mtp">
                      {{ mtp }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div
                v-show="
                  source.support === 'Audio' || source.support === 'Video'
                "
              >
                <a-form-item
                  ref="speaker"
                  label="Descripción del Hablante"
                  name="speaker"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-textarea
                    v-model:value="source.speaker"
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
                  <a-select v-model:value="source.typology">
                    <a-select-option
                      v-for="typology in typologies"
                      :key="typology"
                    >
                      {{ typology }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  ref="broadcastMedium"
                  label="Medio de Difusión"
                  name="broadcastMedium"
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
                >
                  <a-select v-model:value="source.broadcastMedium">
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
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
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
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
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
                  :label-col="labelColModal"
                  :wrapper-col="wrapperColModal"
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
    </div>
    <div class="steps-action" style="text-align: right">
      <a-button v-if="current < steps.length - 1" @click="next">Next</a-button>
      <a-button
        v-if="current == steps.length - 1"
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-left: 8px"
        @click="submit"
      >
        Crear
      </a-button>
      <a-button key="back" style="margin-left: 8px" @click="goBack">
        Cancelar
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import 'ant-design-vue/lib/upload/style';
import moment from 'moment';

import CroppieModal from './VueCroppie/CroppieModal.vue';
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
    'croppie-modal': CroppieModal,
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
      type: [
        {
          required: true,
          message: 'Por favor seleccione el tipo de la fuente',
          trigger: 'blur',
        },
      ],
      UF: [
        {
          required: true,
          message: 'Por favor escriba la UF',
          trigger: 'blur',
        },
      ],
    };

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
    const theme = {
      Ficción: ['Novela', 'Relato', 'Teatro'],
      NoFicción: [
        'Ocio y vida cotidiana',
        'Artes y cultura',
        'Ciencias sociales, creencias y pensamiento',
        'Ciencias exactas, tecnología y Salud',
        'Política, economía y justicia',
      ],
    };
    const broadcastMediums = ['Cadena de radio', 'Cadena de TV', 'Internet'];
    const session_p = [
      'Nacionales',
      'Internacionales',
      'Culturales',
      'Deportes',
      'Economía',
      'Otra',
    ];
    const magazine_type_p = ['Especializada', 'No especializada'];
    const typologies = [
      'Conversación',
      'Debate',
      'Discurso',
      'Entrevista',
      'Entrevista semidirigida',
      'Magacines y variedades',
      'Noticia',
      'Publicidad',
      'Reportajes y documentales',
      'Retransmisiones deportivas',
      'Sorteos y concursos',
      'Tertulia',
      'Otros',
    ];
    const dictionariesTypes = [
      'Normativo',
      'De uso práctico',
      'Monolingües',
      'Bilingües',
      'De aprendizaje',
      'Etimológicos',
      'De sinónimos y antónimos',
      'Especializado',
      'Inverso o de rimas',
      'De gramática',
      'De dudas',
      'Tesauro',
      'Ideológico o de ideas afines',
      'Diccionario analógico conceptual',
      'Visual o de imágenes',
      'Enciclopédico',
    ];
    const source = {
      name: '',
      ref: '',
      file: '',
      type: '',
      subType: '',
      support: '',

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
    const loading = false;
    const entryA = {
      UF: '',
      lemma: '',
      source: '',
      letter: '',
      context: '',
      selected: false,
    };
    return {
      // fuente ******
      options,
      bloques,
      theme,
      session_p,
      magazine_type_p,
      temas: theme[bloques[0]],
      secondTema: theme[bloques[0]][0],
      broadcastMediums,
      typologies,
      dictionariesTypes,
      formItemLayoutWithOutLabelModal,
      source,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
      file: null,
      // entry *******
      loading,
      entryA,
      formRef,
      rules,
      selectedFile: null,
      image: {
        base64: null,
        file: null,
      },
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      showPreviewAudio: false,
      showPreviewImage: false,
      showPreview: false,
      audioPreview: '',
      imagePreview: '',
      videoPreview: '',
      uploadProgress: 0,
      uploadProgressAudio: 0,
      current: 0,
      radio: 1,
      disabledRadio: false,
      steps: [
        {
          title: 'Nueva UF',
        },
        {
          title: 'Nueva Fuente',
        },
      ],
    };
  },
  methods: {
    async submit() {
      if (this.selectedFile) {
        if (/\.(mp4|avi|x-m4v)$/i.test(this.selectedFile.name)) {
          this.uploadFileVideo();
        }
        if (
          /\.(mp3|m4a|wav|wma|flac|aac|opus)$/i.test(this.selectedFile.name)
        ) {
          this.uploadFileAudio();
        }
      }
      if (this.image.file !== null) {
        this.uploadFileImage();
      }
      const s = await this.createSource();
      const sourceID = s.data.createSource.id;
      this.createEntryA(sourceID);
      this.$router.push({ name: 'sources' });
    },
    radioSelect(e) {
      this.radio = e.target.value;
    },
    next() {
      if (this.showPreviewAudio) {
        this.source.type = 'Linguística';
        this.source.subType = 'Oral';
        this.source.support = 'Audio';
      }
      if (this.showPreview) {
        this.source.type = 'Linguística';
        this.source.subType = 'Oral';
        this.source.support = 'Video';
      }
      this.current++;
    },
    prev() {
      this.current--;
    },
    createEntryA(sourceID) {
      console.log('sourceID', sourceID);
      console.log('this.entryA', this.entryA);
      this.loading = true;
      this.entryA.source = sourceID;
      EntryA.createEntry(this.entryA);
    },
    //file Video
    onFileSelectedV(event) {
      this.selectedFile = event.target.files[0];
      console.log('event', event);
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          this.showPreview = true;
          this.videoPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.selectedFile) {
        if (/\.(mp4|avi|x-m4v)$/i.test(this.selectedFile.name)) {
          reader.readAsDataURL(this.selectedFile);
        }
      }
    },
    uploadFileVideo() {
      console.log('this.selectedFile', this.selectedFile);
      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.entryA.context = 'Video_context_' + date + extensionFile;
        console.log('file name', this.entryA.context);

        const config = {
          onUploadProgress: function (progressEvent) {
            this.uploadProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(this.uploadProgress);
          },
        };

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.entryA.context}`, formData, config)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }
    },
    //file image
    crop(e) {
      this.image = e;
      console.log('this.image', this.image);
      if (this.image) {
        this.showPreviewImage = true;
      }
    },
    uploadFileImage() {
      const fileImage = this.image;
      const element = fileImage.file;
      const extensionFile = '.' + element.name.split('.')[1];
      const date = Date.now();
      this.entryA.context = 'Image_context_' + date + extensionFile;
      console.log('file name', this.entryA.context);

      const config = {
        onUploadProgress: function (progressEvent) {
          this.uploadProgress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(this.uploadProgress);
        },
      };

      const formData = new FormData();
      formData.append('file', fileImage.file);
      axiosClientPostImage
        .post(`/${this.entryA.context}`, formData, config)
        .then(function () {
          console.log('SUCCESS!!');
          this.openNotificationWithIcon('success');
        })
        .catch(function () {
          console.log('FAILURE!!');
          this.openNotificationWithIcon('error');
        });
    },
    //file Audio
    onFileSelectedA(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          this.showPreviewAudio = true;
          this.audioPreview = reader.result;
        }.bind(this),
        false
      );

      if (this.selectedFile) {
        if (
          /\.(mp3|m4a|wav|wma|flac|aac|opus)$/i.test(this.selectedFile.name)
        ) {
          reader.readAsDataURL(this.selectedFile);
        }
      }
    },
    uploadFileAudio() {
      console.log('this.selectedFile', this.selectedFile);
      if (!(this.selectedFile === null)) {
        const element = this.selectedFile;
        const extensionFile = '.' + element.name.split('.')[1];
        const date = Date.now();
        this.entryA.context = 'Audio_context_' + date + extensionFile;
        console.log('file name', this.entryA.context);

        const config = {
          onUploadProgress: function (progressEvent) {
            this.uploadProgressAudio = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(this.uploadProgressAudio);
          },
        };

        const formData = new FormData();
        console.log(this.selectedFile);
        formData.append('file', this.selectedFile);
        axiosClientPostImage
          .post(`/${this.entryA.context}`, formData, config)
          .then(function () {
            console.log('SUCCESS!!');
            this.openNotificationWithIcon('success');
          })
          .catch(function () {
            console.log('FAILURE!!');
            this.openNotificationWithIcon('error');
          });
      }
    },
    goBack() {
      this.$router.push({ name: 'extractionTask' });
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
    handleBloqueChange(value) {
      this.temas = this.theme[value];
      this.secondTema = this.theme[value][0];
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
  },
});
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  padding: 40px;
}

.steps-action {
  margin-top: 24px;
}

.file-info {
  font-size: 13px;
  color: #000000;
  line-height: 53px;
  padding-left: 10px;
}
</style>
