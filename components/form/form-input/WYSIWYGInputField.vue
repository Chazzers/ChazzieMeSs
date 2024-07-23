<script setup lang="ts">
import InputContainer from "~/components/form/form-input/InputContainer.vue";
import InputLabel from "~/components/form/form-input/InputLabel.vue";
import { textInputStyles } from "~/components/component-styles/text-input-styles";

type KeyActions = {
	ArrowUp: () => void;
	ArrowDown: () => void;
	Backspace: () => void;
};

const { title, name, placeholder, value } = defineProps<{
	title: string;
	name: string;
	placeholder: string;
	value?: string;
}>();

const inputValue: Ref<string[]> = ref([""]);
const output: Ref<HTMLDivElement[] | null> = ref(null);
const currentElementString: Ref<string> = ref("");
const htmlString: Ref<string> = ref("");
const htmlLines: Ref<any> = ref([""]);
const keyPressed: Ref<string> = ref("");
const currentLine: Ref<number> = ref(0);
const parentContainer: Ref<HTMLDivElement | null> = ref(null);
const textInputs: Ref<HTMLTextAreaElement[] | null> = ref(null);
const ulOpen: Ref<boolean> = ref(false);

function setCurrentLine(index: number) {
	currentLine.value = index;
}

function keyDownHandler(event: KeyboardEvent) {
	keyPressed.value = event.key;

	const keyActions: KeyActions = {
		ArrowUp: () => {
			if (htmlLines.value.length > 1 && currentLine.value > 0) {
				currentLine.value--;
			}
		},
		ArrowDown: () => {
			if (
				htmlLines.value.length > 1 &&
				currentLine.value < htmlLines.value.length - 1
			) {
				currentLine.value++;
			}
		},
		Backspace: () => {
			if (
				(inputValue.value[currentLine.value] === "" ||
					inputValue.value[currentLine.value] === undefined) &&
				htmlLines.value.length > 1
			) {
				if (currentElementString.value !== "p") {
					currentElementString.value = "p";
				} else {
					htmlLines.value.pop();
					currentLine.value--;
				}
			}
		},
	};
	if (keyActions[keyPressed.value as keyof KeyActions]) {
		keyActions[keyPressed.value as keyof KeyActions]();
		if (textInputs.value) {
			textInputs.value[currentLine.value].focus();
		}
	}
}

const specialKeys: {
	[key: string]:
		| string
		| {
				parent: string;
				child: string;
		  };
} = {
	"#": "h1",
	"##": "h2",
	"###": "h3",
	"####": "h4",
	"#####": "h5",
	"######": "h6",
	"-": {
		parent: "ul",
		child: "li",
	},
	"1.": { parent: "ol", child: "li" },
};

function inputHandler(event: Event) {
	const target = event.target as HTMLInputElement;

	if (!output.value || !textInputs.value) return;

	inputValue.value[currentLine.value] = target.value;

	currentElementString.value = "p";

	const firstChar = inputValue.value[currentLine.value][0];
	if (specialKeys[firstChar]) {
		const stringArray = [];
		if (specialKeys[inputValue.value[currentLine.value]]) {
			stringArray.push(specialKeys[inputValue.value[currentLine.value]]);
		}
		console.log(stringArray);
		const currentKey = inputValue.value[currentLine.value];
		const splitString = currentKey.split(" ");
		const restString = splitString
			.filter((string, index) => index !== 0)
			.join(" ");

		console.log(restString);

		if (splitString[0] && restString !== undefined) {
			const currentKeyValue = specialKeys[splitString[0]];
			inputValue.value[currentLine.value] = restString;
			if (currentKeyValue) {
				if (typeof currentKeyValue === "string") {
					currentElementString.value = currentKeyValue;
				} else if (currentKeyValue) {
					currentElementString.value = currentKeyValue.child;
				}
			}
		}
	}

	htmlString.value = `<${currentElementString.value}>${inputValue.value[currentLine.value]}</${currentElementString.value}>`;
	if (currentElementString.value === "li") {
		ulOpen.value = true;
		if (ulOpen.value === true && htmlLines.value.length === 1) {
			htmlString.value = `<ul><${currentElementString.value}>${inputValue.value[currentLine.value]}</${currentElementString.value}></ul>`;
			ulOpen.value = true;
		} else if (ulOpen.value === true && htmlLines.value.length > 1) {
			htmlLines.value[htmlLines.value.length - 2] = htmlLines.value[
				htmlLines.value.length - 2
			].replace("</ul>", "");
			htmlString.value = `<${currentElementString.value}>${inputValue.value[currentLine.value]}</${currentElementString.value}></ul>`;
		}
	} else {
		ulOpen.value = false;
	}

	htmlLines.value[currentLine.value] = htmlString.value;

	if (keyPressed.value === "Enter") {
		inputValue.value[currentLine.value] = inputValue.value[
			currentLine.value
		].replace(`\n`, "");

		htmlLines.value[currentLine.value] = htmlLines.value[
			currentLine.value
		].replace(`\n`, "");
		if (currentElementString.value !== "li") {
			currentElementString.value = "p";
		}
		currentLine.value++;
		setTimeout(() => {
			if (textInputs.value !== null) {
				textInputs.value[currentLine.value].focus();
			}
		}, 1);

		console.log(inputValue.value[currentLine.value]);

		inputValue.value[currentLine.value] = inputValue.value[
			currentLine.value
		]
			? inputValue.value[currentLine.value]
			: "";

		htmlString.value = `<${currentElementString.value}>${inputValue.value[currentLine.value]}</${currentElementString.value}>`;

		htmlLines.value[currentLine.value] = htmlString.value;
	}

	setTimeout(() => {
		if (!output.value) return;

		output.value[currentLine.value].innerHTML =
			htmlLines.value[currentLine.value];
		console.log(htmlLines.value);
	}, 0);
}
onMounted(() => {
	// if (parentContainer.value) {
	// 	if (parentContainer.value.querySelectorAll("textarea")) {
	// 		textInputs.value = [
	// 			...parentContainer.value.querySelectorAll("textarea"),
	// 		];
	// 	}
	// }
});
</script>

<template>
	<InputContainer>
		<InputLabel :id="name">{{ title }}</InputLabel>
		<div
			ref="parentContainer"
			class="w-full rounded-lg border border-solid border-slate-400 px-4 py-2"
		>
			<div
				v-for="(line, index) in htmlLines"
				:key="index"
				class="grid w-full grid-cols-1 grid-rows-1"
			>
				<textarea
					:id="name"
					ref="textInputs"
					:class="`peer ${textInputStyles} opacity-0 [grid-area:1/1]`"
					:name="name"
					:placeholder="placeholder"
					@focus="() => setCurrentLine(index)"
					@input="inputHandler"
					@keydown="keyDownHandler"
				></textarea>
				<div
					ref="output"
					:class="`
					[output]
					flex
					flex-col
					flex-wrap
					items-start
					rounded-lg
					border
					border-solid
					border-transparent
					px-4
					py-2
					[grid-area:1/1]
					[pointer-events:none]
					group-has-[:focus]:outline-none
					peer-has-[:focus]:bg-slate-500
					peer-has-[:focus]:ring-hibiscus-700
					[&>*]:relative
					peer-has-[:focus]:[&>*]:after:absolute
					peer-has-[:focus]:[&>*]:after:h-full
					peer-has-[:focus]:[&>*]:after:w-0.5
					peer-has-[:focus]:[&>*]:after:translate-x-full
					peer-has-[:focus]:[&>*]:after:animate-[cursor_1s_ease-in-out_infinite]
					peer-has-[:focus]:[&>*]:after:bg-hibiscus-700
					peer-has-[:focus]:[&>*]:after:content-['']
					[&>ol]:[list-style:decimal]
					[&>ul]:[list-style:disc]
					`"
				></div>
			</div>
		</div>
	</InputContainer>
</template>

<style>
h1 {
	font-size: 2.5rem;
}
h2 {
	font-size: 2rem;
}

h3 {
	font-size: 1.75rem;
}

h4 {
	font-size: 1.5rem;
}

textarea {
	min-height: 24px;
}

textarea + div {
	position: relative;
}

textarea + div > * {
	min-height: 24px;
}

textarea:focus + div > *::after {
	position: absolute;
	display: block;
	content: "";
	transform: translateX(100%);
	width: 2px;
	background-color: #c1226a;
	height: 100%;
	right: 0;
	top: 0;
	animation: cursor 1s ease-in-out infinite;
}

@keyframes cursor {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
