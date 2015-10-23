# Vue.js + Browserify

![](http://vuejs.org/images/logo.png)
![](http://substack.net/images/browserify/browserify.png)



## Browserify

Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

- http://browserify.org/
- https://github.com/substack/node-browserify



## Usage

```
var moment = require('moment-timezone');

document.addEventListener("DOMContentLoaded", function() {
  var Tokyo = document.getElementById('#tokyo');
  Tokyo.innerHTML = moment().tz('Asia/Tokyo').format()

  var LA = document.getElementById('#la');
  LA.innerHTML = moment().tz('America/Los_Angeles').format();
});
```


依存関係にあるライブラリのソースをつなげて一つの dist/index.js にまとめてくれる。

[Sample](./dist/index.html)



### コマンドラインから使う

```
$ browserify ./moment_test.js > dist/index.js
```

### APIから使う

```
var browserify = require('browserify');
browserify(['./index.js']).bundle()
```


### オプション

```
browserify(['./index.js'])
    .exclude('./node_modules/jquery/dist/jquery.js')
    .transform(coffeeify)
    .transform(exposify)
    .transform(stringify(['.html']))
    .transform(vueify)
    .require('./index.js', {expose: project_name})
    .require('vue')
    .bundle()
```


```
var browserify = require('browserify');
var coffeeify = require('coffeeify');
var stringify = require('stringify');
var vueify = require('vueify');

browserify(['./index.js'])
    .exclude('./node_modules/jquery/dist/jquery.js')
    //scriptタグでjQueryを読み込む
    .transform(coffeeify) // coffeeをコンパイルする
    .transform(exposify) 
	 // 他のスクリプトから require(project_name) で読めるようにする
    .transform(stringify(['.html']))
    .transform(vueify)
    .require('./index.js', {expose: project_name})
    .require('vue')
    .bundle()
```


### exclude例

```
<script src="js/jquery.js"></script>
<script src="js/index.js"></script>
```


## オプションがいっぱい

### ビルドツールを使いましょう

[gulpfile.js](https://github.com/nidate/vuejs-browserify-template/blob/master/gulpfile.js)

gruntでもできると思います。
https://github.com/jmreidy/grunt-browserify



## Plugin

```
var browserify = require('browserify');
var coffeeify = require('coffeeify');
var stringify = require('stringify');
var vueify = require('vueify');
browserify(['./index.js'])
    .exclude('./node_modules/jquery/dist/jquery.js')
    .transform(coffeeify)
    .transform(exposify)
    .transform(stringify(['.html']))
    .transform(vueify)
    .require('./index.js', {expose: project_name})
    .require('vue')
    .bundle()
```

〜ify!


### stringify

```
html = require './items.html'
```

.htmlの内容がStringにコンパイルされてこんな感じになる。

```
{"./items.html":6,"vue":undefined}],6:[function(require,module,exports){
module.exports = "<ul>\n  <li v-repeat=\"items\">\n    {{ message }}\n  </li>\n</ul>\n\n<input type=\"text\" v-model=\"message\" v-on=\"keyup: addItem()| key 'enter'\" />\n";

},{}]
```


### 他にも

[jadify](https://github.com/domenic/jadeify) なんてのもあるみたいですよ

https://www.npmjs.com/browse/keyword/browserify-plugin



### そして



## Vuefy

https://github.com/vuejs/vueify


コンポーネントを定義

text_component.vue
```
<template lang="jade">
.text
  {{text}}
</template>

<script lang="coffee">
Vue = require 'vue'
module.exports = Vue.extend
  props: [
    'text'
  ]
</script>
```


コンポーネントを使う
```
<template lang="jade">
div(v-repeat='list')
  text-component(text='{{text}}')
</template>

<script lang="coffee">
Vue = require 'vue'
textComponent = require './text_component.vue'
Vue.component 'text-component', textComponent
module.exports = Vue.extend
  data: ->
    list: [
      text: 'foo'
    ,
      text: 'bar'
    ,
      text: 'baz'
    ]
    
</script>
```


たぶんtemplateやscriptタグの部分をjade化できるんじゃないかしら



## 詳しくはこちらへ

https://github.com/nidate/vuejs-browserify-template



# Vue 1.0 changes

テンプレートの書き方がだいぶ変わります。
https://github.com/vuejs/vue/wiki/1.0.0-binding-syntax-reference#detailed-changes-from-012

```
<!-- before: -->
<div v-on="click: doThis, keyup: doThat">

<!-- after: -->
<div
  v-on:click="doThis"
  v-on:keyup="doThat">
```


jade で問題が起きるかも?

https://github.com/vuejs/vue/issues/1455

```
<div :name="something" :title="other">
↓
div(":name"="something" ":title"="other") ???
```

> I think proper Jade syntax is that you should separate attributes with commas: http://jade-lang.com/reference/attributes/



# さっきできた

https://github.com/nidate/vuejs-browserify-template/pull/1/files
