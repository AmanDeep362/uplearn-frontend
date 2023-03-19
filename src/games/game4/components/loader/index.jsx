import React from "react";
import styles from "./loader.module.css";

const index = () => {
	return (
		<div className="row">
			<div id="page-loader" className={styles.wrapper}>
				<div className={styles.cardLoader}>
					<div className={styles.loader}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;
