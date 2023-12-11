import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";
import Device from "sap/ui/Device";
// import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * @namespace com.myorg.myapp
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
	};

	private contentDensityClass: string;

	public init(): void {
		// call the base component's init function
		super.init();

		html2canvas(document.body).then((canvas) => {
			// Export the canvas to its data URI representation
			const base64image = canvas.toDataURL("image/png");

			// Open the image in a new window
			window.open(base64image, "_blank");
		}).catch((err) => {
			console.log(err);
		});

		// const doc = new jsPDF();

		// doc.text("Hello world!", 10, 10);
		// doc.save("a4.pdf");

		// create the device model
		this.setModel(models.createDeviceModel(), "device");

		// create the views based on the url/hash
		this.getRouter().initialize();
	}

	/**
	 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
	 * design mode class should be set, which influences the size appearance of some controls.
	 * @public
	 * @returns css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
	 */
	public getContentDensityClass(): string {
		if (this.contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
				this.contentDensityClass = "";
			} else if (!Device.support.touch) {
				// apply "compact" mode if touch is not supported
				this.contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.contentDensityClass;
	}
}
