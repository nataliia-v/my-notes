import { Overview } from "./features/components/overview/components/userInfo";
import { NotesList } from "./features/components/notes/components/notesList";

import { mapRoutes } from "./shared/utils";
import { withAuth } from "./shared/hocs";
import {
  notesPathName,
  overviewPathName,
} from "./shared/constants/routingConstants";

export const mainRoutes = mapRoutes([
  {
    path: overviewPathName,
    exact: true,
    component: withAuth(Overview),
  },
  {
    path: notesPathName,
    exact: true,
    component: withAuth(NotesList),
  },
]);
