<template>
  <a-modal title="Seleccione que desea editar:" @ok="submit">
    <div>
      <a-radio-group
        default-value="a"
        button-style="solid"
        :style="radioStyle"
        @change="onChange"
      >
        <a-radio-button value="a">
          Editar Apariciones documentadas
        </a-radio-button>
        <a-radio-button value="b">
          Editar Fuente de Documentación
        </a-radio-button>
      </a-radio-group>
    </div>
    <template #footer>
      <a-button key="back" @click="closeModal">Cancelar</a-button>
      <a-button key="submit" type="primary" @click="submit">Aceptar</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons-vue';
import { Sources } from '@/graphql/modules/sourcesA/model';

export default defineComponent({
  components: {
    MinusCircleFilled,
    PlusOutlined,
  },
  emits: ['close-modal', 'select-to-edit'],
  data() {
    const formItemLayoutWithOutLabelModal = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const modalShow = false;
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
    const selectedOption = 'appearances';
    return {
      formItemLayoutWithOutLabelModal,
      modalShow,
      labelColModal: { span: 8 },
      wrapperColModal: { span: 14 },
      selectedOption,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
    };
  },
  methods: {
    submit() {
      this.$emit('select-to-edit', this.selectedOption);
      this.resetForm();
    },
    onChange(e) {
      console.log('radio checked', e.target.value);
      const rs = e.target.value;
      if (rs === 'a') {
        this.selectedOption = 'appearances';
        console.log('this.selectedOption', this.selectedOption);
      }
      if (rs === 'b') {
        this.selectedOption = 'source';
        console.log('this.selectedOption', this.selectedOption);
      }
    },
    closeModal(event) {
      this.$emit('close-modal');
      this.resetForm();
    },
    resetForm() {
      this.selectedOption = null;
    },
  },
});
</script>
