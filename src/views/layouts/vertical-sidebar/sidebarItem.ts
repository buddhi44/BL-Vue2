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

var menu_list:any={};

var renderMenu= async()=>{
  
  menu_list = await fetchWrapper.get(TokenEndPoint.SideMenuURL)
  console.log("menu list",menu_list)
}
await renderMenu();



export default menu_list;
