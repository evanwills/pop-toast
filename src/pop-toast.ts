import { LitElement, css, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * A toast component
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('pop-toast')
export class MyElement extends LitElement {
  /**
   * Position on the page of the toast will be
   *
   * If empty, it will default to the being inline where the HTML is
   * rendered. This can be overridden by setting CSS Custom
   * Properties via an external style sheet.
   */
  @property({ type: String })
  position : string = '';

  /**
   * Normally when the "more..." button is clicked (when toast has
   * extra body) the body is shown and nothing else happens. But if
   * `hideExpanded` is TRUE, when the "more..." button is clicked
   * but the toast isn't closed, next time a toast with the same ID
   * is loaded, it will be hidden.
   */
  @property({ type: Boolean})
  hideExpanded : boolean = false;

  /**
   * Normally, when the close button is clicked the toast just
   * vanishes. If `hideOnReload` is TRUE, an entry is added to local
   * storage to prevent a toast with the same ID from being rendered
   * after reload or when loaded on a different page.
   */
  @property({ type: Boolean })
  hideOnReload : boolean = false;

  /**
   * Text shown in the read more button
   */
  @property({ type: String })
  moreTxt : string = 'More...';

  /**
   * Text shown in the read more button
   */
  @property({ type: String })
  label : string = '';

  /**
   * Character(s) shown in the close button
   */
  @property({ type: String })
  closeChar : string = 'X';

  /**
   * Whether or not the toast is expanded
   *
   * (Only relevant if toast has extra body content)
   */
  @state()
  expanded : boolean = false;

  /**
   * Whether or not the toast is closed
   */
  @state()
  closed : boolean = false;

  /**
   * Whether or not the init method has been called
   */
  private _init : boolean = false;

  /**
   * Local storage key
   *
   * Used to check if
   */
  private _lsKey : string = '';

  /**
   * Whether or not toast has extra body content
   */
  private _hasBody: boolean = false;

  static styles = css`
    :host {
      --toast-border: 0.05rem solid #fff;
      --toast-bottom: auto;
      --toast-close-bg-colour: transparent;
      --toast-close-border: none;
      --toast-close-colour: inherit;
      --toast-close-line-height: 1rem;
      --toast-close-padding: 0.25rem;
      --toast-close-right: 0;
      --toast-close-top: -0.3rem;
      --toast-height: auto;
      --toast-label-bg-colour: inherit;
      --toast-label-border: none;
      --toast-label-case: uppercase;
      --toast-label-decoration: none;
      --toast-label-family: inherit;
      --toast-label-line-height: 1rem;
      --toast-label-margin: 0;
      --toast-label-padding: 0 2rem 0 0;
      --toast-label-size: 0.875rem;
      --toast-label-style: normal;
      --toast-label-weight: bold;
      --toast-left: 50%;
      --toast-more-max-width: calc(100% - 2rem);
      --toast-more-align: right;
      --toast-more-bg-colour: inherit;
      --toast-more-border: none;
      --toast-more-colour: inherit;
      --toast-more-decoration: none;
      --toast-more-family: inherit;
      --toast-more-margin: -2.1rem 0 0 0;
      --toast-more-padding: 0;
      --toast-more-size: 0.875rem;
      --toast-more-style: normal;
      --toast-more-weight: normal;
      --toast-overflow: auto;
      --toast-padding: 1rem;
      --toast-position: fixed;
      --toast-right: auto;
      --toast-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.5);
      --toast-top: 50%;
      --toast-translate-x: 0;
      --toast-translate-y: 0;
      --toast-width: calc(100% - 2rem);
    }
    .closed {
      display: none;
    }
    .toast {
      border: var(--toast-border);
      box-shadow: var(--toast-shadow);
      box-sizing: border-box;
      height: var(--toast-height);
      left:  var(--toast-left);
      max-width: var(--toast-max-width);
      padding: var(--toast-padding);
      position: var(--toast-position);
      top:  var(--toast-top);
      width: var(--toast-width);
      transform: translate(var(--toast-translate-x), var(--toast-translate-y));
    }
    .toast.top-right {
      bottom: auto;
      left: auto;
      right:  var(--toast-right);
      top:  var(--toast-top);
    }
    .toast.top-centre {
      bottom: auto;
      left: 50%;
      right: auto;
      top:  var(--toast-top);
      transform: translateX(-50%);
    }
    .toast.top-left {
      bottom: auto;
      left:  var(--toast-left);
      right: auto;
      top:  var(--toast-top);
    }
    .toast.middle-right {
      bottom: auto;
      left: auto;
      right:  var(--toast-right);
      top:  50%;
      transform: translateY(-50%);
    }
    .toast.middle-centre {
      bottom: auto;
      left: 50%;
      top:  50%;
      right:  auto;
      transform: translate(-50%, -50%);
    }
    .toast.middle-left {
      bottom: auto;
      left:  var(--toast-left);
      right: auto;
      top:  50%;
      transform: translateY(-50%);
    }
    .toast.bottom-right {
      bottom:  var(--toast-bottom);
      left: auto;
      right:  var(--toast-right);
      top: auto;
    }
    .toast.bottom-centre {
      bottom:  var(--toast-bottom);
      left: 50%;
      transform: translateX(-50%);
    }
    .toast.bottom-left {
      bottom:  var(--toast-bottom);
      left:  var(--toast-left);
      right: auto;
      top: auto;
    }
    .toast-header {
      position: relative;
    }
    .toast-body{
      overflow-y: var(--toast-overflow, auto);
    }
    .label {
      border: var(--toast-label-border);
      background-color: var(--toast-label-bg-colour);
      margin: var(--toast-label-margin);
      padding: var(--toast-label-padding);
      font-family: var(--toast-label-family);
      font-size: var(--toast-label-size);
      font-style: var(--toast-label-style);
      font-weight: var(--toast-label-weight);
      line-height: var(--toast-label-line-height);
      text-transform: var(--toast-label-case);
      text-decoration: var(--toast-label-decoration);
    }
    .close {
      display: inline-block;
      background-color: var(--toast-close-bg-colour);
      border: var(--toast-close-border)
      color: var(--toast-close-colour);
      cursor: pointer;
      font-family: var(--toast-close-family);
      font-size: var(--toast-close-size);
      font-weight: var(--toast-close-weight);
      line-height: var(--toast-close-line-height);
      margin: var(--toast-close-margin);
      padding: var(--toast-close-padding);
      position: absolute;
      top: var(--toast-close-top);
      right: var(--toast-close-right);
    }
    .more {
      background-color: var(--toast-more-bg-colour);
      border: var(--toast-more-border);
      color: var(--toast-more-colour);
      cursor: pointer;
      display: block;
      font-family: var(--toast-more-family);
      font-size: var(--toast-more-size);
      font-style: var(--toast-more-style);
      font-weight: var(--toast-more-weight);
      margin: var(--toast-more-margin);
      padding: var(--toast-more-padding);
      text-align: var(--toast-more-align);
      text-decoration: var(--toast-more-decoration);
      width: 100%;
    }
  `;

  /**
   * Handle close toast click
   */
  private _clickClose() {
    this.closed = !this.closed;
    this._setClosed();
  }

  /**
   * Handle expand body click
   */
  private _clickExpand() {
    this.expanded = !this.expanded;
    if (this.hideExpanded === true) {
      this._setClosed();
    }
  }

  /**
   * Set the local storage so
   */
  private _setClosed() {
    if (this._lsKey !== '') {
      window.localStorage.setItem(this._lsKey, 'closed');
    }
  }

  /**
   * Do some basic initialisation stuff the first time the component
   * is rendered
   */
  private _doInit() : void {
    if (this._init === false) {
      this._init = true;

      console.log('this:', this)

      // Try and find a standard position
      if (this.position !== '') {
        let original = this.position.toLowerCase();
        this.position = '';
        let tmp = '';

        if (original.includes('bot')) {
          tmp = 'bottom';
        } else if (original.includes('top')) {
          tmp = 'top'
        } else if (original.includes('mid')) {
          tmp = 'middle'
        }

        if (original.includes('lef')) {
          tmp += '-left';
        } else if (original.includes('rig')) {
          tmp += '-right'
        } else if (original.includes('cent')) {
          tmp += '-centre'
        }

        if (tmp.match(/^(?:top|middle|bottom)-(?:left|centre|right)$/)) {
          this.position = ' ' + tmp;
        }
      }

      // Whether or not to persist the closed state for toasts with
      // the same ID
      if (this.hideOnReload === true && this.id !== '' && this._storageAvailable()) {
        this._lsKey = this.id.trim().
                              replace(/[^a-z0-9_-]+/ig, '-').
                              replace(/^-|-$/g, '');
        this._lsKey = 'popToast.' + this._lsKey;
        const tmp = window.localStorage.getItem(this._lsKey);
        if (tmp !== null && tmp === 'closed') {
          this.closed = true;
        }
      }

      // Check whether or not the `body` slot is empty.
      const bodySlot = this.querySelector('*[slot="body"]')
      this._hasBody = (bodySlot !== null && bodySlot.innerHTML.trim() !== '');
    }
  }

  /**
   * Test whether or not the browser has local storage enabled
   *
   * This is taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   *
   * @returns TRUE if localStorage is available. FALSE otherwise
   */
  private _storageAvailable() : boolean {
    let storage;
    try {
      if (typeof window.localStorage !== 'undefined') {
        storage = window.localStorage;
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } else {
        return false;
      }
    }
    catch (e) {
      const output : boolean = (
        typeof e !== 'undefined' &&
        e instanceof DOMException &&
        (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be
          // present everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED' &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0)
        )
      )!;

      return output;
    }
  }


  render() : TemplateResult {
    this._doInit();
    const tab = (this.closed)
      ? '-1'
      : undefined;

    return html`
      <div class="toast${this.position} ${(!this.closed) ? 'open' : 'closed'}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          ${(this.label !== '')
            ? html`<p class="label">${this.label}</p>`
            : ''
          }
          <button type="button" class="close" aria-label="Close" @click=${this._clickClose} tabindex=${ifDefined(tab)}>${this.closeChar}</button>
        </div>
        <div class="toast-body">
          <slot name="head"></slot>
          <slot name="teaser"></slot>
          ${(this._hasBody)
            ? html`
                ${(this.expanded)
                  ? html`<slot name="body"></slot>`
                  : html`<button class="more" @click=${this._clickExpand} tabindex=${ifDefined(tab)}>${this.moreTxt}</button>`
                }`
            : ''
          }
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pop-toast': MyElement
  }
}
