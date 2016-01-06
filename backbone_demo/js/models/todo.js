/*global Backbone */
var app = app || {};
console.log(app);
// この記法はJavaScriptの即時実行関数。本来，関数は呼び出しを行わなければ称しないが，この書き方だと即時に実行される。
// なぜこのような即座に実行するための関数を用意するかというと，JavaScriptには名前空間という概念がなくすべてがグローバル扱いになってしまうという構造になっている
// グローバルの汚染を極力行わない固いつくりにするために，即時実行関数を作成することは多分に行われるので，見てびっくりしないように
(function () {
	'use strict';

	// Todo Model
	// 今回のTodoモデルにはタイトル，順番，完了済みか否かの属性を与える
	// title: String
	// order: int
	// completed: boolean
	// という考え方でモデルを作成
	app.Todo = Backbone.Model.extend({
		// 初期値の固定できる属性は，「defaults」属性で定義しておく。こうしておくことで，必ず存在する属性にできる
		defaults: {
			title: '',
			completed: false
		},
	});
	// オブジェクトのメソッドをprototypeで設定するのは全オブジェクトにメソッドの定義が内包されることを防ぐため
	app.Todo.prototype.toggle = function () {
		this.save({
			completed: !this.get('completed')
		});
	};
})();
