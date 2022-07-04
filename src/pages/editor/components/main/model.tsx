const MainModel: MainModelType = {
  namespace: 'main',
  state: {
    forms: [],
    formId: '',
    apiList: [],
    pageType: 'form',
    // 是否已经有表单容器
    hasTableModel: false,
  },
};

export default MainModel;
