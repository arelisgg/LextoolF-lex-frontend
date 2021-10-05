<template>
  <a-modal title="Añadir Tema" width="600px" @ok="submit">
    <a-form :model="newTheme">
      <a-form-item
        ref="nombre"
        label="Nuevo Tema"
        name="nombre"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-input v-model:value="newTheme.nombre"></a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="closeModal">Cerrar</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">
        Agregar
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['close-modal', 'add-theme'],
  data() {
    const newTheme = {
      nombre: '',
    };
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const formItemLayoutModal = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const loading = false;
    return {
      formItemLayoutWithOutLabelModal,
      loading,
      newTheme,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    submit() {
      this.$emit('add-theme', this.newTheme);
      this.resetForm();
    },
    resetForm() {
      this.newTheme = {
        nombre: '',
      };
    },
  },
});
</script>
