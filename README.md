# attribution.js

A lightweight drop-in JS lib that helps artists to make image attribution easy and engaging. When users press an element to download or right-click on images, an overlay with attribution text and social sharing options is shown.

[Demo](https://h9lxyz.github.io/attribution.js/demo.html)

## Usage

It's possible to provide attribution data via data attributes or via JS.

### Examples

#### Provide attribution data via JS

This is useful if you want to provide attribution data globally to multiple images on the same page.

```html
<script src="attribution.js"></script>
<script>
    new AttributionOverlay(
        {
            buttonClass: 'attribution-button',
            imageContainerClass: 'image-container',
            imageClass: 'attribution-image',
            license: 'CC BY-NC-SA 4.0',
            year: new Date().getFullYear(),
            authorName: 'John Doe',
            authorUrl: 'https://example.com/johndoe'
        }
    );
</script>
```

#### Provide attribution data via data attributes

This is useful if you want to provide attribution data to a single image.

```html
<img class="my-image-class" src="https://placehold.co/300x200?text=CC+BY-NC-SA+4.0" 
    data-year="2025" 
    data-license="CC BY-NC-SA 4.0"
    data-author-name="John Doe"
    data-author-url="https://example.com/johndoe"
/>

<script src="attribution.js"></script>
<script>
    new AttributionOverlay(
        {
            imageClass: 'my-image-class',
        }
    );
</script>

```

## Features
- Shows attribution overlay when trigger element is clicked
- Right-click integration for image context menu
- Built-in attribution text for Creative Commons licenses
- Social sharing buttons for X, Facebook, Pinterest, and email
- Customizable styling and behavior
- Responsive design
- Fun emoji animation
- No dependencies, just vanilla JS and plain CSS

## Supported Licenses
- CC0 1.0 (Public Domain Dedication)
- CC BY 4.0
- CC BY-ND 4.0
- CC BY-NC-ND 4.0
- CC BY-SA 4.0
- CC BY-NC-SA 4.0

## Use Cases
Artist portfolios shared with attribution requirements.

## License
MIT
