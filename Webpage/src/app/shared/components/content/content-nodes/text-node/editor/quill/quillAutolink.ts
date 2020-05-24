import Delta from 'quill-delta';
import Autolinker from 'autolinker';

const defaults = {
  globalRegularExpression: /https?:\/\/[\S]+/g,
  urlRegularExpression: /(https?:\/\/[\S]+)/
};

export default class QuillAutoLink {

  autolinker = new Autolinker();
  quill;
  options;
  constructor (quill, options) {
    this.quill = quill;
    options = options || {};
    this.options = {...defaults, ...options};
    this.registerTypeListener();
    this.registerPasteListener();
  }
  registerPasteListener () {
    this.quill.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
      if (typeof node.data !== 'string') {
        return;
      }
      const matches = node.data.match(this.options.globalRegularExpression);
      if (matches && matches.length > 0) {
        const newDelta = new Delta();
        let str = node.data;
        matches.forEach(match => {
          const split = str.split(match);
          const beforeLink = split.shift();
          newDelta.insert(beforeLink);
          newDelta.insert(match, {link: match});
          str = split.join(match);
        });
        newDelta.insert(str);
        delta.ops = newDelta.ops;
      }
      return delta;
    });
  }
  registerTypeListener () {
    this.quill.on('text-change', (delta) => {
      const ops = delta.ops;
      // Only return true, if last operation includes whitespace inserts
      // Equivalent to listening for enter, tab or space
      if (!ops || ops.length < 1 || ops.length > 2) {
        return;
      }
      const lastOp = ops[ops.length - 1];
      if (!lastOp.insert || typeof lastOp.insert !== 'string' || !lastOp.insert.match(/\s/)) {
        return;
      }
      this.checkTextForUrl();
    });
  }
  checkTextForUrl () {
    const sel = this.quill.getSelection();
    if (!sel) {
      return;
    }
    const [leaf] = this.quill.getLeaf(sel.index);
    if (!leaf.text) {
      return;
    }
    if (leaf.parent !== undefined && leaf.parent.domNode !== undefined && leaf.parent.domNode.tagName.toLowerCase() === 'a') {
      return;
    }
    const temp = leaf.text.substring(0, leaf.text.length - 1);
    const toCheckStr = temp.substring(temp.lastIndexOf(' '));
    this.checkIfHasLink(sel.index, toCheckStr);
  }
  textToUrl (index, text, url) {
    const ops = new Delta()
      .retain(index)
      .delete(text.length)
      .insert(text, {link: url});
    this.quill.updateContents(ops);
  }


  checkIfHasLink = (currentIndex: number, input: string) => {
    const hasLink = false;
    const linkedText = Autolinker.link( input, { } );
    return hasLink;
  }

}
