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
  <h4>Describir Contexto de Documentación</h4>
  <div class="steps-content">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="General">
        <a-form ref="formRef" :model="source" :rules="rules">
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
            ></a-input>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Especificaciones" force-render>
        <a-form :model="source">
          <div v-show="source.type === ''">
            <h4>
              Debe seleccionar un tipo de fuente para poder especificar otros
              datos
            </h4>
          </div>
          <div v-show="source.type === 'Metalinguística'">
            <a-form-item
              ref="dictionaryType"
              label="Tipo de diccionario"
              name="dictionaryType"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
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
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
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
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
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
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-select v-model:value="source.magazine_type_p">
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
              <a-select v-model:value="source.typology">
                <a-select-option v-for="typology in typologies" :key="typology">
                  {{ typology }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              ref="broadcastMedium"
              label="Medio de Difusión"
              name="broadcastMedium"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
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
  <a-form ref="formRef" :model="ocurrenceRecord" :rules="rules">
    <a-form-item
      ref="numAppearance"
      label="Número de Apariciones"
      name="numAppearance"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input-number
        v-model:value="ocurrenceRecord.numAppearance"
        :min="0"
        :disabled="disabled"
        :default-value="0"
      />
    </a-form-item>
    <a-form-item>
      <a-table
        :data-source="ocurrenceRecord.appearances"
        :columns="columns"
        bordered
      >
        <template #title>
          <a-tooltip title="Agregar Nueva Aparición" placement="right">
            <a
              v-show="count < ocurrenceRecord.numAppearance"
              @click="showModal"
            >
              Nueva Aparición
              <PlusSquareFilled
                :style="{ fontSize: '25px', color: '#08c', margin: '5px' }"
              />
            </a>
          </a-tooltip>
        </template>
        <template #operation="{ record }">
          <a-popconfirm
            v-if="ocurrenceRecord.appearances.length"
            title="Seguro de Eliminar?"
            @confirm="deleteAppearance(record)"
          >
            <a>
              <DeleteFilled
                :style="{ fontSize: '20px', color: 'red', margin: '5px' }"
              />
            </a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-form-item>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-right: 5px"
        @click="createOcurrenceRecord"
      >
        Crear
      </a-button>
      <a-button key="back" @click="goBack">Cancelar</a-button>
    </div>
  </a-form>
  <new-appearance-modal
    v-model:visible="newAppearanceModalShow"
    @close-modal="showModal"
    @add-appearance="addAppearance"
  ></new-appearance-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';
import moment from 'moment';

import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  LinkOutlined,
} from '@ant-design/icons-vue';
import NewAppearanceModal from './newAppearanceModal.vue';
import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
    NewAppearanceModal,
    LinkOutlined,
  },
  data() {
    const columns = [
      {
        title: 'Referencia de la Fuente',
        dataIndex: 'contextSource',
        key: 'contextSource',
        sorter: (a, b) => a.name.localeCompare(b.name),
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
        },
        onFilter: (value, record) => {
          return record.contextSource
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      },
      {
        title: 'Operacion',
        dataIndex: 'operation',
        width: 150,
        sorter: true,
        slots: { customRender: 'operation' },
      },
    ];
    const rules = {};
    const ocurrenceRecord: UnwrapRef<any> = reactive({
      source: '',
      numAppearance: 0,
      appearances: [],
      status: 'En Proceso',
    });
    const newAppearanceModalShow = false;

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
      newAppearanceModalShow,
      columns,
      formRef,
      count: 0,
      ocurrenceRecord,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      disabled: true,
      visible: false,

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
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    showModal() {
      this.newAppearanceModalShow = !this.newAppearanceModalShow;
    },
    addAppearance(newAppearance) {
      if (this.count < this.ocurrenceRecord.numAppearance) {
        console.log('this.count', this.count);
      }
      this.count++;
      this.ocurrenceRecord.appearances.push(newAppearance);
      this.showModal();
    },
    deleteAppearance(record) {
      console.log(record);
      this.ocurrenceRecord.appearances = this.ocurrenceRecord.appearances.filter(
        (item) => record.useContext !== item.useContext
      );
    },
    async createOcurrenceRecord() {
      this.loading = true;
      if (
        this.ocurrenceRecord.appearances.length ===
        this.ocurrenceRecord.numAppearance
      ) {
        this.ocurrenceRecord.status = 'Terminado';
      }
      this.ocurrenceRecord.isVariation = false;

      const { data } = await OcurrenceRecord.createOcurrenceRecord(
        this.ocurrenceRecord
      );
      const or = data.createOcurrenceRecord;
      console.log('or', or);
      //añadiendo el registro de ocurrencias a la documentacion de la entrada

      let newEntry = this.$store.entryA;
      newEntry.documentation.push(or.id);
      await EntryA.updateEntryDocumentation(newEntry);

      this.$router.push({ name: 'documentationTask' });
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
.ant-cascader-menu {
  height: 235px;
}

.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  padding: 40px;
}
</style>
