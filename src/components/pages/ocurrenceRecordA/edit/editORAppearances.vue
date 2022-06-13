<template>
  <a-page-header>
    <template #title>
      <h4>Editar Apariciones del Registro de Ocurrencias</h4>
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
  <croppie-modal @crop="crop"></croppie-modal>
  <div class="w-100">
    <carrousel-images
      :images="images"
      :show-delete-icon="true"
      :show-add-image="true"
      @delete-image="deleteImage"
    ></carrousel-images>
  </div>
  <a-form ref="formRef" :model="roToEdit" :rules="rules">
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-right: 5px"
        @click="submit"
      >
        Editar
      </a-button>
      <a-button key="back" @click="goBack">Cancelar</a-button>
    </div>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';

import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusSquareFilled,
  PlusOutlined,
  LinkOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';

import CarrouselImages from '../carrouselImages.vue';
import CroppieModal from '../../entryA/VueCroppie/CroppieModal.vue';
import { OcurrenceRecord } from '@/graphql/modules/ocurrenceRecord/model';
import { axiosClientPostImage } from '@/plugins/axios';
import { EntryA } from '@/graphql/modules/entryA/model';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    PlusSquareFilled,
    LinkOutlined,
    PlusOutlined,
    DeleteOutlined,
    'carrousel-images': CarrouselImages,
    'croppie-modal': CroppieModal,
  },
  data() {
    const rules = {};
    const roToEdit: UnwrapRef<any> = reactive({
      source: '',
      numAppearance: 0,
      appearances: [],
      isVariation: false,
    });
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formRef = ref();
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
    const newImages = [];
    const images = [];
    const selectedImageIndex = -1;
    return {
      entryA,
      loading,
      images,
      newImages,
      selectedImageIndex,
      formRef,
      count: 0,
      roToEdit,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
      disabled: true,
      visible: false,
      formItemLayoutWithOutLabelModal,
    };
  },
  async mounted() {
    const id = this.$route.params.id.toString();
    const { data } = await OcurrenceRecord.getOcurrenceRecordByID(id);
    this.roToEdit = data.getOcurrenceRecordByID;
    console.log('this.roToEdit', this.roToEdit);

    this.images = this.roToEdit.appearances;
    console.log('this.images', this.images);
  },
  methods: {
    async submit() {
      this.loading = true;
      if (this.images.length !== 0) {
        await this.uploadFileImage();
      }
      await this.editOcurrenceRecord();
      this.$router.push({ name: 'documentationTask' });
    },
    async editOcurrenceRecord() {
      console.log('this.roToEdit', this.roToEdit);
      await OcurrenceRecord.editORAppearances(this.roToEdit);
      let id = this.$store.entryA.id;
      console.log('id', id);
      await EntryA.updateEntryFrecuency(id);
    },
    //file image
    uploadFileImage() {
      let contexts = [];
      let imagesToUpload = [];
      let contextsToUpload = [];
      for (let i = 0; i < this.images.length; i++) {
        const element = this.images[i];

        const context = element.useContext;
        console.log('context', context);

        if (context === '' || context === undefined) {
          console.log('context esteee', context);
          imagesToUpload.push(element);
          const extensionFile = '.' + element.file.name.split('.')[1];
          const date = Date.now();
          contexts.push(
            'Aparición_' +
              'Editada' +
              '_' +
              date +
              '_' +
              (i + 1) +
              extensionFile
          );
          contextsToUpload.push(
            'Aparición_' +
              'Editada' +
              '_' +
              date +
              '_' +
              (i + 1) +
              extensionFile
          );
        } else {
          contexts.push(element.useContext);
          console.log('element', element);
          console.log('element.useContext', element.useContext);
        }
      }

      console.log('contexts', contexts);
      console.log('contextsToUpload', contextsToUpload);
      this.roToEdit.numAppearance = contexts.length;
      this.roToEdit.appearances = [];
      for (let index = 0; index < contexts.length; index++) {
        const element = contexts[index];
        const newAppearance = {} as { useContext: '' };
        newAppearance.useContext = element;
        this.roToEdit.appearances.push(newAppearance);
      }
      // Uploading Images
      console.log('imagesToUpload', imagesToUpload);
      for (let i = 0; i < imagesToUpload.length; i++) {
        const fd = new FormData();
        fd.append('file', imagesToUpload[i].file);
        axiosClientPostImage.post(`/${contextsToUpload[i]}`, fd);
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
    goBack() {
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
  },
});
</script>
