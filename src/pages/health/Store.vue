<!--
  목적 : 약품관리 - 입고
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-widget title="약품 입고" content-bg="white">
            <v-layout row wrap slot="widget-content">
              <!-- 검색조건-->
              <v-flex xs12 sm3>
                <y-datepicker 
                  mg-400
                  :editable="editable"
                  label="입고일자"
                  name="date"
                  v-model="demo.storeDt"
                  default-type="today"
                  v-validate="'required'"
                  data-vv-name="date"
                  :error-msg="errors.first('date')"
                >
                </y-datepicker>
              </v-flex>
              <!-- 입고 grid-->
              <v-flex xs12>
                <y-data-table 
                  title="입고"
                  ref="dataTable"
                  :headers="gridHeaderOptions"
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
                  :action-url="saveUrl"
                  :param="demo"
                  :is-submit="isSubmit"
                  type="save"
                  title="저장"
                  action-type="POST"
                  beforeSubmit = "beforeSubmit"
                  @beforeSubmit="beforeSubmit"
                  @btnClicked="btnSaveClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
              </v-flex>
              <!-- 검색조건-->
              <v-flex xs12 sm3>
                <y-datepicker 
                  mg-400
                  :editable="editable"
                  label="입고기간 시작일"
                  name="date"
                  v-model="demo.storeStartDt"
                  default-type="today"
                  v-validate="'required'"
                  data-vv-name="date"
                  :error-msg="errors.first('date')"
                >
                </y-datepicker>
              </v-flex>
              <v-flex xs12 sm3>
                <y-datepicker 
                  mg-400
                  :editable="editable"
                  label="입고기간 종료일"
                  name="date"
                  v-model="demo.storeEndDt"
                  default-type="today"
                  v-validate="'required'"
                  data-vv-name="date"
                  :error-msg="errors.first('date')"
                >
                </y-datepicker>
              </v-flex>
              <v-flex xs12 sm6>
                <y-select
                  :editable="editable"
                  label="약품"
                  name="medicinePk"
                  v-model="demo.medicinePk"
                  item-text="value"
                  item-value="key"
                  :combo-items="comboItems"
                >
                </y-select>
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
              <!-- 입고 grid-->
              <v-flex xs12>
                <y-data-table 
                  title="입고 리스트"
                  ref="dataTable"
                  :headers="listGridHeaderOptions"
                  :items="listGridData"
                  :editable="editable"
                  :excel-down="true"
                  :print="true">
                </y-data-table>
              </v-flex>
            </v-layout>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
export default {
  /* attributes: name, components, props, data */
  name: 'y-store',
  components: {
    VWidget
  },
  props: {
  },
  data: () => ({
    demo: {
      medicinePk: null,
      comboItems: null,
      storeDt: null,
      storeStartDt: null,
      storeEndDt: null
    },
    editable: true,
    isSubmit: false,
    gridData: [],
    gridHeaderOptions: [],
    saveUrl: '',
    deleteUrl: ''
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
      // 콤보박스 초기 정보 세팅
      this.comboItems = [
        { key: '', value: '' },
        { key: 'key1', value: '후시딘' },
        { key: 'key2', value: '진통제' },
        { key: 'key3', value: '소화제' },
      ];

      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '약품명', name: 'medicine_nm', width: '40%' },
        { text: '단위', name: 'unit', width: '30%', align: 'center' },
        { text: '입고량', name: 'stock', width: '15%', type: 'text' },
        { text: '비고', name: 'rmk', width: '15%', type: 'text' }
      ];

      // 리스트 그리드 헤더 설정
      this.listGridHeaderOptions = [
        { text: '삭제', name: 'delete', width: '40%', type: 'delete' },
        { text: '입고일자', name: 'store_dt', width: '40%' },
        { text: '약품명', name: 'medicine_nm', width: '40%', align: 'center' },
        { text: '단위', name: 'unit', width: '30%', align: 'center' },
        { text: '입고량', name: 'stock', width: '15%', align: 'right' },
        { text: '비고', name: 'rmk', width: '15%', align: 'center' }
      ];
    },
    /** 저장 하기전 UI단 유효성 검사 **/
    beforeSubmit () {
      this.checkValidation();
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation () {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result;
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', '유효성 검사도중 에러가 발생하였습니다.');
      }).catch(() => {
        this.isSubmit = false;
      });
    },
    getList () {
      // var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      // var url = this.$backend.getUrl(baseUrl);
      // var self = this;
      setTimeout(() => {
        this.gridData = [
          { medicine_nm: '후시딘', unit: 'ml', stock: '100', rmk: '연고' },
          { medicine_nm: '', unit: '', stock: '', rmk: '' },
          { medicine_nm: '', unit: '', stock: '', rmk: '' },
          { medicine_nm: '', unit: '', stock: '', rmk: '' },
        ];
        this.listGridData = [
          { store_dt: '2018-12-19', medicine_nm: '후시딘', unit: 'ml', stock: '100', rmk: '연고' },
        ];
      }, 2000);
    },
    /** button 관련 이벤트 **/
    btnClearClickedCallback () {
      this.$validator.reset();
      this.$emit('APP_REQUEST_SUCCESS', '초기화 버튼이 클릭 되었습니다.');
    },
    btnSaveClickedCallback (_result) {
      this.$emit('APP_REQUEST_SUCCESS', '저장 버튼이 클릭 되었습니다.');
    },
    btnDeleteClickedCallback (_result) {
      this.$emit('APP_REQUEST_SUCCESS', '삭제 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>