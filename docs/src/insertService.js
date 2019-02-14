

const ins_info = Symbol('ins_info');

export default class {

  [ins_info] = () => {
    return {
      name: 123,
      id: 123,
      memo: '111'
    }
  };

  constructor() {
    const baseurl = 'http://' + window.location.hostname + ':99/im/0dZ5Yh.html?';
    window.userName = `${this[ins_info]().name}`;
    window.userId = `${this[ins_info]().id}`;
    window.memo = `${this[ins_info]().memo}`;
    this.url = baseurl + `id=${this[ins_info]().id}&name=${this[ins_info]().name}&memo=${this[ins_info]().memo}`;
    // this.url = baseurl;
    // this.url = 'http://192.168.1.210:8080/im/0dZ5Yh.html?id=111&name=11&memo=111';
  }

  insert() {
    console.log(this.url);
  }

  remove() {
  }
}
