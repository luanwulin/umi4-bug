import { getModelKeys, getModelList } from '@/apis';
;
const TABS_ID = {
    fieldProps: 'fieldProps',
    formProps: 'formProps',
    formActions: 'formActions',
};
const RightModel = {
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
        *getModelList({ appId }, { call, put }) {
            // @ts-ignore
            const data = yield call(getModelList, appId);
            if (data.Response) {
                yield put({
                    type: 'right/setModelList',
                    data: data.Response.Data,
                });
            }
        },
        *getModelKeys({ appId, modelId }, { call, put }) {
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
        clear(state) {
            state.currentField = '';
            state.formActions = [];
        },
        /**
         * 切换tab
         * */
        changeTab(state, { tab }) {
            state.active = tab.id;
        },
        /**
         * 点击切换field
         * */
        changeCurrentField(state, { fieldId }) {
            if (state.currentField === fieldId)
                return;
            state.currentField = fieldId;
        },
        deleteField(state, { fieldId }) {
            if (fieldId === state.currentField) {
                state.currentField = '';
            }
        },
        setPageProps(state, { data }) {
            state.formProps = {
                ...state.formProps,
                ...data,
            };
        },
        setPageActions(state, { data }) {
            state.formActions = data;
        },
        setModelList(state, { data }) {
            state.modelList = data;
        },
        setModelKeys(state, { data }) {
            state.currentModelKeys = data;
        },
        setRelationKey(state, { relationKey }) {
            state.relationKey = relationKey;
        },
        setEnableModelKeys(state, { data }) {
            state.enableModelKeys = data;
        },
        setModelId(state, { id }) {
            state.modelId = id;
        },
    },
};
export default RightModel;
//# sourceMappingURL=model.js.map