<!--
  목적 : 건진 기준정보 - 건진검사
  Detail : 건진검사 등록/수정화면
  *
  examples:
  *
  -->
<template>
<div id="examinationItem">
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-widget content-bg="white">
          <v-layout row wrap slot="widget-content">
            <v-flex xs12 sm6>
              <y-select
                :editable="editable"
                label="건진검사"
                name="exam"
                v-model="healthItem.exam"
                item-text="value"
                item-value="key"
                :combo-items="comboItems"
              >
              </y-select>
            </v-flex>
            <v-flex xs12 sm6>
              <y-text
              :editable="editable"
              :counter="30"
              :maxlength="30"
              label="건진항목명"
              name="name"
              v-model="healthItem.name"
              v-validate="'required'"
              data-vv-name="name"
              :error-msg="errors.first('name')"
              prepend-icon="edit"
              >
              </y-text>
            </v-flex>
            <v-flex xs12 sm6>
                <y-text
                :editable="editable"
                :counter="30"
                :maxlength="30"
                label="단위"
                name="unit"
                v-model="healthItem.unit"
                prepend-icon="edit"
                >
                </y-text>
            </v-flex>
            <v-flex xs12 sm6>
              <y-select
                :editable="editable"
                label="결과타입"
                name="resultType"
                v-model="healthItem.resultType"
                item-text="value"
                item-value="key"
                :combo-items="comboItems"
              >
              </y-select>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                  :editable="editable"
                  :counter="300"
                  :maxlength="300"
                  label="참고치"
                  name="reference"
                  v-model="healthItem.reference"
                  prepend-icon="edit"
                ></v-textarea>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                  :editable="editable"
                  :counter="300"
                  :maxlength="300"
                  label="분석항목설명"
                  name="itemExplan"
                  v-model="healthItem.itemExplan"
                  prepend-icon="edit"
                ></v-textarea>
            </v-flex>
            <v-flex xs12 sm6>
                <y-text
                :editable="editable"
                :counter="30"
                :maxlength="30"
                label="출력순서"
                name="order"
                v-model="healthItem.order"
                prepend-icon="edit"
                >
                </y-text>
            </v-flex>
            <v-flex xs12 sm6>
                <v-switch
                label="사용여부"
                v-model="healthItem.usable"
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
              title="건진항목 규격"
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
  name: 'y-ExaminationItem',
  components: {
    VWidget
  },
  props: {
  },
  data: () => ({
    healthItem: {
      itemName: '',
      unit: '',
      reference: '',
      itemExplan: '',
      order: '',
      usable: true,
      exam: null,
      resultType: null
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
        { text: '기준', name: 'name', width: '40%', align: 'center' },
        { text: '기준치', name: 'remark', width: '30%', align: 'center' },
        { text: '이상', name: 'order', width: '15%', align: 'center' },
        { text: '이하', name: 'usable', width: '15%', align: 'center' },
        { text: '시작일', name: 'usable', width: '15%', align: 'center' },
        { text: '종료일', name: 'usable', width: '15%', align: 'center' }
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
          { name: '신체계측 및 혈압측정', remark: '고혈압, 체지방', order: '1', usable: '사용' },
          { name: '체성분분석', remark: '체성분 분석', order: '2', usable: '사용' },
          { name: '시청각 검사', remark: '근시, 원시, 난시, 백내장, 녹내장, 난청', order: '3', usable: '사용' },
          { name: '소변검사', remark: '신장염, 신증후군, 대사성질환, 신장 방광', order: '4', usable: '사용' },
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