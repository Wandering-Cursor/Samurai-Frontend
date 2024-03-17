import { Component } from '@angular/core';

import { icons } from './data';

@Component({
  selector: 'app-materialdesign',
  templateUrl: './materialdesign.component.html',
  styleUrls: ['./materialdesign.component.scss']
})
export class MaterialdesignComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  icons!: Array<{}>;
  iconsCount = 0;
  newIconsCount = 0;

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Material Design', active: true }
    ];

    setTimeout(() => {
      this.icons = icons;
      /**
       * Blank Icon set
       */
      this.icons.push({ name: 'blank', hex: 'f68c' });
      this.icons.forEach((icon) => {
        var item = this.getIconItem(icon, this.isNew(icon));
        document.getElementById('icons')?.appendChild(item);

        if (this.isNew(icon)) {
          var newItem = this.getIconItem(icon, false);
          document.getElementById('newIcons')?.appendChild(newItem);

          this.newIconsCount++;
        }
        this.iconsCount++;
      });
    }, 0);
  }

  /***
  * change icon version
  */
  isNew(icon: any) {
    return icon.version === '6.5.95';
  }

  isDeprecated(icon: any) {
    return typeof icon.deprecated == 'undefined' ? false : icon.deprecated;
  }

  /***
   * Icon Get
   */
  getIconItem(icon: any, isNewIcon: any) {
    var div = document.createElement('div'),
      i = document.createElement('i');
    div.className = 'col-xl-3 col-lg-4 col-sm-6';
    i.className = 'mdi mdi-' + icon.name;
    div.appendChild(i);
    var span = document.createElement('span');
    span.appendChild(document.createTextNode('mdi-' + icon.name));
    div.appendChild(span);

    return div;
  }
}
