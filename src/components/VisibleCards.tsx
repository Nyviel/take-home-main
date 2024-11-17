import { useCardStore } from "../stores/cardStore";
import { Button } from "./Button";
import { Card } from "./Card";

export const VisibleCards = () => {
	const visibleCards = useCardStore((state) => state.visibleCards);
	const deleteCard = useCardStore((state) => state.deleteCard);
	return (
		<section className="w-full max-w-xl">
			<div className="flex items-center justify-between mb-2">
				<h1 className="font-medium text-lg">
					My Awesome List ({visibleCards.length})
				</h1>
				<Button
					className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
					onClick={() => window.location.reload()}
				>
					Reload
				</Button>
			</div>
			<div className="flex flex-col gap-y-3">
				{visibleCards.map((card) => (
					<Card
						key={card.id}
						card={card}
						onDelete={deleteCard}
						cardType={"visible"}
					/>
				))}
			</div>
		</section>
	);
};
