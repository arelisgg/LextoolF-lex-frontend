<template>
  <a-modal title="Registrar Nueva Aparición" width="600px" @ok="submit">
    <a-form :model="newAppearance">
      <a-form-item
        ref="contextSource"
        label="Fuente del contexto de Uso"
        name="contextSource"
        :label-col="labelColModal"
        :wrapper-col="wrapperColModal"
      >
        <a-textarea
          v-model:value="newAppearance.contextSource"
          placeholder="Referencia de la Fuente del contexto de Uso"
          allow-clear
        />
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
  emits: ['close-modal', 'add-appearance'],
  data() {
    const newAppearance = {
      useContext: '',
      contextSource: '',
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
      newAppearance,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    submit() {
      this.$emit('add-appearance', this.newAppearance);
      this.resetForm();
    },
    resetForm() {
      this.newAppearance = {
        useContext: '',
        contextSource: '',
      };
    },
  },
});
</script>
