

(function() {
	
	SceneManager.updateMain = function() {
		if (Utils.isMobileSafari()) {
			this.changeScene();
			this.updateScene();
		} else {
			var newTime = this._getTimeInMsWithoutMobileSafari();
			var fTime = (newTime - this._currentTime) / 1000;
			//if (fTime > 0.25) fTime = 0.25;
			// this._deltaTime : 1.0 / 60.0
			if (fTime > 0.067) fTime = 0.067;
			this._currentTime = newTime;
			this._accumulator += fTime;
			while (this._accumulator >= this._deltaTime) {
				this.updateInputData();
				this.changeScene();
				this.updateScene();
				this._accumulator -= this._deltaTime;
			}
		}
		this.renderScene();
		this.requestUpdate();
	};

})();

