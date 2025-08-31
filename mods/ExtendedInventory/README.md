# Extended Inventory Mod

## Description

This mod extends the player's inventory from 5 rows (45 slots) to 6 rows (60 slots) with optimized compact cell design. The mod features custom-scaled item icons and UI elements specifically designed for 60px cells to provide a clean, professional appearance.

## Features

### Visual improvements:
- **Compact cell design**: 60×60px cells (down from 67×67px vanilla)
- **Scaled item icons**: 57×57px icons perfectly fitted to compact cells
- **Optimized UI elements**: All durability bars, labels, and overlays scaled proportionally
- **Clean borders**: 2px thickness for crisp appearance without visual clutter
- **Proper encumbrance display**: Full support for overweight item highlighting

### Inventory expansion:
- **Standard inventory**: 5 rows × 9 slots = 45 slots
- **Extended inventory**: 6 rows × 10 slots = 60 slots
- **Additional slots**: +15 inventory slots total
- **Optimized layout**: Fits perfectly without overlapping toolbelt on 16:9 and 5:3 screen ratios

### Technical implementation:
- **Custom item template**: `backpack_item_stack_compact` with optimized scaling
- **Professional UI design**: All elements (icons, durability bars, labels) properly scaled
- **Background sizing**: Inventory window background automatically adjusted to 606×366px
- **Compatible with vanilla**: Works with all standard game mechanics (Pack Mule, encumbrance, etc.)

## Mod files

- `ModInfo.xml` - Basic mod information and metadata
- `Config/XUi/controls.xml` - Custom compact item stack template definition
- `Config/XUi/windows.xml` - Inventory window configuration (6×10 grid, cell sizing, template usage)

## Compatibility

The mod is designed to be maximally compatible with the vanilla game and other mods. It may have conflicts with mods that:
- Modify inventory cell templates or sizing
- Change the inventory window layout significantly
- Override the `backpack_item_stack` control template
- Alter inventory grid dimensions

**Note**: This mod uses a separate `backpack_item_stack_compact` template, so it's unlikely to conflict with most inventory-related mods.

## Installation

1. Download and extract the mod
2. Copy the `ExtendedInventory` folder to your `Mods` directory
   - **Client**: `7 Days To Die/Mods/`
   - **Server**: `[ServerFolder]/Mods/`
3. Restart the game/server
4. Enjoy your expanded and visually improved inventory!

## Version History

### v1.1.0
- Initial release with 6×10 inventory grid (60 slots)
- Custom compact cell design (60×60px)
- Proportionally scaled UI elements
- Optimized for multiple screen ratios

---

*Author: Aleksei Khozin*  
*Version: 1.1.0*  
*Compatible with: 7 Days to Die A21+*
