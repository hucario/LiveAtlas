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
	<Markers :layer-group="layerGroup" :set="markerSet"></Markers>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, onUnmounted} from "@vue/runtime-core";
import {useStore} from "@/store";
import LiveAtlasLeafletMap from "@/leaflet/LiveAtlasLeafletMap";
import LiveAtlasLayerGroup from "@/leaflet/layer/LiveAtlasLayerGroup";
import {LiveAtlasMarkerSet} from "@/index";
import {watch} from "vue";
import Markers from "@/components/map/marker/Markers.vue";

export default defineComponent({
	components: {
		Markers,
	},

	props: {
		leaflet: {
			type: Object as () => LiveAtlasLeafletMap,
			required: true,
		},

		markerSet: {
			type: Object as () => LiveAtlasMarkerSet,
			required: true,
		}
	},

	setup(props) {
		const store = useStore(),
			markerSettings = computed(() => store.state.components.markers),
			layerGroup = new LiveAtlasLayerGroup({
				id: props.markerSet.id,
				minZoom: props.markerSet.minZoom,
				maxZoom: props.markerSet.maxZoom,
				showLabels: props.markerSet.showLabels || store.state.components.markers.showLabels,
				priority: props.markerSet.priority,
			});

		watch(props.markerSet, newValue => {
			if(newValue && layerGroup) {
				layerGroup.update({
					id: props.markerSet.id,
					minZoom: props.markerSet.minZoom,
					maxZoom: props.markerSet.maxZoom,
					showLabels: props.markerSet.showLabels || store.state.components.markers.showLabels,
					priority: props.markerSet.priority,
				});

				if(newValue.hidden) {
					props.leaflet.getLayerManager()
						.addHiddenLayer(layerGroup, newValue.label, props.markerSet.priority);
				} else {
					props.leaflet.getLayerManager()
						.addLayer(layerGroup, true, newValue.label, props.markerSet.priority);
				}
			}
		}, {deep: true});

		onMounted(() => {
			if(props.markerSet.hidden) {
				props.leaflet.getLayerManager()
					.addHiddenLayer(layerGroup, props.markerSet.label, props.markerSet.priority);
			} else {
				props.leaflet.getLayerManager()
					.addLayer(layerGroup, true, props.markerSet.label, props.markerSet.priority);
			}
		});

		onUnmounted(() => props.leaflet.getLayerManager().removeLayer(layerGroup));

		return {
			markerSettings,
			layerGroup,
		}
	},
	render() {
		return null;
	}
})
</script>
