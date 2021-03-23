import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';

import { notes, overview } from '../../../../shared/constants';
import {
  overviewPathName,
  notesPathName,
} from '../../../../shared/constants/routingConstants';

export const sidebarData = [
  {
    name: overview,
    path: overviewPathName,
    icon: PieChartOutlined,
    className: 'svg',
  },
  {
    name: notes,
    path: notesPathName,
    icon: DesktopOutlined,
    className: 'svg',
  },
];
