import { createAction, props } from '@ngrx/store';

export const changelayoutTheme = createAction('[Layout] Set Layout', props<{ layout: string }>());
export const changeTheme = createAction('[Layout] Set theme', props<{ theme: string }>());
export const changeMode = createAction('[Layout] Set Mode', props<{ mode: string }>());
export const changewidthLayout = createAction('[Layout] Set width', props<{ width: string }>());
export const changeposition = createAction('[Layout] Set position', props<{ position: string }>());
export const changetopbar = createAction('[Layout] Set topbar', props<{ topbar: string }>());
export const changesize = createAction('[Layout] Set size', props<{ size: string }>());
export const changesidebarView = createAction('[Layout] Set sidebarView', props<{ sidebarView: string }>());
export const changesidebarcolor = createAction('[Layout] Set sidebar', props<{ sidebar: string }>());
export const changesidebarImage = createAction('[Layout] Set sidebarImage', props<{ sidebarImage: string }>());
export const changepreLoader = createAction('[Layout] Set preLoader', props<{ preLoader: string }>());