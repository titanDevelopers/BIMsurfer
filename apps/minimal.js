// At the moment this API is loaded from a BIMserver, you could also include the API files in your viewer
import BimServerClient from "http://localhost:8080/apps/bimserverjavascriptapi/bimserverclient.js"
import BimServerViewer from "../viewer/bimserverviewer.js"

/*
 * This class is where the minimal demo starts. This is intended as an example you can copy-and-paste to start integratie the viewer in your own application.
 */

export default class Minimal {

	constructor() {
		// You need to change these to something that makes sense
		this.demoSettings = {
			// Address of your BIMserver
			bimServerAddress: "http://localhost:8080",
			// Login credentials of your BIMserver, obviously you'd never include these for production applications
			bimServerLogin: {
				username: "admin@bimserver.org",
				password: "admin"
			},
			// Project ID of the project you want to load the latest revision from
			poid: 196609,
			// The settings for the viewer
			viewerSettings: {
				viewerBasePath: "../"
				// Not putting anything here will just use the default settings
			}
		};
	}
	
	start() {
		// Connect to a BIMserver
		this.api = new BimServerClient(this.demoSettings.bimServerAddress);
		// Initialize the API
		this.api.init(() => {
			// Login
			this.api.login(this.demoSettings.bimServerLogin.username, this.demoSettings.bimServerLogin.password, () => {
				// Get the project details
				this.api.call("ServiceInterface", "getProjectByPoid", {
					poid: this.demoSettings.poid
				}, (project) => {
					// Select what canvas to bind the viewer to
					var canvas = document.getElementById("glcanvas");
					
					// Create a new BimServerViewer
					this.bimServerViewer = new BimServerViewer(this.api, this.demoSettings.viewerSettings, canvas, window.innerWidth, window.innerHeight);

					// Load the model
					this.bimServerViewer.loadModel(project);
				});
			});
		});
	}
}

new Minimal().start();