import _ from 'lodash';

export const nullable = (obj: any) => {
    let newObj = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = (_.isEmpty(obj[key])) ? null : obj[key]
        }
    }
    return newObj
}