<template>
  <a-modal
    :visible="visible"
    title="Detalles del Registro de Ocurrencias"
    width="800px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-descriptions>
      <a-descriptions-item label="Nombre">
        {{ selectedVariationRecord.or.variationUF }}
      </a-descriptions-item>
      <a-descriptions-item label="Nombre">
        {{ selectedVariationRecord.source.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Referencia" :span="2">
        {{ selectedVariationRecord.source.ref }}
      </a-descriptions-item>
      <a-descriptions-item label="Tipo">
        {{ selectedVariationRecord.source.type }}
      </a-descriptions-item>
      <a-descriptions-item label="Medio">
        {{ selectedVariationRecord.source.subType }}
      </a-descriptions-item>
      <a-descriptions-item label="Soporte">
        {{ selectedVariationRecord.source.support }}
      </a-descriptions-item>
    </a-descriptions>
    <div v-if="sourceType === 'Linguística'">
      <a-descriptions>
        <a-descriptions-item label="Bloque">
          {{ selectedVariationRecord.source.bloque }}
        </a-descriptions-item>
        <a-descriptions-item v-if="sourceBloque === 'NoFicción'" label="Tema">
          {{ selectedVariationRecord.source.theme }}
        </a-descriptions-item>
        <a-descriptions-item v-if="sourceBloque === 'Ficción'" label="Género">
          {{ selectedVariationRecord.source.theme }}
        </a-descriptions-item>
      </a-descriptions>
      <div v-if="sourceSupport === 'Publicación Periódica'">
        <a-descriptions>
          <a-descriptions-item label="Sección del Periódico">
            {{ selectedVariationRecord.source.session_p }}
          </a-descriptions-item>
          <a-descriptions-item label="Tipo de revista">
            {{ selectedVariationRecord.source.magazine_type_p }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div v-if="sourceType === 'Oral'">
        <a-descriptions>
          <a-descriptions-item label="Descripción del Hablante" :span="2">
            {{ selectedVariationRecord.source.speaker }}
          </a-descriptions-item>
          <a-descriptions-item label="Medio de Difusión">
            {{ selectedVariationRecord.source.broadcastMedium }}
          </a-descriptions-item>
          <a-descriptions-item label="Tipología">
            {{ selectedVariationRecord.source.typology }}
          </a-descriptions-item>
          <a-descriptions-item label="Duración">
            {{ selectedVariationRecord.source.cantMin }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha de grabación">
            {{ selectedVariationRecord.source.recording_date }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha de emisión">
            {{ selectedVariationRecord.source.broadcast_date }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <div v-if="sourceType === 'Metalinguística'">
      <a-descriptions>
        <a-descriptions-item label="Tipo de Diccionario">
          {{ selectedVariationRecord.source.dictionaryType }}
        </a-descriptions-item>
        <a-descriptions-item label="Siglo">
          {{ selectedVariationRecord.source.century }}
        </a-descriptions-item>
        <a-descriptions-item label="Nombre de la biblioteca">
          {{ selectedVariationRecord.source.library_name }}
        </a-descriptions-item>
        <a-descriptions-item label="Localización URL">
          {{ selectedVariationRecord.source.url_location }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="w-100">
      <carrousel-images
        :images="images"
        :show-delete-icon="false"
        :show-add-image="false"
      ></carrousel-images>
    </div>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import CarrouselImages from './carrouselImages.vue';

export default defineComponent({
  components: {
    CheckOutlined,
    'carrousel-images': CarrouselImages,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: [
    'selectedVariationRecord',
    'sourceType',
    'sourceSupport',
    'sourceBloque',
    'images',
    'visible',
  ],
  emits: ['close-modal'],
  data() {
    const selectedVariationRecordData = {};
    return {
      selectedVariationRecordData,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
