import { Action, createReducer, on } from '@ngrx/store';
import { LAYOUT_MODE_TYPES, LAYOUT_WIDTH_TYPES, LAYOUT_POSITION_TYPES, LAYOUT_TOPBAR_COLOR_TYPES, PERLOADER_TYPES, LAYOUT_TYPES, LEFT_SIDEBAR_SIZE, LAYOUT_THEME_TYPES, DATA_SIDEBAR_IMAGE, DATA_SIDEBAR_COLOR, LEFT_SIDEBAR_VIEW } from './layout';
import { changeMode, changeTheme, changelayoutTheme, changeposition, changepreLoader, changesidebarImage, changesidebarView, changesidebarcolor, changesize, changetopbar, changewidthLayout } from './layout-action';

export interface LayoutState {
    LAYOUT: string;
    LAYOUT_THEME: string;
    LAYOUT_MODE: string;
    LAYOUT_WIDTH: string;
    LAYOUT_POSITION: string;
    TOPBAR: string;
    SIDEBAR_SIZE: string;
    SIDEBAR_VIEW: string;
    SIDEBAR_COLOR: string,
    SIDEBAR_IMAGE: string;
    DATA_PRELOADER: string;
}

// IntialState
export const initialState: LayoutState = {
    LAYOUT: LAYOUT_TYPES.VERTICAL,
    LAYOUT_THEME: LAYOUT_THEME_TYPES.DEFAULT,
    LAYOUT_MODE: LAYOUT_MODE_TYPES.LIGHTMODE,
    LAYOUT_WIDTH: LAYOUT_WIDTH_TYPES.FLUID,
    LAYOUT_POSITION: LAYOUT_POSITION_TYPES.FIXED,
    TOPBAR: LAYOUT_TOPBAR_COLOR_TYPES.LIGHT,
    SIDEBAR_SIZE: LEFT_SIDEBAR_SIZE.DEFAULT,
    SIDEBAR_VIEW: LEFT_SIDEBAR_VIEW.DEFAULT,
    SIDEBAR_COLOR: DATA_SIDEBAR_COLOR.DARK,
    SIDEBAR_IMAGE: DATA_SIDEBAR_IMAGE.NONE,
    DATA_PRELOADER: PERLOADER_TYPES.DISABLE
}

// Reducer
export const layoutReducer = createReducer(
    initialState,
    on(changelayoutTheme, (state, action) => ({ ...state, LAYOUT: action.layout })),
    on(changeTheme, (state, action) => ({ ...state, LAYOUT_THEME: action.theme })),
    on(changeMode, (state, action) => ({ ...state, LAYOUT_MODE: action.mode })),
    on(changewidthLayout, (state, action) => ({ ...state, LAYOUT_WIDTH: action.width })),
    on(changeposition, (state, action) => ({ ...state, LAYOUT_POSITION: action.position })),
    on(changetopbar, (state, action) => ({ ...state, TOPBAR: action.topbar })),
    on(changesize, (state, action) => ({ ...state, SIDEBAR_SIZE: action.size })),
    on(changesidebarView, (state, action) => ({ ...state, SIDEBAR_VIEW: action.sidebarView })),
    on(changesidebarcolor, (state, action) => ({ ...state, SIDEBAR_COLOR: action.sidebar })),
    on(changesidebarImage, (state, action) => ({ ...state, SIDEBAR_IMAGE: action.sidebarImage })),
    on(changepreLoader, (state, action) => ({ ...state, DATA_PRELOADER: action.preLoader }))
);

// Selector
export function reducer(state: LayoutState | undefined, action: Action) {
    return layoutReducer(state, action);
}