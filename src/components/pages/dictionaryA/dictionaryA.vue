<template>
  <h4>Información del Proyecto de Diccionario</h4>
  <a-space direction="horizontal" align="start">
    <a-image
      :src="MINIO_URL_A + '/' + dictionary.image"
      :style="{
        border: '2px solid #fff',
        borderRadius: '10px',
        boxShadow: '5px 5px 5px #ccc',
        width: '200px',
      }"
    ></a-image>
    <div :style="{ padding: '20px' }">
      <a-descriptions>
        <a-descriptions-item label="Nombre">
          {{ dictionary.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Tipo de Diccionario">
          {{ dictionary.dictionaryType }}
        </a-descriptions-item>
        <a-descriptions-item label="Etapa">
          {{ dictionary.state }}
        </a-descriptions-item>
        <a-descriptions-item label="Descripción" :span="3">
          {{ dictionary.description }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-space>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MINIO_URL_A as minio_url } from '@/utils/minIO.ts';
import { DictionaryA } from '@/graphql/modules/dictionaryA/model.ts';

export default defineComponent({
  setup() {
    const MINIO_URL_A = minio_url;
    return {
      MINIO_URL_A,
    };
  },
  data() {
    const dictionary = {
      name: '',
      image: '',
      description: '',
      state: '',
      dictionaryType: '',
    };
    return {
      dictionary,
    };
  },
  async mounted() {
    const d = await DictionaryA.findAllDictionariesA();
    const dictionary = d.data.findAllDictionariesA;
    this.dictionary = dictionary[0];
    console.log(dictionary);
    console.log(this.dictionary);
  },
});
</script>
