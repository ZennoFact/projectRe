/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Todo Item View
	// --------------

	// Todoアイテム用のDOM要素を作成
	app.TodoView = Backbone.View.extend({
		//　Todoアイテムはliタグで作成
		tagName:  'li',

		// Cache the template function for a single item.
		// itemテンプレートを取得しキャッシュする。このデータをもとにTodoアイテムを表示していく
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		// Todoアイテム特有のるDOMイベントを設定していく
		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},

		// Todo.ModelとTodo.Viewをバインドして，その変更を受け付けるようにする
		// こうやって直接参照するようバインディングしておくと便利
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Todoアイテムのタイトルを再描画していく
		render: function () {
			// Todo.Modelの情報をテンプレートに流し込んでいく
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return (// hiddenの場合のみを処理するメソッド
				(!isCompleted && app.TodoFilter === 'completed') ||
				(isCompleted && app.TodoFilter === 'active')
			);
		},

		// Todoアイテムの完了，未了の切り替え
		toggleCompleted: function () {
			this.model.toggle();
		},

		// 編集モードに変更して，input領域を表示し，その領域にフォーカスを与える
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// 編集モードを終了すると同時に，情報を永続化する
		close: function () {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });

				if (value !== trimmedValue) {
					// 独自イベントを設定
					this.model.trigger('change');
				}
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// Enterきーを入力すると編集を終了し，入力領域を閉じる
		updateOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
				this.close();
			}
		},

		// Todoアイテムの削除と同時に，LocalStorageからも情報を削除
		clear: function () {
			this.model.destroy();
		}
	});
})(jQuery);
