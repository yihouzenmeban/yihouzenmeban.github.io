(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c26facce"],{"1a25":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"historyList"},[e("music-list",{attrs:{list:t.historyList,"list-type":1},on:{select:t.selectItem,del:t.deleteItem}},[e("div",{staticClass:"list-btn",attrs:{slot:"listBtn"},slot:"listBtn"},[e("span",{on:{click:function(s){return t.$refs.dialog.show()}}},[t._v("清空列表")])])]),e("mm-dialog",{ref:"dialog",attrs:{"body-text":"是否清空播放历史列表","confirm-btn-text":"清空"},on:{confirm:t.clearList}})],1)},c=[],o=e("2909"),n=e("5530"),a=(e("a434"),e("2f62")),l=e("5362"),r=e("093b"),u={name:"HistoryList",components:{MusicList:l["a"],MmDialog:r["a"]},computed:Object(n["a"])({},Object(a["c"])(["historyList","playing","currentMusic"])),methods:Object(n["a"])(Object(n["a"])({clearList:function(){this.clearHistory(),this.$mmToast("列表清空成功")},selectItem:function(t,s){this.selectPlay({list:this.historyList,index:s})},deleteItem:function(t){var s=Object(o["a"])(this.historyList);s.splice(t,1),this.removeHistory(s),this.$mmToast("删除成功")}},Object(a["d"])({setPlaying:"SET_PLAYING"})),Object(a["b"])(["selectPlay","clearHistory","removeHistory"]))},m=u,d=(e("2f81"),e("2877")),f=Object(d["a"])(m,i,c,!1,null,"2d87d009",null);s["default"]=f.exports},"2f81":function(t,s,e){"use strict";e("c2ab")},c2ab:function(t,s,e){}}]);
//# sourceMappingURL=chunk-c26facce.c4b78f6b.js.map