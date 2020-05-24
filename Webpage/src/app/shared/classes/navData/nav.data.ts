import { Result } from '../result/result';
import { NavTypes } from '../../enums/navTypes';
import { ContentTypes } from '../../enums/ContentType';

export class NavData {
  domId: string;
  apiId: string;
  name: string;
  type: NavTypes;
  contentType: ContentTypes;
  contentData: string;

  link: string;
  navData = [] as NavData[];

  constructor(data: NavData = {} as NavData) {
    this.name =  data.name;
    this.type =  data.type;
    this.link =  data.link;
    if (!this.name) { this.name = 'Neu Element'; }
    if (!data.navData) { data.navData = []};
    this.navData =  data.navData;
    this.apiId =  data.apiId;
    if(!this.apiId) { this.apiId = Math.floor(Math.random() * 10 ** 16).toString();  }
    this.domId = (Math.floor(Math.random() * 10 ** 10)).toString();
  }

  getByDomId(id: string): Result<any,NavData> {
    const _ = new Result<any,NavData>();
    if ( id === NavTypes.menu) {
      const profileNav = new NavData();
      _.output = profileNav;
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

  addItem(name: string, id: string = null, link: string = null){
    const navItem = new NavData();
    navItem.name = name;
    navItem.link = link;
    if (!id) { id = Math.floor(Math.random() * 10 ** 10).toString()}
    this.navData.push(navItem);
  }
}
