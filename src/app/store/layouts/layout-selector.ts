import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout-reducers';

export const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const getLayout = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT
);

export const getLayoutmode = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_MODE
);

export const getLayoutTheme = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_THEME
);
export const getPosition = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_POSITION
);

export const getLayoutWidth = createSelector(
    getLayoutState,
    (state: LayoutState) => state.LAYOUT_WIDTH
);

export const getTopbar = createSelector(
    getLayoutState,
    (state: LayoutState) => state.TOPBAR
);

export const getSidebarsize = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_SIZE
);

export const getsidebarview = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_VIEW
);

export const getsidebarimage = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_IMAGE
);

export const getSidebarcolor = createSelector(
    getLayoutState,
    (state: LayoutState) => state.SIDEBAR_COLOR
);

export const getPreloader = createSelector(
    getLayoutState,
    (state: LayoutState) => state.DATA_PRELOADER
);
