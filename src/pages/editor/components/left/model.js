import { materialMaps } from '@/enums/material';
const EditorLeftModel = {
    namespace: 'left',
    state: {
        formsMaterial: {
            title: '表单组件',
            list: [
                materialMaps.INPUT_TEXT,
                materialMaps.TEXTAREA,
                materialMaps.INPUT_NUMBER,
                materialMaps.RADIO,
                materialMaps.CHECKBOX,
                materialMaps.CHECKBOXES,
                materialMaps.SELECT,
                materialMaps.INPUT_DATE,
                materialMaps.TBPM_TABLE,
                materialMaps.CHAINED_SELECT,
                materialMaps.CHOOSE_USER,
                // materialMaps.COMPANY_ACCOUNT_SELECTOR,
            ],
        },
        highMaterial: {
            title: '高阶组件',
            list: [
                materialMaps.INPUT_FILE,
                materialMaps.RICH_EDITOR,
                materialMaps.COMBO_CONTAINER,
                materialMaps.TABLE_MODEL,
            ],
        },
        layoutMaterial: {
            title: '展示组件',
            list: [
                materialMaps.FLEX,
                materialMaps.SERVICE_CONTAINER,
                materialMaps.LAYOUT_CONTAINER,
                materialMaps.PROPERTY,
                materialMaps.STEPS,
                materialMaps.TABS,
                materialMaps.TPL,
                materialMaps.IMAGE,
                materialMaps.LINK,
                materialMaps.TABLE,
                materialMaps.PAGE_LAYOUT,
                materialMaps.NAV_MENU,
                materialMaps.SIDE_MENU,
                materialMaps.ICON,
            ],
        },
        functionalMaterial: {
            title: '功能组件',
            list: [
                materialMaps.BUTTON,
                materialMaps.FORMULA,
                materialMaps.IFRAME,
            ],
        },
    },
};
export default EditorLeftModel;
//# sourceMappingURL=model.js.map