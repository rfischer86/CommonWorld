import { Result } from '../result/result';
import { NavTypes } from '../../enums/navTypes';

export class NavData {
  DOMid: string;
  id: string;
  name: string;
  link: string;
  navData = [] as NavData[];

  constructor(data: NavData = {} as NavData) {
    this.id =  data.id;
    this.link =  data.link;
    this.name =  data.name;
    if (!this.name) { this.name = 'Neuw Element'; }
    if (!data.navData) { data.navData = []};
    this.navData =  data.navData;
    this.DOMid = (Math.floor(Math.random() * 10 ** 10)).toString();
  }

  getById(id: string): Result<any,NavData> {
    const _ = new Result<any,NavData>();
    if ( id === NavTypes.menu) {
      const profileNav = new NavData();
      profileNav.addItem('Gruppen')
      profileNav.addItem('Rollen')
      profileNav.addItem('Beiträge')

      _.output = profileNav;
      return _;
    }
    if ( id === NavTypes.profile) {
      const menuNav = new NavData();
      menuNav.addItem('ToDo');
      menuNav.addItem('Time Table');
      menuNav.addItem('Internal Structure');
      menuNav.addItem('Data');
      _.output = menuNav;
      return _;
    }
    const navItems = this.navData.filter(nav => navItems.id = id)
    if (navItems.length === 1 ) return navItems[0];
    _.log.addLog(`Navigation Element ${this.name} has no id ${id}`);
    _.log.printLog();
    _.success.setFalse();
    return _;
  }

  getByName(name: string):  Result<any,NavData> {
    const _ = new Result<any,NavData>();
    const navItems = this.navData.filter(nav => navItems.name = name)
    if (navItems.length === 1 ) {
      _.output = navItems[0];
    } else {
      _.log.addLog(`Navigation Element ${this.name} has no id ${name}`);
      _.success.setFalse();
      _.log.printLog();
    };

    return _;
  }
  save(){

  }
  addItem(name: string, id: string = null, link: string = null){
    const navItem = new NavData();
    navItem.name = name;
    navItem.link = link;
    if (!id) { id = Math.floor(Math.random() * 10 ** 10).toString()}
    this.navData.push(navItem);
  }

  delete() {

  }

  update() {

  }

}
