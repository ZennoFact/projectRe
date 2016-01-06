/*global $ */
// アプリケーションの定義　Appが存在していれば利用。なければ空のオブジェクトを使用
var app = app || {};
// Enterキーのキーコードを定数として設定
var ENTER_KEY = 13;
console.log(app);

// この記述でwindow.onLoad()と同等の実行を行うjQueryの記法
$(function () {
	// ECMAScriptの厳格モードをJavaScriptに適用。致命的なエラーにはならないコードをエラーにしたりできる。その他，
	// JavaScriptエンジンの最適化処理を困難にする誤りを修正。これによりstrictモードのコードの方が高速になる可能性が高い
	// 将来的に適用される予定の構文を禁止
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Strict_mode
  // http://analogic.jp/use-strict/
  // このあたりの情報が見てて勉強になるのでは？
	'use strict';

	// Backbone.jsによるAppの生成
	new app.AppView();
});
