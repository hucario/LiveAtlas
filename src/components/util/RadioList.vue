<!--
  - Copyright 2021 James Lyne
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  - http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
	<fieldset class="menu" role="radiogroup" @keydown="onKeydown">
		<slot></slot>
	</fieldset>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {handleKeyboardEvent} from "@/util/events";

export default defineComponent({
	name: 'RadioList',

	setup() {
		const onKeydown = (e: KeyboardEvent) => {
			handleKeyboardEvent(e, Array.from((e.currentTarget as HTMLFieldSetElement).elements) as HTMLElement[])
		}

		return {
			onKeydown
		}
	},
});
</script>

<style lang="scss">
	@import '../../scss/mixins';

	fieldset {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
	}
</style>

