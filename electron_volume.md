

# Electron volume

The goal of this exercise is to make an ElectronJS application that adjusts the volume of the host machine.

We recommend to get the basic functionality working as soon as possible, show that and then continue to expand with extras.

This exercise is about learning new technologies in a limited amount of time. If you are already familiar to Electron you can show your learning skills with a cool 'extra'.

## Requirements

- Electron application

- Visual interface for volume control

  - current level

  - up

  - down

  - mute

## Extras

If you have some extra time or really want to go for it, we encourage you to expand upon the base requirements.

Maybe you already stumbled on a cool way to improve the app, but here is a list for inspiration.

Otherwise, we have a list of possible extras:

- **Keyboard shortcuts**.

- **Smooth fading**. Instead of setting the volume to a given value, slowly animate the volume to the target level.

- **Context isolation/main process**: Are you calling native functionality from the renderer process of Electron? Can you get it working without native calls in the renderer process?

- **Fancy build pipeline**: Electron depends on JS. So I'm sure you can make the build process super fancy. Hot module reloading? TS support?

- **Native modules** (advanced). NodeJS can load natively compiled modules written in C/C++/Rust/Obj-C. Maybe you can use this to control the volume?

- **Remote control** the volume of the host machine from another device or server.

> We recognize the work you put into an extra, even if you don't finish it.

