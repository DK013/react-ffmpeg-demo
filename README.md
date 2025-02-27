# Discontinued

check [dk013/react-use-ffmpeg](https://github.com/DK013/react-use-ffmpeg) and it's [example](https://github.com/DK013/react-use-ffmpeg/tree/main/example) for latest implementation

# Video to MP4 Converter

A web-based video converter application that converts various video formats to MP4 using FFmpeg.wasm. Built with Framework7 and React.

## Features

- Convert various video formats to MP4 including:
  - .mp4
  - .m4v
  - .webm
  - .avi
  - .mkv
  - .mov
  - .wmv
- Browser-based conversion using FFmpeg.wasm
- Real-time conversion progress tracking
- Uses WORKERFS for efficient file handling
- Simple and intuitive user interface

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:5173` (or your configured port).

## Technical Details

This application is built using:

- Framework7 for UI components
- React for frontend development
- FFmpeg.wasm for video conversion
- Vite as the build tool

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "C:\\Users\\DK\\Desktop\\ffmpeg",
  "type": [
    "web"
  ],
  "name": "My App",
  "framework": "react",
  "template": "blank",
  "cssPreProcessor": false,
  "bundler": "vite",
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkMode": false,
    "iconFonts": false
  },
  "customBuild": false
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)

* [Framework7 React Documentation](https://framework7.io/react/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7
