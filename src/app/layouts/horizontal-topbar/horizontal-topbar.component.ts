import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, ViewChild } from '@angular/core';
import { MenuItem } from './menu.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MENU } from './menu';

@Component({
  selector: 'app-horizontal-topbar',
  templateUrl: './horizontal-topbar.component.html',
  styleUrls: ['./horizontal-topbar.component.scss']
})
export class HorizontalTopbarComponent {
  menu: any;
  menuItems!: any[];
  isMoreMenu: boolean = false;
  AllmenuItems: MenuItem[] = [];
  navData: any;

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(private router: Router, public translate: TranslateService, private renderer: Renderer2, private elementRef: ElementRef) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    // Menu Items
    this.menuItems = MENU;
    this.AllmenuItems = MENU;
    // Initialize the navData and menuItems
    this.navData = MENU;
    this.menuItems = this.navData;
    setTimeout(() => {
      this.updateMenu();
    }, 1000);
  }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    this.initActiveMenu();
    setTimeout(() => {
      this.menuPosSetOnClicknHover();
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (document.documentElement.clientWidth >= 1025) {
      setTimeout(() => {
        this.updateMenu();
      }, 1000);
    } else {
      this.menuItems = MENU;
    }
    setTimeout(() => {
      this.menuPosSetOnClicknHover();
    }, 1500);
  }

  // Display Menu 
  updateMenu() {
    const navbarNav: any = document.getElementById("navbar-nav");
    const fullWidthOfMenu = navbarNav?.parentElement?.clientWidth;

    const menuWidth = fullWidthOfMenu || 0;
    let totalItemsWidth = 0;
    let visibleItems: any[] = [];
    let hiddenItems: any[] = [];
  
    for (let i = 0; i < this.navData.length; i++) {
      const itemWidth = navbarNav?.children[i]?.offsetWidth;
      totalItemsWidth += itemWidth;

      if (totalItemsWidth + 100 <= menuWidth) {
        visibleItems.push(this.navData[i]);
      } else {
        if (!this.navData[i].isTitle) {
          hiddenItems.push(this.navData[i]);
        }
      }
    }
    const moreMenuItem = {
      id: "more",
      label: "More",
      icon: 'ri-briefcase-2-line',
      subItems: hiddenItems,
      link: "/#",
      stateVariables: this.isMoreMenu,
      click: (e: any) => {
        e.preventDefault();
        this.isMoreMenu = !this.isMoreMenu;
      },
    };

    const updatedMenuItems = [...visibleItems, moreMenuItem];
    this.menuItems = updatedMenuItems;

  }

  private menuPosSetOnClicknHover() {
    const isElements = this.elementRef.nativeElement.querySelectorAll("#navbar-nav > li.nav-item");

    Array.from(isElements).forEach((item: any) => {
      setTimeout(() => {
        this.renderer.listen(item, "click", menuItem);
        this.renderer.listen(item, "mouseover", menuItem);
      }, 100);
    });

    const menuItem = (e: any) => {
      const dropdownMenu = e.target;
      const subMenus = dropdownMenu.nextElementSibling || dropdownMenu.parentElement.nextElementSibling;

      if (dropdownMenu && subMenus) {
        const dropdownOffset = subMenus.getBoundingClientRect();
        const dropdownWidth = subMenus.offsetWidth;
        const dropdownHeight = subMenus.offsetHeight;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const maxDropdownX = dropdownOffset.left + dropdownWidth;
        const maxDropdownY = dropdownOffset.top + dropdownHeight;

        const isDropdownOffScreen = maxDropdownX + 100 > screenWidth - 100;
        const isDropdownOffScreenY = maxDropdownY + 100 > screenHeight - 100;

        if (isDropdownOffScreen || isDropdownOffScreenY) {
          if (subMenus.classList.contains("menu-dropdown")) {
            subMenus.classList.add("dropdown-custom-right");
          }
        }
      }
    }
  }

  removeActivation(items: any) {
    items.forEach((item: any) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        (item.nextElementSibling) ? item.nextElementSibling.classList.remove("show") : null;
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  }

  // remove active items of two-column-menu
  activateParentDropdown(item: any) { // navbar-nav menu add active
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
        parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.setAttribute("aria-expanded", "true");
      }
      return false;
    }
    return false;
  }

  updateActive(event: any) {
    const ul = document.getElementById("navbar-nav");

    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  initActiveMenu() {
    const pathName = window.location.pathname;
    const ul = document.getElementById("navbar-nav");

    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      let activeItems = items.filter((x: any) => x.classList.contains("active"));
      this.removeActivation(activeItems);
      let matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  toggleSubItem(event: any) {
    if (event.target && event.target.nextElementSibling)
      event.target.nextElementSibling.classList.toggle("show");
  };

  toggleItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');

    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    (isMenu) ? isMenu.classList.add('show') : null;

    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.setAttribute('aria-expanded', "false")
        item.classList.remove("active");
      });
    }
    if (isCurrentMenuId) {
      this.activateParentDropdown(isCurrentMenuId);
    }
  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className: any) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }
}
