<template>
  <a-modal
    :visible="visible"
    title="Detalles de la Fuente"
    width="800px"
    :footer="null"
    @cancel="closeModal"
  >
    <a-descriptions>
      <a-descriptions-item label="Nombre">
        {{ selectedSource.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Referencia" :span="2">
        {{ selectedSource.ref }}
      </a-descriptions-item>
      <a-descriptions-item label="Tipo">
        {{ selectedSource.type }}
      </a-descriptions-item>
      <a-descriptions-item label="Medio">
        {{ selectedSource.subType }}
      </a-descriptions-item>
      <a-descriptions-item label="Soporte">
        {{ selectedSource.support }}
      </a-descriptions-item>
    </a-descriptions>
    <div v-if="selectedSource.type === 'Linguística'">
      <a-descriptions>
        <a-descriptions-item label="Bloque">
          {{ selectedSource.bloque }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="selectedSource.bloque === 'NoFicción'"
          label="Tema"
        >
          {{ selectedSource.theme }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="selectedSource.bloque === 'Ficción'"
          label="Género"
        >
          {{ selectedSource.theme }}
        </a-descriptions-item>
      </a-descriptions>
      <div v-if="selectedSource.support === 'Publicación Periódica'">
        <a-descriptions>
          <a-descriptions-item label="Sección del Periódico">
            {{ selectedSource.session_p }}
          </a-descriptions-item>
          <a-descriptions-item label="Tipo de revista">
            {{ selectedSource.magazine_type_p }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div v-if="selectedSource.subType === 'Oral'">
        <a-descriptions>
          <a-descriptions-item label="Descripción del Hablante" :span="2">
            {{ selectedSource.speaker }}
          </a-descriptions-item>
          <a-descriptions-item label="Medio de Difusión">
            {{ selectedSource.broadcastMedium }}
          </a-descriptions-item>
          <a-descriptions-item label="Tipología">
            {{ selectedSource.typology }}
          </a-descriptions-item>
          <a-descriptions-item label="Duración">
            {{ selectedSource.cantMin }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha de grabación">
            {{ selectedSource.recording_date }}
          </a-descriptions-item>
          <a-descriptions-item label="Fecha de emisión">
            {{ selectedSource.broadcast_date }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <div v-if="selectedSource.type === 'Metalinguística'">
      <a-descriptions>
        <a-descriptions-item label="Tipo de Diccionario">
          {{ selectedSource.dictionaryType }}
        </a-descriptions-item>
        <a-descriptions-item label="Siglo">
          {{ selectedSource.century }}
        </a-descriptions-item>
        <a-descriptions-item label="Nombre de la biblioteca">
          {{ selectedSource.library_name }}
        </a-descriptions-item>
        <a-descriptions-item label="Localización URL">
          {{ selectedSource.url_location }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent, h } from 'vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['selectedSource', 'visible'],
  emits: ['close-modal'],
  data() {
    const selectedSourceData = {};
    return {
      selectedSourceData,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>
