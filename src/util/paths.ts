/*
 * Copyright 2021 James Lyne
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

import {Direction, LatLngExpression, PathOptions} from "leaflet";
import {LiveAtlasPathMarker} from "@/index";

export const tooltipOptions = {
	direction: 'top' as Direction,
	sticky: true,
	opacity: 1.0,
	interactive: false,
};

export const arePointsEqual = (oldPoints: LatLngExpression | LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
						newPoints: LatLngExpression | LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]) => {
	return JSON.stringify(oldPoints) === JSON.stringify(newPoints);
}

export const isStyleEqual = (oldStyle: PathOptions, newStyle: PathOptions) => {
	return oldStyle && newStyle
		&& (oldStyle.color === newStyle.color)
		&& (oldStyle.weight === newStyle.weight)
		&& (oldStyle.opacity === newStyle.opacity)
		&& (oldStyle.fillColor === newStyle.fillColor)
		&& (oldStyle.fillOpacity === newStyle.fillOpacity)
}

export const createPopup = (options: LiveAtlasPathMarker, className: string): HTMLElement => {
	const popup = document.createElement('span');

	if(options.isPopupHTML && options.popup) {
		popup.classList.add(className);
		if (options.popup?.includes('[[FACTION]]')) {
			const p = options.popup.replace(/<div>/g, '').replace(/<\/div>/g, '').split('<br />');
			/*
			 * [0]: [[FACTION]]
			 * [1]: %name%
			 * [2]: %description%
			 * [3]: %players.leader% | "none"
			 * [4]: %players.admins.count%
			 * [5]: %players.moderators.count%
			 * [6]: %players.normals.count%
			 * [7]: %players.count%
			 * [8]: %money% | "unavailable"
			 * 
			 * factions_markerset
			 */
			popup.insertAdjacentHTML('afterbegin', `
				<div class="infowindow">
					<span class="faction_name">${p[1]}</span>
					${ p[3] === 'none' ? 
						`<div class="faction_system">system faction</div>` :
						''
					}${ p[2].length > 0 ? 
						`<div class="faction_description">
							<div class="faction_description2">${p[2]}</div>
						</div>` :
						''
					}${ p[3] !== 'none' ? 
						`<div class="faction_leader">
							<span class="faction_leader_header">Leader:</span>
							<img class="faction_leader_head" src="/tiles/faces/32x32/${p[3]}.png" alt="" />
							<span class="faction_leader_name">${p[3]}</span>
						</div>
						<div class="faction_stats">
							<div class="faction_stat">
								<span class="faction_stat_number">${p[4]}</span>
								<span class="faction_stat_name">Admins</span>
							</div>
							<div class="faction_stat">
								<span class="faction_stat_number">${p[5]}</span>
								<span class="faction_stat_name">Moderators</span>
							</div>
							<div class="faction_stat">
								<span class="faction_stat_number">${p[6]}</span>
								<span class="faction_stat_name">Members</span>
							</div><div class="faction_stat">
								<span class="faction_stat_number">${p[7]}</span>
								<span class="faction_stat_name">Total</span>
							</div>
						</div>
						${ p[8] !== 'unavailable' ? 
							`<div class="faction_bal">${p[8]}</div>`
							: ''
						}
					</div>` :
					''
			}`)
		} else {
			popup.insertAdjacentHTML('afterbegin', options.popup as string);
		}
	} else {
		popup.textContent = options.popup as string;
	}

	return popup;
};
