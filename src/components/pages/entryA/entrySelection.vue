<template>
  <a-page-header>
    <template #title>
      <h4>Seleccionar Unidades Fraseológicas Candidatas</h4>
    </template>
    <template #extra>
      <a-tooltip
        title="Finalizar Tarea de Selección Unidades Fraseológicas Candidatas"
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
          message="Seleccione una Unidad Fraseológica Candidata en el menú lateral"
          type="info"
          show-icon
        />
      </div>
      <div v-show="entrySelected.UF !== ''">
        <h4>Información de la Entrada</h4>
        <a-descriptions>
          <a-descriptions-item label="Unidad Fraseológica">
            {{ entrySelected.UF }}
          </a-descriptions-item>
          <a-descriptions-item label="Frecuencia de Uso">
            {{ entrySelected.frecuency }}
          </a-descriptions-item>
        </a-descriptions>
        <a-form
          ref="formRef"
          :model="entryA"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="Seleccione una opción">
            <a-radio-group button-style="solid" @change="radioSelect">
              <a-radio-button :value="1">Incluir</a-radio-button>
              <a-radio-button :value="2">Excluir</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item ref="criteria" label="Anotaciones" name="criteria">
            <a-textarea
              v-model:value="entrySelected.criteria"
              placeholder="Especifique los Criterios que tuvo en cuenta para incluir o excluir la UF"
              allow-clear
            />
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
        </a-form>
        <a-collapse v-model:activeKey="activeKey" :bordered="false">
          <a-collapse-panel key="1" header="Información del Diccionario">
            <dictionary></dictionary>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Información de la Fuente">
            <a-descriptions>
              <a-descriptions-item label="Nombre">
                {{ entrySource.name }}
              </a-descriptions-item>
              <a-descriptions-item label="Referencia" :span="2">
                {{ entrySource.ref }}
              </a-descriptions-item>
              <a-descriptions-item label="Tipo">
                {{ entrySource.type }}
              </a-descriptions-item>
              <a-descriptions-item label="Medio">
                {{ entrySource.subType }}
              </a-descriptions-item>
              <a-descriptions-item label="Soporte">
                {{ entrySource.support }}
              </a-descriptions-item>
            </a-descriptions>
            <div v-if="sourceType === 'Linguística'">
              <a-descriptions>
                <a-descriptions-item label="Bloque">
                  {{ entrySource.bloque }}
                </a-descriptions-item>
                <a-descriptions-item
                  v-if="entrySource.bloque === 'NoFicción'"
                  label="Tema"
                >
                  {{ entrySource.theme }}
                </a-descriptions-item>
                <a-descriptions-item
                  v-if="entrySource.bloque === 'Ficción'"
                  label="Género"
                >
                  {{ entrySource.theme }}
                </a-descriptions-item>
              </a-descriptions>
              <div v-if="sourceSupport === 'Publicación Periódica'">
                <a-descriptions>
                  <a-descriptions-item label="Sección del Periódico">
                    {{ entrySource.session_p }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Tipo de revista">
                    {{ entrySource.magazine_type_p }}
                  </a-descriptions-item>
                </a-descriptions>
              </div>
              <div v-if="sourceType === 'Oral'">
                <a-descriptions>
                  <a-descriptions-item
                    label="Descripción del Hablante"
                    :span="2"
                  >
                    {{ entrySource.speaker }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Medio de Difusión">
                    {{ entrySource.broadcastMedium }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Tipología">
                    {{ entrySource.typology }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Duración">
                    {{ entrySource.cantMin }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Fecha de grabación">
                    {{ entrySource.recording_date }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Fecha de emisión">
                    {{ entrySource.broadcast_date }}
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </div>
            <div v-if="sourceType === 'Metalinguística'">
              <a-descriptions>
                <a-descriptions-item label="Tipo de Diccionario">
                  {{ entrySource.dictionaryType }}
                </a-descriptions-item>
                <a-descriptions-item label="Siglo">
                  {{ entrySource.century }}
                </a-descriptions-item>
                <a-descriptions-item label="Nombre de la biblioteca">
                  {{ entrySource.library_name }}
                </a-descriptions-item>
                <a-descriptions-item label="Localización URL">
                  {{ entrySource.url_location }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="Documentación">
            <div v-if="images.length > 0" class="w-100">
              <carrousel-images
                :images="images"
                :show-delete-icon="false"
                :show-add-image="false"
              ></carrousel-images>
            </div>
            <div v-else>
              <a-alert
                message="La unidad fraseológica no ha sido documentada"
                type="info"
                show-icon
              />
            </div>
          </a-collapse-panel>
        </a-collapse>
        <div style="text-align: right; margin-top: 24px">
          <a-button
            v-if="radio !== ''"
            key="submit"
            type="primary"
            :loading="loading"
            @click="submit"
          >
            {{ btnText }}
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
  DownloadOutlined,
  EditFilled,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, watch } from 'vue';
import { EntryA } from '@/graphql/modules/entryA/model.ts';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';
import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';
import CarrouselImages from '../ocurrenceRecordA/carrouselImages.vue';
import { MINIO_URL_A as minio_url } from '@/utils/minIO.ts';
import Dictionary from '../dictionaryA/dictionaryA.vue';

export default defineComponent({
  components: {
    PlusOutlined,
    DeleteFilled,
    EyeFilled,
    EditFilled,
    SearchOutlined,
    DownloadOutlined,
    'carrousel-images': CarrouselImages,
    dictionary: Dictionary,
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
    const entrySelected = {
      lemma: [],
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
    const entrySource = {};
    const images = [];
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      entrySelected,
      entrySource,
      sourceType: '',
      sourceSupport: '',
      images,
      candidateUFs: [],
      activeItem: null,
      radio: '',
      btnText: '',
    };
  },
  async mounted() {
    const { data } = await EntryA.getAllEntriesToSelect();
    this.candidateUFs = data.getAllEntriesToSelect;
  },
  methods: {
    async submit() {
      console.log('this.entrySelected', this.entrySelected);
      this.entrySelected.selected = true;
      let u = await EntryA.updateEntryByID(this.entrySelected);
      const updated = u.data.updateEntryByID;
      console.log('updated', updated);
      if (updated) {
        if (updated.included == 'Incluida') {
          this.$message.success(
            'La Unidad fraseológica se incluyó en el Lemario',
            10
          );
        }
        if (updated.included == 'Excluida') {
          this.$message.success(
            'La Unidad fraseológica se excluyó del Lemario',
            10
          );
        }
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
        lemma: [],
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
    goBack() {
      this.$router.push({ name: 'lemario' });
    },
    radioSelect(e) {
      this.radio = e.target.value;
      if (this.radio === 1) {
        this.entrySelected.included = 'Incluida';
        this.btnText = 'Incluir';
      }
      if (this.radio === 2) {
        this.entrySelected.included = 'Excluida';
        this.btnText = 'Excluir';
      }
      console.log('this.entrySelected', this.entrySelected);
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

      const s = await Sources.getSourceByID(candidateUF.source);
      this.entrySource = s.data.getSourceByID;
      this.sourceType = this.entrySource.type;
      this.sourceSupport = this.entrySource.support;
      this.radio = '';
      this.images = [];
      let documentation = this.entrySelected.documentation;
      for (let index = 0; index < documentation.length; index++) {
        const element = documentation[index];
        const or = await OcurrenceRecord.getOcurrenceRecordByID(element);
        const appearances = or.data.getOcurrenceRecordByID.appearances;
        console.log('appearances', appearances);
        this.images = this.images.concat(appearances);
      }
      console.log('this.images', this.images);
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
