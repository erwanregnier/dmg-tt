import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import Save from "./save";
import "./style.scss";

registerBlockType("dmg-tt/dmg-post-link", {
  edit: Edit,
  save: Save,
});
