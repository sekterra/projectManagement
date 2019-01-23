<!--
  목적 : 건진 기준정보 - 건진종류
  Detail : 건진종류 등록/수정화면
  *
  examples:
  *
  -->
<template>
<div id="examinationType">
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-widget content-bg="white">
          <v-layout row wrap slot="widget-content">
            <v-flex xs12 sm6>
              <y-text
              :editable="editable"
              :counter="30"
              :maxlength="30"
              label="건진종류명"
              name="type"
              v-model="healthType.type"
              v-validate="'required'"
              data-vv-name="type"
              :error-msg="errors.first('type')"
              prepend-icon="edit"
              >
              </y-text>
            </v-flex>
            <v-flex xs12 sm6>
                <y-text
                :editable="editable"
                :counter="30"
                :maxlength="30"
                label="건진종류코드"
                name="code"
                v-model="healthType.code"
                v-validate="'required'"
                data-vv-name="code"
                :error-msg="errors.first('code')"
                prepend-icon="edit"
                >
                </y-text>
            </v-flex>
            <v-flex xs12 sm6>
                <y-text
                :editable="editable"
                :counter="30"
                :maxlength="30"
                label="약어"
                name="abbr"
                v-model="healthType.abbr"
                prepend-icon="edit"
                >
                </y-text>
            </v-flex>
            <v-flex xs12 sm6>
                <y-text
                :editable="editable"
                :counter="30"
                :maxlength="30"
                label="출력순서"
                name="order"
                v-model="healthType.order"
                prepend-icon="edit"
                >
                </y-text>
            </v-flex>
            <v-flex xs12 sm4>
                <v-switch
                label="사용여부"
                v-model="healthType.usable"
                ></v-switch>
            </v-flex>
            <v-flex xs12 sm4>
                <v-switch
                label="계획여부"
                v-model="healthType.planable"
                ></v-switch>
            </v-flex>
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
          </v-layout>
        </v-widget>
        <v-widget content-bg="white">
          <v-layout row wrap slot="widget-content">
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
  name: 'y-ExaminationType',
  components: {
    VWidget
  },
  props: {
  },
  data: () => ({
    healthType: {
      type: '',
      code: '',
      abbr: '',
      order: '',
      usable: true,
      planable: true,
    },
    editable: true,
    isSubmit: false,
    gridData: [],
    gridHeaderOptions: [],
    saveUrl: '',
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
      this.gridHeaderOptions = [
        { text: '삭제', name: 'delete', width: '10%', type: 'delete' },
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
    btnSaveClickedCallback (_result) {
      this.$emit('APP_REQUEST_SUCCESS', '저장 버튼이 클릭 되었습니다.');
    },
    btnClickedErrorCallback (_result) {
      this.$emit('APP_REQUEST_ERROR', _result);
    },
    /** end button 관련 이벤트 **/
  }
};
</script>