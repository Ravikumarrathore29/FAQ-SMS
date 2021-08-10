var Vue = require('vue');
var VueResource = require('vue-resource');
var RandomWord = require('./random-word.vue');
Vue.use(VueResource);
var vm = new Vue({
  el: 'body',
  components: {
    'random-word': RandomWord
  }
});