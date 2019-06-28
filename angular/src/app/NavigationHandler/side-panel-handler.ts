export class SidePanelHandler {
  private seperator: string;
  private navigationMenuID: string = 'NavMenu';
  private dotReplacer = '__dot__';
  private sepReplacer = '_';
  constructor(){
    this.seperator = '/';
  }
  // Creation of the Side panel menu provided a set of paths
  public _addMenuFromStringPath(path: string) {
    let margin = 0;
    const patharr =  (this.navigationMenuID + this.seperator + path).replace(/\./g, this.dotReplacer).split(this.seperator);
    let parentid = this.navigationMenuID;
    for (let i = 1; i < patharr.length; i++) {
      if (document.getElementById(parentid + this.sepReplacer + patharr[i]) != null) {
        parentid = parentid + this.sepReplacer + patharr[i]
        margin = margin + 10;
        continue;
      }
      if (i === patharr.length - 1) {
        // File
        this._createFile(parentid, patharr[i], margin);
        margin = margin + 10;
      } else {
        // Folder
        if (document.getElementById('click_' + patharr.slice(0, i + 1).join(this.sepReplacer))) {
          this._changeToFolder(patharr.slice(0, i + 1).join(this.sepReplacer), patharr[i]);
          parentid = parentid + this.sepReplacer + patharr[i]
          margin = margin + 10;
          continue;
        }
        this._createFolder(parentid, patharr[i], margin);
        parentid = parentid + this.sepReplacer + patharr[i]
        margin = margin + 10;
      }
    }
  }

  private _createFolder(parentId: string, name: string, maring: number) {
    const id: string = parentId + this.sepReplacer + name;
    const li: HTMLElement = document.createElement( 'li');
    this._setContextMenuForElement(li, name)
    li.setAttribute('_ngcontent-c0',  '');
    li.id = 'click_' + id;
    const a = document.createElement('a');
    a.setAttribute('data-toggle',  'collapse');
    a.setAttribute('href',  '#' + id);
    a.setAttribute('class',  'dropdown-toggle collapsed');
    a.setAttribute('aria-expanded',  'true');
    a.setAttribute('_ngcontent-c0',  '');
    if (parentId === 'NavMenu') {
      a.style.fontWeight = 'bold';
    } else {
      const img: HTMLElement = document.createElement('img');
      img.style.marginLeft = maring + 'px';
      img.setAttribute('width', '20px');
      img.style.marginRight = '10px';
      img.setAttribute('src', Icons.Folder);
      a.appendChild(img);

    }
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'collapse list-unstyled');
    ul.setAttribute('id', id);
    const textnode: Text = document.createTextNode(name);
    a.appendChild(textnode);
    li.appendChild(a);
    li.appendChild(ul);
    document.getElementById(parentId).appendChild(li);
  }

  private _createFile(parentId: string, name: string, maring: number) {
    if (name === '') {return; }
    const id: string = parentId + this.sepReplacer + name;
    const li: HTMLElement = document.createElement('li');
    li.id = 'click_' + id;
    this._setContextMenuForElement(li, name)
    li.setAttribute('_ngcontent-c0', '');
    const a: HTMLElement  = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('_ngcontent-c0', '');
    const img: HTMLElement  = document.createElement('img');
    img.style.marginLeft = maring + 'px';
    img.setAttribute('width', '20px');
    img.style.marginRight = '10px';
    this._setIcon(name, img);
    const textnode: Text = document.createTextNode(name.split(this.dotReplacer)[0]);
    a.appendChild(img);
    a.appendChild(textnode);
    li.appendChild(a);
    document.getElementById(parentId).appendChild(li);
  }

  private _changeToFolder(id: string, name: string) {
    const li = document.getElementById('click_' + id);
    console.log(li);
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'collapse list-unstyled');
    ul.setAttribute('id', id);
    const a = li.firstElementChild;
    a.setAttribute('data-toggle',  'collapse');
    a.setAttribute('href',  '#' + id );
    a.setAttribute('class',  'dropdown-toggle collapsed');
    a.setAttribute('aria-expanded',  'true');
    li.appendChild(ul);
  }

  private _setContextMenuForElement(element: HTMLElement, name: string) {
    element.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      const menu: HTMLElement = document.getElementById('rightclickmenu');
      menu.style.top = (ev.clientY - 5) + 'px';
      menu.style.left = (ev.clientX - 5) + 'px';
      menu.style.display = 'block';
      switch (name.substring(name.indexOf('.') + 1)) {
        case FileTypes.MultiModel:
          document.getElementById(ContextMenu.CreateCoSimulationConfiguration).hidden = false;
          document.getElementById(ContextMenu.Rename).hidden = false;
          document.getElementById(ContextMenu.Delete).hidden = false;
          document.getElementById(ContextMenu.Download).hidden = false;
          break;
        case FileTypes.Dse:
          document.getElementById(ContextMenu.Rename).hidden = false;
          document.getElementById(ContextMenu.Delete).hidden = false;
          document.getElementById(ContextMenu.Download).hidden = false;
          break;
        default:
          document.getElementById(ContextMenu.Download).hidden = false;
          break;
      }
    });

  }

  private _setIcon(name: string, element: any) {
    const namearr = name.split(this.dotReplacer);
    namearr.shift();
    switch (namearr.join('.').substring(name.indexOf('.') + 1)) {
      case FileTypes.Dse:
        element.setAttribute('src', Icons.Dse);
        break;
      case FileTypes.CoSim:
        element.setAttribute('src', Icons.CoSim);
        break;
      case FileTypes.MultiModel:
        element.setAttribute('src', Icons.MultiModel);
        break;
      default:
        element.setAttribute('src', Icons.File);
        break;

    }
  }
}
enum ContextMenu {
  ExportSourceCodeFMU = 'ContextMenu_ExportSourceCodeFMU',
  ExportToolWrapperFMU = 'ContextMenu_ExportToolWrapperFMU',
  CreateCoSimulationConfiguration = 'ContextMenu_CreateCoSimulationConfiguration',
  CreateMultiModel = 'ContextMenu_CreateMultiModel',
  CreateDSE = 'ContextMenu_CreateDSE',
  Delete = 'ContextMenu_Delete',
  Implode = 'ContextMenu_Implode',
  Rename = 'ContextMenu_Rename',
  Update = 'ContextMenu_Update',
  Upload = 'ContextMenu_Upload',
  Download = 'ContextMenu_Download'
}
enum FileTypes {
  Dse = 'dse.json',
  DseResult = 'assets/icons/dse-result-icon.svg',
  CoSim = 'coe.json',
  Fmu = 'fmu',
  Overture = 'assets/icons/overture-logo.svg',
  modelio = 'assets/icons/modelio-logo.svg',
  OpenModelica = 'assets/icons/open-modelica-logo.svg',
  MultiModel = 'mm.json',
  Rtt = 'assets/icons/verified-rtt-logo.svg',
  Result = 'assets/icons/result-icon.svg',
  Sim = 'assets/icons/20-sim-logo.svg'
}
enum Icons {
  Folder = 'assets/icons/folder.png',
  File = 'assets/icons/file.png',
  Dse = 'assets/icons/dse-icon.svg',
  CoSim = 'assets/icons/configuration-icon.svg',
  DseResult = 'assets/icons/dse-result-icon.svg',
  Overture = 'assets/icons/overture-logo.svg',
  modelio = 'assets/icons/modelio-logo.svg',
  OpenModelica = 'assets/icons/open-modelica-logo.svg',
  MultiModel = 'assets/icons/multimodel-icon.svg',
  Rtt = 'assets/icons/verified-rtt-logo.svg',
  Result = 'assets/icons/result-icon.svg',
  Sim = 'assets/icons/20-sim-logo.svg'


}
