export const levelOptions = [
	{
		value: 1,
		label: "1",
	},
	{
		value: 2,
		label: "2",
	},
	{
		value: 3,
		label: "3",
	},
	{
		value: 4,
		label: "4",
	},
	{
		value: 5,
		label: "5",
	},
	{
		value: 6,
		label: "6",
	},
	{
		value: 7,
		label: "7",
	},
	{
		value: 8,
		label: "8",
	},
	{
		value: 9,
		label: "9",
	},
	{
		value: 10,
		label: "10",
	},
	{
		value: 11,
		label: "11",
	},
	{
		value: 12,
		label: "12",
	},
	{
		value: 13,
		label: "13",
	},
	{
		value: 14,
		label: "14",
	},
	{
		value: 15,
		label: "15",
	},
	{
		value: 16,
		label: "16",
	},
	{
		value: 17,
		label: "17",
	},
	{
		value: 18,
		label: "18",
	},
	{
		value: 19,
		label: "19",
	},
	{
		value: 20,
		label: "20",
	},
	{
		value: 21,
		label: "21",
	},
	{
		value: 22,
		label: "22",
	},
	{
		value: 23,
		label: "23",
	},
	{
		value: 24,
		label: "24",
	},
	{
		value: 25,
		label: "25",
	},
	{
		value: 26,
		label: "26",
	},
	{
		value: 27,
		label: "27",
	},
	{
		value: 28,
		label: "28",
	},
	{
		value: 29,
		label: "29",
	},
	{
		value: 30,
		label: "30",
	},
	{
		value: 31,
		label: "31",
	},
	{
		value: 32,
		label: "32",
	},
	{
		value: 33,
		label: "33",
	},
	{
		value: 34,
		label: "34",
	},
	{
		value: 35,
		label: "35",
	},
	{
		value: 36,
		label: "36",
	},
	{
		value: 37,
		label: "37",
	},
	{
		value: 38,
		label: "38",
	},
	{
		value: 39,
		label: "39",
	},
	{
		value: 40,
		label: "40",
	},
	{
		value: 41,
		label: "41",
	},
	{
		value: 42,
		label: "42",
	},
	{
		value: 43,
		label: "43",
	},
	{
		value: 44,
		label: "44",
	},
	{
		value: 45,
		label: "45",
	},
	{
		value: 46,
		label: "46",
	},
	{
		value: 47,
		label: "47",
	},
	{
		value: 48,
		label: "48",
	},
	{
		value: 49,
		label: "49",
	},
	{
		value: 50,
		label: "50",
	},
	{
		value: 51,
		label: "51",
	},
	{
		value: 52,
		label: "52",
	},
	{
		value: 53,
		label: "53",
	},
	{
		value: 54,
		label: "54",
	},
	{
		value: 55,
		label: "55",
	},
];

const labelRace = ({ image, label }: ILabelProps) => {
	return (
		<div className="d-flex align-items-center gap-1">
			<div>
				<img src={`./${image}`} alt={label} width={20} height={20} />
			</div>
			<div>{label}</div>
		</div>
	);
};

export const raceOptions = [
	{
		value: 0,
		label: labelRace({
			image: "accretia.png",
			label: "Accretia",
		}),
	},
	{
		value: 1,
		label: labelRace({
			image: "bellato.png",
			label: "Bellato",
		}),
	},
	{
		value: 2,
		label: labelRace({
			image: "cora.png",
			label: "Cora",
		}),
	},
];

export interface ClassesOptions {
	readonly value: number;
	readonly label: any;
	readonly img?: string;
}

interface ILabelProps {
	image: string;
	label: string;
}

const label = ({ image, label }: ILabelProps) => {
	return (
		<div className="d-flex align-items-center gap-1">
			<div>
				<img src={`./${image}.gif`} alt={label} width={30} height={30} />
			</div>
			<div>{label}</div>
		</div>
	);
};

export const accretiaClassesOptions: readonly ClassesOptions[] = [
	{
		value: 1,
		label: label({
			image: "punisher",
			label: "Punisher",
		}),
	},
	{
		value: 2,
		label: label({
			image: "assaulter",
			label: "Assaulter",
		}),
	},
	{
		value: 3,
		label: label({
			image: "mercenary",
			label: "Mercenary",
		}),
	},
	{
		value: 4,
		label: label({
			image: "striker",
			label: "Striker",
		}),
	},
	{
		value: 5,
		label: label({
			image: "dementer",
			label: "Dementer",
		}),
	},
	{
		value: 6,
		label: label({
			image: "scout",
			label: "Phantom Shadow",
		}),
	},
	{
		value: 7,
		label: label({
			image: "scientist",
			label: "Scientist",
		}),
	},
	{
		value: 8,
		label: label({
			image: "battleleader",
			label: "Battle Leader",
		}),
	},
];

export const bellatoClassesOptions: readonly ClassesOptions[] = [
	{
		value: 9,
		label: label({
			image: "berserker",
			label: "Berserker",
		}),
	},
	{
		value: 10,
		label: label({
			image: "armsman",
			label: "Armsman",
		}),
	},
	{
		value: 11,
		label: label({
			image: "shieldmiller",
			label: "Shield Miler",
		}),
	},
	{
		value: 12,
		label: label({
			image: "hiddensoldier",
			label: "Hidden Soldier",
		}),
	},
	{
		value: 13,
		label: label({
			image: "sentinel",
			label: "Sentinel",
		}),
	},
	{
		value: 14,
		label: label({
			image: "infiltrador",
			label: "Infiltrator",
		}),
	},
	{
		value: 15,
		label: label({
			image: "wizard",
			label: "Wizard",
		}),
	},
	{
		value: 16,
		label: label({
			image: "astraler",
			label: "Astraler",
		}),
	},
	{
		value: 17,
		label: label({
			image: "holychandra",
			label: "Holy Chandra",
		}),
	},
	{
		value: 18,
		label: label({
			image: "armorrider",
			label: "Armor Rider",
		}),
	},
	{
		value: 19,
		label: label({
			image: "mentalsmith",
			label: "Mental Smith",
		}),
	},
];

export const coraClassesOptions: readonly ClassesOptions[] = [
	{
		value: 20,
		label: label({
			image: "templar",
			label: "Templar",
		}),
	},
	{
		value: 21,
		label: label({
			image: "guardian",
			label: "Guardian",
		}),
	},
	{
		value: 22,
		label: label({
			image: "blackknight",
			label: "Black Knight",
		}),
	},
	{
		value: 23,
		label: label({
			image: "adventurer",
			label: "Adventurer",
		}),
	},
	{
		value: 24,
		label: label({
			image: "stealer",
			label: "Stealer",
		}),
	},
	{
		value: 25,
		label: label({
			image: "assassin",
			label: "Assassin",
		}),
	},
	{
		value: 26,
		label: label({
			image: "warlock",
			label: "Warlock",
		}),
	},
	{
		value: 27,
		label: label({
			image: "darkpriest",
			label: "Dark Priest",
		}),
	},
	{
		value: 28,
		label: label({
			image: "grazier",
			label: "Grazier",
		}),
	},
	{
		value: 29,
		label: label({
			image: "artist",
			label: "Artist",
		}),
	},
];
