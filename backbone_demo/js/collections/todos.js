/*global Backbone */
var app = app || {};
console.log(app);
(function () {
	'use strict';

	// Todo Collection

	// 今回はサーバを使えないのでデータの保存先をローカルストレージに指定。
	var Todos = Backbone.Collection.extend({
		// このコレクションの参照先の指定
		model: app.Todo,

		// すべてのtodoアイテムは「todos」名前空間にデータを作成
		localStorage: new Backbone.LocalStorage('todos-backbone'),

		// このコレクションの所持する関数はループを使わずに配列やオブジェクト全体に処理を行うような書き方になっている。
		// こういった記載の多様さが，JavaScriptの学習に対する大きなハードルの一つになっている木がしなくもないが，まあ頑張ろう

		// 完了済みのTodoアイテムのみをフィルタリングして返す
		completed: function () {
			// prototype.filter() は配列のすべてのアイテムをに対して，callback関数を与え，trueが帰ってきたもののみから生成する新たな配列を作成する関数
			return this.filter(function (todo) {
				return todo.get('completed');
			});
		},

		// 未了のアイテムのみを抽出して返す
		remaining: function () {
			// Array.without(value1 [, value2 [, .. valueN]])　valueは取り除きたい値。
			// fun.apply(thisArg[, argsArray]) メソッドのバインディング
			return this.without.apply(this, this.completed());
		},

		// 個々のtodoが作成された順番を制御する。このコレクションの置き差が0なら，1を，それ以外なら最終項目のorder+1を実施する
		// データベースのGUID（Globally Unique Identifier）の生成を行う
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// 全体順序付けのためのメソッド
		comparator: function (todo) {
			return todo.get('order');
		}
	});

	// 「Todos」のグローバルコレクションを作成
	app.todos = new Todos();
})();
