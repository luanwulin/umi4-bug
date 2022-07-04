const TABS_ID = {
  fieldProps: 'fieldProps',
  formProps: 'formProps',
  formActions: 'formActions',
};

const RightModel: RightModelType = {
  namespace: 'right',
  state: {
    tabsId: { ...TABS_ID },
    modelId: '',
    modelList: [],
    relationKey: '',
    currentModelKeys: [],
    enableModelKeys: [],
  },
};

export default RightModel;
