## 📌 Embed Excalidraw Plugin
This plugin allows you to embed an Excalidraw board in RemNote. You can create Excalidraw drawings directly in RemNote. The board's elements and state are stored as user-level data in RemNote, enabling synchronization and restoration across different devices and platforms. 🔄

## Usage

 1. type splash command `/excalidraw` to create a new excalidraw board in RemNote.
 2. drawing!
 3. you can also *import `.excalidraw` file* by using the `Open` menu in left area.
 4. other features like `export`, `view mode`, `save to image` also supported, unfunately, custom libary feature not support yet.
   

## 📝 TODO
- [ ] `Known issue` 🚨: Excalidraw Library are currently not supported. The page will be redirected to localhost:8000, so the Library cannot be added to the board.
- [ ] `Known issue` 🚨: Image data is broken after restore. (Reason: UpdateScene don't set files. )
- [ ] `Fast Follow` Implement full-screen mode support. 🖥️
- [ ] `Need Spike`,`Fast Follow` Enable embedding of existing Excalidraw boards. 🖼️

## Contribution
Feel free to folk this repo and create PRs. thanks!