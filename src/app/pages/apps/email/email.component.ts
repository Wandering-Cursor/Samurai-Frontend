import { Component, HostListener, ViewChild } from '@angular/core';
// Ck Editer
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// Email Data Get
import { primary } from './data';
import { Email } from './email.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Editor, TOOLBAR_FULL } from 'ngx-editor';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})

// Email Component
export class EmailComponent {
  editor: any = Editor;
  emailData!: Email[];
  emailIds: number[] = [];
  isShowMenu: boolean = true;
  emailDatas: any;
  dataCount: any;
  masterSelected!: boolean;
  cat: any;
  public CcRecipientsCollapse = true;
  public BccRecipientsCollapse = true;

  public Editor = ClassicEditor;
  toolbar: any = TOOLBAR_FULL;
  isMenuOpen!: boolean;
  usrProfile: any = 'assets/images/users/32/avatar-1.jpg';
  constructor() { }

  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

  ngOnInit(): void {
    /**
     * Fetches the data
     */
    this.fetchData();
    this.editor = new Editor();
    // Compose Model Hide/Show
    var isShowMenu = false;
    document.querySelectorAll(".email-menu-btn").forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        isShowMenu = true;
        document.getElementById('menusidebar')?.classList.add("menubar-show");
      });
    });
    document.querySelector('.email-wrapper')?.addEventListener('click', function () {
      if (document.querySelector(".email-menu-sidebar")?.classList.contains('menubar-show')) {
        if (!isShowMenu) {
          document.querySelector(".email-menu-sidebar")?.classList.remove("menubar-show");
        }
        isShowMenu = false;
      }
    });

    }

  /**
 * Fetches the data
 */
  private fetchData() {
    document.getElementById('emaildata')?.classList.add('d-none')
    setTimeout(() => {
      document.getElementById('emaildata')?.classList.remove('d-none')
      this.emailData = primary;
      this.emailDatas = Object.assign([], this.emailData);
      this.dataCount = this.emailDatas.length
      this.singleData = this.emailDatas[0]
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000);
  }

  // CC BCC Collape
  collapse(id: any) {
    document.querySelector('#' + id)?.classList.toggle('show')
  }

  // Change Profile Image
  changeProfile(img: any) {
    this.usrProfile = img
  }

  // Left Side Panel
  showPanel(event: any) {
    document.querySelector('.email-panel')?.classList.toggle('show')
  }


  /***
  * send mail select multiple mail
  */
  selectMail(event: any, id: any) {
    var checkboxes: any = document.getElementsByName('checkall');
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    this.emailIds = checkedVal
    this.emailIds.length > 0 ? (document.getElementById("email-topbar-actions") as HTMLElement).style.display = "block" : (document.getElementById("email-topbar-actions") as HTMLElement).style.display = "none";
  }

  /**
 * Category Filtering  
 */
  categoryFilter(e: any, name: any) {
    var removeClass = document.querySelectorAll('.mail-list a');
    removeClass.forEach((element: any) => {
      element.classList.remove('active');
    });
    e.target.closest('.mail-list a').classList.add('active')
    if (name == 'all') {
      this.emailDatas = this.emailData
    }
    else {
      this.emailDatas = this.emailData.filter((email: any) => {
        return email.tabtype === name;
      });
    }
  }

  /**
 * Chat Filtering  
 */
  userName: any
  profile: any = 'user-dummy-img.jpg';
  chatFilter(e: any, name: any, image: any) {

    const list = document.querySelector('.email-chat-list');
    const chatlist = list?.querySelectorAll('a');
    chatlist?.forEach((item: any) => {
      item.classList.remove('active')
    });
    e.target.closest('a').classList.add('active');

    (document.getElementById("emailchat-detailElem") as HTMLElement).style.display = "block";
    this.userName = name;
    this.profile = image ? image : 'user-dummy-img.jpg';
  }

  /**
 * Label Filtering  
 */
  labelsFilter(e: any, name: any) {
    var removeClass = document.querySelectorAll('.mail-list a');
    removeClass.forEach((element: any) => {
      element.classList.remove('active');
    });
    e.target.closest('.mail-list a').classList.add('active')
    this.emailDatas = this.emailData.filter((email: any) => {
      return email.labeltype === name;
    });
  }

  /**
* on settings button clicked from topbar
*/
  singleData: any = [];
  onSettingsButtonClicked(event: any, id: any) {
    this.singleData = this.emailData.filter((order: any) => {
      return order.id === id;
    });
    this.singleData.forEach((item: any) => {
      this.singleData = item;
    })

    document.body.classList.add('email-detail-show');
  }

  /**
* Hide the sidebar
*/
  public hide() {
    document.body.classList.remove('email-detail-show');
  }

  // Active Star
  activeStar(id: any, i: any) {
    if (this.emailData[i].tabtype != 'Starred') {
      this.cat = this.emailData[i].tabtype
      this.emailData[i].tabtype = 'Starred'
    } else {
      this.emailData[i].tabtype = this.cat
    }

    document.querySelector('.star_' + id)?.classList.toggle('active');
  }

  // Close Chat
  closeChat() {
    (document.getElementById("emailchat-detailElem") as HTMLElement).style.display = "none";
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.emailDatas.forEach((x: { state: any; }) => x.state = ev.target.checked)
    if (ev.target.checked) {
      (document.getElementById("email-topbar-actions") as HTMLElement).style.display = "block"
    }
    else {
      (document.getElementById("email-topbar-actions") as HTMLElement).style.display = "none"
    }
  }

  /**
 * Confirmation mail model
 */
  confirm() {
    this.removeItemModal?.show();
    var checkboxes: any = document.getElementsByName('checkall');
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    this.emailIds = checkedVal
  }

  /***
   * Delete Mail
   */
  deleteData() {
    if (this.emailIds.length > 0) {
      this.emailIds.forEach((item: any) => {
        document.getElementById('chk-' + item)?.remove();
        for (var i = 0; i < this.emailData.length; i++) {
          if (this.emailData[i].id == item) {
            this.emailData[i].tabtype = 'Trash'
          }
        }
      });
      (document.getElementById("email-topbar-actions") as HTMLElement).style.display = "none";
    } else {
      for (var i = 0; i < this.emailData.length; i++) {
        if (this.emailData[i].id == this.singleData.id) {
          this.emailData.splice(i, 1)
          this.emailDatas = this.emailData
          document.body.classList.remove('email-detail-show');
        }
      }
    }
    this.removeItemModal?.hide();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const emailMenuSidebar = document.querySelectorAll('.email-menu-sidebar');
    const emailMenuButtons = document.querySelectorAll('.email-menu-btn');

    emailMenuButtons.forEach((item: Element) => {
      if (item.contains(target)) {
        emailMenuSidebar.forEach((elm: Element) => {
          elm.classList.add('menubar-show');
          this.isMenuOpen = true;
        });
      } else {
        if (document.querySelector('.email-menu-sidebar')?.classList.contains('menubar-show') && !this.isMenuOpen) {
          document.querySelector('.email-menu-sidebar')?.classList.remove('menubar-show');
        }
        this.isMenuOpen = false;
      }
    });
  }

  // Mark all email as read
  markRead() {
    const read = this.emailDatas.some((email: any) => !email.readed)
    if (read) {
      for (const email of this.emailDatas) {
        if (email.readed == false) {
          email.readed = true;
        }
      }
    } else {
      (document.getElementById('unreadConversations') as HTMLElement).style.display = 'block'
    }
  }

}
