# `<POP-TOAST>`

* [Introduction](#introduction)
* [HTML](#html)
* [Attributes](#attributes)
  * [position](#position)
  * [hideonreload](#hideonreload)
  * [moretxt](#moretxt)
  * [label](#label)
  * [closeChar](#closeChar)
  * [delay](#delay)
  * [id](#id)
* [Slots](#slots)
  * [head](#head)
  * [teaser](#teaser)
  * [body](#body)
* [Styling](#styling)
  * [Toast *(main block)*](#toast-main-block)
  * [slide *(off screen position)*](#slide-off-screen-position)
  * [Close button](#close-button)
  * [Toast label](#toast-label)
  * [Read more/expand button](#read-moreexpand-button)

----


## Introduction

`<pop-toast>` is used to show a cancelable message in an unobtrusive
manner. If, like me, you don't know what a toast component is, read
this post by [Chris Coyier](https://css-tricks.com/toast/)

I have created this web component using [lit](https://lit.dev/), leaning on the great work done by
[Bootstrap](https://getbootstrap.com/docs/5.2/components/toasts/),
with extra functionality inspired by the
[University of Sydney's Library site's](https://www.library.sydney.edu.au/) use of a toast component to inform users about cultural issues the site might pose.

It (hopefully) has sensible defaults that can easily be overridden either with attributes for behaviour or [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for styling

## HTML

```html
<pop-toast label="Toast label" id="this-is-toast" position="bottom-right">
    <div slot="head">
        <h1>Toast heading</h1>
    </div>
    <div slot="teaser">
        <p>
            Teaser text to make people want to read more. Or (if
            there isn't much to say) the entire text you want the
            user to see.
        </p>
    </div>
    <div slot="body">
        <p>
            This is where you put the more verbose but (maybe) not
            as important text you'd really like people to read but
            are ok if the can't be bothered.
        </p>
        <p>
            Learn more about
            <a href="https://css-tricks.com/toast/">toast</a>.
        </p>
    </div>
</pop-toast>
```

## Attributes

### `position`

Position on the page of the toast will be

Options are:
* `top-left` - Positioned at the __top, left__ of the window
* `top-centre` - Positioned at the __top, centre__ of the window
* `top-right` - Positioned at the __top, right__ of the window
* `middle-left` - Positioned at the __middle, left__ of the window
* `middle-centre` - Positioned at __exact centre__ of the window
* `middle-right` - Positioned at the __middle, right__ of the window
* `bottom-left` - Positioned at the __bottom, left__ of the window
* `bottom-centre` - Positioned at the __bottom, centre__ of the window
* `bottom-right` - Positioned at the __bottom, right__ of the window

If empty, it will default to the being inline where the HTML is
rendered. This can be overridden by setting CSS Custom Properties
via an external style sheet.

### `hideonreload`

Normally, when the close button is clicked the toast just vanishes.
When the page is reloaded or the same toast is rendered on a
different page, it will show as normal. If `hideonreload` is included
as an attribute in `<pop-toast>`, an entry is added to local storage
to prevent a toast with the same ID from being rendered after reload
or when loaded on a different page.

> __Note:__ For `hideonreload` to work, the `<pop-toast>` element
>           __*must*__ have an ID. If it doesn't, an reliable key
            cannot be set in local storage.

> __Note also:__ If the user's browser doesn't support local storage or
>           the user has blocked local storage, this will have no
>           effect.

### `hideexpanded`

Normally when the "more..." button is clicked (when toast has extra body) the body is shown and nothing else happens. But if `hideExpanded` is TRUE, when the "more..." button is clicked but the toast isn't closed, next time a toast with the same ID is loaded, it will be hidden.

### `moretxt`

Override the text shown in the read more button.<br />
[Default: "_More..._"]

### `label`

If there is a `label` attribute on the custom element, that title
will be rendered as the label for the component.

### `closeChar`

Override the character(s) shown in the close button.<br />
[Default: "_X_"]

### `delay`

The number of seconds delay between when the toast block renders and
when it slides into view<br />
[Default: "_1_"]

### `id`

If the toast has an ID attribute and `hideOnReload` is included as
an attribute in `<pop-toast>`, then when the close button is clicked
an item is added to the user's browser local storage so the next time
a `<pop-toast>` component with the same ID is included in the HTML on
a page, it will __*NOT*__ be rendered

-----

## Slots

For those of you who don't know what `slots` are used to add content
from the pages HTML within a web component.

Content within each slot will be styled like it would be elsewhere
on the page.

`<pop-toast>` has three named slots. Each of which is optional. However you should always have either `teaser` or `body` (or both)

### `head`

Heading for the toast content.

### `teaser`

Teaser content for the tost.
(Usually a single paragraph to draw people in)

### `body`

Extra content that is hidden by default when the toast is rendered
but can be shown by clicking on the 'more...' button.


-----

## Styling

Most of the content for `<pop-toast>` will inherit styling from the
page it is rendered on but it's not unusual for developers and
designers to want some level of control over the styling of the
component itself. To achieve this there are a number of
[CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
that can be set via the pages style sheet.

You can also use media queries to override any of the custom
properties at break points you prefer.

> __Note:__ Where available I use shorthand CSS properties to give
>           the greatest flixiblity in styling with the least number
>           of variables to manage.

### Toast *(main block)*

#### `--toast-bg`

Controls the [background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
of the toast block<br />
[Default: `#fff`]

#### `--toast-border`

Used to style the [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
around the toast component.<br />
[Default: `0.05rem solid #000`]

#### `--toast-bottom`

Offset of the component from the bottom of the window (when `fixed`) or the bottom of the nearest positioned element (when `absolute`).<br />
[Default: `auto`]

#### `--toast-height`

Height of toast component<br />
[Default: `auto`]

#### `--toast-left`

Offset of the component from the left side of the window (when `fixed`) or the left side of the nearest positioned element (when `absolute`).<br />
[Default: `1rem`]

#### `--toast-max-width`

Maximum width of the toast block<br />
[Default: `25rem`]

#### `--toast-overflow`

Overflow control for toast content area<br />
[Default: `auto`]

#### `--toast-padding`

Padding for toast's wrapping div<br />
[Default: `1rem`]

#### `--toast-position`

How the whole toast component is positioned.<br />
[Default: `fixed`]

#### `--toast-right`

Offset of the component from the right side of the window (when `fixed`) or the right side of the nearest positioned element (when `absolute`).<br />
[Default: `1rem`]

#### `--toast-shadow`

Defines the styling of the box shadow for the whole toast component.<br />
[Default: `0 0 0.5rem rgba(0, 0, 0, 0.5)`]

#### `--toast-top`

Offset of the component from the top of the window (when `fixed`) or the top of the nearest positioned element (when `absolute`).<br />
[Default: `50%`]

#### `--toast-transition`

Controls the animation used to slide the text block in after `<pop-toast>` is rendered. Note the minimum delay is one second. However<br />
[Default: `50%`]

#### `--toast-translate-x`

How to transform/translate the toast component in the __X__ axis<br />
[Default: `0`]

#### `--toast-translate-y`

How to transform/translate the toast component in the __Y__ axis<br />
[Default: `0`]

#### `--toast-width`

Controls the width of the toast component<br />
[Default: `calc(100% - 2rem)`]

#### `--toast-z`

Controls the `z-index` of the toast component<br />
[Default: `calc(100% - 2rem)`]

-----

### slide *(off screen position)*

> __NOTE:__ To help user experience, the toast block slides in from
>           its nearest side a second after the block is rendered.
>           These two *slide* css custom properties allow you to
>           control where the toast block sits before it slides into
>           view. See []

#### `--toast-slide-in-transform-left`

Controls the where (for left side blocks) the toast is placed before
slide-in animation runs<br />
[Default: `translateX(-120%);`]

#### `--toast-slide-in-transform-right`

Controls the where (for right side blocks) the toast is placed before
slide-in animation runs<br />
[Default: `translateX(120%);`]

#### `--toast-slide-out-transform-left`

Controls the where (for top aligned blocks) the toast is placed after
slide-out animation runs<br />
[Default: `translateY(-140%);`]

#### `--toast-slide-out-transform-right`

Controls the where (for bottom aligned blocks) the toast is placed after
slide-out animation runs<br />
[Default: `translateY(140%);`]

-----

### Close button

#### `--toast-close-bg`

[Background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
for close (X) button<br />
[Default: `transparent`]

#### `--toast-close-border`

[Border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) styling for close button.<br />
[Default: `none`]

#### `--toast-close-color`

Font colour for close button<br />
[Default: `inherit`]

#### `--toast-close-line-height`

Line height of text in close button<br />
[Default: `1rem`]

#### `--toast-close-padding`

Padding for close button<br />
[Default: `0.25rem`]

#### `--toast-close-right`

Right side offset for close button<br />
[Default: `0`]

#### `--toast-close-top`

Top offset for close button<br />
[Default: `-0.3rem`]

-----

### Toast label

#### `--toast-label-align`

Text alignment in toast's label<br />
[Default: `inherit`]

#### `--toast-label-bg`

[Background](https://developer.mozilla.org/en-US/docs/Web/CSS/background) for toast's label<br />
[Default: `inherit`]

#### `--toast-label-border`

Styling for [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) of toast's label<br />
[Default: `none`]

#### `--toast-label-case`

How to transform the case of text in toast's label<br />
[Default: `uppercase`]

#### `--toast-label-color`

Colour of text in toast's label<br />
[Default: `inherit`]

#### `--toast-label-decoration`

What sort of text decoration is used for toast's label<br />
[Default: `none`]

#### `--toast-label-family`

Font family for toast's label<br />
[Default: `inherit`]

#### `--toast-label-line-height`

Line height for toast's label<br />
[Default: `1rem`]

#### `--toast-label-margin`

Toast label's margin<br />
[Default: `0`]

#### `--toast-label-padding`

Toast label's padding<br />
[Default: `0 2rem 0 0`]

#### `--toast-label-size`

Font size for toast's label<br />
[Default: `0.875rem`]

#### `--toast-label-style`

Font stying for toast's label<br />
[Default: `normal`]

#### `--toast-label-weight`

Font weight for toast's label<br />
[Default: `bold`]

-----

### Read more/expand button

#### `--toast-more-align`

Text alignment for _more..._ button<br />
[Default: `right`]

#### `--toast-more-bg`

[Background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
for _more..._ button<br />
[Default: `inherit`]

#### `--toast-more-border`

[Border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) styling for  for _more..._ button<br />
[Default: `none`]

#### `--toast-more-color`

Text colour for _more..._ button<br />
[Default: `inherit`]

#### `--toast-more-decoration`

Text decoration for _more..._ button<br />
[Default: `none`]

#### `--toast-more-margin`

_more..._ button's margins<br />
[Default: `-2.1rem 0 0 0`]

#### `--toast-more-padding`

_more..._ button's padding<br />
[Default: `0`]

#### `--toast-more-family`

Font family for _more..._ button<br />
[Default: `inherit`]

#### `--toast-more-size`

Font size for _more..._ button<br />
[Default: `0.875rem`]

#### `--toast-more-style`

Font style for _more..._ button<br />
[Default: `normal`]

#### `--toast-more-weight`

Font weight for _more..._ button<br />
[Default: `normal`]
