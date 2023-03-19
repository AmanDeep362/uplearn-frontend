import axios from "./axios";

const baseUrl = process.env.REACT_APP_API;

class Flags {
	_allFlags = [];
	_randomFlags = [];
	_options = [];

	getFlags = async () => {
		try {
			const allFlags = await axios.get(baseUrl);
			this._allFlags = allFlags.data;
		} catch (err) {
			document.write(err.message + " ");
			console.error(err);
		}
	};

	getRandomFlags = () => {
		this._randomFlags = [];
		for (let i = 0; i < 10; i++) {
			this._randomFlags.push(
				this._allFlags[Math.floor(Math.random() * this._allFlags.length)]
			);
		}
		return this._randomFlags;
	};

	getRandomOptions = (currentFlagIndex) => {
		this._options = [];
		while (this._options.length < 6) {
			// let flagName =
			// if (!this._options.includes(flagName) === false && ) { }
			this._options.push(
				this._allFlags[Math.floor(Math.random() * this._allFlags.length)]?.name.common
			);
		}

		// put the original answer's index in the optionIndex array
		this._options.splice(
			Math.floor(Math.random() * 7),
			0,
			this._randomFlags[currentFlagIndex]?.name.common
		);

		let correctOption = this._randomFlags[currentFlagIndex]?.name.common;

		return [this._options, correctOption];
	};
}

export default Flags;
