<div align="center">

<!-- Ganti "icon.png" dengan nama file ikon/logo aplikasi Anda jika berbeda -->
<img src="images/icon480x.png" width="160" alt="Shader Playground Logo">

# 3D & 2D Shader Playground

✨ *An interactive real-time WebGL & GLSL shader playground supporting both 3D and 2D canvas modes.* ✨

<p>
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/platforms-Web%20%7C%20PWA%20%7C%20Android-blueviolet" alt="Platforms">
  <img src="https://img.shields.io/badge/tech-Three.js%20%7C%20WebGL%20%7C%20GLSL-informational" alt="Tech">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

<p>
  <a href="https://zukirugraphic.github.io/shader-playground/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-00ffcc?style=flat&logo=vercel" alt="Live Demo">
  </a>
  <a href="https://github.com/ZukiruGraphic/shader-playground">
    <img src="https://img.shields.io/badge/📂_GitHub_Repository-black?style=flat&logo=github" alt="GitHub Repository">
  </a>
</p>

</div>

---

## 🌟 Features

* **Dual Mode Support**: Switch seamlessly between **3D Mode** (featuring interactive objects, skybox, lighting adjustments, and post-processing effects) and **2D Mode** (pure fullscreen GLSL fragment canvas).
* **Live In-App Shader Editor**: Inspect, edit, and instantly reload vertex and fragment shader codes directly within the web app.
* **Offline-Capable (PWA)**: Built with Service Worker and Web App Manifest support so it can be installed and run completely offline after the initial load.
* **Custom Textures & Uniforms**: Easily upload and bind custom images/textures to your 2D canvas shaders dynamically.
* **Asset Exporting**: Export your current shader source code bundle as a `.zip` archive with a single click.
* **Responsive Controls**: Optimized for both Desktop (WASD navigation, Mouse Pointer Lock look, Fullscreen `F11`, Settings `ESC`) and Mobile devices (virtual joysticks and touch drag controls).

---

## 🕹️ Controls Guide

### Desktop Mode
* **Move**: `W`, `A`, `S`, `D` keys
* **Look Around**: Click on the canvas to activate **Pointer Lock**, then move your mouse.
* **Settings / Menu**: Press `ESC`
* **Toggle Fullscreen**: Press `F11`

### Mobile Mode
* **Move**: Use the left virtual joystick.
* **Look Around**: Drag anywhere on the right side of the screen.

---

## 🛠️ Built With

* **[Three.js](https://threejs.org/)** - 3D JavaScript Library / WebGL renderer.
* **[JSZip](https://stuk.github.io/jszip/)** - Client-side zip compression utility.
* **HTML5 / CSS3 / GLSL** - Custom fragment and vertex shaders.

---

## 📦 Running Locally & Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/ZukiruGraphic/shader-playground.git](https://github.com/ZukiruGraphic/shader-playground.git)
