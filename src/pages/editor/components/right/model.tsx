import { getModelKeys, getModelList } from '@/apis';

export interface FormFieldProps {
  // 唯一值，拖拽时标识表单额唯一性，一旦生成不可变
  readonly fieldId: string;
  // material?: MaterialItem;
  type: string;
  label: string;
  // 字段名，指定该表单项提交时的 key
  name: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  // 通过表达式来配置当前表单项是否为禁用
  disabledOn?: object;
  // 下拉，单选，多选等选项
  options?: Array<AmisOption>;
  visible?: boolean;
  // 通过表达式来配置当前表单项是否为显示
  visibleOn?: object;
  required?: boolean;
  // 通过表达式来配置当前表单项是否为必填
  requiredOn?: object;
  // 表单项值格式验证，支持设置多个，多个规则用英文逗号隔开
  // 除了上面的表达示外，还可以参考文档 https://baidu.gitee.io/amis/zh-CN/docs/extend/addon
  validations?: string;
  // 表单校验接口
  validationApi?: object;
  // 标签描述, 参加remark语法
  labelRemark?: object;
  // 表单最外层类名
  className?: string;
  // 表单控制器类名
  inputClassName?: string;
  // 上传组件的上传接口
  receiver?: string;
  // 表格属性，是否可新增行
  addable?: boolean;
  // 表格属性，是否可编辑
  editable?: boolean;
  // 表格属性，是否可拖拽
  draggable?: boolean;

  // 以下部分是现有tbpm特有的字段
  // 是否去重
  removeSame?: boolean;
  relationApi?: string;
  relationField?: string;
  maxValue?: number;
  minValue?: number;
  numberType?: string;
  isNegativeNumber?: boolean;
  dateType?: string;
}

export interface FieldProps {
  [key: string]: FormFieldProps;
}

export interface FormProps {
  formTitle: string;
  formId: string;
  describe?: string;
  updatedTime?: string;
  title?: string | undefined;
}

export interface RightModelState {
  // 当前激活的tab值
  active: string;
  // 表单的props：对应右侧tab【表单属性】
  formProps: FormProps;
  // 表单行为：对应右侧tab【表单行为】
  formActions: Array<Action>;
  // 字段属性：对应右侧tab【字段属性】
  fieldProps: FieldProps;
  // 当前field，拖拽后或者点击后会set当前值
  currentField: string;
  tabs: Array<Tab>;
  tabsId: object;
  modelId: string,
  relationKey: string,
  modelList: Array<any>,
  currentModelKeys: Array<any>,
  enableModelKeys: Array<any>,
}

export interface RightModelType extends DvaModel {
  namespace: 'right';
  state: RightModelState;
  reducers?: object;
}

export interface FieldsPickMaps {
  [key: string]: Array<string | { name: string, fields: Array<string> }>;
}

export interface StateProps {
  main: MainModelState;
  right: RightModelState;
  currentFieldItem: AmisFormItem;
};

const TABS_ID = {
  fieldProps: 'fieldProps',
  formProps: 'formProps',
  formActions: 'formActions',
};

const RightModel: RightModelType = {
  namespace: 'right',
  state: {
    active: TABS_ID.fieldProps,
    formProps: {
      formTitle: '',
      formId: '',
      describe: '',
      title: undefined,
    },
    formActions: [],
    fieldProps: {},
    currentField: '',
    tabs: [
      {
        id: TABS_ID.fieldProps,
        key: TABS_ID.fieldProps,
        label: '字段属性',
      },
      {
        id: TABS_ID.formProps,
        key: TABS_ID.formProps,
        label: '表单属性',
      },
      {
        id: TABS_ID.formActions,
        key: TABS_ID.formActions,
        label: '表单行为',
      },
    ],
    tabsId: { ...TABS_ID },
    modelId: '',
    modelList: [],
    relationKey: '',
    currentModelKeys: [],
    enableModelKeys: [],
  },
  effects: {
    * getModelList({ appId }: { appId: string }, { call, put }: any) {
      // @ts-ignore
      const data = yield call(getModelList, appId);
      if (data.Response) {
        yield put({
          type: 'right/setModelList',
          data: data.Response.Data,
        });
      }
    },
    * getModelKeys({ appId, modelId }: { appId: string, modelId: string }, { call, put }: any) {
      // @ts-ignore
      const data = yield call(getModelKeys, { appId, modelId });
      if (data.Response) {
        const model = data.Response.Data?.model || '{}';
        const modelData = JSON.parse(model);

        yield put({
          type: 'right/setModelKeys',
          data: modelData.fields,
        });
        yield put({
          type: 'right/setRelationKey',
          relationKey: modelData.relationKey,
        });
      }
    },
  },
  reducers: {
    /**
     * 清除
     * */
    clear(state: RightModelState) {
      state.currentField = '';
      state.formActions = [];
    },
    /**
     * 切换tab
     * */
    changeTab(state: RightModelState, { tab }: { tab: Tab }) {
      state.active = tab.id;
    },
    /**
     * 点击切换field
     * */
    changeCurrentField(
      state: RightModelState,
      { fieldId }: { fieldId: string },
    ) {
      if (state.currentField === fieldId) return;
      state.currentField = fieldId;
    },
    deleteField(state: RightModelState, { fieldId }: any) {
      if (fieldId === state.currentField) {
        state.currentField = '';
      }
    },
    setPageProps(state: RightModelState, { data }: any) {
      state.formProps = {
        ...state.formProps,
        ...data,
      };
    },
    setPageActions(state: RightModelState, { data }: any) {
      state.formActions = data;
    },
    setModelList(state: RightModelState, { data }: any) {
      state.modelList = data;
    },
    setModelKeys(state: RightModelState, { data }: any) {
      state.currentModelKeys = data;
    },
    setRelationKey(state: RightModelState, { relationKey }: any) {
      state.relationKey = relationKey;
    },
    setEnableModelKeys(state: RightModelState, { data }: any) {
      state.enableModelKeys = data;
    },
    setModelId(state: RightModelState, { id }: { id: string }) {
      state.modelId = id;
    },
  },
};

export default RightModel;
