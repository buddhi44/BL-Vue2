import {
  LayoutDashboardIcon,BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  LoginIcon, MoodHappyIcon, ApertureIcon, UserPlusIcon
} from 'vue-tabler-icons';

import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import {TokenEndPoint} from '@/router/token_endpoint'
import { MenuItem } from '@/core/domain/Entities/MenuItem'
import type { promises } from 'dns';

var menu_list:any={};

export var renderMenu= async():Promise<{}>=>{
  
  return  await fetchWrapper.get(TokenEndPoint.SideMenuURL)
}
//await renderMenu();



//export default menu_list;
