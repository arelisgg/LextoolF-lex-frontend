<template>
  <div class="br-sideleft overflow-y-auto">
    <label class="sidebar-label pd-x-10 mg-t-10">Menú</label>
    <div class="br-sideleft-menu">
      <template v-for="link in links" :key="link.text">
        <router-link
          v-if="!link.children"
          active-class="active"
          :to="link.to"
          class="br-menu-link"
        >
          <div class="br-menu-item">
            <i :class="link.icon" class="menu-item-icon icon tx-24"></i>
            <span class="menu-item-label">{{ link.text }}</span>
            <i
              v-if="link.children"
              class="menu-item-arrow fa fa-angle-down"
            ></i>
          </div>
        </router-link>
        <div v-else class="u-pointer br-menu-link show-sub">
          <div class="br-menu-item">
            <i class="menu-item-icon icon ion-ios-list-outline tx-24"></i>
            <span class="menu-item-label">{{ link.text }}</span>
            <i class="menu-item-arrow fa fa-angle-down"></i>
          </div>
        </div>

        <ul v-if="link.children" class="br-menu-sub nav flex-column">
          <li
            v-for="children in link.children"
            :key="children.text"
            class="nav-item hvr-forward"
          >
            <router-link :to="children.to" class="nav-link">
              {{ children.text }}
            </router-link>
          </li>
        </ul>
      </template>
    </div>
    <br />
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
  data: () => ({
    links: [
      {
        text: 'Diccionario Fraseológico',
        icon: 'ion-ios-book',
        to: { name: 'dictionaryA' },
      },
      {
        text: 'Gestión del Lemario',
        children: [
          {
            text: 'Extracción de UF',
            to: { name: 'firstExtraction' },
          },
          {
            text: 'Documentar UF',
            to: { name: 'entries' },
          },
          {
            text: 'Selección de UF',
            to: { name: 'entrySelection' },
          },
          {
            text: 'Lematización',
            to: { name: 'lemario' },
          },
          {
            text: 'Lemario',
            to: { name: 'lemarioFinal' },
          },
        ],
      },
      {
        text: 'Reportes',
        children: [
          {
            text: 'Fuentes de Extracción',
            to: { name: 'extractionSources' },
          },
          {
            text: 'Fuentes de Documentación',
            to: { name: 'documentationSources' },
          },
          {
            text: 'Entradas Excluídas',
            to: { name: 'excludedEntries' },
          },
        ],
      },
    ],
  }),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.menu-item-label {
  font-weight: 500;
}

.br-menu-item {
  padding: 0 10px !important;
}

.br-menu-link.active {
  color: #fff;
  background: #0a1017;
}
</style>
