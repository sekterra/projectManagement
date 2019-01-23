<!--
  목적 : 유소견 건강상담
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- 입고 grid-->
        <v-flex xs12>
          <y-data-table 
            title="상담이력"
            ref="dataTable"
            :headers="counselGridHeaderOptions"
            :items="gridData"
            :editable="editable"
            :excel-down="true"
            :print="true">
          </y-data-table>
        </v-flex>
        <!-- 버튼-->
        <v-flex xs12 class="text-xs-right">
          <y-btn
            v-if="editable"
            type="clear"
            title="Excel"
          />
          <y-btn
            v-if="editable"
            type="clear"
            title="Print"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-healthCounsel',
  props: {
    gridData: [],
    gridHeaderOptions: [],
  },
  data: () => ({
    editable: true,
    isSubmit: false,
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    Object.assign(this.$data, this.$options.data());
    this.init();
    this.getList();
  },
  mounted () {
  },
  beforeDestory () {
  },
  //* methods */
  methods: {
    init () {
      // 그리드 헤더 설정
      this.counselGridHeaderOptions = [
        { text: '삭제', name: 'delete', width: '40%', type: 'delete' },
        { text: '방문일자', name: 'visit_dt', width: '40%' },
        { text: '과거력', name: 'history', width: '40%', align: 'center' },
        { text: '현병력', name: 'current', width: '30%', align: 'center' },
        { text: '증상', name: 'symptom', width: '15%', align: 'right' },
        { text: '상담내용', name: 'content', width: '15%', align: 'center' }
      ];
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.gridData = [
          { visit_dt: '2018-12-19', history: '없음', current: '알레르기', symptom: '두드러기', content: '간지러움' },
        ];
      }, 2000);
    },
  }
};
</script>