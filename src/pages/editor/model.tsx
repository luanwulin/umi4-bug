const ROW = 6;

const EditorModel: EditorModelType = {
  namespace: 'editor',
  state: {
    leftSpan: ROW,
    rightSpan: ROW,
    isQianKun: window.__POWERED_BY_QIANKUN__,
    isIframe: self !== top,
  },
};

export default EditorModel;
