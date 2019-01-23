<!--
  목적 : 건진예약 > 건진 계획
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id>
    <v-container grid-list-xl fluid>
      <!-- 검색영역 -->
      <v-widget title="검색영역" content-bg="white">
        <v-layout row wrap slot="widget-content">
          <v-flex xs12 sm6>
            <y-datepicker
              :editable="editable"
              label="기간"
              name="date1"
              v-model="demo.date1"
              default-type="today"
              v-validate="'required'"
              data-vv-name="date1"
              :error-msg="errors.first('date1')"
            ></y-datepicker>
          </v-flex>
          <v-flex xs12 sm6>
            <y-datepicker
              :editable="editable"
              label="기간"
              name="date2"
              v-model="demo.date2"
              default-type="today"
              v-validate="'required'"
              data-vv-name="date2"
              :error-msg="errors.first('date2')"
            ></y-datepicker>
          </v-flex>
        </v-layout>
      </v-widget>
      <!-- 테이블영역 -->
      <v-widget title="건진 계획" content-bg="white">
        <v-layout row wrap slot="widget-content">
          <!-- 버튼을 우측에 위치 하는 예제-->
          <v-flex xs12 class="text-xs-right">
            <y-btn title="조회" type="search"/>
            <y-btn title="Excel"/>
            <y-btn title="Print"/>
          </v-flex>

          <!-- TODO: 여기만 복사할 것 -->
          <v-flex xs12>
            <y-data-table
              title="건진계획"
              ref="dataTable"
              :headers="gridHeaderOptions"
              :items="gridData"
              :editable="editable"
              :excel-down="true"
              :print="true"
            ></y-data-table>
          </v-flex>
          <!-- TODO: 여기만 복사할 것 -->
        </v-layout>
      </v-widget>
      <!-- 탭영역 -->
      <v-widget title="탭영역" content-bg="white">
        <v-layout row wrap slot="widget-content">
          <!-- 탭 추가예정 -->
        </v-layout>
      </v-widget>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
export default {
  /* attributes: name, components, props, data */
  name: "y-checkReserve",
  components: {
    VWidget
  },
  props: {},
  data: () => ({
    demo: {
      date1: null,
      date2: null
    },
    editable: true,
    gridData: [],

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
      this.gridHeaderOptions = [
        { text: "건진종류", name: "c1", width: "20%", align: "left" },
        { text: "건진계획", name: "c2", width: "25%", align: "left" },
        { text: "건진기간", name: "c3", width: "25%", align: "center" },
        { text: "예약마감일", name: "c4", width: "15%", align: "center" },
        { text: "대상자", name: "c5", width: "15%", align: "center" }
      ];
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.gridData = [
          {
            c1: "종합건강검진",
            c2: "2015년 종합건강건진",
            c3: "2015-03-01 ~ 2015-04-30",
            c4: "2015-03-31",
            c5: ""
          },
          {
            c1: "일반건강건진",
            c2: "2015년 일반건강건진",
            c3: "2015-04-01 ~ 2015-06-23",
            c4: "2015-03-31",
            c5: "120명"
          },
          {
            c1: "특수건강건진",
            c2: "2015년 특수건강건진",
            c3: "2015-03-01 ~ 2015-06-30",
            c4: "2015-04-30",
            c5: "30명"
          }
        ];
      }, 2000);
    },
    /** button 관련 이벤트 **/
    btnClearClickedCallback () {
      this.$validator.reset();
      this.$emit("APP_REQUEST_SUCCESS", "초기화 버튼이 클릭 되었습니다.");
    },
    btnSaveClickedCallback (_result) {
      this.$emit("APP_REQUEST_SUCCESS", "저장 버튼이 클릭 되었습니다.");
    },
    btnDeleteClickedCallback (_result) {
      this.$emit("APP_REQUEST_SUCCESS", "삭제 버튼이 클릭 되었습니다.");
    },
    btnClickedErrorCallback (_result) {
      this.$emit("APP_REQUEST_ERROR", _result);
    }
    /** end button 관련 이벤트 **/
  }
};
</script>