<template>
  <div class="br-header">
    <div class="br-header-left">
      <div class="navicon-left hidden-md-down" style="width: 70px">
        <a id="btnLeftMenu"><i class="icon ion-navicon-round"></i></a>
      </div>
      <div class="navicon-left hidden-lg-up" style="width: 70px">
        <a id="btnLeftMenuMobile">
          <i class="icon ion-navicon-round"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.br-header,
.br-logo {
  z-index: 999;
}
</style>
