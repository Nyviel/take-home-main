import { create } from "zustand";
import { DeletedListItem, ListItem } from "../api/getListData";

type State = {
	visibleCards: ListItem[];
	deletedCards: DeletedListItem[];
};

type Actions = {
	toggleExpanded: (card: ListItem) => void;
	initializeCards: (card: ListItem[]) => void;
	deleteCard: (card: ListItem) => void;
	revertCard: (card: DeletedListItem) => void;
};

export const useCardStore = create<State & Actions>((set) => ({
	visibleCards: [],
	deletedCards: [],
	toggleExpanded: (card: ListItem) => {
		set((state) => {
			localStorage.setItem(
				card.id.toString(),
				(!card.isExpanded).toString()
			);
			return {
				...state,
				visibleCards: state.visibleCards.map((c) =>
					c.id === card.id ? { ...c, isExpanded: !c.isExpanded } : c
				),
			};
		});
	},
	initializeCards: (cards: ListItem[]) => {
		set((state) => ({
			...state,
			visibleCards: cards,
		}));
	},
	deleteCard: (card: ListItem) => {
		set((state) => ({
			...state,
			visibleCards: state.visibleCards.filter((c) => c.id !== card.id),
			deletedCards: [...state.deletedCards, card],
		}));
	},
	// The approach of omitting description causes issues when reverting.
	// It would be better to not render the description rather than omit it.
	// Prevents loss of data that way.
	revertCard: (card: DeletedListItem) => {
		set((state) => ({
			...state,
			visibleCards: [...state.visibleCards, { ...card, description: "" }],
			deletedCards: state.deletedCards.filter((c) => c.id !== card.id),
		}));
	},
}));
