<!--
  목적 : List를 가지고 있는 등록/수정화면 Sample 컴포넌트
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
          <v-widget title="Control별 사용예제" content-bg="white">
            <v-layout row wrap slot="widget-content">
              <!-- TODO: 여기만 복사할 것 -->
              <!-- 단순 Text 입력 예제 -->
              <v-flex xs12 sm6>
                <y-text
                  :editable="editable"
                  :counter="200"
                  :maxlength="200"
                  label="건진종류명"
                  name="type"
                  v-model="demo.type"
                  prepend-icon="edit"
                >
                </y-text>
              </v-flex>
              <!-- 필수 Text 입력 예제 -->
              <v-flex xs12 sm6>
                <y-text
                  :editable="editable"
                  :counter="50"
                  :max-length="100"
                  label="건진종류코드*"
                  name="code"
                  v-model="demo.code"
                  v-validate="'required'"
                  data-vv-name="workTitle"
                  :error-msg="errors.first('workTitle')"
                >
                </y-text>
              </v-flex>
              <v-flex xs12 sm6>
                <y-select
                  :editable="editable"
                  label="부서"
                  name="deptPk"
                  v-model="demo.deptPk"
                  item-text="value"
                  item-value="key"
                  :combo-items="comboItems"
                >
                </y-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-switch
                  label="사용여부"
                  v-model="demo.usable"
                ></v-switch>
              </v-flex>
              <v-flex xs12 sm6>
                <y-datepicker 
                  :editable="editable"
                  label="날짜"
                  name="date"
                  v-model="demo.date"
                  default-type="today"
                  v-validate="'required'"
                  data-vv-name="date"
                  :error-msg="errors.first('date')"
                >
                </y-datepicker>
              </v-flex>
              <!-- 버튼을 우측에 위치 하는 예제-->
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
                <y-btn
                  v-if="editable"
                  :action-url="deleteUrl"
                  :param="demo"
                  :is-submit="isSubmit"
                  type="delete"
                  title="삭제"
                  action-type="POST"
                  beforeSubmit = "getConfirm"
                  @getConfirm="getConfirm"
                  @btnClicked="btnDeleteClickedCallback" 
                  @btnClickedErrorCallback="btnClickedErrorCallback"
                />
                <y-btn
                  v-if="editable"
                  type="clear"
                  title="초기화"
                  @btnClicked="btnClearClickedCallback" 
                />
              </v-flex>
              <v-flex xs12>
                
              </v-flex>
              <!-- /TODO: 여기만 복사할 것 -->
            </v-layout>
          </v-widget>
              <!-- Grid 입력 예제 -->
              <v-widget title="Grid 사용예제" content-bg="white">
                <v-layout row wrap slot="widget-content">
                  <!-- TODO: 여기만 복사할 것 -->
                  <v-flex xs12>
                    <y-data-table 
                      title="건진종류"
                      ref="dataTable"
                      :headers="gridHeaderOptions"
                      :items="gridData"
                      :editable="editable"
                      :excel-down="true"
                      :print="true">
                    </y-data-table>
                  </v-flex>
                <!-- TODO: 여기만 복사할 것 -->
                </v-layout>
              </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<script>
import VWidget from '@/components/VWidget'; // TODO : 복사하지 마세요.
export default {
  /* attributes: name, components, props, data */
  name: 'y-sample1',
  components: {
    VWidget
  },
  props: {
  },
  data: () => ({
    demo: {
      type: '',
      code: '',
      deptPk: null,
      comboItems: null,
      usable: true,
      date: null
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
        { key: 'key1', value: '경영지원팀' },
        { key: 'key2', value: '영업팀' },
        { key: 'key3', value: 'SDG' },
        { key: 'key3', value: '기술연구소' },
      ];

      // 그리드 헤더 설정
      this.gridHeaderOptions = [
        { text: '삭제', name: 'delete', width: '40%', type: 'delete' },
        { text: '건진종류', name: 'type', width: '40%' },
        { text: '약어', name: 'abbr', width: '30%', align: 'center' },
        { text: '출력순서', name: 'order', width: '15%', align: 'right' },
        { text: '사용여부', name: 'usable', width: '15%', align: 'center' }
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
          { type: '종합건강검진', abbr: '종합건진', order: '1', usable: '사용' },
          { type: '일반건강건진', abbr: '일반건진', order: '2', usable: '사용' },
          { type: '특수건강건진', abbr: '특수건진', order: '3', usable: '사용' },
          { type: '배치전건강검진', abbr: '배치전건진', order: '4', usable: '사용' },
        ];
      }, 2000);
    },
    /**
     * 사용자의 입력을 받는다.
     */
    getConfirm () {
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