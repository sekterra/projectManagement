<template>
  <div id="pageEditor">
    <v-container grid-list-xl fluid>
      <v-layout row wrap fill-height>
        <v-flex sm12>
          <h3 class="pa-0">Awesome Quill Editor &nbsp;&nbsp;<a href="https://quilljs.com">Offical Website</a></h3>
        </v-flex>
        <v-flex sm12>
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
        </v-flex>
        <v-flex sm12>
          <v-card>
            <v-card-title>
              <span class="title">
                Preview
              </span>
            </v-card-title>
            <v-responsive>
              <div class="ql-container ql-snow">
                <div class="ql-editor"
                  v-html="content">
                </div>
              </div>
            </v-responsive>
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

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      content: 'Compose Epic Story...',
      editorOption: {
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        }
      },
      isCodeView: false
    };
  },
  computed: {
    contentCode () {
      return pretty(hljs.highlightAuto(this.content).value);
    },
    button () {
      if (this.isCodeView) return 'edit';
      else return 'code';
    }
  },
  mounted () {
    setTimeout(() => {
      this.content = `<h1 class="ql-align-center">
        <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
        </h1>
        <p><br></p>
        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
        <p><br></p>
        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
        <p><br></p>
        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
        <p><br></p>
        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
        <p><br></p>
        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
        <p><br></p>
        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
        <p><br></p>
        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
        <p><br></p>
        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
        <p><br></p>
        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
        <p><br></p>
        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
        <p><br></p>
        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      `;
    }, 1300);
  },
  methods: {
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