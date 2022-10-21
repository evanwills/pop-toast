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
export class PopToast extends LitElement {
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
   * Number of seconds delay between when the toast block rendered
   * and when it slides into view
   */
  @property({ type: Number })
  delay : number = 1;

  /**
   * Used for testing local storage
   */
  @property({ type: Boolean })
  debug : boolean = false;

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
   * Whether or not the toast block is waiting to slide in
   */
  @state()
  slideIn : boolean = true;

  /**
   * Whether or not the toast block should slide out of view
   */
  @state()
  slideOut : boolean = false;

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

  /**
   * Whether or not toast has extra body content
   */
  private _hasTeaser: boolean = false;

  static styles = css`
    :host {
      --toast-bg: fff;
      --toast-border: 0.05rem solid #000;
      --toast-bottom: auto;
      --toast-height: auto;
      --toast-left: 1rem;
      --toast-max-width: 25rem;
      --toast-overflow: auto;
      --toast-padding: 1rem;
      --toast-position: fixed;
      --toast-right: 1rem;
      --toast-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
      --toast-top: 1rem;
      --toast-transition: transform ease-in-out 0.3s;
      --toast-translate-x: 0;
      --toast-translate-y: 0;
      --toast-width: calc(100% - 2rem);
      --toast-z: 100;

      --toast-slide-in-transform-left: translateX(-120%);
      --toast-slide-in-transform-right: translateX(120%);
      --toast-slide-out-transform-top: translateY(-140%);
      --toast-slide-out-transform-bottom: translateY(140%);

      --toast-close-bg: transparent;
      --toast-close-border: none;
      --toast-close-color: inherit;
      --toast-close-line-height: 1rem;
      --toast-close-padding: 0.25rem;
      --toast-close-right: 0;
      --toast-close-top: -0.3rem;

      --toast-label-align: inherit;
      --toast-label-bg: inherit;
      --toast-label-border: none;
      --toast-label-case: uppercase;
      --toast-label-color: inherit;
      --toast-label-decoration: none;
      --toast-label-family: inherit;
      --toast-label-line-height: 1rem;
      --toast-label-margin: 0;
      --toast-label-padding: 0 2rem 0 0;
      --toast-label-size: 0.875rem;
      --toast-label-style: normal;
      --toast-label-weight: bold;

      --toast-more-align: right;
      --toast-more-bg: #fff;
      --toast-more-border: none;
      --toast-more-bottom: 1.15rem;
      --toast-more-color: #000;
      --toast-more-decoration: none;
      --toast-more-family: inherit;
      --toast-more-left: auto;
      --toast-more-margin: -2.7rem 0 0 0;
      --toast-more-max-width: calc(100% - 2rem);
      --toast-more-padding: 0;
      --toast-more-right: 1rem;
      --toast-more-size: 0.875rem;
      --toast-more-style: normal;
      --toast-more-weight: normal;
      --toast-more-width: 4rem;

      --toast-more-b-width: 10rem;
      --toast-more-b-bottom: auto;
      --toast-more-b-left: auto;
      --toast-more-b-right: 1rem;
      --toast-more-b-align: center;
      --toast-more-b-height: 1rem;
      --toast-more-b-bg: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.8) 66%, rgba(255,255,255,1) 100%);
    }
    .closed {
      display: none;
    }
    .toast {
      background: var(--toast-bg);
      border: var(--toast-border);
      box-shadow: var(--toast-shadow);
      box-sizing: border-box;
      height: var(--toast-height);
      left:  var(--toast-left);
      max-width: var(--toast-max-width);
      padding: var(--toast-padding);
      position: var(--toast-position);
      top:  var(--toast-top);
      transform: translate(var(--toast-translate-x), var(--toast-translate-y));
      transition: var(--toast-transition);
      width: var(--toast-width);
      z-index: var(--toast-z);
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
    .toast.top-left.slide-in,
    .toast.middle-left.slide-in,
    .toast.bottom-left.slide-in {
      transform: var(--toast-slide-in-transform-left);
    }
    .toast.top-right.slide-in,
    .toast.middle-right.slide-in,
    .toast.bottom-right.slide-in {
      transform: var(--toast-slide-in-transform-right);
    }
    .toast.top-left.slide-out,
    .toast.top-centre.slide-out,
    .toast.top-right.slide-out {
      transform: var(--toast-slide-out-transform-top);
    }
    .toast.bottom-left.slide-out,
    .toast.bottom-centre.slide-out,
    .toast.bottom-right.slide-out {
      transform: var(--toast-slide-out-transform-bottom);
    }
    .toast-header {
      position: relative;
    }
    .toast-body{
      overflow-y: var(--toast-overflow, auto);
    }
    .label {
      border: var(--toast-label-border);
      background: var(--toast-label-bg);
      color: var(--toast-label-color);
      margin: var(--toast-label-margin);
      padding: var(--toast-label-padding);
      font-family: var(--toast-label-family);
      font-size: var(--toast-label-size);
      font-style: var(--toast-label-style);
      font-weight: var(--toast-label-weight);
      line-height: var(--toast-label-line-height);
      text-align: var(--toast-label-align);
      text-transform: var(--toast-label-case);
      text-decoration: var(--toast-label-decoration);
    }
    .close {
      display: inline-block;
      background: var(--toast-close-bg);
      border: var(--toast-close-border);
      color: var(--toast-close-color);
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
      background: var(--toast-more-bg);
      border: var(--toast-more-border);
      bottom: var(--toast-more-bottom);
      color: var(--toast-more-color);
      cursor: pointer;
      display: inline-block;
      font-family: var(--toast-more-family);
      font-size: var(--toast-more-size);
      font-style: var(--toast-more-style);
      font-weight: var(--toast-more-weight);
      left: var(--toast-more-left);
      margin: var(--toast-more-margin);
      padding: var(--toast-more-padding);
      position: absolute;
      right: var(--toast-more-right);
      text-align: var(--toast-more-align);
      text-decoration: var(--toast-more-decoration);
      width: var(--toast-more-width);
    }
    .more::before {
      content: '';
      background: var(--toast-more-b-bg);
      display: inline-block;
      height: var(--toast-more-b-height);
      left: calc(var(--toast-more-b-width) * -1);
      position: absolute;
      width: var(--toast-more-b-width);
    }
  `;

  /**
   * Handle close toast click
   */
  private _clickClose() {
    this.slideOut = true;
    this._setClosed();
    setTimeout(this._delayClose(this), 5000);
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

  private _delayClose(data : PopToast) : Function {
    return () => {
      data.closed = !data.closed;
    }
  }

  /**
   * Set the local storage so
   */
  private _setClosed() {
    if (this._lsKey !== '') {

      window.localStorage.setItem(this._lsKey, 'closed');
    }

    this.dispatchEvent(new Event('popclose'));
  }

  private _slideIn(data: PopToast) : Function {
    return () => {
      data.slideIn = false;
    }
  }

  /**
   * Do some basic initialisation stuff the first time the component
   * is rendered
   */
  private _doInit() : void {
    if (this._init === false) {
      this._init = true;

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
      // Check whether or not the `body` slot is empty.
      const teaserSlot = this.querySelector('*[slot="teaser"]')
      this._hasTeaser = (teaserSlot !== null && teaserSlot.innerHTML.trim() !== '');

      setTimeout(this._slideIn(this), (this.delay * 1000));
    }
  }

  /**
   * Test whether or not the browser has local storage enabled
   *
   * Taken from [stackoverflow](https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available#answer-16427725).
   * (See also: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API))
   *
   * @returns TRUE if localStorage is available. FALSE otherwise
   */
  private _storageAvailable() : boolean {
    if (typeof window.localStorage !== 'undefined') {
      try {
        var tmp = '__storage_test__';
        localStorage.setItem(tmp, tmp);
        if (localStorage.getItem(tmp) === tmp) {
            localStorage.removeItem(tmp);
            // localStorage is enabled
            return true;
        } else {
            // localStorage is disabled
            return false
        }
      } catch(e) {
        // localStorage is disabled
        return false
      }
    } else {
      // localStorage is not available
      return false
    }
  }


  render() : TemplateResult {
    this._doInit();
    const tab = (this.closed)
      ? '-1'
      : undefined;

    return html`
      <div class="toast${this.position}${(this.slideIn ? ' slide-in': '')}${(this.slideOut ? ' slide-out': '')} ${(!this.closed) ? 'open' : 'closed'}"
           role="alert"
           aria-live="assertive"
           aria-atomic="true">
        <div class="toast-header">
          ${(this.label !== '')
            ? html`<p class="label">${this.label}</p>`
            : ''
          }
          <button type="button" class="close" aria-label="Close" @click=${this._clickClose} tabindex=${ifDefined(tab)}>${this.closeChar}</button>
        </div>
        <div class="toast-body">
          <slot name="head"></slot>
          ${(this._hasTeaser)
            ? html`
                <div class="teaser">
                  <slot name="teaser"></slot>
                  ${(this._hasBody && !this.expanded)
                    ? html`<button class="more" @click=${this._clickExpand} tabindex=${ifDefined(tab)}>${this.moreTxt}</button>`
                    : ''
                  }
                </div>`
            : ''
          }
          ${(this._hasBody  && (!this._hasTeaser || this.expanded))
            ? html`<slot name="body"></slot>`
            : ''
          }
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pop-toast': PopToast
  }
}
