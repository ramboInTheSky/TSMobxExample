import apiVersion from './api_versions'

export const urls = Object.freeze({
    profiles: `/profiles.json`,
    visits: `https://csi-dev.thecollective.com/${apiVersion.visit}visit`,
    archetypes: `/archetypes.json`,
    lockGroups: `get_lock_groups.json`,
})
export default urls