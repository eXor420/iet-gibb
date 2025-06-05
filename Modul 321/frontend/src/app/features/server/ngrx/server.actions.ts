import { createAction, props } from '@ngrx/store';
import { ServerDto } from "../server.model";

export const createServer = createAction('[Server] create', props<{ server: ServerDto }>());
export const deleteServer = createAction('[Server] delete', props<{ serverId: string }>());
export const loadServers = createAction('[Servers] load');
export const serversLoaded = createAction('[Servers] loaded', props<{ servers: ServerDto[] }>());
