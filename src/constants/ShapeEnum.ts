/* eslint-disable no-irregular-whitespace */
import { Enum } from "./Enum.js"

/**
 * The shape names and vertices are taken directly from the game source. The names may not be
 * descriptive, but you don't usually need to refer to them by name. Additionally, the constants
 * have a comment that visually represents the shape with braille ascii art, generated from the vertices.
 *
 * The {@link vertices} are sorted to prevent them from overlapping.
 *
 * <small>Generated using test.drednot.io version: `Wed Oct 18 17:42:13 MDT 2023 / 1944d9d`</small>
 */
export class Shape extends Enum<number> {
	constructor(v: number, readonly vertices: { x: number, y: number }[]) {
		super(v)
	}
	/** Checks whether the shape has a flat and full top surface. */
	get isBuildSurface() { return Shape.buildSurfaceShapes.has(this) }
	/**⣿⣿⣿⣿\
	   ⣿⣿⣿⣿*/
	static BLOCK = new this(0, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**⣷⣄     \
	   ⣿⣿⣷⣄*/
	static RAMP_UR = new this(1, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:-0.5,y:0.5}])
	/**⣿⣿⡿⠋\
	   ⡿⠋    &#8198;*/
	static RAMP_DR = new this(2, [{x:-0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**⠈⠻⣿⣿\
	 *       ⠈⠻*/
	static RAMP_DL = new this(3, [{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;    ⢀⣴\
	   ⢀⣴⣿⣿*/
	static RAMP_UL = new this(4, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5}])
	/**&#8198;        \
	   ⣿⣿⣿⣿*/
	static SLAB_U = new this(5, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0},{x:-0.5,y:0}])
	/**⣿⣿     \
	   ⣿⣿    &#8198;*/
	static SLAB_R = new this(6, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**⣿⣿⣿⣿\
	 *          &#8198;*/
	static SLAB_D = new this(7, [{x:-0.5,y:0},{x:0.5,y:0},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;    ⣿⣿\
	 *       ⣿⣿*/
	static SLAB_L = new this(8, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:0,y:0.5}])
	/**&#8198;        \
	   ⣷⣦⣄⡀*/
	static HALF_RAMP_1_U = new this(9, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:-0.5,y:0}])
	/**⣿⠏     \
	   ⠏      &#8198;*/
	static HALF_RAMP_1_R = new this(10, [{x:-0.5,y:-0.5},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**⠈⠙⠻⢿\
	 *          &#8198;*/
	static HALF_RAMP_1_D = new this(11, [{x:0.5,y:0},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;      ⣰\
	 *       ⣰⣿*/
	static HALF_RAMP_1_L = new this(12, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5}])
	/**⣷⣦⣄⡀\
	   ⣿⣿⣿⣿*/
	static HALF_RAMP_2_U = new this(13, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0},{x:-0.5,y:0.5}])
	/**⣿⣿⣿⠏\
	   ⣿⣿⠏  &#8198;*/
	static HALF_RAMP_2_R = new this(14, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**⣿⣿⣿⣿\
	   ⠈⠙⠻⢿*/
	static HALF_RAMP_2_D = new this(15, [{x:-0.5,y:0},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;  ⣰⣿⣿\
	   ⣰⣿⣿⣿*/
	static HALF_RAMP_2_L = new this(16, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:0,y:0.5}])
	/**&#8198;        \
	   ⢀⣠⣴⣾*/
	static HALF_RAMP_1_UI = new this(17, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0}])
	/**⣆       \
	   ⣿⣆    &#8198;*/
	static HALF_RAMP_1_RI = new this(18, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:-0.5,y:0.5}])
	/**⡿⠟⠋⠁\
	 *          &#8198;*/
	static HALF_RAMP_1_DI = new this(19, [{x:-0.5,y:0},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;    ⠹⣿\
	 *         ⠹*/
	static HALF_RAMP_1_LI = new this(20, [{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:0,y:0.5}])
	/**⢀⣠⣴⣾\
	   ⣿⣿⣿⣿*/
	static HALF_RAMP_2_UI = new this(21, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0}])
	/**⣿⣿⣆   \
	   ⣿⣿⣿⣆*/
	static HALF_RAMP_2_RI = new this(22, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**⣿⣿⣿⣿\
	   ⡿⠟⠋⠁*/
	static HALF_RAMP_2_DI = new this(23, [{x:-0.5,y:-0.5},{x:0.5,y:0},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**⠹⣿⣿⣿\
	 *     ⠹⣿⣿*/
	static HALF_RAMP_2_LI = new this(24, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**⣷⣦⣄⡀\
	 *          &#8198;*/
	static HALF_RAMP_3_U = new this(25, [{x:-0.5,y:0},{x:0.5,y:0},{x:-0.5,y:0.5}])
	/**&#8198;    ⣿⠏\
	 *       ⠏  &#8198;*/
	static HALF_RAMP_3_R = new this(26, [{x:0,y:-0.5},{x:0.5,y:0.5},{x:0,y:0.5}])
	/**&#8198;        \
	   ⠈⠙⠻⢿*/
	static HALF_RAMP_3_D = new this(27, [{x:0.5,y:-0.5},{x:0.5,y:0},{x:-0.5,y:0}])
	/**&#8198;  ⣰     \
	   ⣰⣿    &#8198;*/
	static HALF_RAMP_3_L = new this(28, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:0,y:0.5}])
	/**⢀⣠⣴⣾\
	 *          &#8198;*/
	static HALF_RAMP_3_UI = new this(29, [{x:-0.5,y:0},{x:0.5,y:0},{x:0.5,y:0.5}])
	/**&#8198;    ⣆   \
	 *       ⣿⣆*/
	static HALF_RAMP_3_RI = new this(30, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0,y:0.5}])
	/**&#8198;        \
	   ⡿⠟⠋⠁*/
	static HALF_RAMP_3_DI = new this(31, [{x:-0.5,y:-0.5},{x:0.5,y:0},{x:-0.5,y:0}])
	/**⠹⣿     \
	 *     ⠹    &#8198;*/
	static HALF_RAMP_3_LI = new this(32, [{x:0,y:-0.5},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;        \
	   ⣿⣿    &#8198;*/
	static QUARTER_UR = new this(33, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:0,y:0},{x:-0.5,y:0}])
	/**⣿⣿     \
	 *          &#8198;*/
	static QUARTER_DR = new this(34, [{x:-0.5,y:0},{x:0,y:0},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;    ⣿⣿\
	 *          &#8198;*/
	static QUARTER_DL = new this(35, [{x:0,y:0},{x:0.5,y:0},{x:0.5,y:0.5},{x:0,y:0.5}])
	/**&#8198;        \
	 *       ⣿⣿*/
	static QUARTER_UL = new this(36, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0},{x:0,y:0}])
	/**&#8198;        \
	   ⣷⣄    &#8198;*/
	static QUARTER_RAMP_UR = new this(37, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:-0.5,y:0}])
	/**⡿⠋     \
	 *          &#8198;*/
	static QUARTER_RAMP_DR = new this(38, [{x:-0.5,y:0},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**&#8198;    ⠙⢿\
	 *          &#8198;*/
	static QUARTER_RAMP_DL = new this(39, [{x:0.5,y:0},{x:0.5,y:0.5},{x:0,y:0.5}])
	/**&#8198;        \
	 *       ⣠⣾*/
	static QUARTER_RAMP_UL = new this(40, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0}])
	/**⣿⣿⣷⣄\
	   ⣿⣿⣿⣿*/
	static BEVEL_UR = new this(41, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0},{x:0,y:0.5},{x:-0.5,y:0.5}])
	/**⣿⣿⣿⣿\
	   ⣿⣿⡿⠋*/
	static BEVEL_DR = new this(42, [{x:-0.5,y:-0.5},{x:0,y:-0.5},{x:0.5,y:0},{x:0.5,y:0.5},{x:-0.5,y:0.5}])
	/**⣿⣿⣿⣿\
	   ⠈⠻⣿⣿*/
	static BEVEL_DL = new this(43, [{x:0,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5},{x:-0.5,y:0}])
	/**⢀⣴⣿⣿\
	   ⣿⣿⣿⣿*/
	static BEVEL_UL = new this(44, [{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:0,y:0.5},{x:-0.5,y:0}])
	static { this.end() }
	/** Set of shapes with a flat and full top surface. */
	static buildSurfaceShapes = new Set([this.BLOCK,this.RAMP_DR,this.RAMP_DL,this.SLAB_D,this.HALF_RAMP_1_D,this.HALF_RAMP_2_R,this.HALF_RAMP_2_D,this.HALF_RAMP_1_DI,this.HALF_RAMP_2_DI,this.HALF_RAMP_2_LI,this.BEVEL_DR,this.BEVEL_DL])
}
