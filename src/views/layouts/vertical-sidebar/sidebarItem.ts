import {
  LayoutDashboardIcon,BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  LoginIcon, MoodHappyIcon, ApertureIcon, UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Home' },
  {
    title: 'Home',
    icon: LayoutDashboardIcon,
    BgColor: 'primary',
    to: '/'
  },
  { header: 'Inventory Management' },
  {
    title: "Received And Return",
    icon: AlertCircleIcon,
    BgColor: 'primary',
    to: "/ui/alerts",
    
  },
  {
    title: "Issue Transfer And Returns",
    icon: CircleDotIcon,
    BgColor: 'primary',
    to: "/ui/buttons",
  },

  { header: 'Sales Management' },
  {
    title: 'Sales Order',
    icon: LoginIcon,
    BgColor: 'primary',
    to: '/auth/login'
},
{
    title: 'Invoice',
    icon: UserPlusIcon,
    BgColor: 'primary',
    to: '/auth/register'
},
{ header: 'Reports' },
{
    title: 'Account Reports',
    icon: MoodHappyIcon,
    BgColor: 'primary',
    to: '/icons'
},
{
    title: 'Sample Page',
    icon: ApertureIcon,
    BgColor: 'primary',
    to: '/sample-page'
},

];

export default sidebarItem;
