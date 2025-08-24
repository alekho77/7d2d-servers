# Extended Inventory Mod

## Description

This mod extends the player's inventory by adding a 6th row (9 additional slots) that initially works with the encumbered effect. The key feature of the mod is that the "Pack Mule" perk progression does NOT remove the encumbered effect from this additional row.

## Features

### Basic mechanics:
- **Standard inventory**: 5 rows × 9 slots = 45 slots
- **Extended inventory**: 6 rows × 9 slots = 54 slots
- **6th row**: always with encumbered effect by default

### How to remove encumbrance from the 6th row:
The only way to remove the encumbered effect from the additional row is to use **standard armor modifications**:

1. **Storage Pocket** (`modArmorStoragePocket`) - +1 slot
2. **Double Storage Pocket** (`modArmorDoubleStoragePocket`) - +2 slots  
3. **Triple Storage Pocket** (`modArmorTripleStoragePocket`) - +3 slots
4. **Quad Storage Pocket** (`modArmorQuadStoragePocket`) - +4 slots

### How it works:
- **Without modifications**: 45 slots available without encumbrance (standard game with maximum Pack Mule)
- **6th row**: slots 46-54 always with encumbrance, Pack Mule doesn't affect them
- **With pocket mods**: +1 to +4 additional slots per armor piece
- **Maximum configuration**: 45 (standard) + 16 (4 armor pieces × 4 slots) = 61 slots without encumbrance

## Gameplay advantages

1. **Long-term value of pocket mods**: These modifications remain useful even after maximum Pack Mule progression
2. **Strategic choice**: Players must decide which armor modifications to use - protective or inventory-expanding
3. **Progression**: Gradual increase in available space through equipment improvement

## Mod files

- `ModInfo.xml` - Basic mod information
- `Config/XUi/windows.xml` - Interface changes (6 inventory rows)

## Compatibility

The mod may conflict with other mods that change:
- Inventory size
- Carry capacity system  
- Armor modifications
- Inventory interface

## Installation

1. Copy the `ExtendedInventory` folder to your server's `Mods` directory
2. Restart the server
3. Enjoy the extended inventory!

---

*Author: Aleksei Khozin*  
*Version: 1.0.0*
