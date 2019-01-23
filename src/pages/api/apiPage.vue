<!--
  목적 : api 메뉴에 표시되는 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
  <div id="pageEditor">
    <v-container grid-list-xl fluid>
      <v-layout row wrap fill-height>
        <!-- <v-flex sm12>
          <v-card>
            <v-card-title>
              <span class="title">
                this is Editor
              </span>
              <v-spacer></v-spacer>
              <v-btn
                icon
                small
                flat
                dark
                color="indigo lighten-1"
                @click.stop="isCodeView = !isCodeView"
              >
                <v-icon>{{button}}</v-icon>
              </v-btn>
            </v-card-title>
            <v-responsive height="500px">
              <quill-editor
                v-if="!isCodeView"
                class="quill"
                v-model="content"
                :options="editorOption"
              >
              </quill-editor>
              <div 
                v-else
                class="quill-code">
                <code class="hljs" v-html="contentCode"></code>
              </div>
            </v-responsive>
          </v-card>
        </v-flex> -->
        <v-flex 
          v-for="item in contents"
          :key="item.id"
          sm12>
          <v-card
            flat>
            <v-card-title>
              <span class="title">
                {{title}}{{contents.length}}
              </span>
              <v-spacer></v-spacer>
              <v-btn
                icon
                small
                flat
                dark
                color="indigo lighten-1"
                @click.stop="isEdit = !isEdit"
              >
                <v-icon>{{icon}}</v-icon>
              </v-btn>
            </v-card-title>
            <v-responsive 
              v-if="isEdit"
              height="600px"
              class="ma-0 pa-2"
              >
              <v-text-field
              v-model="menu.name"
              label="제목"
              counter="50"
              clearable
              single-line
              :autofocus="true"
              />
              <v-divider></v-divider>
              <quill-editor
                class="quill"
                v-model="item.content"
                :options="editorOption"
              >
              </quill-editor>              
            </v-responsive>
            <v-card-text
              v-else
              class="ma-0 pa-2"
            >
              <div
                class="ql-container ql-snow">
                <div class="ql-editor"
                  v-html="item.content">
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="isEdit"
                :loading="btnDeleteLoading"
                :disabled="btnDeleteLoading"
                color="red lighten-1"
                class="white--text"
                @click="btnDeleteClick"
              >
                <v-icon left dark>not_interested</v-icon>
                delete
              </v-btn>
              <v-btn
                :loading="btnNewLoading"
                :disabled="btnNewLoading"
                color="indigo lighten-1"
                class="white--text"
                @click="btnNewClick"
              >
                <v-icon left dark>fiber_new</v-icon>
                new
              </v-btn>
              <v-btn
                v-if="isEdit"
                :loading="btnSaveLoading"
                :disabled="btnSaveLoading"
                color="success lighten-1"
                @click="btnSaveClick"
              >
                <v-icon left dark>save</v-icon>
                save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import hljs from 'highlightjs'; // syntax highlighter
import pretty from 'pretty';  // html formatter
import selectConfig from '@/js/selectConfig';
import transactionConfig from '@/js/transactionConfig';

export default {
  /* attributes: name, components, props, data */
  name: 'y-api-page',
  components: {
    quillEditor,
  },
  props: {
  },
  data: () => ({
    menuId: null,
    menu: {},
    contents: [],
    isEdit: false,
    btnSaveLoading: false,
    btnNewLoading: false,
    btnDeleteLoading: false,
    editorOption: {
      syntax: {
        highlight: text => hljs.highlightAuto(text).value
      }
    },
    editable: true
  }),
  computed: {
    icon () {
      if (this.isEdit) return 'description';
      else return 'edit';
    },
    title () {
      if (this.isEdit) return 'EDIT';
      else return 'READ';
    }
  },
  watch: {
    $route (to, from) {
      this.init();
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount () {
    this.init();
  },
  //* methods */
  methods: {
    init () {
      if (this.$route.params) this.menuId = this.$route.params.id;
      this.getMenu();
      this.getApiContents();  
      this.isEdit = false;
    },
    /**
     * 현재 페이지의 메뉴 조회
     */
    getMenu () {
      var baseUrl = this.$format(selectConfig.menus.get.url, this.menuId);
      var url = this.$backend.getUrl(baseUrl);
      var self = this;
      this.$http.get(url).then((_result) => {
        this.menu = _result.data;
      }).catch((_error) => {
        // handle error
        console.log(_error);
      });
    },
    /**
     * 현재 메뉴에 속해 있는 api 컨텐츠 조회
     */
    getApiContents () {
      var baseUrl = this.$format(selectConfig.apiContents.list.url, this.menuId);
      var url = this.$backend.getUrl(baseUrl);
      var self = this;
      this.$http.get(url).then((_result) => {
        if (_result.data.length) this.contents = _result.data;
        else this.contents = [
          {
            id: null,
            content: ''
          }
        ];
      }).catch((_error) => {
        // handle error
        console.log(_error);
      });
    },
    /**
     * 저장 버튼 클릭
     */
    btnSaveClick () {
      this.setBtnSaveLoading();
      var self = this;
      var baseUrl = '';
      var requestUrl = '';
      var param = {};
      if (self.menu.id) {
        // update
        baseUrl = this.$format(transactionConfig.menus.edit.url, self.menu.id);
        self.menu.id = Number(self.menu.id);
        self.menu.orderNo = Number(self.menu.orderNo);
        requestUrl = this.$backend.getUrl(baseUrl);
        console.log(requestUrl);
        this.$http.put(requestUrl, self.menu).then((_result) => {
          baseUrl = this.$format(transactionConfig.apiContents.edit.url, _result.data.id, self.contents[0].id);
          requestUrl = this.$backend.getUrl(baseUrl);
          console.log(JSON.stringify(self.contents[0]));
          self.$http.put(requestUrl, self.contents[0]).then((__result) => {
            console.log(JSON.stringify(__result));
          }).catch((_error) => {
            window.alert('update api content : ' + _error);
          });
        }).catch((_error) => {
          window.alert('update menu : ' + _error);
        });
      } else {
        // insert
        baseUrl = this.$format(transactionConfig.menus.insert.url);
        requestUrl = this.$backend.getUrl(baseUrl);
        this.$http.post(requestUrl, self.menu).then((_result) => {
          console.log(JSON.stringify(_result));
          baseUrl = this.$format(transactionConfig.apiContents.insert.url, _result.data.id);
          requestUrl = this.$backend.getUrl(baseUrl);
          console.log(JSON.stringify(self.contents[0]));
          self.$http.post(requestUrl, self.contents[0]).then((__result) => {
            console.log(JSON.stringify(__result));
          }).catch((_error) => {
            window.alert('insert api content : ' + _error);
          });
        }).catch((_error) => {
          window.alert('insert menu : ' + _error);
        });
      }
      // var baseUrl = this.$format(transactionConfig.apiContents.edit.url, self.menu.id, _item.id);
      // var url = this.$backend.getUrl(baseUrl);
      // param.id = _item.id;
      // param.content = _item.content;
      // var callMethod = null;
      // this.$http.put(url, param).then((_result) => {
      //   console.log('success:' + _result);
      // }).catch((_error) => {
      //   console.log(_error);
      // });
    },
    btnNewClick () {
      this.setBtnNewLoading();
      this.isEdit = true;
      this.menu = {
        id: null,
        name: '',
        orderNo: 0
      };
      this.contents = [
        {
          id: null,
          content: ''
        }
      ];
    },
    btnDeleteClick () {
      this.setBtnDeleteLoading();
      var baseUrl = this.$format(transactionConfig.menus.delete.url, this.menu.id);
      var requestUrl = this.$backend.getUrl(baseUrl);
      var self = this;
      this.$http.delete(requestUrl).then((_result) => {
        console.log('delete menu:' + JSON.stringify(_result));
        self.$router.go(0);
      }).catch((_error) => {
        window.alert('insert menu : ' + _error);
      });
    },
    setBtnSaveLoading () {
      this.btnSaveLoading = true;
      setTimeout(() => {
        this.btnSaveLoading = false;
      }, 3000);
    },
    setBtnNewLoading () {
      this.btnNewLoading = true;
      setTimeout(() => {
        this.btnNewLoading = false;
      }, 1000);
    },
    setBtnDeleteLoading () {
      this.btnDeleteLoading = true;
      setTimeout(() => {
        this.btnDeleteLoading = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
  .quill {
    height: 458px;
  };
  .quill-code {
    border: none;
    height: auto;
  };
  .quill-code > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
  }
</style>