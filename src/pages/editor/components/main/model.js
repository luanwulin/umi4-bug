import { isEmpty, isNull } from '@/utils';
import { searchJsonPath } from '@/utils/field';
import { set, get } from 'lodash-es';
function operateData(state, { amis, fieldId, index, replaceLen = 0 }) {
    if (isEmpty(amis))
        return;
    const formData = {
        ...amis,
        // 表单与后端数据对应关系值，理论上是唯一值，但可能被修改，提交时需校验同层级是否唯一
        name: fieldId,
        // 必须值，唯一值， 不会被修改
        fieldId,
    };
    state.forms.splice(index, replaceLen, formData);
}
const MainModel = {
    namespace: 'main',
    state: {
        forms: [],
        formId: '',
        apiList: [],
        pageType: 'form',
        // 是否已经有表单容器
        hasTableModel: false,
    },
    reducers: {
        // 清空编辑器数据
        clear(state) {
            state.forms = [];
        },
        // 切换类型
        exchangeForm(state, { name, source, fieldId, keepFieldValue = {} }) {
            if (isEmpty(source))
                return;
            const fieldPath = searchJsonPath(state.forms, fieldId);
            if (!fieldPath)
                return;
            set(state.forms, fieldPath, {
                ...source,
                name,
                fieldId,
                ...keepFieldValue,
            });
        },
        // 设置forms数据
        setPageData(state, { forms }) {
            state.forms = forms;
        },
        // 复制
        copyItem(state, { source, fieldId }) {
            operateData(state, {
                amis: source,
                fieldId,
                index: state.forms.length,
            });
        },
        setPageId(state, { id }) {
            state.formId = id;
        },
        setApiList(state, { apiList }) {
            state.apiList = apiList;
        },
        setPageType(state, { pageType }) {
            state.pageType = pageType;
        },
        // 根据指定fieldId，删除某个节点，用于跨组拖拽的onWidgetMoveEnd事件
        deleteItemField(state, { fieldId, identityName }) {
            if (identityName === '表单容器') {
                state.hasTableModel = false;
            }
            const fieldPath = searchJsonPath(state.forms, fieldId) || [];
            if (!fieldPath)
                return;
            const preFieldPath = [...fieldPath]?.splice(0, fieldPath?.length - 1);
            if (isEmpty(preFieldPath)) {
                state.forms = [
                    ...state.forms.filter(form => form.fieldId !== fieldId),
                ];
            }
            else {
                const body = get(state.forms, preFieldPath, []);
                set(state.forms, preFieldPath, body.filter((b) => b.fieldId !== fieldId));
            }
        },
        /**
         * 覆盖更新某个fieldId下指定key的值为value
         * fieldId：需要更新的节点，为空表示更新根节点
         * key：更新该节点下指定的key
         * value：对应节点下对应key更新后的值
         * */
        updateItems(state, { key, value, fieldId }) {
            if (value?.identityName === '表单容器') {
                state.hasTableModel = true;
            }
            if (!fieldId) {
                state.forms = value;
                return;
            }
            const fieldPath = searchJsonPath(state.forms, fieldId);
            if (!fieldPath)
                return;
            set(state.forms, [...fieldPath, ...key.split('.')], value);
        },
        /**
         * 把fieldId下指定key的索引为index的值更新为value
         * fieldId为空：表示为根节点更新
         * index为空，即追加到尾部
         * */
        updateItem(state, { key, value, fieldId, index }) {
            if (value?.identityName === '表单容器') {
                state.hasTableModel = true;
            }
            if (!fieldId) {
                state.forms.splice(isNull(index) ? state.forms.length : index, 0, value);
                return;
            }
            const fieldPath = searchJsonPath(state.forms, fieldId);
            if (!fieldPath)
                return;
            const newKey = [...fieldPath, ...key.split('.')];
            const oldVal = get(state.forms, newKey) || [];
            oldVal.splice(isNull(index) ? oldVal.length - 1 : index, 0, value);
            set(state.forms, newKey, oldVal);
        },
    },
};
export default MainModel;
//# sourceMappingURL=model.js.map