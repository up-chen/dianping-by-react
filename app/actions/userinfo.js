export const USERINFO_UPDATE = 'USERINFO_UPDATE'

export function update(data) {
    return {
        type: USERINFO_UPDATE,
        data
    }
}