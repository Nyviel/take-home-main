// Regarding tests for this app I'd most likely add some unit tests for
// checking behaviour of the zustand store and whether the cards get
// properly initialized and deleted, could also add some component tests
// to check if what we expect to be rendered in for example deletedCards
// gets rendered

import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { useCardStore } from "../stores/cardStore";
import { VisibleCards } from "./VisibleCards";
import { DeletedCards } from "./DeletedCards";

export const Entrypoint = () => {
	const initializeCards = useCardStore((state) => state.initializeCards);
	const listQuery = useGetListData();
	useEffect(() => {
		if (listQuery.isLoading || listQuery.isError) {
			return;
		}

		const apiCards = listQuery.data?.filter((item) => item.isVisible) ?? [];

		// Persist expanded state
		initializeCards(
			apiCards.map((apiCard) => {
				const persistedExpansion = localStorage.getItem(
					apiCard.id.toString()
				);
				if (persistedExpansion !== null) {
					apiCard.isExpanded = persistedExpansion === "true";
				} else {
					apiCard.isExpanded = false;
				}

				return apiCard;
			})
		);
	}, [listQuery.data, listQuery.isLoading, listQuery.isError]);

	if (listQuery.isLoading) {
		return <Spinner />;
	}

	if (listQuery.isError) {
		console.error(listQuery.error);
		return <h1>Oops, encountered an error</h1>;
	}

	return (
		<div className="flex gap-x-16">
			<VisibleCards />
			<DeletedCards />
		</div>
	);
};
