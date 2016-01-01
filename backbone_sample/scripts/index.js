// モデルの使用はBackbone.Modelを拡張して行う
// モデルのインスタンスが作成されるとinitialize()メソッドが起動。コンストラクタとして使用することが可能
// デフォルト値はdefaultsプロパティに設置する
var Todo = Backbone.Model.extend({
  initialize: function () {
    console.log('モデルが初期化されました');
  },
  defaults: {
    title: 'タイトル未設定',
    completed: false
  }
});

// 値を何も指定せずに，Todoモデルをインスタンス化することも可能
var todo1 = new Todo();

// ログへの出力を確認
console.log(JSON.stringify(todo1));

// 値を指定した場合のサンプル
var todo2 = new Todo({
  title: '一部のプロパティのみを設定',
});
console.log(JSON.stringify(todo2));

var todo3 = new Todo({
  title: 'コンソールに出力された属性値をチェック',
  completed: true
});
console.log(JSON.stringify(todo3));

// モデルへのプロパティはgeter，seterを使用する
console.log(todo3.get('title'));
console.log(todo3.get('completed'));

// モデルの持つすべての値を読み取ったり複製する場合はtoJSON()メソッドを使用。すべての属性がコピーされたオブジェクトを返す
// 返されれる値はJSON形式ではないことに注意。このメソッドを持っているオブジェクトをJSON.stringify()にわたすと，toJSON()の戻り値が文字列化される
console.log(todo3.toJSON());

// ひとつ，または複数の属性をモデルにセットする際は，Model.set()を使用
var todo = new Todo();
// 一つの属性をセット
todo.set("title","Model.set()によってセットされた値");
console.log('Todo項目のタイトル:' + todo.get('title'));
console.log('完了:' + todo.get('completed'));
// 複数の属性をモデルにセットする
todo.set({
  title: '初期化時と同じように，オブジェクトリテラルとして設定する',
  completed: true
});
console.log('Todo項目のタイトル:' + todo.get('title'));
console.log('完了:' + todo.get('completed'));

// TODO: ここ，理解が追い付いていない。要復習
// モデルにはattributesという属性が存在する。これはモデル内部に保持されているデータそのもの。モデルのJSON形式であることが多いが，その限りではない
// attributesに値を直接セットした場合，モデル関連のイベントは発生しない
// オプションとして，{silent: true}を追加した場合も，イベントは全く発生しない
var Person = new Backbone.Model();
Person.set({name: 'Catherine'}, {silent: true});
// いずれかの属性が変化したかのチェック
console.log(!Person.hasChanged());
// 属性を指定して値が変化したかのチェック
console.log(!Person.hasChanged('name'));

// モデルの変化を監視するには，モデルのchangeイベントに対してリスナーを関連付ける
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  initialize: function () {
    console.log('モデルが初期化されました');
    this.on('change', function () {
      console.log('モデルの値が変更されました');
    });
  }
})
var todo = new Todo();
console.log('todo: ' + JSON.stringify(todo));
todo.set('title', '属性値の変化に伴うリスナーの呼び出しを確認');
console.log('タイトルが変更されました:' + todo.get('title'));
todo.set('completed', true);
console.log('completed属性が変更されました' + todo.get('completed'));
todo.set({
  title: '複数の属性を一括指定した場合は，変更の通知は一度だけ',
  completed: true
});

// 個々の属性に対して監視を行う場合は以下の例
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  initialize: function () {
    console.log('モデルが初期化されました');
    this.on('change:title', function () {
      console.log('タイトルの値が変更されました');
    });
  },
  setTitle: function (newTitle) {
    this.set({ title: newTitle });
  }
})
var todo = new Todo();
console.log('todo: ' + JSON.stringify(todo));
todo.set('title', '属性値の変化に伴うリスナーの呼び出しを確認');
todo.setTitle('正月はBackboneJSの勉強する');
console.log('タイトルが変更されました:' + todo.get('title'));
todo.set('completed', true);
console.log('completed属性が変更されましたがイベントは発生しません' + todo.get('completed'));


// モデルでデータの検証にはModel.validate()を使用
// データの永続化にはsave()メソッドを使用。save()メソッド使用時とオプションで{validate: true}を指定してset()が呼び出されるときに検証が行われる
var Person = new Backbone.Model({
  name: 'Catherine'
});
// name属性の値を検証
Person.validate = function (attrs) {
  if(!attrs.name) {
    return "名前が必要です";
  }
};
// 名前を変更
Person.set({name: 'Monet'});
console.log(Person.get('name'));
// name属性を削除し，検証を行う
console.log( Person.unset('name', {validate: true}) );

// 検証をもう一例
var Todo = Backbone.Model.extend({
  defaults: {
    completed: false
  },
  validate: function (attrs) {
    if (attrs.title === undefined) {
      return "Todo項目にはタイトルをつけましょう";
    }
  },
  intialize: function () {
    console.log('モデルが初期化されました');
    this.on("invalid", function (model, error) {
      console.log(error);
    });
  }
});
var todo = new Todo();
console.log( todo.set('completed', true, {validate: true}) );
console.log('完了：' + todo.get('completed'));
