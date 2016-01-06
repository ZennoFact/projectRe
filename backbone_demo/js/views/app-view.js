/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// アプリケーションの起動
	// TODO: ここの処理をしっかりと把握

	// UIの最上位に「AppView」 を設置.
	app.AppView = Backbone.View.extend({

		// HTMLに作成しておいた'#todoapp'をelementとして利用
		el: '#todoapp',

		// statsテンプレートを設定
		statsTemplate: _.template($('#stats-template').html()),

		// 初期化時の一度だけ，イベントの設定を実施
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		// Todoアイテムの追加や変更に伴って「Todos」コレクションのイベントとバインドしてアプリケーションを初期化。
		// localStorage上に事前にアイテムが存在している場合.そのアイテムを呼び出す
		initialize: function () {
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-todo');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

			this.listenTo(app.todos, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.listenTo(app.todos, 'change:completed', this.filterOne);
			this.listenTo(app.todos, 'filter', this.filterAll);
			this.listenTo(app.todos, 'all', this.render);


			// 再描画が全モデルから呼び出されないために抑制する。
			// 描画はresetイベントをもとに発火し，fetchイベントの終了とともに，callbackのresetが動く
			// 本来fetchメソッドは外部との通信に使用する設定なんかが行えたりする
			app.todos.fetch({reset: true});
		},

		// 描画用メソッド。アプリに変更がかからない場合，描画は実行されない
		render: function () {
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if (app.todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// 一つのtodoアイテムをliとしてulに追加
		addOne: function (todo) {
			var view = new app.TodoView({ model: todo });
			$('#todo-list').append(view.render().el);
		},

		// 現存しているすべてのtodoアイテムを一度だけ，アプリケーションに追加
		addAll: function () {
			this.$('#todo-list').html('');
			app.todos.each(this.addOne, this);
		},

		filterOne: function (todo) {
			todo.trigger('visible');
		},

		filterAll: function () {
			app.todos.each(this.filterOne, this);
		},

		// 新規アイテムの属性を設定
		newAttributes: function () {
			return {
				title: this.$input.val().trim(),
				order: app.todos.nextOrder(),
				completed: false
			};
		},

		// input領域でEnterキーを叩くと新しいTodoが作成され，LocalStorageに保存される
		createOnEnter: function (e) {
			// String.trim()は文字列の両端にある空白を削除する。空白の場合はfalse
			// 押されたのがEnterキーではないor空白の入力で何もせずに抜ける
			if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
				return;
			}

			app.todos.create(this.newAttributes());
			// 入力とともにinput領域を空白に
			this.$input.val('');
		},

		// Todoアイテムの削除が完了すると表示もクリアする
		clearCompleted: function () {
			// underscore.jsの機能
			// _.invoke(list, methodName, [*arguments])
			_.invoke(app.todos.completed(), 'destroy');
			return false;
		},
		// Todoアイテムの完了チェックを一括で行うためのメソッド
		toggleAllComplete: function () {
			var completed = this.allCheckbox.checked;

			app.todos.each(function (todo) {
				todo.save({
					'completed': completed
				});
			});
		}
	});
})(jQuery);
