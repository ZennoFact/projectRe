/*global Backbone */
var app = app || {};
// フィルタリングの実施
(function () {
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		// ＵＲＬで#/以降の部分を渡して，
		setFilter: function (param) {
			app.TodoFilter = param || '';

			// Todo.Modelのフィルターイベントをトリガーとして，Todoアイテムの常時非表示を切り替えるためのもの
			// trigger()はｊQueryの機能
			app.todos.trigger('filter');
		}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
