import { getFormData } from '@/apis';
import { editDataInit } from '@/utils/field';
import qs from 'qs';
const ROW = 6;
const EditorModel = {
    namespace: 'editor',
    state: {
        leftSpan: ROW,
        rightSpan: ROW,
        isQianKun: window.__POWERED_BY_QIANKUN__,
        isIframe: self !== top,
    },
    reducers: {
        toggleLeftVisible(state) {
            state.leftSpan = state.leftSpan ? 0 : ROW;
        },
        toggleRightVisible(state) {
            state.rightSpan = state.rightSpan ? 0 : ROW;
        },
    },
    effects: {
        *getFormData({ id }, { call, put }) {
            // @ts-ignore
            const data = yield call(getFormData, id);
            if (data?.code === 0) {
                yield put({
                    type: 'main/setPageData',
                    forms: editDataInit(data.data.body),
                });
                yield put({
                    type: 'right/setPageProps',
                    data: {
                        title: data.data.title,
                        formId: data.data.formId,
                        describe: data.data.describe,
                        updatedTime: data.data.updatedTime,
                    },
                });
                yield put({
                    type: 'right/setPageActions',
                    data: data.data.formBehavior || [],
                });
                yield put({
                    type: 'main/setPageId',
                    id,
                });
            }
        },
        *getOutData(data, { put }) {
            yield put({
                type: 'main/setPageData',
                forms: data.data.body,
            });
            yield put({
                type: 'main/setApiList',
                apiList: data.data.apiList,
            });
            yield put({
                type: 'right/setPageProps',
                data: {
                    formTitle: data.data.name,
                    formId: data.data.key,
                    title: data.data.title,
                },
            });
            yield put({
                type: 'main/setPageType',
                pageType: data.data.pageType || 'page',
            });
            if (data.data?.extra?.modelId) {
                yield put({
                    type: 'right/getModelList',
                    appId: qs.parse(window.location.search)?.appId,
                });
                yield put({
                    type: 'right/setModelId',
                    appId: data.data.extra.modelId,
                });
                yield put({
                    type: 'right/getModelKeys',
                    appId: qs.parse(window.location.search)?.appId,
                    modelId: data.data.extra.modelId,
                });
                yield put({
                    type: 'right/setEnableModelKeys',
                    data: Object.keys(data.data.extra.fieldMapping).map((key) => {
                        const item = data.data.extra.fieldMapping[key];
                        return item.field;
                    }),
                });
            }
        },
    },
};
export default EditorModel;
//# sourceMappingURL=model.js.map