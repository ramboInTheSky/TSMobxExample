import apiVersion from './api_versions'

export const urls = Object.freeze({
	profiles: `https://csi-dev.thecollective.com/${apiVersion.profile}profile`,
	visits: `https://csi-dev.thecollective.com/${apiVersion.visit}visit`,
	archetypes: `https://csi-dev.thecollective.com/${apiVersion.archetype}archetype`,
	lockGroups: `https://csi-dev.thecollective.com/${apiVersion.lockgroup}lockgroup`,
})
export default urls