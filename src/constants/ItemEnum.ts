import { Enum } from "./Enum.js"

export type FabricatorType = "Legacy" | "Starter" | "Munitions" | "Engineering" | "Machine_DEPRECATED" | "Equipment"

/**
 * The item names, IDs and data are taken directly from the game source.
 *
 * The item data may be unstable because it is not edited or checked, including the
 * property names. If you use it, it is up to you to test it and handle the game changes.
 * The major version won't be incremented for any breaking changes to it.
 *
 * <small>Generated using test.drednot.io version: `Fri Sep 27 19:22:35 MDT 2024 / f7c20dd`</small>
 */
export class Item extends Enum<number> {
	readonly name: string
	readonly description: string
	readonly stackable: boolean
	readonly rarity: number
	declare readonly image?: string
	declare readonly recipe?: Partial<{ count: number, time: number, input: { item: number, count: number }[], built_by: FabricatorType[] }>
	/**
	 * Each object in this array represents build information for different cases. For example, two for cannons,
	 * for vertical and horizontal placement, and three for ejectors, including one for placement inside the ship.
	 *
	 * The object may have a `buildDirection` property to specify the build direction on the ship hull.
	 */
	declare readonly buildInfo?: Array<Partial<{ bounds: { x: number, y: number }, shape: { verts: { x: number, y: number }[] }, allow_non_solids: boolean, image: string, image_only: boolean, snap_y: boolean, offset: { x: number, y: number }, require_blocks: { x: number, y: number, block: "_BUILD_SURFACE" | "AIR" | "HULL_CORNER" | "HULL_H" | "HULL_V" | "INTERIOR_BLOCK" | "LADDER" | "WALKWAY" | "ITEM_NET" | "RAMP_1" | "RAMP_2" | "RAMP_3" | "RAMP_4" | "COLOR_PANEL" | "HYPER_RUBBER" | "ICE_GLASS" | "ANNIHILATOR" }[], allow_solids: boolean, snap_x: boolean, buildDirection: "HORIZONTAL" | "VERTICAL", allow_world: boolean, block: number, block_shaped: boolean, block_is_colored: boolean, allow_any: boolean, build_angle: "Any" | "Fixed", image_anim: string, is_lockdown_override: boolean, offset2: { x: number, y: number } }>>
	declare readonly blacklist_autobuild?: boolean
	declare readonly fab_type?: FabricatorType

	constructor(id, name, description, stackable, rarity, image?, recipe?, buildInfo?, blacklist_autobuild?, fab_type?) {
		super(id)
		this.name = name
		this.description = description
		this.stackable = stackable
		this.rarity = rarity
		if (image !== undefined) this.image = image
		if (recipe !== undefined) this.recipe = recipe
		if (buildInfo !== undefined) this.buildInfo = buildInfo
		if (blacklist_autobuild !== undefined) this.blacklist_autobuild = blacklist_autobuild
		if (fab_type !== undefined) this.fab_type = fab_type
	}
	/** The value of the constant (in this case, the ID of the item). */
	declare enumValue: number
	/** The ID of the item. Alias to {@link enumValue}. */
	get id() { return this.enumValue }
	get isBuildable() { return !!this.buildInfo }
	get isBlock() { return !!this.buildInfo?.[0]?.block }
	/** Returns an {@link Item} with the specified ID, or undefined if not found. Alias to {@link Item.getByValue | getByValue}. */
	static getById(id: number) { return Item.getByValue(id) }

	static NULL = new this(0, "", "", false, NaN)
	/**Iron*/
	static RES_METAL = new this(1, "Iron", "Material. Used to produce most items.", true, 0, "item/res_iron")
	/**Explosives*/
	static RES_GUNPOWDER = new this(2, "Explosives", "Material. Used to produce munitions.", true, 0, "item/res_explosives")
	/**Hyper Rubber*/
	static RES_HYPER_RUBBER = new this(4, "Hyper Rubber", "Material. High Elasticity.", true, 2, "item/res_hyper_rubber")
	/**Flux Crystals*/
	static RES_FLUX = new this(5, "Flux Crystals", "Material. Used to produce advanced machinery.", true, 2, "item/res_flux_crystals")
	/**Thruster Fuel*/
	static RES_FUEL = new this(6, "Thruster Fuel", "Refined fuel. Powers thrusters. More efficient than explosives.", true, 0, "item/fuel", {count:1,time:30,input:[{item:2,count:1}],built_by:["Munitions"]})
	/**Compressed Explosives*/
	static COMPRESSED_EXPLOSIVES = new this(49, "Compressed Explosives", "Explosives, compressed into a flux matrix at a 16:1 ratio. Unpack with a recycler.", true, 2, "item/comp_exp")
	/**Compressed Iron*/
	static COMPRESSED_IRON = new this(50, "Compressed Iron", "Iron, compressed into a flux matrix at a 24:1 ratio. Unpack with a recycler.", true, 2, "item/comp_iron")
	/**Volleyball*/
	static BALL_VOLLEY = new this(51, "Volleyball", "🏐", false, 2, "item/ball_volley")
	/**Golden Volleyball*/
	static BALL_VOLLEY_GOLD = new this(52, "Golden Volleyball", "🌟🏐🌟", false, 2, "item/ball_vg")
	/**Basketball*/
	static BALL_BASKET = new this(53, "Basketball", "🏀", false, 2, "item/ball_basket")
	/**Golden Basketball*/
	static BALL_BASKET_GOLD = new this(54, "Golden Basketball", "🌟🏀🌟", false, 2, "item/ball_bg")
	/**Beach Ball*/
	static BALL_BEACH = new this(55, "Beach Ball", "🌴", false, 2, "item/ball_beach")
	/**Football*/
	static BALL_SOCCER = new this(56, "Football", "⚽", false, 2, "item/ball_soccer")
	/**Wrench*/
	static WRENCH = new this(100, "Wrench", "Used to take stuff apart.", false, 0, "item/wrench", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Item Shredder*/
	static SHREDDER = new this(101, "Item Shredder", "Destroys items.", false, 0, "item/item_shredder", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Golden Item Shredder*/
	static SHREDDER_GOLD = new this(102, "Golden Item Shredder", "Destroys items quickly, with style.", false, 9, "item/item_shredder_g")
	/**Repair Tool*/
	static REPAIR_TOOL = new this(103, "Repair Tool", "Used to repair blocks and objects.", false, 0, "item/repair_tool", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Handheld Pusher*/
	static HAND_PUSHER = new this(104, "Handheld Pusher", "A pusher you can hold in your hand.", false, 2, "item/pusher_hand", {count:1,time:5,input:[{item:1,count:4},{item:5,count:16}],built_by:["Engineering"]})
	/**Ship Shield Booster*/
	static SHIELD_BOOSTER = new this(105, "Ship Shield Booster", "An inferior power source for shield generators.", false, 0, "item/repairkit", {count:1,time:3,input:[{item:1,count:2}],built_by:["Engineering","Munitions"]})
	/**Ship Embiggener*/
	static SHIP_EMBIGGENER = new this(106, "Ship Embiggener", "Makes your ship bigger. Press R to change axis.", false, 0, "item/ship_embiggener", {count:1,time:3,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Ship Shrinkinator*/
	static SHIP_SHRINKINATOR = new this(107, "Ship Shrinkinator", "Makes your ship smaller. Space must be completely empty. Press R to change axis.", false, 0, "item/ship_shrinkinator", {count:1,time:3,input:[{item:1,count:4}],built_by:["Engineering"]})
	/**Backpack*/
	static EQUIPMENT_BACKPACK = new this(108, "Backpack", "Equipment (Back). Lets you hold more items.", false, 1, "item/eq_backpack")
	/**Speed Skates*/
	static EQUIPMENT_SPEED_SKATES = new this(109, "Speed Skates", "Equipment (Feet). SPEED.", false, 2, "item/eq_speed_skates", {count:1,time:20,input:[{item:1,count:8},{item:4,count:4},{item:5,count:16}],built_by:["Equipment"]})
	/**Booster Boots*/
	static EQUIPMENT_BOOSTER_BOOTS = new this(110, "Booster Boots", "Equipment (Feet). Provides a double-jump and slightly more powerful jumps.", false, 2, "item/eq_booster_boots", {count:1,time:20,input:[{item:1,count:8},{item:4,count:8},{item:5,count:16}],built_by:["Equipment"]})
	/**Launcher Gauntlets*/
	static EQUIPMENT_LAUNCHER_GAUNTLETS = new this(111, "Launcher Gauntlets", "Equipment (Hands). Throw items more powerfully.", false, 2, "item/eq_launcher_gauntlets", {count:1,time:20,input:[{item:1,count:8},{item:4,count:8},{item:5,count:8}],built_by:["Equipment"]})
	/**Construction Gauntlets*/
	static EQUIPMENT_CONSTRUCTION_GAUNTLETS = new this(112, "Construction Gauntlets", "Equipment (Hands). While in a safe zone: Doubles build/destruct/repair/use range and speed, and allows using objects through walls.", false, 2, "item/eq_construction_gauntlets", {count:1,time:20,input:[{item:1,count:8},{item:4,count:4},{item:5,count:32}],built_by:["Equipment"]})
	/**Rocket Pack*/
	static EQUIPMENT_ROCKET_PACK = new this(113, "Rocket Pack", "Equipment (Back). Speedy Flight.", false, 2, "item/eq_rocket_pack", {count:1,time:20,input:[{item:1,count:16},{item:4,count:4},{item:5,count:32}],built_by:["Equipment"]})
	/**Hover Pack*/
	static EQUIPMENT_HOVER_PACK = new this(114, "Hover Pack", "Equipment (Back). Controlled Flight.", false, 2, "item/eq_hover_pack", {count:1,time:20,input:[{item:1,count:16},{item:4,count:4},{item:5,count:32}],built_by:["Equipment"]})
	/**Manifest Scanner*/
	static SCANNER_MANIFEST = new this(115, "Manifest Scanner", "Generate a list of items on your ship.", false, 2, "item/scanner_manifest")
	/**BoM Scanner*/
	static SCANNER_BOM = new this(116, "BoM Scanner", "Generate a list of materials used to build your ship.", false, 2, "item/scanner_bom")
	/**Starter Wrench*/
	static WRENCH_STARTER = new this(117, "Starter Wrench", "Useful for getting you out of a bind. Slow. Disappears if dropped.", false, -1, "item/wrench_starter")
	/**Starter Shredder*/
	static SHREDDER_STARTER = new this(118, "Starter Shredder", "Destroys items. Slow. Disappears if dropped.", false, -1, "item/item_shredder_starter")
	/**Hand Cannon*/
	static HAND_CANNON = new this(119, "Hand Cannon", "[TEST EXCLUSIVE] A small, handheld cannon. Uses ammo in your inventory.", false, 0, "item/hand_cannon")
	/**Blueprint Scanner*/
	static SCANNER_BLUEPRINT = new this(120, "Blueprint Scanner", "Generates blueprint strings, which describe how to rebuild ships or parts of ships. Click and drag to select a region.", false, 2, "item/scanner_blueprint")
	/**Sandbox RCD*/
	static RCD_SANDBOX = new this(121, "Sandbox RCD", "Buildable. Used for automated construction. This test-exclusive variant can spawn items and doesn't need fuel. It works faster on ships owned by patrons.", false, -1, "item/rcd_sandbox", undefined, [{bounds:{x:2.5,y:2.5},shape:{verts:[{x:-1.25,y:-0.5},{x:-0.5,y:-1.25},{x:0.5,y:-1.25},{x:1.25,y:-0.5},{x:1.25,y:0.5},{x:0.5,y:1.25},{x:-0.5,y:1.25},{x:-1.25,y:0.5}]},allow_non_solids:true,image:"rcd_sandbox",image_only:true}], true)
	/**Flux RCD*/
	static RCD_FLUX = new this(122, "Flux RCD", "Buildable. Used for automated construction. Consumes flux as fuel.", false, 2, "item/rcd_flux", undefined, [{bounds:{x:2.5,y:2.5},shape:{verts:[{x:-1.25,y:-0.5},{x:-0.5,y:-1.25},{x:0.5,y:-1.25},{x:1.25,y:-0.5},{x:1.25,y:0.5},{x:0.5,y:1.25},{x:-0.5,y:1.25},{x:-1.25,y:0.5}]},allow_non_solids:true,image:"rcd_flux",image_only:true}], true)
	/**Shield Core*/
	static SHIELD_CORE = new this(123, "Shield Core", "A power source for shield generators.", false, 1, "item/shield_core")
	/**Standard Ammo*/
	static AMMO_STANDARD = new this(150, "Standard Ammo", "Regular bullets.", true, 0, "item/ammo_standard", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Starter","Munitions"]})
	/**ScatterShot Ammo*/
	static AMMO_SCATTER = new this(151, "ScatterShot Ammo", "Shoots multiple projectiles. Significant damage at close range, with knock-back.", true, 0, "item/ammo_scattershot", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Munitions"]})
	/**Flak Ammo*/
	static AMMO_FLAK = new this(152, "Flak Ammo", "Explodes into more bullets in flight.", true, 0, "item/ammo_flak", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Munitions"]})
	/**Sniper Ammo*/
	static AMMO_SNIPER = new this(153, "Sniper Ammo", "Speedy. Gains power from bouncing.", true, 0, "item/ammo_sniper", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Munitions"]})
	/**Punch Ammo*/
	static AMMO_PUNCH = new this(154, "Punch Ammo", "Pushes objects away.", true, 0, "item/ammo_punch", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Munitions"]})
	/**Yank Ammo*/
	static AMMO_YANK = new this(155, "Yank Ammo", "Pulls objects.", true, 0, "item/ammo_yank", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Munitions"]})
	/**Slug Ammo*/
	static AMMO_SLUG = new this(156, "Slug Ammo", "Slow bullet. Gains speed and damage as it falls.", true, 0, "item/ammo_slug", {count:4,time:1,input:[{item:1,count:1},{item:2,count:1}],built_by:["Munitions"]})
	/**Trash Box*/
	static AMMO_TRASH = new this(157, "Trash Box", "Low quality, but free! Decays over time.", true, 0, "item/ammo_trash", {count:1,time:3,input:[],built_by:["Munitions"]})
	/**Booster Fuel (Low Grade)*/
	static FUEL_BOOSTER_LOW = new this(159, "Booster Fuel (Low Grade)", "Increases thruster power for a short time.", false, 0, "item/booster_low", {count:1,time:30,input:[{item:2,count:16}],built_by:["Munitions"]})
	/**Booster Fuel (High Grade)*/
	static FUEL_BOOSTER_HIGH = new this(160, "Booster Fuel (High Grade)", "Increases thruster power for a short time.", false, 2, "item/booster_high", {count:4,time:30,input:[{item:2,count:64},{item:5,count:1}],built_by:["Munitions"]})
	/**Void Orb*/
	static VOID_ORB = new this(161, "Void Orb", "DO NOT EAT!", false, 10, "item/void_orb")
	/**Turret Booster - Rapid Fire*/
	static TURRET_BOOSTER_RAPID = new this(162, "Turret Booster - Rapid Fire", "Boosts a re-configurable turret's fire rate by 50%, with reduced accuracy.", false, 2, "item/turret_booster_rapid")
	/**Turret Booster - Rapid Fire (Depleted)*/
	static TURRET_BOOSTER_RAPID_USED = new this(163, "Turret Booster - Rapid Fire (Depleted)", "Boosts a re-configurable turret's fire rate by 25%, with reduced accuracy. Nearly depleted!", false, 2, "item/turret_booster_rapid_used")
	/**Turret Booster - Preservation*/
	static TURRET_BOOSTER_PRESERVATION = new this(164, "Turret Booster - Preservation", "Boosts a re-configurable turret's ammo preservation by 10%, with reduced rotational aiming limits.", false, 2, "item/turret_booster_preservation")
	/**Turret Booster - Preservation (Depleted)*/
	static TURRET_BOOSTER_PRESERVATION_USED = new this(165, "Turret Booster - Preservation (Depleted)", "Boosts a re-configurable turret's ammo preservation by 5%, with reduced rotational aiming limits. Nearly depleted!", false, 2, "item/turret_booster_preservation_used")
	/**Cooling Cell*/
	static COOLING_CELL = new this(166, "Cooling Cell", "Prevents machine cannons from damaging themselves.", false, 0, "item/cooling_cell", {count:1,time:1,input:[{item:234,count:4}],built_by:["Munitions"]})
	/**Cooling Cell (Hot)*/
	static COOLING_CELL_HOT = new this(167, "Cooling Cell (Hot)", "Will take some time to cool back down.", false, 0, "item/cooling_cell_hot")
	/**Burst Charge*/
	static BURST_CHARGE = new this(168, "Burst Charge", "Power source for burst cannons. Overcharging cannons may result in damage!", false, 0, "item/burst_charge", {count:1,time:1,input:[{item:2,count:4}],built_by:["Munitions"]})
	/**Helm*/
	static HELM = new this(215, "Helm (Packaged)", "Buildable. Used to pilot your ship.", false, 0, "item/helm", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{snap_y:true,offset:{x:0,y:0.3},bounds:{x:1.5,y:1.5},require_blocks:[{x:0,y:-1,block:"_BUILD_SURFACE"}],allow_solids:true,image:"helm_wheel",image_only:true}])
	/**Helm (Starter)*/
	static HELM_STARTER = new this(216, "Helm (Starter, Packaged)", "Buildable Starter Item. Used to pilot your ship.", false, -1, "item/helm_starter", undefined, [{snap_y:true,offset:{x:0,y:0.3},bounds:{x:1.5,y:1.5},require_blocks:[{x:0,y:-1,block:"_BUILD_SURFACE"}],allow_solids:true,image:"helm_wheel_starter",image_only:true}])
	/**Comms Station*/
	static COMMS_STATION = new this(217, "Comms Station (Packaged)", "Buildable. Used to communicate with other ships.", false, 0, "item/comms", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{snap_y:true,offset:{x:0,y:-0.25},bounds:{x:1.25,y:2.5},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"comms_station",image_only:true}])
	/**Sign*/
	static SIGN = new this(218, "Sign (Packaged)", "Buildable. Can display a short message.", false, 0, "item/sign", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},allow_solids:true,image:"sign"}], true)
	/**Spawn Point*/
	static SPAWN_POINT = new this(219, "Spawn Point (Packaged)", "Buildable. Can be set to spawn a specific rank.", false, 0, "item/spawn", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{snap_y:true,offset:{x:0,y:0.5},bounds:{x:1,y:2},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"spawn"}], true)
	/**Door*/
	static DOOR = new this(220, "Door (Packaged)", "Buildable. Can be restricted to specific ranks. Press R to rotate.", false, 0, "item/door", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,offset:{x:0.5,y:0},bounds:{x:2,y:0.45},image:"door_full"},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,offset:{x:0,y:0.5},bounds:{x:0.45,y:2},image:"door_full"}], true)
	/**Cargo Hatch*/
	static ITEM_HATCH = new this(221, "Cargo Hatch (Packaged)", "Buildable. Drops items picked up by the ship.", false, 0, "item/item_hatch", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},allow_solids:true}])
	/**Cargo Hatch (Starter)*/
	static ITEM_HATCH_STARTER = new this(222, "Cargo Hatch (Starter, Packaged)", "Buildable Starter Item. Drops items picked up by the ship.", false, -1, "item/item_hatch_starter", undefined, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},allow_solids:true}])
	/**Cargo Ejector*/
	static ITEM_EJECTOR = new this(223, "Cargo Ejector (Packaged)", "Buildable. Ejects items from the ship.", false, 0, "item/item_ejector", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true},{snap_x:true,snap_y:true,bounds:{x:1,y:1},build_angle:"Fixed",image:"arrow_shape",image_only:true}])
	/**Turret Controller*/
	static TURRET_CONTROLLER = new this(224, "Turret Controller (Packaged)", "Buildable. Controls adjacent turrets.", false, 0, "item/turret_controller", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Cannon*/
	static TURRET_REMOTE = new this(226, "Cannon (Packaged)", "Buildable. A normal cannon that you can use to shoot at stuff.", false, 1, "item/turret_rc", undefined, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Starter Cannon*/
	static TURRET_REMOTE_STARTER = new this(227, "Starter Cannon (Packaged)", "Buildable Starter Item. Slowly re-generates ammo when empty.", false, -1, "item/turret_rc_starter", undefined, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Burst Cannon*/
	static TURRET_BURST = new this(228, "Burst Cannon (Packaged)", "Buildable. Fires a burst of shots when supplied with burst charges. May damage itself.", false, 1, "item/turret_burst", undefined, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Machine Cannon*/
	static TURRET_AUTO = new this(229, "Machine Cannon (Packaged)", "Buildable. A fully automatic gun that takes time to wind up. Requires cooling.", false, 1, "item/turret_auto", undefined, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Thruster*/
	static THRUSTER = new this(230, "Thruster (Packaged)", "Buildable. Moves your ship. Fuelled with explosives.", false, 0, "item/thruster", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Thruster (Starter)*/
	static THRUSTER_STARTER = new this(231, "Thruster (Starter, Packaged)", "Buildable Starter Item. Moves your ship. Doesn't need fuel.", false, -1, "item/thruster_starter", undefined, [{snap_x:true,snap_y:true,bounds:{x:0.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_CORNER"}],allow_world:true}])
	/**Iron Block*/
	static BLOCK = new this(232, "Iron Block", "Buildable. Used for interior walls/floors.", true, 0, "item/block", {count:1,time:1,input:[{item:1,count:2}],built_by:["Starter","Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:4,block_shaped:true}])
	/**Hyper Rubber Block*/
	static BLOCK_HYPER_RUBBER = new this(233, "Hyper Rubber Block", "Buildable. Bouncy.", true, 2, "item/block_hrubber", {count:1,time:1,input:[{item:4,count:2}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:13,block_shaped:true}])
	/**Hyper Ice Block*/
	static BLOCK_ICE_GLASS = new this(234, "Hyper Ice Block", "Buildable. Low-friction ice that can't melt for some reason.", true, 0, "item/block_sglass", undefined, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:14,block_shaped:true}])
	/**Ladder*/
	static BLOCK_LADDER = new this(235, "Ladder", "Buildable. You can climb them.", true, 0, "item/ladder", {count:1,time:1,input:[{item:1,count:2}],built_by:["Starter","Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:5}])
	/**Walkway*/
	static BLOCK_WALKWAY = new this(236, "Walkway", "Buildable. Blocks players but not items.", true, 0, "item/walkway", {count:1,time:1,input:[{item:1,count:2}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:6,block_shaped:true}])
	/**Item Net*/
	static BLOCK_ITEM_NET = new this(237, "Item Net", "Buildable. Blocks items but not players.", true, 0, "item/item_net", {count:1,time:1,input:[{item:1,count:2}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:7,block_shaped:true}])
	/**Paint*/
	static PAINT = new this(239, "Paint", "Used to paint your ship's background. Hold R to select color.", true, 0, "item/color_panel", {count:1,time:1,input:[{item:1,count:2}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block_is_colored:true,allow_world:true,allow_any:true}], true)
	/**Expando Box*/
	static EXPANDO_BOX = new this(240, "Expando Box (Packaged)", "Buildable. Flexible bulk storage.", false, 0, "item/exbox", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{bounds:{x:2,y:2},shape:{verts:[{x:-0.95,y:-0.75},{x:-0.75,y:-0.95},{x:0.75,y:-0.95},{x:0.95,y:-0.75},{x:0.95,y:0.75},{x:0.75,y:0.95},{x:-0.75,y:0.95},{x:-0.95,y:0.75}]},allow_non_solids:true,build_angle:"Any",image:"exbox_base",image_only:true}])
	/**Safety Anchor*/
	static FREEPORT_ANCHOR = new this(241, "Safety Anchor", "Buildable. Prevents teleports out of safe zones while placed.", false, 0, "item/anchor", {count:1,time:20,input:[{item:1,count:16}],built_by:["Engineering"]}, [{bounds:{x:3,y:3},snap_x:true,snap_y:true,image:"anchor"}])
	/**Pusher*/
	static PUSHER = new this(242, "Pusher (Packaged)", "Buildable. Pushes things.", false, 2, "item/pusher", {count:1,time:10,input:[{item:1,count:8},{item:5,count:4}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},image:"loader_base",image_anim:"pusher",image_only:true}])
	/**Item Launcher*/
	static ITEM_LAUNCHER = new this(243, "Item Launcher (Packaged)", "Buildable. Launches items at a configurable speed and angle.", false, 2, "item/item_launcher", {count:1,time:10,input:[{item:1,count:8},{item:4,count:8},{item:5,count:8}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},image:"item_launcher",image_only:true}], true)
	/**DEPRECATED ITEM*/
	static LOADER = new this(244, "DEPRECATED ITEM", "DEPRECATED ITEM", false, 2, "item/loader_old")
	/**Recycler*/
	static RECYCLER = new this(245, "Recycler (Packaged)", "Buildable. Converts items back into resources.", false, 0, "item/recycler", {count:1,time:10,input:[{item:1,count:8}],built_by:["Engineering"]}, [{snap_y:true,offset:{x:0,y:0.25},bounds:{x:2.25,y:3.5},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"recycler",image_only:true}])
	/**Fabricator (Legacy)*/
	static FABRICATOR_GOLD = new this(246, "Fabricator (Legacy, Packaged)", "Buildable. It doesn't do anything.", false, 9, "item/fabricator_legacy", undefined, [{snap_y:true,bounds:{x:2.5,y:3},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"fab_lod",image_only:true}], undefined, "Legacy")
	/**Fabricator (Starter)*/
	static FABRICATOR_STARTER = new this(247, "Fabricator (Starter, Packaged)", "Buildable Starter Item. Used to craft basic items.", false, -1, "item/fabricator_starter", undefined, [{snap_y:true,bounds:{x:2.5,y:3},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"fab_lod",image_only:true}], undefined, "Starter")
	/**Fabricator (Munitions)*/
	static FABRICATOR_MUNITIONS = new this(248, "Fabricator (Munitions, Packaged)", "Buildable. Used to craft ammo and other consumables.", false, 0, "item/fabricator_munitions", {count:1,time:20,input:[{item:1,count:16}],built_by:["Starter","Engineering"]}, [{snap_y:true,bounds:{x:2.5,y:3},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"fab_lod",image_only:true}], undefined, "Munitions")
	/**Fabricator (Engineering)*/
	static FABRICATOR_ENGINEERING = new this(249, "Fabricator (Engineering, Packaged)", "Buildable. Used to craft tools, blocks, and security items.", false, 0, "item/fabricator_engineering", {count:1,time:20,input:[{item:1,count:16}],built_by:["Starter","Engineering"]}, [{snap_y:true,bounds:{x:2.5,y:3},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"fab_lod",image_only:true}], undefined, "Engineering")
	/**Fabricator (DEPRECATED)*/
	static FABRICATOR_MACHINE_DEPRECATED = new this(250, "Fabricator (DEPRECATED, Packaged)", "DEPRECATED ITEM", false, 0, "item/fabricator_machine", {count:1,time:20,input:[{item:1,count:16}],built_by:[]}, [{snap_y:true,bounds:{x:2.5,y:3},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"fab_lod",image_only:true}], undefined, "Engineering")
	/**Fabricator (Equipment)*/
	static FABRICATOR_EQUIPMENT = new this(251, "Fabricator (Equipment, Packaged)", "Buildable. Used to craft wearable equipment.", false, 0, "item/fabricator_equipment", {count:1,time:20,input:[{item:1,count:16}],built_by:["Engineering"]}, [{snap_y:true,bounds:{x:2.5,y:3},require_blocks:[{x:0,y:-2,block:"_BUILD_SURFACE"}],allow_solids:true,image:"fab_lod",image_only:true}], undefined, "Equipment")
	/**Loader*/
	static LOADER_NEW = new this(252, "Loader (Packaged)", "Buildable. Loads items into machines.", false, 2, "item/loader", {count:1,time:10,input:[{item:1,count:8},{item:5,count:2}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},image:"loader_base",image_anim:"loader",image_only:true}])
	/**Lockdown Override Unit*/
	static LOCKDOWN_OVERRIDE_GREEN = new this(253, "Lockdown Override Unit", "Buildable. Allows a limited number of green rarity items to be removed from a ship while in lockdown mode.", false, 2, "item/lockdown_override_green", {count:1,time:20,input:[{item:5,count:64}],built_by:["Engineering"]}, [{bounds:{x:1,y:1},snap_x:true,snap_y:true,image:"lockdown_override_green",is_lockdown_override:true}], true)
	/**Annihilator Tile*/
	static BLOCK_ANNIHILATOR = new this(254, "Annihilator Tile", "[TEST EXCLUSIVE] Buildable. Destroys objects.", true, 0, "item/annihilator_tile", undefined, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:15}])
	/**Fluid Tank*/
	static FLUID_TANK = new this(255, "Fluid Tank", "Buildable. Stores fluids.", false, 0, "item/tank", {count:1,time:20,input:[{item:1,count:64}],built_by:["Engineering"]}, [{bounds:{x:2,y:2},snap_x:true,snap_y:true,offset:{x:0.5,y:0.5},offset2:{x:-0.5,y:-0.5},image:"tank"}])
	/**Shield Generator*/
	static SHIELD_GENERATOR = new this(256, "Shield Generator", "Buildable. Generates shield fluid.", false, 2, "item/shield_generator", undefined, [{bounds:{x:4,y:2},snap_x:true,snap_y:true,offset:{x:0.5,y:0.5},offset2:{x:-0.5,y:-0.5},image:"shield_generator",build_angle:"Fixed",image_only:true}])
	/**Shield Projector*/
	static SHIELD_PROJECTOR = new this(257, "Shield Projector", "Buildable. Used to activate an adjacent bank of shield tanks.", false, 2, "item/shield_projector", undefined, [{bounds:{x:1,y:1},snap_x:true,snap_y:true,image:"shield_projector_1"}])
	/**Enhanced Turret Controller*/
	static TURRET_CONTROLLER_NEW = new this(258, "Enhanced Turret Controller", "Buildable. Used to control turrets remotely.", false, 2, "item/turret_controller_new", undefined, [{bounds:{x:1,y:1},snap_x:true,snap_y:true}])
	/**Bulk Ejector*/
	static BULK_EJECTOR = new this(259, "Bulk Ejector (Packaged)", "Buildable. WIP / UNOBTAINABLE", false, 2, "item/bulk_ejector", undefined, [{bounds:{x:2,y:2},snap_x:true,snap_y:true,offset:{x:0.5,y:0.5},offset2:{x:-0.5,y:-0.5},build_angle:"Fixed"}])
	/**Bulk Loading Bay Designator*/
	static BULK_BAY_MARKER = new this(260, "Bulk Loading Bay Designator (Packaged)", "Buildable. WIP / UNOBTAINABLE", false, 2, "item/bulk_bay_marker", undefined, [{bounds:{x:1,y:1},snap_x:true,snap_y:true}])
	/**Navigation Unit (Starter)*/
	static NAV_UNIT = new this(261, "Navigation Unit (Starter, Packaged)", "Buildable Starter Item. Used to select a destination zone and initiate emergency warps. Also functions as a simple shield projector.", false, -1, "item/nav_unit", undefined, [{bounds:{x:1,y:1},snap_x:true,snap_y:true}])
	/**Logistics Rail*/
	static BLOCK_LOGISTICS_RAIL = new this(262, "Logistics Rail", "Buildable. Used by munitions supply units to deliver munitions.", true, 0, "item/logistics_rail", {count:1,time:1,input:[{item:1,count:2}],built_by:["Engineering"]}, [{snap_x:true,snap_y:true,bounds:{x:1,y:1},block:16}])
	/**Acute Cannon*/
	static TURRET_ACUTE = new this(263, "Acute Cannon (Packaged)", "Buildable. A gun with a limited firing angle, and a slightly improved fire-rate.", false, 1, "item/turret_acute", undefined, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Munitions Supply Unit*/
	static MUNITIONS_SUPPLY_UNIT = new this(264, "Munitions Supply Unit (Packaged)", "Buildable. Sends munitions to turrets via logistics rails.", false, 1, "item/msu", undefined, [{bounds:{x:2,y:2},snap_x:true,snap_y:true,offset:{x:0.5,y:0.5},offset2:{x:-0.5,y:-0.5}}])
	/**Obtuse Cannon*/
	static TURRET_OBTUSE = new this(265, "Obtuse Cannon (Packaged)", "Buildable. A gun which preserves ammo, and has a slightly reduced fire-rate.", false, 1, "item/turret_obtuse", undefined, [{buildDirection:"HORIZONTAL",snap_x:true,snap_y:true,bounds:{x:2.8,y:0.8},require_blocks:[{x:0,y:0,block:"HULL_H"},{x:1,y:0,block:"HULL_H"},{x:-1,y:0,block:"HULL_H"}],allow_world:true},{buildDirection:"VERTICAL",snap_x:true,snap_y:true,bounds:{x:0.8,y:2.8},require_blocks:[{x:0,y:0,block:"HULL_V"},{x:0,y:1,block:"HULL_V"},{x:0,y:-1,block:"HULL_V"}],allow_world:true}])
	/**Eternal Bronze Wrench*/
	static ETERNAL_WRENCH_BRONZE = new this(300, "Eternal Bronze Wrench", "Patron reward. Will not despawn. Thank you for your support! 😀", false, -1, "item/wrench_bronze_et")
	/**Eternal Silver Wrench*/
	static ETERNAL_WRENCH_SILVER = new this(301, "Eternal Silver Wrench", "Patron reward. Will not despawn. Thank you for your support! 😀", false, -1, "item/wrench_silver_et")
	/**Eternal Gold Wrench*/
	static ETERNAL_WRENCH_GOLD = new this(302, "Eternal Gold Wrench", "Patron reward. Will not despawn. Thank you for your support! 😀", false, -1, "item/wrench_gold_et")
	/**Eternal Flux Wrench*/
	static ETERNAL_WRENCH_FLUX = new this(303, "Eternal Flux Wrench", "Patron reward. Will not despawn. Thank you for your support! 😀", false, -1, "item/wrench_flux_et")
	/**Eternal Platinum Wrench*/
	static ETERNAL_WRENCH_PLATINUM = new this(304, "Eternal Platinum Wrench", "Patron reward. Will not despawn. Thank you for your support! 😀", false, -1, "item/wrench_platinum_et")
	/**Gold Null Trophy*/
	static TROPHY_NULL = new this(305, "Gold Null Trophy", "RIP 0x items.", false, 9, "item/trophy_null")
	/**Bug Hunter Trophy*/
	static TROPHY_BUG_HUNTER = new this(306, "Bug Hunter Trophy", "Rewarded for reporting a serious problem.", false, -1, "item/trophy_bug")
	/**Silver Null Trophy*/
	static TROPHY_NULL_SILVER = new this(307, "Silver Null Trophy", "RIP 0x items.", false, 9, "item/trophy_null_silver")
	/**Bronze Wrench*/
	static PAT_WRENCH_BRONZE = new this(308, "Bronze Wrench", "Patron reward. Thank you for your support! 😀", false, 0, "item/wrench_bronze", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Silver Wrench*/
	static PAT_WRENCH_SILVER = new this(309, "Silver Wrench", "Patron reward. Thank you for your support! 😀", false, 0, "item/wrench_silver", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Gold Wrench*/
	static PAT_WRENCH_GOLD = new this(310, "Gold Wrench", "Patron reward. Thank you for your support! 😀", false, 0, "item/wrench_gold", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Platinum Wrench*/
	static PAT_WRENCH_PLATINUM = new this(311, "Platinum Wrench", "Patron reward. Thank you for your support! 😀", false, 0, "item/wrench_platinum", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Flux Wrench*/
	static PAT_WRENCH_FLUX = new this(312, "Flux Wrench", "Patron reward. Thank you for your support! 😀", false, 0, "item/wrench_flux", {count:1,time:5,input:[{item:1,count:4}],built_by:["Starter","Engineering"]})
	/**Lesser Cap*/
	static COS_LESSER_CAP = new this(313, "Lesser Cap", "Cosmetic Equipment (Head). Patron reward.", false, 0, "item/cap", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Goofy Glasses*/
	static COS_GOOFY_GLASSES = new this(314, "Goofy Glasses", "Cosmetic Equipment (Face). Patron reward.", false, 0, "item/glasses", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Shades*/
	static COS_SHADES = new this(315, "Shades", "Cosmetic Equipment (Face). Patron reward.", false, 0, "item/shades", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Top Hat*/
	static COS_TOP_HAT = new this(316, "Top Hat", "Cosmetic Equipment (Head). Patron reward.", false, 0, "item/top_hat", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Demon Horns*/
	static COS_HORNS = new this(317, "Demon Horns", "Cosmetic Equipment (Head). Patron reward.", false, 0, "item/horns", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Alien Mask*/
	static COS_MASK_ALIEN = new this(318, "Alien Mask", "Cosmetic Equipment (Face). Patron reward.", false, 0, "item/mask_alien", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Clown Mask*/
	static COS_MASK_CLOWN = new this(319, "Clown Mask", "Cosmetic Equipment (Face). Patron reward.", false, 0, "item/mask_clown", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Goblin Mask*/
	static COS_MASK_GOBLIN = new this(320, "Goblin Mask", "Cosmetic Equipment (Face). Patron reward.", false, 0, "item/mask_goblin", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Pumpkin*/
	static COS_PUMPKIN = new this(321, "Pumpkin", "Cosmetic Equipment (Face). Patron reward.", false, 0, "item/mask_pumpkin", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Witch Hat*/
	static COS_WITCH_HAT = new this(322, "Witch Hat", "Cosmetic Equipment (Head). Patron reward.", false, 0, "item/witch_hat", {count:1,time:5,input:[{item:1,count:4}],built_by:["Equipment"]})
	/**Wild Gremlin (Red)*/
	static GREMLIN_RED = new this(323, "Wild Gremlin (Red)", "It looks upset.", false, 0, "item/gremlin_red")
	/**Wild Gremlin (Orange)*/
	static GREMLIN_ORANGE = new this(324, "Wild Gremlin (Orange)", "It looks upset.", false, 0, "item/gremlin_orange")
	/**Wild Gremlin (Yellow)*/
	static GREMLIN_YELLOW = new this(325, "Wild Gremlin (Yellow)", "It looks upset.", false, 0, "item/gremlin_yellow")
	/**Elimination Trophy*/
	static TROPHY_ELIMINATION = new this(326, "Elimination Trophy", "Awarded to Elimination PvP event winners.", false, 9, "item/trophy_elim")
	static { this.end() }
}
