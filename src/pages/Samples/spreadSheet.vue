<!--
  TODO: 
-->
<template>
  <hot-table :settings="settings"></hot-table>
</template>

<script>
import { HotTable } from '@handsontable/vue';

export default {
  name: '',
  components: {
    HotTable
  },
  /** props, data, computed, watch **/
  props: {
  },
  data () {
    return {
      settings: {
        data: [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ],
        colHeaders: true,
        rowHeaders: true,
      }
    };
  },
  computed: {
  },
  watch: {
  },
  /** created, beforeMount, mounted, beforeDestroy, destroied **/
  created () {
    console.log(':::::::::: created ::::::::::');
  },
  beforeMount () {
    console.log(':::::::::: beforeMount ::::::::::');
  },
  mounted () {
    console.log(':::::::::: mounted ::::::::::');
  },
  beforeDestroy () {
    console.log(':::::::::: beforeDestroy ::::::::::');
  },
  destroied () {
    console.log(':::::::::: destroied ::::::::::');
  },
  /** methods **/
  methods: {

  },
};
</script>

<style src="../../../node_modules/handsontable/dist/handsontable.full.css"></style>
