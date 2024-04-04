# UI configuration documentation

Description of UI configuration file. I will describe each key one by one.

## Relative paths and replacing images

**Do not change** any relative path to files, you need to change only file name and extension. Also you need to load
images only to folders that already exist. Do not create new folders and load files to them, it may cause bugs on site.
For exapmple, you uploaded new image "img.png" to *home* folder.

Old relative path: /img/home/background-placeholder.jpg  
New relative path: /img/home/img.png

If you are 100% sure that you won't break frontend, take a risk and do not worry about strict folder structure for
images.

## Color shades

We are autogenerating different shades of color for different needs.  
For example, we are using these shades for base color of site, hover, focus effects, etc.  
It will be described, which properties in json file are responsible for generating shades.

**Notify, you have to pass only hex colors for properties that are generating shades.**

## backgroundImage

### deckstop

- Relative path to background image on homepage  
  Default value: ``` /img/home/background-placeholder.jpg```

## socialMedia

Contains list of social media that are displayed in navigation bar.  
You may remove or add new social media(only supported social medias).
You may remove all social medias by deleting all objects in square brackets.

For now we support only three social media, we will add more in near future.
Propery name in social media object is responsible for showing correct icon, so do not misstype it.

Here is all supported social medias:

- Twitter &nbsp; &nbsp; &nbsp; (name: twitter)
- Telegram &nbsp; (name: telegram)
- Discord&nbsp; &nbsp; &nbsp;(name: discord)

To add new social media do these steps:

    1. Add a coma after last object for social media  
    2. Insert new social media. Here is an example of social media object:

``` 
    {  
        "name": "name of social media",  
        "url": "link to your social media account"  
    }
```    

    3. Fill required info. 

To remove social media follow these steps:

- Remove object you want
- Remove any trailing coma

## navigation

Contains list of links that are displayed in navigation bar. These links are navigating through your website.

Flow of deleting and adding links is same as in socialMedia.
Here iis an exapmple of link object:

```
{
    "title": "Link title",
    "url": "/link1"
}
```

## logo

- **type**

  Support ```text``` and ```image``` type. Depending on type it will render image that you provided or text.
- **img**
  Relative path to logo image.
- **text**
  Text for logo

## site

- **bgColor**
  Background color on website
- **textColor**
  Text color on website
- **borderColor**
  Border color of elements that had default color border(had to override default color)

## colors

- **primary**
  Base color of site. This color is responsible for generating shades of color. Used in buttons, hover, focus effects,a
- **secondary**
  Border color of back button on delegate page.
- **subtext**
  Text color for subtext. It is used in homepage and delegate steps.
- **infoBlockBgColor**
  Background color of information blocks, such as amount of tokens to claim, person that you want to delegate, etc/
- **selected**
  Color for selected items(for example selected delegate on delegate page)

## toastBg

- **success**
  Background color for success message.
- **error**
  Background color for error message.
- **info**
  Background color for information message.
- **warning**
  Background color for warning message.
- **loading**
  Background color for loading message.

## modal

- **bgColor**
  Background color of wallet connect modal and
- ~~**overlay**
  Not supported for now~~

## mobileNavBar

-**bg**
Background color for burger menu on mobile and tablets

## fonts

- **main**
  Main font family on website
- **caption**
  Font family for captions

## focusAreas

Contains list of areas on which sorting is based.
Do not add new areas, they won't work.

To remove area follow this steps:

- Delete area you want
- Remove any trailing coma
