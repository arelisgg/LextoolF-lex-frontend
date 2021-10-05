<template>
  <div v-if="images.length > 0">
    <div style="margin-top: 5px; width: 100%">
      <ul
        style="
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          padding: 0px;
        "
      >
        <li
          v-for="(item, index) in images"
          :key="index"
          style="width: 120px; display: inline; padding: 10px"
        >
          <a-image
            v-if="item.context !== ''"
            :src="MINIO_URL + '/' + item.context"
            alt="Articulo Lexicografico"
            :style="index === selectedImageIndex ? selectedImageStyle : {}"
            @click="changeSelectedImage(index)"
          />
          <a-image
            v-else
            :src="item.base64"
            alt="Articulo Lexicografico"
            :style="index === selectedImageIndex ? selectedImageStyle : {}"
            @click="changeSelectedImage(index)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MINIO_URL as minio_url } from '@/utils/minIO.ts';

export default defineComponent({
  props: {
    images: {
      type: [Object],
      default: () => {
        return {
          base64: null,
          file: null,
        };
      },
    },
    selectedImageIndex: {
      type: Number,
    },
    selectedImageStyle: {
      type: Object,
      default: () => {
        return {
          border: 'solid 5px #08c',
        };
      },
    },
  },
  emits: ['select-image'],
  setup(props, context) {
    const MINIO_URL = minio_url;
    function changeSelectedImage(index) {
      context.emit('select-image', index);
    }
    return {
      MINIO_URL,
      changeSelectedImage,
    };
  },
});
</script>
