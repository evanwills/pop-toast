# `<POP-TOAST>`

* [Introduction](#introduction)
* [Attributes](#attributes)
  * [position](#position)
  * [hideonreload](#hideonreload)
  * [moretxt](#moretxt)
  * [label](#label)
  * [closeChar](#closeChar)
  * [id](#id)
* [Slots](#slots)
  * [head](#head)
  * [teaser](#teaser)
  * [body](#body)
* [Styling](#styling)

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

### `moretxt`

Override the text shown in the read more button.<br />
[Default: "_More..._"]

### `label`

If there is a `label` attribute on the custom element, that title
will be rendered as the label for the component.

### `closeChar`

Override the character(s) shown in the close button.<br />
[Default: "_X_"]

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

`<pop-toast>` has three named slots

### `head`

Heading for the toast content.

### `teaser`

Teaser content for the tost.
(Usually a single paragraph to draw people in)

### `body`

Extra content that is hidden by default when the toast is rendered
but can be shown by clicking on the 'more...' button.

```html
<pop-toast label="Stale bread???" id="pop-toast" position="bottom-left">
    <div slot="head">
        <h1>Why toast is useful</h1>
    </div>
    <div slot="teaser">
        <p>
            Toast is a good way to use bread that is stale. (It makes
            it you feel like you intended it to be stale. Rather than
            being stuck with bread you'd rather chuck out.)
        </p>
    </div>
    <div slot="body">
        <p>
            There are many things you can do with toast such as:
        </p>
        <ul>
            <li>Use it to squash cockroaches or flys in your home</li>
            <li>Throw it like a frisbee at your annoying sibling
                while your parents are arguing about pointless
                things.</li>
            <li>Use a lighter to burn images of your chosen deity
                and sell it on ebay</li>
            <li>Slather it with peanut button and honey and leave
                it on the table to catch flys</li>
            <li>If you are really desperate you could even eat it.</li>
        </ul>
        <p>
            Learn more about
            <a href="https://css-tricks.com/toast/">toast</a>.
        </p>
    </div>
</pop-toast>
```

-----

## Styling

Most of the content for `<pop-toast>` will inherit styling from the
page it is rendered on but it's not unusual for developers and
designers to want some level of control over the styling of the
component itself. To achieve this there are a number of
[CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
that can be set via the pages style sheet.

You can also use media queries to override any of the custom properties at break points you prefer

### `--toast-border`

Used to style the border around the toast component.<br />
[Default: `0.05rem solid #fff`]

### `--toast-bottom`

Offset of the component from the bottom of the window (when `fixed`) or the bottom of the nearest positioned element (when `absolute`).<br />
[Default: `auto`]

### `--toast-height`

Height of toast component<br />
[Default: `auto`]

### `--toast-left`

Offset of the component from the left side of the window (when `fixed`) or the left side of the nearest positioned element (when `absolute`).<br />
[Default: `50%`]

### `--toast-overflow`

Overflow control for toast content area<br />
[Default: `auto`]


### `--toast-padding`

Padding for toast's wrapping div<br />
[Default: `1rem`]

### `--toast-position`

How the whole toast component is positioned.<br />
[Default: `fixed`]

### `--toast-right`

Offset of the component from the right side of the window (when `fixed`) or the right side of the nearest positioned element (when `absolute`).<br />
[Default: `auto`]

### `--toast-shadow`

Defines the styling of the box shadow for the whole toast component.<br />
[Default: `0 0 0.5rem rgba(255, 255, 255, 0.5)`]

Font weight of the toast's title block<br />
[Default: `bold`]

### `--toast-top`

Offset of the component from the top of the window (when `fixed`) or the top of the nearest positioned element (when `absolute`).<br />
[Default: `50%`]

### `--toast-translate-x`

How to transform/translate the toast component in the __X__ axis<br />
[Default: `0`]


### `--toast-translate-y`

How to transform/translate the toast component in the __Y__ axis<br />
[Default: `0`]


### `--toast-width`

Controls the width of the toast component<br />
[Default: `calc(100% - 2rem)`]

-----

### Close button

#### `--toast-close-bg-colour`

Background colour for close (X) button<br />
[Default: `transparent`]

#### `--toast-close-border`

Border styling for close button.<br />
[Default: `none`]

#### `--toast-close-colour`

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

#### `--toast-label-bg-colour`

Background colour for toast's label<br />
[Default: `inherit`]

#### `--toast-label-border`

Styling for border of toast's label<br />
[Default: `none`]

#### `--toast-label-case`

How to transform the text in the toast's label<br />
[Default: `uppercase`]

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

#### `--toast-more-bg-colour`

Background colour for _more..._ button<br />
[Default: `inherit`]

#### `--toast-more-border`

Border styling for  for _more..._ button<br />
[Default: `none`]

#### `--toast-more-colour`

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
