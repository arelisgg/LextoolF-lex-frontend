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
  <a-form ref="formRef" :model="ocurrenceRecord" :rules="rules">
    <a-form-item
      ref="corpus_treasure"
      label="CORPUS/Tesoro"
      name="corpus_treasure"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-cascader
        :options="corpus_treasures"
        :allow-clear="false"
        style="width: 400px"
        placeholder="Seleccione un CORPUS o Tesoro"
        @change="handleOptionsChange"
      />
    </a-form-item>
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
    <a-form-item
      ref="numSources"
      label="Número de Fuentes"
      name="numSources"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input-number
        v-model:value="ocurrenceRecord.numSources"
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
    const formRef = ref();
    const ocurrenceRecord: UnwrapRef<any> = reactive({
      corpus_treasure: '',
      numAppearance: 0,
      numSources: 0,
      appearances: [],
      status: 'En Proceso',
    });
    const newAppearanceModalShow = false;
    const loading = false;
    const corpus_treasures = [
      {
        value: 'CORPUS',
        label: 'CORPUS',
        children: [
          {
            value: 'Corpus del Español',
            label: 'Corpus del Español',
          },
          {
            value: 'CORPES',
            label: 'CORPES: Corpus del Español del Siglo XXI',
          },
          {
            value: 'CREA',
            label: 'CREA: Corpus de Referencia del Español Actual',
          },
          {
            value: 'CORDE',
            label: 'CORDE: Corpus Diacrónico del Español',
          },
          {
            value: 'CDH',
            label:
              'CDH: Corpus del Diccionario histórico de la lengua española',
          },
          {
            value: 'CEMC',
            label: 'CEMC: Corpus del Español Mexicano Contemporáneo',
          },
          {
            value: 'CORDIAM',
            label:
              'CORDIAM: Corpus Diacrónico y Diatópico del Español de América',
          },
        ],
      },
      {
        value: 'Tesoros',
        label: 'Tesoros',
        children: [
          {
            value: 'NTLE',
            label: 'NTLE: Nuevo tesoro lexicográfico de la lengua española',
          },
          {
            value: 'MDA',
            label: 'MDA: Mapa de diccionarios académicos',
          },
          {
            value: 'TLDEPR',
            label: 'TLDEPR: Tesoro lexicográfico del español de Puerto Rico',
          },
        ],
      },
    ];
    return {
      loading,
      newAppearanceModalShow,
      columns,
      formRef,
      count: 0,
      ocurrenceRecord,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      disabled: true,
      corpus_treasures,
      visible: false,
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
        (item) =>
          record.useContext !== item.useContext ||
          record.contextSource !== item.contextSource
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
    handleOptionsChange(value) {
      this.disabled = false;
      this.ocurrenceRecord.corpus_treasure = value[0] + ' ' + value[1];
      console.log(
        'this.ocurrenceRecord.corpus_treasure',
        this.ocurrenceRecord.corpus_treasure
      );
    },
  },
});
</script>
<style>
.ant-cascader-menu {
  height: 235px;
}
</style>
