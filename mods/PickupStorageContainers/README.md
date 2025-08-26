# Recoverable Storage Containers Mod

## Description

This mod allows players to "disassemble" and recover all storage containers, chests, safes, and other storage blocks on their base. When you disassemble an empty container using the proper tools, you get the container back as an item instead of just raw materials.

## Features

### Supported Storage Containers:

#### Player Writable Crates:
- Wood Writable Crate (locked and unlocked)
- Iron Writable Crate (locked and unlocked) 
- Steel Writable Crate (locked and unlocked)

#### Player Safes:
- Wall Safes (locked and unlocked)
- Desk Safes (locked and unlocked)
- Gun Safes (all colors, locked and unlocked):
  - Black, White, Brown, Red, Orange, Yellow
  - Green, Blue, Purple, Grey, Pink, Army Green

#### Other Storage Containers:
- Garage Storage
- Player Coolers (Blue, Red, Green)
- Player Refrigerators (Retro and Stainless Steel)
- Kitchen/Bathroom Cabinets and Cupboards

## How to Use

1. **Empty the container completely** - remove all items from the storage container
2. **Use disassemble tools** - use a wrench, nail gun, or impact driver
3. **Right-click to disassemble** the empty container
4. **Collect the container item** - you'll get the container back instead of raw materials

## Requirements

- **Empty containers only**: Containers must be completely empty before disassembly
- **Proper tools**: You need disassemble tools (wrench, nail gun, impact driver)
- **No special area requirements**: Works anywhere, no Land Claim Block required

## Technical Details

The mod adds `drop event="Harvest"` with `tool_category="Disassemble"` to each supported container, which makes them return themselves when disassembled with the proper tools instead of dropping raw materials.

## Gameplay Benefits

- **Easy base reorganization**: Move storage containers without losing them
- **Flexible base building**: Redesign your storage layout anytime  
- **Resource efficiency**: Get your containers back instead of losing them to disassembly
- **No content loss**: Just empty containers before moving them

## Installation

1. Extract the mod folder to your game's `Mods` directory
2. The path should be: `[Game Directory]/Mods/PickupStorageContainers/`
3. Start the game and the mod will be automatically loaded

## Compatibility

- Works with all existing storage containers
- Compatible with other storage/base building mods
- Server and single-player compatible
- No conflicts with vanilla game mechanics
- Uses standard disassemble mechanics instead of special pickup systems

## Notes

- Containers must be completely empty to recover them
- Works with any tool that has disassemble capability
- More realistic than magic "pickup" - you're actually carefully disassembling
- No Land Claim Block requirements - works anywhere

---

**Author**: Aleksei Khozin  
**Version**: 1.0.0  
**Website**: https://alekho77.github.io/7d2d-servers/
