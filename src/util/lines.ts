/*
 * Copyright 2021 James Lyne
 *
 * Some portions of this file were taken from https://github.com/webbukkit/dynmap.
 * These portions are Copyright 2020 Dynmap Contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import LiveAtlasPolyline from "@/leaflet/vector/LiveAtlasPolyline";
import {Coordinate, LiveAtlasLineMarker} from "@/index";
import {LatLngExpression} from "leaflet";
import {createPopup, tooltipOptions} from "@/util/paths";

export const createLineLayer = (options: LiveAtlasLineMarker, converter: Function): LiveAtlasPolyline => {
	const points = options.points.map(projectPointsMapCallback, converter),
		line = new LiveAtlasPolyline(points, options);

	if(options.popup) {
		line.bindPopup(() => createPopup(options, 'LinePopup'));
	}

	if (options.tooltip) {
		line.bindTooltip(() => options.tooltipHTML || options.tooltip, tooltipOptions);
	}

	return line;
};

export const updateLineLayer = (line: LiveAtlasPolyline | undefined, options: LiveAtlasLineMarker, converter: Function): LiveAtlasPolyline => {
	if (!line) {
		return createLineLayer(options, converter);
	}

	line.closePopup();
	line.unbindPopup();
	line.closeTooltip();
	line.unbindTooltip();

	if (options.popup) {
		line.bindPopup(() => createPopup(options, 'AreaPopup'));
	}

	if (options.tooltip) {
		line.bindTooltip(() => options.tooltipHTML || options.tooltip, tooltipOptions);
	}

	line.setStyle(options.style);
	line.setLatLngs(options.points.map(projectPointsMapCallback, converter));
	line.redraw();

	return line;
}

const projectPointsMapCallback = function(point: Coordinate): LatLngExpression {
	if(Array.isArray(point)) {
		return projectPointsMapCallback(point);
	} else {
		// @ts-ignore
		return this(point);
	}
};

export const getLinePoints = (x: number[], y: number[], z: number[]): Coordinate[] => {
	const points = [];

	for(let i = 0; i < x.length; i++) {
		points.push({x: x[i], y: y[i], z: z[i]});
	}

	return points;
};
