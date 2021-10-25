<template>
  <h4>Editar Unidad Fraseológica</h4>
  <br />
  <a-form ref="formRef" :model="entryToEdit" :rules="rules">
    <a-form-item
      ref="UF"
      label="Unidad Fraseológica"
      name="UF"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input v-model:value="entryToEdit.UF"></a-input>
    </a-form-item>
    <a-form-item
      v-for="(lemma, index) in entryToEdit.lemma"
      :key="index"
      :label="'Lema ' + (index + 1)"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-input
        v-model:value="entryToEdit.lemma[index].lemma"
        placeholder="Lemma de la Unidad Fraseológica"
        style="width: 300px; margin-right: 10px"
      ></a-input>
      <PlusOutlined
        v-if="entryToEdit.lemma.length - 1 === index"
        class="dynamic-add-button"
        :disabled="entryToEdit.lemma.length === 1"
        :style="{ color: '#1890ff' }"
        @click="addLemma"
      />
      <MinusCircleFilled
        v-if="entryToEdit.lemma.length > 1"
        class="dynamic-delete-button"
        :disabled="entryToEdit.lemma.length === 1"
        :style="{ color: 'red', marginLeft: '5px' }"
        @click="removeLemma(lemma)"
      />
    </a-form-item>
    <a-form-item
      ref="letter"
      label="Letras"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <div class="container ml-4 w-100">
        <a-transfer
          :titles="['Sin agregar', 'Agregadas']"
          :data-source="letters"
          :render="(letter) => letter.title"
          :filter-option="filterOptionLettersTransfer"
          show-search
          :target-keys="entryToEdit.letter"
          :locale="transferLocale"
          class="w-100"
          @change="handleChangeLettersTransfer"
        ></a-transfer>
      </div>
    </a-form-item>
    <div v-show="selectedSource.subType === 'Escrita'">
      <croppie-modal @crop="crop"></croppie-modal>
      <div v-if="editImageFile">
        <a-form-item
          v-if="showPreviewImage"
          ref="context"
          label="Contexto"
          name="context"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-space direction="vertical">
            <img v-show="showPreviewImage" :src="image.base64" />
            <a-button type="primary" @click="editImageFileChange">
              Atrás
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item
          v-else
          label="Info"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-space direction="vertical">
            <a-alert
              message='Click en cualquier parte de la ventana y luego "CTRL + V" para pegar la Imagen'
              type="info"
              show-icon
            />
            <a-button type="primary" @click="editImageFileChange">
              Atrás
            </a-button>
          </a-space>
        </a-form-item>
      </div>
      <div v-if="!editImageFile">
        <a-form-item
          ref="context"
          label="Contexto"
          name="context"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-space direction="vertical">
            <img :src="MINIO_URL_A + '/' + entryToEdit.context" />
            <a-button type="primary" @click="editImageFileChange">
              Cambiar Foto
            </a-button>
          </a-space>
        </a-form-item>
      </div>
    </div>
    <div v-show="selectedSource.support === 'Video'">
      <a-form-item
        ref="context"
        label="Contexto"
        name="context"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div v-if="!editFile">
          <a-space direction="horizontal" align="center">
            >
            <video
              :src="MINIO_URL_A + '/' + entryToEdit.context"
              width="320"
              height="240"
              controls
            ></video>
            <a-button type="primary" @click="editFileChange">
              Subir otro Video
            </a-button>
          </a-space>
        </div>
        <div v-if="editFile">
          <input
            ref="fileInput"
            type="file"
            name="file"
            style="display: none"
            accept="video/mp4,video/x-m4v,video/*"
            @change="onFileSelectedV"
          />
          <a-space direction="horizontal" align="center">
            >
            <a-button type="primary" @click="$refs.fileInput.click()">
              Seleccione el Video
            </a-button>
            <a-button type="primary" @click="editFileChange">Atrás</a-button>
          </a-space>
          <br />
          <span v-if="!selectedFile" class="file-info">
            Ningún archivo seleccionado
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
        </div>
      </a-form-item>
    </div>
    <div v-show="selectedSource.support === 'Audio'">
      <a-form-item
        ref="context"
        label="Contexto"
        name="context"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div v-if="editFile === false">
          <a-space direction="horizontal" align="center">
            <audio
              :src="MINIO_URL_A + '/' + entryToEdit.context"
              controls
            ></audio>
            <br />
            <a-button type="primary" @click="editFileChange">
              Subir otro Audio
            </a-button>
          </a-space>
        </div>
        <div v-if="editFile">
          <input
            ref="fileInputA"
            type="file"
            name="file"
            style="display: none"
            accept="audio/*"
            @change="onFileSelectedA"
          />
          <a-space direction="horizontal" align="center">
            <a-button type="primary" @click="$refs.fileInputA.click()">
              Seleccione el Audio
            </a-button>
            <a-button type="primary" @click="editFileChange">Atrás</a-button>
          </a-space>
          <br />
          <span v-if="!selectedFile" class="file-info">
            Ningún archivo seleccionado
          </span>
          <span v-else class="file-info">{{ selectedFile.name }}</span>
          <br />
          <audio v-show="showPreviewAudio" :src="audioPreview" controls></audio>
        </div>
      </a-form-item>
    </div>
    <div style="text-align: right">
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        style="margin-left: 5px"
        @click="editEntry"
      >
        Editar
      </a-button>
      <a-button key="back" @click="goBack">Cancelar</a-button>
    </div>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
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
import { MINIO_URL_A as minio_url } from '@/utils/minIO.ts';
import { Sources } from '@/graphql/modules/sourcesA/model.ts';

import CroppieModal from '../entryA/VueCroppie/CroppieModal.vue';
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
    'croppie-modal': CroppieModal,
  },
  setup() {
    const MINIO_URL_A = minio_url;
    return {
      MINIO_URL_A,
    };
  },
  data() {
    const rules = {
      UF: [
        {
          required: true,
          message: 'Por favor escriba la UF',
          trigger: 'blur',
        },
      ],
    };
    const formRef = ref();
    const loading = false;
    const entryToEdit = {
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
    return {
      selectedLetters,
      letters,
      transferLocale,
      image: {
        base64: null,
        file: null,
      },
      loading,
      entryToEdit,
      formRef,
      rules,
      selectedFile: null,
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
      uploadProgressImage: 0,
      selectedSource: {},
      editFile: false,
      editImageFile: false,
    };
  },
  async mounted() {
    const id = this.$route.params.id.toString();
    const { data } = await EntryA.getEntryByID(id);
    this.entryToEdit = data.getEntryByID;
    console.log('this.entryToEdit', this.entryToEdit);
    console.log('this.editFile', this.editFile);

    const sID = this.entryToEdit.source;
    const s = await Sources.getSourceByID(sID);
    this.selectedSource = s.data.getSourceByID;
  },
  methods: {
    handleChangeLettersTransfer(targetKeys) {
      this.entryToEdit.letter = targetKeys;
    },
    filterOptionLettersTransfer(inputValue, option) {
      return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    },
    removeLemma(lemma) {
      let index = this.entryToEdit.lemma.indexOf(lemma);
      if (index !== -1) {
        this.entryToEdit.lemma.splice(index, 1);
      }
    },
    addLemma() {
      this.entryToEdit.lemma.push({ lemma: '' });
    },
    editEntry() {
      console.log('this.entryToEdit', this.entryToEdit);
      if (this.selectedFile || this.editFile) {
        if (/\.(mp4|avi|x-m4v)$/i.test(this.selectedFile.name)) {
          this.uploadFileVideo();
        }
        if (
          /\.(mp3|m4a|wav|wma|flac|aac|opus)$/i.test(this.selectedFile.name)
        ) {
          this.uploadFileAudio();
        }
      }
      if (this.image.file !== null || this.editImageFile) {
        this.uploadFileImage();
      }
      this.loading = true;
      this.entryToEdit.source = this.selectedSource.id;
      EntryA.updateEntryByID(this.entryToEdit);
      console.log('this.entryToEdit', this.entryToEdit);
      this.$router.push({ name: 'lemarioFinal' });
    },
    //file Videos
    onFileSelectedV(event) {
      this.selectedFile = event.target.files[0];
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
        this.entryToEdit.context = 'Video_context_' + date + extensionFile;
        console.log('file name', this.entryToEdit.context);

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
          .post(`/${this.entryToEdit.context}`, formData, config)
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
      if (this.image.file) {
        this.showPreviewImage = true;
      }
    },
    uploadFileImage() {
      const fileImage = this.image;
      const element = fileImage.file;
      const extensionFile = '.' + element.name.split('.')[1];
      const date = Date.now();
      this.entryToEdit.context = 'Image_context_' + date + extensionFile;
      console.log('file name', this.entryToEdit.context);

      const config = {
        onUploadProgress: function (progressEvent) {
          this.uploadProgressImage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(this.uploadProgressImage);
        },
      };

      const formData = new FormData();
      formData.append('file', fileImage.file);
      axiosClientPostImage
        .post(`/${this.entryToEdit.context}`, formData, config)
        .then(function () {
          console.log('SUCCESS!!');
        })
        .catch(function () {
          console.log('FAILURE!!');
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
        this.entryToEdit.context = 'Audio_context_' + date + extensionFile;
        console.log('file name', this.entryToEdit.context);

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
          .post(`/${this.entryToEdit.context}`, formData, config)
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      }
    },
    goBack() {
      this.$router.push({ name: 'entries' });
    },
    editFileChange() {
      this.editFile = !this.editFile;
      console.log('this.editFile', this.editFile);
    },
    editImageFileChange() {
      this.editImageFile = !this.editImageFile;
      console.log('this.editImageFile', this.editImageFile);
    },
  },
});
</script>
<style>
.file-info {
  font-size: 13px;
  color: #000000;
  line-height: 53px;
  padding-left: 10px;
}
</style>
