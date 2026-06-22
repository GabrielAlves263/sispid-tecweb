import { Outlet } from "react-router-dom";
import SisPIDHeader from "./Header";
import SisPIDFooter from "./Footer";

export function Layout() {
	return (
		<>
			<SisPIDHeader />
			<main>
				<Outlet />
			</main>
			<SisPIDFooter />
		</>
	);
}
