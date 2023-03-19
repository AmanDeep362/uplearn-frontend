import React from "react";

const SingleOption = ({ option }) => {
	return (
		<option value={option}>
			{option}
		</option>
	);
};

export default SingleOption;
